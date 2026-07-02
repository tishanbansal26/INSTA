import { LineChart, Download } from 'lucide-react';

export const AgentPerformance = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Performance & Analytics</h1>
          <p className="text-text-secondary">Analyze your sales metrics and commission trends.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-text rounded-lg hover:bg-surface transition-colors">
          <Download className="w-5 h-5" />
          Download Report
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <LineChart className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">Insufficient data</h3>
        <p className="text-text-secondary">We need more sales data to generate your performance trends.</p>
      </div>
    </div>
  );
};
