"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PLANS, type PaidPlan } from "@/lib/plans";
import { getSessionUser, type SessionUser } from "@/lib/auth";
import { api } from "@/lib/api";

const STEPS = ["Create your account", "Pay securely with Stripe", "Get instant access"];

function PlanSummary({ planId }: { planId: PaidPlan }) {
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const included = plan.features.filter((f) => f.included);
  return (
    <aside className="checkout-summary" aria-label="Your plan">
      <div className="checkout-summary-label">Your plan</div>
      <div className="checkout-summary-name">{plan.name}</div>
      <div className="checkout-summary-price">
        ${plan.price.toLocaleString()}
        <span> one-time</span>
      </div>
      <ul className="checkout-summary-list">
        {included.map((f) => (
          <li key={f.label}>{f.label}</li>
        ))}
      </ul>
      <div className="checkout-summary-note">
        7-day refund window after orientation · no questions asked
      </div>
      <Link href="/pricing" className="checkout-change">
        Change plan
      </Link>
    </aside>
  );
}

function Steps({ current }: { current: number }) {
  return (
    <ol className="checkout-steps">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className={i < current ? "done" : i === current ? "current" : undefined}
          aria-current={i === current ? "step" : undefined}
        >
          <span className="checkout-step-num">{i < current ? "✓" : i + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}

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
      <main className="checkout-page">
        <div className="checkout-card">
          <p className="checkout-loading">Loading…</p>
        </div>
      </main>
    );
  }

  if (!user) {
    const next = `/subscribe?plan=${plan.id}`;
    return (
      <main className="checkout-page">
        <div className="checkout-layout">
          <div className="checkout-card">
            <Steps current={0} />
            <div className="eyebrow">Step 1 of 3</div>
            <h1>Create an account to continue</h1>
            <p className="checkout-lead">
              You selected <strong>{plan.name}</strong> ($
              {plan.price.toLocaleString()}). Create your account first, so
              your seat and course materials stay tied to you — then you&apos;ll
              pay securely with Stripe.
            </p>
            <div className="checkout-actions">
              <Link
                className="btn"
                href={`/signup?next=${encodeURIComponent(next)}`}
              >
                Create account
              </Link>
              <Link
                className="btn btn-outline"
                href={`/login?next=${encodeURIComponent(next)}`}
              >
                I already have an account
              </Link>
            </div>
          </div>
          <PlanSummary planId={plan.id} />
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-layout">
        <div className="checkout-card">
          <Steps current={1} />
          <div className="eyebrow">Step 2 of 3</div>
          <h1>Complete payment</h1>
          <p className="checkout-lead">
            Signed in as <strong>{user.email}</strong>. Continue to Stripe for{" "}
            <strong>{plan.name}</strong> — ${plan.price.toLocaleString()}.
          </p>
          {cancelled && (
            <p className="error" role="alert">
              Checkout cancelled. You can try again anytime.
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button
            className="btn btn-block"
            disabled={busy}
            onClick={startCheckout}
          >
            {busy
              ? "Redirecting to Stripe…"
              : `Pay $${plan.price.toLocaleString()} with Stripe`}
          </button>
          <p className="checkout-secure">
            Payments are processed by Stripe. Your card details never touch
            this site.
          </p>
        </div>
        <PlanSummary planId={plan.id} />
      </div>
    </main>
  );
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="checkout-page">
          <div className="checkout-card">
            <p className="checkout-loading">Loading…</p>
          </div>
        </main>
      }
    >
      <SubscribeInner />
    </Suspense>
  );
}
