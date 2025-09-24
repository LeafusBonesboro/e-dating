// app/landing/page.js
"use client";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to E-Dating</h1>
      <p className="mb-6 text-gray-600">Log in and accept the terms to continue.</p>
      <button
        onClick={() => signIn("google")} // or your provider
        className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Sign In
      </button>
    </div>
  );
}
