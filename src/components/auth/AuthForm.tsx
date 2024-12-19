import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onModeChange: () => void;
}

export default function AuthForm({
  mode,
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onModeChange,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500/20 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
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
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={6}
        />
        <p className="mt-1 text-sm text-gray-400">
          Password must be at least 6 characters long
        </p>
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
          onClick={onModeChange}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {mode === 'login' 
            ? "Don't have an account? Create one" 
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </form>
  );
}