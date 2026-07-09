import { apiClient } from './axios';

export interface Expense {
  id: string;
  category: string;
  vendor?: string;
  amount: number;
  gst: number;
  paymentMode: string;
  remarks?: string;
  createdAt: string;
}

export interface ExpenseListResponse {
  items: Expense[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const expensesApi = {
  list: async (params?: { page?: number; limit?: number; search?: string }): Promise<ExpenseListResponse> => {
    const response = await apiClient.get('/expenses', { params });
    return response.data;
  },
  
  getById: async (id: string): Promise<Expense> => {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  },
};
