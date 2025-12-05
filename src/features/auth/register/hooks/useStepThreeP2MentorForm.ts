import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { useMentorOnboarding } from "@/contexts/MentorOnboardingContext";
import {
  StepThreeP2MentorSchema,
  TStepThreeP2MentorFormData,
} from "../schemas/StepThreeP2MentorFormSchema";
import { getSkills } from "../utils/getSkills";

export type SkillInput = {
  id: string;
  name: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  yearsOfExp?: number;
};

export const useStepThreeP2MentorForm = () => {
  const {
    register,
    control,
    watch,
    reset,
    trigger,
    handleSubmit,
    setValue,
    formState: { isValid, errors, isLoading },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(StepThreeP2MentorSchema),
    defaultValues: {
      jobTitle: [],
      yearsOfExperience: "",
      skills: [],
    },
  });

  const { nextStep } = useRegisterSteps();
  const { draft, setDraft } = useMentorOnboarding();
  const [skillsOptions, setSkillsOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);

  // hydrate form with persisted draft values
  React.useEffect(() => {
    const hydrate = async () => {
      // fetch skills first so we can resolve names for stored skillIds
      let fetchedSkills: Array<{ id: string; name: string }> = [];
      try {
        const { data } = await getSkills();
        fetchedSkills = data?.skills || [];
        setSkillsOptions(fetchedSkills);
      } catch (error) {
        console.log("Error fetching skills:", error);
      }

      if (draft) {
        const values = {
          jobTitle: Array.isArray((draft as any).jobTitle)
            ? (draft as any).jobTitle
            : (draft as any).jobTitle
            ? [
                {
                  id: Date.now(),
                  name: (draft as any).jobTitle,
                },
              ]
            : [],
          yearsOfExperience: (draft as any).yearsOfExperience
            ? String((draft as any).yearsOfExperience)
            : "",
          skills: Array.isArray((draft as any).skills)
            ? (draft as any).skills.map((s: any) => {
                const id = s.skillId || s.id;
                const found = fetchedSkills.find((fs) => String(fs.id) === String(id));
                return {
                  id: id,
                  name: s.name || (found ? found.name : String(id)),
                  level: s.level || "INTERMEDIATE",
                  yearsOfExp: s.yearsOfExp || 0,
                } as SkillInput;
              })
            : [],
        };

        reset(values);
        // ensure validity updates after hydration
        trigger();
      }
    };

    hydrate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: TStepThreeP2MentorFormData) => {
    // persist into mentor draft
    try {
      setDraft({
        jobTitle: Array.isArray(data.jobTitle)
          ? data.jobTitle.map((t) => t.name).join(", ")
          : String(data.jobTitle || ""),
        yearsOfExperience: data.yearsOfExperience
          ? parseInt(String(data.yearsOfExperience), 10)
          : undefined,
        skills: Array.isArray(data.skills)
          ? data.skills.map((t) => ({
              skillId: String(t.id),
              level: t.level || "INTERMEDIATE",
              yearsOfExp: t.yearsOfExp || 0,
            }))
          : [],
      });
    } catch (e) {
      // ignore mapping errors
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
    skillsOptions,
  };
};
