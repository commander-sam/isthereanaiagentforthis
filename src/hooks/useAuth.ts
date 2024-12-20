import { useState } from 'react';
import { AuthService } from '../services/auth';

export function useAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (
    mode: 'login' | 'signup',
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        const { data } = await AuthService.signUp(email, password);
        return data;
      } else {
        const { data } = await AuthService.signIn(email, password);
        return data;
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleAuth
  };
}