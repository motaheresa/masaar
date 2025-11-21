"use client"
// src/components/pages/LoginPage.tsx
import React, { useState } from "react";
import { LoginSkeleton } from "../components/organisms/LoginSkeleton";
import { LoginForm } from "../components/organisms/LoginForm";
import { useLogin } from "../hooks/useLogin";
import { AuthLayout } from "../components/templates/AuthLayout";

export const LoginPage = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const { register, handleSubmit, watch, errors, isLoading } = useLogin();

  // Handlers for social login
  const handleGoogleSignIn = () => {
    console.log("Initiating Google Sign In...");
    // TODO: Implement Google OAuth
  };

  const handleGithubSignIn = () => {
    console.log("Initiating GitHub Sign In...");
    // TODO: Implement GitHub OAuth
  };

  const handleForgotPassword = () => {
    console.log("Navigating to forgot password...");
    // TODO: Navigate to forgot password page
  };

  const handleSignupClick = () => {
    console.log("Navigating to signup...");
    // TODO: Navigate to signup page
  };

  // Show skeleton loading state
  if (showSkeleton) {
    return <LoginSkeleton />;
  }

  return (
    <AuthLayout
      showBranding={true}
      onBrandingAction={() => setShowSkeleton(!showSkeleton)}
    >
      {/* Page Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm">
          Please Enter Your Details To Log in
        </p>
      </div>

      {/* Login Form */}
      <LoginForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        register={register}
        watch={watch}
        errors={errors}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGithubSignIn}
        onForgotPassword={handleForgotPassword}
        onSignupClick={handleSignupClick}
      />
    </AuthLayout>
  );
};