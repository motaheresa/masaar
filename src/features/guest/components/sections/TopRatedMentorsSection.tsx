"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionTitle, MentorCard, type MentorCardProps } from "../atoms";
import mentorImage from "@/assets/images/mentor-1.jpg";

const MENTORS_DATA: MentorCardProps[] = [
  {
    id: 1,
    name: "John Doe",
    title: "Full-Stack Developer",
    description: "Expert at front-end and back-end development ",
    rating: 4.3,
    reviews: 43,
    image: mentorImage,
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "React Developer",
    description: "Expert at React Javascript Framework",
    rating: 5.0,
    reviews: 60,
    image: mentorImage,
  },
  {
    id: 3,
    name: "Samuel Lee",
    title: "Nodejs Developer",
    description: "Expert at Nodejs Javascript Backend Environment",
    rating: 3.0,
    reviews: 30,
    image: mentorImage,
  },
];

export const TopRatedMentorsSection = () => {
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
      className="w-full  px-6 md:px-12 lg:px-24 py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <SectionTitle
            title="Meet Our Top-Rated Mentors"
            className="mb-12 md:mb-16"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MENTORS_DATA.map((mentor) => (
            <motion.div
              key={mentor.id}
              variants={itemVariants}
            >
              <MentorCard
                {...mentor}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default TopRatedMentorsSection;
