// src/components/molecules/FormDivider.tsx
import React from "react";

type FormDividerProps = {
  text?: string;
  delay?: number;
};

export const FormDivider = ({ text = "or continue with", delay = 0 }: FormDividerProps) => {
  // We'll use inline styles for dynamic delays if needed, or just simplifying
  return (
    <div
      className="relative my-6 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 flex items-center">
        <div
          className="w-full border-t border-gray-300 origin-left animate-scale-in"
          style={{ animationDelay: `${delay + 0.1}s` }}
        />
      </div>
      <div className="relative flex justify-center text-sm">
        <span
          className="px-4 bg-white text-gray-500 animate-scale-in"
          style={{ animationDelay: `${delay + 0.3}s` }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};