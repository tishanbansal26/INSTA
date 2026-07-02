import { FileText, Upload } from 'lucide-react';

export const MyDocuments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Documents</h1>
          <p className="text-text-secondary">Manage your KYC and policy documents.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20">
          <Upload className="w-5 h-5" />
          Upload
        </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-8 text-center">
        <FileText className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-bold text-text mb-2">No documents yet</h3>
        <p className="text-text-secondary">Upload your Aadhaar or PAN card to get started.</p>
      </div>
    </div>
  );
};
