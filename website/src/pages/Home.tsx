import React from 'react';
import { 
  ShieldCheck, 
  HeartPulse, 
  Car, 
  Plane, 
  Briefcase, 
  Baby, 
  Clock, 
  TrendingUp,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border h-20 flex items-center px-6 lg:px-12">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-text">InsureFlow</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <Link to="/health-insurance" className="font-medium text-text hover:text-primary transition-colors">Health</Link>
            <Link to="/life-insurance" className="font-medium text-text hover:text-primary transition-colors">Life</Link>
            <Link to="/term-insurance" className="font-medium text-text hover:text-primary transition-colors">Term</Link>
            <Link to="/car-insurance" className="font-medium text-text hover:text-primary transition-colors">Motor</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:block font-medium text-text hover:text-primary transition-colors">
              Talk to Advisor
            </button>
            <a 
              href={import.meta.env.VITE_ERP_URL || 'https://insureflow-erp.vercel.app/login'} 
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
            >
              Customer Portal
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 lg:px-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
              India's Most Trusted Digital Insurance Platform
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-text leading-tight mb-6">
              Protect Your Family with the <span className="text-primary">Right Insurance</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-lg">
              Compare plans from India's leading insurance companies in minutes. Transparent pricing, zero hidden fees, and dedicated claim support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/calculate" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-xl shadow-primary/30 flex items-center gap-2">
                Calculate Premium <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-surface border border-border text-text font-bold rounded-xl hover:border-primary transition-colors flex items-center gap-2">
                Talk to Advisor
              </button>
            </div>
            
            <div className="mt-10 flex items-center gap-6 text-sm font-medium text-text-secondary">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Free Expert Advice</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 100% Secure</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 24x7 Claim Support</span>
            </div>
          </div>
          
          <div className="relative lg:h-[600px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-1000">
            {/* Massive Lead Magnet Card in Hero */}
            <div className="w-full max-w-md bg-surface border border-border rounded-2xl shadow-2xl p-8 relative z-10">
              <h3 className="text-2xl font-bold text-text mb-2">Get Your Exact Quote</h3>
              <p className="text-sm text-text-secondary mb-6">Enter details to see top 3 plans instantly.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Insurance Type</label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary">
                    <option>Health Insurance</option>
                    <option>Term Life Insurance</option>
                    <option>Car Insurance</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Age</label>
                    <input type="number" placeholder="25" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Gender</label>
                    <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">City</label>
                  <input type="text" placeholder="e.g. Mumbai" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary" />
                </div>
                <Link to="/calculate" className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 mt-2 hover:bg-primary-hover transition-colors block text-center">
                  View Instant Quotes
                </Link>
                <p className="text-[10px] text-text-secondary text-center mt-2">By continuing, you agree to our terms and privacy policy.</p>
              </div>
            </div>
            
            {/* Decorative elements around the form */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-12 border-y border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-center text-sm font-bold text-text-secondary uppercase tracking-widest mb-8">Trusted by India's Top Insurers</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            {/* Placeholders for logos */}
            <div className="text-xl font-black text-text">HDFC ERGO</div>
            <div className="text-xl font-black text-text">ICICI Lombard</div>
            <div className="text-xl font-black text-text">Max Life</div>
            <div className="text-xl font-black text-text">Star Health</div>
            <div className="text-xl font-black text-text">TATA AIG</div>
          </div>
        </div>
      </section>

      {/* Insurance Categories */}
      <section className="py-24 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text mb-4">What do you want to protect today?</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Select a category to compare the best plans, check premiums, and secure your future in just 3 clicks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HeartPulse, title: 'Health Insurance', desc: 'Cashless claims at 10,000+ hospitals.', color: 'text-red-500', bg: 'bg-red-500/10', link: '/health-insurance' },
              { icon: ShieldCheck, title: 'Life Insurance', desc: 'Secure your family\'s financial future.', color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/life-insurance' },
              { icon: TrendingUp, title: 'Term Insurance', desc: 'High coverage at very low premiums.', color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/term-insurance' },
              { icon: Car, title: 'Motor Insurance', desc: 'Instant policy without inspection.', color: 'text-orange-500', bg: 'bg-orange-500/10', link: '/car-insurance' },
              { icon: Plane, title: 'Travel Insurance', desc: 'Medical and baggage cover globally.', color: 'text-teal-500', bg: 'bg-teal-500/10', link: '/travel-insurance' },
              { icon: Briefcase, title: 'Investment Plans', desc: 'Grow your wealth with tax benefits.', color: 'text-green-500', bg: 'bg-green-500/10', link: '/investment-plans' },
              { icon: Baby, title: 'Child Plans', desc: 'Fund your child\'s higher education.', color: 'text-pink-500', bg: 'bg-pink-500/10', link: '/child-plans' },
              { icon: Clock, title: 'Senior Citizen', desc: 'Specialized health cover for 60+.', color: 'text-amber-500', bg: 'bg-amber-500/10', link: '/senior-citizen-insurance' },
            ].map((cat, idx) => (
              <Link key={idx} to={cat.link} className="bg-surface border border-border p-6 rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${cat.bg} ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="text-sm text-text-secondary">{cat.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                  Compare Plans <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp CTA */}
      <a 
        href="https://wa.me/9603610000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 pr-6"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="font-bold hidden md:block">Chat with Advisor</span>
      </a>

    </div>
  );
};
