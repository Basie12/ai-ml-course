"use client";

import Link from "next/link";
import { PLANS } from "@/lib/plans";

export function PricingGrid() {
  return (
    <div className="pricing-grid">
      {PLANS.map((plan) => (
        <article
          key={plan.id}
          className={`price-card${plan.highlighted ? " featured" : ""}`}
        >
          {plan.highlighted && (
            <div className="price-badge">Founding Cohort · Live</div>
          )}
          <div className="price-tier">{plan.name}</div>
          <div className="price-amount">
            <sup>$</sup>
            {plan.price.toLocaleString()}
          </div>
          <div className="price-stripe">
            Retail: ${plan.retail.toLocaleString()}+
          </div>
          <p className="price-tagline">{plan.blurb}</p>
          <ul className="price-features">
            {plan.features.map((f) => (
              <li key={f.label} className={f.included ? undefined : "no"}>
                {f.label}
              </li>
            ))}
          </ul>
          <Link
            href={`/subscribe?plan=${plan.id}`}
            className="price-cta"
          >
            {plan.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}
