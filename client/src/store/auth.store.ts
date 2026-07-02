import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isCustomer: boolean;
  isAgent: boolean;
  isAdmin: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isCustomer: false,
      isAgent: false,
      isAdmin: false,
      setAuth: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true,
        isCustomer: user.role === 'CUSTOMER',
        isAgent: user.role === 'AGENT',
        isAdmin: user.role === 'ADMIN' || user.role === 'MANAGER'
      }),
      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false,
        isCustomer: false,
        isAgent: false,
        isAdmin: false
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
