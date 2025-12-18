
import React from "react";
import { LoginLogo } from "@/components/molecules/Logos";

const NavbarLayout = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={`flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-3 sm:py-4 bg-[#F5F5F5] ${className}`}
    >
      <LoginLogo className="" size="sm" variant="colored" />
      {children}
    </header>
  );
};

export default NavbarLayout;
