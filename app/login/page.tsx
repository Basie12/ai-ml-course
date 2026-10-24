"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAccount } from "@/lib/auth";
import { appPath } from "@/lib/paths";

function LoginInner() {
  const params = useSearchParams();
  const rawNext = params.get("next") || "/dashboard";
  // Only allow same-site paths (blocks "//evil.com" and "/\\evil.com" open redirects)
  const next = /^\/(?![\/\\])/.test(rawNext) ? rawNext : "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await loginAccount(email.trim(), password);
      // Hard navigation avoids App Router soft-nav hang after auth
      window.location.assign(appPath(next));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-visual" aria-hidden>
        <p className="auth-mark">BASSA</p>
        <p className="auth-tag">Ship models. Own the stack.</p>
      </div>
      <div className="auth-panel">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <p className="auth-lead">
          Pick up your curriculum, projects, and live sessions.
        </p>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-block" disabled={busy} type="submit">
            {busy ? "Signing in…" : "Enter the lab"}
          </button>
        </form>
        <p className="auth-foot">
          New here?{" "}
          <Link href={`/signup?next=${encodeURIComponent(next)}`}>
            Create an account
          </Link>
          <br />
          <span style={{ fontSize: "0.85rem" }}>
            Wrong password? Use Sign up with the same email only if the account
            doesn&apos;t exist — otherwise reset in Supabase Auth → Users.
          </span>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-shell">
          <div className="auth-panel">
            <h1>Loading…</h1>
          </div>
        </main>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
