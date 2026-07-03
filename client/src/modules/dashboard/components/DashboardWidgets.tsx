import { FileText, CreditCard, RefreshCw, UserPlus, Zap, Bot, CalendarDays, XCircle } from 'lucide-react';

import { useRecentActivities } from '@/hooks/useDashboard';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { formatDistanceToNow } from 'date-fns';

const getIconForAction = (action: string) => {
  if (action.includes('CREATE')) return { icon: UserPlus, color: 'text-success', bg: 'bg-success/10' };
  if (action.includes('UPDATE')) return { icon: RefreshCw, color: 'text-primary', bg: 'bg-primary/10' };
  if (action.includes('DELETE')) return { icon: XCircle, color: 'text-danger', bg: 'bg-danger/10' };
  return { icon: FileText, color: 'text-primary', bg: 'bg-primary/10' };
};

export function RecentActivities() {
  const { data: activities, isLoading, isError, refetch } = useRecentActivities();

  if (isLoading) return <div className="glass p-6 rounded-xl h-full flex items-center justify-center"><SkeletonLoader text="Loading activities..." /></div>;
  if (isError || !activities) return <div className="glass p-6 rounded-xl h-full"><ErrorState title="Failed to load activities" onRetry={refetch} /></div>;

  return (
    <div className="glass p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-text">Recent Activities</h3>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      <div className="space-y-6">
        {activities.length === 0 && <p className="text-sm text-muted-foreground">No recent activities.</p>}
        {activities.map((activity) => {
          const { icon: Icon, color, bg } = getIconForAction(activity.action);
          return (
            <div key={activity.id} className="flex items-start">
              <div className={`p-2 rounded-full ${bg} ${color} mr-4`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text">
                  <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium text-text">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UpcomingRenewals() {
  const renewals = [
    { id: 1, client: 'Aarav Mehta', policy: 'Health Suraksha', date: 'In 3 days', amount: '₹15,400' },
    { id: 2, client: 'Kiran Patel', policy: 'Motor Comprehensive', date: 'In 5 days', amount: '₹8,200' },
    { id: 3, client: 'TechNova Corp', policy: 'Group Mediclaim', date: 'In 12 days', amount: '₹1,45,000' },
  ];

  return (
    <div className="glass p-6 rounded-xl border border-border h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-text flex items-center"><CalendarDays className="w-5 h-5 mr-2 text-warning" /> Upcoming Renewals</h3>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      <div className="flex-1 space-y-4">
        {renewals.map(r => (
          <div key={r.id} className="flex justify-between items-center p-3 bg-background rounded-lg border border-border hover:border-warning/50 transition-colors">
            <div>
              <p className="font-medium text-sm">{r.client}</p>
              <p className="text-xs text-muted-foreground">{r.policy}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-warning">{r.date}</p>
              <p className="text-xs text-muted-foreground">{r.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AiCopilotSummary() {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-transparent p-6 rounded-xl border border-primary/20 h-full">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-primary text-primary-foreground rounded-lg mr-3">
          <Bot className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-text">AI Copilot Insights</h3>
      </div>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground"><strong className="text-text">Observation:</strong> Motor insurance renewals dropped by 12% this week compared to last month.</p>
        <p className="text-sm text-muted-foreground"><strong className="text-text">Suggestion:</strong> Run a quick WhatsApp campaign targeting the 45 clients expiring next week. <a href="#" className="text-primary hover:underline">Draft message</a></p>
      </div>
    </div>
  );
}

export function QuickActions() {
  return (
    <div className="glass p-6 rounded-xl border border-border h-full">
      <h3 className="text-lg font-semibold text-text mb-4 flex items-center"><Zap className="w-5 h-5 mr-2 text-primary" /> Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex flex-col items-center justify-center p-4 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
          <FileText className="w-6 h-6 mb-2" />
          <span className="text-xs font-medium">New Quote</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
          <CreditCard className="w-6 h-6 mb-2" />
          <span className="text-xs font-medium">Log Payment</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
          <UserPlus className="w-6 h-6 mb-2" />
          <span className="text-xs font-medium">Add Lead</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
          <RefreshCw className="w-6 h-6 mb-2" />
          <span className="text-xs font-medium">Send Reminder</span>
        </button>
      </div>
    </div>
  );
}
