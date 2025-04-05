import React from 'react';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple';
  label: string;
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 gap-2 justify-center items-center px-4 py-3 bg-orange-50 cursor-pointer rounded-[999px] max-sm:w-full hover:bg-orange-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      aria-label={label}
    >
      <span className="w-[24px] h-[24px]">
        {provider === 'google' ? (
          // Google icon placeholder
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <span className="text-xs text-gray-500">G</span>
          </div>
        ) : (
          // Apple icon placeholder
          <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
            <span className="text-xs text-gray-500">A</span>
          </div>
        )}
      </span>
      <span className="text-sm font-medium leading-5 text-neutral-900">{label}</span>
    </button>
  );
};

export default SocialLoginButton;
