import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, User, PhoneCall, RefreshCw } from 'lucide-react';

export const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDayEvents = (day: number) => {
    // Mock events
    if (day === 14) return [{ title: 'Renewal: Rahul', type: 'renewal', time: '10:00 AM' }];
    if (day === 22) return [{ title: 'Call: Priya', type: 'call', time: '2:30 PM' }, { title: 'Meeting: Acme Corp', type: 'meeting', time: '4:00 PM' }];
    return [];
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[calc(100vh-6rem)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" /> Calendar & Tasks
          </h1>
          <p className="text-text-secondary mt-1">Manage renewals, follow-ups, and client meetings.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <RefreshCw className="w-4 h-4" /> Sync Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-xl flex flex-col overflow-hidden">
        {/* Calendar Controls */}
        <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
          <h2 className="text-xl font-bold text-text">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevMonth}
              className="p-2 border border-border rounded-lg text-text hover:bg-background transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 border border-border rounded-lg text-text font-medium hover:bg-background transition-colors"
            >
              Today
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 border border-border rounded-lg text-text hover:bg-background transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 border-b border-border sticky top-0 bg-surface z-10 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-sm font-bold text-text-secondary border-r border-border last:border-0 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 auto-rows-fr min-h-[600px] h-full">
            {/* Empty slots before 1st of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="border-r border-b border-border bg-background/30 p-2"></div>
            ))}
            
            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
              const events = getDayEvents(day);

              return (
                <div key={day} className={`border-r border-b border-border p-2 flex flex-col hover:bg-background/30 transition-colors min-h-[120px] ${isToday ? 'bg-primary/5' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${isToday ? 'bg-primary text-white' : 'text-text'}`}>
                      {day}
                    </span>
                  </div>
                  
                  <div className="space-y-1 flex-1 overflow-y-auto hide-scrollbar">
                    {events.map((evt, idx) => (
                      <div 
                        key={idx} 
                        className={`text-xs px-2 py-1 rounded border truncate cursor-pointer ${
                          evt.type === 'renewal' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                          evt.type === 'call' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                          'bg-green-500/10 text-green-500 border-green-500/20'
                        }`}
                        title={`${evt.time} - ${evt.title}`}
                      >
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
