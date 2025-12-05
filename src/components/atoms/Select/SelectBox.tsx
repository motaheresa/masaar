import React, { useState, useEffect } from "react";
import { UseFormRegister } from "react-hook-form";

type ISelectBoxProps = {
  label?: string;
  id?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<any>;
  name?: string;
  className?: string;
  options: Array<{ value: string; label: string }>;
  isRequired?: boolean;
};

export const SelectBox = ({
  label,
  id,
  placeholder,
  error,
  register,
  name = "",
  className = "",
  options,
  isRequired = false,
}: ISelectBoxProps) => {
  const [apiErr, setApiErr] = useState<string | null>(null);

  // Read API error from sessionStorage on mount and when name changes
  useEffect(() => {
    const storedErr = sessionStorage.getItem(`api-error-${name}`)||null;
    setApiErr(storedErr);
  }, [name]);

  const handleChange = () => {
    setApiErr(null);
    sessionStorage.removeItem(`api-error-${name}`);
  };

  console.log("apiErr",apiErr,"error",error);
  

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
      <select
        id={id}
        defaultValue=""
        {...register(name)}
        onChange={handleChange}
        required={isRequired}
        className={`block w-full px-3 py-3.5 border border-primary border-2 rounded-sm 
          text-gray-900 text-sm focus:ring-2  focus:border-transparent 
          outline-none placeholder:text-gray-500 appearance-none bg-white bg-no-repeat 
          bg-right pr-10 cursor-pointer ${displayError ? "border-red-500 ring-red-500 bg-red-50" : "focus:ring-primary"} ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {displayError && <span className="text-sm text-red-500 mt-1 block">{displayError}</span>}
    </div>
  );
};
