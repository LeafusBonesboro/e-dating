"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileWrapper({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-12 bg-neutral-950 flex items-center justify-between px-4 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded hover:bg-neutral-800 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="ml-2 font-bold">E-Dating</span>
        </div>
      </div>

      {/* Sidebar (mobile slide-out, desktop fixed) */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar expanded />
      </div>

      {/* Page content */}
      <main className="flex-1 w-full lg:ml-48 mt-12 lg:mt-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
