import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    }
  });
};
