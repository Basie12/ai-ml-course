import { PricingGrid } from "@/components/PricingGrid";
import { RefundPolicy } from "@/components/RefundPolicy";
import { PricingRoadmap } from "@/components/PricingRoadmap";

export default function PricingPage() {
  return (
    <main id="main" className="section bg-tint" aria-labelledby="priceTitle">
      <div className="wrap">
        <div className="head center">
          <p className="eyebrow">Pricing</p>
          <h1 id="priceTitle" style={{ fontSize: "clamp(2rem, 4.2vw, 3rem)", marginTop: 14 }}>
            Founding Cohort — Limited to 15 Seats
          </h1>
          <p>
            Create an account first, then continue to Stripe. Materials unlock for your plan after payment. 7-day refund
            window after orientation.
          </p>
        </div>
        <PricingGrid />
        <RefundPolicy />
        <PricingRoadmap />
      </div>
    </main>
  );
}
