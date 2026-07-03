import { Search, UserPlus } from 'lucide-react';

interface Props {
  data: any;
  updateData: (data: any) => void;
}

export const Step1Client = ({ data, updateData }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-text mb-2">Select Client</h2>
        <p className="text-text-secondary">Search for an existing client or add a new one to begin the policy application.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search by name, phone, or email..."
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            value={data?.searchQuery || ''}
            onChange={(e) => updateData({ searchQuery: e.target.value })}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-surface border border-border text-text rounded-xl hover:bg-background hover:border-primary transition-all font-medium">
          <UserPlus className="w-5 h-5" />
          New Client
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div 
              key={i}
              onClick={() => updateData({ selectedClientId: i, name: i === 1 ? 'Rahul Sharma' : 'Priya Verma' })}
              className={`p-4 border rounded-xl cursor-pointer transition-all ${
                data?.selectedClientId === i 
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                  : 'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-text">{i === 1 ? 'Rahul Sharma' : 'Priya Verma'}</h3>
                {data?.selectedClientId === i && (
                  <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                )}
              </div>
              <p className="text-sm text-text-secondary mb-1">+91 {i === 1 ? '9876543210' : '9123456789'}</p>
              <p className="text-sm text-text-secondary">{i === 1 ? 'rahul@example.com' : 'priya@example.com'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
