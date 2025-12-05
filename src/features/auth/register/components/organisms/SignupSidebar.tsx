"use client";
import React, { use } from "react";
import { motion } from "framer-motion";
import { FaRegCircleCheck, FaUser } from "react-icons/fa6";
import { LoginLogo } from "@/components/molecules/Logos";
import ProgressStep from "../molecules/SidebarStep";
import { IoBookOutline } from "react-icons/io5";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";


export const SignupSidebar =()=> {
  const { step } = useRegisterSteps();
  if(step > 2)return null
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full lg:w-[520px] md:bg-gradient-to-br rounded-r-xl from-primary via-teal-500 to-primary-hover p-8 pb-0 lg:p-10 lg:flex hidden md:flex-col md:min-h-screen lg:h-full md:sticky top-0 "
    >
      {/* Logo and Branding */}
      <div className="mb-12 md:block hidden">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <LoginLogo variant="primary" size="sm" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl lg:text-xl font-bold text-white leading-tight mb-2">
            Unlock Your Code Potential.
          </h2>
          <p className="text-xl lg:text-lg font-semibold text-white/90 leading-tight">
            Connect with experts Mentors
          </p>
        </motion.div>
      </div>

      {/* Steps Progress */}
      <div className="space-y-3 flex-1 flex md:flex-col justify-center md:items-start items-center">
        {/* Step 1 - Account Setup */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-start gap-4"
        >
          <ProgressStep
            currentStep={step}
            progressStepVal={1}
            text="Account Setup"
            Icon={FaUser}
          />
        </motion.div>

        {/* Connector Line */}
        <div className="md:ml-5.5 md:h-12 h-px md:w-0.75 w-1/2  md:bg-white/30 bg-gray-600" />

        {/* Step 2 - Personal Profile */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-start gap-4"
        >
          <ProgressStep
            currentStep={step}
            progressStepVal={2}
            text="Personal Profile"
            Icon={IoBookOutline}
          />
        </motion.div>

        {/* Connector Line */}
        <div className="md:ml-5.5 md:h-12 h-px md:w-0.75 w-1/2  md:bg-white/30 bg-gray-600" />

        {/* Step 3 - Finish */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-start gap-4 md:mb-0 mb-3"
        >
          <ProgressStep
            currentStep={step}
            progressStepVal={3}
            text="Finish"
            Icon={FaRegCircleCheck}
          />
        </motion.div>

        
      </div>

      {/* Footer - Copyright */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-auto pt-8 border-t border-white/20 md:block hidden"
      >
        <p className="text-white/70 text-sm">
          © 2025 Massark, All rights Servered
        </p>
      </motion.div>
    </motion.div>
  );
};
