import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/app.store';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, Users, Building, FileText, Calculator, 
  FileSpreadsheet, ShieldCheck, CreditCard, Folder, RefreshCw, 
  BarChart, Settings, Menu, ClipboardList, UserCheck, Target,
  Calendar, CheckSquare, IndianRupee, Receipt, CreditCard as Banknote,
  ChevronDown, ChevronRight
} from 'lucide-react';

const navSections = [
  {
    label: 'Main',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'CRM',
    items: [
      { name: 'Leads', path: '/leads', icon: UserCheck },
      { name: 'Campaigns', path: '/campaigns', icon: Target },
      { name: 'Calendar', path: '/calendar', icon: Calendar },
      { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    ]
  },
  {
    label: 'Insurance',
    items: [
      { name: 'Clients', path: '/clients', icon: Users },
      { name: 'Companies', path: '/companies', icon: Building },
      { name: 'Plans', path: '/plans', icon: FileText },
      { name: 'Premium Calculator', path: '/premium', icon: Calculator },
      { name: 'Quotations', path: '/quotations', icon: FileSpreadsheet },
      { name: 'Policies', path: '/policies', icon: ShieldCheck },
      { name: 'Payments', path: '/payments', icon: CreditCard },
      { name: 'Documents', path: '/documents', icon: Folder },
      { name: 'Claims', path: '/claims', icon: ClipboardList },
      { name: 'Renewals', path: '/renewals', icon: RefreshCw },
    ]
  },
  {
    label: 'Finance',
    items: [
      { name: 'Dashboard', path: '/finance', icon: IndianRupee },
      { name: 'Commissions', path: '/finance/commissions', icon: Banknote },
      { name: 'Expenses', path: '/finance/expenses', icon: Receipt },
      { name: 'Payouts', path: '/finance/payouts', icon: Banknote },
      { name: 'Invoices', path: '/finance/invoices', icon: FileText },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { name: 'Reports', path: '/reports', icon: BarChart },
    ]
  },
  {
    label: 'System',
    items: [
      { name: 'Settings', path: '/settings', icon: Settings },
    ]
  },
];

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAppStore();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Main', 'CRM', 'Insurance', 'Finance']);

  const toggleSection = (label: string) => {
    setExpandedSections(prev => 
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen transition-all duration-300 border-r border-border bg-card",
      isSidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {isSidebarOpen && <span className="text-xl font-bold text-primary">InsureFlow</span>}
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-text mx-auto">
          <Menu className="w-5 h-5" />
        </button>
      </div>
      <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
        {navSections.map((section) => {
          const isExpanded = expandedSections.includes(section.label);
          
          return (
            <div key={section.label} className="mb-2">
              {isSidebarOpen ? (
                <button 
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-text transition-colors"
                >
                  <span>{section.label}</span>
                  {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
              ) : (
                <div className="flex justify-center py-2">
                  <div className="h-px w-8 bg-border" />
                </div>
              )}
              
              <ul className={cn(
                "space-y-1 px-2 transition-all duration-300 overflow-hidden",
                isSidebarOpen && !isExpanded ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100 mt-1"
              )}>
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center p-2.5 rounded-lg transition-colors group relative",
                        isActive 
                          ? "bg-primary/10 text-primary border-r-2 border-primary" 
                          : "text-muted-foreground hover:bg-secondary hover:text-text"
                      )}
                      title={!isSidebarOpen ? item.name : undefined}
                    >
                      <item.icon className={cn("w-5 h-5 shrink-0", isSidebarOpen && "mr-3")} />
                      {isSidebarOpen && <span className="text-sm truncate">{item.name}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
