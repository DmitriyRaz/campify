// src/domains/auth/components/AuthContainer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import OnboardingView from './OnboardingView';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Image from 'next/image';

type FormType = 'none' | 'login' | 'signup';

const AuthContainer: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>('login'); // Default to login on web
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleOpenLoginForm = () => {
    setActiveForm('login');
  };

  const handleOpenSignUpForm = () => {
    setActiveForm('signup');
  };

  const handleCloseForm = () => {
    setActiveForm('none');
  };

  // For mobile: sliding panels approach
  if (isMobile) {
    return (
      <main
        className="flex flex-col justify-center items-center w-full min-h-screen bg-neutral-900 relative overflow-hidden"
        role="main"
      >
        {/* Onboarding View (always visible on mobile) */}
        <OnboardingView onSignInClick={handleOpenLoginForm} onSignUpClick={handleOpenSignUpForm} />

        {/* Login Form Sliding Panel */}
        <div
          className={`fixed inset-x-0 bottom-0 z-10 transition-transform duration-300 ease-in-out transform ${
            activeForm === 'login' ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{
            height: '90vh',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
          aria-hidden={activeForm !== 'login'}
        >
          <LoginForm
            onClose={handleCloseForm}
            onSignUpClick={() => {
              setActiveForm('signup');
            }}
          />
        </div>

        {/* Sign Up Form Sliding Panel */}
        <div
          className={`fixed inset-x-0 bottom-0 z-10 transition-transform duration-300 ease-in-out transform ${
            activeForm === 'signup' ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{
            height: '90vh',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
          aria-hidden={activeForm !== 'signup'}
        >
          <SignUpForm
            onClose={handleCloseForm}
            onLoginClick={() => {
              setActiveForm('login');
            }}
          />
        </div>

        {/* Blurred backdrop overlay when a form is active */}
        {activeForm !== 'none' && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-5 transition-all duration-300"
            onClick={handleCloseForm}
            aria-hidden="true"
          />
        )}
      </main>
    );
  }

  // For desktop: background with left-aligned form
  return (
    <main className="relative w-full min-h-screen overflow-hidden" role="main">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-neutral-900">
        <Image
          src="https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Background"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      {/* Form container - positioned on the left side */}
      <div className="relative flex items-center min-h-screen">
        <div className="ml-[140px] lg:ml-[160px] xl:ml-[180px] 2xl:ml-[200px]">
          {activeForm === 'login' ? (
            <LoginForm onSignUpClick={handleOpenSignUpForm} />
          ) : (
            <SignUpForm onLoginClick={handleOpenLoginForm} />
          )}
        </div>
      </div>

      {/* Text on bottom right */}
      <div className="absolute bottom-8 right-8 text-right text-white">
        <div className="max-w-[400px] ml-auto">
          {' '}
          {/* Constrained width for better readability */}
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Sales Marketing Dashboard</h2>
          <p className="text-xl mb-6">
            Get ready to transform your sales and marketing strategy with powerful tools and
            AI-driven insights. Lets walk you through the essentials!
          </p>
          {/* Pagination dots */}
          <div className="flex gap-1 justify-end">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthContainer;
