// src/domains/auth/components/LoginForm.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SocialLoginButton from './SocialLoginButton';
import InputField from './InputField';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Integrate with authService for actual login
      console.log('Login attempt with:', { username, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // TODO: Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // TODO: Implement Google OAuth login
    console.log('Google login clicked');
  };

  const handleAppleLogin = async () => {
    // TODO: Implement Apple OAuth login
    console.log('Apple login clicked');
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto bg-white rounded-2xl shadow-sm p-6 w-full">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#F85A2B" />
            <path
              d="M10 16C10 13.7909 11.7909 12 14 12H18C20.2091 12 22 13.7909 22 16V20C22 22.2091 20.2091 24 18 24H14C11.7909 24 10 22.2091 10 20V16Z"
              fill="white"
            />
          </svg>
          <span className="ml-2 font-bold text-lg">Campify</span>
        </div>
        <h1 className="text-xl font-bold mb-1 text-neutral-900">Lets Get You Back to Winning!</h1>
        <p className="text-sm text-zinc-500">
          Sign in to your dashboard and take charge of your leads, campaigns, and sales today
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <SocialLoginButton
          provider="google"
          label="Sign in with Google"
          onClick={handleGoogleLogin}
        />
        <SocialLoginButton provider="apple" label="Sign in with Apple" onClick={handleAppleLogin} />
      </div>

      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="px-2 text-xs text-zinc-500">or continue with email</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="username"
          label="Username or Email"
          type="text"
          placeholder="Enter your username or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="space-y-1">
          <InputField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.99992 3L19.9999 21M9.58045 8.58423C8.76338 9.17006 8.16992 10.0785 8.16992 11.1C8.16992 13.0882 9.78173 14.7 11.7699 14.7C12.7914 14.7 13.6999 14.1065 14.2857 13.2895M7.76172 4.80408C9.02003 4.28783 10.3773 4 11.7999 4C17.3999 4 21.7999 8.4 21.7999 12C21.7999 13.1031 21.4903 14.1595 20.9199 15.1226M16.9999 17.28C15.5974 18.3471 13.7799 19 11.7999 19C6.19992 19 1.79992 14.6 1.79992 11C1.79992 9.4 2.40992 7.73333 3.49992 6.33333"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.03575 12.3224C1.96666 12.1151 1.9666 11.8907 2.03556 11.6834C3.42392 7.50972 7.36098 4.5 12.001 4.5C16.6389 4.5 20.5744 7.50692 21.9645 11.6776C22.0336 11.8849 22.0337 12.1093 21.9647 12.3166C20.5763 16.4903 16.6393 19.5 11.9993 19.5C7.36139 19.5 3.42583 16.4931 2.03575 12.3224Z"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.0002 12C15.0002 13.6569 13.6571 15 12.0002 15C10.3433 15 9.0002 13.6569 9.0002 12C9.0002 10.3431 10.3433 9 12.0002 9C13.6571 9 15.0002 10.3431 15.0002 12Z"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            }
          />
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-orange-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs">
        Dont have an account?{' '}
        <Link href="/auth/register" className="font-bold text-orange-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
