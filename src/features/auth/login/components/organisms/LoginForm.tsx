"use client"
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { OutlinePasswordField } from "@/components/molecules/form/Input/PasswordField";
import { Button } from "@/components/atoms/Button/Button";
import { FormDivider } from "@/components/molecules/form/FormDivider";
import { LoginFormData } from "../../schemas/loginSchema";
import Link from "next/link";
import { useLogin } from "../../hooks/useLogin";


export const LoginForm = () => {
  const { register, handleSubmit, errors, isLoading } = useLogin();

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
    // TODO: Implement Google OAuth
  };

  const handleGithubSignIn = () => {
    console.log("GitHub Sign In clicked");
    // TODO: Implement GitHub OAuth
  };

  return (
    <form onSubmit={handleSubmit} className="w-full block">
      {/* Email Field */}
      <div
        className="mb-6 animate-slide-up"
        style={{ animationDelay: '0.1s' }}
      >
        <OutlineTextField
          label="Email"
          type="email"
          placeholder="your@example.com"
          name="email"
          register={register}
          error={errors.email?.message}
        />
      </div>

      {/* Password Field */}
      <div
        className="mb-6 animate-slide-up"
        style={{ animationDelay: '0.2s' }}
      >
        <OutlinePasswordField
          label="Password"
          name="password"
          placeholder="••••••••••"
          register={register}
          error={errors.password?.message}
        />
      </div>

      {/* Forgot Password Link */}
      <div
        className="text-right mb-6 animate-slide-up"
        style={{ animationDelay: '0.25s' }}
      >
        <Link
          href="/login/forgot-password/identify"
          className="text-sm text-primary hover:underline hover:text-primary-hover transition-colors"
        >
          Forgot Your Password?
        </Link>
      </div>

      {/* Login Button */}
      <div
        className="mb-6 animate-slide-up"
        style={{ animationDelay: '0.3s' }}
      >
        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          variant="primary"
          className="shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-transform"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>

      {/* Divider */}
      <FormDivider />

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {/* Google Button */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: '0.35s' }}
        >
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            Icon={FcGoogle}
            variant="outline"
            className="hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </Button>
        </div>

        {/* GitHub Button */}
        <div
          className="animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Button
            type="button"
            onClick={handleGithubSignIn}
            disabled={isLoading}
            Icon={FaGithub}
            variant="outline"
            className="hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <span className="text-sm font-medium text-gray-700">
              Sign in with GitHub
            </span>
          </Button>
        </div>
      </div>

      {/* Signup Link */}
      <div
        className="mt-6 animate-slide-up"
        style={{ animationDelay: '0.45s' }}
      >
        <p className="text-center text-sm text-gray-600">
          Don{`'`}t have an account?
          <Link
            href="/register/role-selection"
            className="text-primary ms-1 hover:underline font-medium hover:text-primary-hover transition-colors"
          >
            Signup
          </Link>
        </p>
      </div>
    </form>
  );
};