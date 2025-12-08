"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { useStudentOnboarding } from "@/contexts/StudentOnboardingContext";
import { usePublicOnboarding } from "@/contexts/PublicOnboardingContext";
import {
  StepThreeP2StudentSchema,
  TStepThreeP2StudentFormData,
} from "../schemas/StepThreeP2StudentFormSchema";
import { getSkills } from "../utils/getSkills";
import { useOnboarding } from "@/contexts/BoardingContext";
import { getTopics } from "../utils/getTopics";

export type SkillInput = {
  id: string;
  name: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
};

export type TopicInput = {
  id: string;
  name: string;
};

export const useStepThreeP2Form = () => {
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
    resolver: zodResolver(StepThreeP2StudentSchema),
    defaultValues: {
      topics: [],
      skills: [],
      learningGoals: [],
      preferredTechnologies: [],
    },
  });
  console.log(watch());

  const { nextStep } = useRegisterSteps();
  const { draft, setDraft } = useOnboarding();
  // const { setDraft: setPublicDraft } = usePublicOnboarding();
  const [skillsOptions, setSkillsOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);
  const [topicsOptions, setTopicsOptions] = React.useState<
    Array<{ id: string; name: string }>
  >([]);

  // hydrate form with persisted draft values
  React.useEffect(() => {
    const hydrate = async () => {
      // fetch skills first so we can resolve names for stored skillIds
      let fetchedSkills: Array<{ id: string; name: string }> = [];
      try {
        const { data } = await getSkills();
        const { data: TopicsOptions } = await getTopics();
        fetchedSkills = data?.skills || [];
        setSkillsOptions(fetchedSkills);
        setTopicsOptions(TopicsOptions?.topics || []);
      } catch (error) {
        console.log("Error fetching skills:", error);
      }

      if ("topics" in draft || "skills" in draft || "learningGoals" in draft || "preferredTechnologies" in draft) {
        const values = {
          topics: Array.isArray((draft as any).topics)
            ? (draft as any).topics.map((s: any) => {
                return {
                  id: s.topicId || s.id,
                  name: s.name,
                } as TopicInput;
              })
            : [],
          skills: Array.isArray((draft as any).skills)
            ? (draft as any).skills.map((s: any) => {
               return {
                  id: s.skillId || s.id,
                  name: s.name,
                } as TopicInput;
              })
            : [],
          learningGoals: Array.isArray((draft as any).learningGoals)
            ? (draft as any).learningGoals.map((s: any) => {
                return {
                  id: s.skillId || s.id,
                  name: s.name,
                } as TopicInput;
              })
            : [],
          preferredTechnologies: Array.isArray(
            (draft as any).preferredTechnologies
          )
            ? (draft as any).preferredTechnologies.map((s: any) => {
                return {
                  id: s.skillId || s.id,
                  name: s.name,
                } as TopicInput;
              })
            : [],
        };
        console.log("values✍", values);

        reset(values);
        // ensure validity updates after hydration (run after next microtask)
        trigger();
      }
    };

    hydrate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: TStepThreeP2StudentFormData) => {
    // persist into student draft (only student-specific fields)
    try {
      const studentDraft = {
        topics: (data.topics || []).map((t) => ({
          topicId: t.id,
          name: t.name,
        })),
        learningGoals: data.learningGoals || [],
        preferredTechnologies: data.preferredTechnologies || [],
      };

      setDraft(studentDraft);

      // Move skills into public draft to avoid duplication between contexts
      try {
        const publicSkills = Array.isArray(data.skills)
          ? data.skills.map((s) => ({
              skillId: String(s.id),
              name: s.name,
              level: (s as SkillInput).level || "INTERMEDIATE",
              yearsOfExp: (s as any).yearsOfExp || undefined,
            }))
          : [];

        // setPublicDraft will be provided by provider tree
        try {
          // lazy import/use: get hook via context usage at top
        } catch (e) {
          // ignore
        }

        // call setPublicDraft if available (we'll retrieve it from hook above)
        // (the hook value is attached below after imports)
        (setDraft as any)?.({ skills: publicSkills });
      } catch (e) {
        // ignore
      }

      console.log("Student Step 2 Form Data persisted:", studentDraft);
      nextStep(0.1);
    } catch (error) {
      console.error("Error in onSubmit:", error);
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
    isLoading,
    isValid,
    skillsOptions,
    topicsOptions,
  };
};
