"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaStar } from "react-icons/fa";

export interface MentorCardProps {
  id: string | number;
  name: string;
  title: string;
  description: string;
  image?: StaticImageData | string;
  rating: number;
  reviews: number;
  className?: string;
}

export const MentorCard = ({
  id,
  name,
  title,
  description,
  image,
  rating,
  reviews,
  className = "",
}: MentorCardProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center ${className}`}
    >
      {/* Mentor Image */}
      {image && (
        <div className="mb-4 w-24 h-24 relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {typeof image === "string" ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Image
              src={image}
              alt={name}
              width={96}
              height={96}
              className="object-cover"
            />
          )}
        </div>
      )}

      {/* Mentor Name */}
      <h3 className="text-lg font-bold text-gray-800 mb-1">{name}</h3>

      {/* Mentor Title */}
      <p className="text-primary font-semibold mb-3">{title}</p>

      {/* Rating Stars */}
      <div className="flex items-center justify-center gap-1 mb-2">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" size={16} />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <div key="half" className="relative">
            <FaStar className="text-gray-300" size={16} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <FaStar className="text-yellow-400" size={16} />
            </div>
          </div>
        )}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" size={16} />
        ))}

        {/* Rating Number */}
        <span className="ml-2 text-sm text-gray-700 font-medium">
          ({rating.toFixed(1)})
        </span>
      </div>

      {/* Review Count */}
      <p className="text-xs text-gray-500 mb-4">{reviews} reviews</p>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default MentorCard;
