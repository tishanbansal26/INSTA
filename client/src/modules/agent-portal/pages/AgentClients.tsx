import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Shield, 
  FileCheck,
  Calendar,
  XCircle,
  MoreVertical,
  Download
} from 'lucide-react';
import { useClients } from '@/hooks/useClients';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';

export const AgentClients = () => {
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const { data, isLoading, isError, refetch } = useClients({ limit: 50 });
  const clients = data?.items || [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">My Clients</h1>
          <p className="text-text-secondary mt-1">Manage your customer portfolio</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search clients..." className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg hover:border-primary transition-colors text-text-secondary hover:text-primary">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Client List */}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-xs text-text-secondary">Active Policies</p>
                <p className="font-bold text-text">{client.activePolicies}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-text-secondary">Total Premium</p>
                <p className="font-bold text-primary">{client.totalPremium}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 360 Client View Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-surface border border-border w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex justify-between items-start bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-text">{selectedClient.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                    <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {selectedClient.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedClient.email}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-text-secondary hover:text-text">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-background border border-border rounded-xl p-4">
                  <p className="text-xs text-text-secondary mb-1">Customer Since</p>
                  <p className="font-bold text-text">Mar 2024</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-4">
                  <p className="text-xs text-text-secondary mb-1">Active Policies</p>
                  <p className="font-bold text-text">{selectedClient.activePolicies}</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-4">
                  <p className="text-xs text-text-secondary mb-1">Lifetime Value</p>
                  <p className="font-bold text-primary">{selectedClient.totalPremium}</p>
                </div>
                <div className="bg-background border border-border rounded-xl p-4">
                  <p className="text-xs text-text-secondary mb-1">Family Members</p>
                  <p className="font-bold text-text">3 Added</p>
                </div>
              </div>

              {/* 360 Tabs (Mock) */}
              <div className="flex gap-2 overflow-x-auto border-b border-border mb-6 pb-2">
                {['Policies', 'Claims', 'Renewals', 'Payments', 'Documents', 'Family', 'Notes'].map((tab, idx) => (
                  <button key={tab} className={`px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${idx === 0 ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* Policies Content */}
              <div className="space-y-4">
                <h3 className="font-bold text-text text-lg">Active Policies</h3>
                
                <div className="bg-surface border border-border rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text">Optima Secure (Health)</h4>
                      <p className="text-xs text-text-secondary">Policy #HDF-8832-1102 • HDFC ERGO</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-text-secondary">Sum Insured</p>
                      <p className="font-bold text-text">₹10 Lakhs</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Expiry Date</p>
                      <p className="font-bold text-orange-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> 12 Nov, 2026</p>
                    </div>
                    <button className="p-2 bg-background border border-border rounded-lg hover:border-primary text-primary transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text">iProtect Smart (Term)</h4>
                      <p className="text-xs text-text-secondary">Policy #ICI-9922-3344 • ICICI Prudential</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-text-secondary">Sum Insured</p>
                      <p className="font-bold text-text">₹1 Crore</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Expiry Date</p>
                      <p className="font-bold text-text flex items-center gap-1"><Calendar className="w-3 h-3" /> 05 Jan, 2027</p>
                    </div>
                    <button className="p-2 bg-background border border-border rounded-lg hover:border-primary text-primary transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
