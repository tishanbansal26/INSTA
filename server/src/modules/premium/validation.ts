import { z } from "zod";

export const calculatePremiumSchema = z.object({
  body: z.object({
    companyId: z.string().min(1, "Company is required"),
    planId: z.string().min(1, "Plan is required"),
    age: z.number().int().positive("Age must be positive"),
    sumInsured: z.number().positive("Sum insured must be positive"),
    tenure: z.number().int().positive("Tenure must be positive"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    cityTier: z.string().optional(),
    familyType: z.string().optional(),
  })
});
