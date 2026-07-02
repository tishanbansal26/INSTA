import { AppError } from "../../shared/errors/AppError";

export interface PremiumRuleRecord {
  id?: string;
  companyId?: string;
  planId?: string;
  ageFrom: number;
  ageTo: number;
  gender?: string | null;
  cityTier?: string | null;
  familyType?: string | null;
  sumInsured: number;
  tenure: number;
  premium: number;
  gst: number;
  isActive: boolean;
}

export interface PremiumRuleInput {
  age: number;
  sumInsured: number;
  tenure: number;
  gender?: string;
  cityTier?: string;
  familyType?: string;
}

export interface PremiumCalculationResult {
  basePremium: number;
  gst: number;
  discount: number;
  finalPremium: number;
}

export const calculatePremiumFromRules = (
  rules: PremiumRuleRecord[],
  input: PremiumRuleInput
): PremiumCalculationResult => {
  const activeRules = rules.filter(r => r.isActive !== false);

  const matchedRule = activeRules.find((rule) => {
    const ageInRange = input.age >= rule.ageFrom && input.age <= rule.ageTo;
    const genderMatches = !rule.gender || rule.gender === input.gender;
    const cityMatches = !rule.cityTier || rule.cityTier === input.cityTier;
    const familyMatches = !rule.familyType || rule.familyType === input.familyType;
    const sumInsuredMatches = Number(rule.sumInsured) === Number(input.sumInsured);
    const tenureMatches = Number(rule.tenure) === Number(input.tenure);
    return ageInRange && genderMatches && cityMatches && familyMatches && sumInsuredMatches && tenureMatches;
  });

  if (!matchedRule) {
    throw new AppError("No matching premium rate found for the given criteria", 404);
  }

  const basePremium = Number(matchedRule.premium);
  
  let discount = 0;
  if (input.tenure > 1) {
    discount = basePremium * 0.05; // example 5% discount for multi-year
  }

  const baseAfterDiscount = basePremium - discount;
  const configuredGst = Number(matchedRule.gst);
  const gstAmount = configuredGst > 0 ? configuredGst : Math.round(baseAfterDiscount * 0.18);
  const finalPremium = baseAfterDiscount + gstAmount;

  return {
    basePremium,
    gst: gstAmount,
    discount,
    finalPremium,
  };
};
