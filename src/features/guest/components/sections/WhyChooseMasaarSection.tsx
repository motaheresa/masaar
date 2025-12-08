"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaChartLine, FaClock } from "react-icons/fa";
import { SectionTitle, FeatureCard, type FeatureCardProps } from "../atoms";
import { LuUser } from "react-icons/lu";
import { RiPulseFill } from "react-icons/ri";
import { TbClockHour4 } from "react-icons/tb";


const FEATURES_DATA: FeatureCardProps[] = [
  {
    id: 1,
    icon: <LuUser />,
    title: "Personalized Guidance",
    description: "Expert at front-end and back-end development",
  },
  {
    id: 2,
    icon: <RiPulseFill />,
    title: "Career Growth",
    description: "Expert at React Javascript Framework",
  },
  {
    id: 3,
    icon: <TbClockHour4 />,
    title: "Flexible Scheduling",
    description: "Expert at Nodejs Javascript Backend Environment",
  },
];

export const WhyChooseMasaarSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="w-full px-6 md:px-12 lg:px-24 py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <SectionTitle
            title="Why choose Masaark?"
            className="mb-12 md:mb-16"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {FEATURES_DATA.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
            >
              <FeatureCard
                {...feature}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default WhyChooseMasaarSection;
