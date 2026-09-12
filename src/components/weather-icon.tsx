"use client";

import { type WeatherType } from "@/lib/mock-data";

interface WeatherIconProps {
  weather: WeatherType;
  size?: number;
  className?: string;
}

const weatherColors: Record<WeatherType, { primary: string; secondary: string }> = {
  sunny: { primary: "#f59e42", secondary: "#fbbf24" },
  "partly-cloudy": { primary: "#64a8e3", secondary: "#f59e42" },
  cloudy: { primary: "#94a3b8", secondary: "#b0bec9" },
  rainy: { primary: "#6889b0", secondary: "#64a8e3" },
  stormy: { primary: "#4b5c78", secondary: "#fbbf24" },
};

export function WeatherIcon({
  weather,
  size = 24,
  className = "",
}: WeatherIconProps) {
  const c = weatherColors[weather];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {weather === "sunny" && (
        <>
          <circle cx="12" cy="12" r="4" stroke={c.primary} fill={c.secondary} fillOpacity={0.2} />
          <line x1="12" y1="2" x2="12" y2="5" stroke={c.primary} />
          <line x1="12" y1="19" x2="12" y2="22" stroke={c.primary} />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke={c.primary} />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke={c.primary} />
          <line x1="2" y1="12" x2="5" y2="12" stroke={c.primary} />
          <line x1="19" y1="12" x2="22" y2="12" stroke={c.primary} />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke={c.primary} />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke={c.primary} />
        </>
      )}

      {weather === "partly-cloudy" && (
        <>
          <circle cx="15" cy="8" r="3" stroke={c.secondary} fill={c.secondary} fillOpacity={0.15} />
          <line x1="15" y1="2.5" x2="15" y2="4" stroke={c.secondary} />
          <line x1="20.5" y1="8" x2="22" y2="8" stroke={c.secondary} />
          <line x1="19.24" y1="3.76" x2="18.18" y2="4.82" stroke={c.secondary} />
          <path
            d="M8 18h8a4 4 0 0 0 0-8h-.35A5.5 5.5 0 0 0 5 13.5V14a4 4 0 0 0 3 4z"
            stroke={c.primary}
            fill={c.primary}
            fillOpacity={0.08}
          />
        </>
      )}

      {weather === "cloudy" && (
        <path
          d="M17 18H6a5 5 0 0 1-.93-9.91A7 7 0 0 1 17.83 11H18a4 4 0 0 1 0 8z"
          stroke={c.primary}
          fill={c.primary}
          fillOpacity={0.1}
        />
      )}

      {weather === "rainy" && (
        <>
          <path
            d="M17 15H6a5 5 0 0 1-.93-9.91A7 7 0 0 1 17.83 8H18a4 4 0 0 1 0 8z"
            stroke={c.primary}
            fill={c.primary}
            fillOpacity={0.1}
          />
          <line x1="8" y1="18" x2="7" y2="21" stroke={c.secondary} />
          <line x1="12" y1="18" x2="11" y2="21" stroke={c.secondary} />
          <line x1="16" y1="18" x2="15" y2="21" stroke={c.secondary} />
        </>
      )}

      {weather === "stormy" && (
        <>
          <path
            d="M17 14H6a5 5 0 0 1-.93-9.91A7 7 0 0 1 17.83 7H18a4 4 0 0 1 0 8z"
            stroke={c.primary}
            fill={c.primary}
            fillOpacity={0.12}
          />
          <polyline points="13 16 11 20 15 20 13 24" stroke={c.secondary} strokeWidth={2} />
          <line x1="7" y1="17" x2="6" y2="20" stroke={c.primary} opacity={0.5} />
          <line x1="18" y1="17" x2="17" y2="20" stroke={c.primary} opacity={0.5} />
        </>
      )}
    </svg>
  );
}
