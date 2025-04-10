// domains/auth/services/clientAuthService.ts

import { SignUpData, SignInData } from '../types/auth';
import { useAuthStore } from '../store/authStore';
export class ClientAuthService {
  static async loadSession() {
    useAuthStore.getState().setLoading(true);

    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (data.user) {
        useAuthStore.getState().setUser(data.user);
      } else {
        useAuthStore.getState().setUser(null);
      }
    } catch (err: unknown) {
      console.error('Failed to load user:', err);
      useAuthStore.getState().setUser(null);
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  static async signUp(data: SignUpData) {
    useAuthStore.getState().setLoading(true);
    useAuthStore.getState().setError(null);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Sign up failed');
      }

      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign up';
      useAuthStore.getState().setError(errorMessage);
      throw err;
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  static async signIn(data: SignInData) {
    useAuthStore.getState().setLoading(true);
    useAuthStore.getState().setError(null);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Sign in failed');
      }

      useAuthStore.getState().setUser(result.user);
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
      useAuthStore.getState().setError(errorMessage);
      throw err;
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  static async signOut() {
    useAuthStore.getState().setLoading(true);
    useAuthStore.getState().setError(null);

    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Sign out failed');
      }

      useAuthStore.getState().setUser(null);
      return result;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign out';
      useAuthStore.getState().setError(errorMessage);
      throw err;
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }

  static async resetPassword(email: string) {
    useAuthStore.getState().setLoading(true);
    useAuthStore.getState().setError(null);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Password reset failed');
      }

      return result;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred during password reset';
      useAuthStore.getState().setError(errorMessage);
      throw err;
    } finally {
      useAuthStore.getState().setLoading(false);
    }
  }
}
