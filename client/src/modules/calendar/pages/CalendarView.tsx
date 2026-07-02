
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <CalendarIcon className="w-6 h-6 text-primary" /> Global Calendar
      </h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Calendar Integration Coming Soon</h2>
        <p className="text-gray-500 mt-2">The unified calendar will aggregate Tasks, Follow-ups, Renewals, and Meetings.</p>
      </div>
    </div>
  );
}
