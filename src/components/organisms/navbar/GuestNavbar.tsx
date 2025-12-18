import Link from "next/link";
import Navbar from "@/components/organisms/navbar/NavbarLayout";
import { GuestHeaderDropdown } from "../../../features/guest/components/organisms/GuestHeaderDropdown";

export const GuestHeader = () => {

  return (
    <div className="absolute top-0 z-10 w-full animate-fade-in">
      <Navbar>
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-between flex-1 ml-8">
          {/* Navigation Links */}
          <nav className="flex flex-row items-center mx-auto gap-6">
            <Link
              href="/register"
              className="text-sm md:text-base hover:text-primary hover:underline"
            >
              Find a mentor
            </Link>
            <Link
              href="/register"
              className="text-sm md:text-base hover:text-primary hover:underline"
            >
              How it works
            </Link>
            <Link
              href="/register"
              className="text-sm md:text-base hover:text-primary hover:underline"
            >
              Become a mentor
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="block hover:bg-primary text-center duration-500 font-bold! py-2 min-w-28 hover:outline-1 outline-primary text-primary rounded-none! rounded-tr-lg! rounded-bl-lg! hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/register/role-selection"
              className="block hover:bg-transparent font-bold! bg-primary py-2 text-center duration-500 min-w-28 rounded-none! rounded-tr-lg! rounded-bl-lg! hover:text-primary text-white"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}


        {/* Mobile Menu Dropdown - Slides down when open */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-light-gray border-t border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out `}
        >

        </div>
        <GuestHeaderDropdown />
      </Navbar>
    </div>
  );
};

export default GuestHeader;
