"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 px-6 md:px-12 lg:px-24 py-12 md:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Left Side (Text Content) */}
      <motion.div className="flex-1 flex flex-col gap-6" variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-5 leading-tight">
            Unlock Your <span className="text-primary">Coding</span>
            <br />
            <span className="text-primary">Potential</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Connect with experts mentors and innovate more !
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            href="/register/role-selection"
            className="inline-block bg-primary text-white font-extrabold py-4 px-8 rounded-tl-lg rounded-br-lg rounded-bl-md rounded-tr-none hover:bg-primary/90 transition-colors duration-300"
          >
            Find Your Mentor
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side (Animated Photo) */}
      <motion.div className="flex-1 flex justify-center" variants={imageVariants}>
        <div className="w-full max-w-[550px] aspect-square">
          <DotLottieReact
            src={"/guestHero.lottie"}
            speed={0.3}
            autoplay
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
