"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Clock, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WeatherIcon } from "@/components/weather-icon";
import {
  generateMockMonth,
  getWeatherLabel,
  type CalendarDay,
  type WeatherType,
} from "@/lib/mock-data";

const weatherBg: Record<WeatherType, string> = {
  sunny: "from-sunrise-50 to-amber-50 border-sunrise-200",
  "partly-cloudy": "from-midday-50 to-sky-50 border-midday-200",
  cloudy: "from-gray-100 to-slate-50 border-gray-200",
  rainy: "from-slate-100 to-gray-100 border-slate-300",
  stormy: "from-slate-200 to-gray-200 border-slate-400",
};

const weatherText: Record<WeatherType, string> = {
  sunny: "text-sunrise-600",
  "partly-cloudy": "text-midday-600",
  cloudy: "text-gray-600",
  rainy: "text-slate-700",
  stormy: "text-slate-800",
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
  const [view, setView] = useState<"month" | "week">("month");

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

  // Get current week's days for week view
  const today = now.getDate();
  const todayDayOfWeek = now.getDay();
  const weekStart = today - todayDayOfWeek;
  const weekDays =
    year === now.getFullYear() && month === now.getMonth()
      ? days.filter((d) => {
          const date = d.date.getDate();
          return date >= weekStart && date < weekStart + 7;
        })
      : days.slice(0, 7);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-gray-900">
                Your Forecast
              </h1>
              <p className="text-gray-500 mt-1">
                Demo data — connect your calendar to see real weather
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  view === "week"
                    ? "bg-midday-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  view === "month"
                    ? "bg-midday-500 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-gray-900">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Weather legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            {(
              [
                "sunny",
                "partly-cloudy",
                "cloudy",
                "rainy",
                "stormy",
              ] as WeatherType[]
            ).map((w) => (
              <div
                key={w}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <WeatherIcon weather={w} size="sm" animated={false} />
                <span>{getWeatherLabel(w)}</span>
              </div>
            ))}
          </div>

          {/* Week view */}
          {view === "week" && (
            <div className="grid grid-cols-7 gap-3 mb-8">
              {weekDays.map((day) => {
                const isToday =
                  day.date.getDate() === now.getDate() &&
                  day.date.getMonth() === now.getMonth() &&
                  day.date.getFullYear() === now.getFullYear();
                return (
                  <motion.button
                    key={day.date.toISOString()}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${weatherBg[day.weather]} border text-center cursor-pointer hover:shadow-md transition-shadow ${
                      isToday ? "ring-2 ring-midday-400" : ""
                    }`}
                    onClick={() => setSelectedDay(day)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {dayLabels[day.date.getDay()]}
                    </p>
                    <p
                      className={`text-lg font-bold ${weatherText[day.weather]} mb-2`}
                    >
                      {day.date.getDate()}
                    </p>
                    <div className="flex justify-center">
                      <WeatherIcon weather={day.weather} size="md" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {day.events.length} event{day.events.length !== 1 ? "s" : ""}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Month view */}
          {view === "month" && (
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Day labels */}
              {dayLabels.map((label) => (
                <div
                  key={label}
                  className="text-center text-xs font-medium text-gray-400 py-2"
                >
                  {label}
                </div>
              ))}
              {/* Blank days */}
              {blanks.map((b) => (
                <div key={`blank-${b}`} />
              ))}
              {/* Calendar days */}
              {days.map((day) => {
                const isToday =
                  day.date.getDate() === now.getDate() &&
                  day.date.getMonth() === now.getMonth() &&
                  day.date.getFullYear() === now.getFullYear();
                return (
                  <motion.button
                    key={day.date.toISOString()}
                    className={`relative p-2 sm:p-3 rounded-xl bg-gradient-to-br ${weatherBg[day.weather]} border cursor-pointer hover:shadow-md transition-shadow aspect-square flex flex-col items-center justify-center gap-1 ${
                      isToday ? "ring-2 ring-midday-400" : ""
                    }`}
                    onClick={() => setSelectedDay(day)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span
                      className={`text-xs sm:text-sm font-semibold ${weatherText[day.weather]}`}
                    >
                      {day.date.getDate()}
                    </span>
                    <WeatherIcon weather={day.weather} size="sm" animated={false} />
                    <span className="text-[10px] text-gray-400 hidden sm:block">
                      {day.events.length}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Day detail panel */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                  onClick={() => setSelectedDay(null)}
                />
                <motion.div
                  className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-xl overflow-hidden"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                >
                  {/* Header */}
                  <div
                    className={`p-6 bg-gradient-to-br ${weatherBg[selectedDay.weather]}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          {dayLabels[selectedDay.date.getDay()]},{" "}
                          {monthNames[selectedDay.date.getMonth()]}{" "}
                          {selectedDay.date.getDate()}
                        </p>
                        <h3
                          className={`font-[family-name:var(--font-display)] text-2xl font-bold ${weatherText[selectedDay.weather]} mt-1`}
                        >
                          {getWeatherLabel(selectedDay.weather)}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Busy score: {selectedDay.busyScore}%
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedDay(null)}
                        className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                        aria-label="Close"
                      >
                        <X size={18} className="text-gray-500" />
                      </button>
                    </div>
                    <div className="flex justify-center mt-4">
                      <WeatherIcon weather={selectedDay.weather} size="xl" />
                    </div>
                  </div>

                  {/* Events */}
                  <div className="p-6 max-h-64 overflow-y-auto">
                    {selectedDay.events.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-400 text-sm">
                          No events — enjoy the sunshine!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedDay.events.map((event, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                          >
                            <div className="flex-shrink-0">
                              <Calendar size={16} className="text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {event.title}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-xs text-gray-500">
                                  {event.startTime} – {event.endTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
