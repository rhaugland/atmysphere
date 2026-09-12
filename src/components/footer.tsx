import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-hero-gradient" />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-gray-900">
              atmysphere
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="/demo" className="hover:text-gray-900 transition-colors">
              Demo
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} atmysphere
          </p>
        </div>
      </div>
    </footer>
  );
}
