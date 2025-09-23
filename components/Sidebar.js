"use client";
import { Home, Star, Users, FileText, Shield, Newspaper, CreditCard, Search } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ expanded }) {
  return (
    <div
      className={`h-screen fixed top-0 left-0 transition-all duration-300
        ${expanded ? "w-48" : "w-16"}
        bg-neutral-950 text-gray-200 min-h-screen flex flex-col justify-between`}
    >
      {/* Top navigation */}
      <nav className="flex flex-col gap-4 mt-20 px-2">
        <Link href="/newsfeed" className="flex items-center gap-2 hover:text-white">
          <Newspaper size={20} />
          {expanded && <span>Newsfeed</span>}
        </Link>
        <Link href="/favorites" className="flex items-center gap-2 hover:text-white">
          <Star size={20} />
          {expanded && <span>Favorites</span>}
        </Link>
        <Link href="/characters" className="flex items-center gap-2 hover:text-white">
          <Users size={20} />
          {expanded && <span>Characters</span>}
        </Link>
        <Link href="/search" className="flex items-center gap-2 hover:text-white">
          <Search size={20} />
          {expanded && <span>Search</span>}
        </Link>
      </nav>

      {/* Bottom credits + legal */}
      <div className="flex flex-col gap-4 mb-6 px-2">
        <Link
          href="/credits"
          className="flex items-center justify-center bg-pink-600 text-white px-3 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          <CreditCard size={16} className="mr-2" />
          {expanded && <span>Get Credits</span>}
        </Link>

        <div className="flex flex-col gap-2 text-xs text-gray-400">
          <Link href="/legal/terms" className="flex items-center gap-2 hover:text-gray-200">
            <FileText size={16} />
            {expanded && <span>Terms</span>}
          </Link>
          <Link href="/legal/privacy" className="flex items-center gap-2 hover:text-gray-200">
            <Shield size={16} />
            {expanded && <span>Privacy</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}
