import { useState } from 'react';
import { 
  Shield, 
  CalendarClock, 
  Download, 
  HeartPulse, 
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePolicies } from '@/hooks/usePolicies';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { format } from 'date-fns';
  {
    id: 'POL-9928134',
    name: 'Comprehensive Health Plan',
    provider: 'HDFC ERGO',
    status: 'ACTIVE',
    premium: '₹15,000',
    frequency: 'Annually',
    renewalDate: '12 Nov 2026',
    sumInsured: '₹10,00,000',
    type: 'Family Floater',
    members: ['Self', 'Spouse', 'Child'],
    benefits: ['No Room Rent Capping', 'Maternity Cover (₹50k)', 'Free Annual Checkup']
  },
  {
    id: 'POL-882112',
    name: 'Personal Accident Cover',
    provider: 'ICICI Lombard',
    status: 'ACTIVE',
    premium: '₹4,500',
    frequency: 'Annually',
    renewalDate: '01 Jan 2027',
    sumInsured: '₹50,00,000',
    type: 'Individual',
    members: ['Self'],
    benefits: ['Accidental Death Cover', 'Permanent Disability', 'Children Education Bonus']
  },
  {
    id: 'POL-771120',
    name: 'Term Life Insurance',
    provider: 'Max Life',
    status: 'EXPIRED',
    premium: '₹18,200',
    frequency: 'Annually',
    renewalDate: '15 Aug 2026',
    sumInsured: '₹1,00,00,000',
    type: 'Individual',
    members: ['Self'],
    benefits: ['Critical Illness Rider', 'Return of Premium']
  }
];

export const MyPolicies = () => {
  const { data, isLoading, isError, refetch } = usePolicies({ limit: 50 });
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" /> My Policies
          </h1>
          <p className="text-text-secondary mt-1">Manage your active coverages, renewals, and policy documents.</p>
        </div>
        <Link 
          to="/portal/dashboard"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
        >
          <Shield className="w-4 h-4" /> Explore New Plans
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <SkeletonLoader text="Loading your policies..." />
        ) : isError ? (
          <ErrorState title="Failed to load policies" onRetry={refetch} />
        ) : data?.items?.length === 0 ? (
          <EmptyState title="No active policies" description="You do not have any active insurance policies yet." />
        ) : (
          data?.items?.map((policy: any) => (
            <div key={policy.id} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
            
            {/* Header */}
            <div className={`p-6 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
              policy.status === 'ACTIVE' ? 'bg-gradient-to-r from-primary/5 to-transparent' : 'bg-background'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  policy.status === 'ACTIVE' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface border border-border text-text-secondary'
                }`}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-text">{policy.plan?.name || 'Insurance Plan'}</h2>
                    {policy.status === 'ACTIVE' ? (
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full border border-red-500/20 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> EXPIRED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{policy.policyNumber} • {policy.company?.name || 'Provider'} • {policy.plan?.category || 'Individual'}</p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-background border border-border text-text rounded-lg hover:border-primary transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> PDF
                </button>
                {policy.status === 'ACTIVE' ? (
                  <Link to="/portal/claims" className="flex-1 md:flex-none px-4 py-2 bg-background border border-border text-text rounded-lg hover:border-primary transition-colors flex items-center justify-center gap-2">
                    <HeartPulse className="w-4 h-4 text-red-500" /> Claim
                  </Link>
                ) : (
                  <button className="flex-1 md:flex-none px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    Renew Now
                  </button>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-background">
              <div>
                <span className="text-sm text-text-secondary block mb-1">Sum Insured</span>
                <p className="text-lg font-bold text-text">₹{policy.sumInsured || 0}</p>
              </div>
              <div>
                <span className="text-sm text-text-secondary block mb-1">Premium (Annually)</span>
                <p className="text-lg font-bold text-text">₹{policy.premiumAmount || 0}</p>
              </div>
              <div>
                <span className="text-sm text-text-secondary block mb-1">Renewal Date</span>
                <p className={`text-lg font-bold ${policy.status === 'ACTIVE' ? 'text-text' : 'text-red-500'}`}>
                  {policy.expiryDate ? format(new Date(policy.expiryDate), 'dd MMM yyyy') : 'N/A'}
                </p>
              </div>
              <div>
                <span className="text-sm text-text-secondary block mb-1">Members Covered</span>
                <p className="text-sm font-medium text-text mt-1">{policy.members?.join(', ') || 'Self'}</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="px-6 pb-6 bg-background">
              <h4 className="text-sm font-bold text-text mb-3 uppercase tracking-wider text-text-secondary">Key Benefits included</h4>
              <div className="flex flex-wrap gap-2">
                {(policy.benefits || ['Standard Coverage']).map((b: string, idx: number) => (
                  <span key={idx} className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-text flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Expired Alert */}
            {policy.status === 'EXPIRED' && (
              <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">Your policy has expired. Please renew immediately to retain your continuity benefits and No Claim Bonus.</p>
              </div>
            )}
            
            {/* Upcoming Renewal Alert */}
            {policy.status === 'ACTIVE' && (
              <div className="px-6 py-3 bg-orange-500/10 border-t border-orange-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarClock className="w-5 h-5 text-orange-500 shrink-0" />
                  <p className="text-sm text-orange-700 dark:text-orange-400 font-medium">Renewal approaching. Ensure your AutoPay is active or renew manually.</p>
                </div>
                <Link to="/portal/wallet" className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
                  Pay Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

          </div>
        )))}
      </div>
    </div>
  );
};
