"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Skill = {
  skillId: string;
  level: string; // e.g., ADVANCED, INTERMEDIATE
  yearsOfExp?: number;
};

type Language = {
  languageId: string;
  proficiency: string; // e.g., NATIVE, FLUENT
};

export type MentorProfileDraft = {
  phoneNumber?: string;
  gender?: string;
  country?: string;
  bio?: string;
  jobTitle?: string;
  yearsOfExperience?: number;
  companyName?: string;
  availableHoursPerWeek?: number;
  startTime?: string;
  endTime?: string;
  preferredDifficulty?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills?: Skill[];
  languages?: Language[];
};

type MentorOnboardingContextValue = {
  draft: MentorProfileDraft;
  setDraft: (d: Partial<MentorProfileDraft>) => void;
  replaceDraft: (d: MentorProfileDraft) => void;
  clearDraft: () => void;
  // server-side validation errors collected after final submit attempt
  serverErrors?: Record<string, string[]> | null;
  setServerErrors?: (errs: Record<string, string[]> | null) => void;
  clearServerErrors?: () => void;
};

const MentorOnboardingContext = createContext<MentorOnboardingContextValue | undefined>(undefined);

const STORAGE_KEY = "mentorOnboardingDraft";

export const MentorOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraftState] = useState<MentorProfileDraft>(() => {
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

  const setDraft = (d: Partial<MentorProfileDraft>) => {
    setDraftState((prev) => ({ ...prev, ...d }));
  };

  const replaceDraft = (d: MentorProfileDraft) => {
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
    <MentorOnboardingContext.Provider value={{ draft, setDraft, replaceDraft, clearDraft, serverErrors, setServerErrors, clearServerErrors }}>
      {children}
    </MentorOnboardingContext.Provider>
  );
};

export const useMentorOnboarding = () => {
  const ctx = useContext(MentorOnboardingContext);
  if (!ctx) throw new Error("useMentorOnboarding must be used within MentorOnboardingProvider");
  return ctx;
};

export default MentorOnboardingContext;
