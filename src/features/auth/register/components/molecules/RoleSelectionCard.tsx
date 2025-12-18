
"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

import { useRouter } from "next/navigation";

type RoleSelectionCardProps = {
  Img: StaticImageData;
  title: string;
  text: string;
  role: "mentor" | "student";
  index: number;
};

const RoleSelectionCard = ({
  Img,
  title,
  text,
  role,
  index,
}: RoleSelectionCardProps) => {
  const router = useRouter();

  const handleRoleSelect = () => {
    router.replace(`/register?role=${role}`);
  };

  return (
    <button
      onClick={handleRoleSelect}
      className="w-full max-w-[400px] shadow-lg  md:text-start text-center group md:min-h-[280px] px-8 md:py-10 py-4 bg-white rounded-2xl cursor-pointer transition-shadow duration-300 hover:shadow-2xl group flex flex-col hover:-translate-y-2 hover:scale-[1.01] active:scale-[0.98] transition-transform animate-scale-in"
      style={{
        // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Icon */}
      <div
        className="md:mb-6 mb-3 w-fit mx-auto md:mx-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
      >
        <Image
          src={Img}
          width={56}
          height={56}
          alt={title}
          className="object-contain md:w-14 md:h-14 w-10 h-10"
        />
      </div>

      {/* Title */}
      <h2 className="font-bold md:text-2xl sm:text-xl text-lg text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed font-medium flex-1">
        {text}
      </p>

      <div className="h-1 bg-gray-200 relative rounded-full md:mt-6 mt-2 overflow-hidden hidden md:flex">
        <div className="absolute left-0 top-0 h-full w-full bg-primary origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </button>
  );
};

export default RoleSelectionCard;
