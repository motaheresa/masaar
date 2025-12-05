"use client"
import React, { useState } from "react";
import { registerApi } from "../../api/registerApi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";



interface EmailVerificationPageProps {
  email: string;
  onVerified: () => void;
  onChangeEmail: () => void;
}

export const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({
  email,
  onVerified,
  onChangeEmail,
}) => {
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage(null);

    try {
      const response = await registerApi.resendVerification(email);
      
      setMessage({
        type: response.status === "success" ? "success" : "error",
        text: response.message,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to resend verification email",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <MdMailOutline className="w-8 h-8 text-teal-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Verify Your Email Address
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 text-sm mb-6">
          We${`'`}ve sent verification code to your{" "}
          <span className="font-semibold text-gray-900">{email}</span> please
          click on link to complete registration
        </p>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <FaRegCircleCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <IoAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                message.type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* Resend Email Button */}
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isResending ? "Sending..." : "Resend Email"}
        </button>

        {/* Change Email Button */}
        <button
          onClick={onChangeEmail}
          className="w-full text-teal-500 py-2 rounded-lg font-medium hover:text-teal-600 transition-colors"
        >
          Change Email
        </button>

        {/* Divider */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            Didn${`'`}t receive the email? Check your spam folder or try resending
          </p>
        </div>
      </div>
    </div>
  );
};
