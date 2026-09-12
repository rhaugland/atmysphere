"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-bold text-ink mb-4">
            Ready to check your forecast?
          </h2>
          <p className="text-base text-ink-2 mb-8">
            Connect your calendar and see your week in a way that actually
            makes sense.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-medium text-surface bg-ink px-6 py-2.5 rounded-lg hover:bg-ink/85 transition-colors"
            >
              Try the demo
              <ArrowRight size={15} />
            </Link>
            <span className="text-sm text-ink-3">
              Calendar integration coming soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
