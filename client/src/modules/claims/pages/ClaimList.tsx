import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Plus, Search, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { useClaims } from '@/hooks/useClaims';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

export function ClaimList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isError, refetch } = useClaims({ page, limit: 10, search: searchTerm });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CREATED':
      case 'DOCUMENTS_PENDING':
        return 'bg-secondary text-secondary-foreground';
      case 'APPROVED':
      case 'SETTLED':
        return 'bg-success text-success-foreground';
      case 'REJECTED':
        return 'bg-danger text-danger-foreground';
      case 'CRITICAL':
        return 'bg-danger text-danger-foreground';
      case 'HIGH':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text">Claims</h1>
          <p className="text-text-muted">Manage insurance claims and settlements.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search claims..."
              className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-background text-text-muted font-medium border-b border-border">
              <tr>
                <th className="px-4 py-3">Claim No.</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Raised Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={8} className="py-8"><SkeletonLoader text="Loading claims..." /></td></tr>
              ) : isError ? (
                <tr><td colSpan={8} className="py-8"><ErrorState title="Failed to load claims" onRetry={refetch} /></td></tr>
              ) : data?.items.length === 0 ? (
                <tr><td colSpan={8} className="py-8"><EmptyState title="No claims found" description="Create a new claim to get started." /></td></tr>
              ) : (
                data?.items.map((claim: any) => (
                  <tr key={claim.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-text">{claim.claimNumber}</td>
                    <td className="px-4 py-3 text-text">{claim.client?.firstName} {claim.client?.lastName}</td>
                    <td className="px-4 py-3 text-text">{claim.claimType}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.priority)}`}>
                        {claim.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-text">₹{claim.claimAmount}</td>
                    <td className="px-4 py-3 text-text">{claim.raisedDate ? format(new Date(claim.raisedDate), 'dd MMM yyyy') : '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                        {claim.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
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
}
