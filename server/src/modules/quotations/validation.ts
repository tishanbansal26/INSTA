import { z } from "zod";

export const createQuotationSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  companyId: z.string().min(1, "Company is required"),
  planId: z.string().min(1, "Plan is required"),
  premiumRateId: z.string().optional(),
  age: z.number().int().positive("Age must be positive"),
  sumInsured: z.number().positive("Sum insured must be positive"),
  tenure: z.number().int().positive("Tenure must be positive"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  validTill: z.string().optional(),
  remarks: z.string().optional(),
});

export const updateQuotationSchema = createQuotationSchema.partial();
