"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Hero */}
      <section className="text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to E-Dating</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          A simple landing page placeholder while we build out features.
        </p>
        <Link
          href="/about"
          className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Learn More
        </Link>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl w-full px-6">
        {[
          { title: "About", href: "/about" },
          { title: "Features", href: "/features" },
          { title: "Contact", href: "/contact" },
        ].map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="p-6 bg-white shadow rounded-md text-center hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-xl">{link.title}</h3>
          </Link>
        ))}
      </section>
    </div>
  );
}
