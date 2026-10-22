"use client";

import { useEffect, useState } from "react";
import { LAUNCH_DATE } from "@/lib/site-content";

type Parts = { days: number; hours: number; mins: number; secs: number };

function calc(): Parts {
  const diff = Math.max(0, new Date(LAUNCH_DATE).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function LaunchCountdown({ inline = false }: { inline?: boolean }) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(calc());
    const id = window.setInterval(() => setParts(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const launched =
    parts !== null &&
    parts.days + parts.hours + parts.mins + parts.secs === 0;

  if (inline) {
    if (!parts) return <span className="countdown-inline">Loading…</span>;
    if (launched) return <span className="countdown-inline">Live Now!</span>;
    return (
      <span className="countdown-inline">
        {parts.days}d {pad(parts.hours)}h {pad(parts.mins)}m {pad(parts.secs)}s
      </span>
    );
  }

  const units: [string, number | null][] = [
    ["Days", parts?.days ?? null],
    ["Hours", parts?.hours ?? null],
    ["Minutes", parts?.mins ?? null],
    ["Seconds", parts?.secs ?? null],
  ];

  return (
    <>
      <div className="countdown-block" aria-live="polite">
        {units.map(([label, value]) => (
          <div className="countdown-unit" key={label}>
            <span className="countdown-num">
              {value === null ? "--" : pad(value)}
            </span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
      <div className="countdown-caption">to launch · November 14, 2026</div>
    </>
  );
}
