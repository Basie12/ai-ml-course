export type PaidPlan = "SELF_PACED" | "COHORT" | "MENTORSHIP";
export type SubscriptionTier = "NONE" | PaidPlan;

export type PlanInfo = {
  id: PaidPlan;
  name: string;
  price: number;
  retail: number;
  blurb: string;
  features: { label: string; included: boolean }[];
  cta: string;
  highlighted?: boolean;
};

/** Live Stripe Price IDs (Bassa AI Academy) */
export const STRIPE_PRICE_IDS: Record<PaidPlan, string> = {
  SELF_PACED: "price_1UT5HUEjO85BLtu0okjEzlbt",
  COHORT: "price_1ULBgEEjO85BLtu0KOYFbDnb",
  MENTORSHIP: "price_1UT5HVEjO85BLtu09yZJ23tZ",
};

export const PLANS: PlanInfo[] = [
  {
    id: "SELF_PACED",
    name: "Self-Paced",
    price: 799,
    retail: 999,
    blurb:
      "All recorded video content, 8 phases, 5 production projects, and code repos. Learn on your own schedule.",
    cta: "Get Self-Paced Access",
    features: [
      { label: "All 8 phases of video content", included: true },
      { label: "5 project repos with starter code", included: true },
      { label: "Community Discord access", included: true },
      { label: "Resume + GitHub review template", included: true },
      { label: "2 live sessions per week", included: false },
      { label: "Weekly office hours", included: false },
      { label: "Project code reviews", included: false },
      { label: "1:1 mentoring sessions", included: false },
    ],
  },
  {
    id: "COHORT",
    name: "Founding Cohort",
    price: 1299,
    retail: 1799,
    blurb:
      "The full live experience — weekly engineering sessions, office hours, code reviews, and direct shaping of the curriculum.",
    cta: "Join Founding Cohort — $1,299",
    highlighted: true,
    features: [
      { label: "All 8 phases of video content", included: true },
      { label: "5 project repos with starter code", included: true },
      { label: "Community Discord access", included: true },
      { label: "Resume + GitHub review", included: true },
      { label: "2 live sessions per week (recorded)", included: true },
      { label: "Weekly office hours", included: true },
      { label: "Project code reviews from Bassa", included: true },
      { label: "1:1 mentoring sessions", included: false },
    ],
  },
  {
    id: "MENTORSHIP",
    name: "Mentorship",
    price: 2499,
    retail: 3499,
    blurb:
      "Everything in Cohort, plus 6 private 1:1 sessions, LinkedIn overhaul, interview prep, and direct job search strategy.",
    cta: "Apply for Mentorship",
    features: [
      { label: "Everything in Founding Cohort", included: true },
      { label: "6 × 60-min 1:1 sessions with Bassa", included: true },
      { label: "Dedicated portfolio + GitHub review", included: true },
      { label: "LinkedIn and resume overhaul", included: true },
      { label: "Interview prep and mock sessions", included: true },
      { label: "US job market positioning strategy", included: true },
      { label: "Priority response via Discord", included: true },
    ],
  },
];

export const TIER_RANK: Record<SubscriptionTier, number> = {
  NONE: 0,
  SELF_PACED: 1,
  COHORT: 2,
  MENTORSHIP: 3,
};

/** Exact match: material must list the learner's tier in visibleToTiers. */
export function canAccessMaterial(
  userTier: SubscriptionTier,
  visibleToTiers: (SubscriptionTier | null | undefined)[] | null | undefined
): boolean {
  if (!visibleToTiers || visibleToTiers.length === 0) return false;
  if (userTier === "NONE") return false;
  return visibleToTiers.includes(userTier);
}

export function planLabel(tier: SubscriptionTier): string {
  switch (tier) {
    case "SELF_PACED":
      return "Self-Paced";
    case "COHORT":
      return "Founding Cohort";
    case "MENTORSHIP":
      return "Mentorship";
    default:
      return "No active plan";
  }
}
