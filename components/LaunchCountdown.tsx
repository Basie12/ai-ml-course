"use client";

import { useEffect, useState } from "react";
import { LAUNCH_DATE } from "@/lib/site-content";

type Parts = { days: number; hours: number; mins: number; secs: number };

function calc(): Parts | null {
  const diff = new Date(LAUNCH_DATE).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    mins: Math.floor((diff % 36e5) / 6e4),
    secs: Math.floor((diff % 6e4) / 1e3),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/* Inline chip in the hero, or the full countdown card in the pricing banner. */
export function LaunchCountdown({ inline = false }: { inline?: boolean }) {
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    setParts(calc());
    const id = window.setInterval(() => setParts(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (inline) {
    const text =
      parts === undefined ? "\u00a0" : parts === null ? "Live now" : `${parts.days}d ${pad(parts.hours)}h ${pad(parts.mins)}m`;
    return (
      <span className="chip" id="countdown-inline" aria-label="Time until launch">
        {text}
      </span>
    );
  }

  const units: [string, number | undefined][] = [
    ["Days", parts?.days],
    ["Hours", parts?.hours],
    ["Minutes", parts?.mins],
    ["Seconds", parts?.secs],
  ];
  return (
    <div className="countdown" aria-live="off">
      <p className="countdown-label">Founding cohort launches in</p>
      <div className="countdown-block">
        {units.map(([label, value]) => (
          <div className="countdown-unit" key={label}>
            <span className="countdown-num">{parts === null ? "00" : value === undefined ? "--" : pad(value)}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>
      <p className="countdown-foot">
        <b>November 14, 2026</b> · 15 seats total
      </p>
    </div>
  );
}
