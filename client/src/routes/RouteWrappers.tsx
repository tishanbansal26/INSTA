import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

export const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // If not admin but authenticated, they shouldn't be on admin routes
    return <Navigate to="/portal" replace />;
  }

  return <Outlet />;
};

export const CustomerRoute = () => {
  const { isAuthenticated, isCustomer } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isCustomer) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const AgentRoute = () => {
  const { isAuthenticated, isAgent } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAgent) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const { isAuthenticated, isCustomer, isAgent } = useAuthStore();

  if (isAuthenticated) {
    if (isCustomer) return <Navigate to="/portal/dashboard" replace />;
    if (isAgent) return <Navigate to="/agent/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
