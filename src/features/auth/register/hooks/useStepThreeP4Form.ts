import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { useMentorOnboarding } from "@/contexts/MentorOnboardingContext";
import { registerApi } from "../api/registerApi";
import { toast } from "react-toastify";
import { toastConfig } from "@/config/toastConfig";
import { Id } from "react-toastify";
import {
  StepThreeP4Schema,
  TStepThreeP4FormData,
} from "../schemas/StepThreeP4FormSchema";
import { useRouter } from "next/navigation";
import { getLanguages } from "../utils/getLanguages";

export type LanguageInput = {
  id: string;
  name: string;
  proficiency?: "NATIVE" | "FLUENT" | "INTERMEDIATE" | "BASIC";
};

export const useStepThreeP4Form = () => {
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
    resolver: zodResolver(StepThreeP4Schema),
    defaultValues: {
      // remove prepopulated languages; start empty so user chooses explicitly
      languages: [],
      linkedinUrl: "",
      githubUrl: "",
    },
  });

  const { nextStep, goToStep } = useRegisterSteps();
  const { draft, setDraft, clearDraft, setServerErrors } =
    useMentorOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languagesOptions, setLanguagesOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);

  // hydrate from draft and fetch languages
  React.useEffect(() => {
    const hydrate = async () => {
      // Fetch languages from API first so we can resolve stored languageIds to names
      let fetchedLangs: Array<{ id: string; name: string }> = [];
      try {
        const { data } = await getLanguages();
        fetchedLangs = data?.languages || [];
        setLanguagesOptions(fetchedLangs);
      } catch (error) {
        console.log("Error fetching languages:", error);
      }

      if (draft) {
        const values = {
          languages: Array.isArray((draft as any).languages)
            ? (draft as any).languages.map((l: any) => {
                const id = l.languageId || l.id;
                const found = fetchedLangs.find((f) => String(f.id) === String(id));
                return {
                  id: id,
                  name: l.name || (found ? found.name : String(id)),
                  proficiency: l.proficiency || "FLUENT",
                } as LanguageInput;
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

  const onSubmit = async (data: TStepThreeP4FormData) => {
    setIsSubmitting(true);
    let loadingId: Id | null = null;

    try {
      // Show loading toast
      loadingId = toast.loading("Submitting profile...", toastConfig.loading);

      // Persist into draft first (local storage/session)
      try {
        setDraft({
          languages: Array.isArray(data.languages)
            ? data.languages.map((lang: any) => ({
                languageId: lang.id || lang.languageId,
                proficiency: lang.proficiency || "FLUENT",
              }))
            : [],
          linkedinUrl: data.linkedinUrl || undefined,
          githubUrl: data.githubUrl || undefined,
        });
      } catch (e) {
        // ignore
      }

      // Assemble payload from draft - must match backend expectations
      const payload = {
        // Step 1: Personal Info
        phoneNumber: (draft as any)?.phoneNumber,
        
        // Step 2: General Info
        gender: (draft as any)?.gender,
        country: (draft as any)?.country,
        bio: (draft as any)?.bio,
        
        // Step 3.1: Education Details (optional)
        educationLevel: (draft as any)?.educationLevel,
        university: (draft as any)?.university,
        currentYear: (draft as any)?.currentYear,
        avatar: (draft as any)?.avatar,
        
        // Step 3.2: Technical Details
        jobTitle: "asdsad"||(draft as any)?.jobTitle,
        yearsOfExperience: (draft as any)?.yearsOfExperience,
        companyName: (draft as any)?.companyName,
        
        // Step 3.3: Availability & Preferences
        startTime: (draft as any)?.startTime,
        endTime: (draft as any)?.endTime,
        preferredDifficulty: (draft as any)?.preferredDifficulty,
        availableHoursPerWeek: (draft as any)?.availableHoursPerWeek,
        
        // Step 3.4: Social & Languages
        linkedinUrl: data.linkedinUrl || (draft as any)?.linkedinUrl,
        githubUrl: data.githubUrl || (draft as any)?.githubUrl,
        skills: Array.isArray((draft as any)?.skills)
          ? (draft as any).skills
          : [],
        languages: Array.isArray((draft as any)?.languages)
          ? (draft as any).languages
          : [],
      };

      const response = await registerApi.mentorProfile(payload as any);

      if (response.status === "error") {
        // If backend returned field-level validation errors, set them on the form
        const apiErrors = (response as any).errors || {};

        // store server errors in context so other step hooks can apply them to their forms on mount
        try {
          setServerErrors?.(apiErrors as any);
        } catch (e) {
          // ignore
        }

        let firstFieldName: string | null = null;
        if (apiErrors && typeof apiErrors === "object") {
          Object.entries(apiErrors).forEach(([formField, msgs], idx) => {
            const message = Array.isArray(msgs)
              ? msgs.join(" | ")
              : String(msgs || "Invalid input");
            try {
              sessionStorage.setItem(`api-error-${formField}`, message);
              setError(formField as any, { type: "server", message });
              if (!firstFieldName) firstFieldName = formField;
            } catch (e) {
              // ignore if field doesn't exist
            }
          });
        }

        // If we have a first field with error, navigate to the relevant step and focus it
        if (firstFieldName) {
          const reverseFieldMap: Record<string, number> = {
            // Step 1: Personal Info (firstName, lastName)
            firstName: 1,
            lastName: 1,
            // Step 2: General Info (gender, phoneNumber, city, bio)
            gender: 2,
            phoneNumber: 2,
            city: 2,
            bio: 2,
            // Step 3.1: Education Details (educationLevel, university/institution, major/fieldOfStudy, currentYear)
            educationLevel: 3.1,
            university: 3.1,
            institution: 3.1,
            major: 3.1,
            fieldOfStudy: 3.1,
            currentYear: 3.1,
            // Step 3.2: Technical Details (jobTitle, yearsOfExperience, skills for Mentor; skills, learningGoals, preferredTechnologies for Student)
            jobTitle: 3.2,
            yearsOfExperience: 3.2,
            skills: 3.2,
            learningGoals: 3.2,
            preferredTechnologies: 3.2,
            // Step 3.3: Availability & Preferences (startTime, endTime, avatar, preferredDifficulty, availableHoursPerWeek)
            startTime: 3.3,
            endTime: 3.3,
            avatar: 3.3,
            preferredDifficulty: 3.3,
            availableHoursPerWeek: 3.3,
            // Step 3.4: Social & Languages (languages, linkedinUrl, githubUrl)
            languages: 3.4,
            linkedinUrl: 3.4,
            githubUrl: 3.4,
            // Step 3.5: Additional (cv, cvFileName for Mentor; topics, learningPreference for Student)
            cv: 3.5,
            cvFileName: 3.5,
            topics: 3.5,
            learningPreference: 3.5,
          };

          const targetStep = reverseFieldMap[firstFieldName] || 1;
          // navigate directly
          try {
            goToStep(targetStep);
          } catch (e) {
            // fallback: noop
          }

          // focus/scroll the field after navigation
          console.log(
            firstFieldName,
            document.getElementsByName(firstFieldName)
          );

          setTimeout(() => {
            const el =
              document.querySelector(`[name="${firstFieldName}"]`) ||
              (document.getElementsByName(firstFieldName)[0] as
                | HTMLElement
                | undefined);
            console.log("el", el);

            if (
              el &&
              typeof (el as HTMLElement).scrollIntoView === "function"
            ) {
              (el as HTMLElement).scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              try {
                (el as any).focus();
              } catch (e) {
                // ignore
              }
            }
          }, 350);
        }

        const errorMessage =
          response.message || "Failed to submit mentor profile.";
        if (loadingId) {
          toast.update(loadingId, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 6000,
          });
        } else {
          toast.error(errorMessage, toastConfig.error);
        }
        return;
      }

      // success: clear draft and update toast
      if (loadingId) {
        const successMessage =
          response.message || "Profile submitted successfully.";
        toast.update(loadingId, {
          render: successMessage,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }

      clearDraft();

      // advance step after short delay
      setTimeout(() => router.push("/register/cv-upload?role=mentor"), 800);
      // setTimeout(() => nextStep(0.1), 800);
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? error.message
          : "An error occurred while submitting profile.";
      if (loadingId) {
        toast.update(loadingId, {
          render: errMsg,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        toast.error(errMsg, toastConfig.error);
      }
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
    isValid: isValid && !isSubmitting,
    languagesOptions,
  };
};
