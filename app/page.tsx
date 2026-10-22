import Image from "next/image";
import Link from "next/link";
import { CurriculumTabs } from "@/components/CurriculumTabs";
import { PricingGrid } from "@/components/PricingGrid";
import { CourseOutline } from "@/components/CourseOutline";
import { LaunchCountdown } from "@/components/LaunchCountdown";
import { RefundPolicy } from "@/components/RefundPolicy";
import { PricingRoadmap } from "@/components/PricingRoadmap";
import {
  CAREER_OUTCOMES,
  HIRING_COMPANIES,
  HOW_IT_WORKS,
  INSTRUCTOR_BULLETS,
  JOURNEY_STEPS,
  LAYOFF_ROWS,
  PORTFOLIO_PROJECTS,
  PREDICTIONS,
  PREREQUISITES,
  PROGRAM_PILLARS,
  SALARY_FACTS,
  SALARY_ROLES,
  URGENCY_POINTS,
  WHO_FOR_NO,
  WHO_FOR_YES,
  WHY_PROGRAM,
} from "@/lib/site-content";

const PILLAR_ICONS = ["🧮", "🤖", "⚙️", "🗂️"];

export default function HomePage() {
  return (
    <main>
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
              <span className="hl" style={{ color: "var(--amber)" }}>
                AI &amp; ML Engineer
              </span>
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
                alt="AI and machine learning"
                width={480}
                height={640}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="hero-image-overlay" />
            </div>
          </div>
        </div>
      </div>

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
          <div className="journey" style={{ marginTop: "2rem" }}>
            <h3>Program Journey</h3>
            <div className="journey-track">
              {JOURNEY_STEPS.map((step) => (
                <div className="journey-step" key={step.phase}>
                  <strong>{step.label}</strong>
                  <span>{step.phase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="why-program">
        <div className="section-eyebrow">Why This Program</div>
        <h2 className="section-title">
          The gap between training a model and shipping one — bridged.
        </h2>
        <p className="section-sub">
          Most courses stop at notebooks. This one takes you through the exact
          engineering decisions made in production ML systems at government,
          healthcare, and biotech scale.
        </p>
        <div className="feature-list">
          {WHY_PROGRAM.map((item) => (
            <div className="feature" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CurriculumTabs />

      <section className="section" id="outcomes">
        <div className="section-eyebrow">Where You Land</div>
        <h2 className="section-title">Career Outcomes</h2>
        <p className="section-sub">
          Roles this program prepares you for — with production-grade projects
          and a portfolio that proves it.
        </p>
        <div className="feature-list">
          {CAREER_OUTCOMES.map((role) => (
            <div className="feature" key={role.title}>
              <h3>{role.title}</h3>
              <p>{role.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="layoff-section section" id="job-security">
        <div className="section-eyebrow">Job Security</div>
        <h2 className="section-title">
          The Most Layoff-Resistant Engineering Role (2023–2026)
        </h2>
        <p className="section-sub">
          While software engineers faced 35–45% layoff rates, Data/ML Engineers
          stayed at just 5–10% — the lowest of any technical discipline. AI
          skills aren&apos;t just high-paying. They&apos;re the safest place to
          be.
        </p>
        <div className="layoff-table">
          {LAYOFF_ROWS.map((row) => (
            <div
              key={row.role}
              className={`layoff-row${"highlight" in row && row.highlight ? " highlight" : ""}`}
            >
              <span>{row.role}</span>
              <strong>{row.rate}</strong>
            </div>
          ))}
        </div>
        <p className="layoff-source">
          Data/ML Engineers had the lowest layoff rate of any technical role —
          4–7× lower than software engineers. Source: Layoffs.fyi · Tech layoffs
          by engineering discipline, 2023–2026
        </p>
      </section>

      <section className="predictions-section section" id="predictions">
        <div className="section-eyebrow">Bold Predictions</div>
        <h2 className="section-title">5 Things I Believe Will Be True by 2027</h2>
        <p className="section-sub">
          These aren&apos;t hype — they&apos;re pattern-matches from 6 years
          building production ML systems. This course is specifically designed
          around each one.
        </p>
        <div className="prediction-list">
          {PREDICTIONS.map((p) => (
            <article className="prediction" key={p.n}>
              <p className="prediction-n">{p.n}</p>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <p className="prediction-response">
                <strong>↳ How this course responds</strong>
                <br />
                {p.response}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="salary-section section" id="salary">
        <div className="section-eyebrow">Career Growth</div>
        <h2 className="section-title">What This Career Actually Pays in 2026</h2>
        <p className="section-sub">
          Real offer data from 43,000+ US job postings analyzed in 2026. AI/ML
          engineering is the highest-compensated engineering track without
          requiring a PhD.
        </p>
        <div className="feature-list">
          {SALARY_ROLES.map((role) => (
            <div className="feature" key={role.title}>
              <h3>
                {role.title}
                {role.targeted ? (
                  <span className="tag"> This course targets this band</span>
                ) : null}
              </h3>
              <p>
                Mid-Level {role.mid}
                <br />
                Senior {role.senior}
                <br />
                {role.note}
              </p>
            </div>
          ))}
        </div>
        <ul className="stat-list">
          {SALARY_FACTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <h3 className="inline-title">Top Hiring Companies Right Now</h3>
        <div className="chip-row">
          {HIRING_COMPANIES.map((c) => (
            <span className="tool-chip" key={c}>
              {c}
            </span>
          ))}
        </div>
        <p className="section-sub" style={{ marginTop: "1rem" }}>
          Sources: Axial Search (2026) Kore1 Salary Guide · Levels.fyi · LinkedIn
          Talent Insights
        </p>
      </section>

      <section className="urgency-section" id="enroll-now">
        <div className="urgency-inner">
          <div className="urgency-left">
            <div className="urgency-eyebrow">Founding Cohort · Limited</div>
            <h2>The window to get in early is right now.</h2>
            <p>
              The founding cohort is capped at 15 students — small by design so
              every student gets direct access, feedback on their projects, and
              real-time answers from an instructor who&apos;s running these
              systems in production today.
            </p>
            <ul className="urgency-list">
              {URGENCY_POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="hero-cta-row">
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
                  <div className="urgency-seats-fill" style={{ width: "53%" }} />
                </div>
                <div className="urgency-seats-count">
                  <span className="urgency-seats-taken">8 of 15</span> seats
                  claimed
                </div>
              </div>
            </div>
            <LaunchCountdown />
            <div className="urgency-benefit-cards">
              <div className="urgency-benefit">
                <strong>Founding Price</strong>
                <span>$1,299 — locked forever</span>
              </div>
              <div className="urgency-benefit">
                <strong>Direct Access</strong>
                <span>Slack + live office hours</span>
              </div>
              <div className="urgency-benefit">
                <strong>Shape the Course</strong>
                <span>Your feedback drives V2</span>
              </div>
              <div className="urgency-benefit">
                <strong>Deploy 5 Projects</strong>
                <span>GitHub + LinkedIn verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-eyebrow">Portfolio</div>
        <h2 className="section-title">5 Production-Grade Projects</h2>
        <p className="section-sub">
          Fewer projects, built deeper. Every project mirrors a real system —
          not a toy dataset or a tutorial clone.
        </p>
        <div className="feature-list">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div className="feature" key={project.title}>
              <div className="section-tag">{project.tag}</div>
              <h3>{project.title}</h3>
              <p>{project.body}</p>
              <div className="chip-row">
                {project.stack.map((s) => (
                  <span className="tool-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
        <div className="feature-list">
          {HOW_IT_WORKS.map((item) => (
            <div className="feature" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                {item.body}
                <br />
                <strong>{item.meta}</strong>
              </p>
            </div>
          ))}
        </div>
        <p className="section-sub" style={{ marginTop: "1.25rem" }}>
          2 live sessions + 1 office hour every week — 3 touchpoints with a
          working US AI/ML engineer.
        </p>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="pricing-inner">
          <div className="section-eyebrow">Pricing</div>
          <h2 className="section-title">
            Founding Cohort — Limited to 15 Seats
          </h2>
          <p className="section-sub">
            Price reflects what the program is worth — 8 phases, 24 weeks,
            production-grade projects, and direct access to an engineer who has
            shipped ML in healthcare, biotech, and government. Prices rise with
            each cohort.
          </p>
          <p className="section-sub">
            Founding Cohort — Cohort #1 is limited to 15 students. You shape the
            curriculum, get the most direct access, and pay the lowest price this
            program will ever be.
          </p>
          <PricingGrid />
          <RefundPolicy />
          <PricingRoadmap />
        </div>
      </section>

      <CourseOutline />

      <section className="bio-section" id="about">
        <div className="section-eyebrow">Your Instructor</div>
        <h2 className="section-title">Basazin &quot;Bassa&quot; Belhu</h2>
        <p className="section-sub">
          AI/ML Engineer with 6 years building production machine learning
          systems across healthcare, biotech, and federal government. Currently
          designing and deploying end-to-end ML pipelines, building predictive
          models at scale, and integrating AI systems into high-stakes
          production environments.
        </p>
        <p className="section-sub">
          Every lesson in this program comes from systems that ran in production
          — not from textbooks or tutorials. The goal is to teach the gap
          between &quot;I trained a model&quot; and &quot;I shipped and operate a
          model,&quot; because that gap is where careers stall.
        </p>
        <ul className="check-list yes">
          {INSTRUCTOR_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="section-sub" style={{ marginTop: "1.25rem" }}>
          <a href="mailto:basazinb12@gmail.com">basazinb12@gmail.com</a>
          {" · "}
          <a href="tel:+12064755393">(206) 475-5393</a>
        </p>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Basazin Belhu · AI &amp; ML Engineer
        Accelerator · Built by a practitioner, for practitioners.
      </footer>
    </main>
  );
}
