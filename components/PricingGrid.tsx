"use client";

import Link from "next/link";
import { PLANS } from "@/lib/plans";

export function PricingGrid() {
  return (
    <div className="pricing-grid">
      {PLANS.map((plan) => (
        <article
          key={plan.id}
          className={`price-card ${plan.highlighted ? "featured" : ""}`}
        >
          {plan.highlighted && <p className="badge">Founding Cohort · Live</p>}
          <h3>{plan.name}</h3>
          <p className="price">
            <span>${plan.price.toLocaleString()}</span>
            <s>Retail: ${plan.retail.toLocaleString()}+</s>
          </p>
          <p className="blurb">{plan.blurb}</p>
          <ul>
            {plan.features.map((f) => (
              <li key={f.label} className={f.included ? "yes" : "no"}>
                {f.included ? "✓" : "–"} {f.label}
              </li>
            ))}
          </ul>
          <Link href={`/subscribe?plan=${plan.id}`} className="btn btn-block">
            {plan.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}
