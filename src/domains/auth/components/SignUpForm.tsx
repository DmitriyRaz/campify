// src/domains/auth/components/SignUpForm.tsx
'use client';

import React, { useState } from 'react';

interface SignUpFormProps {
  onClose?: () => void;
  onLoginClick?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose, onLoginClick }) => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`bg-white ${onClose ? 'rounded-t-3xl' : 'rounded-[40px]'} w-full shadow-sm`}>
      {/* Close button - only show on mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          aria-label="Close sign up form"
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

      <section className="flex flex-col gap-10 p-10 bg-white w-[600px] max-md:p-8 max-md:w-full max-md:max-w-[600px] max-md:rounded-[30px] max-sm:p-5 max-sm:rounded-3xl">
        {/* Header with logo and title */}
        <header className="flex flex-col gap-5 items-center">
          <div aria-label="Company Logo">
            {/* Note: Replace with actual logo image */}
            <div className="h-10 w-[150px] bg-gray-200 flex items-center justify-center text-gray-500">
              Logo Placeholder
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-3xl font-bold leading-8 text-neutral-900">
              Step Into Success Mode
            </h1>
            <p className="text-lg leading-6 text-zinc-500">
              Create your account and start transforming your sales and marketing strategy now.
            </p>
          </div>
        </header>

        {/* Form section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-9 items-center">
          {/* Social login buttons */}
          <div className="flex gap-5 justify-center items-center w-full max-sm:flex-col">
            <button
              type="button"
              className="flex flex-1 gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer rounded-[999px] max-sm:w-full hover:bg-orange-100 transition-colors"
              aria-label="Log in with Google"
            >
              {/* Note: Replace with actual Google icon */}
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                G
              </div>
              <span className="text-sm text-neutral-900">Log In with Google</span>
            </button>

            <button
              type="button"
              className="flex flex-1 gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer rounded-[999px] max-sm:w-full hover:bg-orange-100 transition-colors"
              aria-label="Log in with Apple"
            >
              {/* Note: Replace with actual Apple icon */}
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                A
              </div>
              <span className="text-sm text-neutral-900">Log In with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex gap-5 items-center mx-auto my-0 w-full">
            <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
            <span className="text-xs font-medium text-zinc-500">or continue with email</span>
            <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-5 w-full">
            {/* First and Last Name */}
            <div className="flex gap-5 max-sm:flex-col max-sm:gap-5">
              <div className="flex flex-col flex-1 gap-3 w-full max-sm:w-full">
                <label htmlFor="firstName" className="text-base text-neutral-900">
                  First Name
                </label>
                <div className="flex relative gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px]">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full text-base border-none outline-none text-neutral-900"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-3 w-full max-sm:w-full">
                <label htmlFor="lastName" className="text-base text-neutral-900">
                  Last Name
                </label>
                <div className="flex relative gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px]">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full text-base border-none outline-none text-neutral-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="email" className="text-base text-neutral-900">
                Email
              </label>
              <div className="flex relative gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px]">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-base border-none outline-none text-neutral-900"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="password" className="text-base text-neutral-900">
                Create Password
              </label>
              <div className="flex relative gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px]">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-base border-none outline-none text-neutral-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-neutral-900"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="confirmPassword" className="text-base text-neutral-900">
                Confirm Password
              </label>
              <div className="flex relative gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px]">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full text-base border-none outline-none text-neutral-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer text-neutral-900"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showConfirmPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="px-4 py-3 w-full h-12 text-base font-bold text-white bg-orange-500 cursor-pointer border-none rounded-[999px] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <footer className="flex gap-1 justify-center items-center">
          <p className="text-xs text-neutral-900">Already have an account?</p>
          <button
            onClick={onLoginClick}
            className="text-xs font-bold text-orange-500 cursor-pointer hover:underline focus:outline-none focus:underline"
          >
            Sign In here
          </button>
        </footer>
      </section>
    </div>
  );
};

export default SignUpForm;
