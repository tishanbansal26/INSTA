import prisma from "../../config/prisma";
import { WorkflowState, NotificationType, NotificationChannel } from "@prisma/client";
import { emailQueue } from "../../utils/queue";

// Valid State Transitions
const validTransitions: Record<WorkflowState, WorkflowState[]> = {
  CREATED: ["PREMIUM_CALCULATED", "QUOTATION_GENERATED"],
  PREMIUM_CALCULATED: ["QUOTATION_GENERATED"],
  QUOTATION_GENERATED: ["APPROVED"],
  APPROVED: ["PAYMENT_PENDING", "DOCUMENT_PENDING"],
  PAYMENT_PENDING: ["PAYMENT_COMPLETED"],
  PAYMENT_COMPLETED: ["DOCUMENT_PENDING", "POLICY_ISSUED"],
  DOCUMENT_PENDING: ["DOCUMENT_UPLOADED"],
  DOCUMENT_UPLOADED: ["POLICY_ISSUED", "PAYMENT_PENDING"],
  POLICY_ISSUED: ["COMPLETED"],
  COMPLETED: [],
};

export class PolicyWorkflowService {
  async createWorkflow(clientId: string, userId: string) {
    const workflow = await prisma.workflow.create({
      data: {
        clientId,
        currentState: "CREATED",
      },
    });
    await this.logActivity(workflow.id, userId, "Workflow Created", "Workflow initialized for client");
    return workflow;
  }

  async getWorkflow(id: string) {
    return prisma.workflow.findUnique({
      where: { id },
      include: {
        client: true,
        quotation: true,
        policy: true,
      },
    });
  }

  async getTimeline(policyId: string) {
    const activities = await prisma.activityLog.findMany({
      where: { policyId },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { name: true } } },
    });
    
    return activities.map(act => ({
      stage: act.action,
      description: act.description,
      date: act.createdAt,
      user: act.user.name,
    }));
  }

  async transitionState(workflowId: string, newState: WorkflowState, userId: string, remarks?: string) {
    const workflow = await prisma.workflow.findUnique({ where: { id: workflowId } });
    if (!workflow) throw new Error("Workflow not found");

    const allowed = validTransitions[workflow.currentState];
    if (!allowed.includes(newState)) {
      throw new Error(`Invalid transition from ${workflow.currentState} to ${newState}`);
    }

    const updated = await prisma.workflow.update({
      where: { id: workflowId },
      data: { currentState: newState, remarks },
    });

    await this.logActivity(workflowId, userId, `Transition to ${newState}`, remarks || "State updated", workflow.policyId);
    return updated;
  }

  // Completes a full issuance transaction
  async issuePolicyTransaction(
    workflowId: string,
    userId: string,
    data: {
      companyId: string;
      planId: string;
      sumInsured: number;
      premiumAmount: number;
      gstAmount: number;
      paymentMode: any;
      transactionId?: string;
    }
  ) {
    const workflow = await prisma.workflow.findUnique({ where: { id: workflowId } });
    if (!workflow) throw new Error("Workflow not found");

    if (workflow.currentState !== "PAYMENT_COMPLETED" && workflow.currentState !== "DOCUMENT_UPLOADED") {
      throw new Error("Must complete payment and documents before issuing");
    }

    // Generate unique numbers
    const policyNumber = `NB-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
    const receiptNumber = `RCPT-${Date.now()}`;

    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(now.getFullYear() + 1);

    // Using Prisma Interactive Transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Policy
      const policy = await tx.policy.create({
        data: {
          policyNumber,
          clientId: workflow.clientId,
          companyId: data.companyId,
          planId: data.planId,
          agentId: userId,
          sumInsured: data.sumInsured,
          premiumAmount: data.premiumAmount,
          gstAmount: data.gstAmount,
          issueDate: now,
          startDate: now,
          expiryDate: expiryDate,
          status: "ACTIVE",
          paymentStatus: "PAID",
        },
      });

      // 2. Create Payment
      await tx.payment.create({
        data: {
          receiptNumber,
          policyId: policy.id,
          amount: data.premiumAmount,
          gst: data.gstAmount,
          paymentMode: data.paymentMode,
          paymentStatus: "SUCCESS",
          transactionId: data.transactionId,
          paidAt: now,
          createdById: userId,
        },
      });

      // 3. Create Renewal
      await tx.renewal.create({
        data: {
          policyId: policy.id,
          clientId: workflow.clientId,
          dueDate: expiryDate,
          previousPremium: data.premiumAmount,
          renewalStatus: "PENDING",
        },
      });

      // 4. Create Notification
      const notification = await tx.notification.create({
        data: {
          title: "Policy Issued",
          message: `Your policy ${policyNumber} has been successfully issued.`,
          type: "POLICY",
          recipientId: workflow.clientId,
          channel: "EMAIL",
          status: "QUEUED",
        },
      });

      // 5. Update Workflow State and bind Policy
      const updatedWorkflow = await tx.workflow.update({
        where: { id: workflowId },
        data: {
          currentState: "POLICY_ISSUED",
          policyId: policy.id,
        },
      });

      // 6. Create Activity Log
      await tx.activityLog.create({
        data: {
          userId,
          action: "Policy Issued",
          module: "policy-workflow",
          description: `Issued policy ${policyNumber}`,
          policyId: policy.id,
        },
      });

      return { policy, updatedWorkflow, notification };
    });

    // 7. Enqueue Background Job
    await emailQueue.add("send-policy-issued-email", {
      notificationId: result.notification.id,
      clientId: workflow.clientId,
      policyNumber,
    });

    return result;
  }

  private async logActivity(workflowId: string, userId: string, action: string, description: string, policyId?: string | null) {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        module: "policy-workflow",
        description,
        policyId,
      },
    });
  }
}

export const policyWorkflowService = new PolicyWorkflowService();
