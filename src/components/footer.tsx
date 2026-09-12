import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-4/40 py-8">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-sm font-semibold text-ink flex items-center gap-1.5"
          >
            <span className="inline-block w-3.5 h-3.5 rounded-full bg-gradient-to-br from-warm to-accent opacity-80" />
            atmysphere
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-xs text-ink-3 hover:text-ink transition-colors">
              Features
            </Link>
            <Link href="/demo" className="text-xs text-ink-3 hover:text-ink transition-colors">
              Demo
            </Link>
          </div>
          <span className="text-xs text-ink-3">
            &copy; {new Date().getFullYear()} atmysphere
          </span>
        </div>
      </div>
    </footer>
  );
}
