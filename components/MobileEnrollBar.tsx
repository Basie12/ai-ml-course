"use client";

import { useEffect, useState } from "react";

/* Phone-only enroll bar: shows once the hero is off screen, hides over pricing. */
export function MobileEnrollBar() {
  const [pastHero, setPastHero] = useState(false);
  const [inPricing, setInPricing] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const pricing = document.getElementById("pricing");
    if (!hero || !("IntersectionObserver" in window)) return;
    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting));
    heroObs.observe(hero);
    let pricingObs: IntersectionObserver | undefined;
    if (pricing) {
      pricingObs = new IntersectionObserver(([e]) => setInPricing(e.isIntersecting), { threshold: 0.05 });
      pricingObs.observe(pricing);
    }
    return () => {
      heroObs.disconnect();
      pricingObs?.disconnect();
    };
  }, []);

  const show = pastHero && !inPricing;
  return (
    <div className={`m-bar${show ? " show" : ""}`} aria-hidden={!show}>
      <div>
        <strong>Founding Cohort · $1,299</strong>
        <span>Launches Nov 14 · 15 seats</span>
      </div>
      <a className="btn btn-primary" href="#pricing" tabIndex={show ? 0 : -1}>
        Enroll
      </a>
    </div>
  );
}
