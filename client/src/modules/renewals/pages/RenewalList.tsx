import { useState } from 'react';
import { Search, Filter, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MOCK_RENEWALS = [
  { id: '1', policy: 'POL-1001', client: 'Rahul Sharma', dueDate: '12 May 2026', previousPremium: '₹14,500', status: 'PENDING' },
  { id: '2', policy: 'POL-1005', client: 'Neha Gupta', dueDate: '15 May 2026', previousPremium: '₹18,000', status: 'REMINDER_SENT' },
  { id: '3', policy: 'POL-0980', client: 'Karan Singh', dueDate: '01 May 2026', previousPremium: '₹12,400', status: 'EXPIRED' },
];

export function RenewalList() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text">Renewals</h1>
          <p className="text-muted-foreground mt-1">Upcoming renewals and retention management</p>
        </div>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          Calendar View
        </Button>
      </div>

      <div className="glass p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by client or policy..." 
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
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Last Premium</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_RENEWALS.map((renewal) => (
                <tr key={renewal.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-text">{renewal.policy}</td>
                  <td className="px-6 py-4 font-medium text-text">{renewal.client}</td>
                  <td className="px-6 py-4 text-text">{renewal.dueDate}</td>
                  <td className="px-6 py-4 text-text">{renewal.previousPremium}</td>
                  <td className="px-6 py-4">
                    <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + 
                      (renewal.status === 'REMINDER_SENT' ? 'bg-primary/10 text-primary' : 
                       renewal.status === 'EXPIRED' ? 'bg-danger/10 text-danger' : 
                       'bg-warning/10 text-warning')
                    }>
                      {renewal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="Send Reminder">
                        <Bell className="h-4 w-4" />
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
