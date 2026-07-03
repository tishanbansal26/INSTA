import { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  Plus, 
  Search,
  ChevronRight,
  Bot,
  User,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const SupportTickets = () => {
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" /> Support Hub
          </h1>
          <p className="text-text-secondary mt-1">Get help, read guides, or chat with us.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'faq' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
              }`}
            >
              <HelpCircle className="w-5 h-5" /> FAQs
            </button>
            <button 
              onClick={() => setActiveTab('knowledge')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'knowledge' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
              }`}
            >
              <Book className="w-5 h-5" /> Knowledge Base
            </button>
            <button 
              onClick={() => setActiveTab('tickets')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'tickets' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
              }`}
            >
              <FileTextIcon className="w-5 h-5" /> Support Tickets
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
              }`}
            >
              <MessageSquare className="w-5 h-5" /> Chat with Agent
            </button>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-background border border-primary/20 rounded-xl p-6 text-center">
            <Bot className="w-12 h-12 text-primary mx-auto mb-3" />
            <h4 className="font-bold text-text mb-1">InsureAI Assistant</h4>
            <p className="text-xs text-text-secondary mb-4">Get instant answers to your policy and claim queries.</p>
            <button className="w-full py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors">
              Ask AI Now
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-6 min-h-[500px]">
          
          {activeTab === 'faq' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text">Frequently Asked Questions</h2>
                <div className="relative w-64">
                  <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search FAQs..." className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'How do I file a cashless claim?',
                  'What documents are required for a health claim?',
                  'Can I add a family member mid-policy?',
                  'How is the No Claim Bonus calculated?',
                  'Where can I download my premium receipt?',
                ].map((q, idx) => (
                  <div key={idx} className="p-4 bg-background border border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors flex justify-between items-center group">
                    <p className="font-medium text-text">{q}</p>
                    <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Knowledge Base</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Understanding Health Insurance', desc: 'A complete guide to coverages and exclusions.', icon: Book },
                  { title: 'Claim Filing Process', desc: 'Step-by-step guide to filing a successful claim.', icon: Book },
                  { title: 'Tax Benefits', desc: 'Learn how to save tax under Section 80D.', icon: Book },
                  { title: 'Policy Renewals', desc: 'Everything you need to know about renewing on time.', icon: Book },
                ].map((k, idx) => (
                  <div key={idx} className="p-5 border border-border bg-background rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                    <k.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold text-text group-hover:text-primary transition-colors">{k.title}</h4>
                    <p className="text-sm text-text-secondary mt-1">{k.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-text">My Support Tickets</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all">
                  <Plus className="w-4 h-4" /> Raise Ticket
                </button>
              </div>
              <div className="bg-background border border-border rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface text-text-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-medium">Ticket ID</th>
                      <th className="px-6 py-4 font-medium">Subject</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-surface/50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 font-bold text-text">#TKT-9921</td>
                      <td className="px-6 py-4 text-text">Name correction on policy document</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">RESOLVED</span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">2 days ago</td>
                    </tr>
                    <tr className="hover:bg-surface/50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 font-bold text-text">#TKT-9925</td>
                      <td className="px-6 py-4 text-text">Unable to download receipt</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full border border-orange-500/20">IN PROGRESS</span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">Just now</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-[500px] bg-background border border-border rounded-xl overflow-hidden animate-in fade-in duration-300">
              <div className="p-4 border-b border-border bg-surface flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text">Agent Rahul</h4>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 shrink-0 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-surface border border-border rounded-xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-sm text-text">Hello! I am Rahul, your dedicated support agent. How can I assist you today?</p>
                    <p className="text-[10px] text-text-secondary mt-1">10:30 AM</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-border bg-surface">
                <div className="flex gap-2">
                  <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary" />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Quick mock for missing lucide icon
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);
