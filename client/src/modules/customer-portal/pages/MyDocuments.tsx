import { useState } from 'react';
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2,
  FolderOpen
} from 'lucide-react';

const DOC_CATEGORIES = [
  'All Documents',
  'KYC & Identity',
  'Policy Documents',
  'Medical Records',
  'Claim Bills'
];

const DOCUMENTS = [
  { id: 1, name: 'Aadhaar Card', type: 'KYC & Identity', date: '10 Jan 2024', size: '2.4 MB', format: 'PDF' },
  { id: 2, name: 'PAN Card', type: 'KYC & Identity', date: '10 Jan 2024', size: '1.1 MB', format: 'JPG' },
  { id: 3, name: 'Comprehensive Health Plan', type: 'Policy Documents', date: '01 Sep 2026', size: '4.5 MB', format: 'PDF' },
  { id: 4, name: 'Term Life Insurance', type: 'Policy Documents', date: '12 Sep 2025', size: '3.2 MB', format: 'PDF' },
  { id: 5, name: 'Blood Test Report', type: 'Medical Records', date: '05 Oct 2026', size: '1.8 MB', format: 'PDF' },
  { id: 6, name: 'Apollo Discharge Summary', type: 'Claim Bills', date: '05 Oct 2026', size: '5.6 MB', format: 'PDF' },
  { id: 7, name: 'Pharmacy Receipts', type: 'Claim Bills', date: '06 Oct 2026', size: '800 KB', format: 'JPG' },
];

export const MyDocuments = () => {
  const [activeCategory, setActiveCategory] = useState('All Documents');

  const filteredDocs = activeCategory === 'All Documents' 
    ? DOCUMENTS 
    : DOCUMENTS.filter(doc => doc.type === activeCategory);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-primary" /> My Documents
          </h1>
          <p className="text-text-secondary mt-1">Securely store and manage your insurance and medical records.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-3 px-3">Categories</h3>
            <div className="space-y-1">
              {DOC_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-background border border-green-500/20 rounded-xl p-5 text-center">
            <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-bold text-text text-sm">256-bit Encryption</h4>
            <p className="text-xs text-text-secondary mt-1">Your documents are securely encrypted and stored.</p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search documents by name or date..." 
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button className="px-4 py-2 bg-surface border border-border text-text rounded-lg hover:border-primary transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-text-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Document Name</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Date Added</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-background/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          doc.format === 'PDF' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-text">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{doc.type}</td>
                    <td className="px-6 py-4 text-text-secondary">{doc.date}</td>
                    <td className="px-6 py-4 text-text-secondary">{doc.size}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-background border border-border rounded hover:text-primary transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 bg-background border border-border rounded hover:text-primary transition-colors" title="Download"><Download className="w-4 h-4" /></button>
                        {doc.type !== 'Policy Documents' && (
                          <button className="p-2 bg-background border border-border rounded hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredDocs.length === 0 && (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                <h4 className="text-lg font-bold text-text mb-1">No documents found</h4>
                <p className="text-text-secondary">Upload documents to this category to see them here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
