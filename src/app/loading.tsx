"use client";
import Image from "next/image";

import LoadingImage from "@/assets/images/Loading.gif";

export default function Loading() {
  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-screen">
      <div
        className="w-full sm:w-3/4 w-11/12 md:max-w-1/2 animate-fade-in"
      >
        <div className=" p-8 flex flex-col items-center justify-center">
          {/* Loading Image */}
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 mb-6 animate-scale-in"
          >
            <Image
              src={LoadingImage}
              alt="Loading"
              width={160}
              height={160}
              className="object-contain"
              priority
            />
          </div>

          {/* Loading Text */}
          <p
            className="text-gray-600 text-center text-sm sm:text-base font-medium animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Please wait...
          </p>
        </div>
      </div>
    </div>
  );
}