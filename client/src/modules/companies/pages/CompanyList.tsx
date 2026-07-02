import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_COMPANIES = [
  { id: '1', code: 'HDFC', name: 'HDFC Ergo', activePlans: 12, policies: 450, status: 'Active' },
  { id: '2', code: 'STAR', name: 'Star Health', activePlans: 8, policies: 320, status: 'Active' },
  { id: '3', code: 'ICICI', name: 'ICICI Lombard', activePlans: 15, policies: 510, status: 'Active' },
  { id: '4', code: 'CARE', name: 'Care Insurance', activePlans: 5, policies: 180, status: 'Inactive' },
];

export function CompanyList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Companies</h1>
          <p className="text-muted-foreground mt-1">Manage insurance providers</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="glass p-6 rounded-xl space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search companies by name or code..." 
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
                <th className="px-6 py-4 font-medium">Company Details</th>
                <th className="px-6 py-4 font-medium">Active Plans</th>
                <th className="px-6 py-4 font-medium">Total Policies</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_COMPANIES.map((company) => (
                <tr key={company.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-text">{company.name}</div>
                    <div className="text-xs text-muted-foreground">Code: {company.code}</div>
                  </td>
                  <td className="px-6 py-4 text-text">{company.activePlans}</td>
                  <td className="px-6 py-4 text-text">{company.policies}</td>
                  <td className="px-6 py-4">
                    <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + (company.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground')}>
                      {company.status}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
