"use client";
import React, { useState, useEffect } from "react";

export interface TimeInputProps {
  label?: string;
  name: string;
  register?: any;
  error?: string;
  className?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  label,
  name,
  register,
  error,
  className = "",
}) => {
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
    <div className={className}>
      {label && <label className="block text-xs text-gray-700 mb-2">{label}</label>}
      <input
        type="time"
        {...(register ? register(name) : {})}
        onChange={handleChange}
        className={`w-full border rounded-md px-3 py-2 ${displayError ? "border-red-500 bg-red-50" : "border-gray-200"}`}
      />
      {displayError && <p className="text-xs text-red-500 mt-2">{displayError}</p>}
    </div>
  );
};

export default TimeInput;
