import { useState } from 'react';
import { Search, Filter, Eye, Download, FileText, Send, Plus, Trash2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuotations } from '@/hooks/useQuotations';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { format } from 'date-fns';

export function QuotationList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useQuotations({ page, limit: 10, search: searchTerm });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSelectAll = () => {
    if (!data?.items) return;
    if (selectedRows.length === data.items.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.items.map((q: any) => q.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(r => r !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Quotations</h1>
          <p className="text-muted-foreground mt-1">Manage and convert client quotes</p>
        </div>
        <Button onClick={() => navigate('/premium')}>
          <Plus className="w-4 h-4 mr-2" />
          Create Quote
        </Button>
      </div>

      <div className="glass p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search quotes by ID or client..." 
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

        {selectedRows.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <span className="text-sm font-medium text-primary">{selectedRows.length} quote(s) selected</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50 border-border text-text">
                <Mail className="w-4 h-4 mr-2" />
                Send Quotes
              </Button>
              <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50 border-border text-text">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button size="sm" variant="outline" className="bg-danger/10 hover:bg-danger/20 border-danger/20 text-danger">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto border border-border rounded-lg max-h-[600px] relative">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-secondary/90 text-muted-foreground sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 font-medium w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-border"
                    checked={data?.items?.length ? selectedRows.length === data.items.length : false}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 font-medium">Quote ID</th>
                <th className="px-6 py-4 font-medium">Client & Plan</th>
                <th className="px-6 py-4 font-medium">Premium</th>
                <th className="px-6 py-4 font-medium">Valid Till</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={8} className="py-8"><SkeletonLoader text="Loading quotations..." /></td></tr>
              ) : isError ? (
                <tr><td colSpan={8} className="py-8"><ErrorState title="Failed to load quotations" onRetry={refetch} /></td></tr>
              ) : !data?.items || data.items.length === 0 ? (
                <tr><td colSpan={8} className="py-8"><EmptyState title="No quotations found" description="Try adjusting your search criteria." /></td></tr>
              ) : (
                data?.items.map((quote: any) => (
                  <tr key={quote.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-border"
                        checked={selectedRows.includes(quote.id)}
                        onChange={() => toggleSelectRow(quote.id)}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-text">{quote.quotationNumber}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-text">{quote.client?.firstName} {quote.client?.lastName}</div>
                      <div className="text-xs text-muted-foreground">{quote.client?.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-text">{quote.plan?.name}</div>
                      <div className="text-xs text-muted-foreground">{quote.plan?.company?.name}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-text">₹{quote.totalPremium}</td>
                    <td className="px-6 py-4 text-text">{format(new Date(quote.validTill), 'dd MMM yyyy')}</td>
                    <td className="px-6 py-4">
                      <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + 
                        (quote.status === 'ACCEPTED' ? 'bg-success/10 text-success' : 
                         quote.status === 'REJECTED' ? 'bg-danger/10 text-danger' : 
                         quote.status === 'SENT' ? 'bg-primary/10 text-primary' :
                         'bg-warning/10 text-warning')
                      }>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {quote.status === 'DRAFT' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="Send Quote">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text hover:text-text hover:bg-secondary" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-text hover:text-text hover:bg-secondary" title="Download PDF">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
