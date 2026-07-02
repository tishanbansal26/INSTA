import { HelpCircle, Plus } from 'lucide-react';

export const SupportTickets = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Support Tickets</h1>
          <p className="text-text-secondary">Get help with your policies, claims, or portal usage.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          New Ticket
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <HelpCircle className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No support tickets</h3>
        <p className="text-text-secondary">You haven't opened any support tickets yet.</p>
      </div>
    </div>
  );
};
