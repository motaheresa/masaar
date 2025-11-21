// src/components/templates/AuthLayout.tsx
import React from "react";
import { BrandingPanel } from "../organisms/BrandingPanel";
import { LoginLogo } from "@/components/molecules/Logos";

type AuthLayoutProps = {
  children: React.ReactNode;
  showBranding?: boolean;
  onBrandingAction?: () => void;
};

export const AuthLayout = ({
  children,
  showBranding = true,
  onBrandingAction,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel (hidden on mobile) */}
      {showBranding && <BrandingPanel onJoinClick={onBrandingAction} />}

      {/* Right Content Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full">
          {/* Mobile Logo - shown only on mobile when branding panel is hidden */}
          <div className="lg:hidden text-center mb-8">
            <LoginLogo className="mb-4 justify-center" />
          </div>

          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  );
};