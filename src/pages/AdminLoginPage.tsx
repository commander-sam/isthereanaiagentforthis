import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import { useAuthForm } from '../hooks/useAuth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { signIn } = useAuth();
  const { isLoading, error, handleAuth } = useAuthForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const data = await handleAuth(mode, email, password);
    if (data?.user) {
      if (mode === 'signup') {
        await signIn(email, password);
      }
      navigate(from, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-white/10">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              {mode === 'login' ? 'Admin Login' : 'Create Admin Account'}
            </h2>

            <AuthForm
              mode={mode}
              email={email}
              password={password}
              error={error}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleSubmit}
              onModeChange={() => setMode(mode === 'login' ? 'signup' : 'login')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}