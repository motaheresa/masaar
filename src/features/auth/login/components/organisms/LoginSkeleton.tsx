// src/components/organisms/LoginSkeleton.tsx
import React from "react";

const SkeletonInput = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="h-10 bg-gray-200 rounded w-full"></div>
  </div>
);

const SkeletonButton = () => (
  <div className="animate-pulse">
    <div className="h-11 bg-gray-200 rounded-md w-full"></div>
  </div>
);

export const LoginSkeleton = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Branding Skeleton */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-hover items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="animate-pulse space-y-4">
            <div className="w-24 h-24 bg-white/30 rounded-lg mx-auto mb-4"></div>
            <div className="h-8 bg-white/30 rounded w-32 mx-auto mb-4"></div>
            <div className="h-6 bg-white/30 rounded w-64 mx-auto mb-2"></div>
            <div className="h-6 bg-white/30 rounded w-48 mx-auto mb-8"></div>
            <div className="h-12 bg-white/30 rounded-md w-32 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Right Form Skeleton */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Header Skeleton */}
          <div className="text-center animate-pulse space-y-2">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
          </div>

          {/* Form Inputs Skeleton */}
          <SkeletonInput />
          <SkeletonInput />

          {/* Forgot Password Link Skeleton */}
          <div className="flex justify-end">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>

          {/* Login Button Skeleton */}
          <SkeletonButton />

          {/* Divider Skeleton */}
          <div className="h-px bg-gray-200 my-6"></div>

          {/* Social Buttons Skeleton */}
          <SkeletonButton />
          <SkeletonButton />

          {/* Signup Link Skeleton */}
          <div className="flex justify-center gap-1 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};