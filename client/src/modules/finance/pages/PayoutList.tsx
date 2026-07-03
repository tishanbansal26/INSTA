import { Banknote, Filter, Send } from 'lucide-react';

export const PayoutList = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Agent Payouts</h1>
          <p className="text-text-secondary mt-1">Manage and disburse commissions to agents.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Send className="w-4 h-4" /> Process Batch Payout
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
          <h3 className="font-bold text-text">Pending Payouts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">
                  <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-4 font-medium">Agent Name</th>
                <th className="px-6 py-4 font-medium">Bank Details</th>
                <th className="px-6 py-4 font-medium">Policies Sold</th>
                <th className="px-6 py-4 font-medium">Total Amount</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4 text-text font-medium">Agent {item}</td>
                  <td className="px-6 py-4 text-text-secondary">HDFC Bank •••• 1234</td>
                  <td className="px-6 py-4 text-text">{item * 3}</td>
                  <td className="px-6 py-4 font-bold text-text">₹{item * 15000}</td>
                  <td className="px-6 py-4">
                    <button className="text-primary font-medium hover:underline">Pay Now</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
