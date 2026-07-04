import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { claimsApi } from '../api/claims';
import { toast } from 'sonner';

export const useClaims = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
  return useQuery({
    queryKey: ['claims', params],
    queryFn: () => claimsApi.list(params),
  });
};

export const useClaimDetails = (id: string) => {
  return useQuery({
    queryKey: ['claim', id],
    queryFn: () => claimsApi.getById(id),
    enabled: !!id,
  });
};

export const useClaimMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: claimsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Claim created successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create claim');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => claimsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Claim updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update claim');
    }
  });

  return {
    createClaim: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateClaim: updateMutation.mutate,
    isUpdating: updateMutation.isPending
  };
};
