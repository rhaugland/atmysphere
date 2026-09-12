"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WeatherIcon } from "./weather-icon";
import type { WeatherType } from "@/lib/mock-data";

const weatherTypes: { type: WeatherType; label: string; x: number; y: number }[] = [
  { type: "sunny", label: "Free day", x: 15, y: 25 },
  { type: "partly-cloudy", label: "Light load", x: 75, y: 15 },
  { type: "cloudy", label: "Moderate", x: 85, y: 55 },
  { type: "rainy", label: "Busy", x: 20, y: 70 },
  { type: "stormy", label: "Packed", x: 65, y: 75 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunrise-50 via-midday-50 to-sunset-50" />

      {/* Floating weather icons in background */}
      <div className="absolute inset-0 hidden lg:block">
        {weatherTypes.map((w, i) => (
          <motion.div
            key={w.type}
            className="absolute opacity-20"
            style={{ left: `${w.x}%`, top: `${w.y}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
          >
            <WeatherIcon weather={w.type} size="xl" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midday-100 text-midday-600 text-sm font-medium mb-6">
              <div className="w-2 h-2 rounded-full bg-midday-400 animate-pulse" />
              Calendar meets weather
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your schedule,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunrise-500 via-midday-500 to-sunset-500">
                at a glance
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              atmysphere transforms your calendar into an intuitive weather
              forecast. Busy days appear as storms. Free days shine like
              sunshine. Know your week before you read a single event.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-sunrise-400 via-midday-500 to-sunset-500 hover:opacity-90 transition-opacity shadow-lg shadow-midday-500/25"
              >
                See the Forecast
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </motion.div>

          {/* Right: Weather preview cards */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[
                { weather: "sunny" as WeatherType, day: "Sunday", temp: "0 meetings", bg: "from-sunrise-100 to-sunrise-50" },
                { weather: "partly-cloudy" as WeatherType, day: "Monday", temp: "2 meetings", bg: "from-midday-100 to-midday-50" },
                { weather: "rainy" as WeatherType, day: "Tuesday", temp: "5 meetings", bg: "from-midday-200 to-gray-100" },
                { weather: "stormy" as WeatherType, day: "Wednesday", temp: "8 meetings", bg: "from-gray-200 to-gray-100" },
              ].map((card, i) => (
                <motion.div
                  key={card.day}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${card.bg} border border-white/60 shadow-sm`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                >
                  <p className="text-sm font-medium text-gray-500 mb-2">{card.day}</p>
                  <WeatherIcon weather={card.weather} size="lg" />
                  <p className="text-sm text-gray-600 mt-2">{card.temp}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
