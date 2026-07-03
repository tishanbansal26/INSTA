import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  data: any;
  updateData: (data: any) => void;
}

export const Step4Documents = ({ data, updateData }: Props) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-text mb-2">Required Documents</h2>
        <p className="text-text-secondary">Upload KYC and supporting documents for the client.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'aadhaar', label: 'Aadhaar Card (Front & Back)', required: true },
          { id: 'pan', label: 'PAN Card', required: true },
          { id: 'photo', label: 'Passport Size Photo', required: true },
          { id: 'medical', label: 'Medical Reports', required: false },
        ].map((doc) => {
          const isUploaded = data?.uploaded?.includes(doc.id);
          return (
            <div key={doc.id} className={`border rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors ${
              isUploaded ? 'bg-green-500/5 border-green-500/50' : 'bg-surface border-border border-dashed hover:border-primary/50'
            }`}>
              {isUploaded ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-text mb-1">{doc.label}</h3>
                  <p className="text-sm text-green-500 font-medium">Uploaded Successfully</p>
                  <button 
                    onClick={() => updateData({ uploaded: (data?.uploaded || []).filter((id: string) => id !== doc.id) })}
                    className="mt-4 text-xs font-bold text-red-500 hover:underline"
                  >
                    Remove File
                  </button>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-background border border-border text-text-secondary flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-text mb-1">
                    {doc.label} {doc.required && <span className="text-red-500">*</span>}
                  </h3>
                  <p className="text-xs text-text-secondary mb-4">PDF, JPG or PNG (Max 5MB)</p>
                  <button 
                    onClick={() => updateData({ uploaded: [...(data?.uploaded || []), doc.id] })}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
                  >
                    <UploadCloud className="w-4 h-4" /> Browse Files
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
