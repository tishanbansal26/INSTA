import { AppError } from "../../shared/errors/AppError";
import prisma from "../../config/prisma";
import { calculatePremiumFromRules } from "./calculator";
import type { CalculatePremiumDto } from "./dto";

export const premiumService = {
  calculate: async (input: CalculatePremiumDto) => {
    const [company, plan] = await Promise.all([
      prisma.company.findFirst({ where: { id: input.companyId, deletedAt: null } }),
      prisma.plan.findFirst({ where: { id: input.planId, deletedAt: null } }),
    ]);

    if (!company) {
      throw new AppError("Company not found", 404);
    }

    if (!plan) {
      throw new AppError("Plan not found", 404);
    }

    if (plan.companyId !== company.id) {
      throw new AppError("Selected plan does not belong to the selected company", 400);
    }

    const rules = await prisma.premiumRate.findMany({
      where: {
        companyId: input.companyId,
        planId: input.planId,
        deletedAt: null
      }
    });

    const result = calculatePremiumFromRules(
      rules.map((rule) => ({
        ...rule,
        sumInsured: Number(rule.sumInsured),
        premium: Number(rule.premium),
        gst: Number(rule.gst),
      })),
      {
        age: input.age,
        sumInsured: input.sumInsured,
        tenure: input.tenure,
        gender: input.gender,
        cityTier: input.cityTier,
        familyType: input.familyType
      }
    );

    return result;
  }
};
