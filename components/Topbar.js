"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState(false);

  // Detect scroll only on landing page
  useEffect(() => {
    if (pathname !== "/") return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isLandingPage = pathname === "/";
  const barClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${isLandingPage
      ? scrolled
        ? "bg-black/90 text-white shadow-md"
        : "bg-transparent text-black"
      : "bg-black text-white shadow-md"}
  `;

  return (
    <div className={barClasses}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          E-Dating
        </h1>

        {/* Navigation + Auth */}
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            {["Home", "Features", "Characters"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="transition hover:text-orange-500"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded-lg text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
  onClick={() => signIn("google", { callbackUrl: "/characters" })}
  className="bg-pink-500 hover:bg-pink-600 px-3 py-1 rounded-lg text-sm"
>
  Sign In
</button>

          )}
        </div>
      </div>
    </div>
  );
}
