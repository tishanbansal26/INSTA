import { useState, useEffect } from 'react';
import { apiClient as api } from '../../../services/apiClient';
import { Target, TrendingUp, DollarSign } from 'lucide-react';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    api.get('/campaigns').then(res => setCampaigns(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Target className="w-6 h-6 text-primary" /> Marketing Campaigns
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{camp.name}</h3>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{camp.source}</span>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500"><DollarSign className="w-4 h-4 mr-1"/> Budget</div>
                <div className="font-semibold text-gray-900">₹{camp.budget}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500"><TrendingUp className="w-4 h-4 mr-1"/> Revenue</div>
                <div className="font-semibold text-green-600">₹{camp.revenue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
