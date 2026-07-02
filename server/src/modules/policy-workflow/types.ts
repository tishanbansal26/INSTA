import { WorkflowState } from "@prisma/client";

export interface CreateWorkflowDto {
  clientId: string;
}

export interface TransitionStateDto {
  workflowId: string;
  newState: WorkflowState;
  remarks?: string;
}

export interface IssuePolicyDto {
  companyId: string;
  planId: string;
  sumInsured: number;
  premiumAmount: number;
  gstAmount: number;
  paymentMode: string;
  transactionId?: string;
}
