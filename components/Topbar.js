"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext"; 
import { useAuth } from "../context/AuthContext";
import Login from "@/components/Login";
import Register from "@/components/Register";

export default function Topbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
        : "bg-transparent text-white"
      : "bg-black text-white shadow-md"}
  `;

  return (
    <>
      {/* Topbar */}
      <div className={barClasses}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Delta Treats
          </h1>

          {/* Center nav */}
          <div className="flex gap-6">
            {["Cupcakes", "Crispies", "Brownies", "Gummies"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="transition hover:text-orange-500"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="font-semibold">{user.username}</span>
                <button
                  onClick={logout} // ✅ clears cookie + context
                  className="hover:text-orange-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="transition hover:text-orange-500"
              >
                👤
              </button>
            )}

            <button
              onClick={() => router.push("/cart")}
              className="relative transition hover:text-white"
            >
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Login
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <Register
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}
