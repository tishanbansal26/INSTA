import { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter,
  Download,
  Clock,
  RotateCw,
  Activity,
  FileText,
  Eye,
  Plus
} from 'lucide-react';
import { usePolicies } from '@/hooks/usePolicies';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { format } from 'date-fns';

export const AgentPolicies = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { data, isLoading, isError, refetch } = usePolicies({ limit: 50 });
  const policies = data?.items || [];

  const tabs = ['All', 'Active', 'Pending', 'Expiring Soon', 'Recently Issued'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">Policy Center</h1>
          <p className="text-text-secondary mt-1">Manage all your issued policies</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search policies..." className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg hover:border-primary transition-colors text-text-secondary hover:text-primary">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-border pb-2">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Policy List */}
      <div className="bg-surface border border-border rounded-xl p-4 md:p-6 space-y-4">
        {isLoading ? (
          <SkeletonLoader text="Loading policies..." />
        ) : isError ? (
          <ErrorState title="Failed to load policies" onRetry={refetch} />
        ) : policies.length === 0 ? (
          <div className="text-center p-8 text-text-secondary">No policies found.</div>
        ) : policies.map((policy: any) => (
          <div key={policy.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/30 transition-colors">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-text">{policy.policyNumber}</h3>
                <p className="text-sm text-text-secondary">{policy.client?.firstName} {policy.client?.lastName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full md:w-auto">
              <div>
                <p className="text-xs text-text-secondary">Type</p>
                <p className="font-bold text-text">Health</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Premium</p>
                <p className="font-bold text-text">₹{policy.premiumAmount}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Expiry</p>
                <p className="font-bold text-text">{format(new Date(policy.endDate), 'dd MMM yyyy')}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Status</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  policy.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' :
                  policy.status === 'EXPIRED' ? 'bg-red-500/10 text-red-500' :
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  {policy.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="flex gap-2 flex-1 md:flex-none">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-bold text-text hover:border-primary transition-colors">
                  <Download className="w-3 h-3" /> PDF
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-bold text-text hover:border-primary transition-colors">
                  <Activity className="w-3 h-3" /> Timeline
                </button>
              </div>
              
              {policy.status === 'Expiring Soon' && (
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                  <RotateCw className="w-3 h-3" /> Renew
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
