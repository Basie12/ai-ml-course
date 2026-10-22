import Image from "next/image";
import Link from "next/link";
import { CurriculumTabs } from "@/components/CurriculumTabs";
import { PricingGrid } from "@/components/PricingGrid";
import { CourseOutline } from "@/components/CourseOutline";
import { LaunchCountdown } from "@/components/LaunchCountdown";
import { RefundPolicy } from "@/components/RefundPolicy";
import { PricingRoadmap } from "@/components/PricingRoadmap";
import { Faq } from "@/components/Faq";
import { MobileEnrollBar } from "@/components/MobileEnrollBar";
import {
  CAREER_OUTCOMES,
  HIRING_COMPANIES,
  HOW_IT_WORKS,
  INSTRUCTOR_BULLETS,
  JOURNEY_STEPS,
  PORTFOLIO_PROJECTS,
  PREDICTIONS,
  PREREQUISITES,
  PROGRAM_PILLARS,
  URGENCY_POINTS,
  WHO_FOR_NO,
  WHO_FOR_YES,
  WHY_PROGRAM,
} from "@/lib/site-content";

/* Layout mirrors the original single-page site (basie12.github.io/ai-ml-course).
   Copy lives in lib/site-content.ts; colors and spacing live in app/globals.css. */

const PILLAR_ICONS = ["🧮", "🤖", "⚙️", "🗂️"];
const WHY_ICONS = ["🏭", "🔁", "🔍", "🇺🇸", "📐", "🧪"];
const HOW_ICONS = ["🔴", "🔴", "💬"];
/* Phases 5–7 are highlighted in the journey strip */
const JOURNEY_ACCENT_FROM = 4;

const LAYOFF_BARS = [
  { role: "Software Engineers", pct: "35–45%", width: 40, tone: "danger" },
  { role: "Frontend Engineers", pct: "15–20%", width: 17, tone: "danger" },
  { role: "QA / Test Engineers", pct: "10–15%", width: 12, tone: "" },
  { role: "IT / SysAdmin", pct: "10–15%", width: 12, tone: "" },
  { role: "Data / ML Engineers", pct: "5–10% ✦", width: 7, tone: "safe" },
  { role: "DevOps / SRE", pct: "3–7%", width: 5, tone: "" },
  { role: "Security Engineers", pct: "2–5%", width: 3, tone: "" },
] as const;

const SALARY_CARDS = [
  {
    title: "AI / ML Engineer",
    hot: false,
    bars: [
      { level: "Mid-Level", width: 57, value: "$170K–$260K" },
      { level: "Senior", width: 80, value: "$220K–$350K+" },
    ],
    tag: "Median: $176K · 14% QoQ growth in postings",
  },
  {
    title: "GenAI / LLM Engineer",
    hot: true,
    bars: [
      { level: "Mid-Level", width: 63, value: "$165K–$230K" },
      { level: "Senior", width: 88, value: "$240K–$350K+" },
    ],
    tag: "Leads all AI roles in comp growth",
  },
  {
    title: "AI Solutions Engineer",
    hot: false,
    bars: [
      { level: "Mid-Level", width: 52, value: "$145K–$200K" },
      { level: "Senior", width: 74, value: "$210K–$280K+" },
    ],
    tag: "48% of roles are hybrid or remote",
  },
] as const;

const MARKET_NUMBERS = [
  { num: "43,480", label: "Active US AI/ML job postings analyzed (2026)" },
  { num: "62%", label: "of postings require Python — the #1 mandatory skill" },
  { num: "55%", label: "require cloud platforms (AWS / GCP / Azure)" },
  { num: "51%", label: "require foundation model / LLM experience" },
] as const;

