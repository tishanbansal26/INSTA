import { useState } from 'react';
import { 
  Shield, 
  Calendar, 
  IndianRupee, 
  FileText, 
  Activity,
  Edit,
  Download,
  AlertCircle,
  Building2,
  User,
  HeartPulse
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'premium', label: 'Premium' },
  { id: 'payments', label: 'Payments' },
  { id: 'documents', label: 'Documents' },
  { id: 'claims', label: 'Claims' },
  { id: 'renewals', label: 'Renewals' },
  { id: 'activity', label: 'Activity Log' },
];

export const PolicyDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      
      {/* Policy Header Profile */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-green-500/20">
            <HeartPulse className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-text">POL-9928134</h1>
              <span className="px-2.5 py-0.5 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">ACTIVE</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mt-2">
              <span className="flex items-center gap-1 font-medium"><Building2 className="w-4 h-4" /> Niva Bupa</span>
              <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Comprehensive Health Plan</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> Rahul Sharma</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 shadow-lg shadow-green-500/20 transition-all">
            <Edit className="w-4 h-4" /> Endorse
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Shield className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Sum Insured</span>
          </div>
          <h3 className="text-2xl font-bold text-text">₹10,00,000</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><IndianRupee className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Annual Premium</span>
          </div>
          <h3 className="text-2xl font-bold text-text">₹15,200</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Calendar className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Issue Date</span>
          </div>
          <h3 className="text-lg font-bold text-text">01 Sep 2026</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><AlertCircle className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Due Date</span>
          </div>
          <h3 className="text-lg font-bold text-text">31 Aug 2027</h3>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col h-[600px]">
        {/* Tab Headers */}
        <div className="flex overflow-x-auto border-b border-border hide-scrollbar bg-background/50 p-2 gap-1 shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-text-secondary hover:bg-surface hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-text mb-4 text-lg">Coverage Details</h3>
                  <div className="space-y-4 p-4 border border-border rounded-xl bg-surface">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Product Name</span>
                      <span className="font-medium text-text">Comprehensive Health Plan</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Policy Type</span>
                      <span className="font-medium text-text">Family Floater</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Base Sum Insured</span>
                      <span className="font-medium text-text">₹10,00,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Cumulative Bonus</span>
                      <span className="font-medium text-text">₹2,00,000</span>
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between text-sm">
                      <span className="font-bold text-text">Total Coverage Available</span>
                      <span className="font-bold text-green-500">₹12,00,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-text mb-4 text-lg">Insured Members</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface">
                      <div>
                        <p className="font-bold text-sm text-text">Rahul Sharma</p>
                        <p className="text-xs text-text-secondary">Primary Insured • Male, 41</p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded">Covered</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface">
                      <div>
                        <p className="font-bold text-sm text-text">Priya Sharma</p>
                        <p className="text-xs text-text-secondary">Spouse • Female, 38</p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded">Covered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'premium' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h3 className="font-bold text-text mb-6 text-lg">Premium Breakdown</h3>
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Base Premium</span>
                  <span className="font-medium text-text">₹12,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Rider: Critical Illness</span>
                  <span className="font-medium text-text">₹1,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Rider: Personal Accident</span>
                  <span className="font-medium text-text">₹800</span>
                </div>
                <div className="flex justify-between text-sm text-green-500">
                  <span>No Claim Bonus Discount</span>
                  <span className="font-medium">- ₹1,430</span>
                </div>
                <div className="h-px bg-border my-2"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium text-text">₹12,870</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">GST (18%)</span>
                  <span className="font-medium text-text">₹2,317</span>
                </div>
                <div className="h-px bg-border my-2"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-text">Total Premium Paid</span>
                  <span className="font-black text-primary">₹15,187</span>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'premium' && (
            <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-300">
              <Activity className="w-12 h-12 text-text-secondary mb-4" />
              <h3 className="text-lg font-bold text-text mb-2 capitalize">{activeTab}</h3>
              <p className="text-text-secondary max-w-sm">Detailed records for {activeTab} will be populated here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
