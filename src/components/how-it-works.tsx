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
    range: "0 \u2013 1 events",
    description: "Wide open. Deep work, creative thinking, long walks.",
  },
  {
    weather: "partly-cloudy",
    label: "Fair",
    range: "2 \u2013 3 events",
    description: "A few things on the horizon. Comfortable and manageable.",
  },
  {
    weather: "cloudy",
    label: "Overcast",
    range: "3 \u2013 4 events",
    description: "Filling up. Context-switching starts to creep in.",
  },
  {
    weather: "rainy",
    label: "Rain",
    range: "4 \u2013 6 events",
    description: "Heavy day. Tight windows between commitments.",
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
    <section id="how-it-works" className="py-24 sm:py-32 bg-surface-sunken">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] font-light tracking-wider text-ink-tertiary uppercase mb-4">
            The scale
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ink max-w-sm">
            From clear to storm
          </h2>
        </motion.div>

        <div className="grid grid-cols-5 gap-px bg-ink-faint/40 rounded-sm overflow-hidden">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.weather}
              className={`${weatherCardBg[phase.weather]} p-5 sm:p-6 flex flex-col`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <WeatherIcon
                weather={phase.weather}
                size={24}
                className="text-ink-secondary mb-5"
              />
              <h3 className="text-sm font-medium text-ink mb-1">
                {phase.label}
              </h3>
              <p className="text-[11px] font-light text-ink-tertiary mb-3">
                {phase.range}
              </p>
              <p className="text-[13px] font-light text-ink-secondary leading-relaxed mt-auto">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
