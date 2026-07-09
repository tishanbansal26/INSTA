import { apiClient } from './axios';

export interface Commission {
  id: string;
  commissionNumber: string;
  policyId: string;
  companyId: string;
  totalCommissionAmount: number;
  status: string;
  createdAt: string;
  policy?: { policyNumber: string; client?: { firstName: string; lastName: string } };
  company?: { name: string };
  splits?: any[];
}

export interface CommissionListResponse {
  items: Commission[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const commissionsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<CommissionListResponse> => {
    const response = await apiClient.get('/commissions', { params });
    return response.data;
  },
  
  getById: async (id: string): Promise<Commission> => {
    const response = await apiClient.get(`/commissions/${id}`);
    return response.data;
  },
};
