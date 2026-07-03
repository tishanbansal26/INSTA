import { FileText, Filter, Plus, Download } from 'lucide-react';

export const InvoiceList = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Invoices</h1>
          <p className="text-text-secondary mt-1">Manage B2B corporate invoices and billing.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
          <h3 className="font-bold text-text">Recent Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice #</th>
                <th className="px-6 py-4 font-medium">Client / Company</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">INV-2026-{100 + item}</td>
                  <td className="px-6 py-4 text-text font-medium">Acme Corp Ltd.</td>
                  <td className="px-6 py-4 text-text-secondary">24 Oct 2026</td>
                  <td className="px-6 py-4 font-bold text-text">₹{item * 45000}</td>
                  <td className="px-6 py-4">
                    {item === 1 ? (
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">PAID</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full">DUE</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
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
