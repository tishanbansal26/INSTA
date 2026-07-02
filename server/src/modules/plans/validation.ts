import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  code: z.string().min(1, "Plan code is required"),
  category: z.string().optional(),
  description: z.string().optional(),
  companyId: z.string().min(1, "Company is required"),
  isActive: z.boolean().optional(),
});

export const updatePlanSchema = createPlanSchema.partial();
