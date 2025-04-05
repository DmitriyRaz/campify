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
    <div className="flex flex-col gap-3 items-start w-full">
      <label htmlFor={id} className="text-base font-medium leading-5 text-neutral-900">
        {label}
      </label>
      <div className="flex gap-3 items-center px-5 py-4 w-full h-14 bg-white border border-neutral-200 rounded-[999px] focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="flex-1 text-base leading-5 bg-transparent text-neutral-900 placeholder-neutral-300 focus:outline-none"
          aria-required={required}
        />
        {icon && icon}
      </div>
    </div>
  );
};

export default InputField;
