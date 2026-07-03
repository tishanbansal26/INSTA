import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Building,
  User,
  MapPin,
  HeartPulse
} from 'lucide-react';
import axios from 'axios';

export const Calculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    insuranceType: 'Health Insurance',
    age: '',
    gender: 'Male',
    city: '',
    coverage: '1000000',
    name: '',
    mobile: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);

  const handleNext = () => setStep(step + 1);

  const submitLead = async () => {
    setIsLoading(true);
    try {
      // Post to the actual ERP backend we built in Phase 1
      await axios.post('http://localhost:3000/api/leads', {
        name: formData.name,
        email: 'customer@website.com', // Mocked since we only ask for Mobile here
        phone: formData.mobile,
        source: 'Website - Premium Calculator',
        status: 'NEW',
        type: formData.insuranceType,
        notes: `Age: ${formData.age}, Gender: ${formData.gender}, City: ${formData.city}, Coverage: ${formData.coverage}`
      });
    } catch (error) {
      console.error("Lead submission failed, proceeding to show plans anyway.", error);
    } finally {
      setIsLoading(false);
      setShowPlans(true);
    }
  };

  if (showPlans) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <header className="bg-surface border-b border-border h-20 flex items-center px-6 lg:px-12 justify-center">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-bold text-2xl text-text">InsureFlow</span>
          </Link>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-black text-text mb-4">Top 3 Recommended Plans for You</h1>
            <p className="text-text-secondary text-lg">Based on a {formData.age}-year old {formData.gender} living in {formData.city}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-surface border-2 border-primary rounded-2xl p-8 shadow-xl relative animate-in fade-in duration-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                BEST MATCH
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text">HDFC ERGO</h3>
                  <p className="text-sm text-text-secondary mt-1">Optima Secure</p>
                </div>
                <HeartPulse className="w-8 h-8 text-red-500" />
              </div>
              
              <div className="mb-6">
                <span className="text-sm text-text-secondary block mb-1">Cover Amount</span>
                <p className="text-2xl font-black text-text">₹{(parseInt(formData.coverage) / 100000).toFixed(0)} Lakhs</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> 2X Coverage from Day 1</li>
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> No Room Rent Cap</li>
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free Annual Checkup</li>
              </ul>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Premium</p>
                  <p className="text-2xl font-bold text-primary">₹945<span className="text-sm text-text-secondary font-medium">/mo</span></p>
                </div>
                <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors animate-in fade-in duration-700 delay-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text">ICICI Lombard</h3>
                  <p className="text-sm text-text-secondary mt-1">Health AdvantEdge</p>
                </div>
                <HeartPulse className="w-8 h-8 text-red-500" />
              </div>
              
              <div className="mb-6">
                <span className="text-sm text-text-secondary block mb-1">Cover Amount</span>
                <p className="text-2xl font-black text-text">₹{(parseInt(formData.coverage) / 100000).toFixed(0)} Lakhs</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Cashless Anywhere</li>
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> OPD Cover Included</li>
                <li className="flex items-center gap-2 text-sm text-text text-text-secondary opacity-50">No Room Rent Cap</li>
              </ul>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Premium</p>
                  <p className="text-2xl font-bold text-text">₹820<span className="text-sm text-text-secondary font-medium">/mo</span></p>
                </div>
                <button className="px-6 py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-all">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors animate-in fade-in duration-700 delay-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text">Star Health</h3>
                  <p className="text-sm text-text-secondary mt-1">Comprehensive</p>
                </div>
                <HeartPulse className="w-8 h-8 text-red-500" />
              </div>
              
              <div className="mb-6">
                <span className="text-sm text-text-secondary block mb-1">Cover Amount</span>
                <p className="text-2xl font-black text-text">₹{(parseInt(formData.coverage) / 100000).toFixed(0)} Lakhs</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Maternity Cover</li>
                <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Restoration Benefit</li>
                <li className="flex items-center gap-2 text-sm text-text text-text-secondary opacity-50">Day 1 Coverage</li>
              </ul>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Premium</p>
                  <p className="text-2xl font-bold text-text">₹1,050<span className="text-sm text-text-secondary font-medium">/mo</span></p>
                </div>
                <button className="px-6 py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-all">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <button className="px-8 py-3 bg-white border border-border text-text font-bold rounded-xl hover:border-primary transition-colors flex items-center gap-2 mx-auto">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> Email Me These Quotes
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface border-b border-border h-20 flex items-center px-6 lg:px-12 justify-center shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span className="font-bold text-2xl text-text">InsureFlow</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          
          {/* Progress Bar */}
          <div className="h-2 bg-background flex w-full">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>

          <div className="p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-black text-text mb-2">Let's find the best plan for you</h2>
                  <p className="text-text-secondary">Help us customize your premium calculation.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Insurance Type</label>
                    <select 
                      value={formData.insuranceType}
                      onChange={e => setFormData({...formData, insuranceType: e.target.value})}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary"
                    >
                      <option>Health Insurance</option>
                      <option>Term Life Insurance</option>
                      <option>Car Insurance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> Your Age
                    </label>
                    <input 
                      type="number" 
                      placeholder="e.g. 28" 
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!formData.age}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-black text-text mb-2">A few more details</h2>
                  <p className="text-text-secondary">This helps us calculate accurate zone-based premiums.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> City
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bangalore" 
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Coverage Amount (₹)</label>
                    <select 
                      value={formData.coverage}
                      onChange={e => setFormData({...formData, coverage: e.target.value})}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary"
                    >
                      <option value="500000">₹5 Lakhs</option>
                      <option value="1000000">₹10 Lakhs</option>
                      <option value="2500000">₹25 Lakhs</option>
                      <option value="10000000">₹1 Crore</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!formData.city}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  See Estimated Premium <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-black text-text mb-2">Your quotes are ready!</h2>
                  <p className="text-text-secondary">Enter your mobile number to view the exact premiums and compare top plans.</p>
                </div>
                
                <div className="space-y-4 relative">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Rahul Sharma" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-500" /> Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="px-4 py-3 bg-surface border border-border rounded-xl text-text-secondary font-medium">
                        +91
                      </div>
                      <input 
                        type="tel" 
                        placeholder="98765 43210" 
                        value={formData.mobile}
                        onChange={e => setFormData({...formData, mobile: e.target.value})}
                        maxLength={10}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary font-medium tracking-wider" 
                      />
                    </div>
                    <p className="text-[10px] text-text-secondary mt-2 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> We never spam. This is only to share your personalized quotes.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={submitLead}
                  disabled={!formData.name || formData.mobile.length < 10 || isLoading}
                  className="w-full py-4 bg-green-500 text-white font-bold rounded-xl mt-6 hover:bg-green-600 shadow-lg shadow-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {isLoading ? 'Calculating Best Plans...' : 'View Exact Quotes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
