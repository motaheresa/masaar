"use server";
import React from "react";
import Link from "next/link";
import { HeroLottie } from "./HeroLottie";

export const HeroSection = async () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 px-6 md:px-12 lg:px-24 py-12 md:py-20 animate-fade-in">
      {/* Left Side (Text Content) */}
      <div className="flex-1 flex flex-col gap-6 animate-slide-up">
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-5 leading-tight">
            Unlock Your <span className="text-primary">Coding</span>
            <br />
            <span className="text-primary">Potential</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Connect with experts mentors and innovate more !
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link
            href="/register/role-selection"
            className="inline-block bg-primary text-white font-extrabold py-4 px-8 rounded-tl-lg rounded-br-lg rounded-bl-md rounded-tr-none hover:bg-primary/90 transition-colors duration-300"
          >
            Find Your Mentor
          </Link>
        </div>
      </div>

      {/* Right Side (Animated Photo) */}
      <div className="flex-1 flex justify-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
        <HeroLottie />
      </div>
    </section>
  );
};

export default HeroSection;
