import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import {
  StepThreeP1Schema,
  TStepThreeFormData,
} from "../schemas/StepThreeP1FormSchema";
import { useMentorOnboarding } from "@/contexts/MentorOnboardingContext";
import { registerApi } from "../api/registerApi";
import { getSkills } from "../utils/getSkills";
import { log } from "node:console";
import { useOnboarding } from "@/contexts/BoardingContext";

export const useStepThreeP1Form = () => {
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
    resolver: zodResolver(StepThreeP1Schema),
    defaultValues: {
      educationLevel: "",
      university: "",
      major: "",
      currentYear: "",
    },
  });
  const { nextStep } = useRegisterSteps();
  const { draft, setDraft } = useOnboarding();

  // hydrate form with persisted draft values
  React.useEffect(() => {
    if ("educationLevel" in draft || "institution" in draft || "fieldOfStudy" in draft || "currentYear" in draft) {
      const values = {
        educationLevel: (draft as any).educationLevel || "",
        university: (draft as any).institution || "",
        major: (draft as any).fieldOfStudy || "",
        currentYear: (draft as any).currentYear || "",
      };
      reset(values);
      trigger();
    }
  }, []);
  const onSubmit = async (data: TStepThreeFormData) => {
    // persist into mentor draft
    console.log("data", data);

    setDraft({
      // map to draft field names used elsewhere
      educationLevel: data.educationLevel,
      institution: data.university,
      fieldOfStudy: data.major,
      currentYear: data.currentYear,
    });
    // i will make this call to fetch skills options here so that they are ready by the time we reach step 3.3
    try {
      await getSkills();
    } catch (error) {
      console.log("Error fetching skills:", error);
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
