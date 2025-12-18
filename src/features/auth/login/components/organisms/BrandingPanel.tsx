// src/components/organisms/BrandingPanel.tsx
import { LoginLogo } from "@/components/molecules/Logos";

export const BrandingPanel = () => {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 rounded-r-2xl bg-gradient-to-br from-primary to-primary-hover items-center justify-center p-12 animate-slide-right"
    >
      <div className="text-center text-white">
        <div
          className="mb-8 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <LoginLogo size="lg" className="text-white mb-4 justify-center" />
        </div>

        <h2
          className="text-2xl font-semibold mb-4 leading-relaxed animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          Unlock Your Code Potential.
          <br />
          Connect with experts Mentors
        </h2>

        <button
          className="mt-8 px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-primary transition duration-200 animate-scale-in hover:scale-105 active:scale-95 origin-center"
          style={{ animationDelay: '0.6s' }}
        >
          Join Us
        </button>
      </div>
    </div>
  );
};