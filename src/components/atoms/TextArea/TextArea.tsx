import React, { useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import { ClassNameValue } from "tailwind-merge";

type ITextAreaProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<any>;
  name?: string;
  className?: ClassNameValue;
  rows?: number;
  isRequired?: boolean;
};

export const TextArea = ({
  label,
  id,
  placeholder,
  error,
  register,
  name = "",
  className = "",
  rows = 4,
  isRequired = false,
}: ITextAreaProps) => {
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

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-semibold text-gray-900"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        {...register(name, { required: isRequired })}
        onChange={(e)=>{
          register(name).onChange(e)
          handleChange()
        }}
        placeholder={placeholder}
        className={`block w-full px-3 py-3.5 border border-gray-300 rounded-lg 
          text-gray-900 text-sm focus:ring-2 focus:ring-teal-400 focus:border-transparent 
          outline-none placeholder:text-gray-500 resize-none ${
          displayError ? "border-red-500 ring-red-500 bg-red-50" : ""
        } ${className}`}
      />
      {displayError && <span className="text-sm text-red-500 mt-1 block">{displayError}</span>}
    </div>
  );
};