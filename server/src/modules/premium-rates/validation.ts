import { z } from "zod";

export const createPremiumRateSchema = z.object({
  body: z.object({
    companyId: z.string().min(1, "Company ID is required"),
    planId: z.string().min(1, "Plan ID is required"),
    ageFrom: z.number().int().min(0, "Age from must be a positive integer"),
    ageTo: z.number().int().min(0, "Age to must be a positive integer"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    cityTier: z.string().optional(),
    familyType: z.string().optional(),
    sumInsured: z.number().positive("Sum insured must be positive"),
    tenure: z.number().int().positive("Tenure must be positive"),
    premium: z.number().positive("Premium must be positive"),
    gst: z.number().nonnegative("GST must be non-negative"),
    isActive: z.boolean().optional()
  }).refine((data) => data.ageTo >= data.ageFrom, {
    message: "Age to must be greater than or equal to age from",
    path: ["ageTo"]
  })
});

export const updatePremiumRateSchema = z.object({
  body: createPremiumRateSchema.shape.body.partial()
});
