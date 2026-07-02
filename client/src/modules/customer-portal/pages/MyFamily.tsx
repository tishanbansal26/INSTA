import { Users, UserPlus, Shield, Edit2, Trash2 } from 'lucide-react';

const FAMILY_MEMBERS = [
  { id: '1', name: 'Rahul Sharma', relationship: 'Self', dob: '15 May 1985', policies: ['POL-99281', 'POL-11234'] },
  { id: '2', name: 'Priya Sharma', relationship: 'Spouse', dob: '22 Aug 1988', policies: ['POL-99281'] },
  { id: '3', name: 'Aarav Sharma', relationship: 'Child', dob: '10 Jan 2015', policies: ['POL-99281'] },
];

export const MyFamily = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Family</h1>
          <p className="text-text-secondary">Manage family members and their insurance coverage.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20">
          <UserPlus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FAMILY_MEMBERS.map((member) => (
          <div key={member.id} className="bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text">{member.name}</h3>
                  <span className="px-2 py-0.5 bg-background rounded text-xs text-text-secondary font-medium border border-border">
                    {member.relationship}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-text-secondary hover:text-primary transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                {member.relationship !== 'Self' && (
                  <button className="p-1.5 text-text-secondary hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-text-secondary">Date of Birth</span>
                <span className="text-sm font-medium text-text">{member.dob}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-text-secondary uppercase mb-3">Covered Under Policies</p>
              <div className="space-y-2">
                {member.policies.map((pol) => (
                  <div key={pol} className="flex items-center gap-2 text-sm text-text bg-background p-2 rounded-lg border border-border">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>{pol}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
