"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

export interface TestimonialCardProps {
  id: string | number;
  quote: string;
  author: string;
  role: string;
  image?: StaticImageData | string;
  className?: string;
}

export const TestimonialCard = ({
  id,
  quote,
  author,
  role,
  image,
  className = "",
}: TestimonialCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 flex flex-col h-full ${className}`}
    >
      {/* Quote */}
      <p className="text-gray-600 italic text-sm leading-relaxed mb-6 flex-1">
        "{quote}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        {/* Avatar */}
        {image && (
          <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
                src={image}
                alt={author}
                width={48}
                height={48}
                className="object-cover"
              />
          </div>
        )}

        {/* Author Details */}
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">{author}</h4>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
