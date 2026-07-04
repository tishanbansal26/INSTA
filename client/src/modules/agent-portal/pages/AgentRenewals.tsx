import { useState } from 'react';
import { 
  RotateCw, 
  Search, 
  Filter, 
  MessageCircle, 
  Mail, 
  FileText,
  CalendarClock,
  Send,
  Phone
} from 'lucide-react';
import { useRenewals } from '@/hooks/useRenewals';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { format } from 'date-fns';

export const AgentRenewals = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { data, isLoading, isError, refetch } = useRenewals({ limit: 50 });
  const renewals = data?.items || [];

  const tabs = ['All', 'Overdue', 'Today', '15 Days', '30 Days'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">Renewal Center</h1>
          <p className="text-text-secondary mt-1">Don't let policies lapse. Retain your customers.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search renewals..." className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg hover:border-primary transition-colors text-text-secondary hover:text-primary">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 hover:border-red-500/50 transition-colors">
          <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" /> Overdue
          </p>
          <h3 className="text-2xl font-black text-red-700 dark:text-red-400 mt-1">₹8,500</h3>
          <p className="text-xs font-medium text-red-600 dark:text-red-500 mt-2">1 Policy at risk</p>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/50 transition-colors">
          <p className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-1 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" /> Today
          </p>
          <h3 className="text-2xl font-black text-orange-700 dark:text-orange-400 mt-1">₹14,500</h3>
          <p className="text-xs font-medium text-orange-600 dark:text-orange-500 mt-2">1 Policy expiring</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/50 transition-colors">
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-1 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" /> Next 30 Days
          </p>
          <h3 className="text-2xl font-black text-blue-700 dark:text-blue-400 mt-1">₹34,500</h3>
          <p className="text-xs font-medium text-blue-600 dark:text-blue-500 mt-2">2 Policies upcoming</p>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 hover:border-green-500/50 transition-colors">
          <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1 flex items-center gap-2">
            <CalendarClock className="w-4 h-4" /> Retained (MTD)
          </p>
          <h3 className="text-2xl font-black text-green-700 dark:text-green-400 mt-1">94%</h3>
          <p className="text-xs font-medium text-green-600 dark:text-green-500 mt-2">Great job!</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-border pb-2 mt-4">
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

      {/* Renewal List */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-hover text-text-secondary border-b border-border">
            <tr>
              <th className="p-4 font-bold">Client & Policy</th>
              <th className="p-4 font-bold">Product</th>
              <th className="p-4 font-bold">Premium</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr><td colSpan={7} className="p-8"><SkeletonLoader text="Loading renewals..." /></td></tr>
            ) : isError ? (
              <tr><td colSpan={7} className="p-8"><ErrorState title="Failed to load renewals" onRetry={refetch} /></td></tr>
            ) : renewals.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-text-secondary">No renewals found.</td></tr>
            ) : (
              renewals.filter((r: any) => activeTab === 'All' || r.status === activeTab.toUpperCase()).map((renewal: any) => (
                <tr key={renewal.id} className="hover:bg-surface-hover transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-text">{renewal.policy?.client?.firstName} {renewal.policy?.client?.lastName}</p>
                    <p className="text-xs text-text-secondary">{renewal.policy?.client?.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-text">{renewal.policy?.policyNumber}</p>
                    <p className="text-xs text-text-secondary">Health</p>
                  </td>
                  <td className="p-4 font-bold text-text">₹{renewal.premiumAmount}</td>
                  <td className="p-4">
                    <p className={`font-bold ${new Date(renewal.renewalDate) < new Date() ? 'text-red-500' : 'text-text'}`}>
                      {format(new Date(renewal.renewalDate), 'dd MMM yyyy')}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {Math.max(0, Math.ceil((new Date(renewal.renewalDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)))} days left
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      renewal.status === 'RENEWED' ? 'bg-green-500/10 text-green-500' :
                      renewal.status === 'EXPIRING' ? 'bg-red-500/10 text-red-500' :
                      'bg-orange-500/10 text-orange-500'
                    }`}>
                      {renewal.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" title="Send WhatsApp Link">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Call Client">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
