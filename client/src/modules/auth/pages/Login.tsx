import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '../hooks/useAuthApi';
import { toast } from 'sonner';

export function Login() {
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('admin@insureflow.com');
  const [password, setPassword] = useState('admin123');
  
  const loginMutation = useLoginMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setAuth(data.user, data.token);
          toast.success('Logged in successfully!');
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
      }
    );
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
            <Input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@insureflow.com" 
              className="bg-background" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text">Password</label>
            <Input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="bg-background" 
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
