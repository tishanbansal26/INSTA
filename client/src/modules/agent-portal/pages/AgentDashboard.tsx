import { 
  Users, 
  Flame, 
  ShieldCheck, 
  IndianRupee, 
  Wallet, 
  Clock, 
  AlertTriangle,
  Target,
  Plus,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AgentDashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text flex items-center gap-2">
            Welcome back, Agent Rahul 👋
          </h1>
          <p className="text-text-secondary mt-1">Here is what you should work on today.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all text-sm">
            <Plus className="w-4 h-4" /> Add Lead
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-colors text-sm">
            <FileText className="w-4 h-4" /> Quote
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-colors text-sm">
            <Calendar className="w-4 h-4" /> Schedule
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-500">+12%</span>
          </div>
          <p className="text-sm font-medium text-text-secondary">Leads Assigned</p>
          <h3 className="text-2xl font-black text-text mt-1">142</h3>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm font-medium text-text-secondary">Hot Leads</p>
          <h3 className="text-2xl font-black text-text mt-1">18</h3>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-500">+5%</span>
          </div>
          <p className="text-sm font-medium text-text-secondary">Policies Sold (MTD)</p>
          <h3 className="text-2xl font-black text-text mt-1">24</h3>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-text-secondary">₹50k Goal</span>
          </div>
          <p className="text-sm font-medium text-text-secondary">Commission Earned</p>
          <h3 className="text-2xl font-black text-text mt-1">₹32,450</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Tasks & Widgets */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <h3 className="font-bold text-text flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" /> AI Agent Copilot
            </h3>
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between bg-surface/80 p-3 rounded-lg border border-border/50">
                <p className="text-sm font-medium text-text">Call <span className="font-bold">Rahul Sharma</span> - Looked at Term Insurance 3 times today.</p>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">Call Now <ArrowRight className="w-3 h-3" /></button>
              </div>
              <div className="flex items-center justify-between bg-surface/80 p-3 rounded-lg border border-border/50">
                <p className="text-sm font-medium text-text"><span className="font-bold">Priya Singh's</span> Health policy expires in 7 days.</p>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">Send Quote <ArrowRight className="w-3 h-3" /></button>
              </div>
              <div className="flex items-center justify-between bg-surface/80 p-3 rounded-lg border border-border/50">
                <p className="text-sm font-medium text-text">Cross-sell opportunity: <span className="font-bold">Amit Patel</span> recently bought a car.</p>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today's Follow-ups */}
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-text flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> Today's Follow-ups
                </h3>
                <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">3 Overdue</span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Sanjay Kumar', time: '10:00 AM', status: 'overdue', type: 'Health Quote' },
                  { name: 'Neha Gupta', time: '02:30 PM', status: 'pending', type: 'Renewal' },
                  { name: 'Vikram Singh', time: '04:00 PM', status: 'pending', type: 'Life Insurance' }
                ].map((f, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border last:border-0 pb-3 last:pb-0">
                    <div>
                      <p className="text-sm font-bold text-text">{f.name}</p>
                      <p className="text-xs text-text-secondary">{f.type} • {f.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Website Leads */}
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-text flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" /> New Website Leads
                </h3>
                <Link to="/agent/leads" className="text-xs font-bold text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Ravi Desai', city: 'Mumbai', source: 'Premium Calculator' },
                  { name: 'Pooja Mehta', city: 'Delhi', source: 'Contact Form' },
                  { name: 'Anil Kapoor', city: 'Pune', source: 'WhatsApp Lead' }
                ].map((l, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border last:border-0 pb-3 last:pb-0">
                    <div>
                      <p className="text-sm font-bold text-text">{l.name}</p>
                      <p className="text-xs text-text-secondary">{l.city} • {l.source}</p>
                    </div>
                    <button className="text-xs font-bold bg-primary text-white px-3 py-1 rounded-full hover:bg-primary-hover">
                      Claim
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Target Progress */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-bold text-text mb-4">Monthly Target</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-text">₹12,40,000</span>
              <span className="font-medium text-text-secondary">Goal: ₹15,00,000</span>
            </div>
            <div className="h-2 w-full bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-xs font-bold text-green-500 mt-2 text-right">82% Achieved</p>
          </div>

          {/* Pending Alerts */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-background">
              <h3 className="font-bold text-text">Urgent Action Required</h3>
            </div>
            <div className="divide-y divide-border">
              <div className="p-4 flex gap-3 hover:bg-surface-hover cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text">8 Pending Renewals</p>
                  <p className="text-xs text-text-secondary mt-1">Expiring within 7 days. High risk of lapse.</p>
                </div>
              </div>
              <div className="p-4 flex gap-3 hover:bg-surface-hover cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text">2 Missing Documents</p>
                  <p className="text-xs text-text-secondary mt-1">Claims on hold for Rohit and Sneha.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
