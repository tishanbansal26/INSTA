import { apiClient } from './axios';

export interface Renewal {
  id: string;
  policyId: string;
  renewalDate: string;
  premiumAmount: number;
  status: string;
  remarks?: string;
  createdAt: string;
  policy?: { policyNumber: string; client?: { firstName: string; lastName: string; phone: string } };
}

export interface RenewalListResponse {
  items: Renewal[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const renewalsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<RenewalListResponse> => {
    const response = await apiClient.get('/renewals', { params });
    return response.data.data;
  },
  
  getById: async (id: string): Promise<Renewal> => {
    const response = await apiClient.get(`/renewals/${id}`);
    return response.data.data;
  },
};
