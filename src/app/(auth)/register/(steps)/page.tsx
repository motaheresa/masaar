"use client";
import StepOneForm from "@/features/auth/register/components/organisms/StepOneForm";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import SignupStepHeader from "@/features/auth/register/components/molecules/SignupStepHeader";
import StepTwoForm from "@/features/auth/register/components/organisms/StepTwoForm";
import ProgressStep from "@/features/auth/register/components/molecules/ProgressStep";
import StepThreeP1Form from "@/features/auth/register/components/organisms/StepThreeP1Form";
import StepThreeP2StudentForm from "@/features/auth/register/components/organisms/StepThreeP2StudentForm";
import { useRouter, useSearchParams } from "next/navigation";
import StepThreeP2MentorForm from "@/features/auth/register/components/organisms/StepThreeP2MentorForm";
import StepThreeP3Form from "@/features/auth/register/components/organisms/StepThreeP3Form";
import StepThreeP4Form from "@/features/auth/register/components/organisms/StepThreeP4Form";
import StepThreeP5StudentForm from "@/features/auth/register/components/organisms/StepThreeP5StudentForm";
import StepThreeP5MentorForm from "@/features/auth/register/components/organisms/StepThreeP5MentorForm";
import { MentorOnboardingProvider } from "@/contexts/MentorOnboardingContext";

import { Button } from "@/components/atoms/Button/Button";

const headers = {
  1: {
    header: "Create Your Account",
    subHeader: "Join Masaar and start your coding journey",
  },
  2: {
    header: "Tell us about yourself",
    subHeader: "Give Us More Information about yourself",
  },
};
const RegisterPage = () => {
  const router = useRouter();

  const { step }: { step: number } = useRegisterSteps();

  const role = useSearchParams().get("role");
  if (!role || (role != "mentor" && role != "student")) {
    return (
      <div className="flex-1 w-full flex flex-col gap-10 items-center justify-center p-6 sm:p-8 lg:p-12 py-0! bg-white">
        <p className="text-gray-600 text-center">
          Invalid role selected. Please go back to role selection.
        </p>
        <Button
          onClick={() => router.replace("/register/role-selection")}
          className="w-1/2!"
        >
          Back
        </Button>
      </div>
    );
  }

  const registerToken = localStorage.getItem("accessToken");
  if (!registerToken && step > 2) {
    router.replace("/register/role-selection");
    return null;
  }

  return (
    <div
      className={`flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 py-0! ${step > 2 ? "bg-gray-50" : "bg-white"
        }`}
    >
      <MentorOnboardingProvider>
        <div className="w-full pt-6 pb-8">
          {/* Page Header */}
          {step <= 2 && (
            <div
              key={`header-${step}`}
              className="animate-slide-right"
            >
              <SignupStepHeader
                header={headers?.[step]?.header}
                subHeader={headers?.[step]?.subHeader}
              />
            </div>
          )}

          {step == 1 && <StepOneForm />}
          {step == 2 && <StepTwoForm />}

          {/* Layout of steps */}
          {step > 2 && (
            <div className="bg-white rounded-md w-full max-w-2xl mx-auto px-4 sm:px-8 md:px-10 py-5 shadow-xl">
              {/* Header ( Progress Bar ) */}
              {step >= 3 && (
                <div
                  key={`progress-${step}`}
                  className="mt-6 mb-10 px-4 md:px-0 animate-slide-up"
                >
                  <ProgressStep step={step} />
                </div>
              )}
              {step == 3.1 && <StepThreeP1Form />}
              {step == 3.2 && role == "student" && <StepThreeP2StudentForm />}
              {step == 3.2 && role == "mentor" && <StepThreeP2MentorForm />}
              {step == 3.3 && <StepThreeP3Form />}
              {step == 3.4 && <StepThreeP4Form />}
              {step == 3.5 && role == "student" && <StepThreeP5StudentForm />}
              {/* {step == 3.5 && role == "mentor" && <StepThreeP5MentorForm />} */}
            </div>
          )}
        </div>
      </MentorOnboardingProvider>
    </div>
  );
};

export default RegisterPage;
