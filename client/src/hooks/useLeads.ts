import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi } from '../api/leads';
import { toast } from 'sonner';

export const useLeads = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadsApi.list(params),
  });
};

export const useLeadMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: leadsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to create lead');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => leadsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update lead');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: leadsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted successfully');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to delete lead');
    }
  });

  return {
    createLead: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateLead: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteLead: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};
