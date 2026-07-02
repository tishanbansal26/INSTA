export interface CreatePolicyDto {
  clientId: string;
  companyId: string;
  planId: string;
  agentId: string;
  sumInsured: number;
  premiumAmount: number;
  gstAmount: number;
  issueDate: string;
  startDate: string;
  expiryDate: string;
  status?: "DRAFT" | "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";
  paymentStatus?: "PENDING" | "PAID" | "PARTIAL" | "FAILED";
  remarks?: string;
}

export interface UpdatePolicyDto extends Partial<CreatePolicyDto> {}
