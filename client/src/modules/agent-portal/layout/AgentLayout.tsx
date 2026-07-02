import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Shield, 
  IndianRupee, 
  FileCheck, 
  CalendarClock, 
  CalendarDays,
  LogOut,
  Bell,
  Menu,
  LineChart
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export const AgentLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/agent/dashboard', icon: LayoutDashboard },
    { label: 'My Leads', path: '/agent/leads', icon: UserPlus },
    { label: 'My Clients', path: '/agent/clients', icon: Users },
    { label: 'Policies Sold', path: '/agent/policies', icon: Shield },
    { label: 'Commissions', path: '/agent/commissions', icon: IndianRupee },
    { label: 'Claims (Assigned)', path: '/agent/claims', icon: FileCheck },
    { label: 'Renewals', path: '/agent/renewals', icon: CalendarClock },
    { label: 'Calendar & Tasks', path: '/agent/calendar', icon: CalendarDays },
    { label: 'Performance', path: '/agent/performance', icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans text-text">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-blue-600">Agent Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-secondary hover:text-blue-600 transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface"></span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-surface border-r border-border flex-col transition-transform duration-300 z-50 fixed md:sticky top-0 h-screen",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-blue-600 tracking-tight">Agent Portal</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600/10 text-blue-600 font-medium" 
                  : "text-text-secondary hover:bg-surface-hover hover:text-text"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="font-medium text-sm text-text">{user?.name || 'Agent'}</p>
              <p className="text-xs text-text-secondary truncate w-32">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col h-screen">
        <header className="h-16 hidden md:flex items-center justify-between px-8 bg-background border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            {/* Agent KPI Summary in Header */}
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="font-medium text-text">12</span> Policies This Month
              </span>
              <span className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-text">₹45,200</span> Comm. Earned
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-secondary hover:text-blue-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
