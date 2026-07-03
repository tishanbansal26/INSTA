import { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  PhoneCall, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  FileText,
  Clock
} from 'lucide-react';

export const LeadDetails = () => {
  const [activeTab, setActiveTab] = useState('notes');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Lead Profile Header */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center font-bold text-2xl">
            A
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-text">Amit Patel</h1>
              <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full border border-blue-500/20">HOT LEAD</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mt-2">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> +91 9988776655</span>
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> amit.patel@example.com</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <PhoneCall className="w-4 h-4" /> Log Call
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 shadow-lg shadow-green-500/20 transition-all">
            <CheckCircle2 className="w-4 h-4" /> Convert to Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-bold text-text mb-4">Lead Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-text-secondary mb-1">Source</span>
                <span className="font-medium text-text">Facebook Ad Campaign</span>
              </div>
              <div>
                <span className="block text-text-secondary mb-1">Interested In</span>
                <span className="font-medium text-text">Health Insurance (Family Floater)</span>
              </div>
              <div>
                <span className="block text-text-secondary mb-1">Assigned To</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">R</div>
                  <span className="font-medium text-text">Ravi Kumar</span>
                </div>
              </div>
              <div>
                <span className="block text-text-secondary mb-1">Created Date</span>
                <span className="font-medium text-text">14 Oct 2026</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2 text-orange-500 font-bold">
              <AlertCircle className="w-5 h-5" /> Next Follow-up
            </div>
            <p className="text-text font-medium">Call tomorrow at 11:00 AM to discuss premium breakdown.</p>
          </div>
        </div>

        {/* Right Column - Activity */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-xl overflow-hidden h-full flex flex-col">
            <div className="flex border-b border-border bg-background/50">
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'notes' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'}`}
              >
                Notes & Activity
              </button>
              <button 
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'tasks' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'}`}
              >
                Tasks
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Add Note Input */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <textarea 
                        placeholder="Add a note or log activity..."
                        className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none h-24"
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover transition-colors">
                          Save Note
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Activity Timeline */}
                  <div className="space-y-6 mt-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-surface text-text-secondary group-[.is-active]:bg-primary group-[.is-active]:text-white group-[.is-active]:shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-background shadow">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-text text-sm">Follow-up Call</h4>
                          <span className="text-xs text-text-secondary">Today, 2:00 PM</span>
                        </div>
                        <p className="text-sm text-text-secondary">Discussed the Niva Bupa Reassure plan. He is interested but wants to compare it with HDFC Ergo Optima Restore. Sending comparison quote.</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-surface text-text-secondary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-background shadow">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-text text-sm">Initial Inquiry</h4>
                          <span className="text-xs text-text-secondary">14 Oct, 10:15 AM</span>
                        </div>
                        <p className="text-sm text-text-secondary">Lead received from Facebook Ad "Family Health 2026".</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                      <div>
                        <h4 className="font-bold text-text text-sm">Send Comparison Quote</h4>
                        <p className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> Due Today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
