import { Building2, ShieldPlus } from 'lucide-react';

interface Props {
  data: any;
  updateData: (data: any) => void;
}

export const Step2CompanyPlan = ({ data, updateData }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-text mb-2">Company & Plan</h2>
        <p className="text-text-secondary">Select the insurance provider and the specific plan.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-text mb-3">Select Insurance Company</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['HDFC ERGO', 'Niva Bupa', 'Tata AIA', 'ICICI Lombard'].map((company) => (
              <div 
                key={company}
                onClick={() => updateData({ company, plan: null })}
                className={`p-4 border rounded-xl cursor-pointer transition-all flex flex-col items-center text-center ${
                  data?.company === company 
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${data?.company === company ? 'bg-primary/20 text-primary' : 'bg-surface text-text-secondary'}`}>
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm text-text">{company}</span>
              </div>
            ))}
          </div>
        </div>

        {data?.company && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label className="block text-sm font-bold text-text mb-3">Available Plans from {data.company}</label>
            <div className="space-y-3">
              {['Comprehensive Health Cover', 'Base Health Shield', 'Super Top-up Plan'].map((plan) => (
                <div 
                  key={plan}
                  onClick={() => updateData({ plan })}
                  className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center gap-4 ${
                    data?.plan === plan 
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                      : 'border-border bg-surface hover:border-primary/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${data?.plan === plan ? 'bg-primary text-white' : 'bg-background border border-border text-text-secondary'}`}>
                    <ShieldPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text">{plan}</h4>
                    <p className="text-sm text-text-secondary">Cashless hospitals, No room rent capping.</p>
                  </div>
                  {data?.plan === plan && (
                    <div className="ml-auto w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
