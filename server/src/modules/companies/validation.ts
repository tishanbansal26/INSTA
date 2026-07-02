import { z } from "zod";

export const createCompanySchema = z.object({
  code: z.string().min(1, "Company code is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const updateCompanySchema = createCompanySchema.partial();
