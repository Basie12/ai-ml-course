import Link from "next/link";
import { PLANS } from "@/lib/plans";

export function PricingGrid() {
  return (
    <div className="price-grid">
      {PLANS.map((plan) => (
        <article key={plan.id} className={`price-card${plan.highlighted ? " featured" : ""} reveal`}>
          {plan.highlighted && <span className="price-badge">Founding Cohort</span>}
          <p className="price-tier">{plan.tierLabel}</p>
          <p className="price-amount">
            <sup>$</sup>
            {plan.price.toLocaleString()}
          </p>
          <p className="price-note">Founding price · one-time</p>
          <p className="price-tagline">{plan.blurb}</p>
          <ul className="price-features">
            {plan.features.map((f) =>
              f.included ? (
                <li key={f.label}>{f.label}</li>
              ) : (
                <li key={f.label} className="no">
                  <span className="sr-only">Not included: </span>
                  {f.label}
                </li>
              )
            )}
          </ul>
          <Link
            className={`btn ${plan.highlighted ? "btn-primary" : "btn-ghost-l"} btn-block`}
            href={`/subscribe?plan=${plan.id}`}
          >
            {plan.cta}
          </Link>
        </article>
      ))}
    </div>
  );
}
