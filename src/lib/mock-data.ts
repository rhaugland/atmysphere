export type WeatherType = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "stormy";

export interface CalendarEvent {
  title: string;
  startTime: string;
  endTime: string;
}

export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
  weather: WeatherType;
  busyScore: number; // 0-100
}

export function getWeatherFromScore(score: number): WeatherType {
  if (score <= 10) return "sunny";
  if (score <= 30) return "partly-cloudy";
  if (score <= 55) return "cloudy";
  if (score <= 75) return "rainy";
  return "stormy";
}

export function getWeatherLabel(weather: WeatherType): string {
  const labels: Record<WeatherType, string> = {
    sunny: "Clear skies",
    "partly-cloudy": "A few clouds",
    cloudy: "Overcast",
    rainy: "Showers",
    stormy: "Thunderstorms",
  };
  return labels[weather];
}

export function getWeatherEmoji(weather: WeatherType): string {
  const emojis: Record<WeatherType, string> = {
    sunny: "sun",
    "partly-cloudy": "cloud-sun",
    cloudy: "cloud",
    rainy: "cloud-rain",
    stormy: "cloud-lightning",
  };
  return emojis[weather];
}

const sampleEvents = [
  { title: "Team standup", duration: 15 },
  { title: "Sprint planning", duration: 60 },
  { title: "1:1 with manager", duration: 30 },
  { title: "Design review", duration: 45 },
  { title: "Client call", duration: 60 },
  { title: "Lunch with Sarah", duration: 60 },
  { title: "Code review", duration: 30 },
  { title: "Product sync", duration: 30 },
  { title: "Interview - Sr. Engineer", duration: 60 },
  { title: "All-hands meeting", duration: 60 },
  { title: "Workshop: Q3 planning", duration: 120 },
  { title: "Board presentation", duration: 90 },
  { title: "Focus time", duration: 120 },
  { title: "Coffee chat", duration: 15 },
  { title: "Retrospective", duration: 60 },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateMockWeek(startDate: Date): CalendarDay[] {
  const days: CalendarDay[] = [];
  const rand = seededRandom(startDate.getTime());

  // Predefined busy patterns for a realistic week
  const busyPatterns = [65, 80, 45, 90, 30, 10, 5]; // Mon-Sun

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dayOfWeek = date.getDay();
    const baseBusy = busyPatterns[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
    const busyScore = Math.min(100, Math.max(0, baseBusy + Math.floor((rand() - 0.5) * 20)));

    const eventCount = Math.floor(busyScore / 15);
    const events: CalendarEvent[] = [];
    let currentHour = 8;

    for (let j = 0; j < eventCount && currentHour < 18; j++) {
      const event = sampleEvents[Math.floor(rand() * sampleEvents.length)];
      const startHour = currentHour;
      const endMinutes = event.duration;
      const endHour = startHour + endMinutes / 60;

      events.push({
        title: event.title,
        startTime: `${Math.floor(startHour)}:${(startHour % 1) * 60 === 0 ? "00" : "30"}`,
        endTime: `${Math.floor(endHour)}:${(endHour % 1) * 60 === 0 ? "00" : "30"}`,
      });

      currentHour = endHour + 0.5 * rand();
    }

    days.push({
      date,
      events,
      weather: getWeatherFromScore(busyScore),
      busyScore,
    });
  }

  return days;
}

export function generateMockMonth(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rand = seededRandom(year * 100 + month);

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayOfWeek = date.getDay();

    let baseBusy: number;
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseBusy = Math.floor(rand() * 20);
    } else {
      baseBusy = 20 + Math.floor(rand() * 80);
    }

    const busyScore = Math.min(100, Math.max(0, baseBusy));
    const eventCount = Math.floor(busyScore / 15);
    const events: CalendarEvent[] = [];
    let currentHour = 8;

    for (let j = 0; j < eventCount && currentHour < 18; j++) {
      const event = sampleEvents[Math.floor(rand() * sampleEvents.length)];
      const startHour = currentHour;
      const endHour = startHour + event.duration / 60;

      events.push({
        title: event.title,
        startTime: `${Math.floor(startHour)}:${(startHour % 1) * 60 === 0 ? "00" : "30"}`,
        endTime: `${Math.floor(endHour)}:${(endHour % 1) * 60 === 0 ? "00" : "30"}`,
      });

      currentHour = endHour + 0.5 * rand();
    }

    days.push({
      date,
      events,
      weather: getWeatherFromScore(busyScore),
      busyScore,
    });
  }

  return days;
}
