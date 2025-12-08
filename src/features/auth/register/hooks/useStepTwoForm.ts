import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { StepTwoSchema, TStepTwoeFormData } from "../schemas/StepTwoFormSchema";
import { useMentorOnboarding } from "@/contexts/MentorOnboardingContext";
import { useOnboarding } from "@/contexts/BoardingContext";

export const useStepTwoForm = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { isValid, errors, isLoading },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(StepTwoSchema),
    defaultValues: {
      gender: "",
      phoneNumber: "",
      city: "",
      bio: "",
    },
  });
  const { nextStep, prevStep } = useRegisterSteps();
  const { draft, setDraft } = useOnboarding();

  // hydrate form from draft if available
  React.useEffect(() => {
    if ("gender" in draft || "phoneNumber" in draft || "country" in draft || "bio" in draft) {
      const values = {
        gender: draft.gender || "",
        phoneNumber: draft.phoneNumber || "",
        city: draft.country || "",
        bio: draft.bio || "",
      };
      // reset the form with persisted values so RHF validation/state updates correctly
      reset(values);
      // trigger validation so `isValid` updates after hydration
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: TStepTwoeFormData) => {
    // persist partial mentor data into onboarding draft
    setDraft({
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      country: data.city,
      bio: data.bio,
    });

    // move to next sub-step (3.x flow)
    nextStep(1.1);
  };

  const onBack = () => {
    prevStep(1);
  };

  return {
    register,
    control,
    watch,
    handleSubmit,
    onSubmit,
    onBack,
    errors,
    setValue,
    isLoading,
    isValid,
  };
};
