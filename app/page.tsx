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
  MARKET_STATS,
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

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-media" aria-hidden />
        <div className="hero-inner">
          <p className="kicker">
            Now Enrolling — Founding Cohort · 15 Seats Only · Launches November
            14, 2026
          </p>
          <p className="brand-hero">
            BASSA<em>COURSE</em>
          </p>
          <h1>Become an AI &amp; ML Engineer</h1>
          <p className="lead">
            A 24-week practitioner program for software engineers and data
            professionals ready to move into mid-to-senior AI/ML Engineering
            roles — covering production ML, MLOps, GenAI, and agentic systems,
            taught by a working engineer with 6 years of deployed systems in the
            US market.
          </p>
          <div className="cta-row">
            <Link href="/subscribe?plan=COHORT" className="btn">
              Join Founding Cohort — $1,299
            </Link>
            <a href="#curriculum" className="btn btn-ghost">
              See Full Curriculum ↓
            </a>
          </div>
          <div className="rail" style={{ marginTop: "2rem" }}>
            <div className="rail-item">
              <strong>24</strong>
              <span>Weeks</span>
            </div>
            <div className="rail-item">
              <strong>8</strong>
              <span>Phases</span>
            </div>
            <div className="rail-item">
              <strong>5+</strong>
              <span>Production Projects</span>
            </div>
            <div className="rail-item">
              <strong>6yr</strong>
              <span>US Production ML</span>
            </div>
          </div>
          <p className="hero-topics">
            Machine Learning · Deep Learning · AI Engineering · GenAI · MLOps
          </p>
        </div>
      </section>

      <section className="section" id="why">
        <p className="eyebrow">Market Reality</p>
        <h2>Companies Are Racing to Hire AI Talent</h2>
        <p className="sub">
          AI Engineering roles are growing 3× faster than the talent pipeline.
          The window to get in early — and get paid well — is right now.
        </p>
        <ul className="stat-list">
          {MARKET_STATS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h3 className="inline-title">Why This Program Exists</h3>
        <p className="sub">
          To accelerate mid-level engineers and data professionals into senior
          AI/ML Engineering roles — faster than learning on the job alone. This
          program skips the toy tutorials and goes straight to what production
          engineers actually do: design systems, ship models, and own the full
          stack from data to deployed API. If you already code, this is your
          fastest path to the $165K–$260K mid-to-senior AI engineering salary
          band.
        </p>
        <div className="feature-list" style={{ marginTop: "2rem" }}>
          {PROGRAM_PILLARS.map((p) => (
            <div className="feature" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="who">
        <p className="eyebrow">Who This Is For</p>
        <h2>Built for engineers who already know how to code</h2>
        <p className="sub">
          This is not a beginner bootcamp. It&apos;s a production-engineering
          accelerator for people who are already technical — and ready to level
          up into the highest-comp engineering track in the market.
        </p>
        <div className="split-lists">
          <div>
            <h3>✓ This is for you if…</h3>
            <ul className="check-list yes">
              {WHO_FOR_YES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>✗ This is not for you if…</h3>
            <ul className="check-list no">
              {WHO_FOR_NO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="prereq-row">
          <h3>Prerequisites</h3>
          <div className="chip-row">
            {PREREQUISITES.map((p) => (
              <span className="tool-chip" key={p}>
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="journey">
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
      </section>

      <section className="section" id="why-program">
        <p className="eyebrow">Why This Program</p>
        <h2>
          The gap between training a model and shipping one — bridged.
        </h2>
        <p className="sub">
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
        <p className="eyebrow">Where You Land</p>
        <h2>Career Outcomes</h2>
        <p className="sub">
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

      <section className="section" id="job-security">
        <p className="eyebrow">Job Security</p>
        <h2>The Most Layoff-Resistant Engineering Role (2023–2026)</h2>
        <p className="sub">
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
        <p className="sub">
          Data/ML Engineers had the lowest layoff rate of any technical role —
          4–7× lower than software engineers. Source: Layoffs.fyi · Tech layoffs
          by engineering discipline, 2023–2026
        </p>
      </section>

      <section className="section" id="predictions">
        <p className="eyebrow">Bold Predictions</p>
        <h2>5 Things I Believe Will Be True by 2027</h2>
        <p className="sub">
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

      <section className="section" id="salary">
        <p className="eyebrow">Career Growth</p>
        <h2>What This Career Actually Pays in 2026</h2>
        <p className="sub">
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
        <ul className="stat-list" style={{ marginTop: "1.5rem" }}>
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
        <p className="sub" style={{ marginTop: "1rem" }}>
          Sources: Axial Search (2026) Kore1 Salary Guide · Levels.fyi · LinkedIn
          Talent Insights
        </p>
      </section>

      <section className="section" id="enroll-now">
        <p className="eyebrow">Founding Cohort · Limited</p>
        <h2>The window to get in early is right now.</h2>
        <p className="sub">
          The founding cohort is capped at 15 students — small by design so every
          student gets direct access, feedback on their projects, and real-time
          answers from an instructor who&apos;s running these systems in
          production today.
        </p>
        <ul className="check-list yes">
          {URGENCY_POINTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="cta-row" style={{ marginTop: "1.5rem" }}>
          <Link href="/subscribe?plan=COHORT" className="btn">
            Claim Your Seat — $1,299
          </Link>
          <a href="#curriculum" className="btn btn-ghost">
            Review Curriculum First ↓
          </a>
        </div>
        <p className="sub" style={{ marginTop: "1rem" }}>
          Founding Cohort Seats — limited to 15
        </p>
        <LaunchCountdown />
        <div className="feature-list" style={{ marginTop: "1.5rem" }}>
          <div className="feature">
            <h3>Founding Price</h3>
            <p>$1,299 — locked forever</p>
          </div>
          <div className="feature">
            <h3>Direct Access</h3>
            <p>Slack + live office hours</p>
          </div>
          <div className="feature">
            <h3>Shape the Course</h3>
            <p>Your feedback drives V2</p>
          </div>
          <div className="feature">
            <h3>Deploy 5 Projects</h3>
            <p>GitHub + LinkedIn verified</p>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <p className="eyebrow">Portfolio</p>
        <h2>5 Production-Grade Projects</h2>
        <p className="sub">
          Fewer projects, built deeper. Every project mirrors a real system —
          not a toy dataset or a tutorial clone.
        </p>
        <div className="feature-list">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div className="feature" key={project.title}>
              <p className="eyebrow">{project.tag}</p>
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
        <p className="eyebrow">How It Works</p>
        <h2>Built for mid-to-senior engineers with full-time jobs</h2>
        <p className="sub">
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
        <p className="sub" style={{ marginTop: "1.25rem" }}>
          2 live sessions + 1 office hour every week — 3 touchpoints with a
          working US AI/ML engineer.
        </p>
      </section>

      <section className="section" id="pricing">
        <p className="eyebrow">Pricing</p>
        <h2>Founding Cohort — Limited to 15 Seats</h2>
        <p className="sub">
          Price reflects what the program is worth — 8 phases, 24 weeks,
          production-grade projects, and direct access to an engineer who has
          shipped ML in healthcare, biotech, and government. Prices rise with
          each cohort.
        </p>
        <p className="sub">
          Founding Cohort — Cohort #1 is limited to 15 students. You shape the
          curriculum, get the most direct access, and pay the lowest price this
          program will ever be. Goal: finish curriculum, collect testimonials,
          measure completions, and build real outcome data.
        </p>
        <PricingGrid />
        <RefundPolicy />
        <PricingRoadmap />
      </section>

      <CourseOutline />

      <section className="section" id="about">
        <p className="eyebrow">Your Instructor</p>
        <h2>Basazin &quot;Bassa&quot; Belhu</h2>
        <p className="sub">
          AI/ML Engineer with 6 years building production machine learning
          systems across healthcare, biotech, and federal government. Currently
          designing and deploying end-to-end ML pipelines, building predictive
          models at scale, and integrating AI systems into high-stakes
          production environments.
        </p>
        <p className="sub">
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
        <p className="sub" style={{ marginTop: "1.25rem" }}>
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
