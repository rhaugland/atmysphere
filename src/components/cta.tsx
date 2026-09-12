"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sunrise-400 via-midday-500 to-sunset-500 p-8 sm:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10" />

          <div className="relative z-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to check your forecast?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-lg mx-auto">
              Connect your calendar and see your week in a whole new way. No
              more squinting at tiny time blocks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold text-midday-600 bg-white hover:bg-gray-50 transition-colors shadow-lg"
              >
                View Demo
              </Link>
              <button
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold text-white border-2 border-white/40 hover:bg-white/10 transition-colors cursor-not-allowed opacity-75"
                disabled
                title="Calendar integration coming soon"
              >
                Connect Calendar (Soon)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
