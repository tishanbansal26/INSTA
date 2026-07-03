import { 
  Target, 
  TrendingUp, 
  Trophy, 
  BarChart3, 
  Activity,
  Award
} from 'lucide-react';

export const AgentPerformance = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-text">Performance Dashboard</h1>
          <p className="text-text-secondary mt-1">Track your KPIs and targets</p>
        </div>
        <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm font-medium text-text focus:outline-none focus:border-primary">
          <option>Q4 2026</option>
          <option>Q3 2026</option>
          <option>Q2 2026</option>
          <option>Q1 2026</option>
        </select>
      </div>

      {/* Target Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-bold text-text-secondary mb-1">Premium Target</p>
              <h3 className="text-2xl font-black text-text">₹12.4L <span className="text-sm text-text-secondary font-medium">/ ₹15L</span></h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div className="h-3 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }}></div>
          </div>
          <p className="text-xs font-bold text-blue-500 mt-2 text-right">82% Achieved</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-bold text-text-secondary mb-1">Policy Count</p>
              <h3 className="text-2xl font-black text-text">45 <span className="text-sm text-text-secondary font-medium">/ 50</span></h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
          <div className="h-3 w-full bg-background rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '90%' }}></div>
          </div>
          <p className="text-xs font-bold text-purple-500 mt-2 text-right">90% Achieved</p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-bold text-text-secondary mb-1">Conversion Rate</p>
              <h3 className="text-2xl font-black text-text">18.5%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 text-sm text-text-secondary">
              <Activity className="w-4 h-4" /> 243 Leads Touched
            </div>
            <span className="text-xs font-bold text-green-500">+2.4% vs Q3</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conversion Funnel */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-bold text-text flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" /> Sales Funnel
          </h3>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex justify-between text-sm mb-1 z-10 relative px-2">
                <span className="font-bold text-text">Total Leads</span>
                <span className="font-bold text-text">243</span>
              </div>
              <div className="h-8 w-full bg-blue-500/10 rounded-lg overflow-hidden absolute top-0 left-0">
                <div className="h-full bg-blue-500/20" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex justify-between text-sm mb-1 z-10 relative px-2">
                <span className="font-bold text-text">Contacted</span>
                <span className="font-bold text-text">180</span>
              </div>
              <div className="h-8 w-full bg-blue-500/10 rounded-lg overflow-hidden absolute top-0 left-0">
                <div className="h-full bg-blue-500/40" style={{ width: '74%' }}></div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between text-sm mb-1 z-10 relative px-2">
                <span className="font-bold text-text">Quotes Sent</span>
                <span className="font-bold text-text">85</span>
              </div>
              <div className="h-8 w-full bg-blue-500/10 rounded-lg overflow-hidden absolute top-0 left-0">
                <div className="h-full bg-blue-500/60" style={{ width: '35%' }}></div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between text-sm mb-1 z-10 relative px-2">
                <span className="font-bold text-text">Policies Sold</span>
                <span className="font-bold text-primary">45</span>
              </div>
              <div className="h-8 w-full bg-blue-500/10 rounded-lg overflow-hidden absolute top-0 left-0">
                <div className="h-full bg-primary" style={{ width: '18.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Branch Leaderboard */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-bold text-text flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-orange-500" /> Branch Leaderboard
          </h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Amit Sharma', rev: '₹18.2L', isMe: false },
              { rank: 2, name: 'Priya Singh', rev: '₹15.5L', isMe: false },
              { rank: 3, name: 'Rahul (You)', rev: '₹12.4L', isMe: true },
              { rank: 4, name: 'Sneha Patel', rev: '₹11.8L', isMe: false },
              { rank: 5, name: 'Vikram Das', rev: '₹9.5L', isMe: false },
            ].map((agent) => (
              <div key={agent.rank} className={`flex items-center justify-between p-3 rounded-lg border ${agent.isMe ? 'bg-primary/5 border-primary/30' : 'bg-background border-border'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                    agent.rank === 1 ? 'bg-yellow-500/20 text-yellow-600' :
                    agent.rank === 2 ? 'bg-gray-400/20 text-gray-500' :
                    agent.rank === 3 ? 'bg-orange-600/20 text-orange-700' :
                    'bg-surface border border-border text-text-secondary'
                  }`}>
                    #{agent.rank}
                  </div>
                  <span className={`font-bold ${agent.isMe ? 'text-primary' : 'text-text'}`}>{agent.name}</span>
                </div>
                <span className="font-black text-text">{agent.rev}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
