"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FiMenu, FiX } from "react-icons/fi"
import Link from "next/link"

export function GuestHeaderDropdown() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (open) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);
  
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button 
            className="relative bg-transparent shodow-none md:hidden" 
            variant="outline" 
            aria-label="Open menu" 
            size="icon-sm"
          >
            <FiMenu
              size={40}
              className={`absolute text-gray-800 transition-all duration-300 ${
                open
                  ? "opacity-0 rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <FiX
              size={40}
              className={`absolute text-gray-800 transition-all duration-300 ${
                open
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen mt-2 text-center bg-white z-20!" align="center">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="text-sm hover:text-primary hover:underline text-center py-2"
              >
                Find a mentor
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="text-sm hover:text-primary hover:underline text-center py-2"
              >
                How it works
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="text-sm hover:text-primary hover:underline text-center py-2"
              >
                Become a mentor
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block hover:bg-transparent font-bold! bg-primary py-2 text-center duration-500 rounded-lg rounded-tr-none! rounded-bl-none! hover:text-primary text-white"
              >
                Login
              </Link>
              <Link
                href="/register/role-selection"
                onClick={() => setOpen(false)}
                className="block hover:bg-transparent font-bold! bg-primary py-2 text-center duration-500 rounded-none! rounded-tr-lg! rounded-bl-lg! hover:text-primary text-white"
              >
                Sign up
              </Link>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
