"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSessionUser, logoutAccount, type SessionUser } from "@/lib/auth";
import { appPath } from "@/lib/paths";

const NAV_LINKS = [
  { href: "/#roadmap", label: "Program" },
  { href: "/#projects", label: "Projects" },
  { href: "/#instructor", label: "Instructor" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function onLogout() {
    await logoutAccount();
    setUser(null);
    window.location.href = appPath("/");
  }

  const close = () => setOpen(false);

  return (
    <header className={`nav${open ? " open" : ""}`} id="top">
      <div className="wrap nav-inner">
        <Link className="brand" href="/" aria-label="AI with Bassa — home">
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
          <defs>
            <linearGradient id="bmn" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#497BFF" />
              <stop offset="1" stopColor="#9461FF" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="9" fill="url(#bmn)" />
          <path d="M9 22l7-12 7 12M12 17.5h8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23.5" cy="9.5" r="2.6" fill="#25E6D3" />
        </svg>
          AI <span>with</span> Bassa
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="navLinks"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <nav aria-label="Primary">
          <ul className="nav-links" id="navLinks">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={appPath(l.href)} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link href="/dashboard" onClick={close}>
                    My courses
                  </Link>
                </li>
                <li>
                  <button type="button" className="linkish nav-signout" onClick={onLogout}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" onClick={close}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-cta">
                  <a className="btn btn-primary btn-sm" href={appPath("/#pricing")} onClick={close}>
                    Enroll now
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
