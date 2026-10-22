import { PricingGrid } from "@/components/PricingGrid";
import { RefundPolicy } from "@/components/RefundPolicy";
import { PricingRoadmap } from "@/components/PricingRoadmap";

export default function PricingPage() {
  return (
    <main className="pricing-section">
      <div className="pricing-inner">
        <div className="section-eyebrow">Pricing</div>
        <h2 className="section-title">Founding Cohort — Limited to 15 Seats</h2>
        <p className="section-sub">
          Price reflects what the program is worth — 8 phases, 24 weeks,
          production-grade projects, and direct access to an engineer who has
          shipped ML in healthcare, biotech, and government. Prices rise with
          each cohort.
        </p>
        <p className="section-sub">
          Create an account first, then continue to Stripe. Materials unlock for
          your plan after payment.
        </p>
        <PricingGrid />
        <RefundPolicy />
        <PricingRoadmap />
      </div>
    </main>
  );
}
