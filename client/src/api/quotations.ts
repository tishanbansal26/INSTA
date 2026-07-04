import { apiClient } from './axios';

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientId: string;
  planId: string;
  totalPremium: number;
  validTill: string;
  status: string;
  createdAt: string;
  client?: { firstName: string; lastName: string; phone: string };
  plan?: { name: string; company?: { name: string } };
}

export interface QuotationListResponse {
  items: Quotation[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const quotationsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<QuotationListResponse> => {
    const response = await apiClient.get('/quotations', { params });
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Quotation> => {
    const response = await apiClient.get(`/quotations/${id}`);
    return response.data.data;
  },
};
