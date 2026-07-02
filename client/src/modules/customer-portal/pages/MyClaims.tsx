import { FileText, Plus } from 'lucide-react';

export const MyClaims = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Claims</h1>
          <p className="text-text-secondary">Track your insurance claims and raise new ones.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" />
          Raise Claim
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <FileText className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No active claims</h3>
        <p className="text-text-secondary">You don't have any ongoing or past claims.</p>
      </div>
    </div>
  );
};
