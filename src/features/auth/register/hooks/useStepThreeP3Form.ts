import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { useMentorOnboarding } from "@/contexts/MentorOnboardingContext";
import { StepThreeP3Schema, TStepThreeP3FormData } from "../schemas/StepThreeP3FormSchema";

export const useStepThreeP3Form = () => {
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
    resolver: zodResolver(StepThreeP3Schema),
    defaultValues: {
      avatar: "",
      startTime: "",
      endTime: "",
      preferredDifficulty: "",
    },
  });

  const { nextStep } = useRegisterSteps();
  const { draft, setDraft } = useMentorOnboarding();

  // hydrate from draft on mount
  React.useEffect(() => {
    if (draft) {
      const values = {
        avatar: (draft as any).avatar || (draft as any).photo || "",
        startTime: (draft as any).startTime || "",
        endTime: (draft as any).endTime || "",
        preferredDifficulty: (draft as any).preferredDifficulty || "",
      };
      reset(values);
      // update validation state after reset
      trigger();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: TStepThreeP3FormData) => {
    // persist into draft
    try {
      setDraft({
        avatar: data.avatar || undefined,
        startTime: data.startTime || undefined,
        endTime: data.endTime || undefined,
        preferredDifficulty: data.preferredDifficulty || undefined,
      });
    } catch (e) {
      // ignore
    }

    nextStep(0.1);
  };

  return {
    register,
    control,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isLoading,
    isValid,
  };
};
