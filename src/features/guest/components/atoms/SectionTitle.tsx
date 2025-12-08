"use client";

import React from "react";

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  underlineClassName?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  centered = true,
  className = "",
  underlineClassName = "",
}: SectionTitleProps) => {
  return (
    <div className={`w-fit mx-auto ${centered ? "text-center" : ""} mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block w-full">
        {title}
        <div
          className={`h-1 w-3/5 bg-primary absolute -bottom-3 left-1/2 transform -translate-x-1/2 mt-2 ${underlineClassName}`}
          
        />
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg mt-6">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
