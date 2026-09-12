"use client";

import { type WeatherType } from "@/lib/mock-data";

interface WeatherIconProps {
  weather: WeatherType;
  size?: number;
  className?: string;
}

export function WeatherIcon({
  weather,
  size = 24,
  className = "",
}: WeatherIconProps) {
  const stroke = "currentColor";
  const sw = 1.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {weather === "sunny" && (
        <>
          <circle cx="12" cy="12" r="4" stroke={stroke} />
          <line x1="12" y1="2" x2="12" y2="5" stroke={stroke} />
          <line x1="12" y1="19" x2="12" y2="22" stroke={stroke} />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke={stroke} />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke={stroke} />
          <line x1="2" y1="12" x2="5" y2="12" stroke={stroke} />
          <line x1="19" y1="12" x2="22" y2="12" stroke={stroke} />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke={stroke} />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke={stroke} />
        </>
      )}

      {weather === "partly-cloudy" && (
        <>
          <circle cx="15" cy="9" r="3" stroke={stroke} />
          <line x1="15" y1="3" x2="15" y2="4.5" stroke={stroke} />
          <line x1="21" y1="9" x2="22" y2="9" stroke={stroke} />
          <line x1="19.24" y1="4.76" x2="18.18" y2="5.82" stroke={stroke} />
          <path
            d="M8 17h8a4 4 0 0 0 0-8h-.35A5.5 5.5 0 0 0 5 12.5V13a4 4 0 0 0 3 4z"
            stroke={stroke}
          />
        </>
      )}

      {weather === "cloudy" && (
        <path
          d="M17 18H6a5 5 0 0 1-.93-9.91A7 7 0 0 1 17.83 11H18a4 4 0 0 1 0 8z"
          stroke={stroke}
        />
      )}

      {weather === "rainy" && (
        <>
          <path
            d="M17 15H6a5 5 0 0 1-.93-9.91A7 7 0 0 1 17.83 8H18a4 4 0 0 1 0 8z"
            stroke={stroke}
          />
          <line x1="8" y1="18" x2="7" y2="21" stroke={stroke} />
          <line x1="12" y1="18" x2="11" y2="21" stroke={stroke} />
          <line x1="16" y1="18" x2="15" y2="21" stroke={stroke} />
        </>
      )}

      {weather === "stormy" && (
        <>
          <path
            d="M17 14H6a5 5 0 0 1-.93-9.91A7 7 0 0 1 17.83 7H18a4 4 0 0 1 0 8z"
            stroke={stroke}
          />
          <polyline points="13 16 11 20 15 20 13 24" stroke={stroke} />
          <line x1="7" y1="17" x2="6" y2="20" stroke={stroke} />
          <line x1="18" y1="17" x2="17" y2="20" stroke={stroke} />
        </>
      )}
    </svg>
  );
}
