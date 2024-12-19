import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // After successful signup, try to sign in
        await signIn(email, password);
        navigate(from, { replace: true });
      } else {
        await signIn(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(mode === 'signup' 
        ? 'Failed to create account. Please try again.' 
        : 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
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

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500/20 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading 
                  ? (mode === 'login' ? 'Signing in...' : 'Creating account...') 
                  : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {mode === 'login' 
                    ? "Don't have an account? Create one" 
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}