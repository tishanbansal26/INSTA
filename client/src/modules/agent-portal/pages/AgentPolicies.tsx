import { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter,
  Download,
  Clock,
  RotateCw,
  MoreVertical,
  Activity
} from 'lucide-react';

const MOCK_POLICIES = [
  { id: 1, policyNo: 'HDF-8832-1102', client: 'Vikram Singh', product: 'Optima Secure', type: 'Health', status: 'Expiring Soon', premium: '₹14,500', expiry: '7 Days Left' },
  { id: 2, policyNo: 'ICI-9922-3344', client: 'Neha Gupta', product: 'iProtect Smart', type: 'Term', status: 'Active', premium: '₹12,500', expiry: '11 Months' },
  { id: 3, policyNo: 'STA-5544-2211', client: 'Ravi Desai', product: 'Comprehensive', type: 'Health', status: 'Pending', premium: '₹22,000', expiry: 'Awaiting Medicals' },
  { id: 4, policyNo: 'TAT-1122-9988', client: 'Sanjay Kumar', product: 'Motor Insurance', type: 'Motor', status: 'Recently Issued', premium: '₹8,500', expiry: '364 Days Left' },
];

export const AgentPolicies = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Active', 'Pending', 'Expiring Soon', 'Recently Issued'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">Policy Center</h1>
          <p className="text-text-secondary mt-1">Manage all your issued policies</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search policies..." className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg hover:border-primary transition-colors text-text-secondary hover:text-primary">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-border pb-2">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Policy List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_POLICIES.filter(p => activeTab === 'All' || p.status === activeTab).map(policy => (
          <div key={policy.id} className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  policy.type === 'Health' ? 'bg-red-500/10 text-red-500' :
                  policy.type === 'Term' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-orange-500/10 text-orange-500'
                }`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-text">{policy.product}</h3>
                  <p className="text-xs text-text-secondary">{policy.policyNo} • {policy.client}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                policy.status === 'Expiring Soon' ? 'bg-orange-500/10 text-orange-500' :
                policy.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                policy.status === 'Recently Issued' ? 'bg-purple-500/10 text-purple-500' :
                'bg-green-500/10 text-green-500'
              }`}>
                {policy.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-4 border-y border-border mb-4">
              <div>
                <p className="text-xs text-text-secondary">Premium</p>
                <p className="font-bold text-text">{policy.premium}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary">Expiry</p>
                <p className={`font-bold ${policy.status === 'Expiring Soon' ? 'text-orange-500' : 'text-text'}`}>{policy.expiry}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-bold text-text hover:border-primary transition-colors">
                  <Download className="w-3 h-3" /> PDF
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-bold text-text hover:border-primary transition-colors">
                  <Activity className="w-3 h-3" /> Timeline
                </button>
              </div>
              
              {policy.status === 'Expiring Soon' && (
                <button className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                  <RotateCw className="w-3 h-3" /> Renew
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
