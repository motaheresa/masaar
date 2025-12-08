"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SearchInput, SectionTitle } from "../atoms";

export const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="w-full bg-white px-6 md:px-12 lg:px-24 py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="max-w-4xl mx-auto" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <SectionTitle
            title="Find The Perfect Mentor For You"
            className="mb-8"
            underlineClassName="hidden"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SearchInput
            placeholder="Search by Language , Skills , Name.... ( e.g JavaScript , React )"
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            containerClassName=""
            className="shadow-md hover:shadow-lg transition-shadow  py-3 border-none! bg-[#F5F5F5]!"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SearchSection;
