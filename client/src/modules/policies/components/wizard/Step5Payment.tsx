import { CreditCard, Landmark, QrCode } from 'lucide-react';

interface Props {
  data: any;
  updateData: (data: any) => void;
}

export const Step5Payment = ({ data, updateData }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-text mb-2">Payment Details</h2>
        <p className="text-text-secondary">Capture payment information to bind the policy.</p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-lg font-bold text-text mb-6">Payment Mode</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { id: 'bank', label: 'Bank Transfer', icon: Landmark },
            { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
            { id: 'upi', label: 'UPI / QR', icon: QrCode },
          ].map((mode) => (
            <div 
              key={mode.id}
              onClick={() => updateData({ mode: mode.id })}
              className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col items-center gap-3 text-center ${
                data?.mode === mode.id
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                data?.mode === mode.id ? 'bg-primary/20 text-primary' : 'bg-surface text-text-secondary'
              }`}>
                <mode.icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-text">{mode.label}</span>
            </div>
          ))}
        </div>

        {data?.mode && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 border-t border-border pt-6">
            <h3 className="text-lg font-bold text-text mb-4">Transaction Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Transaction Reference / UTR</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  placeholder="e.g. HDFC000123456789"
                  value={data?.reference || ''}
                  onChange={(e) => updateData({ reference: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Payment Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={data?.date || ''}
                  onChange={(e) => updateData({ date: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text mb-2">Payment Proof (Optional)</label>
                <div className="border border-border border-dashed rounded-lg p-6 text-center bg-background">
                  <span className="text-sm font-medium text-primary cursor-pointer hover:underline">Click to upload receipt screenshot</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
