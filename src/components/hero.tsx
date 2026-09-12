"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WeatherIcon } from "./weather-icon";
import type { WeatherType } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

const previewDays: {
  day: string;
  weather: WeatherType;
  label: string;
}[] = [
  { day: "Mon", weather: "partly-cloudy", label: "2 events" },
  { day: "Tue", weather: "stormy", label: "7 events" },
  { day: "Wed", weather: "rainy", label: "5 events" },
  { day: "Thu", weather: "cloudy", label: "3 events" },
  { day: "Fri", weather: "sunny", label: "0 events" },
];

const weatherCardBg: Record<WeatherType, string> = {
  sunny: "bg-weather-clear",
  "partly-cloudy": "bg-weather-fair",
  cloudy: "bg-weather-cloudy",
  rainy: "bg-weather-rain",
  stormy: "bg-weather-storm",
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-14">
      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32 w-full">
        <div className="max-w-2xl">
          <motion.p
            className="text-[13px] font-light tracking-wide text-ink-secondary uppercase mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Calendar intelligence
          </motion.p>

          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-ink mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your schedule,
            <br />
            as weather.
          </motion.h1>

          <motion.p
            className="text-lg font-light text-ink-secondary leading-relaxed mb-10 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Busy days are storms. Free days are clear skies. Know your week at
            a glance, without reading a single event.
          </motion.p>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-ink px-5 py-2.5 rounded-sm hover:bg-ink/85 transition-colors"
            >
              View forecast
              <ArrowRight size={14} />
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-light text-ink-secondary hover:text-ink transition-colors"
            >
              Learn more
            </Link>
          </motion.div>
        </div>

        {/* Week preview strip */}
        <motion.div
          className="mt-20 sm:mt-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[11px] font-light tracking-wider text-ink-tertiary uppercase mb-4">
            This week
          </p>
          <div className="grid grid-cols-5 gap-px bg-ink-faint/50 rounded-sm overflow-hidden">
            {previewDays.map((d, i) => (
              <motion.div
                key={d.day}
                className={`${weatherCardBg[d.weather]} p-5 sm:p-6 flex flex-col items-center gap-3`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                <span className="text-[11px] font-medium tracking-wide text-ink-tertiary uppercase">
                  {d.day}
                </span>
                <WeatherIcon
                  weather={d.weather}
                  size={28}
                  className="text-ink-secondary"
                />
                <span className="text-[12px] font-light text-ink-secondary">
                  {d.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
