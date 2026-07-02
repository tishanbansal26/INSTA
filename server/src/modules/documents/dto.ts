import { DocumentType, VerificationStatus } from "@prisma/client";

export interface CreateDocumentDto {
  clientId: string;
  policyId?: string;
  quotationId?: string;
  documentType: DocumentType;
  remarks?: string;
}

export interface UpdateDocumentDto {
  documentType?: DocumentType;
  remarks?: string;
}

export interface VerifyDocumentDto {
  verificationStatus: VerificationStatus;
  remarks?: string;
}
