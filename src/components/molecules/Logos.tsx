// src/components/molecules/BrandLogo.tsx
import Image from "next/image";
import React from "react";

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export const LoginLogo = ({ className = "", size = "md" }: BrandLogoProps) => {
  const sizes = {
    sm: { svg: "w-8 h-8", text: "text-xl" },
    md: { svg: "w-10 h-10", text: "text-2xl" },
    lg: { svg: "w-24 h-24", text: "text-4xl" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`md:w-80 md:h-24 w-36 h-12 inline-flex relative  items-center gap-2 text-primary ${className}`}>
      <Image src={"/removed-bg-logo.png"} fill loading="eager" fetchPriority="high" alt="MASSAR Logo" />
    </div>
  );
};