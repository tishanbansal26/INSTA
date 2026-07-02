import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/app.store';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, Users, Building, FileText, Calculator, 
  FileSpreadsheet, ShieldCheck, CreditCard, Folder, RefreshCw, 
  BarChart, Settings, Menu 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', path: '/clients', icon: Users },
  { name: 'Companies', path: '/companies', icon: Building },
  { name: 'Plans', path: '/plans', icon: FileText },
  { name: 'Premium Calculator', path: '/premium', icon: Calculator },
  { name: 'Quotations', path: '/quotations', icon: FileSpreadsheet },
  { name: 'Policies', path: '/policies', icon: ShieldCheck },
  { name: 'Payments', path: '/payments', icon: CreditCard },
  { name: 'Documents', path: '/documents', icon: Folder },
  { name: 'Renewals', path: '/renewals', icon: RefreshCw },
  { name: 'Reports', path: '/reports', icon: BarChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen transition-all duration-300 border-r border-border bg-card",
      isSidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {isSidebarOpen && <span className="text-xl font-bold text-primary">InsureFlow</span>}
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-text">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)]">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center p-3 rounded-lg transition-colors group relative",
                  isActive 
                    ? "bg-primary/10 text-primary border-r-2 border-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-text"
                )}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <item.icon className={cn("w-5 h-5", isSidebarOpen && "mr-3")} />
                {isSidebarOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
