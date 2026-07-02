import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, GuestRoute, CustomerRoute, AgentRoute } from './routes/RouteWrappers';
import { MainLayout } from './components/layout/MainLayout';
import { PortalLayout } from './modules/customer-portal/layout/PortalLayout';
import { AgentLayout } from './modules/agent-portal/layout/AgentLayout';

// Lazy load Pages
const Login = lazy(() => import('./modules/auth/pages/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('./modules/dashboard/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const ClientList = lazy(() => import('./modules/clients/pages/ClientList').then(m => ({ default: m.ClientList })));
const CompanyList = lazy(() => import('./modules/companies/pages/CompanyList').then(m => ({ default: m.CompanyList })));
const PlanList = lazy(() => import('./modules/plans/pages/PlanList').then(m => ({ default: m.PlanList })));
const PremiumCalculator = lazy(() => import('./modules/premium/pages/PremiumCalculator').then(m => ({ default: m.PremiumCalculator })));
const QuotationList = lazy(() => import('./modules/quotations/pages/QuotationList').then(m => ({ default: m.QuotationList })));
const PolicyList = lazy(() => import('./modules/policies/pages/PolicyList').then(m => ({ default: m.PolicyList })));
const PaymentList = lazy(() => import('./modules/payments/pages/PaymentList').then(m => ({ default: m.PaymentList })));
const RenewalList = lazy(() => import('./modules/renewals/pages/RenewalList').then(m => ({ default: m.RenewalList })));
const ClaimList = lazy(() => import('./modules/claims/pages/ClaimList').then(m => ({ default: m.ClaimList })));
const ClaimDetails = lazy(() => import('./modules/claims/pages/ClaimDetails').then(m => ({ default: m.ClaimDetails })));
const ClaimsReport = lazy(() => import('./modules/reports/pages/ClaimsReport').then(m => ({ default: m.ClaimsReport })));
const LeadList = lazy(() => import('./modules/leads/pages/LeadList'));
const LeadDetails = lazy(() => import('./modules/leads/pages/LeadDetails'));
const CampaignList = lazy(() => import('./modules/campaigns/pages/CampaignList'));
const CalendarView = lazy(() => import('./modules/calendar/pages/CalendarView'));
const TaskList = lazy(() => import('./modules/tasks/pages/TaskList'));
const Settings = lazy(() => import('./modules/settings/pages/Settings'));
const FinanceDashboard = lazy(() => import('./modules/finance/pages/FinanceDashboard'));
const CommissionList = lazy(() => import('./modules/finance/pages/CommissionList'));
const ExpenseList = lazy(() => import('./modules/finance/pages/ExpenseList'));
const PayoutList = lazy(() => import('./modules/finance/pages/PayoutList'));
const InvoiceList = lazy(() => import('./modules/finance/pages/InvoiceList'));

// Customer Portal
const PortalDashboard = lazy(() => import('./modules/customer-portal/pages/PortalDashboard').then(m => ({ default: m.PortalDashboard })));
const MyPolicies = lazy(() => import('./modules/customer-portal/pages/MyPolicies').then(m => ({ default: m.MyPolicies })));
const MyFamily = lazy(() => import('./modules/customer-portal/pages/MyFamily').then(m => ({ default: m.MyFamily })));
const MyWallet = lazy(() => import('./modules/customer-portal/pages/MyWallet').then(m => ({ default: m.MyWallet })));
const MyClaims = lazy(() => import('./modules/customer-portal/pages/MyClaims').then(m => ({ default: m.MyClaims })));
const MyDocuments = lazy(() => import('./modules/customer-portal/pages/MyDocuments').then(m => ({ default: m.MyDocuments })));
const MyQuotations = lazy(() => import('./modules/customer-portal/pages/MyQuotations').then(m => ({ default: m.MyQuotations })));
const CustomerProfile = lazy(() => import('./modules/customer-portal/pages/CustomerProfile').then(m => ({ default: m.CustomerProfile })));
const SupportTickets = lazy(() => import('./modules/customer-portal/pages/SupportTickets').then(m => ({ default: m.SupportTickets })));

// Agent Portal
const AgentDashboard = lazy(() => import('./modules/agent-portal/pages/AgentDashboard').then(m => ({ default: m.AgentDashboard })));
const AgentLeads = lazy(() => import('./modules/agent-portal/pages/AgentLeads').then(m => ({ default: m.AgentLeads })));
const AgentClients = lazy(() => import('./modules/agent-portal/pages/AgentClients').then(m => ({ default: m.AgentClients })));
const AgentPolicies = lazy(() => import('./modules/agent-portal/pages/AgentPolicies').then(m => ({ default: m.AgentPolicies })));
const AgentCommissions = lazy(() => import('./modules/agent-portal/pages/AgentCommissions').then(m => ({ default: m.AgentCommissions })));
const AgentCalendar = lazy(() => import('./modules/agent-portal/pages/AgentCalendar').then(m => ({ default: m.AgentCalendar })));
const AgentClaims = lazy(() => import('./modules/agent-portal/pages/AgentClaims').then(m => ({ default: m.AgentClaims })));
const AgentRenewals = lazy(() => import('./modules/agent-portal/pages/AgentRenewals').then(m => ({ default: m.AgentRenewals })));
const AgentPerformance = lazy(() => import('./modules/agent-portal/pages/AgentPerformance').then(m => ({ default: m.AgentPerformance })));

const SuspenseFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Other routes will be added in subsequent phases */}
              {/* CRM Routes */}
              <Route path="/leads" element={<LeadList />} />
              <Route path="/leads/:id" element={<LeadDetails />} />
              <Route path="/campaigns" element={<CampaignList />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/tasks" element={<TaskList />} />
              {/* Insurance Routes */}
              <Route path="/clients" element={<ClientList />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/plans" element={<PlanList />} />
              <Route path="/premium" element={<PremiumCalculator />} />
              <Route path="/quotations" element={<QuotationList />} />
              <Route path="/policies" element={<PolicyList />} />
              <Route path="/payments" element={<PaymentList />} />
              <Route path="/claims" element={<ClaimList />} />
              <Route path="/claims/:id" element={<ClaimDetails />} />
              <Route path="/documents" element={<div className="text-text">Documents Module</div>} />
              <Route path="/renewals" element={<RenewalList />} />
              <Route path="/reports" element={<ClaimsReport />} />
              
              {/* Finance Routes */}
              <Route path="/finance" element={<FinanceDashboard />} />
              <Route path="/finance/commissions" element={<CommissionList />} />
              <Route path="/finance/expenses" element={<ExpenseList />} />
              <Route path="/finance/payouts" element={<PayoutList />} />
              <Route path="/finance/invoices" element={<InvoiceList />} />

              {/* System Routes */}
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<CustomerRoute />}>
            <Route element={<PortalLayout />}>
              <Route path="/portal" element={<Navigate to="/portal/dashboard" replace />} />
              <Route path="/portal/dashboard" element={<PortalDashboard />} />
              <Route path="/portal/policies" element={<MyPolicies />} />
              <Route path="/portal/family" element={<MyFamily />} />
              <Route path="/portal/wallet" element={<MyWallet />} />
              <Route path="/portal/claims" element={<MyClaims />} />
              <Route path="/portal/documents" element={<MyDocuments />} />
              <Route path="/portal/quotations" element={<MyQuotations />} />
              <Route path="/portal/profile" element={<CustomerProfile />} />
              <Route path="/portal/support" element={<SupportTickets />} />
              <Route path="/portal/ai" element={<div className="p-8 text-center text-text">AI Assistant Component Coming Soon</div>} />
            </Route>
          </Route>

          <Route element={<AgentRoute />}>
            <Route element={<AgentLayout />}>
              <Route path="/agent" element={<Navigate to="/agent/dashboard" replace />} />
              <Route path="/agent/dashboard" element={<AgentDashboard />} />
              <Route path="/agent/leads" element={<AgentLeads />} />
              <Route path="/agent/clients" element={<AgentClients />} />
              <Route path="/agent/policies" element={<AgentPolicies />} />
              <Route path="/agent/commissions" element={<AgentCommissions />} />
              <Route path="/agent/claims" element={<AgentClaims />} />
              <Route path="/agent/renewals" element={<AgentRenewals />} />
              <Route path="/agent/calendar" element={<AgentCalendar />} />
              <Route path="/agent/performance" element={<AgentPerformance />} />
            </Route>
          </Route>

          <Route path="*" element={<div className="text-text p-10 text-center">404 - Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
