import { useState } from 'react';
import { User, Lock, Palette, Bell, Building2, Users, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'agency', label: 'Agency Info', icon: Building2 },
  { id: 'users', label: 'User Management', icon: Users, adminOnly: true },
  { id: 'roles', label: 'Roles & Permissions', icon: ShieldCheck, adminOnly: true },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuthStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Profile Settings</h2>
            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className="w-full p-2 rounded-md border border-border bg-background" defaultValue={user?.name || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" className="w-full p-2 rounded-md border border-border bg-background" defaultValue={user?.email || ''} readOnly />
              </div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Save Changes</button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Security</h2>
            <div className="space-y-4 max-w-xl">
              <p className="text-sm text-muted-foreground">Manage your password and security preferences here to avoid browser warnings.</p>
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-2 rounded-md border border-border bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-2 rounded-md border border-border bg-background" />
              </div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Update Password</button>
            </div>
          </div>
        );
      case 'theme':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Appearance</h2>
            <p className="text-sm text-muted-foreground">Customize how InsureFlow looks on your device.</p>
            <div className="flex gap-4">
              <div className="border border-border p-4 rounded-lg cursor-pointer hover:border-primary">
                <div className="w-20 h-16 bg-white rounded shadow-sm mb-2"></div>
                <p className="text-center text-sm font-medium">Light</p>
              </div>
              <div className="border-2 border-primary p-4 rounded-lg cursor-pointer">
                <div className="w-20 h-16 bg-slate-900 rounded shadow-sm mb-2"></div>
                <p className="text-center text-sm font-medium">Dark</p>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Notification Preferences</h2>
            <div className="space-y-4 max-w-xl">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                <span>Email me when a policy is about to expire</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                <span>Notify me about new claims</span>
              </label>
            </div>
          </div>
        );
      case 'agency':
      case 'users':
      case 'roles':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-sm text-muted-foreground">This administrative module is under construction.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {TABS.filter(t => !t.adminOnly || user?.role === 'ADMIN').map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 bg-surface border border-border rounded-xl p-6 shadow-sm min-h-[500px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
