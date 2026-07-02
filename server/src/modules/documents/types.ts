import { DocumentType, VerificationStatus } from "@prisma/client";

export type DocumentFilter = {
  clientId?: string;
  policyId?: string;
  quotationId?: string;
  documentType?: DocumentType;
  verificationStatus?: VerificationStatus;
};
