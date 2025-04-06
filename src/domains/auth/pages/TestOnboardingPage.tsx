'use client';

import React, { useState } from 'react';
import UserOnboarding from '../components/UserOnboarding'; // Adjust the import path as necessary

// This is a mock dashboard page to test the onboarding component
const TestOnboardingPage: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mock Dashboard Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="text-orange-500 font-bold text-xl">LOGO</div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full bg-gray-100">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M14.857 17.082C16.7202 15.7383 18 13.5138 18 11C18 6.58172 14.4183 3 10 3C5.58172 3 2 6.58172 2 11C2 15.4183 5.58172 19 10 19C11.4232 19 12.7699 18.6318 13.9465 18" 
                stroke="#1A1A1A" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M22 22L14.8 14.8" 
                stroke="#1A1A1A" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M17.5 8.5C17.5 6.846 16.8152 5.25947 15.5962 4.04047C14.3772 2.82148 12.7862 2.13666 11.1322 2.13666C9.47809 2.13666 7.88712 2.82148 6.6681 4.04047C5.44908 5.25947 4.76428 6.846 4.76428 8.5C4.76428 15.8333 2 18 2 18H20.2645C20.2645 18 17.5 15.8333 17.5 8.5Z" 
                stroke="#1A1A1A" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M13.7305 21.5C13.3344 21.9795 12.7863 22.2855 12.1915 22.3568C11.5966 22.4281 10.9941 22.2602 10.5062 21.8919C10.0184 21.5236 9.68182 20.9783 9.56978 20.3669C9.45774 19.7554 9.57806 19.1248 9.90498 18.6" 
                stroke="#1A1A1A" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="h-8 w-8 bg-orange-500 rounded-full"></div>
        </div>
      </header>

      {/* Mock Dashboard Content */}
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome to your dashboard</p>
        </div>

        {/* Mock Dashboard Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4">Sales Summary</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Sales</span>
                <span className="font-semibold">$24,350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Conversion Rate</span>
                <span className="font-semibold">3.8%</span>
              </div>
              <div className="w-full h-2 mt-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[38%]"></div>
              </div>
            </div>
          </div>

          {/* Widget 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4">Lead Performance</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500">New Leads</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Qualified Leads</span>
                <span className="font-semibold">68</span>
              </div>
              <div className="w-full h-2 mt-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[45%]"></div>
              </div>
            </div>
          </div>

          {/* Widget 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4">Active Campaigns</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Running</span>
                <span className="font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Performance</span>
                <span className="font-semibold text-green-500">+12.5%</span>
              </div>
              <div className="w-full h-2 mt-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[65%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Modal - conditionally rendered */}
      {showOnboarding && <UserOnboarding />}

      {/* Button to toggle onboarding (for testing) */}
      <div className="fixed bottom-4 right-4">
        <button 
          onClick={() => setShowOnboarding(!showOnboarding)}
          className="px-4 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors"
        >
          {showOnboarding ? 'Hide Onboarding' : 'Show Onboarding'}
        </button>
      </div>
    </div>
  );
};

export default TestOnboardingPage;