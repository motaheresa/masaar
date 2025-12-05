// src/components/organisms/LoginForm.tsx
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
import { motion } from "framer-motion";

type LoginFormProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
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
    <form onSubmit={onSubmit} className="w-full">
      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6"
      >
        <OutlineTextField
          label="Email"
          type="email"
          placeholder="your@example.com"
          name="email"
          register={register}
          error={errors.email?.message}
        />
      </motion.div>

      {/* Password Field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-6"
      >
        <OutlinePasswordField
          label="Password"
          name="password"
          placeholder="••••••••••"
          register={register}
          error={errors.password?.message}
        />
      </motion.div>

      {/* Forgot Password Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="text-right mb-6"
      >
        <Link
          href="/login/forgot-password/identify"
          // onClick={(e) => {
          //   e.preventDefault();
          //   onForgotPassword?.();
          // }}
          className="text-sm text-primary hover:underline hover:text-primary-hover transition-colors"
        >
          Forgot Your Password?
        </Link>
      </motion.div>

      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: isLoading ? 1 : 1.01 }}
        whileTap={{ scale: isLoading ? 1 : 0.99 }}
        className="mb-6"
      >
        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          variant="primary"
          className="shadow-sm"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </motion.div>

      {/* Divider */}
      <FormDivider />

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {/* Google Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
        >
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            Icon={FcGoogle}
            variant="outline"
          >
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </Button>
        </motion.div>

        {/* GitHub Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
        >
          <Button
            type="button"
            onClick={handleGithubSignIn}
            disabled={isLoading}
            Icon={FaGithub}
            variant="outline"
          >
            <span className="text-sm font-medium text-gray-700">
              Sign in with GitHub
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Signup Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="mt-6"
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
      </motion.div>
    </form>
  );
};