const URGENCY_BENEFITS = [
  { icon: "🎓", title: "Founding Price", body: "$1,299 — locked forever" },
  { icon: "📞", title: "Direct Access", body: "Slack + live office hours" },
  { icon: "🛠️", title: "Shape the Course", body: "Your feedback drives V2" },
  { icon: "🚀", title: "Deploy 5 Projects", body: "GitHub + LinkedIn verified" },
] as const;

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <div className="hero">
        <div className="hero-bg-glow" aria-hidden />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">
              Now Enrolling — Founding Cohort · 15 Seats Only
            </div>
            <div className="launch-banner">
              🚀 Launches <strong>November 14, 2026</strong> —{" "}
              <LaunchCountdown inline />
            </div>
            <h1>
              Become an
              <br />
              <span className="hl">AI &amp; ML Engineer</span>
            </h1>
            <p className="hero-sub">
              A 24-week practitioner program for software engineers and data
              professionals ready to move into{" "}
              <strong>mid-to-senior AI/ML Engineering roles</strong> — covering
              production ML, MLOps, GenAI, and agentic systems, taught by a
              working engineer with 6 years of deployed systems in the US market.
            </p>
            <div className="hero-cta-row">
              <Link href="/subscribe?plan=COHORT" className="btn-primary">
                Join Founding Cohort — $1,299
              </Link>
              <a href="#curriculum" className="btn-ghost">
                See Full Curriculum ↓
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">24</span>
                <span className="stat-label">Weeks</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">8</span>
                <span className="stat-label">Phases</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">5+</span>
                <span className="stat-label">Production Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">6yr</span>
                <span className="stat-label">US Production ML</span>
              </div>
            </div>
            <div className="hero-tech-pill">
              Machine Learning · Deep Learning · AI Engineering · GenAI · MLOps
            </div>
          </div>
          <div className="hero-image-col">
            <div className="hero-image-wrap">
              <Image
                src="/hero-instructor.png"
                alt="AI/ML"
                width={480}
                height={640}
                priority
              />
              <div className="hero-image-overlay" />
            </div>
          </div>
        </div>
      </div>

      {/* WHY THIS PROGRAM EXISTS */}
      <section className="why-section" id="why">
        <div className="why-inner">
          <div className="why-header">
            <div className="section-tag">Market Reality</div>
            <h2>Companies Are Racing to Hire AI Talent</h2>
            <p className="why-lead">
              AI Engineering roles are growing 3× faster than the talent
              pipeline. The window to get in early — and get paid well — is right
              now.
            </p>
          </div>
          <div className="why-stats-row">
            <div className="why-stat">
              <span className="why-stat-num">40%</span>
              <span className="why-stat-label">
                of all tech job postings now require AI/ML skills (LinkedIn,
                2024)
              </span>
            </div>
            <div className="why-stat">
              <span className="why-stat-num">$165K+</span>
              <span className="why-stat-label">
                median total comp for ML Engineers in the US (Levels.fyi, 2024)
              </span>
            </div>
            <div className="why-stat">
              <span className="why-stat-num">3×</span>
              <span className="why-stat-label">
                faster job growth than the available qualified talent supply
              </span>
            </div>
          </div>
          <div className="why-divider" />
          <div className="why-purpose">
            <div className="why-purpose-label">Why This Program Exists</div>
            <p className="why-purpose-text">
              To accelerate mid-level engineers and data professionals into
              senior AI/ML Engineering roles — faster than learning on the job
              alone. This program skips the toy tutorials and goes straight to
              what production engineers actually do: design systems, ship
              models, and own the full stack from data to deployed API. If you
              already code, this is your fastest path to the $165K–$260K
              mid-to-senior AI engineering salary band.
            </p>
          </div>
          <div className="why-pillars">
            {PROGRAM_PILLARS.map((p, i) => (
              <div className="why-pillar" key={p.title}>
                <div className="why-pillar-icon">{PILLAR_ICONS[i]}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="who-section" id="who">
        <div className="who-inner">
          <div className="who-header">
            <div className="section-tag">Who This Is For</div>
            <h2>Built for engineers who already know how to code</h2>
            <p className="who-lead">
              This is not a beginner bootcamp. It&apos;s a production-engineering
              accelerator for people who are already technical — and ready to
              level up into the highest-comp engineering track in the market.
            </p>
          </div>
          <div className="who-grid">
            <div className="who-fits">
              <div className="who-fits-label who-fits-yes">
                ✓ This is for you if…
              </div>
              <div className="who-fit-list">
                {WHO_FOR_YES.map((item) => (
                  <div className="who-fit-item who-fit-yes" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="who-fits">
              <div className="who-fits-label who-fits-no">
                ✗ This is not for you if…
              </div>
              <div className="who-fit-list">
                {WHO_FOR_NO.map((item) => (
                  <div className="who-fit-item who-fit-no" key={item}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="who-prereqs">
                <div className="who-prereqs-label">Prerequisites</div>
                <div className="who-prereqs-list">
                  {PREREQUISITES.map((p) => (
                    <span className="prereq-chip" key={p}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM JOURNEY */}
      <div className="pipeline-section">
        <div className="pipeline-inner">
          <div className="pipeline-label">Program Journey</div>
          <div className="pipeline-flow">
            {JOURNEY_STEPS.map((step, i) => (
              <div className="pipe-group" key={step.phase}>
                {i > 0 && <div className="pipe-arrow" aria-hidden />}
                <div className="pipe-step">
                  <div
                    className={`pipe-box${i >= JOURNEY_ACCENT_FROM ? " accent" : ""}`}
                  >
                    {step.label}
                  </div>
                  <div className="pipe-phase">{step.phase}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIFFERENTIATORS */}
      <section className="section" id="why-program">
        <div className="section-eyebrow">Why This Program</div>
        <h2 className="section-title">
          The gap between training a model
          <br />
          and shipping one — bridged.
        </h2>
        <p className="section-sub">
          Most courses stop at notebooks. This one takes you through the exact
          engineering decisions made in production ML systems at government,
          healthcare, and biotech scale.
        </p>
        <div className="diff-grid">
          {WHY_PROGRAM.map((item, i) => (
            <div className="diff-card" key={item.title}>
              <div className="diff-icon">{WHY_ICONS[i]}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CurriculumTabs />

      {/* CAREER OUTCOMES */}
      <section className="section" id="outcomes">
        <div className="section-label">Where You Land</div>
        <h2 className="section-title">Career Outcomes</h2>
        <p className="section-sub outcome-sub">
          Roles this program prepares you for — with production-grade projects
          and a portfolio that proves it.
        </p>
        <div className="outcome-grid">
          {CAREER_OUTCOMES.map((role, i) => (
            <div
              className={`outcome-card${i % 2 === 1 ? " outcome-alt" : ""}`}
              key={role.title}
            >
              <div className="outcome-head">
                <span className="outcome-dot" aria-hidden />
                <span className="outcome-title">{role.title}</span>
              </div>
              <p>{role.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LAYOFF RESILIENCE */}
      <section className="layoff-section" id="job-security">
        <div className="layoff-inner">
          <div className="layoff-header">
            <div className="section-label">Job Security</div>
            <h2>The Most Layoff-Resistant Engineering Role (2023–2026)</h2>
            <p>
              While software engineers faced 35–45% layoff rates, Data/ML
              Engineers stayed at just 5–10% — the lowest of any technical
              discipline. AI skills aren&apos;t just high-paying. They&apos;re
              the safest place to be.
            </p>
          </div>
          <div className="layoff-bars">
            {LAYOFF_BARS.map((row) => {
              const hl = row.tone === "safe" ? " highlight" : "";
              return (
                <div className="layoff-row" key={row.role}>
                  <div className={`layoff-role${hl}`}>{row.role}</div>
                  <div className="layoff-track">
                    <div
                      className={`layoff-fill${row.tone ? ` ${row.tone}` : ""}`}
                      style={{ width: `${row.width}%` }}
                    />
                  </div>
                  <div className={`layoff-pct${hl}`}>{row.pct}</div>
                </div>
              );
            })}
          </div>
          <div className="layoff-callout">
            Data/ML Engineers had the lowest layoff rate of any technical role —
            4–7× lower than software engineers.
          </div>
          <div className="layoff-source">
            Source: Layoffs.fyi · Tech layoffs by engineering discipline,
            2023–2026
          </div>
        </div>
      </section>

      {/* BOLD PREDICTIONS */}
      <section className="predictions-section" id="predictions">
        <div className="predictions-inner">
          <div className="predictions-header">
            <div className="section-tag">Bold Predictions</div>
            <h2>5 Things I Believe Will Be True by 2027</h2>
            <p className="predictions-lead">
              These aren&apos;t hype — they&apos;re pattern-matches from 6 years
              building production ML systems. This course is specifically
              designed around each one.
            </p>
          </div>
          <div className="predictions-list">
            {PREDICTIONS.map((p) => (
              <div className="prediction-card" key={p.n}>
                <div className="pred-number">{p.n}</div>
                <div className="pred-body">
                  <h3>{p.title}</h3>
                  <p className="pred-text">{p.body}</p>
                  <div className="pred-response">
                    <div className="pred-response-label">
                      ↳ How this course responds
                    </div>
                    <p>{p.response}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER & SALARY 2026 */}
      <section className="salary-section" id="salary">
        <div className="salary-inner">
          <div className="salary-header">
            <div className="section-tag">Career Growth</div>
            <h2>What This Career Actually Pays in 2026</h2>
            <p className="salary-lead">
              Real offer data from 43,000+ US job postings analyzed in 2026.
              AI/ML engineering is the highest-compensated engineering track
              without requiring a PhD.
            </p>
          </div>

          <div className="salary-grid">
            {SALARY_CARDS.map((card) => (
              <div
                className={`salary-role-card${card.hot ? " salary-role-hot" : ""}`}
                key={card.title}
              >
                {card.hot && (
                  <div className="salary-role-badge">🔥 Fastest Growing</div>
                )}
                <div className="salary-role-title">{card.title}</div>
                <div className="salary-target-band">
                  🎯 This course targets this band
                </div>
                <div className="salary-bars">
                  {card.bars.map((bar) => (
                    <div
                      className="salary-bar-row salary-bar-target"
                      key={bar.level}
                    >
                      <span className="salary-bar-level">{bar.level}</span>
                      <div className="salary-bar-track">
                        <div
                          className="salary-bar-fill"
                          style={{ width: `${bar.width}%` }}
                        />
                      </div>
                      <span className="salary-bar-val">{bar.value}</span>
                    </div>
                  ))}
                </div>
                <div className="salary-tag">{card.tag}</div>
              </div>
            ))}
          </div>

          <div className="salary-market-row">
            {MARKET_NUMBERS.map((m) => (
              <div className="salary-market-stat" key={m.num}>
                <span className="salary-market-num">{m.num}</span>
                <span className="salary-market-label">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="salary-hiring-row">
            <div className="salary-hiring-label">
              Top Hiring Companies Right Now
            </div>
            <div className="salary-hiring-chips">
              {HIRING_COMPANIES.map((c) => (
                <span className="hiring-chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="salary-source">
            Sources:{" "}
            <a
              href="https://axialsearch.com/insights/ai-ml-engineering-jobs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Axial Search (2026)
            </a>{" "}
            ·{" "}
            <a
              href="https://www.kore1.com/ai-engineer-salary-guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kore1 Salary Guide
            </a>{" "}
            · Levels.fyi · LinkedIn Talent Insights
          </div>
        </div>
      </section>

      {/* MARKETING URGENCY */}
      <section className="urgency-section" id="enroll-now">
        <div className="urgency-inner">
          <div className="urgency-left">
            <div className="urgency-eyebrow">Founding Cohort · Limited</div>
            <h2>The window to get in early is right now.</h2>
            <p>
              The founding cohort is capped at <strong>15 students</strong> —
              small by design so every student gets direct access, feedback on
              their projects, and real-time answers from an instructor who&apos;s
              running these systems in production today.
            </p>
            <ul className="urgency-list">
              {URGENCY_POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="urgency-cta-row">
              <Link href="/subscribe?plan=COHORT" className="btn-primary">
                Claim Your Seat — $1,299
              </Link>
              <a href="#curriculum" className="btn-ghost">
                Review Curriculum First ↓
              </a>
            </div>
          </div>
          <div className="urgency-right">
            <div className="urgency-seats">
              <div className="urgency-seats-label">Founding Cohort Seats</div>
              <div className="urgency-seats-bar-wrap">
                <div className="urgency-seats-bar">
                  <div
                    className="urgency-seats-fill"
                    style={{ width: "53%" }}
                  />
                </div>
                <div className="urgency-seats-count">
                  <span className="urgency-seats-taken">8 of 15</span> seats
                  claimed
                </div>
                <LaunchCountdown />
              </div>
              <div className="urgency-benefit-cards">
                {URGENCY_BENEFITS.map((b) => (
                  <div className="urgency-benefit" key={b.title}>
                    <div className="ub-icon">{b.icon}</div>
                    <div className="ub-text">
                      <strong>{b.title}</strong>
                      {b.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <div className="section-eyebrow">Portfolio</div>
        <h2 className="section-title">5 Production-Grade Projects</h2>
        <p className="section-sub">
          Fewer projects, built deeper. Every project mirrors a real system —
          not a toy dataset or a tutorial clone.
        </p>
        <div className="projects-grid">
          {PORTFOLIO_PROJECTS.map((project, i) => {
            const capstone = i === PORTFOLIO_PROJECTS.length - 1;
            return (
              <div
                className={`project-card${capstone ? " project-capstone" : ""}`}
                key={project.title}
              >
                <div className="project-num">{project.tag}</div>
                <h3>{project.title}</h3>
                <p>{project.body}</p>
                <div className="project-stack">
                  {project.stack.map((s) => (
                    <span className="stack-tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="section-eyebrow">How It Works</div>
        <h2 className="section-title">
          Built for mid-to-senior engineers with full-time jobs
        </h2>
        <p className="section-sub">
          Recorded content to learn at your pace. Two live deep-dives every week.
          Weekly office hours to unblock you. Designed for 10–15 hrs/week
          alongside your existing role.
        </p>
        <div className="delivery-grid">
          {HOW_IT_WORKS.map((item, i) => (
            <div className="delivery-card" key={item.title}>
              <div className="delivery-icon">{HOW_ICONS[i]}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="delivery-detail">{item.meta}</div>
            </div>
          ))}
        </div>
        <div className="delivery-callout">
          2 live sessions + 1 office hour every week — 3 touchpoints with a
          working US AI/ML engineer.
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-inner">
          <div className="section-eyebrow">Pricing</div>
          <h2 className="section-title">
            Founding Cohort — Limited to 15 Seats
          </h2>
          <p className="section-sub pricing-sub">
            Price reflects what the program is worth — 8 phases, 24 weeks,
            production-grade projects, and direct access to an engineer who has
            shipped ML in healthcare, biotech, and government. Prices rise with
            each cohort.
          </p>
          <div className="cohort-banner">
            <div className="cohort-banner-text">
              <h3>Founding Cohort — Cohort #1</h3>
              <p>
                Limited to 15 students. You shape the curriculum, get the most
                direct access, and pay the lowest price this program will ever
                be. Goal: finish curriculum, collect testimonials, measure
                completions, and build real outcome data.
              </p>
            </div>
            <div className="cohort-spots">
              15 <span>seats total</span>
            </div>
          </div>
          <PricingGrid />
          <RefundPolicy />
          <PricingRoadmap />
        </div>
      </section>

      <CourseOutline />

      {/* BIO */}
      <section className="bio-section" id="about">
        <div className="bio-inner">
          <div>
            <div className="bio-avatar" aria-hidden>
              🧑🏿‍💻
            </div>
          </div>
          <div className="bio-content">
            <div className="section-eyebrow">Your Instructor</div>
            <h2>Basazin &quot;Bassa&quot; Belhu</h2>
            <p>
              AI/ML Engineer with 6 years building production machine learning
              systems across healthcare, biotech, and federal government.
              Currently designing and deploying end-to-end ML pipelines, building
              predictive models at scale, and integrating AI systems into
              high-stakes production environments.
            </p>
            <p>
              Every lesson in this program comes from systems that ran in
              production — not from textbooks or tutorials. The goal is to teach
              the gap between &quot;I trained a model&quot; and &quot;I shipped
              and operate a model,&quot; because that gap is where careers stall.
            </p>
            <div className="bio-creds">
              {INSTRUCTOR_BULLETS.map((b) => (
                <div className="bio-cred" key={b}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Faq />

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <div className="urgency-eyebrow">Founding Cohort · Starts Nov 14, 2026</div>
          <h2>Ship production AI systems in 24 weeks.</h2>
          <p>
            15 seats. Live sessions every week, code reviews from a working US
            AI/ML engineer, and a 7-day refund window after orientation.
          </p>
          <div className="final-cta-row">
            <Link href="/subscribe?plan=COHORT" className="btn-primary">
              Join Founding Cohort — $1,299
            </Link>
            <a href="#pricing" className="btn-ghost">
              Compare plans
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} Basazin Belhu · AI &amp; ML Engineer
          Accelerator · Built by a practitioner, for practitioners.
        </p>
        <p className="site-footer-contact">
          <a href="mailto:basazinb12@gmail.com">basazinb12@gmail.com</a>
          {" · "}
          <a href="tel:+12064755393">(206) 475-5393</a>
        </p>
      </footer>
      <MobileEnrollBar />
    </main>
  );
}
