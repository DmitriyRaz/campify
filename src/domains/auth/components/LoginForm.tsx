// src/domains/auth/components/LoginForm.tsx
'use client';

import React, { useState } from 'react';

interface LoginFormProps {
  onClose?: () => void;
  onSignUpClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSignUpClick }) => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className={`bg-white ${onClose ? 'rounded-t-3xl' : 'rounded-[40px]'} w-full shadow-sm`}>
      {/* Close button - only show on mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          aria-label="Close login form"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Login form content */}
      <section className="flex flex-col gap-10 justify-center items-start p-10 max-w-none w-[600px] max-h-[90vh] overflow-y-auto max-md:p-8 max-md:w-full max-md:max-w-[600px] max-md:rounded-[32px] max-sm:p-6 max-sm:max-w-screen-sm max-sm:rounded-3xl">
        {/* Logo Section */}
        <header className="flex flex-col gap-5 justify-center items-center self-stretch">
          <div className="h-10 w-[150px]" aria-label="Company Logo">
            {/* Note: Replace with actual logo image */}
            <div className="text-center font-bold text-orange-500">LOGO</div>
          </div>

          <div className="flex flex-col gap-2 items-start self-stretch">
            <h1 className="self-stretch text-3xl font-bold leading-8 text-center text-neutral-900 max-sm:text-2xl">
              Lets Get You Back to Winning!
            </h1>
            <p className="self-stretch text-lg leading-6 text-center text-zinc-500 max-sm:text-base">
              Sign in to your dashboard and take charge of your leads, campaigns, and sales today
            </p>
          </div>
        </header>

        {/* Login Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 items-center self-stretch w-full"
        >
          {/* Social Login Options */}
          <div className="flex gap-5 justify-center items-center self-stretch max-sm:flex-col w-full">
            <button
              type="button"
              aria-label="Log in with Google"
              className="flex gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer flex-[1_0_0] rounded-[999px] max-sm:w-full hover:bg-orange-100 transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-xs text-gray-500">G</span>
              </span>
              <span className="text-sm font-medium leading-5 text-neutral-900">
                Log In with Google
              </span>
            </button>

            <button
              type="button"
              aria-label="Log in with Apple"
              className="flex gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer flex-[1_0_0] rounded-[999px] max-sm:w-full hover:bg-orange-100 transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-xs text-gray-500">A</span>
              </span>
              <span className="text-sm font-medium leading-5 text-neutral-900">
                Log In with Apple
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex gap-5 justify-center items-center self-stretch w-full">
            <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
            <span className="text-xs font-medium text-zinc-500">or continue with email</span>
            <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
          </div>

          {/* Email and Password Fields */}
          <div className="flex flex-col gap-8 items-start self-stretch w-full">
            <div className="flex flex-col gap-5 items-end self-stretch w-full">
              {/* Email/Username Field */}
              <div className="flex flex-col gap-3 items-start self-stretch w-full">
                <label
                  htmlFor="email-input"
                  className="text-base font-medium leading-5 text-neutral-900"
                >
                  Username or Email
                </label>
                <div className="flex gap-3 items-center self-stretch px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                  <input
                    id="email-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your username or email"
                    className="flex-1 text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-3 items-start self-stretch w-full">
                <label
                  htmlFor="password-input"
                  className="text-base font-medium leading-5 text-neutral-900"
                >
                  Password
                </label>
                <div className="flex gap-3 items-center self-stretch px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="flex-1 text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-neutral-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      )}
                      {!showPassword && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <button
                type="button"
                className="text-xs font-semibold leading-4 text-orange-500 cursor-pointer focus:outline-none focus:underline"
                aria-label="Reset your password"
              >
                Forgot your password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="flex justify-center items-center gap-1 self-stretch px-4 py-3 h-12 text-base font-semibold leading-5 text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <footer className="flex gap-1 justify-center items-center self-stretch">
          <p className="text-xs font-medium leading-4 text-neutral-900">Dont have an account?</p>
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-xs font-semibold leading-4 text-orange-500 cursor-pointer focus:outline-none focus:underline"
            aria-label="Create a new account"
          >
            Sign Up
          </button>
        </footer>
      </section>
    </div>
  );
};

export default LoginForm;
