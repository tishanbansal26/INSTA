import { FileText } from 'lucide-react';

export const MyQuotations = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Quotations</h1>
          <p className="text-text-secondary">View and accept insurance quotations from your agent.</p>
        </div>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <FileText className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No pending quotations</h3>
        <p className="text-text-secondary">You don't have any active quotations at the moment.</p>
      </div>
    </div>
  );
};
