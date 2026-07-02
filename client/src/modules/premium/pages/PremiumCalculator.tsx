import { useState } from 'react';
import { Calculator, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function PremiumCalculator() {
  const [formData, setFormData] = useState({
    companyId: '',
    planId: '',
    age: '',
    gender: 'MALE',
    familyType: 'INDIVIDUAL',
    sumInsured: '500000',
    tenure: '1'
  });

  const [premium, setPremium] = useState<number | null>(null);
  const gstRate = 0.18;

  const handleCalculate = () => {
    // Mock calculation logic
    const base = parseInt(formData.sumInsured) * 0.02 * parseInt(formData.tenure);
    const ageMultiplier = parseInt(formData.age) > 40 ? 1.5 : 1;
    setPremium(base * ageMultiplier);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text">Premium Calculator</h1>
          <p className="text-muted-foreground mt-1">Live breakdown and quotation generation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 glass p-6 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Company</label>
              <select 
                className="w-full p-2 rounded-md bg-background border border-border text-text focus:ring-1 focus:ring-primary"
                value={formData.companyId}
                onChange={(e) => setFormData({...formData, companyId: e.target.value})}
              >
                <option value="">Select Company</option>
                <option value="HDFC">HDFC Ergo</option>
                <option value="STAR">Star Health</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Plan</label>
              <select 
                className="w-full p-2 rounded-md bg-background border border-border text-text focus:ring-1 focus:ring-primary"
                value={formData.planId}
                onChange={(e) => setFormData({...formData, planId: e.target.value})}
              >
                <option value="">Select Plan</option>
                <option value="OPT">Optima Restore</option>
                <option value="FHO">Family Health Optima</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Eldest Member Age</label>
              <Input 
                type="number" 
                placeholder="e.g. 45" 
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Gender</label>
              <select 
                className="w-full p-2 rounded-md bg-background border border-border text-text focus:ring-1 focus:ring-primary"
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Family Type</label>
              <select 
                className="w-full p-2 rounded-md bg-background border border-border text-text focus:ring-1 focus:ring-primary"
                value={formData.familyType}
                onChange={(e) => setFormData({...formData, familyType: e.target.value})}
              >
                <option value="INDIVIDUAL">Individual</option>
                <option value="2A">2 Adults</option>
                <option value="2A1C">2 Adults, 1 Child</option>
                <option value="2A2C">2 Adults, 2 Children</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Sum Insured (₹)</label>
              <select 
                className="w-full p-2 rounded-md bg-background border border-border text-text focus:ring-1 focus:ring-primary"
                value={formData.sumInsured}
                onChange={(e) => setFormData({...formData, sumInsured: e.target.value})}
              >
                <option value="500000">₹ 5,00,000</option>
                <option value="1000000">₹ 10,00,000</option>
                <option value="2500000">₹ 25,00,000</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text">Tenure (Years)</label>
              <select 
                className="w-full p-2 rounded-md bg-background border border-border text-text focus:ring-1 focus:ring-primary"
                value={formData.tenure}
                onChange={(e) => setFormData({...formData, tenure: e.target.value})}
              >
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
              </select>
            </div>
          </div>
          
          <Button onClick={handleCalculate} className="w-full mt-4" disabled={!formData.age || !formData.companyId || !formData.planId}>
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Premium
          </Button>
        </div>

        {/* Live Breakdown Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-xl border border-primary/20">
            <h3 className="text-lg font-bold text-text mb-4 border-b border-border pb-2">Premium Breakdown</h3>
            
            {premium !== null ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Base Premium</span>
                  <span className="font-medium text-text">₹ {premium.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium text-text">₹ {(premium * gstRate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="font-bold text-text">Final Premium</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹ {(premium + premium * gstRate).toLocaleString()}
                  </span>
                </div>

                <div className="pt-6">
                  <Button className="w-full bg-success hover:bg-success/90 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save as Quote
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center flex flex-col items-center justify-center opacity-50">
                <AlertCircle className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Enter details and calculate to see the breakdown.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
