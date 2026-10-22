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

export function LaunchCountdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(calc());
    const id = window.setInterval(() => setParts(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = parts ?? { days: 0, hours: 0, mins: 0, secs: 0 };

  return (
    <div className="countdown" aria-live="polite">
      <div className="countdown-grid">
        <div className="countdown-cell">
          <strong>{String(display.days).padStart(2, "0")}</strong>
          <span>Days</span>
        </div>
        <div className="countdown-cell">
          <strong>{String(display.hours).padStart(2, "0")}</strong>
          <span>Hours</span>
        </div>
        <div className="countdown-cell">
          <strong>{String(display.mins).padStart(2, "0")}</strong>
          <span>Minutes</span>
        </div>
        <div className="countdown-cell">
          <strong>{String(display.secs).padStart(2, "0")}</strong>
          <span>Seconds</span>
        </div>
      </div>
      <p className="countdown-caption">to launch · November 14, 2026</p>
    </div>
  );
}
