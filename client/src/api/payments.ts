import { apiClient } from './axios';

export interface Payment {
  id: string;
  receiptNumber: string;
  policyId: string;
  quotationId?: string;
  amount: number;
  gst: number;
  paymentMode: string;
  paymentStatus: string;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
  policy?: { policyNumber: string; client?: { firstName: string; lastName: string } };
}

export interface PaymentListResponse {
  items: Payment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const paymentsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<PaymentListResponse> => {
    const response = await apiClient.get('/payments', { params });
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Payment> => {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data.data;
  },
  
  createOrder: async (data: { amount: number; receipt: string }) => {
    const response = await apiClient.post('/payments/razorpay/create-order', data);
    return response.data.data;
  },

  verifyPayment: async (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; paymentId: string }) => {
    const response = await apiClient.post('/payments/razorpay/verify', data);
    return response.data.data;
  }
};
