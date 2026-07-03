import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Clock,
  Video,
  Phone,
  Cake,
  RotateCw
} from 'lucide-react';

export const AgentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 15)); // Nov 15, 2026 for mock

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-text">Calendar & Tasks</h1>
          <p className="text-text-secondary mt-1">Schedule your follow-ups and meetings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all text-sm">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        
        {/* Left Column: Mini Calendar & Filters */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2">
          
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-text">November 2026</h3>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-surface-hover rounded"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-surface-hover rounded"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-secondary mb-2">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
              {[...Array(30)].map((_, i) => (
                <button 
                  key={i} 
                  className={`p-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors ${
                    i + 1 === 15 ? 'bg-primary text-white hover:bg-primary hover:text-white shadow-md' : 'text-text'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4">
            <h3 className="font-bold text-text mb-4">Event Types</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="flex items-center gap-2 text-sm text-text"><Phone className="w-4 h-4 text-blue-500" /> Follow-ups</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="flex items-center gap-2 text-sm text-text"><Video className="w-4 h-4 text-purple-500" /> Meetings</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="flex items-center gap-2 text-sm text-text"><RotateCw className="w-4 h-4 text-orange-500" /> Renewals</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="flex items-center gap-2 text-sm text-text"><Cake className="w-4 h-4 text-pink-500" /> Birthdays</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Daily View */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
            <h2 className="font-black text-xl text-text">Today, 15 Nov</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-background border border-border rounded text-sm font-bold hover:border-primary">Day</button>
              <button className="px-3 py-1 bg-surface border border-transparent rounded text-sm font-bold text-text-secondary hover:text-text">Week</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Timeline Events */}
            <div className="flex gap-4 group">
              <div className="w-16 text-right shrink-0">
                <span className="text-xs font-bold text-text-secondary">09:00 AM</span>
              </div>
              <div className="flex-1 pb-6 border-l-2 border-border relative">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-surface"></div>
                <div className="ml-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:border-blue-500/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-blue-700 dark:text-blue-400">Call: Ravi Desai</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full">Follow-up</span>
                  </div>
                  <p className="text-sm text-text mb-2">Discuss Term Life quotation sent yesterday.</p>
                  <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                    <Clock className="w-3 h-3" /> 09:00 AM - 09:15 AM
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-16 text-right shrink-0">
                <span className="text-xs font-bold text-text-secondary">11:30 AM</span>
              </div>
              <div className="flex-1 pb-6 border-l-2 border-border relative">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-surface"></div>
                <div className="ml-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:border-purple-500/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-purple-700 dark:text-purple-400">Zoom: Neha Gupta</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-500/20 text-purple-700 dark:text-purple-400 rounded-full">Meeting</span>
                  </div>
                  <p className="text-sm text-text mb-2">Family Health Insurance Planning.</p>
                  <div className="flex items-center gap-4 text-xs font-medium text-text-secondary">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 11:30 AM - 12:30 PM</span>
                    <span className="flex items-center gap-1 text-primary hover:underline"><Video className="w-3 h-3" /> Join Zoom</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-16 text-right shrink-0">
                <span className="text-xs font-bold text-text-secondary">02:00 PM</span>
              </div>
              <div className="flex-1 pb-6 border-l-2 border-border relative">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-orange-500 border-2 border-surface"></div>
                <div className="ml-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl hover:border-orange-500/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-orange-700 dark:text-orange-400">Renewal Alert: Sanjay Kumar</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded-full">Renewal</span>
                  </div>
                  <p className="text-sm text-text mb-2">Motor policy expires in 7 days. Need to collect payment link.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-16 text-right shrink-0">
                <span className="text-xs font-bold text-text-secondary">All Day</span>
              </div>
              <div className="flex-1 pb-6 border-l-2 border-border relative">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-pink-500 border-2 border-surface"></div>
                <div className="ml-6 p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl hover:border-pink-500/50 transition-colors cursor-pointer flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
                      <Cake className="w-4 h-4" /> Vikram Singh's Birthday
                    </h4>
                  </div>
                  <button className="text-xs font-bold bg-pink-500 text-white px-3 py-1.5 rounded-lg hover:bg-pink-600 transition-colors">
                    Send Wish
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
