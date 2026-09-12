"use client";

import { motion } from "framer-motion";
import { Eye, Zap, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Instant Clarity",
    description:
      "Stop squinting at tiny calendar blocks. One look at your weather forecast tells you exactly how your day looks.",
    gradient: "from-sunrise-400 to-sunrise-500",
  },
  {
    icon: Zap,
    title: "Smart Scoring",
    description:
      "Our algorithm weighs meeting count, duration, gaps, and back-to-backs to give each day an accurate weather score.",
    gradient: "from-midday-400 to-midday-500",
  },
  {
    icon: Calendar,
    title: "Calendar Sync",
    description:
      "Connect Google Calendar, Outlook, or Apple Calendar. Your weather updates in real-time as events change.",
    gradient: "from-sunset-400 to-sunset-500",
  },
  {
    icon: Shield,
    title: "Private by Design",
    description:
      "We only read event times, not content. Your meeting details never leave your device.",
    gradient: "from-night-400 to-night-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Weather you can plan around
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A new way to understand your time. Built for people who are tired of
            decoding packed calendars.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon size={24} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
