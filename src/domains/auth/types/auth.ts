// domains/auth/types/auth.ts

export interface User {
  id: string;
  email: string;
  // Add any other user properties you need
}

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  // Add any session-specific properties
}
