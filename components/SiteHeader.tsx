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
    <header className="site-header">
      <Link href="/" className="brand">
        BASSA<span>COURSE</span>
      </Link>
      <nav>
        <a href={appPath("/#curriculum")}>Curriculum</a>
        <a href={appPath("/#outcomes")}>Outcomes</a>
        <a href={appPath("/#salary")}>Salary</a>
        <a href={appPath("/#projects")}>Projects</a>
        <a href={appPath("/#pricing")}>Pricing</a>
        <a href={appPath("/#outline")}>Outline</a>
        <a href={appPath("/#about")}>About</a>
        {user ? (
          <>
            <Link href="/dashboard">My courses</Link>
            <button type="button" className="linkish" onClick={onLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Sign in</Link>
            <Link href="/subscribe?plan=COHORT" className="btn btn-sm">
              Enroll Now
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
