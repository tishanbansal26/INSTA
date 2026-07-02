import { Shield, Download } from 'lucide-react';

export const AgentPolicies = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Policies Sold</h1>
          <p className="text-text-secondary">Track all active and past policies sold by you.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-text rounded-lg hover:bg-surface transition-colors">
          <Download className="w-5 h-5" />
          Export
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <Shield className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No policies sold</h3>
        <p className="text-text-secondary">Start selling to see your policies here.</p>
      </div>
    </div>
  );
};
