import { 
  Shield, 
  Wallet, 
  Activity, 
  CalendarClock, 
  ArrowRight, 
  FileText, 
  IndianRupee,
  HeartPulse,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortalDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* AI Widget */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24 text-primary" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Good Morning, Tishan
            </h1>
            <p className="text-text-secondary mt-1">Here is your daily insurance summary:</p>
            <ul className="mt-3 space-y-1">
              <li className="flex items-center gap-2 text-sm font-medium text-orange-500">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 1 Premium Due
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-green-500">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 2 Active Policies
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-text-secondary"></span> No Pending Claims
              </li>
            </ul>
          </div>
          <button className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center gap-2 shrink-0">
            Pay Premium Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Insurance Summary KPIs */}
      <div>
        <h2 className="text-lg font-bold text-text mb-4">Insurance Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Active Policies</span>
            <h3 className="text-2xl font-bold text-green-500">2</h3>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Expired Policies</span>
            <h3 className="text-2xl font-bold text-text-secondary">1</h3>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Upcoming Renewals</span>
            <h3 className="text-2xl font-bold text-orange-500">1</h3>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Coverage Used</span>
            <h3 className="text-2xl font-bold text-text">₹1.5L <span className="text-sm text-text-secondary font-medium">/ ₹10L</span></h3>
            <div className="w-full bg-border h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full w-[15%] rounded-full"></div>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Coverage Remaining</span>
            <h3 className="text-2xl font-bold text-primary">₹8.5L</h3>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Claim Ratio</span>
            <h3 className="text-2xl font-bold text-text">15%</h3>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <span className="text-sm font-medium text-text-secondary block mb-1">Total Premium Paid</span>
            <h3 className="text-2xl font-bold text-text">₹45,200</h3>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-5"><Wallet className="w-16 h-16" /></div>
            <span className="text-sm font-medium text-text-secondary block mb-1">Wallet Balance</span>
            <h3 className="text-2xl font-bold text-blue-500">₹0</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text">Recent Activity</h2>
              <Link to="/portal/policies" className="text-primary text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4 relative">
                <div className="absolute left-[19px] top-8 bottom-[-32px] w-[2px] bg-border"></div>
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 z-10">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Claim Settlement: POL-99281</h4>
                  <p className="text-sm text-text-secondary mt-1">₹1.5L claim for hospitalization settled successfully.</p>
                  <p className="text-xs text-text-secondary mt-2">10 Oct 2026, 10:30 AM</p>
                </div>
              </div>
              
              <div className="flex gap-4 relative">
                <div className="absolute left-[19px] top-8 bottom-[-32px] w-[2px] bg-border"></div>
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 z-10">
                  <Wallet className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Premium Paid: POL-11234</h4>
                  <p className="text-sm text-text-secondary mt-1">₹15,000 paid for Term Life Insurance renewal.</p>
                  <p className="text-xs text-text-secondary mt-2">12 Sep 2026, 02:15 PM</p>
                </div>
              </div>

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
              <Link to="/portal/policies" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Buy New Policy</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/portal/wallet" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <IndianRupee className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">Pay Premium</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/portal/documents" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-sm font-medium">Download Policy</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>
              
              <Link to="/portal/claims" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium">Raise Claim</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/portal/policies" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <CalendarClock className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium">Renew Policy</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
              </Link>

              <Link to="/portal/support" className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Contact Agent</span>
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
