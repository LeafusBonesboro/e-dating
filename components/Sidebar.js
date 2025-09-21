"use client";
import { Home, Heart, Bookmark, History } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ expanded }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-black text-white flex flex-col items-center py-6 transition-all duration-300 z-40
        ${expanded ? "w-48" : "w-16"}`}
    >
      {/* Nav items */}
      <nav className="flex flex-col gap-6 mt-12 w-full">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 hover:text-pink-500"
        >
          <Home size={20} />
          {expanded && <span>Home</span>}
        </Link>

        <Link
          href="/favorites"
          className="flex items-center gap-3 px-4 py-2 hover:text-pink-500"
        >
          <Heart size={20} />
          {expanded && <span>Favorites</span>}
        </Link>

        <Link
          href="/saved"
          className="flex items-center gap-3 px-4 py-2 hover:text-pink-500"
        >
          <Bookmark size={20} />
          {expanded && <span>Saved</span>}
        </Link>

        <Link
          href="/history"
          className="flex items-center gap-3 px-4 py-2 hover:text-pink-500"
        >
          <History size={20} />
          {expanded && <span>History</span>}
        </Link>
      </nav>
    </div>
  );
}
