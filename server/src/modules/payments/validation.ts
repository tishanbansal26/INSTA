import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    policyId: z.string().min(1, "Policy ID is required"),
    quotationId: z.string().optional(),
    amount: z.number().positive("Amount must be positive"),
    gst: z.number().nonnegative("GST must be non-negative"),
    paymentMode: z.enum(["CASH", "UPI", "CARD", "NET_BANKING", "CHEQUE"]),
    transactionId: z.string().optional(),
    paymentGateway: z.string().optional(),
    remarks: z.string().optional(),
  })
});

export const updatePaymentSchema = z.object({
  body: z.object({
    paymentStatus: z.enum(["PENDING", "SUCCESS", "FAILED", "REFUNDED", "PARTIAL"]).optional(),
    transactionId: z.string().optional(),
    paymentGateway: z.string().optional(),
    paidAt: z.string().datetime().optional(),
    remarks: z.string().optional(),
  })
});
