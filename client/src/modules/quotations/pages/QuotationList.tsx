import { useState } from 'react';
import { Plus, Search, Filter, Edit, FileText, CheckCircle, XCircle, Trash2, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_QUOTES = [
  { id: '1', quoteNumber: 'QT-2026-001', client: 'Rahul Sharma', plan: 'Optima Restore', amount: '₹14,500', status: 'DRAFT' },
  { id: '2', quoteNumber: 'QT-2026-002', client: 'Priya Patel', plan: 'Family Health', amount: '₹22,100', status: 'SENT' },
  { id: '3', quoteNumber: 'QT-2026-003', client: 'Anil Kumar', plan: 'iShield Life', amount: '₹8,400', status: 'ACCEPTED' },
];

export function QuotationList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === MOCK_QUOTES.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(MOCK_QUOTES.map(q => q.id));
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
        <Button>
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
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={selectedRows.length === MOCK_QUOTES.length && MOCK_QUOTES.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 font-medium">Quote ID</th>
                <th className="px-6 py-4 font-medium">Client & Plan</th>
                <th className="px-6 py-4 font-medium">Premium</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_QUOTES.map((quote) => (
                <tr key={quote.id} className={`hover:bg-secondary/30 transition-colors ${selectedRows.includes(quote.id) ? 'bg-primary/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedRows.includes(quote.id)}
                      onChange={() => toggleSelectRow(quote.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-text">{quote.quoteNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text">{quote.client}</div>
                    <div className="text-xs text-muted-foreground">{quote.plan}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-text">{quote.amount}</td>
                  <td className="px-6 py-4">
                    <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + 
                      (quote.status === 'ACCEPTED' ? 'bg-success/10 text-success' : 
                       quote.status === 'SENT' ? 'bg-primary/10 text-primary' : 
                       'bg-muted text-muted-foreground')
                    }>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="Preview PDF">
                        <FileText className="h-4 w-4" />
                      </Button>
                      {quote.status === 'SENT' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10" title="Accept">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10" title="Reject">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10" title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
