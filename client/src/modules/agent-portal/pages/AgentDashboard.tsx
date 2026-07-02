import { Users, Shield, IndianRupee, FileCheck, PhoneCall, CalendarClock, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const KPI_CARDS = [
  { label: 'Policies Sold (MTD)', value: '12', icon: Shield, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Revenue Generated', value: '₹4.2L', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Commission Earned', value: '₹45,200', icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { label: 'Pending Renewals', value: '5', icon: CalendarClock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

export const AgentDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Agent Dashboard</h1>
        <p className="text-text-secondary">Overview of your sales, clients, and commissions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-xl p-5 hover:border-blue-600/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-text">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Tasks & Leads */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Today's Calls */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-blue-600" />
                  Today's Calls
                </h2>
                <span className="bg-blue-600/10 text-blue-600 px-2 py-1 rounded text-xs font-bold">3 Due</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Amit Kumar', reason: 'Follow up on term quote', time: '10:30 AM' },
                  { name: 'Sneha Patel', reason: 'Renewal reminder', time: '02:00 PM' },
                  { name: 'Vikram Singh', reason: 'Claim document follow-up', time: '04:15 PM' }
                ].map((call, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-border rounded-lg bg-background">
                    <div>
                      <p className="font-bold text-text text-sm">{call.name}</p>
                      <p className="text-xs text-text-secondary">{call.reason}</p>
                    </div>
                    <span className="text-xs font-medium text-text">{call.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Leads */}
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-text flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Hot Leads
                </h2>
                <Link to="/agent/leads" className="text-blue-600 text-sm hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Rajesh Gupta', product: 'Health Insurance', score: 92 },
                  { name: 'Pooja Verma', product: 'Life Insurance', score: 88 },
                  { name: 'Anil Desai', product: 'Motor Insurance', score: 85 }
                ].map((lead, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 border border-border rounded-lg bg-background">
                    <div>
                      <p className="font-bold text-text text-sm">{lead.name}</p>
                      <p className="text-xs text-text-secondary">{lead.product}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-orange-500/10 text-orange-500 rounded-full">
                      {lead.score} Score
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recent Policies */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-text mb-6">Recently Sold Policies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-sm font-semibold text-text-secondary">Client</th>
                    <th className="pb-3 text-sm font-semibold text-text-secondary">Policy No</th>
                    <th className="pb-3 text-sm font-semibold text-text-secondary">Premium</th>
                    <th className="pb-3 text-sm font-semibold text-text-secondary">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[1, 2, 3].map((item) => (
                    <tr key={item} className="hover:bg-background/50 transition-colors">
                      <td className="py-4 text-sm font-medium text-text">Suresh Mehta</td>
                      <td className="py-4 text-sm text-text-secondary">POL-88231</td>
                      <td className="py-4 text-sm text-text">₹18,500</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">ACTIVE</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Insights Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-text mb-6">Target vs Achievement</h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Monthly Premium Target</span>
                <span className="font-bold text-text">84%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
              <p className="text-xs text-text-secondary mt-2">₹4.2L / ₹5.0L</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Policies Target</span>
                <span className="font-bold text-text">60%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-text-secondary mt-2">12 / 20 Policies</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg shadow-blue-600/20">
            <h3 className="font-bold text-lg mb-2">Need help closing a deal?</h3>
            <p className="text-sm text-white/80 mb-4">Use the AI Premium Advisor to generate instant customized quotations for your clients.</p>
            <button className="w-full py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Open Premium Advisor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
