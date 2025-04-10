// domains/auth/functions/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../services/authService';

// Sign up a new user
export async function POST(request: NextRequest) {
  try {
    // Get signup data from request
    const signupData = await request.json();

    // Validate required fields
    if (!signupData.email || !signupData.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Sign up the user
    const result = await AuthService.signUp(signupData);

    return NextResponse.json({ user: result.user });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during signup';
    console.error('Signup error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// Configure routes based on the request type
export async function getHandler(request: NextRequest) {
  // Get the pathname to determine the operation
  const { pathname } = new URL(request.url);

  // Different auth functions based on the path
  if (pathname.endsWith('/signin')) {
    return handleSignIn(request);
  } else if (pathname.endsWith('/signout')) {
    return handleSignOut(request);
  } else if (pathname.endsWith('/reset-password')) {
    return handleResetPassword(request);
  }

  // Default: sign up
  return POST(request);
}

// Sign in a user
async function handleSignIn(request: NextRequest) {
  try {
    const loginData = await request.json();

    if (!loginData.email || !loginData.password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const result = await AuthService.signIn(loginData);

    return NextResponse.json({
      user: result.user,
      session: result.session,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid email or password';
    console.error('Signin error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}

// Sign out a user
async function handleSignOut(request: NextRequest) {
  try {
    // Extract session ID from request headers or body
    const { sessionId } = await request.json();

    await AuthService.signOut(sessionId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred during sign out';
    console.error('Signout error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Reset password
async function handleResetPassword(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await AuthService.resetPassword(email);

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred during password reset';
    console.error('Password reset error:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
