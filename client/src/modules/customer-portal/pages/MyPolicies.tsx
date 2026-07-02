import { Shield, FileText, IndianRupee, Download, ExternalLink } from 'lucide-react';

const POLICIES = [
  {
    id: 'POL-99281',
    name: 'Comprehensive Health Plan',
    company: 'Niva Bupa',
    type: 'Health',
    status: 'ACTIVE',
    sumInsured: '₹10,00,000',
    premium: '₹12,400',
    dueDate: '14 Nov 2026',
    nominee: 'Priya Sharma (Spouse)'
  },
  {
    id: 'POL-11234',
    name: 'Term Life Cover',
    company: 'Tata AIA',
    type: 'Life',
    status: 'ACTIVE',
    sumInsured: '₹1,00,00,000',
    premium: '₹15,000',
    dueDate: '12 Oct 2027',
    nominee: 'Priya Sharma (Spouse)'
  }
];

export const MyPolicies = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Policies</h1>
          <p className="text-text-secondary">Manage your active and past insurance policies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POLICIES.map((policy) => (
          <div key={policy.id} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors flex flex-col">
            <div className="p-5 border-b border-border flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text">{policy.name}</h3>
                  <p className="text-sm text-text-secondary">{policy.company} • {policy.id}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">
                {policy.status}
              </span>
            </div>
            
            <div className="p-5 grid grid-cols-2 gap-y-4 gap-x-2">
              <div>
                <p className="text-xs text-text-secondary mb-1">Coverage / Sum Insured</p>
                <p className="font-medium text-text">{policy.sumInsured}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Premium</p>
                <p className="font-medium text-text">{policy.premium} / yr</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Next Due Date</p>
                <p className="font-medium text-text">{policy.dueDate}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Nominee</p>
                <p className="font-medium text-text">{policy.nominee}</p>
              </div>
            </div>
            
            <div className="p-4 bg-background mt-auto flex justify-between gap-3 border-t border-border">
              <button className="flex-1 flex justify-center items-center gap-2 py-2 text-sm font-medium text-text border border-border rounded-lg hover:bg-surface transition-colors">
                <Download className="w-4 h-4" /> Policy PDF
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                <IndianRupee className="w-4 h-4" /> Pay Premium
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
