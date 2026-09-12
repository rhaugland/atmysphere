"use client";

import { motion } from "framer-motion";
import { Eye, Zap, CalendarSync, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Eye,
    title: "Instant clarity",
    description:
      "One glance tells you how your day looks. No more squinting at tiny calendar blocks.",
  },
  {
    icon: Zap,
    title: "Smart scoring",
    description:
      "Weighs meeting count, duration, gaps, and back-to-backs to give each day an accurate weather score.",
  },
  {
    icon: CalendarSync,
    title: "Calendar sync",
    description:
      "Connect Google Calendar, Outlook, or Apple Calendar. Your weather updates as your schedule changes.",
  },
  {
    icon: Lock,
    title: "Private by design",
    description:
      "We only read event times, never titles or content. Your meeting details stay on your device.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-surface-alt">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-ink mb-3">
            Built for busy people
          </h2>
          <p className="text-base text-ink-2 max-w-md">
            A better way to understand your time at a glance.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-surface rounded-xl border border-ink-4/40 p-6 hover:shadow-md hover:border-ink-4/70 transition-all"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center mb-4">
                <feature.icon size={18} className="text-accent" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-ink mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-ink-2 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
