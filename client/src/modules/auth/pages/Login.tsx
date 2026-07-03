import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '../hooks/useAuthApi';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('admin@insureflow.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const loginMutation = useLoginMutation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setErrorMessage('');
          setAuth(data.user, data.token);
          toast.success('Logged in successfully!');
        },
        onError: (error: any) => {
          console.error("Login failed:", error);
          setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
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
        
        {errorMessage && (
          <div className="mb-6 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
            {errorMessage}
          </div>
        )}

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
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="bg-background pr-10" 
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-text"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
