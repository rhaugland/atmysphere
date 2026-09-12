"use client";

import { motion } from "framer-motion";
import { WeatherIcon } from "./weather-icon";
import type { WeatherType } from "@/lib/mock-data";

const timeOfDay = [
  {
    time: "sunrise",
    label: "Sunrise",
    sublabel: "0-1 meetings",
    weather: "sunny" as WeatherType,
    description: "A clear, open day. Time to breathe, create, and think deep.",
    bg: "bg-gradient-to-br from-sunrise-100 to-sunrise-50",
    border: "border-sunrise-200",
    textColor: "text-sunrise-600",
  },
  {
    time: "midday",
    label: "Midday",
    sublabel: "2-3 meetings",
    weather: "partly-cloudy" as WeatherType,
    description: "A few clouds on the horizon. Manageable with good energy.",
    bg: "bg-gradient-to-br from-midday-100 to-midday-50",
    border: "border-midday-200",
    textColor: "text-midday-600",
  },
  {
    time: "sunset",
    label: "Sunset",
    sublabel: "4-5 meetings",
    weather: "rainy" as WeatherType,
    description: "Getting heavy. Expect context-switching and tight windows.",
    bg: "bg-gradient-to-br from-sunset-100 to-sunset-50",
    border: "border-sunset-200",
    textColor: "text-sunset-600",
  },
  {
    time: "night",
    label: "Night",
    sublabel: "6+ meetings",
    weather: "stormy" as WeatherType,
    description: "Full storm. Back-to-back everything. Survival mode.",
    bg: "bg-gradient-to-br from-night-100 to-night-50",
    border: "border-night-200",
    textColor: "text-night-600",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            From sunrise to storm
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each time of day maps to a level of busyness. The more packed your
            schedule, the stormier your forecast.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeOfDay.map((phase, i) => (
            <motion.div
              key={phase.time}
              className={`p-6 rounded-2xl ${phase.bg} border ${phase.border} text-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <WeatherIcon weather={phase.weather} size="lg" />
              </div>
              <h3
                className={`font-[family-name:var(--font-display)] text-lg font-bold ${phase.textColor} mb-1`}
              >
                {phase.label}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{phase.sublabel}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {phase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
