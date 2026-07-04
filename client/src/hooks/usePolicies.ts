import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { policiesApi } from '../api/policies';
import { toast } from 'sonner';

export const usePolicies = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
  return useQuery({
    queryKey: ['policies', params],
    queryFn: () => policiesApi.list(params),
  });
};

export const usePolicyDetails = (id: string) => {
  return useQuery({
    queryKey: ['policy', id],
    queryFn: () => policiesApi.getById(id),
    enabled: !!id,
  });
};

export const usePolicyMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: policiesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      toast.success('Policy created successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create policy');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => policiesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      toast.success('Policy updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update policy');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: policiesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      toast.success('Policy deleted successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete policy');
    }
  });

  return {
    createPolicy: createMutation.mutate,
    isCreating: createMutation.isPending,
    updatePolicy: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deletePolicy: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};
