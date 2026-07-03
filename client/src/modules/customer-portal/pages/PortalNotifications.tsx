import { useState } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  Wallet, 
  Clock, 
  FileText, 
  CheckCircle2, 
  FileSignature,
  Trash2,
  CheckCheck,
  Filter
} from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'CLAIM', title: 'Claim Status Updated', message: 'Your claim CLM-88902 has moved to Under Review stage.', time: '10 mins ago', read: false, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, type: 'PREMIUM', title: 'Premium Due Reminder', message: 'Your premium of ₹15,000 for POL-11234 is due on 12 Nov 2026.', time: '2 hours ago', read: false, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 3, type: 'PAYMENT', title: 'Payment Successful', message: 'We have received your payment of ₹15,000 via Credit Card.', time: '1 day ago', read: true, icon: Wallet, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 4, type: 'POLICY', title: 'New Policy Issued', message: 'Your Comprehensive Health Plan (POL-9928134) is now active.', time: '3 days ago', read: true, icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 5, type: 'QUOTATION', title: 'New Quotation Received', message: 'Agent Rahul has sent a new quotation for Term Life Insurance.', time: '1 week ago', read: true, icon: FileSignature, color: 'text-purple-500', bg: 'bg-purple-500/10' }
];

export const PortalNotifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filtered = activeFilter === 'ALL' 
    ? notifications 
    : activeFilter === 'UNREAD' 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeFilter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" /> Notifications
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-primary text-white text-xs font-bold rounded-full">{unreadCount}</span>
            )}
          </h1>
          <p className="text-text-secondary mt-1">Stay updated on your policies, claims, and payments.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-text font-medium rounded-lg hover:border-primary transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            {[
              { id: 'ALL', label: 'All Notifications' },
              { id: 'UNREAD', label: 'Unread Only' },
              { id: 'POLICY', label: 'Policy Updates' },
              { id: 'CLAIM', label: 'Claim Updates' },
              { id: 'PREMIUM', label: 'Premium Reminders' },
              { id: 'PAYMENT', label: 'Payment Receipts' },
            ].map(filter => (
              <button 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`w-full flex justify-between items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification List */}
        <div className="lg:col-span-3">
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            {filtered.length > 0 ? (
              <div className="divide-y divide-border">
                {filtered.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`p-5 flex gap-4 transition-colors group ${notif.read ? 'bg-background hover:bg-surface' : 'bg-primary/5 hover:bg-primary/10'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                      <notif.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-bold ${notif.read ? 'text-text' : 'text-primary'}`}>
                          {notif.title}
                        </h4>
                        <span className="text-xs font-medium text-text-secondary">{notif.time}</span>
                      </div>
                      <p className="text-sm text-text-secondary">{notif.message}</p>
                      
                      {/* Actions */}
                      <div className="mt-3 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notif.read && (
                          <button 
                            onClick={() => markAsRead(notif.id)}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Mark as read
                          </button>
                        )}
                        <button 
                          onClick={() => deleteNotification(notif.id)}
                          className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-background">
                <Bell className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                <h4 className="text-lg font-bold text-text mb-1">No notifications found</h4>
                <p className="text-text-secondary">You're all caught up! There are no notifications matching this filter.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
