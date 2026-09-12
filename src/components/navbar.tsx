"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-lg border-b border-ink-4/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink tracking-tight flex items-center gap-2"
          >
            <span className="inline-block w-5 h-5 rounded-full bg-gradient-to-br from-warm to-accent opacity-80" />
            atmysphere
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link
              href="#features"
              className="text-[13px] text-ink-2 hover:text-ink transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-[13px] text-ink-2 hover:text-ink transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/demo"
              className="text-[13px] text-ink-2 hover:text-ink transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/demo"
              className="text-[13px] font-medium text-surface bg-ink px-4 py-1.5 rounded-lg hover:bg-ink/85 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1 text-ink-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-b border-ink-4/40">
          <div className="max-w-5xl mx-auto px-5 py-5 flex flex-col gap-4">
            <Link href="#features" onClick={() => setOpen(false)} className="text-sm text-ink-2 hover:text-ink">
              Features
            </Link>
            <Link href="#how-it-works" onClick={() => setOpen(false)} className="text-sm text-ink-2 hover:text-ink">
              How It Works
            </Link>
            <Link href="/demo" onClick={() => setOpen(false)} className="text-sm text-ink-2 hover:text-ink">
              Demo
            </Link>
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-surface bg-ink px-4 py-2 rounded-lg text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
