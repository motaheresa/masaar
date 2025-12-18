// src/components/atoms/OutlinePasswordField.tsx
"use client";

import React, { useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type IOutlinePasswordFieldProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<any>;
  name: string;
  className?: string;
  icon?: React.ReactElement;
  isRequired?: boolean;
};

export const OutlinePasswordField = ({
  label,
  id,
  placeholder,
  error,
  register,
  name,
  className = "",
  icon,
  isRequired = false,
}: IOutlinePasswordFieldProps) => {
  const [isPassShown, setIsPassShown] = useState(false);
  const [apiErr, setApiErr] = useState<string | null>(null);

  // Read API error from sessionStorage on mount and when name changes
  useEffect(() => {
    const storedErr = sessionStorage.getItem(`api-error-${name}`);
    setApiErr(storedErr);
  }, [name]);

  const handleChange = () => {
    setApiErr(null);
    sessionStorage.removeItem(`api-error-${name}`);
  };

  const displayError = apiErr || error;
  const registerProps = register(name, { required: isRequired });

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
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
          id={id}
          type={isPassShown ? "text" : "password"}
          placeholder={placeholder}
          {...registerProps}
          onChange={(e) => {
            registerProps.onChange(e);
            handleChange();
          }}
          className={`block w-full ${icon ? "ps-9" : "ps-3"
            } pe-10 py-3.5 border-b-2 ${displayError ? "border-red-500 ring-red-500 bg-red-100" : "border-primary"
            } text-gray-900 text-sm focus:ring-2 ring-primary outline-none placeholder:text-gray-400 ${className}`}
        />

        {/* Eye toggle button */}
        <button
          type="button"
          onClick={() => setIsPassShown(!isPassShown)}
          className="absolute inset-y-0 end-0 flex items-center pe-3 text-primary hover:text-primary-hover transition-colors"
        >
          {isPassShown ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>

      {displayError && <span className="text-sm text-red-500">{displayError}</span>}
    </div>
  );
};
