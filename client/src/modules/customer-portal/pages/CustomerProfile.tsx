import { useState } from 'react';
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Bell, 
  Save,
  Users,
  Camera,
  Heart
} from 'lucide-react';

export const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text flex items-center gap-2">
            <User className="w-6 h-6 text-primary" /> Profile Settings
          </h1>
          <p className="text-text-secondary mt-1">Manage your personal information and preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Navigation */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'personal' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-border text-text hover:bg-background'
            }`}
          >
            <User className="w-5 h-5" /> Personal Details
          </button>
          <button 
            onClick={() => setActiveTab('address')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'address' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-border text-text hover:bg-background'
            }`}
          >
            <MapPin className="w-5 h-5" /> Address
          </button>
          <button 
            onClick={() => setActiveTab('nominee')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'nominee' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-border text-text hover:bg-background'
            }`}
          >
            <Users className="w-5 h-5" /> Nominee Details
          </button>
          <button 
            onClick={() => setActiveTab('emergency')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'emergency' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-border text-text hover:bg-background'
            }`}
          >
            <Heart className="w-5 h-5" /> Emergency Contact
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'notifications' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-border text-text hover:bg-background'
            }`}
          >
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'security' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface border border-border text-text hover:bg-background'
            }`}
          >
            <ShieldCheck className="w-5 h-5" /> Security
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-surface border border-border rounded-xl p-6 md:p-8">
          
          {activeTab === 'personal' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Personal Details</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold">
                    T
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-text text-lg">Tishan Admin</h3>
                  <p className="text-text-secondary">tishan@example.com</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">First Name</label>
                  <input type="text" defaultValue="Tishan" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Last Name</label>
                  <input type="text" defaultValue="Admin" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Email Address</label>
                  <input type="email" defaultValue="tishan@example.com" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Date of Birth</label>
                  <input type="date" defaultValue="1994-01-12" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Gender</label>
                  <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Permanent Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Street Address</label>
                  <textarea rows={3} defaultValue="123, Rosewood Apartments, Main Street" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">City</label>
                  <input type="text" defaultValue="New Delhi" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">State</label>
                  <input type="text" defaultValue="Delhi" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Pincode</label>
                  <input type="text" defaultValue="110001" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nominee' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Nominee Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Full Name</label>
                  <input type="text" defaultValue="Priya Sharma" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Relationship</label>
                  <input type="text" defaultValue="Spouse" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Date of Birth</label>
                  <input type="date" defaultValue="1997-05-24" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Allocation Percentage (%)</label>
                  <input type="number" defaultValue="100" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text mb-2">Contact Name</label>
                  <input type="text" defaultValue="Rahul Admin" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Relationship</label>
                  <input type="text" defaultValue="Brother" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+91 99887 76655" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { title: 'Email Notifications', desc: 'Receive policy updates and payment receipts via email.' },
                  { title: 'SMS Alerts', desc: 'Get important alerts like premium due dates via SMS.' },
                  { title: 'WhatsApp Messages', desc: 'Receive quick updates and chat support via WhatsApp.' },
                  { title: 'Marketing Offers', desc: 'Receive promotional emails and new plan suggestions.' },
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-start justify-between p-4 border border-border rounded-xl bg-background">
                    <div>
                      <h4 className="font-bold text-text">{notif.title}</h4>
                      <p className="text-sm text-text-secondary mt-1">{notif.desc}</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${idx === 3 ? 'bg-border' : 'bg-primary'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-all ${idx === 3 ? 'left-0.5' : 'right-0.5'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-text mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-text mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="password" placeholder="Current Password" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                    <input type="password" placeholder="New Password" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                    <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-text focus:outline-none focus:border-primary" />
                    <button className="px-6 py-2 bg-background border border-border text-text font-bold rounded-lg hover:border-primary transition-colors w-max">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-border">
                  <h3 className="font-bold text-text mb-4">Two-Factor Authentication (2FA)</h3>
                  <div className="flex items-start justify-between p-4 border border-border rounded-xl bg-background">
                    <div>
                      <h4 className="font-bold text-text">Enable 2FA via SMS</h4>
                      <p className="text-sm text-text-secondary mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <div className="w-10 h-5 rounded-full bg-primary relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
