"use client";
import "./globals.css";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          <div className="flex">
            <Sidebar expanded={expanded} />
            <div className={`flex-1 transition-all duration-300 ${expanded ? "ml-48" : "ml-16"}`}>
              <Topbar toggleSidebar={() => setExpanded(!expanded)} />
              <main className="pt-20 px-6">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
