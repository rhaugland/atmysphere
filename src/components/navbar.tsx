"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-hero-gradient" />
            <span className="font-[family-name:var(--font-display)] text-xl font-bold text-gray-900">
              atmysphere
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/demo"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sunrise-400 via-midday-500 to-sunset-500 hover:opacity-90 transition-opacity"
            >
              Try It Free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              How It Works
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Demo
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sunrise-400 via-midday-500 to-sunset-500"
            >
              Try It Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
