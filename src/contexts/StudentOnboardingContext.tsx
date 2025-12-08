"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type StudentSkill = {
  skillId: string;
  level: string; // e.g., BEGINNER, INTERMEDIATE, ADVANCED
};

type StudentTopic = {
  topicId: string;
};

type StudentLanguage = {
  languageId: string;
  proficiency: string; // e.g., NATIVE, FLUENT, INTERMEDIATE, BASIC
};

export type StudentOnboardingDraft = {
  phoneNumber?: string;
  gender?: string;
  country?: string;
  bio?: string;
  educationLevel?: string;
  institutionName?: string;
  major?: string;
  yearOfStudy?: string;
  graduationYear?: number;
  learningMode?: string;
  preferredDifficulty?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills?: StudentSkill[];
  topics?: StudentTopic[];
  languages?: StudentLanguage[];
};

type StudentOnboardingContextValue = {
  draft: StudentOnboardingDraft;
  setDraft: (d: Partial<StudentOnboardingDraft>) => void;
  replaceDraft: (d: StudentOnboardingDraft) => void;
  clearDraft: () => void;
  serverErrors?: Record<string, string[]> | null;
  setServerErrors?: (errs: Record<string, string[]> | null) => void;
  clearServerErrors?: () => void;
};

const StudentOnboardingContext = createContext<StudentOnboardingContextValue | undefined>(undefined);

const STORAGE_KEY = "studentOnboardingDraft";

export const StudentOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraftState] = useState<StudentOnboardingDraft>(() => {
    try {
      if (typeof window === "undefined") return {};
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // store server-side validation errors temporarily so other step forms can pick them up
  const [serverErrors, setServerErrorsState] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      // ignore
    }
  }, [draft]);

  const setDraft = (d: Partial<StudentOnboardingDraft>) => {
    setDraftState((prev) => ({ ...prev, ...d }));
  };

  const replaceDraft = (d: StudentOnboardingDraft) => {
    setDraftState(d || {});
  };

  const clearDraft = () => {
    setDraftState({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const setServerErrors = (errs: Record<string, string[]> | null) => {
    setServerErrorsState(errs || null);
  };

  const clearServerErrors = () => setServerErrorsState(null);

  return (
    <StudentOnboardingContext.Provider
      value={{
        draft,
        setDraft,
        replaceDraft,
        clearDraft,
        serverErrors,
        setServerErrors,
        clearServerErrors,
      }}
    >
      {children}
    </StudentOnboardingContext.Provider>
  );
};

export const useStudentOnboarding = () => {
  const context = useContext(StudentOnboardingContext);
  if (!context) {
    throw new Error("useStudentOnboarding must be used within a StudentOnboardingProvider");
  }
  return context;
};

