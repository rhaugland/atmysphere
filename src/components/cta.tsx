"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl text-ink mb-6">
            Check your forecast
          </h2>
          <p className="text-base font-light text-ink-secondary mb-10 max-w-sm mx-auto">
            Connect your calendar and see your week in a way that actually makes
            sense.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-ink px-6 py-3 rounded-sm hover:bg-ink/85 transition-colors"
            >
              View the demo
              <ArrowRight size={14} />
            </Link>
            <span className="text-sm font-light text-ink-tertiary">
              Calendar integration coming soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
