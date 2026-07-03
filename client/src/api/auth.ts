import { apiClient } from './axios';
import { LoginInput, RegisterInput, AuthResponse } from '@insureflow/shared';

export const authApi = {
  login: async (credentials: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data; // Note: apiClient response interceptor already returns response.data
  },
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  logout: async () => {
    return apiClient.post('/auth/logout');
  }
};
