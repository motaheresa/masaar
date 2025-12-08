"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        // delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <motion.div
        className="w-full  text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <DotLottieReact
          src={"/success.lottie"}
          speed={1}
          autoplay
          style={{ width: 200, height: 200, margin: "0 auto" }}
        />

        {/* Main Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
          variants={textVariants}
        >
          Success
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed"
          variants={textVariants}
        >
          {role === "mentor"
            ? "Your mentor profile has been successfully created. You can now start mentoring students!"
            : "You have successfully created your account."}
        </motion.p>

        {/* Back to Login Button */}
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="w-fit mx-auto"
        >
          <Link
            href="/login"
            className="inline-block w-fit bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-12 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Back to login
          </Link>
        </motion.div>

        {/* Alternative Actions */}
        <motion.div className="mt-8" variants={textVariants}>
          <p className="text-gray-500 text-sm">
            Want to explore?{" "}
            <Link
              href="/"
              className="text-teal-500 font-semibold hover:underline"
            >
              Go to home
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
