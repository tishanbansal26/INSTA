export interface PolicyRecord {
  id: string;
  policyNumber: string;
  clientId: string;
  companyId: string;
  planId: string;
  agentId: string;
  sumInsured: number;
  premiumAmount: number;
  gstAmount: number;
  issueDate: Date;
  startDate: Date;
  expiryDate: Date;
  status: string;
  paymentStatus: string;
  remarks?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
