"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CTASection = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
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

  return (
    <motion.section
      className="w-full  py-10 pb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div
        className="max-w-4xl rounded-md bg-primary/20 px-6 md:px-12 lg:px-24 py-16 md:py-24  mx-auto text-center"
        variants={containerVariants}
      >
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          variants={itemVariants}
        >
          Ready To Start Your Journey?
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Expert at React Javascript Framework Expert at front-end and
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/register/role-selection"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-sm hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Browse Mentors
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CTASection;
