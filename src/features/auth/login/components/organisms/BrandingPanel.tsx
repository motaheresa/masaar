// src/components/organisms/BrandingPanel.tsx
import { LoginLogo } from "@/components/molecules/Logos";
import React from "react";


type BrandingPanelProps = {
  onJoinClick?: () => void;
};

export const BrandingPanel = ({ onJoinClick }: BrandingPanelProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-hover items-center justify-center p-12">
      <div className="text-center text-white">
        <div className="mb-8">
          <LoginLogo size="lg" className="text-white mb-4 justify-center" />
        </div>
        
        <h2 className="text-2xl font-semibold mb-4 leading-relaxed">
          Unlock Your Code Potential.
          <br />
          Connect with experts Mentors
        </h2>
        
        <button
          onClick={onJoinClick}
          className="mt-8 px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-primary transition duration-200 active:scale-95"
        >
          Join Us
        </button>
      </div>
    </div>
  );
};