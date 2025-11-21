
// src/components/atoms/OutlinePasswordField.tsx
"use client"
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type IOutlinePasswordFieldProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  name: string;
  className?: string;
  icon?: React.ReactElement;
};

export const OutlinePasswordField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  name,
  className = "",
  icon,
}: IOutlinePasswordFieldProps) => {
  const [isPassShown, setIsPassShown] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={isPassShown ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full ${
            icon ? "ps-9" : "ps-3"
          } pe-10 py-3.5 border-b-2 border-primary ${error&&"border-red-500 ring-red-500 bg-red-100"} text-gray-900 text-sm focus:ring-2 ring-primary outline-none placeholder:text-gray-400 ${className}`}
        />
        <button
          type="button"
          onClick={() => setIsPassShown(!isPassShown)}
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-primary hover:text-primary-hover transition-colors"
        >
          {isPassShown ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};