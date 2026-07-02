import { z } from "zod";

export const uploadDocumentSchema = z.object({
  body: z.object({
    clientId: z.string().optional(),
    expenseId: z.string().optional(),
    policyId: z.string().optional(),
    quotationId: z.string().optional(),
    documentType: z.enum(["AADHAAR", "PAN", "PASSPORT", "PHOTO", "POLICY", "MEDICAL_REPORT", "KYC", "CHEQUE", "BILL", "RECEIPT", "INVOICE", "OTHER"]),
    remarks: z.string().optional(),
  }).refine(data => data.clientId || data.expenseId, {
    message: "Either clientId or expenseId is required",
    path: ["clientId"],
  })
});

export const updateDocumentSchema = z.object({
  body: z.object({
    documentType: z.enum(["AADHAAR", "PAN", "PASSPORT", "PHOTO", "POLICY", "MEDICAL_REPORT", "KYC", "CHEQUE", "BILL", "RECEIPT", "INVOICE", "OTHER"]).optional(),
    remarks: z.string().optional(),
  })
});

export const verifyDocumentSchema = z.object({
  body: z.object({
    verificationStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
    remarks: z.string().optional(),
  })
});
