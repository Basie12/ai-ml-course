"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSessionUser, logoutAccount, type SessionUser } from "@/lib/auth";
import { appPath } from "@/lib/paths";

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
        <li>
          <a href={appPath("/#curriculum")}>Curriculum</a>
        </li>
        <li>
          <a href={appPath("/#outcomes")}>Outcomes</a>
        </li>
        <li>
          <a href={appPath("/#salary")}>Salary</a>
        </li>
        <li>
          <a href={appPath("/#projects")}>Projects</a>
        </li>
        <li>
          <a href={appPath("/#pricing")}>Pricing</a>
        </li>
        <li>
          <a href={appPath("/#outline")}>Outline</a>
        </li>
        <li>
          <a href={appPath("/#about")}>About</a>
        </li>
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
