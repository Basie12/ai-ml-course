import { PRICING_ROADMAP } from "@/lib/site-content";

export function PricingRoadmap() {
  return (
    <div className="price-roadmap reveal">
      <h3>Pricing Roadmap</h3>
      <p>
        Price increases with each cohort as outcomes data, testimonials, and completions accumulate. Get in at Cohort
        #1 — the lowest price this program will ever be.
      </p>
      <ul className="roadmap-row">
        {PRICING_ROADMAP.map((step, i) => (
          <li key={step.title} className={`roadmap-card${i === 0 ? " now" : ""}`}>
            <p className="roadmap-cohort">{step.title}</p>
            <p className="roadmap-price">{step.price}</p>
            <p className="roadmap-detail">{step.seats}</p>
            <p className="roadmap-goal">{step.goal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
