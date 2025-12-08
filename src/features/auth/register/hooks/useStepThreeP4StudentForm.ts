import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { useStudentOnboarding } from "@/contexts/StudentOnboardingContext";
import { usePublicOnboarding } from "@/contexts/PublicOnboardingContext";
import { registerApi } from "../api/registerApi";
import { toast } from "react-toastify";
import { toastConfig } from "@/config/toastConfig";
import { Id } from "react-toastify";
import {
  StepThreeP4StudentSchema,
  TStepThreeP4StudentFormData,
} from "../schemas/StepThreeP4StudentFormSchema";
import { useRouter } from "next/navigation";
import { getLanguages } from "../utils/getLanguages";
import { getTopics } from "../utils/getTopics";
import { getSkills } from "../utils/getSkills";
import { useOnboarding } from "@/contexts/BoardingContext";

export type LanguageInput = {
  id: string;
  name: string;
  proficiency?: "NATIVE" | "FLUENT" | "INTERMEDIATE" | "BASIC";
};

export type TopicInput = {
  id: string;
  name: string;
};

export type SkillInput = {
  id: string;
  name: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
};

export const useStepThreeP4StudentForm = () => {
  const router = useRouter();
  const {
    register,
    control,
    watch,
    handleSubmit,
    setError,
    setValue,
    reset,
    trigger,
    formState: { isValid, errors, isLoading },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(StepThreeP4StudentSchema),
    defaultValues: {
      languages: [],
      topics: [],
      linkedinUrl: "",
      githubUrl: "",
    },
  });

  const { nextStep, goToStep } = useRegisterSteps();
  const { draft, setDraft, clearDraft, setServerErrors } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languagesOptions, setLanguagesOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);
  const [topicsOptions, setTopicsOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);
  const [skillsOptions, setSkillsOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);

  // hydrate from draft and fetch options
  React.useEffect(() => {
    const hydrate = async () => {
      // Fetch all options first
      let fetchedLangs: Array<{ id: string; name: string }> = [];
      let fetchedTopics: Array<{ id: string; name: string }> = [];
      let fetchedSkills: Array<{ id: string; name: string }> = [];

      try {
        const [langRes, topicRes, skillRes] = await Promise.all([
          getLanguages(),
          getTopics(),
          getSkills(),
        ]);

        fetchedLangs = langRes.data?.languages || [];
        fetchedTopics = topicRes.data?.topics || [];
        fetchedSkills = skillRes.data?.skills || [];

        setLanguagesOptions(fetchedLangs);
        setTopicsOptions(fetchedTopics);
        setSkillsOptions(fetchedSkills);
      } catch (error) {
        console.log("Error fetching options:", error);
      }

    //   transform data
      if (draft && Object.keys(draft).length > 0) {
        const values = {
          languages: Array.isArray((draft as any).languages)
            ? (draft as any).languages.map((l: any) => {
                const id = l.languageId || l.id;
                const found = fetchedLangs.find((f) => String(f.id) === String(id));
                return {
                  id: id,
                  name: l.name || (found ? found.name : String(id)),
                } as LanguageInput;
              })
            : [],
          topics: Array.isArray((draft as any).topics)
            ? (draft as any).topics.map((t: any) => {
                const id = t.topicId || t.id;
                const found = fetchedTopics.find((f) => String(f.id) === String(id));
                return {
                  id: id,
                  name: t.name || (found ? found.name : String(id)),
                } as TopicInput;
              })
            : [],
          linkedinUrl: (draft as any)?.linkedinUrl || "",
          githubUrl: (draft as any)?.githubUrl || "",
        };

        reset(values);
        trigger();
      }
    };

    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: TStepThreeP4StudentFormData) => {
    setIsSubmitting(true);
    let loadingId: Id | null = null;

    try {
      // Show loading toast
      loadingId = toast.loading("Submitting profile...", toastConfig.loading);

      // Persist to draft
      const transofrmedData = {
        languages: (data.languages || []).map((l) => ({
          languageId: l.id,
          name: l.name,
        })),
        topics: (data.topics || []).map((t) => ({
          topicId: String(t.id),
          name: t.name,
        })),
        linkedinUrl: data.linkedinUrl,
        githubUrl: data.githubUrl,
        // static for testing
        learningMode:"MENTOR_LED",
      };

      setDraft(transofrmedData);

      // Transform for API submission
      
      
      const apiPayload = {...draft,...transofrmedData};
      console.log("apiPayload",apiPayload);

      const result = await registerApi.studentProfile(apiPayload as any);

      if (result.status !== "success") {
        if (loadingId) toast.dismiss(loadingId);
        toast.error(
          result.message || "Failed to submit profile",
          toastConfig.error
        );

        if (result.errors) {
          setServerErrors?.(result.errors);
          const errorMessage = Object.entries(result.errors)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n");
          toast.error(errorMessage, toastConfig.error);
        }

        setIsSubmitting(false);
        return;
      }

      if (loadingId) toast.dismiss(loadingId);
      toast.success("Profile submitted successfully!", toastConfig.success);

      // Clear draft on success
      clearDraft();

      // Move to next step
      // nextStep(0.1);
      router.replace("/register/success?role=student");
    } catch (error) {
      if (loadingId) toast.dismiss(loadingId);
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        toastConfig.error
      );
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    control,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isLoading: isLoading || isSubmitting,
    isValid,
    languagesOptions,
    topicsOptions,
    skillsOptions,
  };
};
