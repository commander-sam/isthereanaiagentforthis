import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export class AuthService {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      // First check if we can connect to Supabase
      const { error: healthCheckError } = await supabase.from('admins').select('count').single();
      if (healthCheckError && !healthCheckError.message.includes('no rows')) {
        throw new Error('Unable to connect to the database');
      }

      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: {
            role: 'admin'
          }
        }
      });

      if (response.error) {
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
        throw this.handleAuthError(response.error);
      }

      return response;
    } catch (error) {
      console.error('Sign in process error:', error);
      throw this.handleAuthError(error as AuthError);
    }
  }

  private static handleAuthError(error: AuthError | Error): Error {
    // Network connectivity check
    if (!navigator.onLine) {
      return new Error('No internet connection. Please check your network.');
    }

    // Supabase connection issues
    if (error.message?.includes('Failed to fetch')) {
      return new Error('Unable to connect to the authentication service. Please try again in a few moments.');
    }

    // Database-specific errors
    if (error.message?.includes('relation "admins" does not exist')) {
      return new Error('System is still initializing. Please try again in a few moments.');
    }

    // Handle specific error cases
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