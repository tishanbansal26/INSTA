import { ShieldCheck, User, Building2, Calculator, Landmark } from 'lucide-react';
import { WizardData } from '../pages/NewPolicyWizard';

interface Props {
  data: WizardData;
}

export const Step6Review = ({ data }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Review & Issue Policy</h2>
        <p className="text-text-secondary">Please review all details carefully before issuing the final policy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Client Summary */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-text">Client Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Name</span>
              <span className="font-medium text-text">{data.client?.name || 'Not Selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">KYC Status</span>
              <span className="font-bold text-green-500">Verified</span>
            </div>
          </div>
        </div>

        {/* Plan Summary */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
            <Building2 className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-text">Plan Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Company</span>
              <span className="font-medium text-text">{data.companyPlan?.company || 'Not Selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Plan</span>
              <span className="font-medium text-text">{data.companyPlan?.plan || 'Not Selected'}</span>
            </div>
          </div>
        </div>

        {/* Premium Summary */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
            <Calculator className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-text">Premium Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Sum Insured</span>
              <span className="font-medium text-text">₹{data.premium?.sumInsured || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Tenure</span>
              <span className="font-medium text-text">{data.premium?.tenure || '0'} Years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Paid</span>
              <span className="font-bold text-text">₹{Math.round((15000 + ((data.premium?.riders?.length || 0) * 1000)) * 1.18)}</span>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
            <Landmark className="w-5 h-5 text-green-500" />
            <h3 className="font-bold text-text">Payment Status</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Mode</span>
              <span className="font-medium text-text capitalize">{data.payment?.mode || 'Not Selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Reference</span>
              <span className="font-medium text-text">{data.payment?.reference || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Status</span>
              <span className="font-bold text-green-500 text-xs px-2 py-0.5 bg-green-500/10 rounded-full">REALIZED</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
