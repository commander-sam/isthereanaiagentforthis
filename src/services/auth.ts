import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export class AuthService {
  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (response.error) {
        throw this.handleAuthError(response.error);
      }

      return response;
    } catch (error) {
      console.error('Sign in process error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  private static handleAuthError(error: AuthError | Error): Error {
    if (!navigator.onLine) {
      return new Error('No internet connection. Please check your network.');
    }

    if (error instanceof AuthError) {
      switch (error.status) {
        case 400:
          return new Error('Invalid email or password format');
        case 401:
          return new Error('Invalid credentials');
        case 422:
          return new Error('Email or password is invalid');
        case 429:
          return new Error('Too many attempts. Please try again later');
        default:
          return new Error(error.message || 'An unexpected error occurred');
      }
    }

    return error;
  }
}