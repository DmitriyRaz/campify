// src/domains/auth/components/SignUpForm.tsx
'use client';

import React, { useState } from 'react';

// NOTE: Form validation logic should be moved to a custom hook in hooks folder
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

  // Form validation state
  const [errors, setErrors] = useState({
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

  // Handle form submission with validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      firstName: formData.firstName ? '' : 'First name is required',
      lastName: formData.lastName ? '' : 'Last name is required',
      email: formData.email ? '' : 'Email is required',
      password: formData.password ? '' : 'Password is required',
      confirmPassword: formData.confirmPassword ? '' : 'Please confirm your password',
    };

    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Check if we have any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (!hasErrors) {
      console.log('Sign up form submitted:', formData);
      // Here you would call your auth service
    }
  };

  return (
    <div
      className={`bg-white ${onClose ? 'rounded-t-3xl' : 'rounded-[40px]'} w-full shadow-sm overflow-hidden`}
    >
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
      <div className="max-h-[80vh] overflow-y-auto">
        <section className="flex flex-col gap-8 lg:gap-10 justify-center items-start p-6 sm:p-8 md:p-10 w-full max-w-[100%]">
          {/* Header with logo and title */}
          <header className="flex flex-col gap-4 lg:gap-5 justify-center items-center self-stretch">
            <div className="h-10 w-[150px]" aria-label="Company Logo">
              <div className="text-center font-bold text-orange-500">LOGO</div>
            </div>

            <div className="flex flex-col gap-2 items-start self-stretch">
              <h1 className="self-stretch text-2xl sm:text-3xl font-bold leading-8 text-center text-neutral-900">
                Step Into Success Mode
              </h1>
              <p className="self-stretch text-base sm:text-lg leading-6 text-center text-zinc-500">
                Create your account and start transforming your sales and marketing strategy now.
              </p>
            </div>
          </header>

          {/* Form section */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 sm:gap-9 items-center self-stretch w-full"
          >
            {/* Social login buttons */}
            <div className="flex gap-4 sm:gap-5 justify-center items-center flex-col sm:flex-row w-full">
              <button
                type="button"
                aria-label="Log in with Google"
                className="flex gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer rounded-[999px] w-full hover:bg-orange-100 transition-colors"
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
                className="flex gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer rounded-[999px] w-full hover:bg-orange-100 transition-colors"
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
            <div className="flex gap-3 sm:gap-5 items-center mx-auto my-0 w-full">
              <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
              <span className="text-xs font-medium text-zinc-500 whitespace-nowrap">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-neutral-200" aria-hidden="true" />
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              {/* First and Last Name */}
              <div className="flex gap-4 sm:gap-5 items-start self-stretch w-full flex-col sm:flex-row">
                {/* First Name input */}
                <div className="flex flex-col gap-2 sm:gap-3 items-start self-stretch w-full">
                  <label
                    htmlFor="firstName"
                    className="text-sm sm:text-base font-medium leading-5 text-neutral-900"
                  >
                    First Name
                  </label>
                  <div className="flex gap-3 items-center self-stretch px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="flex-1 text-sm sm:text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                  </div>
                  {errors.firstName && (
                    <p id="firstName-error" className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 items-start self-stretch w-full">
                  <label
                    htmlFor="lastName"
                    className="text-sm sm:text-base font-medium leading-5 text-neutral-900"
                  >
                    Last Name
                  </label>
                  <div className="flex gap-3 items-center self-stretch px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="flex-1 text-sm sm:text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    />
                  </div>
                  {errors.lastName && (
                    <p id="lastName-error" className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 sm:gap-3 items-start self-stretch w-full">
                <label
                  htmlFor="email"
                  className="text-sm sm:text-base font-medium leading-5 text-neutral-900"
                >
                  Email
                </label>
                <div className="flex gap-3 items-center self-stretch px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 text-sm sm:text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 sm:gap-3 items-start self-stretch w-full">
                <label
                  htmlFor="password"
                  className="text-sm sm:text-base font-medium leading-5 text-neutral-900"
                >
                  Create Password
                </label>
                <div className="flex gap-3 items-center self-stretch px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="flex-1 text-sm sm:text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-900"
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
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2 sm:gap-3 items-start self-stretch w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm sm:text-base font-medium leading-5 text-neutral-900"
                >
                  Confirm Password
                </label>
                <div className="flex gap-3 items-center self-stretch px-4 sm:px-5 py-3 sm:py-4 h-12 sm:h-14 bg-white border border-solid border-neutral-200 rounded-[999px] w-full">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="flex-1 text-sm sm:text-base leading-5 border-none outline-none text-neutral-900 bg-transparent w-full"
                    aria-required="true"
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {showConfirmPassword ? (
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
                      {!showConfirmPassword && (
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
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="flex justify-center items-center gap-1 self-stretch px-4 py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base font-semibold leading-5 text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full transition-colors mt-2"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <footer className="flex gap-1 justify-center items-center self-stretch">
            <p className="text-xs font-medium leading-4 text-neutral-900">
              Already have an account?
            </p>
            <button
              onClick={onLoginClick}
              className="text-xs font-semibold leading-4 text-orange-500 cursor-pointer focus:outline-none focus:underline"
              aria-label="Sign in to your existing account"
            >
              Sign In
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default SignUpForm;