// src/components/organisms/PasswordResetForm.tsx
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { Button } from "@/components/atoms/Button/Button";
import Link from "next/link";
import { PasswordResetFormData } from "../../schemas/passwordResetSchema";
import { HiMiniKey, HiCheckCircle, HiExclamationTriangle } from "react-icons/hi2";


type PasswordResetFormProps = {
  onSubmit: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  register: UseFormRegister<PasswordResetFormData>;
  errors: FieldErrors<PasswordResetFormData>;
  error: string | null;
  onBackToLogin?: () => void;
};

export const PasswordResetForm = ({
  onSubmit,
  isLoading,
  isSuccess,
  register,
  errors,
  error,
  onBackToLogin,
}: PasswordResetFormProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-[700px] animate-slide-up"
      >
        {/* Main Card */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in"
          style={{ animationDelay: '0.1s' }}
        >
          {/* Header Section with Gradient Background */}
          <div className="bg-gradient-to-r from-primary to-primary-hover px-6 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-28 h-28 sm:w-40 sm:h-40 bg-white rounded-full -translate-x-16 -translate-y-16 sm:-translate-x-20 sm:-translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full translate-x-12 translate-y-12 sm:translate-x-16 sm:translate-y-16"></div>
            </div>

            {/* Icon Container */}
            <div
              className="relative inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-3 sm:mb-4 animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div>
                <HiMiniKey className="text-white text-2xl sm:text-3xl" />
              </div>
            </div>

            <h1
              className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              Forgot Password?
            </h1>

            <p
              className="text-white/90 text-xs sm:text-sm animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            {/* Error Message */}
            {error && (
              <div
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-fade-in"
              >
                <HiExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in"
              >
                <HiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-700 font-medium mb-1">
                    Reset link sent!
                  </p>
                  <p className="text-sm text-green-600">
                    If the email exists, a password reset link has been sent to your inbox.
                  </p>
                </div>
              </div>
            )}

            {!isSuccess ? (
              <form
                onSubmit={onSubmit}
                className="space-y-6 animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              >
                {/* Email Field */}
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: '0.6s' }}
                >
                  <OutlineTextField
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    register={register}
                    error={errors.email?.message}
                    className="rounded-lg"
                  />
                </div>

                {/* Reset Password Button */}
                <div
                  className="pt-2 animate-slide-up"
                  style={{ animationDelay: '0.7s' }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
                  </Button>
                </div>

                {/* Back to Login Link */}
                <div
                  className="text-center pt-4 animate-slide-up"
                  style={{ animationDelay: '0.8s' }}
                >
                  <Link
                    href="/login"
                    onClick={(e) => {
                      if (onBackToLogin) {
                        e.preventDefault();
                        onBackToLogin();
                      }
                    }}
                    className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <span className="group-hover:text-primary">Back to Login</span>
                  </Link>
                </div>
              </form>
            ) : (
              <div
                className="text-center space-y-4 animate-slide-up"
                style={{ animationDelay: '0.5s' }}
              >


                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Check Your Email
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Weve sent a password reset link to your email address.
                  </p>
                </div>

                <div
                  className="hover:scale-[1.01] active:scale-[0.99] transition-transform"
                >
                  <Button
                    variant="primary"
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => window.location.href = '/login'}
                  >
                    Return to Login
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Didnt receive the email? Check your spam folder or
                  <button
                    onClick={() => window.location.reload()}
                    className="text-primary hover:underline ml-1"
                  >
                    try again
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};