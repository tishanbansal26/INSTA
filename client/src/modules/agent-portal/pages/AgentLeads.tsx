import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar,
  MoreVertical,
  Filter,
  Search,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';

const MOCK_LEADS = [
  { id: 1, name: 'Ravi Desai', mobile: '+91 9876543210', product: 'Health', source: 'Website', status: 'New', priority: 'High', nextFollowUp: 'Today 2:00 PM' },
  { id: 2, name: 'Pooja Mehta', mobile: '+91 9123456789', product: 'Term Life', source: 'Referral', status: 'Contacted', priority: 'Medium', nextFollowUp: 'Tomorrow' },
  { id: 3, name: 'Anil Kapoor', mobile: '+91 9988776655', product: 'Motor', source: 'Calculator', status: 'Quoted', priority: 'High', nextFollowUp: 'Today 5:00 PM' },
  { id: 4, name: 'Sneha Rao', mobile: '+91 9876123450', product: 'Health', source: 'WhatsApp', status: 'Negotiation', priority: 'Medium', nextFollowUp: 'Monday' },
];

export const AgentLeads = () => {
  const [view, setView] = useState<'kanban' | 'table'>('kanban');
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const renderKanban = () => {
    const columns = ['New', 'Contacted', 'Qualified', 'Quoted', 'Negotiation', 'Won', 'Lost'];
    
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col} className="min-w-[300px] w-[300px] bg-surface-hover rounded-xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-text text-sm uppercase tracking-wider">{col}</h3>
              <span className="bg-surface text-text-secondary text-xs font-bold px-2 py-1 rounded-lg border border-border">
                {MOCK_LEADS.filter(l => l.status === col).length}
              </span>
            </div>
            
            <div className="space-y-3 flex-1">
              {MOCK_LEADS.filter(l => l.status === col).map(lead => (
                <div 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className="bg-surface border border-border p-4 rounded-xl cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      lead.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {lead.priority}
                    </span>
                    <button className="text-text-secondary hover:text-text"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  <h4 className="font-bold text-text mb-1">{lead.name}</h4>
                  <p className="text-xs text-text-secondary mb-3">{lead.product} • {lead.source}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <span className="text-xs font-medium text-text flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" /> {lead.nextFollowUp}
                    </span>
                    <div className="flex gap-1">
                      <button className="w-6 h-6 rounded-md bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" title="WhatsApp">
                        <MessageCircle className="w-3 h-3" />
                      </button>
                      <button className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors" title="Call">
                        <Phone className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = () => (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-hover text-text-secondary border-b border-border">
          <tr>
            <th className="p-4 font-bold">Lead Name</th>
            <th className="p-4 font-bold">Product</th>
            <th className="p-4 font-bold">Source</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 font-bold">Next Follow-up</th>
            <th className="p-4 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {MOCK_LEADS.map(lead => (
            <tr key={lead.id} className="hover:bg-surface-hover cursor-pointer transition-colors" onClick={() => setSelectedLead(lead)}>
              <td className="p-4">
                <p className="font-bold text-text">{lead.name}</p>
                <p className="text-xs text-text-secondary">{lead.mobile}</p>
              </td>
              <td className="p-4 font-medium text-text">{lead.product}</td>
              <td className="p-4 text-text-secondary">{lead.source}</td>
              <td className="p-4">
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-lg font-bold text-xs">
                  {lead.status}
                </span>
              </td>
              <td className="p-4 text-text-secondary flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" /> {lead.nextFollowUp}
              </td>
              <td className="p-4">
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  <button className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-text">Pipeline Management</h1>
          <p className="text-text-secondary mt-1">Track and convert your leads</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input type="text" placeholder="Search leads..." className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
          </div>
          <button className="p-2 bg-surface border border-border rounded-lg hover:border-primary transition-colors text-text-secondary hover:text-primary">
            <Filter className="w-5 h-5" />
          </button>
          <div className="flex bg-surface border border-border rounded-lg p-1">
            <button 
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-md transition-colors ${view === 'kanban' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-text'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-1.5 rounded-md transition-colors ${view === 'table' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-text'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === 'kanban' ? renderKanban() : renderTable()}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-surface border border-border w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-black text-text">{selectedLead.name}</h2>
                  <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-lg font-bold text-xs">{selectedLead.status}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {selectedLead.mobile}</span>
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedLead.name.split(' ')[0].toLowerCase()}@example.com</span>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-text-secondary hover:text-text">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Col: Actions & Logs */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-background rounded-xl p-4 border border-border">
                  <h3 className="font-bold text-text mb-4 text-sm uppercase tracking-wider">Log Interaction</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <button className="flex flex-col items-center justify-center p-3 bg-surface border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-text-secondary text-xs font-medium gap-2">
                      <Phone className="w-5 h-5" /> Call
                    </button>
                    <button className="flex flex-col items-center justify-center p-3 bg-surface border border-border rounded-lg hover:border-green-500 hover:text-green-500 transition-colors text-text-secondary text-xs font-medium gap-2">
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-text-secondary uppercase">Call Outcome</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-bold cursor-pointer hover:bg-green-500/20">Interested</span>
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-xs font-bold cursor-pointer hover:bg-orange-500/20">Call Back</span>
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-bold cursor-pointer hover:bg-blue-500/20">Quote Sent</span>
                      <span className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-xs font-bold cursor-pointer hover:bg-red-500/20">Not Interested</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: Timeline & Details */}
              <div className="md:col-span-2">
                {/* Tabs (Mocked) */}
                <div className="flex border-b border-border mb-6">
                  <button className="px-4 py-2 border-b-2 border-primary text-primary font-bold text-sm">Timeline</button>
                  <button className="px-4 py-2 border-b-2 border-transparent text-text-secondary hover:text-text font-medium text-sm">Notes</button>
                  <button className="px-4 py-2 border-b-2 border-transparent text-text-secondary hover:text-text font-medium text-sm">Quotations</button>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-xl border border-border shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-text text-sm">Quotation Sent</h4>
                        <span className="text-[10px] text-text-secondary font-medium">2 hours ago</span>
                      </div>
                      <p className="text-xs text-text-secondary">Optima Secure (HDFC ERGO) quote sent via WhatsApp.</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-surface bg-surface text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-xl border border-border shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-text text-sm">Outbound Call</h4>
                        <span className="text-[10px] text-text-secondary font-medium">Yesterday</span>
                      </div>
                      <p className="text-xs text-text-secondary">Customer requested comparison between ICICI and HDFC.</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/10 text-green-600 rounded text-[10px] font-bold">Interested</span>
                    </div>
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
