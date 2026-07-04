import { useQuery } from '@tanstack/react-query';
import { commissionsApi } from '../api/commissions';

export const useCommissions = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['commissions', params],
    queryFn: () => commissionsApi.list(params),
  });
};

export const useCommissionDetails = (id: string) => {
  return useQuery({
    queryKey: ['commission', id],
    queryFn: () => commissionsApi.getById(id),
    enabled: !!id,
  });
};
