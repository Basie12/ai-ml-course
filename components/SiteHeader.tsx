"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSessionUser, logoutAccount, type SessionUser } from "@/lib/auth";
import { appPath } from "@/lib/paths";

/* Kept to the sections a buyer actually needs; fewer links also stops the
   nav from overflowing on laptop-width screens. */
const NAV_LINKS = [
  { href: "/#curriculum", label: "Curriculum" },
  { href: "/#outcomes", label: "Outcomes", wide: true },
  { href: "/#projects", label: "Projects" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "Instructor", wide: true },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let alive = true;
    const t = window.setTimeout(() => {
      if (alive) setUser(null);
    }, 8000);
    getSessionUser()
      .then((u) => {
        if (alive) setUser(u);
      })
      .finally(() => window.clearTimeout(t));
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  async function onLogout() {
    await logoutAccount();
    setUser(null);
    window.location.href = appPath("/");
  }

  return (
    <nav className="site-header" aria-label="Primary">
      <Link href="/" className="nav-logo">
        Bassa<span>.</span>AI
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href} className={link.wide ? "nav-wide" : undefined}>
            <a href={appPath(link.href)}>{link.label}</a>
          </li>
        ))}
        {user ? (
          <>
            <li>
              <Link href="/dashboard">My courses</Link>
            </li>
            <li>
              <button type="button" className="linkish" onClick={onLogout}>
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Sign in</Link>
            </li>
            <li>
              <Link href="/subscribe?plan=COHORT" className="nav-cta">
                Enroll Now
              </Link>
            </li>
          </>
        )}
      </ul>
      {!user && (
        <Link href="/subscribe?plan=COHORT" className="nav-cta nav-cta-mobile">
          Enroll
        </Link>
      )}
    </nav>
  );
}
