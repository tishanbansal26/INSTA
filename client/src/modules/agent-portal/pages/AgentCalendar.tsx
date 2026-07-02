import { CalendarDays, Plus } from 'lucide-react';

export const AgentCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Calendar & Tasks</h1>
          <p className="text-text-secondary">Manage your appointments, tasks, and follow-ups.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20">
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <CalendarDays className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No upcoming events</h3>
        <p className="text-text-secondary">Your schedule is clear for now.</p>
      </div>
    </div>
  );
};
