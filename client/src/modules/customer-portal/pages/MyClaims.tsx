import { useState } from 'react';
import { 
  FileText, Plus, CheckCircle2, Clock, Upload,
  ArrowRight, Shield, Activity, AlertCircle, Loader2
} from 'lucide-react';
import { useClaims, useClaimMutation } from '@/hooks/useClaims';
import { usePolicies } from '@/hooks/usePolicies';
import { SkeletonLoader } from '@/components/shared/SkeletonLoader';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { format } from 'date-fns';

export const MyClaims = () => {
  const [isRaisingClaim, setIsRaisingClaim] = useState(false);
  const [step, setStep] = useState(1); 
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  
  const { data: claimsData, isLoading, isError, refetch } = useClaims({ limit: 10 });
  const { data: policiesData } = usePolicies({ status: 'ACTIVE' } as any);
  const { createClaim, isCreating } = useClaimMutation();

  const activeClaim = claimsData?.items?.find((c: any) => !['SETTLED', 'REJECTED'].includes(c.status));
  const pastClaims = claimsData?.items?.filter((c: any) => ['SETTLED', 'REJECTED'].includes(c.status)) || [];

  if (isRaisingClaim) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-text mb-1">Raise a Claim</h1>
            <p className="text-text-secondary">Follow the wizard to submit your reimbursement or cashless claim.</p>
          </div>
          <button 
            onClick={() => setIsRaisingClaim(false)}
            className="px-4 py-2 bg-background border border-border text-text rounded-lg hover:border-primary transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between bg-surface border border-border rounded-xl p-6">
          {[
            { num: 1, label: 'Select Policy' },
            { num: 2, label: 'Hospital Details' },
            { num: 3, label: 'Upload Bills' },
            { num: 4, label: 'Review & Submit' }
          ].map((s, idx) => (
            <div key={s.num} className="flex flex-col items-center gap-2 relative z-10 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= s.num ? 'bg-primary text-white' : 'bg-background border-2 border-border text-text-secondary'
              }`}>
                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-xs font-bold ${step >= s.num ? 'text-primary' : 'text-text-secondary'}`}>
                {s.label}
              </span>
              {idx !== 3 && (
                <div className={`absolute top-5 left-[50%] right-[-50%] h-[2px] -z-10 ${
                  step > s.num ? 'bg-primary' : 'bg-border'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Wizard Content */}
        <div className="bg-surface border border-border rounded-xl p-8 min-h-[400px]">
          {step === 1 && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Which policy are you claiming against?</h2>
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer">
                  <input type="radio" name="policy" className="mt-1" defaultChecked />
                  <div>
                    <h4 className="font-bold text-text flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> Comprehensive Health Plan
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">POL-9928134 • Self, Spouse, Child</p>
                  </div>
                </label>
                <label className="flex items-start gap-4 p-4 border border-border bg-background rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                  <input type="radio" name="policy" className="mt-1" />
                  <div>
                    <h4 className="font-bold text-text flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> Personal Accident Cover
                    </h4>
                    <p className="text-sm text-text-secondary mt-1">POL-882112 • Self</p>
                  </div>
                </label>
              </div>
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Hospital & Admission Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Hospital Name</label>
                  <input type="text" placeholder="e.g. Apollo Hospital" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Date of Admission</label>
                  <input type="date" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Date of Discharge</label>
                  <input type="date" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:border-primary focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Reason for Hospitalization</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:border-primary focus:outline-none resize-none"></textarea>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Upload Medical Bills & Reports</h2>
              <div className="space-y-4">
                <div className="p-6 border-2 border-dashed border-border rounded-xl bg-background flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-primary mb-3" />
                  <p className="font-bold text-text">Click to upload or drag and drop</p>
                  <p className="text-sm text-text-secondary mt-1">PDF, JPG, PNG up to 10MB each</p>
                  <p className="text-xs text-text-secondary mt-4 font-medium max-w-sm">Please ensure you upload: Discharge Summary, Final Bill with Breakup, Pharmacy Bills, and Lab Reports.</p>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-colors">Back</button>
                <button onClick={() => setStep(4)} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Review & Submit</h2>
              <div className="space-y-6">
                <div className="p-4 bg-background border border-border rounded-xl">
                  <h4 className="font-bold text-text text-sm mb-3 text-text-secondary uppercase tracking-wider">Policy Details</h4>
                  <p className="font-bold text-text">Comprehensive Health Plan (POL-9928134)</p>
                </div>
                <div className="p-4 bg-background border border-border rounded-xl">
                  <h4 className="font-bold text-text text-sm mb-3 text-text-secondary uppercase tracking-wider">Hospital Details</h4>
                  <p className="text-text"><span className="font-bold">Hospital:</span> Apollo Hospital</p>
                  <p className="text-text"><span className="font-bold">Dates:</span> 01 Oct 2026 - 05 Oct 2026</p>
                </div>
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">By submitting, you declare that all information provided is true and correct to the best of your knowledge.</p>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-colors">Back</button>
                <button 
                  disabled={isCreating}
                  onClick={async () => {
                  try {
                    await createClaim({
                      policyId: selectedPolicyId || policiesData?.items?.[0]?.id,
                      claimType: 'HOSPITALIZATION',
                      claimAmount: 50000,
                      raisedDate: new Date().toISOString()
                    });
                    setIsRaisingClaim(false);
                  } catch (e) {
                    // error handled in hook
                  }
                }} className="px-6 py-2.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg shadow-green-500/20">
                  {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  {isCreating ? 'Submitting...' : 'Submit Claim'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1 flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" /> My Claims
          </h1>
          <p className="text-text-secondary">Track your insurance claims and raise new ones.</p>
        </div>
        <button 
          onClick={() => setIsRaisingClaim(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
        >
          <Plus className="w-5 h-5" /> Raise Claim
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Claim Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full border border-blue-500/20 mb-3 inline-block">UNDER REVIEW</span>
                <h2 className="text-xl font-bold text-text">Hospitalization Claim: CLM-88902</h2>
                <p className="text-sm text-text-secondary mt-1">Comprehensive Health Plan (POL-9928134)</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-secondary">Claim Amount</p>
                <p className="text-2xl font-black text-text">₹45,000</p>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative pt-8 pb-4 overflow-x-auto">
              <div className="absolute top-12 left-6 right-6 h-[2px] bg-border z-0 min-w-[600px]"></div>
              <div className="absolute top-12 left-6 w-[50%] h-[2px] bg-primary z-0 min-w-[300px]"></div>
              
              <div className="flex justify-between relative z-10 min-w-[600px]">
                {/* Submitted */}
                <div className="flex flex-col items-center gap-3 w-24">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-text">Submitted</p>
                    <p className="text-[10px] text-text-secondary mt-1">10 Oct</p>
                  </div>
                </div>

                {/* Verified */}
                <div className="flex flex-col items-center gap-3 w-24">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-text">Docs Verified</p>
                    <p className="text-[10px] text-text-secondary mt-1">11 Oct</p>
                  </div>
                </div>

                {/* Survey */}
                <div className="flex flex-col items-center gap-3 w-24">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-text">Survey Done</p>
                    <p className="text-[10px] text-text-secondary mt-1">13 Oct</p>
                  </div>
                </div>

                {/* Under Review */}
                <div className="flex flex-col items-center gap-3 w-24">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center font-bold animate-pulse">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-primary">Under Review</p>
                    <p className="text-[10px] text-primary mt-1">In Progress</p>
                  </div>
                </div>

                {/* Approved */}
                <div className="flex flex-col items-center gap-3 w-24">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-border text-text-secondary flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-text-secondary">Approved</p>
                  </div>
                </div>

                {/* Settlement */}
                <div className="flex flex-col items-center gap-3 w-24">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-border text-text-secondary flex items-center justify-center font-bold">
                    6
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-text-secondary">Settled</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-text font-medium">Additional Information Required</p>
                <p className="text-xs text-text-secondary mt-1">The surveyor has requested an updated copy of the discharge summary. Please upload it to proceed.</p>
                <button className="mt-3 text-sm font-bold text-primary hover:underline">Upload Document</button>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border bg-background/50 flex justify-between items-center">
              <h3 className="font-bold text-text">Past Claims</h3>
            </div>
            
            {isLoading ? (
              <div className="p-6"><SkeletonLoader text="Loading claims..." /></div>
            ) : isError ? (
              <div className="p-6"><ErrorState title="Failed to load claims" onRetry={refetch} /></div>
            ) : pastClaims.length === 0 ? (
              <div className="p-6"><EmptyState title="No Past Claims" description="You have no settled or rejected claims." /></div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-text-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Claim ID</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pastClaims.map((claim: any) => (
                    <tr key={claim.id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-bold text-text block">{claim.claimNumber}</span>
                        <span className="text-xs text-text-secondary">{claim.policy?.policyNumber || claim.policyId}</span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary">{format(new Date(claim.createdAt), 'dd MMM yyyy')}</td>
                      <td className="px-6 py-4 font-bold text-text">₹{claim.settledAmount || claim.claimAmount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full border flex items-center gap-1 w-max ${
                          claim.status === 'SETTLED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" /> {claim.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Sidebar - Support & FAQ */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-bold text-text mb-4">Need Help with your Claim?</h3>
            <p className="text-sm text-text-secondary mb-6">Our claims assistance team is available 24x7 to help you with the process.</p>
            <button className="w-full py-2.5 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-colors flex items-center justify-center gap-2 mb-3">
              View Claim FAQs
            </button>
            <button className="w-full py-2.5 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
