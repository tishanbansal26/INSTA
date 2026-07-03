import { Calculator, IndianRupee } from 'lucide-react';

interface Props {
  data: any;
  updateData: (data: any) => void;
}

export const Step3Premium = ({ data, updateData }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-text mb-2">Premium & Riders</h2>
        <p className="text-text-secondary">Calculate base premium, add optional riders, and apply taxes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-text mb-4">Coverage Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Sum Insured</label>
                <select 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={data?.sumInsured || ''}
                  onChange={(e) => updateData({ sumInsured: e.target.value })}
                >
                  <option value="">Select Amount</option>
                  <option value="500000">₹5,00,000</option>
                  <option value="1000000">₹10,00,000</option>
                  <option value="2500000">₹25,00,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Policy Tenure</label>
                <select 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={data?.tenure || ''}
                  onChange={(e) => updateData({ tenure: e.target.value })}
                >
                  <option value="">Select Tenure</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years (10% Discount)</option>
                  <option value="3">3 Years (15% Discount)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-text mb-4">Optional Riders</h3>
            <div className="space-y-3">
              {[
                { id: 'critical', name: 'Critical Illness Cover', price: 1200 },
                { id: 'accident', name: 'Personal Accident Cover', price: 800 },
                { id: 'maternity', name: 'Maternity Benefit', price: 3500 },
              ].map((rider) => {
                const isSelected = data?.riders?.includes(rider.id);
                return (
                  <label key={rider.id} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                        checked={isSelected || false}
                        onChange={(e) => {
                          const currentRiders = data?.riders || [];
                          if (e.target.checked) {
                            updateData({ riders: [...currentRiders, rider.id] });
                          } else {
                            updateData({ riders: currentRiders.filter((r: string) => r !== rider.id) });
                          }
                        }}
                      />
                      <span className="font-medium text-text">{rider.name}</span>
                    </div>
                    <span className="font-bold text-text">+₹{rider.price}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-surface to-background border border-border rounded-xl p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text">Premium Summary</h3>
            </div>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Premium</span>
                <span className="font-medium text-text">₹15,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Riders</span>
                <span className="font-medium text-text">₹{(data?.riders?.length || 0) * 1000}</span>
              </div>
              <div className="h-px bg-border my-2"></div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium text-text">₹{15000 + ((data?.riders?.length || 0) * 1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">GST (18%)</span>
                <span className="font-medium text-text">₹{Math.round((15000 + ((data?.riders?.length || 0) * 1000)) * 0.18)}</span>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <span className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Total Payable</span>
              <div className="flex items-center gap-1 text-2xl font-black text-text">
                <IndianRupee className="w-6 h-6" />
                {Math.round((15000 + ((data?.riders?.length || 0) * 1000)) * 1.18)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
