import { PRICING_ROADMAP } from "@/lib/site-content";

export function PricingRoadmap() {
  return (
    <div className="roadmap" id="roadmap">
      <h3>Pricing Roadmap</h3>
      <p>
        Price increases with each cohort as outcomes data, testimonials, and
        completions accumulate. Get in at Cohort #1 — the lowest price this
        program will ever be.
      </p>
      <div className="roadmap-row">
        {PRICING_ROADMAP.map((step) => (
          <div className="roadmap-card" key={step.title}>
            <div className="roadmap-cohort">{step.title}</div>
            <div className="roadmap-price">{step.price}</div>
            <div className="roadmap-detail">{step.seats}</div>
            <div className="roadmap-goal">{step.goal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
