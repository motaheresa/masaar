// src/components/atoms/OutlineTextField.tsx
import React from "react";
import { UseFormRegister } from "react-hook-form";

type IOutlineTextFieldProps = {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<any>;
  name?: string;
  className?: string;
  icon?: React.ReactElement;
  isRequired?: boolean
};

export const OutlineTextField = ({
  label,
  id,
  type = "text",
  placeholder,
  error,
  register,
  className = "",
  name = "",
  icon,
  isRequired = false
}: IOutlineTextFieldProps) => {

  return (
    <div className="w-full">
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
          type={type}
          {...register(name, { required: isRequired })}
          placeholder={placeholder}
          className={`block w-full ${icon ? "ps-9" : "ps-3"
            } pe-3 py-3.5 border-b-2 ${error ? "border-red-500 ring-red-500 bg-red-100" : "border-primary"} text-gray-900 text-sm focus:ring-2 ring-primary outline-none placeholder:text-gray-400 ${className}`}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};