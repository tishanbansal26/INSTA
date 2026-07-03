import { Users, ShieldCheck, DollarSign, Clock, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardOverview } from '@/hooks/useDashboard';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive?: boolean;
  icon: React.ElementType;
  className?: string;
}

function KpiCard({ title, value, trend, isPositive, icon: Icon, className }: KpiCardProps) {
  return (
    <div className={cn("glass p-6 rounded-xl flex items-start justify-between", className)}>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold text-text mt-2">{value}</p>
        <p className={cn("text-xs mt-2", isPositive === true ? "text-success" : isPositive === false ? "text-danger" : "text-warning")}>
          {trend}
        </p>
      </div>
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}

export function KpiCards() {
  const { data: overview, isLoading, isError, refetch } = useDashboardOverview();

  if (isLoading) {
    return <SkeletonLoader text="Loading dashboard metrics..." />;
  }

  if (isError || !overview) {
    return <ErrorState title="Failed to load dashboard metrics" onRetry={refetch} />;
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Clients" value={overview.totalClients.toString()} trend="Active in system" isPositive={true} icon={Users} />
        <KpiCard title="Active Policies" value={overview.activePolicies.toString()} trend="Currently active" isPositive={true} icon={ShieldCheck} />
        <KpiCard title="Total Revenue" value={formatCurrency(overview.totalRevenue)} trend="Lifetime collected" isPositive={true} icon={DollarSign} />
        <KpiCard title="Pending Payments" value={overview.pendingPayments.toString()} trend="Requires attention" isPositive={false} icon={Clock} />
      </div>
      <h2 className="text-xl font-semibold text-text mt-6 mb-2">Claims & Settlements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Claims" value="-" trend="Pending backend API" isPositive={undefined} icon={ClipboardList} />
        <KpiCard title="Under Review" value="-" trend="Pending backend API" isPositive={undefined} icon={Clock} />
        <KpiCard title="Approved Claims" value="-" trend="Pending backend API" isPositive={true} icon={CheckCircle} />
        <KpiCard title="Rejected Claims" value="-" trend="Pending backend API" isPositive={false} icon={XCircle} />
      </div>
    </div>
  );
}
