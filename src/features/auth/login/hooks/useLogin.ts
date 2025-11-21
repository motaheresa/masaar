"use client"
// src/features/auth/hooks/useLogin.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../schemas/loginSchema";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      console.log("Login data:", data);
      
      // TODO: Replace with actual API call
      // Example:
      // const response = await authApi.login(data);
      // if (response.success) {
      //   // Handle successful login (e.g., redirect, store token)
      // }
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Reset form after successful login
      // reset();
      
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message)
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
    reset,
  };
};