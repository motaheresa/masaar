"use client";
import { createContext, useContext, useEffect, useState } from "react";

const BoardingContext = createContext(undefined);

export type OnboardingDraft = {
  // Personal / contact
  firstName?: string;
  lastName?: string;
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
  skills?: Array<{
    id: string;
    name?: string;
    level?: string;
    yearsOfExp?: number;
  }>;
  languages?: Array<{ id: string; proficiency?: string }>;

  // Preferences & availability
  preferredDifficulty?: string;
  startTime?: string;
  endTime?: string;

  // Social
  linkedinUrl?: string;
  githubUrl?: string;
};

const STORAGE_KEY = "OnboardingDraft";
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [draft, setDraftState] = useState<OnboardingDraft>(() => {
    try {
      if (typeof window === "undefined") return {};
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      // ignore
    }
  }, [draft]);

  const setDraft = (d: Partial<OnboardingDraft>) => {
    setDraftState((prev) => ({ ...prev, ...d }));
  };

  const replaceDraft = (d: OnboardingDraft) => {
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

  return (
    <BoardingContext.Provider value={{ draft, setDraft, replaceDraft, clearDraft }}>
      {children}
    </BoardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(BoardingContext);
    if (context === undefined) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
}

export default BoardingContext;
