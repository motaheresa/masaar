import { MentorOnboardingProvider } from "@/contexts/MentorOnboardingContext";
import { RegisterStepsProvider } from "@/contexts/RegisterStepsContext";
import { SignupSidebar } from "@/features/auth/register/components/organisms/SignupSidebar";
import React from "react";

type RegisterLayoutProps = {
  children: React.ReactNode;
};

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <RegisterStepsProvider>
      <MentorOnboardingProvider>
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
          {/* Left Sidebar - Step Progress */}
          <SignupSidebar />

          {/* Right Content - Form */}
          {children}
        </div>
      </MentorOnboardingProvider>
    </RegisterStepsProvider>
  );
};

export default RegisterLayout;
