// src/domains/auth/components/BackgroundSection.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface BackgroundSectionProps {
  backgroundImageUrl?: string;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  backgroundImageUrl = 'https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
}) => {
  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <div className="relative h-full w-full">
        <Image
          src={backgroundImageUrl}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text readability */}
      </div>

      {/* Bottom aligned content */}
      <div className="absolute bottom-0 right-0 text-right p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome to Your Sales Marketing Dashboard</h2>
        <p className="text-xl mb-6">
          Get ready to transform your sales and marketing strategy with powerful tools and AI-driven
          insights. Lets walk you through the essentials!
        </p>

        {/* Pagination dots */}
        <div className="flex gap-1 justify-end mb-10">
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
  );
};

export default BackgroundSection;
