import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export class AuthService {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (response.error) {
        console.error('Signup error:', response.error);
        throw this.handleAuthError(response.error);
      }

      return response;
    } catch (error) {
      console.error('Signup process error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (response.error) {
        console.error('Sign in error:', response.error);
        throw this.handleAuthError(response.error);
      }

      return response;
    } catch (error) {
      console.error('Sign in process error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  private static handleAuthError(error: AuthError): Error {
    // Network related errors
    if (error.message?.includes('fetch')) {
      return new Error(
        'Unable to connect to authentication service. Please check your internet connection.'
      );
    }

    // Handle specific Supabase error codes
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
}