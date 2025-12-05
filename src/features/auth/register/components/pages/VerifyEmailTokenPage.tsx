
// ========================================
// 3. EMAIL VERIFICATION HANDLER PAGE
// ========================================

// src/features/auth/components/pages/VerifyEmailTokenPage.tsx
"use client"
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { registerApi } from "../../api/registerApi";
import { FaRegCircleCheck } from "react-icons/fa6";

export const VerifyEmailTokenPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      const response = await registerApi.verifyEmail(token);

      if (response.status === "success") {
        setStatus("success");
        setMessage(response.message);
        
        // Redirect to step 2 after 2 seconds
        setTimeout(() => {
          router.push("/signup/step2");
        }, 2000);
      } else {
        setStatus("error");
        setMessage(response.message);
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        {status === "loading" && (
          <>
            {/* <Loader2 className="w-16 h-16 text-teal-500 animate-spin mx-auto mb-4" /> */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600">Please wait...</p>
          </>
        )}

        {status === "success" && (
          <>
            <FaRegCircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              Redirecting to complete your profile...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            {/* <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" /> */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push("/signup")}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
};
