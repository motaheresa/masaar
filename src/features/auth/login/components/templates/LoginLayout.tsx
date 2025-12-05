// src/components/templates/AuthLayout.tsx
import React from "react";
import { BrandingPanel } from "../organisms/BrandingPanel";
import { LoginLogo } from "@/components/molecules/Logos";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel (hidden on mobile) */}
      {<BrandingPanel />}

      {/* Right Content Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full">
          <div className="lg:hidden text-center mb-4">
            {/* <LoginLogo className="mb-4 lg:flex hidden justify-center" /> */}
            <LoginLogo variant="colored" className=" justify-center" />
          </div>
          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  );
};
