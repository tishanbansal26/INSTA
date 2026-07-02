import { Shield, Wallet, Activity, CalendarClock, ArrowRight, FileText, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const KPI_CARDS = [
  { label: 'Active Policies', value: '3', icon: Shield, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Coverage Used', value: '₹1.5L / ₹10L', icon: Activity, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Upcoming Premium', value: '₹12,400', icon: IndianRupee, color: 'text-orange-500', bg: 'bg-orange-500/10', sub: 'Due in 14 days' },
  { label: 'Active Claims', value: '1', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', sub: 'Under Review' },
];

export const PortalDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Welcome back, Customer!</h1>
        <p className="text-text-secondary">Here's an overview of your insurance portfolio.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">{card.label}</p>
              <h3 className="text-2xl font-bold text-text">{card.value}</h3>
              {card.sub && <p className="text-xs text-text-secondary mt-1">{card.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text">Recent Timeline</h2>
              <Link to="/portal/policies" className="text-primary text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-8">
              {/* Timeline item */}
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
              
              {/* Timeline item */}
              <div className="flex gap-4 relative">
                <div className="absolute left-[19px] top-8 bottom-[-32px] w-[2px] bg-border"></div>
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 z-10">
                  <Wallet className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Premium Paid: POL-11234</h4>
                  <p className="text-sm text-text-secondary mt-1">₹15,000 paid for Term Life Insurance renewal.</p>
                  <p className="text-xs text-text-secondary mt-2">12 Oct 2026, 02:15 PM</p>
                </div>
              </div>

              {/* Timeline item */}
              <div className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Policy Issued: POL-99281</h4>
                  <p className="text-sm text-text-secondary mt-1">Comprehensive Health Plan activated.</p>
                  <p className="text-xs text-text-secondary mt-2">01 Sep 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions sidebar */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-text mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/portal/wallet" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <IndianRupee className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Pay Premium</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>
              
              <Link to="/portal/claims" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Track Claims</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>
              
              <Link to="/portal/documents" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium">Upload Documents</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/portal/policies" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CalendarClock className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">Renew Policy</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
