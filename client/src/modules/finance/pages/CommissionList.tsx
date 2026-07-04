import { IndianRupee, TrendingUp, Filter, Download } from 'lucide-react';
import { useCommissions } from '@/hooks/useCommissions';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

export const CommissionList = () => {
  const { data, isLoading, isError, refetch } = useCommissions({ limit: 10 });
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Commission Management</h1>
          <p className="text-text-secondary mt-1">Track and reconcile agent commissions across all policies.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><IndianRupee className="w-24 h-24" /></div>
          <span className="text-sm font-medium text-text-secondary mb-2 block">Total Pending Commission</span>
          <h3 className="text-3xl font-black text-orange-500">₹1,45,200</h3>
          <p className="text-xs text-text-secondary mt-2">Across 42 policies</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><TrendingUp className="w-24 h-24" /></div>
          <span className="text-sm font-medium text-text-secondary mb-2 block">Paid This Month</span>
          <h3 className="text-3xl font-black text-green-500">₹3,20,500</h3>
          <p className="text-xs text-text-secondary mt-2">+12% from last month</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><IndianRupee className="w-24 h-24" /></div>
          <span className="text-sm font-medium text-text-secondary mb-2 block">YTD Commission Earned</span>
          <h3 className="text-3xl font-black text-primary">₹24,50,000</h3>
          <p className="text-xs text-text-secondary mt-2">Fiscal Year 2026-27</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
          <h3 className="font-bold text-text">Recent Commissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Policy ID</th>
                <th className="px-6 py-4 font-medium">Agent</th>
                <th className="px-6 py-4 font-medium">Premium</th>
                <th className="px-6 py-4 font-medium">Rate</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={6} className="py-8"><SkeletonLoader text="Loading commissions..." /></td></tr>
              ) : isError ? (
                <tr><td colSpan={6} className="py-8"><ErrorState title="Failed to load commissions" onRetry={refetch} /></td></tr>
              ) : data?.items?.length === 0 ? (
                <tr><td colSpan={6} className="py-8"><EmptyState title="No commissions found" description="No commission records are available at this time." /></td></tr>
              ) : (
                data?.items?.map((item: any) => (
                  <tr key={item.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">{item.policy?.policyNumber}</td>
                    <td className="px-6 py-4 text-text">{item.policy?.client?.firstName} {item.policy?.client?.lastName}</td>
                    <td className="px-6 py-4 text-text">₹{item.totalCommissionAmount}</td>
                    <td className="px-6 py-4 text-text">15%</td>
                    <td className="px-6 py-4 font-bold text-text">₹{item.totalCommissionAmount}</td>
                    <td className="px-6 py-4">
                      {item.status === 'PAID' ? (
                        <span className="px-2.5 py-1 bg-success/10 text-success text-xs font-bold rounded-full">PAID</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-warning/10 text-warning text-xs font-bold rounded-full">PENDING</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
