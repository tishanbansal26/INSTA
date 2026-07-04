import { useQuery } from '@tanstack/react-query';
import { renewalsApi } from '../api/renewals';

export const useRenewals = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['renewals', params],
    queryFn: () => renewalsApi.list(params),
  });
};

export const useRenewalDetails = (id: string) => {
  return useQuery({
    queryKey: ['renewal', id],
    queryFn: () => renewalsApi.getById(id),
    enabled: !!id,
  });
};
