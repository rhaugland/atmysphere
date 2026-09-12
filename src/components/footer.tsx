import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-faint/50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-[family-name:var(--font-display)] text-sm text-ink">
            atmysphere
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="#features"
              className="text-[12px] font-light text-ink-tertiary hover:text-ink transition-colors"
            >
              Features
            </Link>
            <Link
              href="/demo"
              className="text-[12px] font-light text-ink-tertiary hover:text-ink transition-colors"
            >
              Demo
            </Link>
          </div>
          <span className="text-[12px] font-light text-ink-tertiary">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
