import { useForm } from "react-hook-form";
import { StepOneSchema, TStepOneFormData } from "../schemas/StepOneFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { registerApi } from "../api/registerApi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "@/config/toastConfig";
import { Id } from "react-toastify";

export const useStepOneForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const role = useSearchParams().get("role") || "student";
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { isValid, errors, isLoading },
    setError,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(StepOneSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { nextStep } = useRegisterSteps();

  const onSubmit = async (data: TStepOneFormData) => {
    setIsSubmitting(true);
    let loadingToastId: Id | null = null;
    
    try {
      // Show loading toast
      loadingToastId = toast.loading("Creating your account...", toastConfig.loading);

      const response = await registerApi.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: role.toUpperCase(),
      });

      if (response.status === "error") {
        const errorMessage = response.message || "Registration failed. Please try again.";
        // Update loading toast to error
        toast.update(loadingToastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
        return;
      }

      // Store user info if provided in response
      if (response.data?.user?.id) {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userEmail", response.data.user.email);
        // Store tokens if returned from backend
        if (response.data?.accessToken) {
          registerApi.storeTokens(response.data.accessToken, response.data.refreshToken);
        }
      }

      // Update loading toast to success
      const successMessage = response.message || "Account created successfully! Proceeding to next step.";
      toast.update(loadingToastId, {
        render: successMessage,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Move to next step on success
      setTimeout(() => nextStep(), 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during registration.";
      
      if (loadingToastId) {
        // Update loading toast to error
        toast.update(loadingToastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        // Fallback if loading toast wasn't created
        toast.error(errorMessage, toastConfig.error);
      }
      
      setError("email", {
        type: "manual",
        message: errorMessage,
      });
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
    isLoading: isLoading || isSubmitting,
    isValid: isValid && !isSubmitting,
  };
};
