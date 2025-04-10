// domains/auth/hooks/useAuth.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { ClientAuthService } from '../services/clientAuthService';
import {  SignUpData, SignInData } from '../types/auth';

export function useAuth() {
  // Get state from the store instead of managing it locally
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    // Only load session if we don't already have a user
    if (!user) {
      ClientAuthService.loadSession();
    }
  }, [user]);

  // Sign up function
  const signUp = async (data: SignUpData) => {
    try {
      const result = await ClientAuthService.signUp(data);
      router.push('/auth/login?signup=success');
      return result;
    } catch (err) {
      // Error is already handled in the service
      throw err;
    }
  };

  // Sign in function
  const signIn = async (data: SignInData) => {
    try {
      const result = await ClientAuthService.signIn(data);
      router.push('/dashboard');
      return result;
    } catch (err) {
      // Error is already handled in the service
      throw err;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const result = await ClientAuthService.signOut();
      router.push('/auth/login');
      return result;
    } catch (err) {
      // Error is already handled in the service
      throw err;
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      return await ClientAuthService.resetPassword(email);
    } catch (err) {
      // Error is already handled in the service
      throw err;
    }
  };

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

// Optional: You could also provide more specialized hooks
// for components that only need part of the auth functionality

// Just get the auth state without any actions
export function useAuthState() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  return { user, loading, error };
}

// Just get auth status (logged in or not)
export function useAuthStatus() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;

  return { isAuthenticated, user };
}
