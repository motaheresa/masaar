"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <div className="w-full text-center">
        <div className="animate-fade-in">
          <DotLottieReact
            src={"/success.lottie"}
            speed={1}
            autoplay
            style={{ width: 200, height: 200, margin: "0 auto" }}
          />
        </div>

        {/* Main Title */}
        <h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          Success
        </h1>

        {/* Description */}
        <p
          className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          {role === "mentor"
            ? "Your mentor profile has been successfully created. You can now start mentoring students!"
            : "You have successfully created your account."}
        </p>

        {/* Back to Login Button */}
        <div
          className="w-fit mx-auto animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <Link
            href="/login"
            className="inline-block w-fit bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-semibold py-3 px-12 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Back to login
          </Link>
        </div>

        {/* Alternative Actions */}
        <div
          className="mt-8 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <p className="text-gray-500 text-sm">
            Want to explore?{" "}
            <Link
              href="/"
              className="text-teal-500 font-semibold hover:underline"
            >
              Go to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
