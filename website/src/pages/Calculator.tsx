import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, Lock,
  User, MapPin, HeartPulse, Activity, Cigarette, 
  Baby, Coins, Briefcase
} from 'lucide-react';
import axios from 'axios';

export const Calculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    insuranceType: '', // 'Health' or 'Life'
    
    // Shared
    name: '',
    mobile: '',
    coverage: '1000000',
    
    // Health Specific
    familyMembers: ['Self'],
    age: '',
    city: '',
    preExisting: false,
    
    // Life Specific
    dob: '',
    gender: 'Male',
    smoker: false,
    income: '500000',
    policyTerm: '30'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleFamilyMember = (member: string) => {
    setFormData(prev => {
      const exists = prev.familyMembers.includes(member);
      if (exists && member === 'Self') return prev; // Self is mandatory
      return {
        ...prev,
        familyMembers: exists 
          ? prev.familyMembers.filter(m => m !== member)
          : [...prev.familyMembers, member]
      };
    });
  };

  const submitLead = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      
      const notes = formData.insuranceType === 'Health' 
        ? `Family: ${formData.familyMembers.join(', ')} | Age: ${formData.age} | City: ${formData.city} | Pre-existing: ${formData.preExisting ? 'Yes' : 'No'}`
        : `DOB: ${formData.dob} | Gender: ${formData.gender} | Smoker: ${formData.smoker ? 'Yes' : 'No'} | Income: ${formData.income} | Term: ${formData.policyTerm}`;

      await axios.post(`${apiUrl}/tasks`, { // Mocking the CRM endpoint for leads
        title: `New ${formData.insuranceType} Lead - ${formData.name}`,
        description: `Mobile: ${formData.mobile} | Coverage: ${formData.coverage} | ` + notes,
        status: 'TODO',
        priority: 'HIGH'
      });
    } catch (error) {
      console.error("Lead submission failed, proceeding to show plans anyway.", error);
    } finally {
      setIsLoading(false);
      setShowPlans(true);
    }
  };

  if (showPlans) {
    const isHealth = formData.insuranceType === 'Health';
    
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
            <p className="text-text-secondary text-lg">
              {isHealth 
                ? `Based on ${formData.familyMembers.join(' & ')} living in ${formData.city}`
                : `Based on your profile and ₹${parseInt(formData.coverage) / 10000000} Cr life cover requirement`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="bg-surface border-2 border-primary rounded-2xl p-8 shadow-xl relative animate-in fade-in duration-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                BEST MATCH
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text">{isHealth ? 'Niva Bupa' : 'Tata AIA'}</h3>
                  <p className="text-sm text-text-secondary mt-1">{isHealth ? 'Reassure 2.0' : 'Maha Raksha Supreme'}</p>
                </div>
                {isHealth ? <HeartPulse className="w-8 h-8 text-red-500" /> : <ShieldCheck className="w-8 h-8 text-blue-500" />}
              </div>
              
              <div className="mb-6">
                <span className="text-sm text-text-secondary block mb-1">Cover Amount</span>
                <p className="text-2xl font-black text-text">₹{isHealth ? (parseInt(formData.coverage)/100000).toFixed(0) + ' Lakhs' : (parseInt(formData.coverage)/10000000).toFixed(1) + ' Crore'}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {isHealth ? (
                  <>
                    <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Booster+ Benefit</li>
                    <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Safeguard (Zero Deduction)</li>
                    <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Annual Health Checkup</li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Coverage till Age 85</li>
                    <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Terminal Illness Benefit</li>
                    <li className="flex items-center gap-2 text-sm text-text"><CheckCircle2 className="w-4 h-4 text-green-500" /> Premium Waiver on CI</li>
                  </>
                )}
              </ul>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Premium</p>
                  <p className="text-2xl font-bold text-primary">₹{isHealth ? '945' : '1,250'}<span className="text-sm text-text-secondary font-medium">/mo</span></p>
                </div>
                <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Plan 2 & 3 would go here similarly - truncated for brevity but they share the exact layout */}
            <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors animate-in fade-in duration-700 delay-100">
               {/* Simplified representation of Plan 2 */}
               <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text">{isHealth ? 'HDFC ERGO' : 'HDFC Life'}</h3>
                  <p className="text-sm text-text-secondary mt-1">{isHealth ? 'Optima Secure' : 'Click 2 Protect Super'}</p>
                </div>
                {isHealth ? <HeartPulse className="w-8 h-8 text-red-500" /> : <ShieldCheck className="w-8 h-8 text-blue-500" />}
              </div>
              <div className="mb-6">
                <span className="text-sm text-text-secondary block mb-1">Cover Amount</span>
                <p className="text-2xl font-black text-text">₹{isHealth ? (parseInt(formData.coverage)/100000).toFixed(0) + ' Lakhs' : (parseInt(formData.coverage)/10000000).toFixed(1) + ' Crore'}</p>
              </div>
              <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Premium</p>
                  <p className="text-2xl font-bold text-text">₹{isHealth ? '1,100' : '1,420'}<span className="text-sm text-text-secondary font-medium">/mo</span></p>
                </div>
                <button className="px-6 py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-all">
                  Buy Now
                </button>
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors animate-in fade-in duration-700 delay-200">
               {/* Simplified representation of Plan 3 */}
               <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-text">{isHealth ? 'Care Insurance' : 'Max Life'}</h3>
                  <p className="text-sm text-text-secondary mt-1">{isHealth ? 'Care Supreme' : 'Smart Term Plan'}</p>
                </div>
                {isHealth ? <HeartPulse className="w-8 h-8 text-red-500" /> : <ShieldCheck className="w-8 h-8 text-blue-500" />}
              </div>
              <div className="mb-6">
                <span className="text-sm text-text-secondary block mb-1">Cover Amount</span>
                <p className="text-2xl font-black text-text">₹{isHealth ? (parseInt(formData.coverage)/100000).toFixed(0) + ' Lakhs' : (parseInt(formData.coverage)/10000000).toFixed(1) + ' Crore'}</p>
              </div>
              <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Premium</p>
                  <p className="text-2xl font-bold text-text">₹{isHealth ? '850' : '1,150'}<span className="text-sm text-text-secondary font-medium">/mo</span></p>
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

  const renderStepContent = () => {
    // STEP 1: Generic Type Selection
    if (step === 1) {
      return (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-text mb-2">What are you looking for?</h2>
            <p className="text-text-secondary">Select an insurance type to get personalized quotes instantly.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => { setFormData({...formData, insuranceType: 'Health'}); setStep(2); }}
              className={`p-6 border-2 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all ${formData.insuranceType === 'Health' ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-primary/50'}`}
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                <HeartPulse className="w-8 h-8 text-blue-500" />
              </div>
              <span className="font-bold text-lg text-text">Health Insurance</span>
            </button>

            <button
              onClick={() => { setFormData({...formData, insuranceType: 'Life', coverage: '10000000'}); setStep(2); }}
              className={`p-6 border-2 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all ${formData.insuranceType === 'Life' ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-primary/50'}`}
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-green-500" />
              </div>
              <span className="font-bold text-lg text-text">Term Life Insurance</span>
            </button>
          </div>
        </div>
      );
    }

    // ==========================================
    // HEALTH INSURANCE FLOW (Niva Bupa Style)
    // ==========================================
    if (formData.insuranceType === 'Health') {
      if (step === 2) {
        const members = ['Self', 'Spouse', 'Son', 'Daughter', 'Father', 'Mother'];
        return (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-text mb-2">Who would you like to insure?</h2>
              <p className="text-text-secondary">Select all family members you want to cover.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {members.map(member => (
                <button
                  key={member}
                  onClick={() => toggleFamilyMember(member)}
                  className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${formData.familyMembers.includes(member) ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-text hover:border-primary/50'}`}
                >
                  <User className="w-6 h-6" />
                  <span className="font-medium text-sm">{member}</span>
                </button>
              ))}
            </div>
            <button onClick={handleNext} className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6">Continue</button>
          </div>
        );
      }
      
      if (step === 3) {
        return (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-text mb-2">Eldest Member & Location</h2>
              <p className="text-text-secondary">This helps us calculate accurate zone-based premiums.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Age of eldest member</label>
                <input 
                  type="number" placeholder="e.g. 45" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Residential City</label>
                <select
                  value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary"
                >
                  <option value="">Select city...</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button onClick={handleNext} disabled={!formData.age || !formData.city} className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6 disabled:opacity-50">Continue</button>
          </div>
        );
      }

      if (step === 4) {
        return (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-text mb-2">Medical History</h2>
              <p className="text-text-secondary">Do any of the members have an existing illness?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setFormData({...formData, preExisting: false}); handleNext(); }}
                className="p-6 border border-border bg-surface rounded-xl hover:border-green-500 hover:bg-green-500/10 transition-colors text-center font-bold"
              >
                No, all good! 👍
              </button>
              <button
                onClick={() => { setFormData({...formData, preExisting: true}); handleNext(); }}
                className="p-6 border border-border bg-surface rounded-xl hover:border-red-500 hover:bg-red-500/10 transition-colors text-center font-bold"
              >
                Yes, have illness 🏥
              </button>
            </div>
          </div>
        );
      }
    }

    // ==========================================
    // TERM LIFE INSURANCE FLOW (Tata AIA Style)
    // ==========================================
    if (formData.insuranceType === 'Life') {
      if (step === 2) {
        return (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-text mb-2">Personal Details</h2>
              <p className="text-text-secondary">Life cover depends heavily on your current age.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Date of Birth</label>
                <input 
                  type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Male', 'Female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setFormData({...formData, gender: g})}
                      className={`py-3 border rounded-xl font-medium transition-all ${formData.gender === g ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-text'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleNext} disabled={!formData.dob} className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6 disabled:opacity-50">Continue</button>
          </div>
        );
      }

      if (step === 3) {
        return (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-text mb-2">Lifestyle & Income</h2>
              <p className="text-text-secondary">This helps us calculate your maximum life cover eligibility.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2"><Cigarette className="w-4 h-4"/> Do you smoke/chew tobacco?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setFormData({...formData, smoker: true})} className={`py-3 border rounded-xl font-medium transition-all ${formData.smoker ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border bg-surface text-text'}`}>Yes</button>
                  <button onClick={() => setFormData({...formData, smoker: false})} className={`py-3 border rounded-xl font-medium transition-all ${!formData.smoker ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-border bg-surface text-text'}`}>No</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4"/> Annual Income</label>
                <select
                  value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary"
                >
                  <option value="300000">Up to ₹5 Lakhs</option>
                  <option value="700000">₹5 - 10 Lakhs</option>
                  <option value="1500000">₹10 - 20 Lakhs</option>
                  <option value="2500000">₹20 Lakhs +</option>
                </select>
              </div>
            </div>
            <button onClick={handleNext} className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6">Continue</button>
          </div>
        );
      }

      if (step === 4) {
        return (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-text mb-2">Coverage Details</h2>
              <p className="text-text-secondary">How much cover do you need?</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Life Cover (Sum Assured)</label>
                <select
                  value={formData.coverage} onChange={e => setFormData({...formData, coverage: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary"
                >
                  <option value="5000000">₹50 Lakhs</option>
                  <option value="10000000">₹1 Crore</option>
                  <option value="20000000">₹2 Crores</option>
                  <option value="50000000">₹5 Crores</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">Cover me till age</label>
                <select
                  value={formData.policyTerm} onChange={e => setFormData({...formData, policyTerm: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary"
                >
                  <option value="60">60 Years</option>
                  <option value="70">70 Years</option>
                  <option value="85">85 Years</option>
                  <option value="99">99 Years (Whole Life)</option>
                </select>
              </div>
            </div>
            <button onClick={handleNext} className="w-full py-4 bg-primary text-white font-bold rounded-xl mt-6">See Final Quotes</button>
          </div>
        );
      }
    }

    // ==========================================
    // SHARED FINAL STEP: CONTACT
    // ==========================================
    if (step === 5) {
      return (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-text mb-2">Your quotes are ready!</h2>
            <p className="text-text-secondary">Enter your mobile number to view the exact premiums and compare top plans.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Full Name</label>
              <input 
                type="text" placeholder="Rahul Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" /> Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="px-4 py-3 bg-surface border border-border rounded-xl text-text-secondary font-medium">+91</div>
                <input 
                  type="tel" placeholder="98765 43210" maxLength={10} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary font-medium tracking-wider" 
                />
              </div>
            </div>
          </div>

          <button 
            onClick={submitLead}
            disabled={!formData.name || formData.mobile.length < 10 || isLoading}
            className="w-full py-4 bg-green-500 text-white font-bold rounded-xl mt-6 hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Fetching secure quotes...' : 'View Exact Quotes'}
          </button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-surface border-b border-border h-20 flex items-center px-6 lg:px-12 justify-center shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span className="font-bold text-2xl text-text">InsureFlow</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-xl overflow-hidden">
          
          {/* Dynamic Progress Bar based on branch */}
          <div className="h-2 bg-background flex w-full">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((step-1) / 4) * 100}%` }}></div>
          </div>

          <div className="p-8 md:p-12 relative">
            {step > 1 && (
              <button 
                onClick={handleBack}
                className="absolute top-8 left-8 text-text-secondary hover:text-text transition-colors text-sm font-medium flex items-center gap-1"
              >
                &larr; Back
              </button>
            )}
            
            <div className={step > 1 ? "mt-4" : ""}>
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
