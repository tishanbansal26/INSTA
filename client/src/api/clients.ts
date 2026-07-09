import { apiClient } from './axios';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
  policies?: any[];
  _count?: { policies: number };
}

export interface ClientListResponse {
  items: Client[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const clientsApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<ClientListResponse> => {
    const response = await apiClient.get('/clients', { params });
    return response.data;
  },
  
  getById: async (id: string): Promise<Client> => {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data;
  },

  create: async (data: Partial<Client>): Promise<Client> => {
    const response = await apiClient.post('/clients', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Client>): Promise<Client> => {
    const response = await apiClient.put(`/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  }
};
