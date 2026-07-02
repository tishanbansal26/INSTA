import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, GuestRoute } from './routes/RouteWrappers';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { Login } from './modules/auth/pages/Login';
import { Dashboard } from './modules/dashboard/pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Other routes will be added in subsequent phases */}
            <Route path="/clients" element={<div className="text-text">Clients Module</div>} />
            <Route path="/companies" element={<div className="text-text">Companies Module</div>} />
            <Route path="/plans" element={<div className="text-text">Plans Module</div>} />
            <Route path="/premium" element={<div className="text-text">Premium Calculator Module</div>} />
            <Route path="/quotations" element={<div className="text-text">Quotations Module</div>} />
            <Route path="/policies" element={<div className="text-text">Policies Module</div>} />
            <Route path="/payments" element={<div className="text-text">Payments Module</div>} />
            <Route path="/documents" element={<div className="text-text">Documents Module</div>} />
            <Route path="/renewals" element={<div className="text-text">Renewals Module</div>} />
            <Route path="/reports" element={<div className="text-text">Reports Module</div>} />
            <Route path="/settings" element={<div className="text-text">Settings Module</div>} />
          </Route>
        </Route>

        <Route path="*" element={<div className="text-text p-10 text-center">404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
