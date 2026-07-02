import { FileCheck, Search } from 'lucide-react';

export const AgentClaims = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Assigned Claims</h1>
          <p className="text-text-secondary">Track and assist with your clients' claims.</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input type="text" placeholder="Search claims..." className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-blue-600" />
        </div>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <FileCheck className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No active claims</h3>
        <p className="text-text-secondary">None of your clients have active claims right now.</p>
      </div>
    </div>
  );
};
