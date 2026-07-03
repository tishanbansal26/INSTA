import { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Shield, 
  IndianRupee, 
  FileText, 
  Activity,
  Edit,
  MessageSquare
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'policies', label: 'Policies' },
  { id: 'payments', label: 'Payments' },
  { id: 'claims', label: 'Claims' },
  { id: 'documents', label: 'Documents' },
  { id: 'notes', label: 'Notes' },
];

export const ClientDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      
      {/* Client Header Profile */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-primary/20">
            R
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-text">Rahul Sharma</h1>
              <span className="px-2.5 py-0.5 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">Active</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mt-2">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> +91 9876543210</span>
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> rahul@example.com</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Mumbai, MH</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-background border border-border text-text rounded-lg hover:border-primary transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Shield className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Total Policies</span>
          </div>
          <h3 className="text-2xl font-bold text-text">3</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><IndianRupee className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Total Premium</span>
          </div>
          <h3 className="text-2xl font-bold text-text">₹45,200</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><Activity className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Active Claims</span>
          </div>
          <h3 className="text-2xl font-bold text-text">1</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Calendar className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Next Renewal</span>
          </div>
          <h3 className="text-lg font-bold text-text">14 Nov 2026</h3>
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
                  <h3 className="font-bold text-text mb-4 text-lg">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 text-sm">
                      <span className="text-text-secondary">Date of Birth</span>
                      <span className="col-span-2 font-medium text-text">15 May 1985 (41 Years)</span>
                    </div>
                    <div className="grid grid-cols-3 text-sm">
                      <span className="text-text-secondary">Gender</span>
                      <span className="col-span-2 font-medium text-text">Male</span>
                    </div>
                    <div className="grid grid-cols-3 text-sm">
                      <span className="text-text-secondary">Marital Status</span>
                      <span className="col-span-2 font-medium text-text">Married</span>
                    </div>
                    <div className="grid grid-cols-3 text-sm">
                      <span className="text-text-secondary">Occupation</span>
                      <span className="col-span-2 font-medium text-text">Software Engineer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-text mb-4 text-lg">Family Members</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface">
                      <div>
                        <p className="font-bold text-sm text-text">Priya Sharma</p>
                        <p className="text-xs text-text-secondary">Spouse • 38 Years</p>
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">2 Policies</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-surface">
                      <div>
                        <p className="font-bold text-sm text-text">Aarav Sharma</p>
                        <p className="text-xs text-text-secondary">Child • 12 Years</p>
                      </div>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">1 Policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h3 className="font-bold text-text mb-6 text-lg">Client Activity Timeline</h3>
              <div className="space-y-8">
                <div className="flex gap-4 relative">
                  <div className="absolute left-[19px] top-8 bottom-[-32px] w-[2px] bg-border"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 z-10">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text">Claim Filed: POL-99281</h4>
                    <p className="text-sm text-text-secondary mt-1">Health claim for hospitalization filed successfully.</p>
                    <p className="text-xs text-text-secondary mt-2">Today, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <div className="absolute left-[19px] top-8 bottom-[-32px] w-[2px] bg-border"></div>
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 z-10">
                    <IndianRupee className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text">Premium Paid: POL-11234</h4>
                    <p className="text-sm text-text-secondary mt-1">₹15,000 paid for Term Life Insurance renewal.</p>
                    <p className="text-xs text-text-secondary mt-2">12 Oct 2026</p>
                  </div>
                </div>
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text">Client Created</h4>
                    <p className="text-sm text-text-secondary mt-1">Rahul Sharma was added to the system.</p>
                    <p className="text-xs text-text-secondary mt-2">01 Sep 2026</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'timeline' && (
            <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-300">
              <FileText className="w-12 h-12 text-text-secondary mb-4" />
              <h3 className="text-lg font-bold text-text mb-2 capitalize">{activeTab} Details</h3>
              <p className="text-text-secondary max-w-sm">Data for {activeTab} will be populated here using the standard DataTable component.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
