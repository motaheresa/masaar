"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { MdRefresh } from "react-icons/md";
import { Button } from "@/components/atoms/Button/Button";
import { useRouter } from "next/navigation";
import CvInvalidImage from "@/assets/images/cv-invalid.gif";

type CvValidationData = {
  verificationStatus: string;
  aiScore: number;
  needsReview: boolean;
};

const CvNotValidPage = () => {
  const router = useRouter();
  const [cvData, setCvData] = useState<CvValidationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Get CV validation data from sessionStorage (passed from upload form)
    const storedData = sessionStorage.getItem("cvValidationData");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setCvData(data);
        setIsLoading(false);
        // Delay progress animation slightly
        setTimeout(() => setShowProgress(true), 100);
      } catch (error) {
        console.error("Error parsing CV data:", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading your CV validation...</p>
        </div>
      </div>
    );
  }

  const scorePercentage = cvData?.aiScore || 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = showProgress
    ? circumference * (1 - scorePercentage / 100)
    : circumference;

  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 py-0! bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <div
        className="w-full lg:max-w-1/2 md:max-w-3/4 animate-slide-up"
      >
        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
          {/* Animated GIF positioned top-right */}

          {/* Title with Image */}
          <div
            className="flex justify-between items-center mb-6 gap-4 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
              CV Needs Improvement
            </h1>
            <div
              className="w-20 h-20 sm:w-20 sm:h-20 flex-shrink-0 animate-scale-in"
              style={{ animationDelay: '0.2s', transformOrigin: 'center' }}
            >
              <Image
                src={CvInvalidImage}
                alt="CV validation failed"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Score Card */}
          <div
            className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200 rounded-lg p-4 sm:p-6 mb-6 text-center animate-slide-up"
            style={{ animationDelay: '0.3s' }}
          >
            {/* AI Score */}
            <p className="text-gray-600 text-xs font-medium mb-3">
              AI Analysis Score
            </p>
            <div className="flex items-center justify-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-[1500ms] ease-out delay-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">
                      {scorePercentage}
                    </p>
                    <p className="text-xs text-gray-600">/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 mb-6 animate-slide-up"
            style={{ animationDelay: '0.4s' }}
          >
            <h3 className="font-semibold text-blue-900 mb-2 text-sm">
              💡 Tips to improve:
            </h3>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Highlight relevant work experience and technical skills
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include certifications and measurable results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ensure proper formatting and clear presentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Include your mentoring experience</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div
            className="flex gap-3 mb-4 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <Button
              onClick={() => router.replace("/register/cv-upload?role=mentor")}
              className="flex-1 py-2 text-sm flex items-center justify-center gap-2"
            >
              <MdRefresh className="text-base" />
              Try Again
            </Button>
          </div>


          {/* Minimum Score Info */}
          <p
            className="text-xs text-center text-gray-600 animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            Minimum score required:{" "}
            <span className="font-semibold">51/100</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CvNotValidPage;
