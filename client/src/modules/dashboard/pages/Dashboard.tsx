import { KpiCards } from '../components/KpiCards';
import { RevenueTrendChart, CompanySalesChart } from '../components/DashboardCharts';
import { RecentActivities, UpcomingRenewals, AiCopilotSummary, QuickActions } from '../components/DashboardWidgets';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/clients">
            <Button variant="outline" className="bg-transparent border-border text-text hover:bg-secondary">
              <Plus className="w-4 h-4 mr-2" />
              New Client
            </Button>
          </Link>
          <Link to="/quotations">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Generate Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <KpiCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueTrendChart />
        <CompanySalesChart />
      </div>

      {/* Middle Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UpcomingRenewals />
        </div>
        <div className="lg:col-span-1">
          <AiCopilotSummary />
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Bottom Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <RecentActivities />
        </div>
        <div className="lg:col-span-1 glass p-6 rounded-xl min-h-[300px] flex flex-col justify-center items-center border border-dashed border-border/50 text-center">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-text font-medium">Add New Widget</p>
          <p className="text-muted-foreground text-sm mt-2">Customize your dashboard with more tools.</p>
          <Button variant="outline" className="mt-4">Widget Library</Button>
        </div>
      </div>
    </div>
  );
}
