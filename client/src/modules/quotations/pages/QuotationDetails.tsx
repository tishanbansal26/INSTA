import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  History,
  Building2,
  User,
  IndianRupee,
  ShieldPlus,
  ArrowRight
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export const QuotationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'PENDING' | 'ACCEPTED' | 'REJECTED'>('PENDING');

  const handleConvertToPolicy = () => {
    navigate('/policies/new');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-text">Quotation #QT-29910</h1>
            {status === 'PENDING' && <span className="px-2.5 py-0.5 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full border border-orange-500/20">PENDING</span>}
            {status === 'ACCEPTED' && <span className="px-2.5 py-0.5 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">ACCEPTED</span>}
            {status === 'REJECTED' && <span className="px-2.5 py-0.5 bg-red-500/10 text-red-500 text-xs font-bold rounded-full border border-red-500/20">REJECTED</span>}
          </div>
          <p className="text-text-secondary">Created on 14 Oct 2026 • Valid until 14 Nov 2026</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Download className="w-4 h-4" /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border text-text font-medium rounded-lg hover:border-primary transition-all">
            <Mail className="w-4 h-4" /> Email to Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Quotation Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Alert */}
          {status === 'PENDING' && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-primary mb-1">Awaiting Client Response</h3>
                <p className="text-sm text-text-secondary">This quotation is ready for client review. Once accepted, it can be converted directly into a policy.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button 
                  onClick={() => setStatus('REJECTED')}
                  className="flex items-center gap-2 px-4 py-2 bg-background border border-border text-red-500 font-medium rounded-lg hover:border-red-500 transition-all"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
                <button 
                  onClick={() => setStatus('ACCEPTED')}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 shadow-lg shadow-green-500/20 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Accept Quote
                </button>
              </div>
            </div>
          )}

          {status === 'ACCEPTED' && (
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-green-500 mb-1">Quotation Accepted!</h3>
                <p className="text-sm text-text-secondary">The client has accepted this quotation. Proceed to bind the policy and collect payment.</p>
              </div>
              <button 
                onClick={handleConvertToPolicy}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all shrink-0"
              >
                Convert to Policy <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold text-text mb-6">Quote Preview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4 text-text-secondary">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Client Info</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary inline-block w-24">Name:</span> <span className="font-medium text-text">Sanjay Gupta</span></p>
                  <p><span className="text-text-secondary inline-block w-24">Phone:</span> <span className="font-medium text-text">+91 9123456789</span></p>
                  <p><span className="text-text-secondary inline-block w-24">Family Size:</span> <span className="font-medium text-text">2 Adults, 1 Child</span></p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-text-secondary">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">Plan Info</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-text-secondary inline-block w-24">Insurer:</span> <span className="font-medium text-text">Tata AIA</span></p>
                  <p><span className="text-text-secondary inline-block w-24">Plan:</span> <span className="font-medium text-text">Maha Raksha Supreme</span></p>
                  <p><span className="text-text-secondary inline-block w-24">Sum Insured:</span> <span className="font-medium text-text">₹50,00,000</span></p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-bold text-text mb-4">Included Add-ons</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm flex items-center gap-2">
                  <ShieldPlus className="w-4 h-4 text-primary" /> Waiver of Premium
                </span>
                <span className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm flex items-center gap-2">
                  <ShieldPlus className="w-4 h-4 text-primary" /> Critical Illness Rider
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Pricing */}
          <div className="bg-surface border border-border rounded-xl p-6 shadow-lg shadow-black/5">
            <h3 className="font-bold text-text mb-4 pb-4 border-b border-border flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" /> Pricing Summary
            </h3>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-text-secondary">Base Premium</span>
                <span className="font-medium text-text">₹24,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Riders</span>
                <span className="font-medium text-text">₹3,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">GST (18%)</span>
                <span className="font-medium text-text">₹4,986</span>
              </div>
            </div>
            <div className="p-4 bg-background border border-border rounded-xl text-center">
              <span className="block text-xs font-bold text-text-secondary uppercase mb-1">Total Annual Premium</span>
              <span className="text-3xl font-black text-text text-primary">₹32,686</span>
            </div>
          </div>

          {/* Version History */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-bold text-text mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" /> Version History
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4 relative">
                <div className="absolute left-[15px] top-6 bottom-[-24px] w-0.5 bg-border"></div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 z-10">
                  <span className="text-xs font-bold text-primary">v2</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Added Critical Illness</h4>
                  <p className="text-xs text-text-secondary mt-1">Today, 10:30 AM by Agent</p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 z-10">
                  <span className="text-xs font-bold text-text-secondary">v1</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">Initial Quote Created</h4>
                  <p className="text-xs text-text-secondary mt-1">Yesterday, 4:15 PM by Agent</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
