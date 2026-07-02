import { useState } from 'react';
import { Search, Filter, Download, CreditCard, Eye, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_PAYMENTS = [
  { id: '1', receiptNumber: 'REC-001', policy: 'POL-1001', client: 'Rahul Sharma', amount: '₹14,500', mode: 'UPI', status: 'SUCCESS', date: '01 May 2026' },
  { id: '2', receiptNumber: 'REC-002', policy: 'POL-1002', client: 'Priya Patel', amount: '₹22,100', mode: 'CARD', status: 'SUCCESS', date: '02 May 2026' },
  { id: '3', receiptNumber: 'REC-003', policy: 'POL-1003', client: 'Anil Kumar', amount: '₹8,400', mode: 'NET_BANKING', status: 'FAILED', date: '03 May 2026' },
];

export function PaymentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === MOCK_PAYMENTS.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(MOCK_PAYMENTS.map(p => p.id));
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
          <h1 className="text-3xl font-bold text-text">Payments</h1>
          <p className="text-muted-foreground mt-1">Track transactions and receipts</p>
        </div>
        <Button>
          <CreditCard className="w-4 h-4 mr-2" />
          Record Payment
        </Button>
      </div>

      <div className="glass p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by receipt or policy..." 
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
            <span className="text-sm font-medium text-primary">{selectedRows.length} item(s) selected</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50 border-border text-text">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="bg-white hover:bg-gray-50 border-border text-text">
                <Mail className="w-4 h-4 mr-2" />
                Send Receipt
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
                    checked={selectedRows.length === MOCK_PAYMENTS.length && MOCK_PAYMENTS.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 font-medium">Receipt No.</th>
                <th className="px-6 py-4 font-medium">Client & Policy</th>
                <th className="px-6 py-4 font-medium">Amount & Mode</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_PAYMENTS.map((payment) => (
                <tr key={payment.id} className={`hover:bg-secondary/30 transition-colors ${selectedRows.includes(payment.id) ? 'bg-primary/5' : ''}`}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedRows.includes(payment.id)}
                      onChange={() => toggleSelectRow(payment.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-text">{payment.receiptNumber}
                    <div className="text-xs text-muted-foreground">{payment.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text">{payment.client}</div>
                    <div className="text-xs text-muted-foreground">{payment.policy}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-text">{payment.amount}</div>
                    <div className="text-xs text-muted-foreground">{payment.mode}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + 
                      (payment.status === 'SUCCESS' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')
                    }>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text hover:text-text hover:bg-secondary" title="Download Receipt">
                        <Download className="h-4 w-4" />
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
