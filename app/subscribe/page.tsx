"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PLANS, type PaidPlan } from "@/lib/plans";
import { getSessionUser, type SessionUser } from "@/lib/auth";
import { api } from "@/lib/api";

function SubscribeInner() {
  const params = useSearchParams();
  const planId = (params.get("plan") || "COHORT").toUpperCase() as PaidPlan;
  const plan = useMemo(
    () => PLANS.find((p) => p.id === planId) ?? PLANS[1],
    [planId]
  );
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const cancelled = params.get("checkout") === "cancel";

  useEffect(() => {
    getSessionUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  async function startCheckout() {
    if (!user) return;
    setBusy(true);
    setError("");
    try {
      const origin = window.location.origin;
      const data = await api.checkout(plan.id, {
        successUrl: `${origin}/dashboard?checkout=success&plan=${plan.id}`,
        cancelUrl: `${origin}/subscribe?plan=${plan.id}&checkout=cancel`,
      });
      if (!data.url) throw new Error("No Stripe URL returned");
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Checkout failed. Stripe is not configured yet."
      );
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main className="panel">
        <h1>Loading…</h1>
      </main>
    );
  }

  if (!user) {
    const next = `/subscribe?plan=${plan.id}`;
    return (
      <main className="panel">
        <h1>Create an account to continue</h1>
        <p>
          You selected <strong>{plan.name}</strong> ($
          {plan.price.toLocaleString()}). Sign up first, then Stripe Checkout.
        </p>
        <div className="cta-row">
          <Link
            className="btn"
            href={`/signup?next=${encodeURIComponent(next)}`}
          >
            Create account
          </Link>
          <Link
            className="btn btn-ghost"
            href={`/login?next=${encodeURIComponent(next)}`}
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="panel">
      <h1>Complete payment</h1>
      <p>
        Signed in as <strong>{user.email}</strong>. Continue to Stripe for{" "}
        <strong>{plan.name}</strong> — ${plan.price.toLocaleString()}.
      </p>
      {cancelled && (
        <p className="error">Checkout cancelled. You can try again anytime.</p>
      )}
      {error && <p className="error">{error}</p>}
      <button className="btn btn-block" disabled={busy} onClick={startCheckout}>
        {busy
          ? "Redirecting to Stripe…"
          : `Pay $${plan.price.toLocaleString()} with Stripe`}
      </button>
    </main>
  );
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="panel">
          <h1>Loading…</h1>
        </main>
      }
    >
      <SubscribeInner />
    </Suspense>
  );
}
