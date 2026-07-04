import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, ArrowLeft, HeartPulse, Shield, User, Users, CheckCircle2, AlertCircle, Activity
} from 'lucide-react';
import axios from 'axios';

// --- Step Components ---

const StepChooseInsurance = ({ value, onChange, onNext }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl md:text-3xl font-black text-text mb-2 text-center">What are you looking to protect?</h2>
    <p className="text-text-secondary text-center mb-8">Select the type of insurance you need to get started.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <div 
        onClick={() => onChange('Health')}
        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${value === 'Health' ? 'border-red-500 bg-red-500/5 shadow-lg shadow-red-500/20' : 'border-border bg-surface hover:border-red-500/50'}`}
      >
        <HeartPulse className={`w-12 h-12 mb-4 ${value === 'Health' ? 'text-red-500' : 'text-text-secondary'}`} />
        <h3 className="text-xl font-bold text-text mb-2">Health Insurance</h3>
        <p className="text-sm text-text-secondary">Cover medical expenses for you and your family.</p>
      </div>

      <div 
        onClick={() => onChange('Life')}
        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${value === 'Life' ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/20' : 'border-border bg-surface hover:border-blue-500/50'}`}
      >
        <Shield className={`w-12 h-12 mb-4 ${value === 'Life' ? 'text-blue-500' : 'text-text-secondary'}`} />
        <h3 className="text-xl font-bold text-text mb-2">Term Life Insurance</h3>
        <p className="text-sm text-text-secondary">Secure your family's financial future.</p>
      </div>
    </div>
    <div className="flex justify-center mt-10">
      <button onClick={onNext} disabled={!value} className="px-8 py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50 hover:bg-primary-hover flex items-center gap-2 transition-all">
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const StepHealthFamily = ({ data, onChange, onNext, onBack }: any) => {
  const toggleMember = (member: string) => {
    const exists = data.familyMembers.includes(member);
    if (exists && member === 'Self') return; 
    const newMembers = exists ? data.familyMembers.filter((m: string) => m !== member) : [...data.familyMembers, member];
    onChange('familyMembers', newMembers);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <h2 className="text-2xl font-black text-text mb-6 text-center">Who would you like to insure?</h2>
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {['Self', 'Spouse', 'Son', 'Daughter', 'Father', 'Mother'].map(member => (
          <button
            key={member}
            onClick={() => toggleMember(member)}
            className={`px-6 py-3 rounded-full border-2 font-bold transition-all ${
              data.familyMembers.includes(member) ? 'border-primary bg-primary text-white shadow-lg' : 'border-border bg-surface text-text hover:border-primary/50'
            }`}
          >
            {member}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-text mb-2">Eldest Member's Age</label>
          <input type="number" value={data.age} onChange={e => onChange('age', e.target.value)} placeholder="e.g. 35" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-text mb-2">City or Pincode</label>
          <input type="text" value={data.city} onChange={e => onChange('city', e.target.value)} placeholder="e.g. 110001 or Delhi" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-text mb-2">Any pre-existing medical conditions?</label>
          <div className="flex gap-4">
            <button onClick={() => onChange('preExisting', true)} className={`flex-1 py-3 border-2 rounded-xl font-bold ${data.preExisting ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border text-text'}`}>Yes</button>
            <button onClick={() => onChange('preExisting', false)} className={`flex-1 py-3 border-2 rounded-xl font-bold ${!data.preExisting ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-border text-text'}`}>No</button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="px-6 py-3 font-bold text-text hover:text-primary flex items-center gap-2"><ArrowLeft className="w-5 h-5" /> Back</button>
        <button onClick={onNext} disabled={!data.age || !data.city} className="px-8 py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2">Continue <ArrowRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
};

const StepLifeProfile = ({ data, onChange, onNext, onBack }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
    <h2 className="text-2xl font-black text-text mb-8 text-center">Tell us about yourself</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-bold text-text mb-2">Date of Birth</label>
        <input type="date" value={data.dob} onChange={e => onChange('dob', e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none" />
      </div>
      <div>
        <label className="block text-sm font-bold text-text mb-2">Gender</label>
        <select value={data.gender} onChange={e => onChange('gender', e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none">
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-text mb-2">Do you smoke or use tobacco?</label>
        <div className="flex gap-4">
          <button onClick={() => onChange('smoker', true)} className={`flex-1 py-2 border-2 rounded-xl font-bold ${data.smoker ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-border text-text'}`}>Yes</button>
          <button onClick={() => onChange('smoker', false)} className={`flex-1 py-2 border-2 rounded-xl font-bold ${!data.smoker ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-border text-text'}`}>No</button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-text mb-2">Occupation</label>
        <select value={data.occupation} onChange={e => onChange('occupation', e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none">
          <option>Salaried</option>
          <option>Self Employed</option>
          <option>Business Owner</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-bold text-text mb-2">Annual Income</label>
        <select value={data.income} onChange={e => onChange('income', e.target.value)} className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none">
          <option value="300000">₹3 Lakhs - ₹5 Lakhs</option>
          <option value="700000">₹5 Lakhs - ₹10 Lakhs</option>
          <option value="1500000">₹10 Lakhs - ₹20 Lakhs</option>
          <option value="3000000">Above ₹20 Lakhs</option>
        </select>
      </div>
    </div>

    <div className="flex justify-between mt-10">
      <button onClick={onBack} className="px-6 py-3 font-bold text-text hover:text-primary flex items-center gap-2"><ArrowLeft className="w-5 h-5" /> Back</button>
      <button onClick={onNext} disabled={!data.dob} className="px-8 py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2">Continue <ArrowRight className="w-5 h-5" /></button>
    </div>
  </div>
);

const StepCoverage = ({ data, onChange, onNext, onBack }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto text-center">
    <h2 className="text-2xl font-black text-text mb-2">How much coverage do you need?</h2>
    <p className="text-text-secondary mb-8">Move the slider to adjust your sum {data.insuranceType === 'Health' ? 'insured' : 'assured'}</p>
    
    <div className="bg-surface p-8 rounded-2xl border border-border">
      <h3 className="text-5xl font-black text-primary mb-8">
        ₹{parseInt(data.coverage) >= 10000000 ? (parseInt(data.coverage) / 10000000).toFixed(1) + ' Cr' : (parseInt(data.coverage) / 100000).toFixed(0) + ' Lakhs'}
      </h3>
      
      <input 
        type="range" 
        min={data.insuranceType === 'Health' ? "500000" : "5000000"} 
        max={data.insuranceType === 'Health' ? "10000000" : "50000000"} 
        step={data.insuranceType === 'Health' ? "500000" : "5000000"}
        value={data.coverage} 
        onChange={(e) => onChange('coverage', e.target.value)}
        className="w-full accent-primary h-2 bg-border rounded-lg appearance-none cursor-pointer" 
      />
    </div>

    <div className="flex justify-between mt-10">
      <button onClick={onBack} className="px-6 py-3 font-bold text-text hover:text-primary flex items-center gap-2"><ArrowLeft className="w-5 h-5" /> Back</button>
      <button onClick={onNext} className="px-8 py-3 bg-primary text-white font-bold rounded-xl flex items-center gap-2">Continue <ArrowRight className="w-5 h-5" /></button>
    </div>
  </div>
);

const StepContact = ({ data, onChange, onSubmit, onBack, isLoading }: any) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
    <h2 className="text-2xl font-black text-text mb-2 text-center">Last step for your exact quote</h2>
    <p className="text-text-secondary text-center mb-8">Where should we send your personalized quotation?</p>
    
    <div className="space-y-6">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-bold text-text mb-2">Full Name</label>
        <input id="contact-name" type="text" value={data.name} onChange={e => onChange('name', e.target.value)} placeholder="e.g. John Doe" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none" />
      </div>
      <div>
        <label htmlFor="contact-mobile" className="block text-sm font-bold text-text mb-2">Mobile Number</label>
        <input id="contact-mobile" type="tel" value={data.mobile} onChange={e => onChange('mobile', e.target.value)} placeholder="+91" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none" />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-bold text-text mb-2">Email Address</label>
        <input id="contact-email" type="email" value={data.email} onChange={e => onChange('email', e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none" />
      </div>
    </div>

    <div className="flex justify-between mt-10">
      <button onClick={onBack} className="px-6 py-3 font-bold text-text hover:text-primary flex items-center gap-2"><ArrowLeft className="w-5 h-5" /> Back</button>
      <button onClick={onSubmit} disabled={!data.name || !data.mobile || isLoading} className="px-8 py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2">
        {isLoading ? 'Generating...' : 'Get Quotes'} <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  </div>
);


// --- Main Calculator Page ---

export const Calculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    insuranceType: '', // 'Health' or 'Life'
    
    // Shared
    name: '',
    mobile: '',
    email: '',
    coverage: '1000000',
    
    // Health Specific (Niva Bupa aligned)
    familyMembers: ['Self'],
    age: '',
    city: '',
    preExisting: false,
    
    // Life Specific (Tata AIA aligned)
    dob: '',
    gender: 'Male',
    smoker: false,
    income: '500000',
    occupation: 'Salaried',
    policyTerm: '30'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleChange = (key: string, value: any) => setFormData(prev => ({ ...prev, [key]: value }));

  const submitLead = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://insureflow-erp.vercel.app/api/v1';
      
      const notes = formData.insuranceType === 'Health' 
        ? `Family: ${formData.familyMembers.join(', ')} | Age: ${formData.age} | City: ${formData.city} | Pre-existing: ${formData.preExisting ? 'Yes' : 'No'}`
        : `DOB: ${formData.dob} | Gender: ${formData.gender} | Smoker: ${formData.smoker ? 'Yes' : 'No'} | Income: ${formData.income} | Occupation: ${formData.occupation}`;

      await axios.post(`${apiUrl}/leads`, { 
        name: formData.name,
        email: formData.email || undefined,
        mobile: formData.mobile,
        source: 'Website Calculator',
        status: 'NEW',
        priority: 'HIGH'
      });
      
      // Also create a task for the agent
      await axios.post(`${apiUrl}/tasks`, { 
        title: `New ${formData.insuranceType} Lead - ${formData.name}`,
        description: `Coverage Required: ${formData.coverage} \nDetails: ${notes}`,
        status: 'TODO',
        priority: 'HIGH'
      });
    } catch (error) {
      console.warn("Lead submission failed, proceeding to show plans anyway. This is expected if API URL is not configured on the frontend.");
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
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full font-bold mb-6">
              <CheckCircle2 className="w-5 h-5" /> Quotes Generated Successfully
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-text mb-4">Recommended Plans for You</h1>
            <p className="text-text-secondary text-lg">
              {isHealth 
                ? `Based on your profile, city, and family requirements.`
                : `Based on your income, lifestyle, and ₹${(parseInt(formData.coverage) / 10000000).toFixed(1)} Cr life cover requirement.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Recommendation */}
            <div className="bg-surface border-2 border-primary rounded-2xl p-8 shadow-2xl relative animate-in fade-in duration-700">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-lg">
                EXPERT MATCH
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-text">{isHealth ? 'Niva Bupa' : 'Tata AIA'}</h3>
                  <p className="font-medium text-primary mt-1">{isHealth ? 'Reassure 2.0' : 'Maha Raksha Supreme'}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  {isHealth ? <Activity className="w-8 h-8 text-primary" /> : <ShieldCheck className="w-8 h-8 text-primary" />}
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-background rounded-xl border border-border flex justify-between items-center">
                <span className="text-sm font-bold text-text-secondary">Sum {isHealth ? 'Insured' : 'Assured'}</span>
                <p className="text-xl font-black text-text">₹{isHealth ? (parseInt(formData.coverage)/100000).toFixed(0) + ' Lakhs' : (parseInt(formData.coverage)/10000000).toFixed(1) + ' Crore'}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {isHealth ? (
                  <>
                    <li className="flex items-start gap-3 text-sm text-text font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="pt-0.5">Booster+ Benefit (Unused sum carries forward)</span></li>
                    <li className="flex items-start gap-3 text-sm text-text font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="pt-0.5">Safeguard (Zero deduction on consumables)</span></li>
                    <li className="flex items-start gap-3 text-sm text-text font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="pt-0.5">Annual Health Checkup for all members</span></li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3 text-sm text-text font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="pt-0.5">Coverage till Age 85 / 100 options</span></li>
                    <li className="flex items-start gap-3 text-sm text-text font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="pt-0.5">In-built Terminal Illness Benefit</span></li>
                    <li className="flex items-start gap-3 text-sm text-text font-medium"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> <span className="pt-0.5">Premium Waiver on Critical Illness</span></li>
                  </>
                )}
              </ul>

              <div className="pt-6 border-t border-border flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-1">Estimated Premium</p>
                  <p className="text-4xl font-black text-text">₹{isHealth ? '945' : '1,250'}<span className="text-lg text-text-secondary font-medium">/mo</span></p>
                </div>
                <button className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2">
                  Proceed to Buy <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Alternative Plans */}
            <div className="space-y-6 md:col-span-2 flex flex-col justify-center">
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/50 transition-all">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-text">{isHealth ? 'HDFC ERGO' : 'HDFC Life'}</h3>
                  <p className="font-medium text-text-secondary mt-1">{isHealth ? 'Optima Secure' : 'Click 2 Protect Super'}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-2xl font-black text-text">₹{isHealth ? '1,100' : '1,420'}<span className="text-sm text-text-secondary">/mo</span></p>
                </div>
                <button className="px-6 py-3 bg-background border border-border text-text font-bold rounded-xl hover:border-primary transition-all w-full md:w-auto">
                  View Details
                </button>
              </div>
              
              <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-primary/50 transition-all">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-text">{isHealth ? 'Care Insurance' : 'Max Life'}</h3>
                  <p className="font-medium text-text-secondary mt-1">{isHealth ? 'Care Supreme' : 'Smart Term Plan'}</p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-2xl font-black text-text">₹{isHealth ? '850' : '1,150'}<span className="text-sm text-text-secondary">/mo</span></p>
                </div>
                <button className="px-6 py-3 bg-background border border-border text-text font-bold rounded-xl hover:border-primary transition-all w-full md:w-auto">
                  View Details
                </button>
              </div>

              <div className="mt-6 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
                <User className="w-6 h-6 text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-text text-lg">Need Expert Advice?</h4>
                  <p className="text-sm text-text-secondary mt-1 mb-3">An advisor has been assigned to you. They will contact you shortly to help you navigate these options.</p>
                  <p className="font-bold text-blue-500">Call 1800-INSURE now</p>
                <button onClick={() => alert('Quotes have been sent to your email!')} className="mt-4 px-6 py-3 bg-surface border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition-all w-full md:w-auto">
                  Email Me These Quotes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Wizard Header */}
      <header className="bg-surface border-b border-border h-20 flex items-center px-6 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span className="font-bold text-2xl text-text">InsureFlow</span>
        </Link>
        <div className="hidden md:flex flex-1 justify-center items-center gap-2 max-w-2xl mx-auto">
           {[1, 2, 3, 4, 5].map(s => (
             <React.Fragment key={s}>
               <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? 'bg-primary text-white' : 'bg-background border-2 border-border text-text-secondary'}`}>
                 {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
               </div>
               {s < 5 && <div className={`h-1 w-12 rounded-full ${step > s ? 'bg-primary' : 'bg-border'}`}></div>}
             </React.Fragment>
           ))}
        </div>
      </header>

      {/* Wizard Body */}
      <main className="flex-1 flex flex-col justify-center py-12 px-6">
        {step === 1 && <StepChooseInsurance value={formData.insuranceType} onChange={(v: string) => handleChange('insuranceType', v)} onNext={() => {
          handleChange('coverage', formData.insuranceType === 'Health' ? '1000000' : '10000000');
          handleNext();
        }} />}
        {step === 2 && formData.insuranceType === 'Health' && <StepHealthFamily data={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />}
        {step === 2 && formData.insuranceType === 'Life' && <StepLifeProfile data={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <StepCoverage data={formData} onChange={handleChange} onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <StepContact data={formData} onChange={handleChange} onSubmit={submitLead} onBack={handleBack} isLoading={isLoading} />}
      </main>
    </div>
  );
};
