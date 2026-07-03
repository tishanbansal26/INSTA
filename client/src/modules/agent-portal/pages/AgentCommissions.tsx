import { 
  IndianRupee, 
  TrendingUp, 
  Download, 
  Calendar,
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';

const MOCK_COMMISSIONS = [
  { id: 1, policyNo: 'HDF-8832-1102', client: 'Vikram Singh', product: 'Optima Secure', premium: '₹14,500', rate: '15%', amount: '₹2,175', status: 'Paid', date: '01 Nov, 2026' },
  { id: 2, policyNo: 'ICI-9922-3344', client: 'Neha Gupta', product: 'iProtect Smart', premium: '₹12,500', rate: '25%', amount: '₹3,125', status: 'Paid', date: '28 Oct, 2026' },
  { id: 3, policyNo: 'STA-5544-2211', client: 'Ravi Desai', product: 'Comprehensive', premium: '₹22,000', rate: '15%', amount: '₹3,300', status: 'Pending', date: '05 Nov, 2026' },
];

export const AgentCommissions = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">Commission Center</h1>
          <p className="text-text-secondary mt-1">Track your earnings and payouts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-bold rounded-lg hover:border-primary transition-colors text-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <p className="text-sm font-medium text-text-secondary mb-1">Current Month (Nov)</p>
          <h3 className="text-3xl font-black text-primary">₹32,450</h3>
          <p className="text-xs font-bold text-green-500 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12.5% vs Oct
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <p className="text-sm font-medium text-text-secondary mb-1">Previous Month (Oct)</p>
          <h3 className="text-3xl font-black text-text">₹28,840</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <p className="text-sm font-medium text-text-secondary mb-1">Pending Payouts</p>
          <h3 className="text-3xl font-black text-orange-500">₹8,900</h3>
          <p className="text-xs font-bold text-text-secondary mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Expected by 15th
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <p className="text-sm font-medium text-text-secondary mb-1">Lifetime Earnings</p>
          <h3 className="text-3xl font-black text-text">₹4.2L</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-text flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" /> Monthly Trend
              </h3>
              <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-medium text-text focus:outline-none focus:border-primary">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            
            {/* Mock Chart Area */}
            <div className="h-64 flex items-end justify-between gap-2 border-b border-border pb-4">
              {[40, 55, 45, 70, 65, 85].map((height, i) => (
                <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-colors relative group" style={{ height: `${height}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{height * 500}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs font-bold text-text-secondary pt-4 px-2">
              <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
            </div>
          </div>

          {/* Recent Commissions Table */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-text">Recent Transactions</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-hover text-text-secondary border-b border-border">
                <tr>
                  <th className="p-4 font-bold">Policy & Client</th>
                  <th className="p-4 font-bold">Premium</th>
                  <th className="p-4 font-bold">Rate</th>
                  <th className="p-4 font-bold">Commission</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_COMMISSIONS.map(comm => (
                  <tr key={comm.id} className="hover:bg-surface-hover transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-text">{comm.product}</p>
                      <p className="text-xs text-text-secondary">{comm.client} • {comm.date}</p>
                    </td>
                    <td className="p-4 font-medium text-text">{comm.premium}</td>
                    <td className="p-4 text-text-secondary font-medium">{comm.rate}</td>
                    <td className="p-4 font-black text-primary">{comm.amount}</td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full w-fit ${
                        comm.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
                      }`}>
                        {comm.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {comm.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-bold text-text flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-purple-500" /> By Company
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-text">HDFC ERGO</span>
                  <span className="font-bold text-primary">45%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-text">ICICI Lombard</span>
                  <span className="font-bold text-primary">30%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-text">Star Health</span>
                  <span className="font-bold text-primary">25%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-bold text-text flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-green-500" /> By Product
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-text">Health Insurance</span>
                  <span className="font-bold text-primary">60%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-text">Term Life</span>
                  <span className="font-bold text-primary">25%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-text">Motor Insurance</span>
                  <span className="font-bold text-primary">15%</span>
                </div>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
