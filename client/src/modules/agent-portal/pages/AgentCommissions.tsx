import { IndianRupee, Download } from 'lucide-react';

export const AgentCommissions = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Commissions</h1>
          <p className="text-text-secondary">Track your earnings and payouts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-text rounded-lg hover:bg-surface transition-colors">
          <Download className="w-5 h-5" />
          Download Statement
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <IndianRupee className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No commissions yet</h3>
        <p className="text-text-secondary">Your earned commissions will appear here.</p>
      </div>
    </div>
  );
};
