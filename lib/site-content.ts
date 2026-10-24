/* Data shared by components. Landing-page copy lives in app/page.tsx. */

export const PRICING_ROADMAP = [
  {
    title: "Cohort #1 · Now",
    price: "$1,299",
    seats: "15 students · Full live access",
    goal: "Goal: Curriculum + testimonials + outcomes",
  },
  {
    title: "Cohort #2 · Next",
    price: "$1,599",
    seats: "20 students · Refined curriculum",
    goal: "Goal: Completion data + placement stories",
  },
  {
    title: "Cohort #3+",
    price: "$1,999–2,499",
    seats: "Full tier structure · Proven outcomes",
    goal: "Goal: $3,500+ mentorship tier",
  },
] as const;

export const LAUNCH_DATE = "2026-11-14T00:00:00-05:00";
