import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Star, ChevronRight, FileText, HelpCircle, ArrowRight } from 'lucide-react';

const SEO_CONTENT: Record<string, any> = {
  'health-insurance': {
    title: 'Top 10 Health Insurance Plans in India (2026)',
    heroDesc: 'Compare top health insurance plans, get cashless treatments at 10,000+ hospitals, and secure your family\'s medical future starting at just ₹300/month.',
    benefits: ['Cashless Hospitalization', 'Pre & Post Hospitalization Cover', 'Annual Health Checkups', 'Tax Benefits under 80D'],
    faqs: [
      { q: 'What is a waiting period?', a: 'The time you must wait before specific diseases are covered. Usually 2-4 years for pre-existing conditions.' },
      { q: 'Are maternity expenses covered?', a: 'Yes, comprehensive plans cover maternity after a waiting period of 9 to 24 months.' }
    ]
  },
  'term-insurance': {
    title: 'Best Term Life Insurance Plans',
    heroDesc: 'Secure a ₹1 Crore cover for your family at just ₹490/month. Compare the best term insurance plans from India\'s top insurers.',
    benefits: ['High Cover at Low Premium', 'Financial Security for Dependents', 'Critical Illness Riders', 'Tax Benefits under 80C'],
    faqs: [
      { q: 'What happens if I survive the term?', a: 'Standard term plans do not pay out on survival, but Return of Premium (ROP) plans return your entire premium amount.' },
      { q: 'Can I add riders?', a: 'Yes, you can add accidental death, critical illness, and waiver of premium riders.' }
    ]
  }
};

export const SEOLanding = () => {
  const { type } = useParams();
  const content = SEO_CONTENT[type || 'health-insurance'] || SEO_CONTENT['health-insurance'];

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border h-20 flex items-center px-6 lg:px-12">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-text">InsureFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href="tel:18001234567" className="font-bold text-text hover:text-primary transition-colors flex items-center gap-2">
              📞 1800-123-4567
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-surface border-b border-border pt-16 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-text-secondary mb-4 uppercase tracking-widest">
              <Link to="/" className="hover:text-primary">Home</Link> <ChevronRight className="w-4 h-4" /> {type?.replace('-', ' ')}
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-text leading-tight mb-6">{content.title}</h1>
            <p className="text-lg text-text-secondary mb-8">{content.heroDesc}</p>
            <div className="flex gap-4">
              <Link to="/calculate" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-xl shadow-primary/30 flex items-center gap-2">
                Calculate Premium <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="bg-background border border-border p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2"><Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Key Benefits</h3>
            <ul className="space-y-4">
              {content.benefits.map((b: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <span className="font-medium text-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SEO Content: Claim Process & FAQs */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          
          <h2 className="text-3xl font-bold text-text mb-6">How to File a Claim?</h2>
          <div className="space-y-6 mb-16">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <h4 className="font-bold text-lg text-text">Intimation</h4>
                <p className="text-text-secondary">Inform us at least 48 hours before planned hospitalization or within 24 hours of an emergency.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <h4 className="font-bold text-lg text-text">Document Submission</h4>
                <p className="text-text-secondary">Submit your pre-authorization form along with KYC and medical records at the TPA desk.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <h4 className="font-bold text-lg text-text">Approval</h4>
                <p className="text-text-secondary">The insurance company approves the claim, and you receive cashless treatment.</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-text mb-6 flex items-center gap-2"><HelpCircle className="w-8 h-8 text-primary" /> Frequently Asked Questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq: any, idx: number) => (
              <div key={idx} className="bg-surface border border-border p-6 rounded-xl">
                <h4 className="font-bold text-text mb-2 text-lg">{faq.q}</h4>
                <p className="text-text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
