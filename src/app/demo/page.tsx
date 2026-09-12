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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
    setSelectedDay(null);
  }

  return (
    <>
      <Navbar />
      <main className="pt-14 min-h-screen bg-surface">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-ink">
                Your Forecast
              </h1>
              <p className="text-sm text-ink-3 mt-1">
                Demo data &mdash; connect your calendar for real weather
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4">
              {(
                [
                  ["sunny", "Clear"],
                  ["partly-cloudy", "Fair"],
                  ["cloudy", "Overcast"],
                  ["rainy", "Rain"],
                  ["stormy", "Storm"],
                ] as [WeatherType, string][]
              ).map(([w, label]) => (
                <div key={w} className="flex items-center gap-1">
                  <WeatherIcon weather={w} size={14} />
                  <span className="text-[11px] text-ink-3">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Month navigation */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-surface-alt text-ink-2 hover:text-ink transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <h2 className="text-sm font-medium text-ink min-w-[140px] text-center">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-surface-alt text-ink-2 hover:text-ink transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Calendar grid */}
          <div className="rounded-xl overflow-hidden border border-ink-4/40 shadow-sm">
            {/* Day header */}
            <div className="grid grid-cols-7 bg-surface-alt border-b border-ink-4/30">
              {dayLabels.map((label) => (
                <div
                  key={label}
                  className="text-center text-[11px] font-medium text-ink-3 uppercase tracking-wider py-2.5"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7 gap-px bg-ink-4/20">
              {blanks.map((b) => (
                <div key={`blank-${b}`} className="bg-surface aspect-square" />
              ))}
              {days.map((day) => {
                const isToday =
                  day.date.getDate() === now.getDate() &&
                  day.date.getMonth() === now.getMonth() &&
                  day.date.getFullYear() === now.getFullYear();
                return (
                  <motion.button
                    key={day.date.toISOString()}
                    className={`${weatherCellBg[day.weather]} aspect-square p-1.5 sm:p-2.5 flex flex-col items-center justify-center gap-0.5 sm:gap-1 cursor-pointer transition-all hover:brightness-95 relative`}
                    onClick={() => setSelectedDay(day)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isToday && (
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                    <span
                      className={`text-[11px] sm:text-xs tabular-nums ${
                        isToday ? "font-semibold text-accent" : "text-ink-2"
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    <WeatherIcon weather={day.weather} size={20} />
                    <span className="text-[9px] sm:text-[10px] text-ink-3 hidden sm:block">
                      {day.events.length > 0 ? `${day.events.length}` : ""}
                    </span>
                  </motion.button>
                );
              })}
              {Array.from({
                length: (7 - ((blanks.length + days.length) % 7)) % 7,
              }).map((_, i) => (
                <div key={`trail-${i}`} className="bg-surface aspect-square" />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Day detail */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/15 backdrop-blur-sm"
              onClick={() => setSelectedDay(null)}
            />
            <motion.div
              className="relative z-10 w-full sm:max-w-sm bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className={`${weatherCellBg[selectedDay.weather]} px-6 pt-5 pb-4`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-ink-3 uppercase tracking-wider">
                      {dayLabels[selectedDay.date.getDay()]}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-ink mt-0.5">
                      {monthNames[selectedDay.date.getMonth()]}{" "}
                      {selectedDay.date.getDate()}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="p-1 text-ink-3 hover:text-ink transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <WeatherIcon weather={selectedDay.weather} size={22} />
                  <span className="text-sm text-ink-2">
                    {getWeatherLabel(selectedDay.weather)}
                  </span>
                  <span className="text-[11px] text-ink-3 ml-auto tabular-nums">
                    {selectedDay.busyScore}% busy
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 max-h-72 overflow-y-auto">
                {selectedDay.events.length === 0 ? (
                  <p className="text-sm text-ink-3 py-6 text-center">
                    Clear skies &mdash; nothing on the books
                  </p>
                ) : (
                  <div className="space-y-0">
                    {selectedDay.events.map((event, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2.5 border-b border-ink-4/20 last:border-0"
                      >
                        <div className="flex items-center gap-1 shrink-0 w-20">
                          <Clock size={12} className="text-ink-3" />
                          <span className="text-[11px] text-ink-3 tabular-nums">
                            {event.startTime}
                          </span>
                        </div>
                        <span className="text-sm text-ink truncate">
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
