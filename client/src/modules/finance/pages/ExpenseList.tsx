import { IndianRupee, TrendingDown, Filter, Plus } from 'lucide-react';

export const ExpenseList = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Office Expenses</h1>
          <p className="text-text-secondary mt-1">Manage and track agency operational expenses.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><TrendingDown className="w-24 h-24" /></div>
          <span className="text-sm font-medium text-text-secondary mb-2 block">Total Expenses (This Month)</span>
          <h3 className="text-3xl font-black text-red-500">₹45,200</h3>
          <p className="text-xs text-text-secondary mt-2">-5% from last month</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><IndianRupee className="w-24 h-24" /></div>
          <span className="text-sm font-medium text-text-secondary mb-2 block">Top Category</span>
          <h3 className="text-2xl font-black text-text">Office Rent</h3>
          <p className="text-xs text-text-secondary mt-2">₹25,000</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><IndianRupee className="w-24 h-24" /></div>
          <span className="text-sm font-medium text-text-secondary mb-2 block">Pending Approvals</span>
          <h3 className="text-3xl font-black text-orange-500">3</h3>
          <p className="text-xs text-text-secondary mt-2">Totaling ₹12,500</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
          <h3 className="font-bold text-text">Recent Expenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[1, 2, 3, 4].map((item) => (
                <tr key={item} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 text-text">24 Oct 2026</td>
                  <td className="px-6 py-4 text-text font-medium">{item === 1 ? 'Office Rent' : 'Marketing'}</td>
                  <td className="px-6 py-4 text-text-secondary">Monthly payment</td>
                  <td className="px-6 py-4 font-bold text-text">₹{item * 5000}</td>
                  <td className="px-6 py-4">
                    {item === 1 ? (
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">APPROVED</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full">PENDING</span>
                    )}
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
