"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Fades sections in as they scroll into view. Content stays visible without JS
   (the hidden state only applies once <html> has the "js" class). */
export function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    // reveal anything already on screen immediately, then enable the effect
    els.forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) e.classList.add("in");
      io.observe(e);
    });
    root.classList.add("js");
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
