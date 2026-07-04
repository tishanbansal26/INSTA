import { useQuery } from '@tanstack/react-query';
import { quotationsApi } from '../api/quotations';

export const useQuotations = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['quotations', params],
    queryFn: () => quotationsApi.list(params),
  });
};

export const useQuotationDetails = (id: string) => {
  return useQuery({
    queryKey: ['quotation', id],
    queryFn: () => quotationsApi.getById(id),
    enabled: !!id,
  });
};
