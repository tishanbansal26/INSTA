import { ShieldAlert, Search, Filter, Phone, MessageCircle, Eye } from 'lucide-react';
import { useClaims } from '@/hooks/useClaims';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';

export const AgentClaims = () => {
  const { data, isLoading, isError, refetch } = useClaims({ limit: 50 });
  const claims = data?.items || [];
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">Claims (Assigned)</h1>
          <p className="text-text-secondary mt-1">Track claims filed by your clients</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search claims..." className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg hover:border-primary transition-colors text-text-secondary hover:text-primary">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-hover text-text-secondary border-b border-border">
            <tr>
              <th className="p-4 font-bold">Claim Details</th>
              <th className="p-4 font-bold">Policy & Type</th>
              <th className="p-4 font-bold">Amount</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Assist Client</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
          {isLoading ? (
            <tr><td colSpan={6} className="p-8"><SkeletonLoader text="Loading claims..." /></td></tr>
          ) : isError ? (
            <tr><td colSpan={6} className="p-8"><ErrorState title="Failed to load claims" onRetry={refetch} /></td></tr>
          ) : claims.length === 0 ? (
            <tr><td colSpan={6} className="p-8 text-center text-text-secondary">No claims found.</td></tr>
          ) : (
            claims.map(claim => (
              <tr key={claim.id} className="hover:bg-surface-hover cursor-pointer transition-colors">
                <td className="p-4">
                  <p className="font-bold text-text">{claim.claimNumber}</p>
                  <p className="text-xs text-text-secondary">{claim.claimType}</p>
                </td>
                <td className="p-4">
                  <p className="font-bold text-text">{claim.client?.firstName} {claim.client?.lastName}</p>
                  <p className="text-xs text-text-secondary">{claim.policy?.policyNumber}</p>
                </td>
                <td className="p-4 font-mono font-bold text-text">₹{claim.claimAmount}</td>
                <td className="p-4 text-text-secondary">{new Date(claim.raisedDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                    claim.status === 'APPROVED' || claim.status === 'SETTLED' ? 'bg-green-500/10 text-green-500' :
                    claim.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {claim.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="w-8 h-8 rounded-lg bg-surface border border-border text-text flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors ml-auto">
                    <Eye className="w-4 h-4" />
                  </button>
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
