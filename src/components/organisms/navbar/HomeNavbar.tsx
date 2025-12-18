import Link from "next/link";
import NavbarLayout from "@/components/organisms/navbar/NavbarLayout";
import { LuLayoutDashboard, LuFolderOpen, LuBell } from "react-icons/lu";

const HomeNavbar = () => {
    return (
        <div className=" sticky border-b shadow-md top-0 z-10 w-full animate-fade-in">
            <NavbarLayout>
                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Dashboard Link */}
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-medium"
                    >
                        <LuLayoutDashboard className="text-lg" />
                        <span>Dashboard</span>
                    </Link>

                    {/* My Projects Button */}
                    <Link
                        href="/my-projects"
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors font-medium"
                    >
                        <LuFolderOpen className="text-lg" />
                        <span>My Projects</span>
                    </Link>

                    {/* Divider */}
                    <div className="h-8 w-px bg-gray-300 mx-2"></div>

                    {/* Notification Bell */}
                    <button className="relative p-2 text-gray-500 hover:text-primary transition-colors">
                        <LuBell className="text-xl" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {/* User Avatar */}
                    <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all">
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                            U
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Toggle (Simplified for now) */}
                <div className="md:hidden flex items-center gap-3">
                    <button className="relative p-2 text-gray-500">
                        <LuBell className="text-lg" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm">
                        U
                    </button>
                </div>
            </NavbarLayout>
        </div>
    );
};

export default HomeNavbar;