import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.role?.toUpperCase();
  if (role === 'CUSTOMER') {
    return <Navigate to="/portal/dashboard" replace />;
  }
  if (role === 'AGENT') {
    return <Navigate to="/agent/dashboard" replace />;
  }

  return <Outlet />;
};

export const CustomerRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role?.toUpperCase() !== 'CUSTOMER') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const AgentRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role?.toUpperCase() !== 'AGENT') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    const role = user?.role?.toUpperCase();
    if (role === 'CUSTOMER') return <Navigate to="/portal/dashboard" replace />;
    if (role === 'AGENT') return <Navigate to="/agent/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
