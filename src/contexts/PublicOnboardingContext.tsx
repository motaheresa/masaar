"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type PublicOnboardingDraft = {
  // Personal / contact
  displayName?: string;
  gender?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;

  // About
  bio?: string;
  avatarUrl?: string;

  // Education (student)
  educationLevel?: string;
  institutionName?: string;
  major?: string;
  currentYear?: string | number;

  // Technical shared pieces
  skills?: Array<{ skillId: string; name?: string; level?: string; yearsOfExp?: number }>;
  languages?: Array<{ languageId: string; proficiency?: string }>;

  // Preferences & availability
  preferredDifficulty?: string;
  startTime?: string;
  endTime?: string;

  // Social
  linkedinUrl?: string;
  githubUrl?: string;
};

type PublicOnboardingContextValue = {
  draft: PublicOnboardingDraft;
  setDraft: (d: Partial<PublicOnboardingDraft>) => void;
  replaceDraft: (d: PublicOnboardingDraft) => void;
  clearDraft: () => void;
  serverErrors?: Record<string, string[]> | null;
  setServerErrors?: (errs: Record<string, string[]> | null) => void;
  clearServerErrors?: () => void;
};

const PublicOnboardingContext = createContext<PublicOnboardingContextValue | undefined>(undefined);

const STORAGE_KEY = "publicOnboardingDraft";

export const PublicOnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraftState] = useState<PublicOnboardingDraft>(() => {
    try {
      if (typeof window === "undefined") return {};
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [serverErrors, setServerErrorsState] = useState<Record<string, string[]> | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      // ignore
    }
  }, [draft]);

  const setDraft = (d: Partial<PublicOnboardingDraft>) => {
    setDraftState((prev) => ({ ...prev, ...d }));
  };

  const replaceDraft = (d: PublicOnboardingDraft) => {
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

  const setServerErrors = (errs: Record<string, string[]> | null) => setServerErrorsState(errs || null);
  const clearServerErrors = () => setServerErrorsState(null);

  return (
    <PublicOnboardingContext.Provider
      value={{ draft, setDraft, replaceDraft, clearDraft, serverErrors, setServerErrors, clearServerErrors }}
    >
      {children}
    </PublicOnboardingContext.Provider>
  );
};

export const usePublicOnboarding = () => {
  const ctx = useContext(PublicOnboardingContext);
  if (!ctx) throw new Error("usePublicOnboarding must be used within PublicOnboardingProvider");
  return ctx;
};

export default PublicOnboardingContext;
