// src/domains/auth/components/InputField.tsx
import React, { ReactNode } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  icon,
}) => {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <label htmlFor={id} className="text-sm font-medium leading-5 text-neutral-900">
        {label}
      </label>
      <div className="flex items-center px-4 py-3 w-full bg-white border border-neutral-200 rounded-[32px] focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="flex-1 text-sm bg-transparent text-neutral-900 placeholder-neutral-300 focus:outline-none"
          aria-required={required}
        />
        {icon && <div className="ml-2">{icon}</div>}
      </div>
    </div>
  );
};

export default InputField;
