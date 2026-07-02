import { Prisma } from "@prisma/client";

export type PaymentFilter = {
  policyId?: string;
  quotationId?: string;
  clientId?: string;
  paymentMode?: "CASH" | "UPI" | "CARD" | "NET_BANKING" | "CHEQUE";
  paymentStatus?: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED" | "PARTIAL";
  fromDate?: Date;
  toDate?: Date;
};
