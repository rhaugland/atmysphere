"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Instant clarity",
    description:
      "One glance tells you how your day looks. No more squinting at tiny calendar blocks to understand your load.",
  },
  {
    number: "02",
    title: "Smart scoring",
    description:
      "Weighs meeting count, duration, gaps between events, and back-to-back runs to score each day accurately.",
  },
  {
    number: "03",
    title: "Calendar sync",
    description:
      "Connect Google Calendar, Outlook, or Apple Calendar. Weather updates in real-time as your schedule changes.",
  },
  {
    number: "04",
    title: "Private by design",
    description:
      "We only read event times, never content. Your meeting details stay on your device.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] font-light tracking-wider text-ink-tertiary uppercase mb-4">
            Features
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ink max-w-md">
            Weather you can plan around
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-ink-faint/40">
          {features.map((feature, i) => (
            <motion.div
              key={feature.number}
              className="bg-surface p-8 sm:p-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-[11px] font-light tracking-wider text-ink-tertiary">
                {feature.number}
              </span>
              <h3 className="text-base font-medium text-ink mt-3 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm font-light text-ink-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
