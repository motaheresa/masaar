"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CvValidImage from "@/assets/images/cv-valid.gif";

import { MdCheckCircle } from "react-icons/md";
import { Button } from "@/components/atoms/Button/Button";
import { useRouter } from "next/navigation";

type CvValidationData = {
  verificationStatus: string;
  aiScore: number;
  needsReview: boolean;
};

const CvValidPage = () => {
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
      <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Loading your CV validation...</p>
        </div>
      </div>
    );
  }

  const scorePercentage = cvData?.aiScore || 0;
  const isHighScore = scorePercentage > 50;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = showProgress
    ? circumference * (1 - scorePercentage / 100)
    : circumference;

  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 py-0! bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <div
        className="w-full lg:max-w-1/2 md:max-w-3/4 animate-slide-up"
      >
        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
          {/* Title with Image */}
          <div
            className="flex justify-between items-center mb-6 gap-4 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
              CV Validation Complete
            </h1>
            <div
              className="w-23 h-23 sm:w-28 sm:h-28 flex-shrink-0 animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            >
              <Image
                src={CvValidImage}
                alt="CV validation success"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </div>
          </div>
          {/* Score Card */}
          <div
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-lg p-4 sm:p-6 mb-6 text-center animate-slide-up"
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
                    stroke="#10b981"
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

          {/* Action Buttons */}
          <div
            className="flex gap-3 mb-4 animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <Button
              onClick={() => router.replace("/register/success?role=mentor")}
              className="flex-1 py-2 text-sm"
            >
              Finish
            </Button>
          </div>

          {/* Info Message */}
          <div
            className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <p className="text-xs text-gray-700">
              ✨ <span className="font-semibold">Great job!</span> Your CV meets our standards and you're ready to start mentoring.
            </p>
          </div>

          {/* Status Message */}
          <p
            className="text-xs text-center text-gray-600 animate-fade-in"
            style={{ animationDelay: '0.7s' }}
          >
            Your CV has been <span className="font-semibold">approved</span> for mentorship
          </p>
        </div>
      </div>
    </div>
  );
};

export default CvValidPage;