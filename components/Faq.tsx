/* Every answer restates facts already published elsewhere on the site.
   Update here if the schedule, policy or plans change. */
const FAQ_ITEMS = [
  {
    q: "How much time does this take each week?",
    a: "Plan on 10–15 hours a week for 24 weeks. The program is built for people with full-time jobs — evenings and weekends work.",
  },
  {
    q: "Do I need to know Python already?",
    a: "No. Phase 1 teaches Python from the ground up. You do need some programming background in any language — SQL counts.",
  },
  {
    q: "When does the program start?",
    a: "The founding cohort launches November 14, 2026, and is capped at 15 students.",
  },
  {
    q: "What if I miss a live session?",
    a: "Both weekly live sessions are recorded, so you can catch up on your own time. Weekly office hours are optional.",
  },
  {
    q: "What will I have built by the end?",
    a: "Five production-grade projects plus a capstone — from a churn prediction system to a multi-agent support system — hosted on GitHub where hiring managers can open them.",
  },
  {
    q: "Which plan should I choose?",
    a: "Self-Paced gives you all recorded content and project repos. Founding Cohort adds two live sessions a week, office hours and code reviews. Mentorship adds six private 1:1 sessions, LinkedIn and resume work, and interview prep.",
  },
  {
    q: "What is the refund policy?",
    a: "Attend the orientation session, then you have 7 days to decide. If it isn't the right fit, email Bassa for a full refund, no questions asked. After 7 days, all sales are final.",
  },
  {
    q: "Is there a job guarantee?",
    a: "No. This program gives you production skills and a portfolio that proves them — you do the work. You do get a graduation certificate and LinkedIn verification for your projects.",
  },
];

export function Faq() {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="section-eyebrow">FAQ</div>
        <h2 className="section-title">Questions before you enroll</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
