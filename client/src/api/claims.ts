import { apiClient } from './axios';

export interface Claim {
  id: string;
  claimNumber: string;
  clientId: string;
  policyId: string;
  claimType: string;
  priority: string;
  claimAmount: number;
  settledAmount?: number;
  raisedDate: string;
  incidentDate?: string;
  status: string;
  remarks?: string;
  client?: { firstName: string; lastName: string };
  policy?: { policyNumber: string };
}

export interface ClaimListResponse {
  items: Claim[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const claimsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<ClaimListResponse> => {
    const response = await apiClient.get('/claims', { params });
    return response.data;
  },
  
  getById: async (id: string): Promise<Claim> => {
    const response = await apiClient.get(`/claims/${id}`);
    return response.data;
  },

  create: async (data: Partial<Claim>): Promise<Claim> => {
    const response = await apiClient.post('/claims', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Claim>): Promise<Claim> => {
    const response = await apiClient.put(`/claims/${id}`, data);
    return response.data;
  }
};
