import { useState } from 'react';
import { Bell, Search, Sun, Moon, ChevronRight } from 'lucide-react';
import { useThemeStore } from '@/store/theme.store';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';

export function Navbar() {
  const { theme, setTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const handleMarkAllRead = () => {
    setHasUnread(false);
  };

  const handleViewAll = () => {
    alert("Navigating to all notifications...");
    setShowNotifications(false);
  };

  const handleNotificationClick = (title: string) => {
    alert(`Viewing details for: ${title}`);
    setShowNotifications(false);
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur flex items-center justify-between px-6 z-30">
      <div className="flex-1 flex items-center space-x-6">
        <div className="flex items-center text-sm text-muted-foreground capitalize">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <div key={to} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link to={to} className="hover:text-primary transition-colors font-medium text-text">{value}</Link>
              </div>
            );
          })}
        </div>
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search policies..." 
            className="w-full pl-10 pr-4 py-1.5 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary text-text placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="h-5 w-5" />
            {hasUnread && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger animate-pulse"></span>}
          </Button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-text">Notifications</h3>
                {hasUnread && <span className="text-xs text-primary font-bold cursor-pointer hover:underline" onClick={handleMarkAllRead}>Mark all as read</span>}
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-border hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => handleNotificationClick('New Quote Requested')}>
                  <p className="text-sm font-bold text-text flex justify-between items-center">New Quote Requested {hasUnread && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}</p>
                  <p className="text-xs text-text-secondary mt-1">Rahul Sharma requested a quote for Optima Restore.</p>
                  <p className="text-[10px] text-primary font-bold mt-2">Just now</p>
                </div>
                <div className="p-4 border-b border-border hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => handleNotificationClick('Policy Renewed')}>
                  <p className="text-sm font-bold text-text flex justify-between items-center">Policy Renewed {hasUnread && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}</p>
                  <p className="text-xs text-text-secondary mt-1">Priya Patel's health policy was renewed successfully.</p>
                  <p className="text-[10px] text-text-secondary font-bold mt-2">2 hours ago</p>
                </div>
              </div>
              <div className="p-3 text-center border-t border-border hover:bg-surface-hover cursor-pointer transition-colors" onClick={handleViewAll}>
                <span className="text-sm font-bold text-primary">View all</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3 border-l border-border pl-4 cursor-pointer" onClick={logout} title="Click to logout">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none text-text">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-muted-foreground mt-1">{user?.role || 'Administrator'}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.[0] || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
