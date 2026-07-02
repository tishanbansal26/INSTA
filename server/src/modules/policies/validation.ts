import { z } from "zod";

export const createPolicySchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  companyId: z.string().min(1, "Company is required"),
  planId: z.string().min(1, "Plan is required"),
  agentId: z.string().min(1, "Agent is required"),
  sumInsured: z.number().positive("Sum insured must be positive"),
  premiumAmount: z.number().positive("Premium amount must be positive"),
  gstAmount: z.number().positive("GST amount must be positive"),
  issueDate: z.string().min(1, "Issue date is required"),
  startDate: z.string().min(1, "Start date is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  status: z.enum(["DRAFT", "PENDING", "ACTIVE", "EXPIRED", "CANCELLED"]).optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "PARTIAL", "FAILED"]).optional(),
  remarks: z.string().optional(),
});

export const updatePolicySchema = createPolicySchema.partial();
