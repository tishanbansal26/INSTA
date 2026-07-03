import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Shield, 
  FileText, 
  HeartPulse, 
  User,
  Activity,
  Edit,
  Trash2
} from 'lucide-react';

const FAMILY_MEMBERS = [
  { id: 1, name: 'Tishan Admin', age: 32, relation: 'Self', sumInsured: '10,00,000', activeClaims: 0, nominee: 'Priya Sharma' },
  { id: 2, name: 'Priya Sharma', age: 29, relation: 'Spouse', sumInsured: '10,00,000', activeClaims: 1, nominee: 'Tishan Admin' },
  { id: 3, name: 'Aarav Sharma', age: 6, relation: 'Son', sumInsured: '10,00,000', activeClaims: 0, nominee: 'Tishan Admin' },
  { id: 4, name: 'Kavita Sharma', age: 62, relation: 'Mother', sumInsured: '5,00,000', activeClaims: 0, nominee: 'Tishan Admin' }
];

export const MyFamily = () => {
  const [activeMember, setActiveMember] = useState(FAMILY_MEMBERS[0]);
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> Family Members
          </h1>
          <p className="text-text-secondary mt-1">Manage insured members and their coverage details.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        
        {/* Left Sidebar - Member List */}
        <div className="lg:col-span-1 bg-surface border border-border rounded-xl p-4 flex flex-col gap-2 overflow-y-auto">
          {FAMILY_MEMBERS.map((member) => (
            <button
              key={member.id}
              onClick={() => setActiveMember(member)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all text-left ${
                activeMember.id === member.id 
                  ? 'bg-primary/10 border border-primary/20 shadow-sm' 
                  : 'bg-background border border-transparent hover:border-border'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                activeMember.id === member.id ? 'bg-primary text-white' : 'bg-surface border border-border text-text'
              }`}>
                {member.name.charAt(0)}
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className={`font-bold truncate ${activeMember.id === member.id ? 'text-primary' : 'text-text'}`}>
                  {member.name}
                </h4>
                <p className="text-xs text-text-secondary">{member.relation} • {member.age} yrs</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Area - Member Details */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-xl flex flex-col overflow-hidden">
          
          <div className="p-6 border-b border-border bg-gradient-to-r from-background to-surface">
            <div className="flex justify-between items-start">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                  {activeMember.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text">{activeMember.name}</h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {activeMember.relation}</span>
                    <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {activeMember.age} Years Old</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-text-secondary hover:text-primary transition-colors bg-background rounded-lg border border-border">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-text-secondary hover:text-red-500 transition-colors bg-background rounded-lg border border-border">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex border-b border-border bg-background/50">
            {['Details', 'Policies', 'Claims', 'Documents'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
                  activeTab === tab.toLowerCase() ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 flex-1 overflow-y-auto bg-background">
            
            {activeTab === 'details' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-lg font-bold text-text mb-4">Coverage Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-surface border border-border rounded-xl">
                      <span className="text-sm text-text-secondary mb-1 block">Total Sum Insured</span>
                      <h4 className="text-xl font-bold text-text flex items-center gap-2">
                        ₹{activeMember.sumInsured}
                      </h4>
                    </div>
                    <div className="p-4 bg-surface border border-border rounded-xl">
                      <span className="text-sm text-text-secondary mb-1 block">Active Claims</span>
                      <h4 className="text-xl font-bold text-text flex items-center gap-2">
                        {activeMember.activeClaims} Claims Ongoing
                      </h4>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-text mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 p-6 bg-surface border border-border rounded-xl">
                    <div>
                      <span className="text-sm text-text-secondary">Full Name</span>
                      <p className="font-medium text-text mt-1">{activeMember.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-text-secondary">Date of Birth</span>
                      <p className="font-medium text-text mt-1">12 Jan {new Date().getFullYear() - activeMember.age}</p>
                    </div>
                    <div>
                      <span className="text-sm text-text-secondary">Relationship</span>
                      <p className="font-medium text-text mt-1">{activeMember.relation}</p>
                    </div>
                    <div>
                      <span className="text-sm text-text-secondary">Nominee Name</span>
                      <p className="font-medium text-text mt-1">{activeMember.nominee}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-red-500" /> Medical History
                  </h3>
                  <div className="p-6 bg-surface border border-border rounded-xl text-center">
                    <p className="text-text-secondary">No pre-existing medical conditions declared.</p>
                    <button className="mt-3 text-primary text-sm font-bold hover:underline">Update Medical History</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 bg-surface border border-border rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text">Comprehensive Health Plan</h4>
                      <p className="text-sm text-text-secondary">POL-9928134 • Family Floater</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">ACTIVE</span>
                </div>
              </div>
            )}

            {activeTab === 'claims' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {activeMember.activeClaims > 0 ? (
                  <div className="p-4 bg-surface border border-border rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text">Hospitalization Claim</h4>
                        <p className="text-sm text-text-secondary">CLM-22019 • Filed 2 weeks ago</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-bold rounded-full border border-orange-500/20">UNDER REVIEW</span>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-text-secondary mx-auto mb-3 opacity-50" />
                    <p className="text-text-secondary">No claims filed for this member.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface border border-border rounded-xl flex items-center gap-4 hover:border-primary/50 cursor-pointer transition-colors group">
                    <FileText className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-bold text-text text-sm">Aadhaar Card</h4>
                      <p className="text-xs text-text-secondary">Uploaded 2 years ago</p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface border border-border rounded-xl flex items-center gap-4 hover:border-primary/50 cursor-pointer transition-colors group">
                    <FileText className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-bold text-text text-sm">Blood Test Report</h4>
                      <p className="text-xs text-text-secondary">Uploaded 6 months ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
