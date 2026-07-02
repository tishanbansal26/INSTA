import { Wallet, ArrowDownRight, ArrowUpRight, Download, Filter } from 'lucide-react';

const TRANSACTIONS = [
  { id: 'TXN-001', type: 'PREMIUM_PAID', amount: '₹12,400', date: '12 Oct 2026', desc: 'Premium for POL-99281', status: 'SUCCESS' },
  { id: 'TXN-002', type: 'CLAIM_SETTLED', amount: '₹45,000', date: '05 Sep 2026', desc: 'Claim settlement CLM-4421', status: 'SUCCESS' },
  { id: 'TXN-003', type: 'REFUND', amount: '₹1,200', date: '22 Aug 2026', desc: 'Premium refund (Overpayment)', status: 'SUCCESS' },
];

export const MyWallet = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Digital Wallet</h1>
          <p className="text-text-secondary">Track your premium payments, refunds, and claim settlements.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-text rounded-lg hover:bg-surface transition-colors">
          <Download className="w-5 h-5" />
          Statement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Summary */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-primary to-primary-hover rounded-xl p-6 text-white shadow-xl shadow-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-white/90">Wallet Balance</span>
            </div>
            <h2 className="text-4xl font-bold mb-2">₹0.00</h2>
            <p className="text-sm text-white/70">Balances from refunds are auto-adjusted in next premium.</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="md:col-span-2">
          <div className="bg-surface border border-border rounded-xl">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-lg text-text">Transaction History</h3>
              <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
            
            <div className="divide-y divide-border">
              {TRANSACTIONS.map((txn) => (
                <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-background/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'PREMIUM_PAID' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                      {txn.type === 'PREMIUM_PAID' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-text text-sm">{txn.desc}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{txn.date} • {txn.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      txn.type === 'PREMIUM_PAID' ? 'text-text' : 'text-green-500'
                    }`}>
                      {txn.type === 'PREMIUM_PAID' ? '-' : '+'}{txn.amount}
                    </p>
                    <span className="text-xs text-green-500 font-medium">{txn.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
