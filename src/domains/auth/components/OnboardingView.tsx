// src/domains/auth/components/OnboardingView.tsx
'use client';

import React from 'react';
//import Link from 'next/link';
import Image from 'next/image';

// Update the interface
interface OnboardingViewProps {
  backgroundImageUrl?: string;
  currentStep?: number;
  totalSteps?: number;
  onSignInClick?: () => void;  // Add this line
  onSignUpClick?: () => void;  // Add this line
}

const OnboardingView: React.FC<OnboardingViewProps> = ({
  backgroundImageUrl = 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  currentStep = 0,
  totalSteps = 5,
  onSignInClick,
  onSignUpClick,
}) => {

  return (
    <main
      className="flex flex-col justify-center items-center w-full min-h-screen bg-neutral-900 relative"
      role="main"
    >
      {/* Full-height background image container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Black background represents the image placeholder until we have the actual image */}
        <div className="w-full h-full bg-gradient-to-b from-neutral-800 to-neutral-900">
          {backgroundImageUrl && (
            <Image
              src={backgroundImageUrl}
              alt="Background"
              fill
              className="object-cover opacity-70"
              priority
            />
          )}
        </div>
      </div>

      {/* Content container */}
      <div className="relative flex flex-col justify-between min-h-screen w-full max-w-[393px] px-5 py-0">
        {/* Header with logo */}
        <header className="mt-8">
          <div
            className="w-[119px] h-[32px] bg-neutral-800 flex items-center justify-center text-white text-xs"
            role="img"
            aria-label="Company logo"
          >
            Logo Placeholder
          </div>
        </header>

        {/* Main content section */}
        <div className="flex flex-col">
          {/* Welcome content */}
          <section className="flex flex-col gap-5 justify-center items-start w-full mb-5">
            <div className="flex flex-col gap-3 items-start w-full">
              <h1 className="w-full text-2xl font-bold leading-8 text-white">
                Welcome to Your Sales Marketing Dashboard
              </h1>
              <p className="w-full text-xs leading-4 text-white">
                Get ready to transform your sales and marketing strategy with powerful tools and
                AI-driven insights. Lets walk you through the essentials!
              </p>
            </div>
          </section>

          {/* Pagination indicators */}
          <div className="flex gap-1 items-center mb-10" role="navigation" aria-label="Pagination">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-[999px] ${
                  index === currentStep ? 'bg-white' : 'bg-white bg-opacity-40'
                }`}
                aria-current={index === currentStep ? 'true' : 'false'}
                aria-label={`Page ${index + 1} of ${totalSteps}`}
              />
            ))}
          </div>

          {/* Auth actions */}
          <section className="flex flex-col gap-5 justify-center items-center w-full mb-10">
            <button
              className="flex justify-center items-center gap-1 px-3 py-2 w-full h-10 text-base font-bold leading-5 text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
              onClick={onSignInClick}
              aria-label="Sign In"
            >
              Sign In
            </button>

            <div className="flex gap-1 justify-center items-center w-full">
              <p className="text-xs leading-4 text-white">Dont have an account?</p>
              <button
                className="gap-1 h-4 text-xs font-bold leading-4 text-orange-500 cursor-pointer rounded-[999px] hover:text-orange-400 transition-colors focus:outline-none focus:underline"
                onClick={onSignUpClick}
                aria-label="Sign Up"
              >
                Sign Up
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default OnboardingView;
