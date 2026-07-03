import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if it's a 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Assume you have a refresh token mechanism or you just log the user out
        // For now, we clear auth to force a re-login
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Global Error Toast handling
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);
