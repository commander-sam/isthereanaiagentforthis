import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export class AuthService {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting signup with Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            role: 'admin' // Add role for first user
          }
        }
      });

      if (response.error) {
        console.error('Signup error:', response.error);
        throw this.handleAuthError(response.error);
      }

      return response;
    } catch (error) {
      console.error('Signup process error:', error);
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Connection to authentication service failed. Please check if the Supabase project is accessible.');
      }
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
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Connection to authentication service failed. Please check if the Supabase project is accessible.');
      }
      throw this.handleAuthError(error as AuthError);
    }
  }

  private static handleAuthError(error: AuthError): Error {
    if (!navigator.onLine) {
      return new Error('No internet connection. Please check your network.');
    }

    // Network related errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return new Error(
        'Unable to reach the authentication service. Please try again in a few moments.'
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
        return new Error(
          error.message || 'An unexpected error occurred. Please try again.'
        );
    }
  }
}