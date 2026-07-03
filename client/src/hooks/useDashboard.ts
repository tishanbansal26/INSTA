import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard';

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardApi.getOverview(),
  });
};

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: () => dashboardApi.getRecentActivities(),
  });
};
