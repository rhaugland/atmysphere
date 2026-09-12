"use client";

import { motion } from "framer-motion";
import { WeatherIcon } from "./weather-icon";
import type { WeatherType } from "@/lib/mock-data";

const phases: {
  weather: WeatherType;
  label: string;
  range: string;
  description: string;
}[] = [
  {
    weather: "sunny",
    label: "Clear",
    range: "0\u20131 events",
    description: "Wide open. Deep work, creative time, or just a breather.",
  },
  {
    weather: "partly-cloudy",
    label: "Fair",
    range: "2\u20133 events",
    description: "A couple things on the radar. Comfortable pace.",
  },
  {
    weather: "cloudy",
    label: "Overcast",
    range: "3\u20134 events",
    description: "Starting to fill up. Plan your focus blocks wisely.",
  },
  {
    weather: "rainy",
    label: "Rain",
    range: "4\u20136 events",
    description: "Busy day. Tight windows between meetings.",
  },
  {
    weather: "stormy",
    label: "Storm",
    range: "6+ events",
    description: "Back-to-back everything. Protect your energy.",
  },
];

const weatherCardBg: Record<WeatherType, string> = {
  sunny: "bg-weather-clear",
  "partly-cloudy": "bg-weather-fair",
  cloudy: "bg-weather-cloudy",
  rainy: "bg-weather-rain",
  stormy: "bg-weather-storm",
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-ink mb-3">
            The forecast scale
          </h2>
          <p className="text-base text-ink-2 max-w-md">
            The more packed your schedule, the stormier your day.
          </p>
        </motion.div>

        <div className="grid grid-cols-5 gap-3">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.weather}
              className={`${weatherCardBg[phase.weather]} rounded-xl p-4 sm:p-5 flex flex-col items-center text-center`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <WeatherIcon weather={phase.weather} size={28} className="mb-3" />
              <h3 className="text-sm font-semibold text-ink mb-0.5">
                {phase.label}
              </h3>
              <p className="text-[11px] text-ink-3 mb-2">{phase.range}</p>
              <p className="text-xs text-ink-2 leading-relaxed hidden sm:block">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
