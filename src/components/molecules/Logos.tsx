// src/components/molecules/BrandLogo.tsx
"use client";
import Image from "next/image";
import removedBGLogo from "@/assets/images/removed-bg-logo.png"
import Logo from "@/assets/images/logo.png"

type BrandLogoProps = {
  className?: string;
  size?: "sm"  | "lg";
  variant?: "primary" | "colored";
};

export const LoginLogo = ({
  className = "",
  size = "lg",
  variant = "primary",
}: BrandLogoProps) => {
  const variants = {
    primary: removedBGLogo,
    colored: Logo,
  };
  const sizes = {
    "sm": "md:w-44 md:h-14 w-24 h-8",
    "lg": "md:w-80 md:h-24 w-36 h-12"
  }

  return (
    <div
      className={`${sizes[size]||""} inline-flex relative items-center gap-2 text-primary animate-fade-in ${className}`}
    >
      <div
        className="relative w-full h-full animate-scale-in"
      >
        <Image
          src={variants[variant]}
          fill
          loading="eager"
          fetchPriority="high"
          alt="MASSAR Logo"
        />
      </div>
    </div>
  );
};
