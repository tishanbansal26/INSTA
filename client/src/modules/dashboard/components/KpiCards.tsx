import { Users, ShieldCheck, DollarSign, Clock, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Clients" value="2,845" trend="+12% from last month" isPositive={true} icon={Users} />
        <KpiCard title="Active Policies" value="1,420" trend="+5% from last month" isPositive={true} icon={ShieldCheck} />
        <KpiCard title="Total Revenue" value="₹42,50,000" trend="+18% from last month" isPositive={true} icon={DollarSign} />
        <KpiCard title="Pending Payments" value="18" trend="Requires attention" isPositive={false} icon={Clock} />
      </div>
      <h2 className="text-xl font-semibold text-text mt-6 mb-2">Claims & Settlements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Total Claims" value="156" trend="Active this year" isPositive={undefined} icon={ClipboardList} />
        <KpiCard title="Under Review" value="24" trend="Pending surveyor/approval" isPositive={undefined} icon={Clock} />
        <KpiCard title="Approved Claims" value="112" trend="+8% settlement rate" isPositive={true} icon={CheckCircle} />
        <KpiCard title="Rejected Claims" value="20" trend="-2% from last month" isPositive={false} icon={XCircle} />
      </div>
    </div>
  );
}
