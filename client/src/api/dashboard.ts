import { apiClient } from './axios';

export interface DashboardOverview {
  totalClients: number;
  activePolicies: number;
  expiredPolicies: number;
  totalQuotations: number;
  totalRevenue: number;
  pendingPayments: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
}

export const dashboardApi = {
  getOverview: async (): Promise<DashboardOverview> => {
    const response = await apiClient.get('/dashboard/overview');
    return response.data.data;
  },
  getRecentActivities: async (): Promise<Activity[]> => {
    const response = await apiClient.get('/dashboard/recent-activities');
    return response.data.data;
  }
};
