"use client";
import { Home, Star, Users } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ expanded }) {
  return (
    <div
      className={`h-screen fixed top-0 left-0 transition-all duration-300
        ${expanded ? "w-48" : "w-16"}
        bg-neutral-950 text-gray-200 min-h-screen transition-all duration-300`}
    >
      <nav className="flex flex-col gap-4 mt-20 px-2">
        <Link href="/" className="flex items-center gap-2 hover:text-white">
          <Home size={20} />
          {expanded && <span>Home</span>}
        </Link>
        <Link href="/favorites" className="flex items-center gap-2 hover:text-white">
          <Star size={20} />
          {expanded && <span>Favorites</span>}
        </Link>
        <Link href="/characters" className="flex items-center gap-2 hover:text-white">
          <Users size={20} />
          {expanded && <span>Characters</span>}
        </Link>
      </nav>
    </div>
  );
}
