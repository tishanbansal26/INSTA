import { z } from "zod";
import { WorkflowState } from "@prisma/client";

export const CreateWorkflowSchema = z.object({
  clientId: z.string().cuid("Invalid Client ID"),
});

export const ApproveWorkflowSchema = z.object({
  remarks: z.string().optional(),
});

export const PaymentSchema = z.object({
  amount: z.number().positive(),
  gst: z.number().nonnegative(),
  paymentMode: z.enum(["CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE"]),
  transactionId: z.string().optional(),
  remarks: z.string().optional(),
});

export const IssuePolicySchema = z.object({
  companyId: z.string().cuid(),
  planId: z.string().cuid(),
  sumInsured: z.number().positive(),
  premiumAmount: z.number().positive(),
  gstAmount: z.number().nonnegative(),
  paymentMode: z.enum(["CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE"]),
  transactionId: z.string().optional(),
});
