import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Login() {
  const { setAuth } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuth({ id: '1', email: 'admin@insureflow.pro', firstName: 'Admin', lastName: 'User', role: 'ADMIN' }, 'fake-jwt-token');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass p-8 rounded-xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">InsureFlow Pro</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Email Address</label>
            <Input type="email" placeholder="admin@insureflow.pro" defaultValue="admin@insureflow.pro" className="bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Password</label>
            <Input type="password" placeholder="••••••••" defaultValue="password" className="bg-background" />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
}
