import React from "react";
import { LoginLogo } from "@/components/molecules/Logos";
import { BrandingPanel } from "@/features/auth/login/components/organisms/BrandingPanel";

type AuthLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
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
