"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/organisms/Navbar";

export const GuestHeader = () => {
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="absolute w-full"
      variants={navVariants}
    >
      <Navbar>
        <motion.nav variants={containerVariants} initial="hidden" animate="visible">
          <ul className="flex flex-row items-center gap-6">
            <motion.li variants={linkVariants}>
              <Link
                href="/register"
                className="text-sm md:text-base hover:text-primary hover:underline"
              >
                Find a mentor
              </Link>
            </motion.li>
            <motion.li variants={linkVariants}>
              <Link
                href="/register"
                className="text-sm md:text-base hover:text-primary hover:underline"
              >
                How it works
              </Link>
            </motion.li>
            <motion.li variants={linkVariants}>
              <Link
                href="/register"
                className="text-sm md:text-base hover:text-primary hover:underline"
              >
                Become a mentor
              </Link>
            </motion.li>
          </ul>
        </motion.nav>
        <motion.div
          className="flex items-center gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={linkVariants}>
            <Link
              href="/login"
              className="block hover:bg-primary text-center duration-500 font-bold! py-2 min-w-28 hover:outline-1 outline-primary text-primary rounded-none! rounded-tr-lg! rounded-bl-lg! hover:text-white"
            >
              Login
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link
              href="/register/role-selection"
              className="block hover:bg-transparent font-bold! bg-primary py-2  text-center duration-500 min-w-28 rounded-none!  rounded-tr-lg! rounded-bl-lg! hover:text-primary text-white"
            >
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </Navbar>
    </motion.div>
  );
};

export default GuestHeader;
