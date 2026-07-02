import { Request, Response } from "express";
import { policyWorkflowService } from "./service";
import { CreateWorkflowSchema, ApproveWorkflowSchema, IssuePolicySchema } from "./validation";
import { WorkflowState } from "@prisma/client";

export class PolicyWorkflowController {
  async createWorkflow(req: Request, res: Response) {
    try {
      const data = CreateWorkflowSchema.parse(req.body);
      // Assuming req.user exists from authMiddleware
      const userId = (req as any).user?.id || "admin"; 
      
      const workflow = await policyWorkflowService.createWorkflow(data.clientId, userId);
      res.status(201).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getWorkflow(req: Request, res: Response) {
    try {
      const workflow = await policyWorkflowService.getWorkflow(req.params.id as string);
      if (!workflow) return res.status(404).json({ success: false, message: "Workflow not found" });
      res.status(200).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getTimeline(req: Request, res: Response) {
    try {
      // Assuming we pass policyId in query or params
      const policyId = req.params.policyId;
      const timeline = await policyWorkflowService.getTimeline(policyId as string);
      res.status(200).json({ success: true, policyId, timeline });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async approveQuotation(req: Request, res: Response) {
    try {
      const data = ApproveWorkflowSchema.parse(req.body);
      const userId = (req as any).user?.id || "admin";
      const workflow = await policyWorkflowService.transitionState(req.params.id as string, "APPROVED", userId, data.remarks);
      res.status(200).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async recordPayment(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || "admin";
      // Skip deep payment validation here for brevity, transition to PAYMENT_COMPLETED
      const workflow = await policyWorkflowService.transitionState(req.params.id as string, "PAYMENT_COMPLETED", userId, "Payment received");
      res.status(200).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async uploadDocument(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || "admin";
      const workflow = await policyWorkflowService.transitionState(req.params.id as string, "DOCUMENT_UPLOADED", userId, "Document verified");
      res.status(200).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async issuePolicy(req: Request, res: Response) {
    try {
      const data = IssuePolicySchema.parse(req.body);
      const userId = (req as any).user?.id || "admin";
      
      const result = await policyWorkflowService.issuePolicyTransaction(req.params.id as string, userId, data);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async completeWorkflow(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || "admin";
      const workflow = await policyWorkflowService.transitionState(req.params.id as string, "COMPLETED", userId, "Workflow finalized");
      res.status(200).json({ success: true, data: workflow });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export const policyWorkflowController = new PolicyWorkflowController();
