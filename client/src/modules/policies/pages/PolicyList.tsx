import { useState } from 'react';
import { Search, Filter, Eye, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_POLICIES = [
  { id: '1', policyNumber: 'POL-1001', client: 'Rahul Sharma', plan: 'Optima Restore', premium: '₹14,500', expiry: '12 May 2027', status: 'ACTIVE' },
  { id: '2', policyNumber: 'POL-1002', client: 'Priya Patel', plan: 'Family Health', premium: '₹22,100', expiry: '04 Jun 2027', status: 'ACTIVE' },
  { id: '3', policyNumber: 'POL-1003', client: 'Anil Kumar', plan: 'iShield Life', premium: '₹8,400', expiry: '01 Jan 2025', status: 'EXPIRED' },
];

export function PolicyList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Policies</h1>
          <p className="text-muted-foreground mt-1">Manage issued policies and lifecycles</p>
        </div>
        <Button>
          <ShieldCheck className="w-4 h-4 mr-2" />
          Issue New Policy
        </Button>
      </div>

      <div className="glass p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search policies by number or client..." 
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

        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Policy No.</th>
                <th className="px-6 py-4 font-medium">Client & Plan</th>
                <th className="px-6 py-4 font-medium">Expiry Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_POLICIES.map((policy) => (
                <tr key={policy.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{policy.policyNumber}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text">{policy.client}</div>
                    <div className="text-xs text-muted-foreground">{policy.plan}</div>
                  </td>
                  <td className="px-6 py-4 text-text">{policy.expiry}</td>
                  <td className="px-6 py-4">
                    <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + 
                      (policy.status === 'ACTIVE' ? 'bg-success/10 text-success' : 
                       policy.status === 'EXPIRED' ? 'bg-danger/10 text-danger' : 
                       'bg-warning/10 text-warning')
                    }>
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-text hover:text-text hover:bg-secondary" title="Download Document">
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
