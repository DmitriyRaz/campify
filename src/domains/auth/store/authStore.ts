// domains/auth/store/authStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// domains/auth/store/authStore.ts
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearState: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearState: () => set({ user: null, error: null }),
    }),
    {
      name: 'auth-storage',
      // Only persist user data, not loading or error states
      partialize: (state) => ({ user: state.user }),
    }
  )
);
