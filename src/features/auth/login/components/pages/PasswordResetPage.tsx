// src/components/pages/PasswordResetPage.tsx
"use client"
import { usePasswordReset } from "../../hooks/usePasswordReset";
import { PasswordResetForm } from "../organisms/PasswordResetForm";

export const PasswordResetPage = () => {
  const { register, handleSubmit, errors, isLoading, isSuccess, error } = usePasswordReset();

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    // <AuthLayout>
      <PasswordResetForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isSuccess={isSuccess}
        register={register}
        errors={errors}
        error={error}
        onBackToLogin={handleBackToLogin}
      />
    // </AuthLayout>
  );
};