"use client";

import React from "react";

export interface FeatureCardProps {
  id: string | number;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  id,
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) => {
  return (
    <div
      className={`flex flex-col items-center text-center ${className}`}
    >
      {/* Icon Container */}
      <div className="mb-6 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
        <div className="text-white text-4xl">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
