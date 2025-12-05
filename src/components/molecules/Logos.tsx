// src/components/molecules/BrandLogo.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import removedBGLogo from "@/assets/images/removed-bg-logo.png"
import Logo from "@/assets/images/logo.png"

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "colored";
};

export const LoginLogo = ({
  className = "",
  size="lg",
  variant = "primary",
}: BrandLogoProps) => {
  const variants = {
    primary: removedBGLogo,
    colored: Logo,
  };
  const sizes={
    "sm":"md:w-44 md:h-14 w-36 h-12",
    "md":"",
    "lg":"md:w-80 md:h-24 w-36 h-12"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${sizes[size]} inline-flex relative items-center gap-2 text-primary ${className}`}
    >
      <motion.div
        variants={imageVariants}
        className="relative w-full h-full"
      >
        <Image
          src={variants[variant]}
          fill
          loading="eager"
          fetchPriority="high"
          alt="MASSAR Logo"
        />
      </motion.div>
    </motion.div>
  );
};
