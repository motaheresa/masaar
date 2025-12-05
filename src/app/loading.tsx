"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingImage from "@/assets/images/Loading.gif";

export default function Loading() {
  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full sm:w-3/4 w-11/12 md:max-w-1/2"
      >
        <div className=" p-8 flex flex-col items-center justify-center">
          {/* Loading Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 sm:w-40 sm:h-40 mb-6"
          >
            <Image
              src={LoadingImage}
              alt="Loading"
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-center text-sm sm:text-base font-medium"
          >
            Please wait...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}