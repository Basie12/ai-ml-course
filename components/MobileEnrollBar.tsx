"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* Phone-only enroll bar: appears once the hero scrolls away, hides while the
   pricing section (which has its own buttons) is on screen. */
export function MobileEnrollBar() {
  const [pastHero, setPastHero] = useState(false);
  const [pricingVisible, setPricingVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const pricing = document.getElementById("pricing");
    let observer: IntersectionObserver | undefined;
    if (pricing && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => setPricingVisible(entry.isIntersecting),
        { threshold: 0.1 },
      );
      observer.observe(pricing);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const show = pastHero && !pricingVisible;

  return (
    <div className={`mobile-enroll-bar${show ? " show" : ""}`} aria-hidden={!show}>
      <div className="mobile-enroll-text">
        <strong>Founding Cohort · $1,299</strong>
        <span>Starts Nov 14 · 15 seats</span>
      </div>
      <Link
        href="/subscribe?plan=COHORT"
        className="btn-primary mobile-enroll-btn"
        tabIndex={show ? 0 : -1}
      >
        Enroll
      </Link>
    </div>
  );
}
