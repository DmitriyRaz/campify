// domains/auth/hooks/useAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface SignInData {
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  // Sign up function
  const signUp = useCallback(
    async (data: SignUpData) => {
      setLoading(true);
      setError(null);

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

        // Automatically sign in after successful sign up
        router.push('/auth/login?signup=success');
        return result;
      } catch (err: any) {
        setError(err.message || 'An error occurred during sign up');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Sign in function
  const signIn = useCallback(
    async (data: SignInData) => {
      setLoading(true);
      setError(null);

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

        setUser(result.user);
        router.push('/dashboard');
        return result;
      } catch (err: any) {
        setError(err.message || 'Invalid email or password');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Sign out function
  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);

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

      setUser(null);
      router.push('/auth/login');
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign out');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Reset password function
  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);

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
    } catch (err: any) {
      setError(err.message || 'An error occurred during password reset');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
}
