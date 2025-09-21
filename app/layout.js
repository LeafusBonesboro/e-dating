"use client";
import "./globals.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <body className="bg-black text-gray-100">
  <SessionProvider>
    <div className="flex">
      <Sidebar expanded={expanded} />
      <div
        className={`flex-1 transition-all duration-300 ${
          mounted ? (expanded ? "ml-48" : "ml-16") : "ml-48"
        }`}
      >
        <Topbar toggleSidebar={() => setExpanded(!expanded)} />
        <main className="pt-20 px-6">{children}</main>
      </div>
    </div>
  </SessionProvider>
</body>

    </html>
  );
}
