"use client";
import React, { use } from "react";

import { FaRegCircleCheck, FaUser } from "react-icons/fa6";
import { LoginLogo } from "@/components/molecules/Logos";
import ProgressStep from "../molecules/SidebarStep";
import { IoBookOutline } from "react-icons/io5";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";


export const SignupSidebar = () => {
  const { step } = useRegisterSteps();
  if (step > 2) return null
  return (
    <div
      className="w-full lg:w-[520px] md:bg-gradient-to-br rounded-r-xl from-primary via-teal-500 to-primary-hover p-8 pb-0 lg:p-10 lg:flex hidden md:flex-col md:min-h-screen lg:h-full md:sticky top-0 animate-slide-right"
    >
      {/* Logo and Branding */}
      <div className="mb-12 md:block hidden">
        {/* Logo */}
        <div
          className="flex items-center gap-3 mb-8 animate-scale-in"
          style={{ animationDelay: '0.2s' }}
        >
          <LoginLogo variant="primary" size="sm" />
        </div>

        {/* Tagline */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-2xl lg:text-xl font-bold text-white leading-tight mb-2">
            Unlock Your Code Potential.
          </h2>
          <p className="text-xl lg:text-lg font-semibold text-white/90 leading-tight">
            Connect with experts Mentors
          </p>
        </div>
      </div>

      {/* Steps Progress */}
      <div className="space-y-3 flex-1 flex md:flex-col justify-center md:items-start items-center">
        {/* Step 1 - Account Setup */}
        <div
          className="flex items-start gap-4 animate-slide-right"
          style={{ animationDelay: '0.4s' }}
        >
          <ProgressStep
            currentStep={step}
            progressStepVal={1}
            text="Account Setup"
            Icon={FaUser}
          />
        </div>

        {/* Connector Line */}
        <div className="md:ml-5.5 md:h-12 h-px md:w-0.75 w-1/2  md:bg-white/30 bg-gray-600" />

        {/* Step 2 - Personal Profile */}
        <div
          className="flex items-start gap-4 animate-slide-right"
          style={{ animationDelay: '0.5s' }}
        >
          <ProgressStep
            currentStep={step}
            progressStepVal={2}
            text="Personal Profile"
            Icon={IoBookOutline}
          />
        </div>

        {/* Connector Line */}
        <div className="md:ml-5.5 md:h-12 h-px md:w-0.75 w-1/2  md:bg-white/30 bg-gray-600" />

        {/* Step 3 - Finish */}
        <div
          className="flex items-start gap-4 md:mb-0 mb-3 animate-slide-right"
          style={{ animationDelay: '0.6s' }}
        >
          <ProgressStep
            currentStep={step}
            progressStepVal={3}
            text="Finish"
            Icon={FaRegCircleCheck}
          />
        </div>


      </div>

      {/* Footer - Copyright */}
      <div
        className="mt-auto pt-8 border-t border-white/20 md:block hidden animate-slide-up"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-white/70 text-sm">
          © 2025 Massark, All rights Servered
        </p>
      </div>
    </div>
  );
};
