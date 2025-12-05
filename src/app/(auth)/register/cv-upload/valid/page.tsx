"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CvValidImage from "@/assets/images/cv-valid.gif";
import { motion } from "framer-motion";
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

  useEffect(() => {
    // Get CV validation data from sessionStorage (passed from upload form)
    const storedData = sessionStorage.getItem("cvValidationData");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setCvData(data);
        setIsLoading(false);
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

  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 py-0! bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:max-w-1/2 md:max-w-3/4"
      >
        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
          {/* Title with Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-between items-center mb-6 gap-4"
          >
            <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
              CV Validation Complete
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-23 h-23 sm:w-28 sm:h-28 flex-shrink-0"
            >
              <Image
                src={CvValidImage}
                alt="CV validation success"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-lg p-4 sm:p-6 mb-6 text-center"
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
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - scorePercentage / 100)}`}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                      animate={{
                        strokeDashoffset: 2 * Math.PI * 45 * (1 - scorePercentage / 100),
                      }}
                      transition={{ duration: 1.5, delay: 0.5 }}
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
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-3 mb-4"
            >
              <Button
                onClick={() => router.push("/profile")}
                className="flex-1 py-2 text-sm"
              >
                Finish
              </Button>
            </motion.div>

            {/* Info Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4"
            >
              <p className="text-xs text-gray-700">
                ✨ <span className="font-semibold">Great job!</span> Your CV meets our standards and you're ready to start mentoring.
              </p>
            </motion.div>

            {/* Status Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-xs text-center text-gray-600"
            >
              Your CV has been <span className="font-semibold">approved</span> for mentorship
            </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default CvValidPage;