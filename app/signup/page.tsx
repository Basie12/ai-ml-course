"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { registerAccount } from "@/lib/auth";
import { appPath } from "@/lib/paths";

function SignupInner() {
  const params = useSearchParams();
  const rawNext = params.get("next") || "/dashboard";
  // Only allow same-site paths (blocks "//evil.com" and "/\\evil.com" open redirects)
  const next = /^\/(?![\/\\])/.test(rawNext) ? rawNext : "/dashboard";
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await registerAccount(email.trim(), password, phone.trim());
      window.location.assign(appPath(next));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <div className="auth-visual" aria-hidden>
        <p className="auth-mark">BASSA</p>
        <p className="auth-tag">Account first. Then enroll.</p>
      </div>
      <div className="auth-panel">
        <p className="eyebrow">Founding cohort</p>
        <h1>Create account</h1>
        <p className="auth-lead">
          You&apos;ll sign up before Stripe — so your seat stays tied to you.
        </p>
        <form className="form" onSubmit={onRegister}>
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
            Phone
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="+1 555 000 0000"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 6 characters"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-block" disabled={busy} type="submit">
            {busy ? "Creating…" : "Create account"}
          </button>
        </form>
        <p className="auth-foot">
          Already enrolled?{" "}
          <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
        </p>
      </div>
    </main>
  );
}

export default function SignupPage() {
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
      <SignupInner />
    </Suspense>
  );
}
