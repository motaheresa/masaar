// src/components/organisms/LoginForm.tsx
import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { OutlinePasswordField } from "@/components/molecules/form/Input/PasswordField";
import { Button } from "@/components/atoms/Button/Button";
import { FormDivider } from "@/components/molecules/form/FormDivider";
import { LoginFormData } from "../../schemas/loginSchema";
import Link from "next/link";

type LoginFormProps = {
  onSubmit: () => void;
  isLoading: boolean;
  register: UseFormRegister<LoginFormData>;
  watch: (name: keyof LoginFormData) => string;
  errors: FieldErrors<LoginFormData>;
  onGoogleSignIn?: () => void;
  onGithubSignIn?: () => void;
  onForgotPassword?: () => void;
  onSignupClick?: () => void;
};

export const LoginForm = ({
  onSubmit,
  isLoading,
  register,
  watch,
  errors,
  onGoogleSignIn,
  onGithubSignIn,
  onForgotPassword,
  onSignupClick,
}: LoginFormProps) => {
  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
    onGoogleSignIn?.();
  };

  const handleGithubSignIn = () => {
    console.log("GitHub Sign In clicked");
    onGithubSignIn?.();
  };
  

  return (
    <div className="space-y-6">
      {/* Email Field */}
      <OutlineTextField
        label="Email"
        type="email"
        value={watch("email") || ""}
        onChange={(value) => {
          const event = { target: { name: "email", value } };
          register("email").onChange(event);
        }}
        placeholder="your@example.com"
        error={errors.email?.message}
      />

      {/* Password Field */}
      <OutlinePasswordField
        label="Password"
        name="password"
        value={watch("password") || ""}
        onChange={(value) => {
          const event = { target: { name: "password", value } };
          register("password").onChange(event);
        }}
        placeholder="••••••••••"
        error={errors.password?.message}
      />

      {/* Forgot Password Link */}
      <div className="text-right">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onForgotPassword?.();
          }}
          className="text-sm text-primary hover:underline hover:text-primary-hover transition-colors"
        >
          Forgot Your Password?
        </a>
      </div>

      {/* Login Button */}
      <Button onClick={onSubmit} variant="primary" loading={isLoading} disabled={Object.keys(errors).length>0} className="py-3.5">
        Login
      </Button>

      {/* Divider */}
      <FormDivider />

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          Icon={FcGoogle}
        > Sign in with Google</Button>
        <Button
          onClick={handleGoogleSignIn}
          Icon={FaGithub}
          variant="outline"
        >Sign in with GitHub</Button>
      </div>

      {/* Signup Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Dont have an account?
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSignupClick?.();
          }}
          className="text-primary ms-1 hover:underline font-medium hover:text-primary-hover transition-colors"
        >
          Signup
        </Link>
      </p>
    </div>
  );
};