import { apiClient } from './axios';

export interface Policy {
  id: string;
  policyNumber: string;
  clientId: string;
  planId: string;
  companyId: string;
  status: string;
  startDate: string;
  endDate: string;
  premium: number;
  sumInsured: number;
  client?: { firstName: string; lastName: string; phone: string; email: string };
  plan?: { name: string; type: string };
  company?: { name: string };
}

export interface PolicyListResponse {
  items: Policy[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const policiesApi = {
  list: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<PolicyListResponse> => {
    const response = await apiClient.get('/policies', { params });
    return response.data;
  },
  
  getById: async (id: string): Promise<Policy> => {
    const response = await apiClient.get(`/policies/${id}`);
    return response.data;
  },

  create: async (data: Partial<Policy>): Promise<Policy> => {
    const response = await apiClient.post('/policies', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Policy>): Promise<Policy> => {
    const response = await apiClient.put(`/policies/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/policies/${id}`);
  }
};
