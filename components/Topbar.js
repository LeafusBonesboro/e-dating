"use client";

import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Topbar({ toggleSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-red-900 text-white shadow-md">
      <div className="flex items-center justify-between px-6 h-[54px]">

        {/* Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-red-800 transition"
          >
            <Menu size={22} />
          </button>
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            E-Dating
          </h1>
        </div>

        {/* Navigation + Auth */}
        <div className="flex items-center gap-6">
         

         {/* Auth Buttons */}
{session ? (
  <div className="flex items-center gap-3">
    <span className="text-sm">Hi, {session.user?.name}</span>
    <button
      onClick={() => signOut({ callbackUrl: "/landing" })} // 👈 redirect after logout
      className="bg-black hover:bg-gray-800 px-3 py-1 rounded-lg text-sm"
    >
      Sign Out
    </button>
  </div>
) : (
  <button
    onClick={() => signIn("google")}
    className="bg-black hover:bg-gray-800 px-3 py-1 rounded-lg text-sm"
  >
    Sign In
  </button>
)}

        </div>
      </div>
    </div>
  );
}
