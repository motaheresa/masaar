import { MentorOnboardingProvider } from "@/contexts/MentorOnboardingContext";
import { StudentOnboardingProvider } from "@/contexts/StudentOnboardingContext";
import { PublicOnboardingProvider } from "@/contexts/PublicOnboardingContext";
import { RegisterStepsProvider } from "@/contexts/RegisterStepsContext";
import { SignupSidebar } from "@/features/auth/register/components/organisms/SignupSidebar";
import React from "react";
import { OnboardingProvider } from "@/contexts/BoardingContext";

type RegisterLayoutProps = {
  children: React.ReactNode;
};

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
  return (
    <RegisterStepsProvider>
      <MentorOnboardingProvider>
        <PublicOnboardingProvider>
          <StudentOnboardingProvider>
            <OnboardingProvider>
          <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
            {/* Left Sidebar - Step Progress */}
            <SignupSidebar />

            {/* Right Content - Form */}
            {children}
          </div>
          </OnboardingProvider>
          </StudentOnboardingProvider>
        </PublicOnboardingProvider>
      </MentorOnboardingProvider>
    </RegisterStepsProvider>
  );
};

export default RegisterLayout;
