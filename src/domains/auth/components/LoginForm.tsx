'use client';
import React, { useState } from 'react';
import SocialLoginButton from './SocialLoginButton';
import InputField from './InputField';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { username, password });
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <section
        className="flex flex-col gap-10 justify-center items-start p-10 bg-white rounded-[40px] w-[600px] max-md:p-8 max-md:w-[500px] max-sm:gap-8 max-sm:p-6 max-sm:w-full max-sm:rounded-3xl"
        aria-labelledby="login-heading"
      >
        <header className="flex flex-col gap-5 justify-center items-center w-full">
          <div className="flex w-[150px] h-[40px] justify-center items-center">
            {/* Logo placeholder - will need to be replaced with actual logo */}
            <div aria-label="Company logo" role="img">
              {/* Note: Replace with actual logo image */}
              <div className="w-[150px] h-[40px] bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                Logo Placeholder
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <h1
              id="login-heading"
              className="w-full text-3xl font-bold leading-8 text-center text-neutral-900 max-md:text-2xl max-sm:text-2xl"
            >
              Lets Get You Back to Winning!
            </h1>
            <p className="w-full text-lg leading-6 text-center text-zinc-500 max-md:text-base max-sm:text-sm">
              Sign in to your dashboard and take charge of your leads, campaigns, and sales today
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 items-center w-full max-sm:gap-6"
        >
          <div className="flex gap-5 justify-center items-center w-full max-sm:flex-col max-sm:gap-3">
            <SocialLoginButton
              provider="google"
              label="Log In with Google"
              onClick={() => console.log('Google login clicked')}
            />
            <SocialLoginButton
              provider="apple"
              label="Log In with Apple"
              onClick={() => console.log('Apple login clicked')}
            />
          </div>

          <div className="flex gap-5 items-center w-full">
            <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
            <span className="text-xs font-medium text-zinc-500">or continue with email</span>
            <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-8 items-start w-full">
            <div className="flex flex-col gap-5 items-end w-full">
              <InputField
                id="username"
                label="Username or Email"
                type="text"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

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
                    className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full"
                  >
                    {showPassword ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[24px] h-[24px] cursor-pointer"
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
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[24px] h-[24px] cursor-pointer"
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

              <button
                type="button"
                className="gap-1 h-4 text-xs font-bold leading-4 text-orange-500 cursor-pointer rounded-[999px] focus:outline-none focus:underline"
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              className="gap-1 px-4 py-3 w-full h-12 text-base font-bold leading-5 text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>

        <footer className="flex gap-1 justify-center items-center w-full">
          <p className="text-xs leading-4 text-neutral-900">Dont have an account?</p>
          <button
            type="button"
            className="text-xs font-bold leading-4 text-orange-500 cursor-pointer focus:outline-none focus:underline"
            onClick={() => console.log('Sign up clicked')}
          >
            Sign Up
          </button>
        </footer>
      </section>
    </main>
  );
};

export default LoginForm;
