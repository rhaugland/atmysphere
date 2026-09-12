"use client";

import { type WeatherType } from "@/lib/mock-data";

interface WeatherIconProps {
  weather: WeatherType;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 72,
  xl: 120,
};

export function WeatherIcon({
  weather,
  size = "md",
  animated = true,
}: WeatherIconProps) {
  const px = sizeMap[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center ${animated ? "animate-float" : ""}`}
      style={{ width: px, height: px }}
    >
      {weather === "sunny" && <SunIcon size={px} />}
      {weather === "partly-cloudy" && <PartlyCloudyIcon size={px} />}
      {weather === "cloudy" && <CloudyIcon size={px} />}
      {weather === "rainy" && <RainyIcon size={px} />}
      {weather === "stormy" && <StormyIcon size={px} />}
    </div>
  );
}

function SunIcon({ size }: { size: number }) {
  const r = size * 0.25;
  const center = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = center + Math.cos(angle) * r * 1.4;
        const y1 = center + Math.sin(angle) * r * 1.4;
        const x2 = center + Math.cos(angle) * r * 1.9;
        const y2 = center + Math.sin(angle) * r * 1.9;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#F97316"
            strokeWidth={size * 0.04}
            strokeLinecap="round"
            className="animate-pulse-glow"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        );
      })}
      {/* Sun body */}
      <circle cx={center} cy={center} r={r} fill="#FB923C">
        <animate
          attributeName="r"
          values={`${r};${r * 1.05};${r}`}
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={center} cy={center} r={r * 0.7} fill="#FDBA74" opacity="0.6" />
    </svg>
  );
}

function PartlyCloudyIcon({ size }: { size: number }) {
  const center = size / 2;
  const r = size * 0.15;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Small sun peeking */}
      <circle cx={center + size * 0.15} cy={center - size * 0.15} r={r} fill="#FB923C" />
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = ((i * 72 - 90) * Math.PI) / 180;
        const cx2 = center + size * 0.15 + Math.cos(angle) * r * 1.5;
        const cy2 = center - size * 0.15 + Math.sin(angle) * r * 1.5;
        return (
          <line
            key={i}
            x1={center + size * 0.15 + Math.cos(angle) * r * 1.1}
            y1={center - size * 0.15 + Math.sin(angle) * r * 1.1}
            x2={cx2}
            y2={cy2}
            stroke="#FB923C"
            strokeWidth={size * 0.03}
            strokeLinecap="round"
          />
        );
      })}
      {/* Cloud */}
      <ellipse cx={center - size * 0.05} cy={center + size * 0.05} rx={size * 0.28} ry={size * 0.15} fill="#E0F2FE" />
      <ellipse cx={center - size * 0.15} cy={center - size * 0.02} rx={size * 0.15} ry={size * 0.13} fill="#BAE6FD" />
      <ellipse cx={center + size * 0.05} cy={center - size * 0.04} rx={size * 0.18} ry={size * 0.14} fill="#E0F2FE" />
    </svg>
  );
}

function CloudyIcon({ size }: { size: number }) {
  const center = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g className="animate-drift" style={{ animationDuration: "8s" }}>
        <ellipse cx={center} cy={center + size * 0.05} rx={size * 0.32} ry={size * 0.16} fill="#BAE6FD" />
        <ellipse cx={center - size * 0.12} cy={center - size * 0.05} rx={size * 0.18} ry={size * 0.15} fill="#E0F2FE" />
        <ellipse cx={center + size * 0.1} cy={center - size * 0.08} rx={size * 0.2} ry={size * 0.16} fill="#E0F2FE" />
        <ellipse cx={center} cy={center - size * 0.12} rx={size * 0.15} ry={size * 0.13} fill="#BAE6FD" />
      </g>
    </svg>
  );
}

function RainyIcon({ size }: { size: number }) {
  const center = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Cloud */}
      <ellipse cx={center} cy={center - size * 0.05} rx={size * 0.3} ry={size * 0.14} fill="#94A3B8" />
      <ellipse cx={center - size * 0.1} cy={center - size * 0.15} rx={size * 0.16} ry={size * 0.13} fill="#CBD5E1" />
      <ellipse cx={center + size * 0.08} cy={center - size * 0.16} rx={size * 0.18} ry={size * 0.14} fill="#CBD5E1" />
      {/* Rain drops */}
      {[
        { x: center - size * 0.15, delay: 0 },
        { x: center - size * 0.05, delay: 0.3 },
        { x: center + size * 0.05, delay: 0.15 },
        { x: center + size * 0.15, delay: 0.45 },
      ].map((drop, i) => (
        <line
          key={i}
          x1={drop.x}
          y1={center + size * 0.1}
          x2={drop.x - size * 0.02}
          y2={center + size * 0.22}
          stroke="#38BDF8"
          strokeWidth={size * 0.03}
          strokeLinecap="round"
          className="animate-rain"
          style={{ animationDelay: `${drop.delay}s` }}
        />
      ))}
    </svg>
  );
}

function StormyIcon({ size }: { size: number }) {
  const center = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Dark cloud */}
      <ellipse cx={center} cy={center - size * 0.08} rx={size * 0.32} ry={size * 0.15} fill="#475569" />
      <ellipse cx={center - size * 0.12} cy={center - size * 0.18} rx={size * 0.17} ry={size * 0.14} fill="#64748B" />
      <ellipse cx={center + size * 0.1} cy={center - size * 0.2} rx={size * 0.19} ry={size * 0.15} fill="#64748B" />
      {/* Lightning bolt */}
      <polygon
        points={`
          ${center + size * 0.02},${center + size * 0.02}
          ${center - size * 0.06},${center + size * 0.18}
          ${center},${center + size * 0.16}
          ${center - size * 0.03},${center + size * 0.32}
          ${center + size * 0.1},${center + size * 0.12}
          ${center + size * 0.04},${center + size * 0.14}
        `}
        fill="#FBBF24"
        className="animate-pulse-glow"
      />
      {/* Rain drops */}
      {[
        { x: center - size * 0.18, delay: 0 },
        { x: center - size * 0.1, delay: 0.2 },
        { x: center + size * 0.15, delay: 0.1 },
        { x: center + size * 0.22, delay: 0.35 },
      ].map((drop, i) => (
        <line
          key={i}
          x1={drop.x}
          y1={center + size * 0.06}
          x2={drop.x - size * 0.02}
          y2={center + size * 0.18}
          stroke="#38BDF8"
          strokeWidth={size * 0.025}
          strokeLinecap="round"
          className="animate-rain"
          style={{ animationDelay: `${drop.delay}s` }}
        />
      ))}
    </svg>
  );
}
