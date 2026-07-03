import { Megaphone, Users, CheckCircle, BarChart3, Plus, TrendingUp } from 'lucide-react';

export const CampaignList = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-primary" /> Campaigns
          </h1>
          <p className="text-text-secondary mt-1">Manage marketing campaigns and track lead generation.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary"><Megaphone className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Active Campaigns</span>
          </div>
          <h3 className="text-2xl font-bold text-text">12</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Users className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Total Leads (30d)</span>
          </div>
          <h3 className="text-2xl font-bold text-text">1,245</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><CheckCircle className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Avg. Conversion</span>
          </div>
          <h3 className="text-2xl font-bold text-text">8.4%</h3>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500"><TrendingUp className="w-5 h-5" /></div>
            <span className="text-sm font-medium text-text-secondary">Cost per Lead</span>
          </div>
          <h3 className="text-2xl font-bold text-text">₹240</h3>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
          <h3 className="font-bold text-text">Campaign Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Campaign Name</th>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Leads Generated</th>
                <th className="px-6 py-4 font-medium">Converted</th>
                <th className="px-6 py-4 font-medium">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: 'Family Health 2026', platform: 'Facebook', leads: 450, converted: 45, rate: '10.0%', status: 'ACTIVE' },
                { name: 'Retirement Planning', platform: 'LinkedIn', leads: 120, converted: 15, rate: '12.5%', status: 'ACTIVE' },
                { name: 'Term Life Push', platform: 'Google Ads', leads: 850, converted: 60, rate: '7.0%', status: 'ACTIVE' },
                { name: 'Q3 Tax Saving', platform: 'Email', leads: 2200, converted: 110, rate: '5.0%', status: 'COMPLETED' },
              ].map((campaign, idx) => (
                <tr key={idx} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-text">{campaign.name}</td>
                  <td className="px-6 py-4 text-text">{campaign.platform}</td>
                  <td className="px-6 py-4">
                    {campaign.status === 'ACTIVE' ? (
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">ACTIVE</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-text-secondary/10 text-text-secondary text-xs font-bold rounded-full">COMPLETED</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-text">{campaign.leads}</td>
                  <td className="px-6 py-4 text-text">{campaign.converted}</td>
                  <td className="px-6 py-4 font-bold text-primary">{campaign.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
