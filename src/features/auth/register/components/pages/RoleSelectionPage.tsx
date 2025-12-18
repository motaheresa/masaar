"use client";
import React, { useCallback } from "react";

import { Button } from "@/components/atoms/Button/Button";
import MentorImg from "@/assets/images/mentor_role_Selection.png";
import StudentImg from "@/assets/images/student_role_selection.png";
import RoleSelectionCard from "../molecules/RoleSelectionCard";
import Link from "next/link";
import Navbar from "@/components/organisms/navbar/NavbarLayout";
import CopyRights from "@/components/organisms/CopyRights";

const RoleSelectionPage = () => {
  const FooterLinks = useCallback(() => {
    return [
      { label: "About", href: "/about" },
      { label: "Terms of Service", href: "/terms", shortLabel: "Terms" },
      { label: "Privacy & Policy", href: "/privacy", shortLabel: "Privacy" },
    ];
  }, []);
  return (
    <div className="bg-[#F5F5F5] min-h-screen flex flex-col">
      {/* Navbar - Responsive */}
      <Navbar className="bg-[#F5F5F5] px-4 sm:px-8 md:px-12 lg:px-20 mx-auto sm:mx-0">
        <div
          className="sm:flex hidden items-center gap-2 sm:gap-4 animate-slide-right"
          style={{ animationDelay: '0.2s' }}
        >
          <p className="text-gray-700 text-xs sm:text-sm font-medium hidden sm:block">
            Already have an account?
          </p>
          <p className="text-gray-700 text-xs font-medium sm:hidden">
            Have account?
          </p>
          <Link href="/login">
            <Button
              variant="primary"
              className="w-fit px-4 sm:px-6 py-2 text-sm"
            >
              Sign in
            </Button>
          </Link>
        </div>
      </Navbar>

      {/* Main Content - Responsive */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* Header - Responsive */}
        <div
          className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4">
            Join as a..
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-medium  mx-auto px-4">
            choose your path to start your journey in coding excellence
          </p>
        </div>

        {/* Role Cards - Responsive Grid */}
        <div
          className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 px-4 sm:px-0 place-items-center animate-slide-up"
        >
          <RoleSelectionCard
            Img={MentorImg}
            title="I'm Mentor"
            text="Share your knowledge and guide students"
            role="mentor"
            index={0}
          />
          <RoleSelectionCard
            Img={StudentImg}
            title="I'm Student"
            text="Learn how to code from experts and achieve your goal"
            role="student"
            index={1}
          />
        </div>
      </div>

      {/* Footer - Responsive */}
      <footer
        className="py-6 sm:py- border-t border-gray-300 px-4 animate-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        <ul className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-4 sm:mb-6 text-xs sm:text-sm flex-wrap">
          {FooterLinks().map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {/* Show short label on mobile, full label on desktop */}
                <span className="hidden sm:inline">{link.label}</span>
                <span className="sm:hidden">
                  {link.shortLabel || link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <CopyRights />
      </footer>
    </div>
  );
};

export default RoleSelectionPage;
