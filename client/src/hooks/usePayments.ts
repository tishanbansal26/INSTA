import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentsApi } from '../api/payments';
import { toast } from 'sonner';

export const usePayments = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: () => paymentsApi.list(params),
  });
};

export const usePaymentDetails = (id: string) => {
  return useQuery({
    queryKey: ['payment', id],
    queryFn: () => paymentsApi.getById(id),
    enabled: !!id,
  });
};

export const usePaymentMutations = () => {
  const queryClient = useQueryClient();

  const createOrder = useMutation({
    mutationFn: paymentsApi.createOrder,
    onError: (error: any) => toast.error(error.response?.data?.message || 'Failed to create payment order')
  });

  const verifyPayment = useMutation({
    mutationFn: paymentsApi.verifyPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment completed successfully!');
    },
    onError: (error: any) => toast.error(error.response?.data?.message || 'Payment verification failed')
  });

  return {
    createOrder: createOrder.mutateAsync,
    isCreatingOrder: createOrder.isPending,
    verifyPayment: verifyPayment.mutateAsync,
    isVerifying: verifyPayment.isPending
  };
};
