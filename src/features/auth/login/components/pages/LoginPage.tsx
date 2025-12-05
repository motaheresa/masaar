"use client"
// src/components/pages/LoginPage.tsx
import { LoginForm } from "../organisms/LoginForm";
import { useLogin } from "../../hooks/useLogin";
import { AuthLayout } from "../templates/LoginLayout";
import { motion } from "framer-motion";

export const LoginPage = () => {
  const { register, handleSubmit, watch, errors, isLoading, error } = useLogin();

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

  return (
    <AuthLayout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm">
          Please Enter Your Details To Log in
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

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