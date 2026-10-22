import { PRICING_ROADMAP } from "@/lib/site-content";

export function PricingRoadmap() {
  return (
    <div className="roadmap" id="roadmap">
      <h3>Pricing Roadmap</h3>
      <p className="sub" style={{ marginBottom: "1.25rem" }}>
        Price increases with each cohort as outcomes data, testimonials, and
        completions accumulate. Get in at Cohort #1 — the lowest price this
        program will ever be.
      </p>
      <div className="feature-list">
        {PRICING_ROADMAP.map((step) => (
          <div className="feature" key={step.title}>
            <h3>{step.title}</h3>
            <p>
              <strong>{step.price}</strong>
              <br />
              {step.seats}
              <br />
              {step.goal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
