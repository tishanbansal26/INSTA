import { UserCircle, Save } from 'lucide-react';

export const CustomerProfile = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">My Profile</h1>
          <p className="text-text-secondary">Update your personal details and emergency contacts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 max-w-3xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">Customer User</h2>
            <p className="text-text-secondary">customer@example.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Phone Number</label>
            <input type="text" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" defaultValue="+91 9876543210" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" defaultValue="customer@example.com" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text mb-2">Address</label>
            <textarea className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" rows={3} defaultValue="123 Example Street, City"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
