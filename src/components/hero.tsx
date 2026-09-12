"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WeatherIcon } from "./weather-icon";
import type { WeatherType } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

const previewDays: {
  day: string;
  date: number;
  weather: WeatherType;
  label: string;
}[] = [
  { day: "Mon", date: 12, weather: "partly-cloudy", label: "2 events" },
  { day: "Tue", date: 13, weather: "stormy", label: "7 events" },
  { day: "Wed", date: 14, weather: "rainy", label: "5 events" },
  { day: "Thu", date: 15, weather: "cloudy", label: "3 events" },
  { day: "Fri", date: 16, weather: "sunny", label: "Free" },
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
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28 w-full">
        <div className="grid lg:grid-cols-[1fr,auto] gap-16 items-center">
          {/* Copy */}
          <div>
            <motion.h1
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-ink leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your calendar,
              <br />
              <span className="text-accent">as weather.</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-ink-2 leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Busy days are storms. Free days are sunshine. See your whole week
              at a glance without reading a single event.
            </motion.p>

            <motion.div
              className="flex items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 text-sm font-medium text-surface bg-ink px-5 py-2.5 rounded-lg hover:bg-ink/85 transition-colors"
              >
                See the forecast
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-ink-2 hover:text-ink transition-colors"
              >
                How it works
              </Link>
            </motion.div>
          </div>

          {/* Preview card */}
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-surface border border-ink-4/50 rounded-2xl shadow-lg shadow-ink/5 overflow-hidden">
              <div className="px-5 pt-5 pb-3 border-b border-ink-4/30">
                <p className="text-xs font-medium text-ink-3 uppercase tracking-wider">
                  This week
                </p>
              </div>
              <div className="divide-y divide-ink-4/30">
                {previewDays.map((d, i) => (
                  <motion.div
                    key={d.day}
                    className={`${weatherCardBg[d.weather]} px-5 py-3.5 flex items-center gap-4`}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                  >
                    <span className="text-xs font-medium text-ink-3 w-8">{d.day}</span>
                    <span className="text-sm tabular-nums text-ink-2 w-5">{d.date}</span>
                    <WeatherIcon weather={d.weather} size={22} />
                    <span className="text-xs text-ink-3 ml-auto">{d.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
