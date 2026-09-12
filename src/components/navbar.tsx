"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 border-b border-ink-faint/50">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-lg text-ink tracking-tight"
          >
            atmysphere
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-[13px] font-light text-ink-secondary hover:text-ink transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-[13px] font-light text-ink-secondary hover:text-ink transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/demo"
              className="text-[13px] font-light text-ink-secondary hover:text-ink transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/demo"
              className="text-[13px] font-medium text-ink px-4 py-1.5 border border-ink/15 rounded-sm hover:bg-ink hover:text-white transition-all"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1 text-ink-secondary"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-b border-ink-faint/50">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="text-sm text-ink-secondary hover:text-ink"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setOpen(false)}
              className="text-sm text-ink-secondary hover:text-ink"
            >
              How It Works
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="text-sm text-ink-secondary hover:text-ink"
            >
              Demo
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink mt-2 px-4 py-2 border border-ink/15 rounded-sm text-center hover:bg-ink hover:text-white transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
