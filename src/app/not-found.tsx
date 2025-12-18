"use client";
import Image from "next/image";

import NotFoundImage from "@/assets/images/Error 404.gif";
import { Button } from "@/components/atoms/Button/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div
        className="w-full max-w-1/2 animate-slide-up"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* 404 Image */}
          <div
            className="mb-6 flex justify-center animate-scale-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-32 h-32 sm:w-44 sm:h-44 relative">
              <Image
                src={NotFoundImage}
                alt="Page not found"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mb-8">
              Sorry, the page you{`'`}re looking for doesn{`'`}t exist.
            </p>
          </div>

          {/* Action Button */}
          <div
            className="flex gap-3 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Button
              onClick={() => router.push("/")}
              className="flex-1 py-3"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
