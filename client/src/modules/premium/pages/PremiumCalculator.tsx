import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  Save, 
  IndianRupee, 
  ShieldPlus, 
  Download, 
  Percent, 
  Calendar 
} from 'lucide-react';

export function PremiumCalculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: 'Niva Bupa',
    plan: 'Comprehensive Health Cover',
    age: '30',
    gender: 'MALE',
    familyType: 'INDIVIDUAL',
    sumInsured: '1000000',
    tenure: '1',
    riders: [] as string[]
  });

  const [premium, setPremium] = useState({
    base: 0,
    riders: 0,
    subtotal: 0,
    discount: 0,
    gst: 0,
    total: 0,
    monthly: 0
  });

  const GST_RATE = 0.18;
  const MULTI_YEAR_DISCOUNT_2Y = 0.10;
  const MULTI_YEAR_DISCOUNT_3Y = 0.15;

  const RIDERS = [
    { id: 'critical', name: 'Critical Illness Cover', cost: 2500, description: '₹5L lump sum on diagnosis' },
    { id: 'accident', name: 'Personal Accident', cost: 1200, description: '₹10L accidental death cover' },
    { id: 'maternity', name: 'Maternity Benefit', cost: 4500, description: 'Up to ₹1L maternity expenses' },
  ];

  // Live calculation effect
  useEffect(() => {
    let baseRate = (parseInt(formData.sumInsured) / 100000) * 1200; 
    let ageMultiplier = parseInt(formData.age || '30') > 45 ? 1.5 : 1.0;
    let base = baseRate * ageMultiplier * parseInt(formData.tenure);

    let riderTotal = formData.riders.reduce((acc, riderId) => {
      const rider = RIDERS.find(r => r.id === riderId);
      return acc + (rider ? rider.cost * parseInt(formData.tenure) : 0);
    }, 0);

    let discount = 0;
    if (formData.tenure === '2') discount = (base + riderTotal) * MULTI_YEAR_DISCOUNT_2Y;
    if (formData.tenure === '3') discount = (base + riderTotal) * MULTI_YEAR_DISCOUNT_3Y;

    let subtotal = base + riderTotal - discount;
    let gst = subtotal * GST_RATE;
    let total = subtotal + gst;
    let monthly = total / (12 * parseInt(formData.tenure));

    setPremium({
      base: Math.round(base),
      riders: Math.round(riderTotal),
      subtotal: Math.round(subtotal),
      discount: Math.round(discount),
      gst: Math.round(gst),
      total: Math.round(total),
      monthly: Math.round(monthly)
    });
  }, [formData]);

  const toggleRider = (id: string) => {
    setFormData(prev => {
      const riders = prev.riders.includes(id) 
        ? prev.riders.filter(r => r !== id)
        : [...prev.riders, id];
      return { ...prev, riders };
    });
  };

  const handleExport = () => {
    alert("Quote PDF downloaded successfully!");
  };

  const handleSave = () => {
    alert("Quotation saved successfully!");
    navigate('/quotations');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Calculator className="w-6 h-6 text-primary" /> Premium Calculator
          </h1>
          <p className="text-text-secondary mt-1">Live premium quotes with exact GST and rider breakdowns.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 bg-surface border border-border rounded-lg text-text font-medium hover:border-primary transition-all">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
            <Save className="w-4 h-4" /> Save as Quotation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-text mb-4">Insured Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Age of Eldest Member</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Family Type</label>
                <select 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={formData.familyType}
                  onChange={e => setFormData({...formData, familyType: e.target.value})}
                >
                  <option value="INDIVIDUAL">Individual</option>
                  <option value="FLOATER">Family Floater</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Sum Insured</label>
                <select 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={formData.sumInsured}
                  onChange={e => setFormData({...formData, sumInsured: e.target.value})}
                >
                  <option value="500000">₹5,00,000</option>
                  <option value="1000000">₹10,00,000</option>
                  <option value="2500000">₹25,00,000</option>
                  <option value="5000000">₹50,00,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Policy Tenure</label>
                <select 
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary"
                  value={formData.tenure}
                  onChange={e => setFormData({...formData, tenure: e.target.value})}
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years (10% Discount)</option>
                  <option value="3">3 Years (15% Discount)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-text mb-4">Add-on Covers (Riders)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RIDERS.map(rider => {
                const isSelected = formData.riders.includes(rider.id);
                return (
                  <div 
                    key={rider.id}
                    onClick={() => toggleRider(rider.id)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-primary/5 border-primary shadow-sm shadow-primary/10' 
                        : 'bg-background border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <ShieldPlus className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-text-secondary'}`} />
                        <h4 className="font-bold text-text">{rider.name}</h4>
                      </div>
                      {isSelected && <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">✓</div>}
                    </div>
                    <p className="text-xs text-text-secondary mb-3">{rider.description}</p>
                    <p className="text-sm font-bold text-primary">+ ₹{rider.cost} / year</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Breakdown */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-surface to-background border border-border rounded-xl p-6 sticky top-6 shadow-xl shadow-black/5">
            <h3 className="text-lg font-bold text-text mb-6 pb-4 border-b border-border flex items-center justify-between">
              Premium Breakdown
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded font-bold uppercase tracking-wider">Live</span>
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Base Premium</span>
                <span className="font-medium text-text">₹{premium.base.toLocaleString('en-IN')}</span>
              </div>
              
              {premium.riders > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary flex items-center gap-1"><ShieldPlus className="w-3.5 h-3.5" /> Riders Total</span>
                  <span className="font-medium text-text">₹{premium.riders.toLocaleString('en-IN')}</span>
                </div>
              )}
              
              {premium.discount > 0 && (
                <div className="flex justify-between text-sm text-green-500 bg-green-500/5 p-2 rounded-lg -mx-2">
                  <span className="flex items-center gap-1"><Percent className="w-3.5 h-3.5" /> Multi-year Discount</span>
                  <span className="font-bold">- ₹{premium.discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="h-px bg-border my-2"></div>
              
              <div className="flex justify-between text-sm">
                <span className="font-medium text-text">Subtotal</span>
                <span className="font-bold text-text">₹{premium.subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">GST (18%)</span>
                <span className="font-medium text-text">₹{premium.gst.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-primary to-primary-hover rounded-xl text-white shadow-lg shadow-primary/30 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <IndianRupee className="w-24 h-24" />
              </div>
              <span className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1 relative z-10">Total Payable</span>
              <div className="flex items-center gap-1 text-3xl font-black relative z-10 mb-4">
                <IndianRupee className="w-7 h-7" />
                {premium.total.toLocaleString('en-IN')}
              </div>
              
              <div className="pt-4 border-t border-white/20 flex justify-between items-center relative z-10">
                <span className="text-xs text-white/80 font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Monthly EMI Option</span>
                <span className="font-bold text-sm">₹{premium.monthly.toLocaleString('en-IN')} / mo</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
