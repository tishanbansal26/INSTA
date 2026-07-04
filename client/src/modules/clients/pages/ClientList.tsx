import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClients } from '@/hooks/useClients';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

export function ClientList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useClients({ page, limit: 10, search: searchTerm });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your customer base</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="glass p-6 rounded-xl space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, phone or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-border"
            />
          </div>
          <Button variant="outline" className="border-border hover:bg-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Active Policies</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12">
                    <SkeletonLoader text="Loading clients..." />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="py-12">
                    <ErrorState title="Failed to load clients" onRetry={refetch} />
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12">
                    <EmptyState title="No clients found" description="Try adjusting your search or add a new client." />
                  </td>
                </tr>
              ) : (
                data?.items.map((client) => (
                  <tr key={client.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-text">{client.firstName} {client.lastName}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[120px]">{client.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-text truncate max-w-[150px]">{client.phone || '-'}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[150px]">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 text-text">{client._count?.policies || 0}</td>
                    <td className="px-6 py-4">
                      <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + (client.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground')}>
                        {client.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex justify-between items-center pt-4">
            <p className="text-sm text-muted-foreground">Showing page {data.page} of {data.totalPages} ({data.total} total)</p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={data.page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="border-border"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={data.page === data.totalPages}
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                className="border-border"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
