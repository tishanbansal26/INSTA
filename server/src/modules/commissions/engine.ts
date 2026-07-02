import prisma from "../../config/prisma";
import { CommissionStatus } from '@prisma/client';

export class CommissionEngine {
  /**
   * Evaluates the commission rules for a given policy and generates Commission records.
   */
  static async evaluatePolicy(policyId: string): Promise<void> {
    const policy = await prisma.policy.findUnique({
      where: { id: policyId },
      include: {
        agent: true,
      },
    });

    if (!policy) {
      throw new Error(`Policy not found: ${policyId}`);
    }

    // 1. Find the applicable rule
    let rule = await prisma.commissionRule.findFirst({
      where: {
        companyId: policy.companyId,
        planId: policy.planId,
        isActive: true,
      },
    });

    // Fallback to company-wide rule if plan-specific rule doesn't exist
    if (!rule) {
      rule = await prisma.commissionRule.findFirst({
        where: {
          companyId: policy.companyId,
          planId: null,
          isActive: true,
        },
      });
    }

    if (!rule) {
      console.warn(`No active commission rule found for Company ${policy.companyId} and Plan ${policy.planId}`);
      return;
    }

    // 2. Calculate the total commission
    const totalCommissionAmount = (policy.premiumAmount.toNumber() * rule.commissionPct.toNumber()) / 100;

    // 3. Create the Commission record
    const commission = await prisma.commission.create({
      data: {
        commissionNumber: `COM-${policy.policyNumber}`,
        companyId: policy.companyId,
        policyId: policy.id,
        ruleId: rule.id,
        totalCommissionAmount,
        status: CommissionStatus.PENDING,
      },
    });

    // 4. Determine splits (For now, 100% goes to the issuing agent)
    // Future proof: You could look up a `CommissionSplit` setting for this agent/agency.
    await prisma.commissionSplit.create({
      data: {
        commissionId: commission.id,
        agentId: policy.agentId,
        splitPct: 100,
        commissionAmount: totalCommissionAmount,
      },
    });

    console.log(`Generated Commission ${commission.commissionNumber} for Policy ${policy.policyNumber}`);
  }
}
