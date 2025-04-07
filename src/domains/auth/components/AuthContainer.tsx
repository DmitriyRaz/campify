// src/domains/auth/components/AuthContainer.tsx
'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Image from 'next/image';

type FormType = 'login' | 'signup';

// NOTE: This useMediaQuery hook should be moved to the hooks folder
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

const AuthContainer: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>('login');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleToggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
  };

  // Mobile version
  if (isMobile) {
    return (
      <main
        className="flex flex-col justify-between w-full h-[100svh] bg-neutral-900 relative overflow-auto"
        role="main"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-b from-neutral-800 to-neutral-900">
            <Image
              src="https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Background"
              fill
              className="object-cover opacity-70"
              priority
            />
          </div>
        </div>

        {/* Content container with header, main content and footer */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full px-5 py-0">
          {/* Header with logo */}
          <header className="pt-6">
            <div
              className="w-[119px] h-[32px] bg-neutral-800 flex items-center justify-center text-white text-xs"
              role="img"
              aria-label="Company logo"
            >
              Logo Placeholder
            </div>
          </header>

          {/* Empty flex space to push content to top and bottom */}
          <div className="flex-1"></div>

          {/* Bottom section with welcome text and buttons - moved to bottom */}
          <div className="mb-8">
            {/* Welcome text - now positioned right above the pagination */}
            <div className="mb-6">
              <h1 className="w-full text-2xl font-bold leading-8 text-white mb-2">
                Welcome to Your Sales Marketing Dashboard
              </h1>
              <p className="w-full text-xs leading-4 text-white">
                Get ready to transform your sales and marketing strategy with powerful tools and
                AI-driven insights. Let&aposs walk you through the essentials!
              </p>
            </div>

            {/* Pagination indicators */}
            <div className="flex gap-1 items-center mb-6" role="navigation" aria-label="Pagination">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-white' : 'bg-white bg-opacity-40'
                  }`}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Page ${index + 1} of 5`}
                />
              ))}
            </div>

            {/* Auth actions */}
            <section className="flex flex-col gap-4 justify-center items-center w-full">
              <button
                className="flex justify-center items-center gap-1 px-3 py-2 w-full h-10 text-base font-bold leading-5 text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                onClick={() => {
                  setActiveForm('login');
                  document.getElementById('loginPanel')?.classList.remove('translate-y-full');
                  document.getElementById('loginPanel')?.classList.add('translate-y-0');
                  document.getElementById('overlay')?.classList.remove('opacity-0', 'invisible');
                  document.getElementById('overlay')?.classList.add('opacity-100', 'visible');
                }}
                aria-label="Sign In"
              >
                Sign In
              </button>

              <div className="flex gap-1 justify-center items-center w-full">
                <p className="text-xs leading-4 text-white">Don&apost have an account?</p>
                <button
                  className="text-xs font-bold leading-4 text-orange-500 cursor-pointer hover:text-orange-400 transition-colors focus:outline-none focus:underline"
                  onClick={() => {
                    setActiveForm('signup');
                    document.getElementById('signupPanel')?.classList.remove('translate-y-full');
                    document.getElementById('signupPanel')?.classList.add('translate-y-0');
                    document.getElementById('overlay')?.classList.remove('opacity-0', 'invisible');
                    document.getElementById('overlay')?.classList.add('opacity-100', 'visible');
                  }}
                  aria-label="Sign Up"
                >
                  Sign Up
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Login Form Sliding Panel */}
        <div
          id="loginPanel"
          className="fixed inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-in-out transform translate-y-full"
          style={{
            maxHeight: '85vh',
            overflowY: 'auto',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
          aria-hidden="true"
        >
          <LoginForm
            onClose={() => {
              document.getElementById('loginPanel')?.classList.remove('translate-y-0');
              document.getElementById('loginPanel')?.classList.add('translate-y-full');
              document.getElementById('overlay')?.classList.remove('opacity-100', 'visible');
              document.getElementById('overlay')?.classList.add('opacity-0', 'invisible');
            }}
            onSignUpClick={() => {
              document.getElementById('loginPanel')?.classList.remove('translate-y-0');
              document.getElementById('loginPanel')?.classList.add('translate-y-full');
              document.getElementById('signupPanel')?.classList.remove('translate-y-full');
              document.getElementById('signupPanel')?.classList.add('translate-y-0');
            }}
          />
        </div>

        {/* Sign Up Form Sliding Panel */}
        <div
          id="signupPanel"
          className="fixed inset-x-0 bottom-0 z-20 transition-transform duration-300 ease-in-out transform translate-y-full"
          style={{
            maxHeight: '85vh',
            overflowY: 'auto',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
          }}
          aria-hidden="true"
        >
          <SignUpForm
            onClose={() => {
              document.getElementById('signupPanel')?.classList.remove('translate-y-0');
              document.getElementById('signupPanel')?.classList.add('translate-y-full');
              document.getElementById('overlay')?.classList.remove('opacity-100', 'visible');
              document.getElementById('overlay')?.classList.add('opacity-0', 'invisible');
            }}
            onLoginClick={() => {
              document.getElementById('signupPanel')?.classList.remove('translate-y-0');
              document.getElementById('signupPanel')?.classList.add('translate-y-full');
              document.getElementById('loginPanel')?.classList.remove('translate-y-full');
              document.getElementById('loginPanel')?.classList.add('translate-y-0');
            }}
          />
        </div>

        {/* Blurred backdrop overlay */}
        <div
          id="overlay"
          className="fixed inset-0 backdrop-blur-sm bg-black/30 z-10 transition-opacity duration-300 opacity-0 invisible"
          onClick={() => {
            document.getElementById('loginPanel')?.classList.remove('translate-y-0');
            document.getElementById('loginPanel')?.classList.add('translate-y-full');
            document.getElementById('signupPanel')?.classList.remove('translate-y-0');
            document.getElementById('signupPanel')?.classList.add('translate-y-full');
            document.getElementById('overlay')?.classList.remove('opacity-100', 'visible');
            document.getElementById('overlay')?.classList.add('opacity-0', 'invisible');
          }}
          aria-hidden="true"
        />
      </main>
    );
  }

  // Desktop version
  return (
    <main className="relative w-full min-h-screen overflow-hidden" role="main">
      {/* Background Image with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-neutral-900">
        <Image
          src="https://images.pexels.com/photos/31452621/pexels-photo-31452621/free-photo-of-cozy-dutch-cafe-scene-with-street-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Background"
          fill
          className="object-cover opacity-70"
          priority
        />
      </div>

      <div className="relative flex min-h-screen">
        {/* Form container - positioned on the left side with proper spacing */}
        <div className="flex items-center ml-4 sm:ml-8 md:ml-12 lg:ml-[160px] xl:ml-[180px] 2xl:ml-[200px] py-8">
          <div className="z-10 max-h-[90vh] overflow-y-auto">
            {activeForm === 'login' ? (
              <LoginForm onSignUpClick={handleToggleForm} />
            ) : (
              <SignUpForm onLoginClick={handleToggleForm} />
            )}
          </div>
        </div>

        {/* Text on bottom right - fixed positioning to prevent overlap */}
        <div className="absolute bottom-8 right-8 text-right text-white w-1/3 max-w-[500px]">
          <div className="ml-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome to Your Sales Marketing Dashboard
            </h2>
            <p className="text-base md:text-xl mb-6">
              Get ready to transform your sales and marketing strategy with powerful tools and
              AI-driven insights. Let&aposs walk you through the essentials!
            </p>
            {/* Pagination dots */}
            <div className="flex gap-1 justify-end">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthContainer;
