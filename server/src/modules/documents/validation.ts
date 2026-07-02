import { z } from "zod";

export const uploadDocumentSchema = z.object({
  body: z.object({
    clientId: z.string().min(1, "Client ID is required"),
    policyId: z.string().optional(),
    quotationId: z.string().optional(),
    documentType: z.enum(["AADHAAR", "PAN", "PASSPORT", "PHOTO", "POLICY", "MEDICAL_REPORT", "KYC", "CHEQUE", "OTHER"]),
    remarks: z.string().optional(),
  })
});

export const updateDocumentSchema = z.object({
  body: z.object({
    documentType: z.enum(["AADHAAR", "PAN", "PASSPORT", "PHOTO", "POLICY", "MEDICAL_REPORT", "KYC", "CHEQUE", "OTHER"]).optional(),
    remarks: z.string().optional(),
  })
});

export const verifyDocumentSchema = z.object({
  body: z.object({
    verificationStatus: z.enum(["PENDING", "VERIFIED", "REJECTED"]),
    remarks: z.string().optional(),
  })
});
