import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient as api } from '../../../services/apiClient';
import { Button } from '../../../components/ui/button';
import { Phone, Mail, MapPin, Clock, Target, UserCheck } from 'lucide-react';

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('INFO');

  const fetchLead = useCallback(async () => {
    try {
      const res = await api.get(`/leads/${id}`);
      setLead(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleConvert = async () => {
    try {
      const res = await api.post(`/leads/${id}/convert`, { userId: 'system' });
      alert(res.data.message);
      fetchLead();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Conversion failed');
    }
  };

  if (!lead) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Lead CRM...</div>;

  return (
    <div className="space-y-6">
      {/* Header Profile */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
          <p className="text-gray-500 flex items-center gap-2 mt-2">
            <Phone className="w-4 h-4" /> {lead.mobile}
            {lead.email && <><Mail className="w-4 h-4 ml-4" /> {lead.email}</>}
            {lead.city && <><MapPin className="w-4 h-4 ml-4" /> {lead.city}</>}
          </p>
        </div>
        <div className="text-right space-y-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
            {lead.status}
          </span>
          <br/>
          {lead.status === 'WON' && (
            <Button onClick={handleConvert} className="bg-green-600 hover:bg-green-700 text-white">
              <UserCheck className="w-4 h-4 mr-2" /> Convert to Client
            </Button>
          )}
          {lead.status === 'CONVERTED' && (
            <Button onClick={() => navigate(`/clients/${lead.convertedClientId}`)} variant="outline">
              View Client Profile
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
        {['INFO', 'FOLLOW_UPS', 'TASKS', 'NOTES'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all ${
              activeTab === tab ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
        {activeTab === 'INFO' && (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Lead Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Source:</span> <span className="font-medium">{lead.source}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Priority:</span> <span className="font-medium">{lead.priority}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Interested In:</span> <span className="font-medium">{lead.interestedProduct || 'N/A'}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-gray-500">Budget:</span> <span className="font-medium">₹{lead.budget || '0'}</span></div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'FOLLOW_UPS' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Phone className="w-5 h-5 text-primary" /> Interaction Timeline</h3>
            <div className="border-l-2 border-primary pl-4 space-y-6 ml-2">
              {lead.followUps?.length === 0 && <p className="text-gray-500">No follow-ups logged yet.</p>}
              {lead.followUps?.map((f: any) => (
                <div key={f.id} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow"></div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{f.type} - {f.outcome}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(f.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
