import { PaymentMode, PaymentStatus } from "@prisma/client";

export interface CreatePaymentDto {
  policyId: string;
  quotationId?: string;
  amount: number;
  gst: number;
  paymentMode: PaymentMode;
  transactionId?: string;
  paymentGateway?: string;
  remarks?: string;
}

export interface UpdatePaymentDto {
  paymentStatus?: PaymentStatus;
  transactionId?: string;
  paymentGateway?: string;
  paidAt?: Date;
  remarks?: string;
}
