// contexts/RegisterStepsContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const RegisterStepsContext = createContext();

export const RegisterStepsProvider = ({ children }) => {
  const [step, setStep] = useState(() => {
    if (typeof window !== "undefined") {
      const savedStep = sessionStorage.getItem("registerStep");
      return savedStep ? Number(savedStep) : 1;
    }
    return 1;
  });

  const nextStep = (stepVal = 1) => {
    setStep((prevStep) => {
      const prev = typeof prevStep === "string" ? parseFloat(prevStep) : Number(prevStep);
      const next = Number(((prev || 0) + stepVal).toFixed(1));
      return next;
    });
  };

  const prevStep = (stepVal = 1) => {
    setStep((prevStp) => {
      const prev = typeof prevStp === "string" ? parseFloat(prevStp) : Number(prevStp);
      const next = Number(((prev || 0) - stepVal).toFixed(1));
      return next;
    });
  };

  const goToStep = (value) => {
    setStep(() => {
      const v = typeof value === "string" ? parseFloat(value) : Number(value);
      return v;
    });
  };

  const clearRegistrationProgress = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("registerStep");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("registerStep", String(step));
    }
    return () => {
      clearRegistrationProgress();
    };
  }, [step]);

  return (
    <RegisterStepsContext.Provider
      value={{ step, nextStep, prevStep, goToStep, clearRegistrationProgress }}
    >
      {children}
    </RegisterStepsContext.Provider>
  );
};

export const useRegisterSteps = () => {
  const context = useContext(RegisterStepsContext);
  if (!context) {
    throw new Error(
      "useRegisterSteps must be used within a RegisterStepsProvider"
    );
  }
  return context;
};
