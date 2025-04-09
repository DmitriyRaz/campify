// domains/auth/services/authService.ts
import { createServiceClient } from '../../../lib/supabase';

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  // Sign up a new user
  static async signUp(data: SignUpData) {
    const supabase = createServiceClient();

    const { email, password, firstName, lastName } = data;

    // Create the user in Supabase Auth
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error('Error during signup:', error);
      throw error;
    }

    return authData;
  }

  // Sign in a user
  static async signIn(data: LoginData) {
    const supabase = createServiceClient();

    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error during signin:', error);
      throw error;
    }

    return authData;
  }

  // Sign out a user
  static async signOut(sessionId: string) {
    const supabase = createServiceClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error during signout:', error);
      throw error;
    }

    return { success: true };
  }

  // Get the current session
  static async getSession(sessionId: string) {
    const supabase = createServiceClient();

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      throw error;
    }

    return data;
  }

  // Reset password
  static async resetPassword(email: string) {
    const supabase = createServiceClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      console.error('Error resetting password:', error);
      throw error;
    }

    return data;
  }

  // Update user
  static async updateUser(userId: string, userData: any) {
    const supabase = createServiceClient();

    const { data, error } = await supabase.auth.updateUser({
      data: userData,
    });

    if (error) {
      console.error('Error updating user:', error);
      throw error;
    }

    return data;
  }
}
