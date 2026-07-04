import { useQuery } from '@tanstack/react-query';
import { expensesApi } from '../api/expenses';

export const useExpenses = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['expenses', params],
    queryFn: () => expensesApi.list(params),
  });
};

export const useExpenseDetails = (id: string) => {
  return useQuery({
    queryKey: ['expense', id],
    queryFn: () => expensesApi.getById(id),
    enabled: !!id,
  });
};
