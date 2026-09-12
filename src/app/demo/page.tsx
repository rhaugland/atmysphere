"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WeatherIcon } from "@/components/weather-icon";
import {
  generateMockMonth,
  getWeatherLabel,
  type CalendarDay,
  type WeatherType,
} from "@/lib/mock-data";

const weatherCellBg: Record<WeatherType, string> = {
  sunny: "bg-weather-clear",
  "partly-cloudy": "bg-weather-fair",
  cloudy: "bg-weather-cloudy",
  rainy: "bg-weather-rain",
  stormy: "bg-weather-storm",
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DemoPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const days = useMemo(() => generateMockMonth(year, month), [year, month]);

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const blanks = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDay(null);
  }

  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-ink mb-2">
              Forecast
            </h1>
            <p className="text-sm font-light text-ink-tertiary">
              Demo data &mdash; connect your calendar to see real weather
            </p>
          </div>

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevMonth}
              className="p-2 -ml-2 text-ink-secondary hover:text-ink transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-sm font-medium text-ink tracking-wide">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 -mr-2 text-ink-secondary hover:text-ink transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-6 overflow-x-auto">
            {(
              [
                ["sunny", "Clear"],
                ["partly-cloudy", "Fair"],
                ["cloudy", "Overcast"],
                ["rainy", "Rain"],
                ["stormy", "Storm"],
              ] as [WeatherType, string][]
            ).map(([w, label]) => (
              <div key={w} className="flex items-center gap-1.5 shrink-0">
                <WeatherIcon
                  weather={w}
                  size={14}
                  className="text-ink-tertiary"
                />
                <span className="text-[11px] font-light text-ink-tertiary">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="rounded-sm overflow-hidden border border-ink-faint/50">
            {/* Day header row */}
            <div className="grid grid-cols-7 bg-surface-sunken">
              {dayLabels.map((label) => (
                <div
                  key={label}
                  className="text-center text-[11px] font-medium tracking-wider text-ink-tertiary uppercase py-3"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-px bg-ink-faint/30">
              {blanks.map((b) => (
                <div key={`blank-${b}`} className="bg-surface aspect-square" />
              ))}
              {days.map((day) => {
                const isToday =
                  day.date.getDate() === now.getDate() &&
                  day.date.getMonth() === now.getMonth() &&
                  day.date.getFullYear() === now.getFullYear();
                return (
                  <button
                    key={day.date.toISOString()}
                    className={`${weatherCellBg[day.weather]} aspect-square p-2 sm:p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:opacity-80 transition-opacity relative ${
                      isToday ? "ring-1 ring-inset ring-sky" : ""
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <span
                      className={`text-[11px] sm:text-xs tabular-nums ${
                        isToday
                          ? "font-semibold text-sky"
                          : "font-light text-ink-secondary"
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    <WeatherIcon
                      weather={day.weather}
                      size={18}
                      className="text-ink-secondary"
                    />
                    <span className="text-[9px] sm:text-[10px] font-light text-ink-tertiary hidden sm:block">
                      {day.events.length === 0
                        ? ""
                        : `${day.events.length}`}
                    </span>
                  </button>
                );
              })}
              {/* Fill remaining cells to complete the grid row */}
              {Array.from({
                length: (7 - ((blanks.length + days.length) % 7)) % 7,
              }).map((_, i) => (
                <div
                  key={`trail-${i}`}
                  className="bg-surface aspect-square"
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Day detail slide-up */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
              onClick={() => setSelectedDay(null)}
            />
            <motion.div
              className="relative z-10 w-full sm:max-w-sm bg-surface-raised rounded-t-lg sm:rounded-lg shadow-2xl overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div
                className={`${weatherCellBg[selectedDay.weather]} px-6 pt-6 pb-5`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-light tracking-wider text-ink-tertiary uppercase">
                      {dayLabels[selectedDay.date.getDay()]}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-ink mt-1">
                      {monthNames[selectedDay.date.getMonth()]}{" "}
                      {selectedDay.date.getDate()}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="p-1 text-ink-tertiary hover:text-ink transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <WeatherIcon
                    weather={selectedDay.weather}
                    size={20}
                    className="text-ink-secondary"
                  />
                  <span className="text-sm font-light text-ink-secondary">
                    {getWeatherLabel(selectedDay.weather)}
                  </span>
                  <span className="text-[11px] font-light text-ink-tertiary ml-auto">
                    {selectedDay.busyScore}% busy
                  </span>
                </div>
              </div>

              {/* Events */}
              <div className="px-6 py-5 max-h-72 overflow-y-auto">
                {selectedDay.events.length === 0 ? (
                  <p className="text-sm font-light text-ink-tertiary py-6 text-center">
                    Clear skies &mdash; nothing scheduled
                  </p>
                ) : (
                  <div className="space-y-1">
                    {selectedDay.events.map((event, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2.5 border-b border-ink-faint/30 last:border-0"
                      >
                        <div className="flex items-center gap-1 shrink-0 w-24">
                          <Clock
                            size={12}
                            className="text-ink-tertiary"
                          />
                          <span className="text-[11px] font-light text-ink-tertiary tabular-nums">
                            {event.startTime}
                          </span>
                        </div>
                        <span className="text-sm font-light text-ink truncate">
                          {event.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
