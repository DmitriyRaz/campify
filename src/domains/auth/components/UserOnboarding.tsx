'use client';

import React, { useState } from 'react';
import Image from 'next/image';
//import { useRouter } from 'next/navigation';

// Interface for the user profile data
interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  profileImage: string | null;
  preferences: {
    language: string;
    dateFormat: string;
    timezone: string;
    currency: string;
  };
}

const UserOnboarding: React.FC = () => {
  //const router = useRouter();

  // State for profile data - this would be fetched from API in production
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Hanna',
    lastName: 'Calzoni',
    username: '@hannacalzoni',
    email: 'hannacalzoni@salescape.com',
    phone: '+01 2345678910',
    profileImage: null,
    preferences: {
      language: 'English (US)',
      dateFormat: 'DD/MM/YYYY',
      timezone: 'Automatically',
      currency: 'USD ($)',
    },
  });

  // State for loading/saving indicators
  const [isSaving, setIsSaving] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (
      id === 'firstName' ||
      id === 'lastName' ||
      id === 'username' ||
      id === 'email' ||
      id === 'phone'
    ) {
      setProfile((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle preference changes
 /* const handlePreferenceChange = (preference: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value,
      },
    }));
  }; */

  // Handle profile image changes
  const handleProfileImageUpload = () => {
    // This would connect to an image upload API in production
    console.log('Upload image functionality would be implemented here');
    // Mock image update for demo purposes
    setProfile((prev) => ({
      ...prev,
      profileImage: 'https://via.placeholder.com/80',
    }));
  };

  const handleProfileImageDelete = () => {
    setProfile((prev) => ({
      ...prev,
      profileImage: null,
    }));
  };

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);

    try {
      // This would send data to an API in production
      console.log('Profile data to save:', profile);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success, redirect to dashboard (or stay on current page)
      // router.push('/dashboard');
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setIsSaving(false);
    }
  };

  // Handle skip/do it later
  const handleSkip = () => {
    // In production, might want to track that user skipped onboarding
    // router.push('/dashboard');
    console.log('User skipped onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <main className="flex flex-col gap-10 p-5 w-full bg-white rounded-2xl max-w-[1308px] max-h-[90vh] overflow-y-auto max-md:max-w-full max-sm:gap-6 max-sm:p-4">
        <header className="flex gap-5 justify-between items-center w-full max-md:flex-col max-md:items-start">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold leading-8 text-neutral-900 max-sm:text-2xl">
              Welcome to your new account, Adam!
            </h1>
            <p className="text-lg leading-6 text-zinc-500 max-sm:text-base">
              You can fill this out now, or come back to it later. This can be found in the Settings
              page.
            </p>
          </div>
          <div className="flex gap-5 items-center max-md:flex-col max-md:gap-3 max-md:w-full">
            <button
              onClick={handleSkip}
              className="px-4 py-3 h-12 text-base font-bold text-orange-500 bg-orange-50 cursor-pointer rounded-[999px] hover:bg-orange-100 transition-colors max-md:w-full"
              aria-label="Skip for now"
              disabled={isSaving}
            >
              I will Do It Later
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-3 h-12 text-base font-bold text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 transition-colors max-md:w-full"
              aria-label="Save profile changes"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Change'}
            </button>
          </div>
        </header>

        <section className="flex gap-10 w-full max-md:flex-col">
          {/* Left Column - Profile Information */}
          <div className="flex flex-col flex-1 gap-10 max-sm:gap-6">
            {/* Profile Picture Section */}
            <section aria-labelledby="profile-picture-heading">
              <div className="mb-3">
                <h2
                  id="profile-picture-heading"
                  className="mb-1 text-xl font-bold text-neutral-900"
                >
                  Profile Picture
                </h2>
                <p className="text-sm text-zinc-500">
                  Upload or update your profile picture for a personalized touch.
                </p>
              </div>
              <div className="flex gap-6 items-center max-sm:flex-col max-sm:items-start">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  {profile.profileImage ? (
                    <Image
                      src={profile.profileImage}
                      width={80}
                      height={80}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-neutral-400 text-xs">Image here</div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 max-sm:w-full">
                    <button
                      onClick={handleProfileImageDelete}
                      className="px-3 py-2 h-8 text-xs font-bold text-orange-500 border border-orange-500 border-solid cursor-pointer rounded-[999px] hover:bg-orange-50 transition-colors"
                      aria-label="Delete profile image"
                    >
                      Delete Image
                    </button>
                    <button
                      onClick={handleProfileImageUpload}
                      className="px-3 py-2 h-8 text-xs font-bold text-white bg-orange-500 cursor-pointer rounded-[999px] hover:bg-orange-600 transition-colors"
                      aria-label="Upload new profile image"
                    >
                      Upload Image
                    </button>
                  </div>
                  <p className="text-sm text-neutral-900">PNG or JPG under 2MB</p>
                </div>
              </div>
            </section>

            {/* Name Fields */}
            <div className="flex gap-5 w-full max-sm:flex-col">
              <div className="flex flex-col flex-1 gap-3">
                <label htmlFor="firstName" className="text-base font-medium text-neutral-900">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  className="px-5 py-4 h-14 text-base bg-white border border-solid border-neutral-200 rounded-[999px] text-neutral-900 outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div className="flex flex-col flex-1 gap-3">
                <label htmlFor="lastName" className="text-base font-medium text-neutral-900">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  className="px-5 py-4 h-14 text-base bg-white border border-solid border-neutral-200 rounded-[999px] text-neutral-900 outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="flex gap-5 items-end max-sm:flex-col">
              <div className="flex flex-col flex-1 gap-3 max-w-[300px] max-sm:max-w-full">
                <label htmlFor="username" className="text-base font-medium text-neutral-900">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={profile.username}
                  onChange={handleInputChange}
                  className="px-5 py-4 h-14 text-base bg-white border border-solid border-neutral-200 rounded-[999px] text-neutral-900 outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <button
                className="px-4 py-3 h-12 text-base font-bold text-orange-500 border border-orange-500 border-solid cursor-pointer rounded-[999px] hover:bg-orange-50 transition-colors max-sm:w-full"
                aria-label="Change username"
              >
                Change Username
              </button>
            </div>

            {/* Email Field */}
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="email" className="text-base font-medium text-neutral-900">
                Email
              </label>
              <div className="flex gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px] focus-within:border-orange-500 transition-colors">
                <span aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.75 7.25V17.75C21.75 18.9926 20.7426 20 19.5 20H4.5C3.25736 20 2.25 18.9926 2.25 17.75V7.25M21.75 7.25C21.75 6.00736 20.7426 5 19.5 5H4.5C3.25736 5 2.25 6.00736 2.25 7.25M21.75 7.25V7.49271C21.75 8.27405 21.3447 8.99945 20.6792 9.40894L13.1792 14.0243C12.4561 14.4694 11.5439 14.4694 10.8208 14.0243L3.32078 9.40894C2.65535 8.99945 2.25 8.27405 2.25 7.49271V7.25"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="text-base text-neutral-900 bg-transparent border-none outline-none w-full"
                  aria-label="Email address"
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col flex-1 gap-3">
              <label htmlFor="phone" className="text-base font-medium text-neutral-900">
                Phone Number
              </label>
              <div className="flex gap-3 items-center px-5 py-4 h-14 bg-white border border-solid border-neutral-200 rounded-[999px] focus-within:border-orange-500 transition-colors">
                <span aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.25 6.75C2.25 15.0343 8.96573 21.75 17.25 21.75H19.5C20.7426 21.75 21.75 20.7426 21.75 19.5V18.1284C21.75 17.6121 21.3987 17.1622 20.8979 17.037L16.4747 15.9312C16.0355 15.8214 15.5734 15.9855 15.3018 16.3476L14.3316 17.6412C14.05 18.0166 13.563 18.1827 13.1223 18.0212C9.81539 16.8098 7.19015 14.1846 5.97876 10.8777C5.81734 10.437 5.98336 9.94998 6.3588 9.6684L7.65242 8.69818C8.01453 8.4266 8.17861 7.96445 8.06883 7.52533L6.96304 3.10215C6.83783 2.60133 6.38785 2.25 5.87163 2.25H4.5C3.25736 2.25 2.25 3.25736 2.25 4.5V6.75Z"
                      stroke="#121212"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="text-base text-neutral-900 bg-transparent border-none outline-none w-full"
                  aria-label="Phone number"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Preferences */}
          <div className="flex flex-col gap-10 max-w-[614px] max-md:max-w-full max-sm:gap-6">
            {/* Language Preference */}
            <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
              <div className="max-w-[360px] max-md:max-w-full">
                <h2 className="mb-2 text-xl font-bold text-neutral-900">Language</h2>
                <p className="text-sm text-zinc-500">
                  Choose your preferred language for the apps interface to enhance usability and
                  comfort.
                </p>
              </div>
              <div className="relative">
                <button
                  className="flex gap-2 justify-between items-center px-4 py-3 min-w-[160px] h-11 bg-white border border-solid border-neutral-200 rounded-[999px] hover:border-orange-500 transition-colors max-md:w-full"
                  aria-label="Select language, currently English (US)"
                  aria-haspopup="listbox"
                >
                  <span className="text-sm font-bold text-neutral-900">
                    {profile.preferences.language}
                  </span>
                  <span aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L2.64645 5.85355C2.45118 5.65829 2.45118 5.34171 2.64645 5.14645C2.84171 4.95118 3.15829 4.95118 3.35355 5.14645L8 9.79289L12.6464 5.14645C12.8417 4.95118 13.1583 4.95118 13.3536 5.14645C13.5488 5.34171 13.5488 5.65829 13.3536 5.85355L8.35355 10.8536Z"
                        fill="#121212"
                      />
                    </svg>
                  </span>
                </button>
                {/* Dropdown would go here */}
              </div>
            </div>

            {/* Date Format Preference */}
            <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
              <div className="max-w-[360px] max-md:max-w-full">
                <h2 className="mb-2 text-xl font-bold text-neutral-900">Date Format</h2>
                <p className="text-sm text-zinc-500">
                  Select the format in which you want dates to be displayed.
                </p>
              </div>
              <div className="relative">
                <button
                  className="flex gap-2 justify-between items-center px-4 py-3 min-w-[160px] h-11 bg-white border border-solid border-neutral-200 rounded-[999px] hover:border-orange-500 transition-colors max-md:w-full"
                  aria-label="Select date format, currently DD/MM/YYYY"
                  aria-haspopup="listbox"
                >
                  <span className="text-sm font-bold text-neutral-900">
                    {profile.preferences.dateFormat}
                  </span>
                  <span aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L2.64645 5.85355C2.45118 5.65829 2.45118 5.34171 2.64645 5.14645C2.84171 4.95118 3.15829 4.95118 3.35355 5.14645L8 9.79289L12.6464 5.14645C12.8417 4.95118 13.1583 4.95118 13.3536 5.14645C13.5488 5.34171 13.5488 5.65829 13.3536 5.85355L8.35355 10.8536Z"
                        fill="#121212"
                      />
                    </svg>
                  </span>
                </button>
                {/* Dropdown would go here */}
              </div>
            </div>

            {/* Timezone Preference */}
            <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
              <div className="max-w-[360px] max-md:max-w-full">
                <h2 className="mb-2 text-xl font-bold text-neutral-900">Timezone</h2>
                <p className="text-sm text-zinc-500">
                  Set your preferred timezone for accurate time tracking.
                </p>
              </div>
              <div className="relative">
                <button
                  className="flex gap-2 justify-between items-center px-4 py-3 min-w-[160px] h-11 bg-white border border-solid border-neutral-200 rounded-[999px] hover:border-orange-500 transition-colors max-md:w-full"
                  aria-label="Select timezone, currently set to Automatically"
                  aria-haspopup="listbox"
                >
                  <span className="text-sm font-bold text-neutral-900">
                    {profile.preferences.timezone}
                  </span>
                  <span aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L2.64645 5.85355C2.45118 5.65829 2.45118 5.34171 2.64645 5.14645C2.84171 4.95118 3.15829 4.95118 3.35355 5.14645L8 9.79289L12.6464 5.14645C12.8417 4.95118 13.1583 4.95118 13.3536 5.14645C13.5488 5.34171 13.5488 5.65829 13.3536 5.85355L8.35355 10.8536Z"
                        fill="#121212"
                      />
                    </svg>
                  </span>
                </button>
                {/* Dropdown would go here */}
              </div>
            </div>

            {/* Currency Preference */}
            <div className="flex justify-between items-center max-md:flex-col max-md:gap-3 max-md:items-start">
              <div className="max-w-[360px] max-md:max-w-full">
                <h2 className="mb-2 text-xl font-bold text-neutral-900">Currency</h2>
                <p className="text-sm text-zinc-500">
                  Choose your preferred currency for transactions and financial displays.
                </p>
              </div>
              <div className="relative">
                <button
                  className="flex gap-2 justify-between items-center px-4 py-3 min-w-[160px] h-11 bg-white border border-solid border-neutral-200 rounded-[999px] hover:border-orange-500 transition-colors max-md:w-full"
                  aria-label="Select currency, currently USD ($)"
                  aria-haspopup="listbox"
                >
                  <span className="text-sm font-bold text-neutral-900">
                    {profile.preferences.currency}
                  </span>
                  <span aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L2.64645 5.85355C2.45118 5.65829 2.45118 5.34171 2.64645 5.14645C2.84171 4.95118 3.15829 4.95118 3.35355 5.14645L8 9.79289L12.6464 5.14645C12.8417 4.95118 13.1583 4.95118 13.3536 5.14645C13.5488 5.34171 13.5488 5.65829 13.3536 5.85355L8.35355 10.8536Z"
                        fill="#121212"
                      />
                    </svg>
                  </span>
                </button>
                {/* Dropdown would go here */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserOnboarding;
