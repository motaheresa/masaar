"use client"
// src/features/auth/hooks/useLogin.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";
import { toast } from "react-toastify";
import { loginApi } from "../api/loginApi";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi.login(data);

      if (response.status === "success" && response.data) {
        // Login successful
        console.log("Login successful:", response.data.user);
        toast.success("Logged in successfully",{
          
        })
        // Redirect to dashboard or home page
        // router.push("/dashboard"); // Change this to your desired route
      } else {
        // Login failed
        setError(response.message);
        toast.error(response.message)
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred")
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    errors,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};