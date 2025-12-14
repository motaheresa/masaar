import Link from "next/link";
import Navbar from "@/components/organisms/Navbar";

export const GuestHeader = () => {
  return (
    <div className="absolute w-full animate-fade-in">
      <Navbar>
        <nav className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <ul className="flex flex-row items-center gap-6">
            <li className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link
                href="/register"
                className="text-sm md:text-base hover:text-primary hover:underline"
              >
                Find a mentor
              </Link>
            </li>
            <li className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/register"
                className="text-sm md:text-base hover:text-primary hover:underline"
              >
                How it works
              </Link>
            </li>
            <li className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link
                href="/register"
                className="text-sm md:text-base hover:text-primary hover:underline"
              >
                Become a mentor
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="flex items-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link
              href="/login"
              className="block hover:bg-primary text-center duration-500 font-bold! py-2 min-w-28 hover:outline-1 outline-primary text-primary rounded-none! rounded-tr-lg! rounded-bl-lg! hover:text-white"
            >
              Login
            </Link>
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/register/role-selection"
              className="block hover:bg-transparent font-bold! bg-primary py-2  text-center duration-500 min-w-28 rounded-none!  rounded-tr-lg! rounded-bl-lg! hover:text-primary text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default GuestHeader;
