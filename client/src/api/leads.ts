import { apiClient } from './axios';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  source?: string;
  status: string;
  priority: string;
  assignedToId?: string;
  createdAt: string;
}

export interface LeadListResponse {
  items: Lead[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const leadsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<LeadListResponse> => {
    const response = await apiClient.get('/leads', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Lead> => {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data;
  },

  create: async (data: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.post('/leads', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.put(`/leads/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  }
};
