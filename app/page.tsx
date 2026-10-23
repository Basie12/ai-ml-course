import Link from "next/link";
import { LaunchCountdown } from "@/components/LaunchCountdown";
import { PricingGrid } from "@/components/PricingGrid";
import { RefundPolicy } from "@/components/RefundPolicy";
import { PricingRoadmap } from "@/components/PricingRoadmap";
import { Roadmap } from "@/components/Roadmap";
import { LessonOutline } from "@/components/LessonOutline";
import { MobileEnrollBar } from "@/components/MobileEnrollBar";

/* Home page. Markup mirrors the approved design (index.html) section for section;
   styles live in app/globals.css. Interactive pieces are client components. */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context": "https://schema.org", "@type": "Course", "name": "AI with Bassa — 24-Week AI & Machine Learning Engineering Program", "description": "A 24-week, project-based AI and machine learning engineering program for working professionals in the US: Python, applied ML, production ML, cloud MLOps, GenAI, RAG and agentic AI.", "url": "https://aiwithbassa.com/", "provider": {"@type": "Organization", "name": "AI with Bassa", "url": "https://aiwithbassa.com/"}, "offers": [{"@type": "Offer", "name": "Self-Paced", "price": "799", "priceCurrency": "USD", "category": "Paid"}, {"@type": "Offer", "name": "Founding Cohort", "price": "1299", "priceCurrency": "USD", "category": "Paid"}, {"@type": "Offer", "name": "Mentorship", "price": "2499", "priceCurrency": "USD", "category": "Paid"}]}',
        }}
      />
      <main id="main">
        <section className="hero" aria-labelledby="heroTitle">
          {" "}
          <div className="wrap hero-inner">
            {" "}
            <div className="hero-copy">
              {" "}
              <p className="hero-eyebrow">
                <span className="dot" aria-hidden="true" />
                {"24-Week AI & Machine Learning Engineering Program"}
              </p>{" "}
              <h1 id="heroTitle">
                {"Don’t just learn AI. "}
                <span className="line2 grad-text">{"Build what’s next."}</span>
              </h1>{" "}
              <p className="hero-sub">
                {
                  "Go from machine learning foundations to production-ready AI systems. Build real-world projects, master modern AI engineering, and turn your ambition into practical skills — taught live by a working US AI/ML engineer."
                }
              </p>{" "}
              <div className="hero-ctas">
                {" "}
                <a className="btn btn-primary" href="#roadmap">
                  {"Explore the 24-week program "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>{" "}
                <a className="btn btn-ghost-d" href="#projects">
                  {"See what you’ll build"}
                </a>{" "}
              </div>{" "}
              <ul className="hero-trust" aria-label="Program at a glance">
                {" "}
                <li>
                  <strong>{"24"}</strong>
                  {" weeks"}
                </li>
                <li className="sep" aria-hidden="true" />{" "}
                <li>
                  <strong>{"8"}</strong>
                  {" learning phases"}
                </li>
                <li className="sep" aria-hidden="true" />{" "}
                <li>
                  <strong>{"6"}</strong>
                  {" real-world projects"}
                </li>{" "}
              </ul>{" "}
              <p className="hero-launch">
                {"Founding cohort · 15 seats · launches November 14, 2026 "}
                <LaunchCountdown inline />
              </p>{" "}
            </div>{" "}
            <div className="hero-art">
              <svg
                viewBox="0 0 600 570"
                role="img"
                aria-labelledby="heroArtTitle heroArtDesc"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <title id="heroArtTitle">{"Illustration of an AI system being built"}</title>{" "}
                <desc id="heroArtDesc">
                  {
                    "A glowing model core on an engineering platform, fed by a data, train, serve and monitor pipeline, with a training-code panel and a model-monitoring panel."
                  }
                </desc>{" "}
                <defs>
                  {" "}
                  <radialGradient id="hgGlowBlue" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#497BFF" stopOpacity=".55" />
                    <stop offset="1" stopColor="#497BFF" stopOpacity="0" />
                  </radialGradient>{" "}
                  <radialGradient id="hgGlowViolet" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#9461FF" stopOpacity=".5" />
                    <stop offset="1" stopColor="#9461FF" stopOpacity="0" />
                  </radialGradient>{" "}
                  <radialGradient id="hgCore" cx="42%" cy="38%" r="62%">
                    <stop offset="0" stopColor="#E9FFFC" />
                    <stop offset=".18" stopColor="#25E6D3" />
                    <stop offset=".55" stopColor="#497BFF" />
                    <stop offset="1" stopColor="#5A2FD0" />
                  </radialGradient>{" "}
                  <radialGradient id="hgCoreHalo" cx="50%" cy="50%" r="50%">
                    <stop offset=".55" stopColor="#25E6D3" stopOpacity=".35" />
                    <stop offset="1" stopColor="#25E6D3" stopOpacity="0" />
                  </radialGradient>{" "}
                  <linearGradient id="hgPlatTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#16244F" />
                    <stop offset="1" stopColor="#0E1838" />
                  </linearGradient>{" "}
                  <linearGradient id="hgPlatEdge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#497BFF" stopOpacity=".1" />
                    <stop offset=".5" stopColor="#25E6D3" stopOpacity=".9" />
                    <stop offset="1" stopColor="#9461FF" stopOpacity=".1" />
                  </linearGradient>{" "}
                  <linearGradient id="hgTierTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#22336B" />
                    <stop offset="1" stopColor="#18265A" />
                  </linearGradient>{" "}
                  <linearGradient id="hgSideL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#1A2A5E" />
                    <stop offset="1" stopColor="#0D1534" />
                  </linearGradient>{" "}
                  <linearGradient id="hgSideR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2A2A72" />
                    <stop offset="1" stopColor="#120F3A" />
                  </linearGradient>{" "}
                  <linearGradient id="hgBeam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#25E6D3" stopOpacity=".0" />
                    <stop offset=".5" stopColor="#25E6D3" stopOpacity=".22" />
                    <stop offset="1" stopColor="#497BFF" stopOpacity=".0" />
                  </linearGradient>{" "}
                  <linearGradient id="hgWire" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#497BFF" />
                    <stop offset="1" stopColor="#25E6D3" />
                  </linearGradient>{" "}
                  <linearGradient id="hgWire2" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0" stopColor="#9461FF" />
                    <stop offset="1" stopColor="#25E6D3" />
                  </linearGradient>{" "}
                  <linearGradient id="hgPanel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#16234D" stopOpacity=".96" />
                    <stop offset="1" stopColor="#0D1636" stopOpacity=".96" />
                  </linearGradient>{" "}
                  <linearGradient id="hgSpark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#25E6D3" stopOpacity=".45" />
                    <stop offset="1" stopColor="#25E6D3" stopOpacity="0" />
                  </linearGradient>{" "}
                  <linearGradient id="hgNode" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#3456E8" />
                    <stop offset="1" stopColor="#6A3FE8" />
                  </linearGradient>{" "}
                  <clipPath id="hgPlatClip">
                    <path d="M60 410 L300 292 L540 410 L300 528 Z" />
                  </clipPath>{" "}
                  <filter id="hgBlur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>{" "}
                </defs>{" "}
                <circle cx="330" cy="250" r="250" fill="url(#hgGlowBlue)" />{" "}
                <circle cx="470" cy="420" r="190" fill="url(#hgGlowViolet)" />{" "}
                <path
                  d="M60 410 L300 292 L540 410 L300 528 Z"
                  fill="url(#hgPlatTop)"
                  stroke="url(#hgPlatEdge)"
                  strokeWidth="1.5"
                />{" "}
                <g clipPath="url(#hgPlatClip)" stroke="#497BFF" strokeOpacity=".18" strokeWidth="1">
                  {" "}
                  <path d="M100 390 L340 508 M140 371 L380 489 M180 351 L420 469 M220 331 L460 449 M260 312 L500 430" />{" "}
                  <path d="M500 390 L260 508 M460 371 L220 489 M420 351 L180 469 M380 331 L140 449 M340 312 L100 430" />{" "}
                </g>{" "}
                <path d="M60 410 L300 528 L540 410 L540 424 L300 542 L60 424 Z" fill="#0A1230" opacity=".9" />{" "}
                <path d="M170 372 L170 392 L300 457 L300 437 Z" fill="url(#hgSideL)" />{" "}
                <path d="M430 372 L430 392 L300 457 L300 437 Z" fill="url(#hgSideR)" />{" "}
                <path
                  d="M170 372 L300 307 L430 372 L300 437 Z"
                  fill="url(#hgTierTop)"
                  stroke="#497BFF"
                  strokeOpacity=".45"
                />{" "}
                <ellipse
                  cx="300"
                  cy="372"
                  rx="78"
                  ry="38"
                  fill="none"
                  stroke="#25E6D3"
                  strokeOpacity=".45"
                  strokeWidth="1.5"
                />{" "}
                <ellipse cx="300" cy="372" rx="50" ry="24" fill="none" stroke="#25E6D3" strokeOpacity=".3" />{" "}
                <path d="M262 250 L338 250 L360 372 L240 372 Z" fill="url(#hgBeam)" />{" "}
                <g className="flow-wires" fill="none" strokeWidth="2" strokeLinecap="round">
                  {" "}
                  <path className="flow" d="M112 412 C150 395, 190 390, 222 398" stroke="url(#hgWire)" />{" "}
                  <path className="flow" d="M378 398 C410 390, 450 395, 488 412" stroke="url(#hgWire2)" />{" "}
                  <path className="flow" d="M300 470 L300 437" stroke="#25E6D3" />{" "}
                </g>{" "}
                <g fontSize="11" fontWeight="500" textAnchor="middle">
                  {" "}
                  <g transform="translate(92 412)">
                    {" "}
                    <path d="M-30 0 L0 -15 L30 0 L0 15 Z" fill="url(#hgNode)" />
                    <path d="M-30 0 L-30 8 L0 23 L0 15 Z" fill="#23306E" />
                    <path d="M30 0 L30 8 L0 23 L0 15 Z" fill="#1B1E5A" />{" "}
                    <text y="44" fill="#C3CCE3">
                      {"data"}
                    </text>{" "}
                  </g>{" "}
                  <g transform="translate(212 452)">
                    {" "}
                    <rect
                      x="-26"
                      y="-11"
                      width="52"
                      height="22"
                      rx="11"
                      fill="#0D1636"
                      stroke="#497BFF"
                      strokeOpacity=".6"
                    />{" "}
                    <text y="4" fill="#F3F6FF">
                      {"train"}
                    </text>{" "}
                  </g>{" "}
                  <g transform="translate(300 488)">
                    {" "}
                    <rect
                      x="-28"
                      y="-11"
                      width="56"
                      height="22"
                      rx="11"
                      fill="#0D1636"
                      stroke="#25E6D3"
                      strokeOpacity=".7"
                    />{" "}
                    <text y="4" fill="#25E6D3">
                      {"serve"}
                    </text>{" "}
                  </g>{" "}
                  <g transform="translate(388 452)">
                    {" "}
                    <rect
                      x="-34"
                      y="-11"
                      width="68"
                      height="22"
                      rx="11"
                      fill="#0D1636"
                      stroke="#9461FF"
                      strokeOpacity=".7"
                    />{" "}
                    <text y="4" fill="#F3F6FF">
                      {"monitor"}
                    </text>{" "}
                  </g>{" "}
                  <g transform="translate(508 412)">
                    {" "}
                    <path d="M-30 0 L0 -15 L30 0 L0 15 Z" fill="#7A4BF0" />
                    <path d="M-30 0 L-30 8 L0 23 L0 15 Z" fill="#3A2A86" />
                    <path d="M30 0 L30 8 L0 23 L0 15 Z" fill="#2A1F66" />{" "}
                    <text y="44" fill="#C3CCE3">
                      {"retrain"}
                    </text>{" "}
                  </g>{" "}
                </g>{" "}
                <g className="pulse">
                  {" "}
                  <circle cx="300" cy="228" r="112" fill="url(#hgCoreHalo)" />{" "}
                  <circle cx="300" cy="228" r="66" fill="url(#hgCore)" />{" "}
                  <circle cx="300" cy="228" r="66" fill="none" stroke="#E9FFFC" strokeOpacity=".5" />{" "}
                </g>{" "}
                <g fill="none" stroke="#C9F6FF" strokeOpacity=".5">
                  {" "}
                  <ellipse cx="300" cy="228" rx="104" ry="30" transform="rotate(-18 300 228)" />{" "}
                  <ellipse
                    cx="300"
                    cy="228"
                    rx="92"
                    ry="24"
                    transform="rotate(24 300 228)"
                    stroke="#B69BFF"
                    strokeOpacity=".55"
                  />{" "}
                </g>{" "}
                <g fill="none" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.2">
                  {" "}
                  <path d="M268 200 L300 188 L332 204 M268 200 L284 232 L300 188 M332 204 L318 236 L300 188 M284 232 L318 236 M268 200 L262 246 L284 232 M318 236 L338 252 L332 204 M262 246 L300 266 L284 232 M300 266 L318 236 M300 266 L338 252" />{" "}
                </g>{" "}
                <g fill="#FFFFFF">
                  {" "}
                  <circle cx="300" cy="188" r="4" />
                  <circle cx="268" cy="200" r="3.5" />
                  <circle cx="332" cy="204" r="3.5" /> <circle cx="284" cy="232" r="4.5" />
                  <circle cx="318" cy="236" r="4" />
                  <circle cx="262" cy="246" r="3" /> <circle cx="338" cy="252" r="3" />
                  <circle cx="300" cy="266" r="3.5" />{" "}
                </g>{" "}
                <circle cx="403" cy="196" r="5" fill="#25E6D3" />
                <circle cx="208" cy="262" r="4" fill="#B69BFF" />{" "}
                <g fill="none" strokeWidth="1.8" strokeLinecap="round">
                  {" "}
                  <path className="flow" d="M250 132 C280 150, 290 160, 292 168" stroke="url(#hgWire)" />{" "}
                  <path className="flow" d="M412 214 C390 220, 378 224, 366 226" stroke="url(#hgWire2)" />{" "}
                </g>{" "}
                <g className="float-a">
                  {" "}
                  <rect
                    x="28"
                    y="40"
                    width="248"
                    height="138"
                    rx="16"
                    fill="url(#hgPanel)"
                    stroke="#497BFF"
                    strokeOpacity=".5"
                  />{" "}
                  <circle cx="48" cy="60" r="4" fill="#FF6B7A" />
                  <circle cx="62" cy="60" r="4" fill="#FFC56E" />
                  <circle cx="76" cy="60" r="4" fill="#25E6D3" />{" "}
                  <text x="262" y="64" textAnchor="end" fontSize="11" fill="#9AA6C4">
                    {"train.py"}
                  </text>{" "}
                  <path d="M28 76 H276" stroke="#23315E" />{" "}
                  <g fontSize="12.5">
                    {" "}
                    <text x="44" y="100">
                      <tspan fill="#F3F6FF">{"pipe"}</tspan>
                      <tspan fill="#9AA6C4">{" = "}</tspan>
                      <tspan fill="#B69BFF">{"Pipeline"}</tspan>
                      <tspan fill="#9AA6C4">{"([...])"}</tspan>
                    </text>{" "}
                    <text x="44" y="121">
                      <tspan fill="#F3F6FF">{"pipe"}</tspan>
                      <tspan fill="#9AA6C4">{"."}</tspan>
                      <tspan fill="#7FA3FF">{"fit"}</tspan>
                      <tspan fill="#9AA6C4">{"(X_train, y_train)"}</tspan>
                    </text>{" "}
                    <text x="44" y="142">
                      <tspan fill="#F3F6FF">{"mlflow"}</tspan>
                      <tspan fill="#9AA6C4">{"."}</tspan>
                      <tspan fill="#7FA3FF">{"log_model"}</tspan>
                      <tspan fill="#9AA6C4">{"(pipe)"}</tspan>
                    </text>{" "}
                    <text x="44" y="160" fill="#25E6D3" fontSize="11.5">
                      {"# ship → POST /predict"}
                    </text>{" "}
                  </g>{" "}
                </g>{" "}
                <g className="float-b">
                  {" "}
                  <rect
                    x="412"
                    y="150"
                    width="172"
                    height="118"
                    rx="16"
                    fill="url(#hgPanel)"
                    stroke="#9461FF"
                    strokeOpacity=".55"
                  />{" "}
                  <text x="428" y="176" fontSize="11" fill="#9AA6C4">
                    {"model monitoring"}
                  </text>{" "}
                  <circle cx="566" cy="172" r="4" fill="#25E6D3" />{" "}
                  <path
                    d="M428 240 L450 228 L468 233 L488 214 L506 220 L526 200 L546 206 L566 190 L566 252 L428 252 Z"
                    fill="url(#hgSpark)"
                  />{" "}
                  <path
                    d="M428 240 L450 228 L468 233 L488 214 L506 220 L526 200 L546 206 L566 190"
                    fill="none"
                    stroke="#25E6D3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />{" "}
                  <path d="M428 252 H566" stroke="#23315E" />{" "}
                  <text x="428" y="262" fontSize="9.5" fill="#9AA6C4" dy="0">
                    {"drift check"}
                  </text>{" "}
                </g>{" "}
                <g className="float-c">
                  {" "}
                  <rect
                    x="452"
                    y="44"
                    width="112"
                    height="74"
                    rx="14"
                    fill="url(#hgPanel)"
                    stroke="#25E6D3"
                    strokeOpacity=".45"
                  />{" "}
                  <path
                    d="M486 92 h44 a13 13 0 0 0 0 -26 a19 19 0 0 0 -36 -4 a14 14 0 0 0 -8 30 z"
                    fill="none"
                    stroke="#25E6D3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />{" "}
                  <text x="508" y="110" textAnchor="middle" fontSize="10" fill="#C3CCE3">
                    {"deploy"}
                  </text>{" "}
                </g>{" "}
                <g className="float-b">
                  {" "}
                  <rect
                    x="44"
                    y="232"
                    width="128"
                    height="78"
                    rx="14"
                    fill="url(#hgPanel)"
                    stroke="#497BFF"
                    strokeOpacity=".45"
                  />{" "}
                  <text x="58" y="254" fontSize="10" fill="#9AA6C4">
                    {"retrieve · rerank"}
                  </text>{" "}
                  <g fill="#497BFF">
                    <rect x="58" y="264" width="64" height="6" rx="3" opacity=".9" />
                    <rect x="58" y="276" width="96" height="6" rx="3" opacity=".6" />
                    <rect x="58" y="288" width="44" height="6" rx="3" fill="#25E6D3" opacity=".9" />
                  </g>{" "}
                </g>{" "}
                <path
                  className="flow"
                  d="M172 270 C200 266, 214 256, 236 244"
                  fill="none"
                  stroke="url(#hgWire)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />{" "}
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <section className="bg-off" aria-labelledby="whyTitle">
          {" "}
          <div className="wrap stats-band">
            <div className="stats" role="list">
              <div className="stat" role="listitem">
                <span className="stat-num">{"24"}</span>
                <span className="stat-label">{"Weeks"}</span>
                <span className="stat-note">{"Structured and part-time"}</span>
              </div>
              <div className="stat" role="listitem">
                <span className="stat-num">{"8"}</span>
                <span className="stat-label">{"Phases"}</span>
                <span className="stat-note">{"Python to agentic AI"}</span>
              </div>
              <div className="stat" role="listitem">
                <span className="stat-num">{"6"}</span>
                <span className="stat-label">{"Projects"}</span>
                <span className="stat-note">{"5 guided + your capstone"}</span>
              </div>
              <div className="stat" role="listitem">
                <span className="stat-num">{"3"}</span>
                <span className="stat-label">{"Touchpoints a week"}</span>
                <span className="stat-note">{"2 live sessions + office hours"}</span>
              </div>
            </div>
          </div>{" "}
          <div className="section" style={{ paddingTop: "0" }}>
            <div className="wrap">
              {" "}
              <div className="purpose">
                {" "}
                <div className="reveal">
                  <p className="eyebrow">{"Why this program exists"}</p>
                  <h2 id="whyTitle">{"Production engineering, not notebook exercises."}</h2>
                </div>{" "}
                <p className="purpose-text reveal">
                  {
                    "To accelerate mid-level engineers and data professionals into senior AI/ML Engineering roles — faster than learning on the job alone. This program skips the toy tutorials and goes straight to what production engineers actually do: design systems, ship models, and own the full stack from data to deployed API. If you already code, this is your fastest path into mid-to-senior AI engineering."
                  }
                </p>{" "}
              </div>{" "}
              <div className="pillars">
                <article className="pillar reveal">
                  <span className="icon-tile">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 20V11M10 20V4M16 20v-7M21 20H3" />
                    </svg>
                  </span>
                  <h3>{"Machine Learning Foundations"}</h3>
                  <p>
                    {
                      "Strong fundamentals in statistics, classical ML, and model development — the backbone of every modern AI system."
                    }
                  </p>
                </article>
                <article className="pillar reveal">
                  <span className="icon-tile">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
                      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                    </svg>
                  </span>
                  <h3>{"Generative AI & LLM Engineering"}</h3>
                  <p>
                    {
                      "Build applications using LLMs, RAG systems, and AI agents that power modern AI products at scale."
                    }
                  </p>
                </article>
                <article className="pillar reveal">
                  <span className="icon-tile">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="7" rx="2" />
                      <rect x="3" y="13" width="18" height="7" rx="2" />
                      <path d="M7 7.5h.01M7 16.5h.01" />
                    </svg>
                  </span>
                  <h3>{"Production AI & MLOps"}</h3>
                  <p>
                    {
                      "Deploy, monitor, and scale ML and AI systems using the same industry tools running in enterprise production today."
                    }
                  </p>
                </article>
                <article className="pillar reveal">
                  <span className="icon-tile">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="7" width="18" height="13" rx="2" />
                      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
                    </svg>
                  </span>
                  <h3>{"Real-World AI Project Portfolio"}</h3>
                  <p>
                    {
                      "Build industry-style projects and a deployable AI product that demonstrates practical expertise to employers."
                    }
                  </p>
                </article>
              </div>{" "}
            </div>
          </div>{" "}
        </section>
        <section className="section bg-white" id="build" aria-labelledby="buildTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head reveal">
              {" "}
              <p className="eyebrow">{"What you’ll build"}</p>{" "}
              <h2 id="buildTitle">{"Finish with a production AI platform you built yourself."}</h2>{" "}
              <p>
                {
                  "Every phase adds a layer. The capstone ties them together — your own domain, your own data, deployed and monitored like real production software."
                }
              </p>{" "}
            </div>{" "}
            <div className="arch reveal" aria-label="Capstone architecture">
              {" "}
              <div className="arch-top">
                {" "}
                <div>
                  <p className="arch-title">{"Capstone · Full Production AI Platform"}</p>
                  <p className="arch-sub">{"The end-to-end system you design, deploy and operate"}</p>
                </div>{" "}
                <span className="arch-tag">{"Phase 7"}</span>{" "}
              </div>{" "}
              <div className="pipeline">
                <div className="pipe-node">
                  <b>{"Data ingestion"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"Validation"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"Feature engineering"}</b>
                </div>
                <div className="pipe-node hl">
                  <b>{"MLflow registry"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"FastAPI"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"Docker"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"AWS Fargate"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"Monitoring"}</b>
                </div>
                <div className="pipe-node hl">
                  <b>{"Drift detection"}</b>
                </div>
                <div className="pipe-node">
                  <b>{"Retraining loop"}</b>
                </div>
              </div>{" "}
              <p className="pipe-loop">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2" />
                  <path d="M21 4v5h-5M3 20v-5h5" />
                </svg>
                {"Drift detection triggers retraining — the operational loop, not just a deploy."}
              </p>{" "}
            </div>{" "}
            <ul className="capabilities">
              <li className="cap reveal">
                <span className="cap-num">{"01"}</span>
                <div>
                  <h3>{"Clean, reproducible data pipelines"}</h3>
                  <p>
                    {
                      "Turn raw data into tested datasets with a structured project layout, automated data quality checks and full Git history."
                    }
                  </p>
                  <span className="phase-ref">{"Phase 1"}</span>
                </div>
              </li>
              <li className="cap reveal">
                <span className="cap-num">{"02"}</span>
                <div>
                  <h3>{"Defensible model decisions"}</h3>
                  <p>
                    {
                      "Compare models with significance testing, confidence intervals and effect size — then make a go/no-go call."
                    }
                  </p>
                  <span className="phase-ref">{"Phase 1b"}</span>
                </div>
              </li>
              <li className="cap reveal">
                <span className="cap-num">{"03"}</span>
                <div>
                  <h3>{"Models you can explain"}</h3>
                  <p>
                    {
                      "From classical ML to deep learning, with SHAP and LIME explainability and stakeholder-ready evaluation reports."
                    }
                  </p>
                  <span className="phase-ref">{"Phase 2"}</span>
                </div>
              </li>
              <li className="cap reveal">
                <span className="cap-num">{"04"}</span>
                <div>
                  <h3>{"Live prediction APIs"}</h3>
                  <p>{"A typed FastAPI POST /predict endpoint, tracked in MLflow and running in Docker."}</p>
                  <span className="phase-ref">{"Phase 3"}</span>
                </div>
              </li>
              <li className="cap reveal">
                <span className="cap-num">{"05"}</span>
                <div>
                  <h3>{"Cloud MLOps you can operate"}</h3>
                  <p>
                    {
                      "GitHub Actions CI/CD to AWS, CloudWatch monitoring, Evidently drift alerts and automated retraining."
                    }
                  </p>
                  <span className="phase-ref">{"Phase 4"}</span>
                </div>
              </li>
              <li className="cap reveal">
                <span className="cap-num">{"06"}</span>
                <div>
                  <h3>{"RAG and multi-agent systems"}</h3>
                  <p>
                    {
                      "Hybrid retrieval with reranking and RAGAS evaluation; LangGraph agents with tools, human-in-the-loop and tracing."
                    }
                  </p>
                  <span className="phase-ref">{"Phases 5–6"}</span>
                </div>
              </li>
            </ul>{" "}
          </div>{" "}
        </section>
        <section className="section bg-dark projects" id="projects" aria-labelledby="projTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head center reveal">
              {" "}
              <p className="eyebrow">{"Portfolio"}</p>{" "}
              <h2 id="projTitle">
                {"6 real-world projects, "}
                <span className="grad-text">{"built like production systems"}</span>
              </h2>{" "}
              <p>
                {
                  "Fewer projects, built deeper. Every project mirrors a real system — not a toy dataset or a tutorial clone."
                }
              </p>{" "}
            </div>{" "}
            <div className="proj-grid">
              <article className="proj reveal">
                {" "}
                <div className="proj-preview" aria-hidden="true">
                  <div className="pv-title">
                    <span>{"shap · feature impact"}</span>
                    <span>{"churn"}</span>
                  </div>{" "}
                  <div className="pv-bars">
                    <div className="pv-bar">
                      <i />
                      <b className="pos" style={{ width: "86%" }} />
                    </div>
                    <div className="pv-bar">
                      <i />
                      <b className="pos" style={{ width: "64%" }} />
                    </div>{" "}
                    <div className="pv-bar">
                      <i />
                      <b className="neg" style={{ width: "48%" }} />
                    </div>
                    <div className="pv-bar">
                      <i />
                      <b className="pos" style={{ width: "34%" }} />
                    </div>
                    <div className="pv-bar">
                      <i />
                      <b className="neg" style={{ width: "22%" }} />
                    </div>
                  </div>
                </div>{" "}
                <div className="proj-body">
                  {" "}
                  <div className="proj-meta">
                    <span>{"Project 01"}</span>
                    <span className="phase">{"Phase 2"}</span>
                  </div>{" "}
                  <h3>{"Customer Churn Prediction System"}</h3>{" "}
                  <p className="proj-problem">{"Which customers are about to leave — and why?"}</p>{" "}
                  <p className="proj-label">{"What you build"}</p>{" "}
                  <p className="proj-desc">
                    {
                      "End-to-end classification with SHAP explainability and stakeholder-ready output. Threshold optimization, PR-AUC, imbalanced class handling, and a visual explanation dashboard."
                    }
                  </p>{" "}
                  <ul className="stack" aria-label="Technologies">
                    <li>{"XGBoost"}</li>
                    <li>{"SHAP"}</li>
                    <li>{"Optuna"}</li>
                    <li>{"Streamlit"}</li>
                  </ul>{" "}
                </div>{" "}
              </article>
              <article className="proj reveal">
                {" "}
                <div className="proj-preview" aria-hidden="true">
                  <div className="pv-title">
                    <span>{"POST /predict"}</span>
                    <span>{"200 OK"}</span>
                  </div>{" "}
                  <div className="pv-code">
                    <span className="c">{"// typed Pydantic response"}</span>
                    {"\n{ "}
                    <span className="s">{'"model"'}</span>
                    {": "}
                    <span className="s">{'"risk-v3"'}</span>
                    {",\n  "}
                    <span className="s">{'"risk_score"'}</span>
                    {": "}
                    <span className="n">{"0.82"}</span>
                    {",\n  "}
                    <span className="s">{'"run_id"'}</span>
                    {": "}
                    <span className="s">{'"mlflow:7f3a…"'}</span>
                    {" }"}
                  </div>
                </div>{" "}
                <div className="proj-body">
                  {" "}
                  <div className="proj-meta">
                    <span>{"Project 02"}</span>
                    <span className="phase">{"Phase 3"}</span>
                  </div>{" "}
                  <h3>{"Risk Prediction API"}</h3>{" "}
                  <p className="proj-problem">{"A model in a notebook can't serve anyone. Turn it into software."}</p>{" "}
                  <p className="proj-label">{"What you build"}</p>{" "}
                  <p className="proj-desc">
                    {
                      "Take Phase 1's model and turn it into software: MLflow experiment tracking, typed FastAPI endpoints, Docker containerization, and a container registry-ready image."
                    }
                  </p>{" "}
                  <ul className="stack" aria-label="Technologies">
                    <li>{"MLflow"}</li>
                    <li>{"FastAPI"}</li>
                    <li>{"Pydantic"}</li>
                    <li>{"Docker"}</li>
                  </ul>{" "}
                </div>{" "}
              </article>
              <article className="proj reveal">
                {" "}
                <div className="proj-preview" aria-hidden="true">
                  <div className="pv-title">
                    <span>{"ci/cd → aws"}</span>
                    <span>{"retrain on drift"}</span>
                  </div>{" "}
                  <div className="pv-flow">
                    <span>{"GitHub Actions"}</span>
                    <em>{"→"}</em>
                    <span>{"ECR"}</span>
                    <em>{"→"}</em>
                    <span>{"ECS Fargate"}</span>
                    <em>{"→"}</em>
                    <span>{"CloudWatch"}</span>
                    <em>{"→"}</em>
                    <span className="t">{"Evidently"}</span>
                    <em>{"↻"}</em>
                  </div>
                </div>{" "}
                <div className="proj-body">
                  {" "}
                  <div className="proj-meta">
                    <span>{"Project 03"}</span>
                    <span className="phase">{"Phase 4"}</span>
                  </div>{" "}
                  <h3>{"Full MLOps Pipeline on AWS"}</h3>{" "}
                  <p className="proj-problem">
                    {"Deployed models drift. Catch it, alert on it, retrain automatically."}
                  </p>{" "}
                  <p className="proj-label">{"What you build"}</p>{" "}
                  <p className="proj-desc">
                    {
                      "GitHub Actions CI/CD to ECS Fargate, CloudWatch monitoring, Evidently drift alerts, and an automated retraining trigger. The operational loop, not just a deploy."
                    }
                  </p>{" "}
                  <ul className="stack" aria-label="Technologies">
                    <li>{"AWS ECS"}</li>
                    <li>{"GitHub Actions"}</li>
                    <li>{"Evidently"}</li>
                    <li>{"DVC"}</li>
                  </ul>{" "}
                </div>{" "}
              </article>
              <article className="proj reveal">
                {" "}
                <div className="proj-preview" aria-hidden="true">
                  <div className="pv-title">
                    <span>{"hybrid retrieval"}</span>
                    <span>{"RAGAS"}</span>
                  </div>{" "}
                  <div className="pv-flow">
                    <span>{"query"}</span>
                    <em>{"→"}</em>
                    <span>{"pgvector"}</span>
                    <em>{"+"}</em>
                    <span>{"BM25"}</span>
                    <em>{"→"}</em>
                    <span>{"RRF"}</span>
                    <em>{"→"}</em>
                    <span>{"rerank"}</span>
                    <em>{"→"}</em>
                    <span className="t">{"answer"}</span>
                  </div>
                </div>{" "}
                <div className="proj-body">
                  {" "}
                  <div className="proj-meta">
                    <span>{"Project 04"}</span>
                    <span className="phase">{"Phase 5"}</span>
                  </div>{" "}
                  <h3>{"Production RAG System"}</h3>{" "}
                  <p className="proj-problem">{"Answers are only as good as what you retrieve."}</p>{" "}
                  <p className="proj-label">{"What you build"}</p>{" "}
                  <p className="proj-desc">
                    {
                      "Hybrid retrieval over real documents — pgvector HNSW + BM25 + RRF fusion + cross-encoder reranking, evaluated with RAGAS on a gold-standard query set. Precision@5 and Recall@10 reported."
                    }
                  </p>{" "}
                  <ul className="stack" aria-label="Technologies">
                    <li>{"pgvector"}</li>
                    <li>{"SBERT"}</li>
                    <li>{"BM25"}</li>
                    <li>{"RAGAS"}</li>
                  </ul>{" "}
                </div>{" "}
              </article>
              <article className="proj reveal">
                {" "}
                <div className="proj-preview" aria-hidden="true">
                  <svg className="pv-graph" viewBox="0 0 300 118" aria-hidden="true">
                    {" "}
                    <g stroke="#2F3F72" strokeWidth="1.5" fill="none">
                      <path d="M150 26 L66 70 M150 26 L150 70 M150 26 L234 70 M66 70 L150 104 M150 70 L150 104 M234 70 L150 104" />
                    </g>{" "}
                    <g fontFamily="JetBrains Mono, monospace" fontSize="10" textAnchor="middle">
                      {" "}
                      <rect x="112" y="12" width="76" height="26" rx="8" fill="#16234D" stroke="#497BFF" />
                      <text x="150" y="29" fill="#F3F6FF">
                        {"router"}
                      </text>{" "}
                      <rect x="28" y="57" width="76" height="26" rx="8" fill="#16234D" stroke="#2F3F72" />
                      <text x="66" y="74" fill="#C3CCE3">
                        {"RAG tool"}
                      </text>{" "}
                      <rect x="112" y="57" width="76" height="26" rx="8" fill="#16234D" stroke="#2F3F72" />
                      <text x="150" y="74" fill="#C3CCE3">
                        {"API tool"}
                      </text>{" "}
                      <rect x="196" y="57" width="76" height="26" rx="8" fill="#16234D" stroke="#25E6D3" />
                      <text x="234" y="74" fill="#25E6D3">
                        {"human"}
                      </text>{" "}
                      <rect x="112" y="92" width="76" height="22" rx="8" fill="#16234D" stroke="#9461FF" />
                      <text x="150" y="107" fill="#C3CCE3">
                        {"trace"}
                      </text>{" "}
                    </g>
                  </svg>
                </div>{" "}
                <div className="proj-body">
                  {" "}
                  <div className="proj-meta">
                    <span>{"Project 05"}</span>
                    <span className="phase">{"Phase 6"}</span>
                  </div>{" "}
                  <h3>{"Multi-Agent Support System"}</h3>{" "}
                  <p className="proj-problem">{"Agents need tools, state, and a human in the loop."}</p>{" "}
                  <p className="proj-label">{"What you build"}</p>{" "}
                  <p className="proj-desc">
                    {
                      "LangGraph state machine with RAG tool, API tool, human-in-the-loop checkpoint, and full LangSmith tracing. Deployed and monitored, with cost and latency metrics."
                    }
                  </p>{" "}
                  <ul className="stack" aria-label="Technologies">
                    <li>{"LangGraph"}</li>
                    <li>{"MCP"}</li>
                    <li>{"LangSmith"}</li>
                    <li>{"FastAPI"}</li>
                  </ul>{" "}
                </div>{" "}
              </article>
              <article className="proj capstone reveal">
                {" "}
                <div className="proj-preview" aria-hidden="true">
                  <div className="pv-title">
                    <span>{"your domain · your data"}</span>
                    <span>{"end to end"}</span>
                  </div>{" "}
                  <div className="pv-flow">
                    <span>{"data"}</span>
                    <em>{"→"}</em>
                    <span>{"features"}</span>
                    <em>{"→"}</em>
                    <span>{"registry"}</span>
                    <em>{"→"}</em>
                    <span>{"API"}</span>
                    <em>{"→"}</em>
                    <span>{"cloud"}</span>
                    <em>{"→"}</em>
                    <span className="t">{"monitor"}</span>
                    <em>{"↻"}</em>
                  </div>
                </div>{" "}
                <div className="proj-body">
                  {" "}
                  <div className="proj-meta">
                    <span>{"Capstone"}</span>
                    <span className="phase">{"Phase 7"}</span>
                  </div>{" "}
                  <h3>{"Your Production AI Platform"}</h3>{" "}
                  <p className="proj-problem">{"Prove you can own a production AI system end to end."}</p>{" "}
                  <p className="proj-label">{"What you build"}</p>{" "}
                  <p className="proj-desc">
                    {
                      "The centerpiece of your portfolio. A complete production AI system in your own domain — data to model to API to cloud to monitoring, all wired together and deployed live."
                    }
                  </p>{" "}
                  <ul className="stack" aria-label="Technologies">
                    <li>{"Your Domain"}</li>
                    <li>{"Full MLOps"}</li>
                    <li>{"GenAI Layer"}</li>
                    <li>{"AWS"}</li>
                  </ul>{" "}
                </div>{" "}
              </article>
            </div>{" "}
            <p className="proj-note">{"Plus a mini project or applied lab in every phase — see the roadmap below."}</p>{" "}
          </div>{" "}
        </section>
        <section className="section bg-off" id="roadmap" aria-labelledby="roadmapTitle">
          {" "}
          <div className="wrap" id="curriculum">
            {" "}
            <div className="head reveal">
              {" "}
              <p className="eyebrow">{"Curriculum"}</p>{" "}
              <h2 id="roadmapTitle">
                {"Your learning roadmap: "}
                <span className="grad-text">{"8 phases"}</span>
                {", one production stack."}
              </h2>{" "}
              <p>{"Select a phase to see what's covered, why it matters, and the project you'll ship."}</p>{" "}
            </div>{" "}
            <Roadmap />{" "}
            <div className="outline" id="outline">
              {" "}
              <div className="outline-head reveal">
                {" "}
                <h3>{"Full lesson breakdown"}</h3>{" "}
                <p>{"Every section, lesson, lab and live session, phase by phase."}</p>{" "}
              </div>{" "}
              <LessonOutline />{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <section className="section bg-white" id="tech" aria-labelledby="techTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head reveal">
              {" "}
              <p className="eyebrow">{"Technologies"}</p>{" "}
              <h2 id="techTitle">{"The tools production AI teams actually use."}</h2>{" "}
              <p>
                {
                  "Every technology below appears in the curriculum or a portfolio project — learned by building, not by watching."
                }
              </p>{" "}
            </div>{" "}
            <div className="tech-grid">
              <div className="tech-col reveal">
                <h3>
                  <i aria-hidden="true" />
                  {"Foundations"}
                </h3>
                <p className="tc-phase">{"Phase 1"}</p>
                <ul>
                  <li>{"Python 3.11+"}</li>
                  <li>{"NumPy"}</li>
                  <li>{"Pandas"}</li>
                  <li>{"Matplotlib"}</li>
                  <li>{"Scikit-learn"}</li>
                  <li>{"Jupyter"}</li>
                  <li>{"VS Code"}</li>
                  <li>{"Git"}</li>
                  <li>{"GitHub"}</li>
                  <li>{"venv / pip"}</li>
                </ul>
              </div>
              <div className="tech-col reveal">
                <h3>
                  <i aria-hidden="true" />
                  {"Machine learning & deep learning"}
                </h3>
                <p className="tc-phase">{"Phase 2"}</p>
                <ul>
                  <li>{"Scikit-learn"}</li>
                  <li>{"XGBoost"}</li>
                  <li>{"LightGBM"}</li>
                  <li>{"TensorFlow"}</li>
                  <li>{"Keras"}</li>
                  <li>{"PyTorch"}</li>
                  <li>{"SHAP"}</li>
                  <li>{"LIME"}</li>
                  <li>{"Optuna"}</li>
                  <li>{"OpenCV"}</li>
                  <li>{"NLTK"}</li>
                  <li>{"spaCy"}</li>
                  <li>{"Hugging Face"}</li>
                  <li>{"TensorBoard"}</li>
                  <li>{"Google Colab"}</li>
                </ul>
              </div>
              <div className="tech-col reveal">
                <h3>
                  <i aria-hidden="true" />
                  {"Production & MLOps"}
                </h3>
                <p className="tc-phase">{"Phases 3–4"}</p>
                <ul>
                  <li>{"MLflow"}</li>
                  <li>{"FastAPI"}</li>
                  <li>{"Pydantic"}</li>
                  <li>{"Docker"}</li>
                  <li>{"GitHub Actions"}</li>
                  <li>{"ECR"}</li>
                  <li>{"ECS Fargate"}</li>
                  <li>{"CloudWatch"}</li>
                  <li>{"Evidently"}</li>
                  <li>{"DVC"}</li>
                  <li>{"Airflow"}</li>
                  <li>{"Kubernetes"}</li>
                  <li>{"Prometheus"}</li>
                </ul>
              </div>
              <div className="tech-col reveal">
                <h3>
                  <i aria-hidden="true" />
                  {"GenAI, RAG & agents"}
                </h3>
                <p className="tc-phase">{"Phases 5–6"}</p>
                <ul>
                  <li>{"Transformers"}</li>
                  <li>{"pgvector"}</li>
                  <li>{"SBERT"}</li>
                  <li>{"BM25"}</li>
                  <li>{"RAGAS"}</li>
                  <li>{"LangChain"}</li>
                  <li>{"LlamaIndex"}</li>
                  <li>{"LangGraph"}</li>
                  <li>{"MCP"}</li>
                  <li>{"LangSmith"}</li>
                  <li>{"Langfuse"}</li>
                </ul>
              </div>
            </div>{" "}
          </div>{" "}
        </section>
        <section className="section bg-tint" id="why" aria-labelledby="diffTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head reveal">
              {" "}
              <p className="eyebrow">{"Why it’s different"}</p>{" "}
              <h2 id="diffTitle">{"The gap between training a model and shipping one — bridged."}</h2>{" "}
              <p>
                {
                  "Most courses stop at notebooks. This one takes you through the exact engineering decisions made in production ML systems at government, healthcare, and biotech scale."
                }
              </p>{" "}
            </div>{" "}
            <div className="diff-grid">
              <article className="diff-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
                  </svg>
                </span>
                <h3>{"Built by a Practitioner"}</h3>
                <p>
                  {
                    "Instructor deployed BERT at USCIS, built early warning systems at Pratt & Whitney, and ran 9B+ row data pipelines on Databricks. Every lesson reflects systems that ran in production."
                  }
                </p>
              </article>
              <article className="diff-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2" />
                    <path d="M21 4v5h-5M3 20v-5h5" />
                  </svg>
                </span>
                <h3>{"Full ML Lifecycle"}</h3>
                <p>
                  {
                    "From EDA and feature engineering through Docker, CI/CD, AWS, monitoring, drift detection, and automated retraining — not just model training."
                  }
                </p>
              </article>
              <article className="diff-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                </span>
                <h3>{"GenAI With Rigor"}</h3>
                <p>
                  {
                    "Hybrid RAG with RRF reranking, pgvector HNSW tuning, RAGAS evaluation, and LangGraph agents — built to production quality, not demo quality."
                  }
                </p>
              </article>
              <article className="diff-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <h3>{"US Job Market Lens"}</h3>
                <p>
                  {
                    "System design interviews, resume review, and salary negotiation framed around US AI/ML engineering roles — not placement stats from another market."
                  }
                </p>
              </article>
              <article className="diff-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <h3>{"Explainability Built In"}</h3>
                <p>
                  {
                    "SHAP and LIME aren't optional extras — they're in Phase 2, because production ML in healthcare and finance requires interpretable models."
                  }
                </p>
              </article>
              <article className="diff-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 14l4-4" />
                    <path d="M3.3 17a9 9 0 1 1 17.4 0" />
                  </svg>
                </span>
                <h3>{"Evaluation as Infrastructure"}</h3>
                <p>
                  {
                    "Every phase measures its output — Precision@K for RAG, F1 and PR-AUC for classifiers, latency/cost for agents. You'll know what your system actually does."
                  }
                </p>
              </article>
            </div>{" "}
            <div className="future">
              {" "}
              <div className="future-intro reveal">
                {" "}
                <p className="eyebrow">{"Where AI engineering is heading"}</p>{" "}
                <h3>{"Designed around five shifts in how AI gets built."}</h3>{" "}
                <p>
                  {
                    "These aren't hype — they're pattern-matches from 6 years building production ML systems. This course is specifically designed around each one."
                  }
                </p>{" "}
              </div>{" "}
              <div className="future-list reveal">
                <details className="future-item">
                  {" "}
                  <summary>
                    <span className="fn">{"01"}</span>
                    <span className="ft">
                      {"Every software engineer will need ML literacy to stay employable"}
                      <span className="fr">
                        <b>{"How this course responds:"}</b>
                        {" Phase 1 + Phase 2 build ML intuition from first principles so you understand "}
                        <em>{"why"}</em>
                        {" models behave the way they do, not just how to call an API."}
                      </span>
                    </span>
                    <span className="fc" aria-hidden="true" />
                  </summary>{" "}
                  <p className="fbody">
                    {
                      'AI is eating the software stack. Engineers who can\'t read a training loop, tune a model, or evaluate an LLM output will be passed over — not fired, just not hired. The bar is moving from "knows Python" to "knows how models work in production."'
                    }
                  </p>{" "}
                </details>
                <details className="future-item">
                  {" "}
                  <summary>
                    <span className="fn">{"02"}</span>
                    <span className="ft">
                      {"MLOps will become the most leveraged skill in AI engineering teams"}
                      <span className="fr">
                        <b>{"How this course responds:"}</b>
                        {
                          " Phase 4 is an entire 4-week deep dive into full cloud MLOps: MLflow, Airflow, Kubernetes, Prometheus, and end-to-end ML pipeline automation."
                        }
                      </span>
                    </span>
                    <span className="fc" aria-hidden="true" />
                  </summary>{" "}
                  <p className="fbody">
                    {
                      "Organizations are drowning in experiments and failing at deployment. The engineers who can take a model from notebook to production — with monitoring, versioning, and CI/CD — will be the ones running the platform and setting the architecture."
                    }
                  </p>{" "}
                </details>
                <details className="future-item">
                  {" "}
                  <summary>
                    <span className="fn">{"03"}</span>
                    <span className="ft">
                      {
                        'RAG + Agents will replace most "build a chatbot" use cases by 2026 — and most engineers are unprepared'
                      }
                      <span className="fr">
                        <b>{"How this course responds:"}</b>
                        {
                          " Phase 5 + Phase 6 cover production RAG architecture, LLM evaluation, LangGraph agents, LLMOps with Langfuse — the full agentic AI stack."
                        }
                      </span>
                    </span>
                    <span className="fc" aria-hidden="true" />
                  </summary>{" "}
                  <p className="fbody">
                    {
                      "Basic prompt wrappers are already commoditized. What companies actually need are engineers who can build reliable retrieval systems, evaluate hallucination, manage agent tool use, and wire everything together in a production LangChain or LlamaIndex stack."
                    }
                  </p>{" "}
                </details>
                <details className="future-item">
                  {" "}
                  <summary>
                    <span className="fn">{"04"}</span>
                    <span className="ft">
                      {'The "AI Engineer" title will overtake "Data Scientist" in job postings within 2 years'}
                      <span className="fr">
                        <b>{"How this course responds:"}</b>
                        {
                          " Every phase is structured around what an AI Engineer actually does at work: build, test, deploy, and maintain ML systems in the cloud — not just model training."
                        }
                      </span>
                    </span>
                    <span className="fc" aria-hidden="true" />
                  </summary>{" "}
                  <p className="fbody">
                    {
                      "The shift is already happening. Companies aren't just analyzing data — they're embedding AI into every product. The new default hire isn't a BI-focused data scientist; it's someone who can engineer end-to-end AI systems that ship."
                    }
                  </p>{" "}
                </details>
                <details className="future-item">
                  {" "}
                  <summary>
                    <span className="fn">{"05"}</span>
                    <span className="ft">
                      {
                        "The engineers who get hired in 2026–2027 will be those with deployable portfolios, not certifications"
                      }
                      <span className="fr">
                        <b>{"How this course responds:"}</b>
                        {
                          " You graduate with 5+ production-ready projects hosted on GitHub — a clinical ML pipeline, a live RAG app, a GenAI API, and a capstone with system design doc reviewers can open in the browser."
                        }
                      </span>
                    </span>
                    <span className="fc" aria-hidden="true" />
                  </summary>{" "}
                  <p className="fbody">
                    {
                      "Hiring managers have seen thousands of AWS and Coursera certificates. What cuts through is a GitHub with a live MLOps pipeline, a real RAG system, and a capstone that shows end-to-end system design thinking. Proof beats credentials every time."
                    }
                  </p>{" "}
                </details>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <section className="section bg-white" id="how" aria-labelledby="howTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head reveal">
              {" "}
              <p className="eyebrow">{"How it works"}</p>{" "}
              <h2 id="howTitle">{"Built for mid-to-senior engineers with full-time jobs"}</h2>{" "}
              <p>
                {
                  "Recorded content to learn at your pace. Two live deep-dives every week. Weekly office hours to unblock you. Designed for 10–15 hrs/week alongside your existing role."
                }
              </p>{" "}
            </div>{" "}
            <div className="how-grid">
              <article className="how-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="6" width="14" height="12" rx="2" />
                    <path d="M16 10l6-3v10l-6-3z" />
                  </svg>
                </span>
                <h3>{"Live Session #1"}</h3>
                <p>
                  {
                    "2 hours of live engineering. Bassa implements real systems, walks through architecture decisions, and reviews student code in real time."
                  }
                </p>
                <p className="how-detail">{"Weekly · 2 hrs · Recorded"}</p>
              </article>
              <article className="how-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />
                  </svg>
                </span>
                <h3>{"Live Session #2"}</h3>
                <p>
                  {
                    "Second live session each week focused on project work, debugging, and going deeper on the week's production topic. More hands-on, less lecture."
                  }
                </p>
                <p className="how-detail">{"Weekly · 90 min · Recorded"}</p>
              </article>
              <article className="how-card reveal">
                <span className="icon-tile">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
                <h3>{"Office Hours"}</h3>
                <p>
                  {
                    "90-minute weekly session. Bring your GitHub repo, your stuck point, or your ML system design question. Direct access to Bassa — no waiting on a forum."
                  }
                </p>
                <p className="how-detail">{"Weekly · 90 min · Optional"}</p>
              </article>
            </div>{" "}
            <p className="how-callout reveal">
              <span className="grad-text">{"2 live sessions + 1 office hour every week"}</span>
              <span aria-hidden="true">{"—"}</span>
              {" 3 touchpoints with a working US AI/ML engineer."}
            </p>{" "}
          </div>{" "}
        </section>
        <section className="section bg-off" id="instructor" aria-labelledby="bioTitle">
          {" "}
          <div className="wrap bio" id="about">
            {" "}
            <aside className="bio-card reveal" aria-label="Instructor summary">
              {" "}
              <div className="monogram" aria-hidden="true">
                {"BB"}
              </div>{" "}
              <p className="bname">{"Basazin “Bassa” Belhu"}</p>{" "}
              <p className="brole">{"AI/ML Engineer · Alexandria, VA"}</p>{" "}
              <ul className="bio-facts">
                <li>
                  <b>{"6 yrs"}</b>
                  <span>{"production ML"}</span>
                </li>
                <li>
                  <b>{"3"}</b>
                  <span>{"sectors: healthcare, biotech, federal"}</span>
                </li>
                <li>
                  <b>{"9B+"}</b>
                  <span>{"row pipelines on Databricks"}</span>
                </li>
                <li>
                  <b>{"BS"}</b>
                  <span>{"Bioengineering, Univ. of Washington"}</span>
                </li>
              </ul>{" "}
              <div className="bio-links">
                <a className="bio-link" href="https://github.com/Basie12" target="_blank" rel="noopener">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
                  </svg>
                  {"GitHub"}
                </a>
              </div>{" "}
            </aside>{" "}
            <div className="bio-content reveal">
              {" "}
              <p className="eyebrow">{"Your instructor"}</p> <h2 id="bioTitle">{'Basazin "Bassa" Belhu'}</h2>{" "}
              <p>
                {
                  "AI/ML Engineer with 6 years building production machine learning systems across healthcare, biotech, and federal government. Currently designing and deploying end-to-end ML pipelines, building predictive models at scale, and integrating AI systems into high-stakes production environments."
                }
              </p>
              <p>
                {
                  'Every lesson in this program comes from systems that ran in production — not from textbooks or tutorials. The goal is to teach the gap between "I trained a model" and "I shipped and operate a model," because that gap is where careers stall.'
                }
              </p>{" "}
              <ul className="bio-creds">
                <li>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  <span>
                    {"Production ML across aerospace, biotech, and federal sectors — models running in real systems"}
                  </span>
                </li>
                <li>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  <span>
                    {
                      "NLP and deep learning systems deployed at enterprise scale — classification, extraction, and automation"
                    }
                  </span>
                </li>
                <li>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  <span>
                    {"9B+ row data pipelines on Databricks + Spark; MLflow, AWS, Docker, FastAPI in production"}
                  </span>
                </li>
                <li>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  <span>{"BS Bioengineering (Data Science), University of Washington"}</span>
                </li>
                <li>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                  <span>{"Based in Alexandria, VA — US market, US hiring standards, US salary expectations"}</span>
                </li>
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <section className="section bg-white" id="who" aria-labelledby="whoTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head reveal">
              {" "}
              <p className="eyebrow">{"Who it’s for"}</p>{" "}
              <h2 id="whoTitle">{"Built for engineers who already know how to code"}</h2>{" "}
              <p>
                {
                  "This is not a beginner bootcamp. It's a production-engineering accelerator for people who are already technical — and ready to level up into the highest-comp engineering track in the market."
                }
              </p>{" "}
            </div>{" "}
            <div className="who-grid">
              {" "}
              <div className="fit-card fit-yes reveal">
                <h3>
                  <span className="badge" aria-hidden="true">
                    {"✓"}
                  </span>
                  {"This is for you if…"}
                </h3>
                <ul className="fit-list">
                  <li>{"You're a software engineer who wants to move into AI/ML roles"}</li>
                  <li>{"You're a data analyst or data scientist ready to engineer, not just analyze"}</li>
                  <li>
                    {
                      "You're a BI developer or SQL developer with strong query skills — Python will be taught from the ground up"
                    }
                  </li>
                  <li>
                    {
                      "You have programming experience in any language (SQL, Java, C#, R) and want to add ML and AI to your stack"
                    }
                  </li>
                  <li>{"You're already writing Python and want to add ML, MLOps, and GenAI to your stack"}</li>
                  <li>{"You're mid-level and targeting $150K–$260K AI engineering roles"}</li>
                  <li>{"You want to build and deploy real systems — not just pass coding interviews"}</li>
                  <li>{"You can commit 10–15 hrs/week for 24 weeks (evenings and weekends work)"}</li>
                </ul>
              </div>{" "}
              <div className="fit-card fit-no reveal">
                <h3>
                  <span className="badge" aria-hidden="true">
                    {"✕"}
                  </span>
                  {"This is not for you if…"}
                </h3>
                <ul className="fit-list">
                  <li>
                    {
                      "You have zero programming experience — some coding background in any language (SQL counts) is required"
                    }
                  </li>
                  <li>{"You want a passive video course you can binge in a weekend"}</li>
                  <li>{"You're looking for job-placement guarantees — this gives you the skills, you do the work"}</li>
                  <li>{"You want theory-only lectures without hands-on project output"}</li>
                </ul>{" "}
                <div className="prereqs">
                  <h4>{"Prerequisites"}</h4>
                  <ul>
                    <li>{"Coding in any language"}</li>
                    <li>{"Some SQL"}</li>
                    <li>{"Basic stats"}</li>
                    <li>{"CS fundamentals"}</li>
                  </ul>
                </div>
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="careers-band" id="outcomes">
            {" "}
            <div className="wrap">
              {" "}
              <div className="careers-head reveal">
                <div>
                  <p className="eyebrow">{"Where you land"}</p>
                  <h3>{"Career outcomes"}</h3>
                  <p className="careers-sub">
                    {
                      "Roles this program prepares you for — with production-grade projects and a portfolio that proves it."
                    }
                  </p>
                </div>
              </div>{" "}
              <div className="role-grid">
                <article className="role r-blue reveal">
                  <div className="role-top">
                    <span className="role-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                        <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
                      </svg>
                    </span>
                    <span className="role-kicker">{"Career path 01"}</span>
                    <h4>{"AI / ML Engineer"}</h4>
                  </div>
                  <p>
                    {
                      "Build real-world AI applications using LLMs, RAG, and agents — and deploy them into production systems used by real users."
                    }
                  </p>
                </article>
                <article className="role r-teal reveal">
                  <div className="role-top">
                    <span className="role-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M4 20V11M10 20V4M16 20v-7M21 20H3" />
                      </svg>
                    </span>
                    <span className="role-kicker">{"Career path 02"}</span>
                    <h4>{"Data Scientist"}</h4>
                  </div>
                  <p>
                    {
                      "Develop predictive models and derive insights using statistical and ML methods — with the engineering skills to ship your work, not just present it in a notebook."
                    }
                  </p>
                </article>
                <article className="role r-violet reveal">
                  <div className="role-top">
                    <span className="role-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
                        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
                      </svg>
                    </span>
                    <span className="role-kicker">{"Career path 03"}</span>
                    <h4>{"Generative AI / LLM Engineer"}</h4>
                  </div>
                  <p>
                    {
                      "Build intelligent agents, multi-agent workflows, and LLM-powered applications — with evaluation frameworks, guardrails, and LLMOps built in from day one."
                    }
                  </p>
                </article>
                <article className="role r-indigo reveal">
                  <div className="role-top">
                    <span className="role-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3l9 5-9 5-9-5z" />
                        <path d="M3 13l9 5 9-5" />
                      </svg>
                    </span>
                    <span className="role-kicker">{"Career path 04"}</span>
                    <h4>{"AI Solutions Engineer"}</h4>
                  </div>
                  <p>
                    {
                      "Design end-to-end AI solutions for real business problems — bridging the gap between model capabilities and production value delivery."
                    }
                  </p>
                </article>
              </div>{" "}
              <figure className="sal reveal" aria-labelledby="salTitle">
                {" "}
                <div className="sal-head">
                  {" "}
                  <figcaption id="salTitle">{"What these roles pay in the US (2026)"}</figcaption>{" "}
                  <div className="sal-legend" aria-hidden="true">
                    <span>
                      <i className="mid" />
                      {"Mid-level"}
                    </span>
                    <span>
                      <i className="sen" />
                      {"Senior"}
                    </span>
                  </div>{" "}
                </div>{" "}
                <div className="sal-plot">
                  {" "}
                  <div className="sal-grid" aria-hidden="true">
                    <i style={{ left: "0.00%" }} />
                    <i style={{ left: "15.62%" }} />
                    <i style={{ left: "31.25%" }} />
                    <i style={{ left: "46.88%" }} />
                    <i style={{ left: "62.50%" }} />
                    <i style={{ left: "78.12%" }} />
                    <i style={{ left: "93.75%" }} />
                  </div>{" "}
                  <div className="sal-row">
                    <div className="sal-role">
                      <b>{"AI / ML Engineer"}</b>
                      <span className="sal-note">{"Median: $176K · 14% QoQ growth in postings"}</span>
                    </div>
                    <div className="sal-track">
                      <div className="sal-bar-row">
                        <span
                          className="sal-bar mid"
                          tabIndex={0}
                          style={{ left: "21.88%", width: "28.12%" }}
                          data-tip="AI / ML Engineer · Mid-level: $170K–$260K"
                          aria-label="AI / ML Engineer · Mid-level: $170K–$260K"
                        />
                        <span className="sal-val" style={{ left: "50.00%" }}>
                          {"$170K–$260K"}
                        </span>
                      </div>
                      <div className="sal-bar-row">
                        <span
                          className="sal-bar sen open"
                          tabIndex={0}
                          style={{ left: "37.50%", width: "40.62%" }}
                          data-tip="AI / ML Engineer · Senior: $220K–$350K+"
                          aria-label="AI / ML Engineer · Senior: $220K–$350K+"
                        />
                        <span className="sal-val" style={{ left: "78.12%" }}>
                          {"$220K–$350K+"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sal-row">
                    <div className="sal-role">
                      <b>{"GenAI / LLM Engineer"}</b>
                      <span className="sal-note">{"Leads all AI roles in comp growth"}</span>
                    </div>
                    <div className="sal-track">
                      <div className="sal-bar-row">
                        <span
                          className="sal-bar mid"
                          tabIndex={0}
                          style={{ left: "20.31%", width: "20.31%" }}
                          data-tip="GenAI / LLM Engineer · Mid-level: $165K–$230K"
                          aria-label="GenAI / LLM Engineer · Mid-level: $165K–$230K"
                        />
                        <span className="sal-val" style={{ left: "40.62%" }}>
                          {"$165K–$230K"}
                        </span>
                      </div>
                      <div className="sal-bar-row">
                        <span
                          className="sal-bar sen open"
                          tabIndex={0}
                          style={{ left: "43.75%", width: "34.38%" }}
                          data-tip="GenAI / LLM Engineer · Senior: $240K–$350K+"
                          aria-label="GenAI / LLM Engineer · Senior: $240K–$350K+"
                        />
                        <span className="sal-val" style={{ left: "78.12%" }}>
                          {"$240K–$350K+"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="sal-row">
                    <div className="sal-role">
                      <b>{"AI Solutions Engineer"}</b>
                      <span className="sal-note">{"48% of roles are hybrid or remote"}</span>
                    </div>
                    <div className="sal-track">
                      <div className="sal-bar-row">
                        <span
                          className="sal-bar mid"
                          tabIndex={0}
                          style={{ left: "14.06%", width: "17.19%" }}
                          data-tip="AI Solutions Engineer · Mid-level: $145K–$200K"
                          aria-label="AI Solutions Engineer · Mid-level: $145K–$200K"
                        />
                        <span className="sal-val" style={{ left: "31.25%" }}>
                          {"$145K–$200K"}
                        </span>
                      </div>
                      <div className="sal-bar-row">
                        <span
                          className="sal-bar sen open"
                          tabIndex={0}
                          style={{ left: "34.38%", width: "21.88%" }}
                          data-tip="AI Solutions Engineer · Senior: $210K–$280K+"
                          aria-label="AI Solutions Engineer · Senior: $210K–$280K+"
                        />
                        <span className="sal-val" style={{ left: "56.25%" }}>
                          {"$210K–$280K+"}
                        </span>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="sal-axis" aria-hidden="true">
                    <div />
                    <div className="sal-ticks">
                      <span style={{ left: "0.00%" }}>{"$100K"}</span>
                      <span style={{ left: "15.62%" }}>{"$150K"}</span>
                      <span style={{ left: "31.25%" }}>{"$200K"}</span>
                      <span style={{ left: "46.88%" }}>{"$250K"}</span>
                      <span style={{ left: "62.50%" }}>{"$300K"}</span>
                      <span style={{ left: "78.12%" }}>{"$350K"}</span>
                      <span style={{ left: "93.75%" }}>{"$400K"}</span>
                    </div>
                  </div>{" "}
                </div>{" "}
                <details className="sal-table">
                  <summary>{"View as table"}</summary>
                  <div className="salary-wrap">
                    <table>
                      {" "}
                      <thead>
                        <tr>
                          <th scope="col">{"Role"}</th>
                          <th scope="col">{"Mid-level"}</th>
                          <th scope="col">{"Senior"}</th>
                          <th scope="col">{"Note"}</th>
                        </tr>
                      </thead>{" "}
                      <tbody>
                        <tr>
                          <th scope="row">{"AI / ML Engineer"}</th>
                          <td>{"$170K–$260K"}</td>
                          <td>{"$220K–$350K+"}</td>
                          <td>{"Median: $176K · 14% QoQ growth in postings"}</td>
                        </tr>
                        <tr>
                          <th scope="row">{"GenAI / LLM Engineer"}</th>
                          <td>{"$165K–$230K"}</td>
                          <td>{"$240K–$350K+"}</td>
                          <td>{"Leads all AI roles in comp growth"}</td>
                        </tr>
                        <tr>
                          <th scope="row">{"AI Solutions Engineer"}</th>
                          <td>{"$145K–$200K"}</td>
                          <td>{"$210K–$280K+"}</td>
                          <td>{"48% of roles are hybrid or remote"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </details>{" "}
                <p className="salary-src">
                  {
                    "Real offer data from 43,000+ US job postings analyzed in 2026. AI/ML engineering is the highest-compensated engineering track without requiring a PhD. Ranges are market data, not a promise of outcomes. Sources: "
                  }
                  <a href="https://axialsearch.com/insights/ai-ml-engineering-jobs/" target="_blank">
                    {"Axial Search (2026)"}
                  </a>
                  {" · "}
                  <a href="https://www.kore1.com/ai-engineer-salary-guide/" target="_blank">
                    {"Kore1 Salary Guide"}
                  </a>
                  {" · Levels.fyi · LinkedIn Talent Insights"}
                </p>{" "}
              </figure>{" "}
            </div>{" "}
          </div>{" "}
        </section>
        <section className="section bg-tint" id="pricing" aria-labelledby="priceTitle">
          {" "}
          <div className="wrap">
            {" "}
            <div className="head center reveal">
              {" "}
              <p className="eyebrow">{"Pricing"}</p> <h2 id="priceTitle">{"Founding Cohort — Limited to 15 Seats"}</h2>{" "}
              <p>
                {
                  "Price reflects what the program is worth — 8 phases, 24 weeks, production-grade projects, and direct access to an engineer who has shipped ML in healthcare, biotech, and government. Prices rise with each cohort."
                }
              </p>{" "}
            </div>{" "}
            <div className="founding reveal">
              {" "}
              <div>
                {" "}
                <h3>{"Founding Cohort — Cohort #1"}</h3>{" "}
                <p>
                  {
                    "Limited to 15 students. You shape the curriculum, get the most direct access, and pay the lowest price this program will ever be. Goal: finish curriculum, collect testimonials, measure completions, and build real outcome data."
                  }
                </p>{" "}
                <ul className="founding-perks">
                  <li>{"Founding price locked in forever — never increases as you progress"}</li>
                  <li>
                    {
                      "Direct access to your instructor in the private Telegram community (6yr US production ML experience)"
                    }
                  </li>
                  <li>{"2 live sessions/week + weekly office hours — not pre-recorded and forgotten"}</li>
                  <li>{"You help shape the curriculum — founding students' feedback sets the roadmap"}</li>
                  <li>{"No one gets hired for a certificate — your project portfolio gets you hired"}</li>
                </ul>{" "}
              </div>{" "}
              <LaunchCountdown />{" "}
            </div>{" "}
            <PricingGrid /> <RefundPolicy /> <PricingRoadmap />{" "}
          </div>{" "}
        </section>
        <section className="section bg-white" id="faq" aria-labelledby="faqTitle">
          {" "}
          <div className="wrap faq-wrap">
            {" "}
            <div className="head center reveal">
              <p className="eyebrow">{"FAQ"}</p>
              <h2 id="faqTitle">{"Questions before you enroll"}</h2>
            </div>{" "}
            <div className="faq-list reveal">
              <details className="faq-item">
                <summary>{"How much time does this take each week?"}</summary>
                <p>
                  {
                    "Plan on 10–15 hours a week for 24 weeks — evenings and weekends work. The program is designed to fit alongside a full-time role."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"Do I need to know Python already?"}</summary>
                <p>
                  {
                    "No. Phase 1 teaches Python from the ground up. You do need some programming experience in any language — SQL counts."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"When does the program start?"}</summary>
                <p>{"The founding cohort launches November 14, 2026, and is limited to 15 students."}</p>
              </details>
              <details className="faq-item">
                <summary>{"How do the live sessions work?"}</summary>
                <p>
                  {
                    "Every week there are two live sessions — a 2-hour engineering session and a 90-minute project session, both recorded — plus optional 90-minute office hours with Bassa."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"What if I miss a live session?"}</summary>
                <p>
                  {
                    "Both weekly live sessions are recorded, so you can catch up on your own schedule. Office hours are optional."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"What will I have built by the end?"}</summary>
                <p>
                  {
                    "Six portfolio projects — five guided projects plus a capstone in your own domain — and a mini project or applied lab in every phase, all on GitHub."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"Which plan should I choose?"}</summary>
                <p>
                  {
                    "Self-Paced includes all recorded content, project repos, weekly office hours, project code reviews, 3 mock interviews and resume, LinkedIn and GitHub profile work. Founding Cohort adds two live sessions a week and 5 mock interviews. Mentorship adds six private 1:1 sessions, a dedicated portfolio review, and job search strategy. 1:1 mentoring is only in Mentorship."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"Is there a student community?"}</summary>
                <p>
                  {
                    "Yes. Every plan includes a private Telegram community for questions, resources and announcements. Mentorship students get priority responses there."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"Do you help with interviews and my profile?"}</summary>
                <p>
                  {
                    "Yes. Self-Paced includes 3 mock interviews and Founding Cohort includes 5, and both include help creating and enhancing your resume, LinkedIn and GitHub profiles."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"What is the refund policy?"}</summary>
                <p>
                  {
                    "Attend the orientation session, then you have 7 days to decide. If the program isn't the right fit, email Bassa for a full refund, no questions asked. After 7 days, all sales are final."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"Do I get a certificate?"}</summary>
                <p>
                  {
                    "No — on purpose. No one gets hired for a certificate; a portfolio of real projects gets you hired. You finish with six production projects on GitHub that hiring managers can open and review."
                  }
                </p>
              </details>
              <details className="faq-item">
                <summary>{"Is there a job guarantee?"}</summary>
                <p>
                  {
                    "No. The program gives you production skills and a portfolio that proves them — you do the work. There are no placement guarantees."
                  }
                </p>
              </details>
            </div>{" "}
          </div>{" "}
        </section>
        <section className="section bg-dark final" aria-labelledby="finalTitle">
          {" "}
          <div className="wrap">
            {" "}
            <p className="eyebrow">{"Founding cohort · launches November 14, 2026"}</p>{" "}
            <h2 id="finalTitle">
              {"The future of AI is exciting. "}
              <span className="grad-text">{"Be part of building it."}</span>
            </h2>{" "}
            <p>
              {
                "24 weeks, 8 phases and 6 production projects — taught live by a working US AI/ML engineer. 15 founding seats, with a 7-day refund window after orientation."
              }
            </p>{" "}
            <div className="hero-ctas">
              {" "}
              <Link className="btn btn-primary" href="/subscribe?plan=COHORT">
                {"Join the founding cohort — $1,299 "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>{" "}
              <a className="btn btn-ghost-d" href="#roadmap">
                {"Explore the program"}
              </a>{" "}
            </div>{" "}
            <p className="final-meta">
              {"Prefer to learn on your own schedule? "}
              <a href="#pricing" style={{ color: "#9DBBFF" }}>
                {"Compare all plans"}
              </a>
            </p>{" "}
          </div>{" "}
        </section>
      </main>
      <footer className="footer">
        {" "}
        <div className="wrap">
          {" "}
          <div className="footer-grid">
            {" "}
            <div>
              <a className="brand" href="#top">
                <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
                  <defs>
                    <linearGradient id="bmf" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#497BFF" />
                      <stop offset="1" stopColor="#9461FF" />
                    </linearGradient>
                  </defs>
                  <rect width="32" height="32" rx="9" fill="url(#bmf)" />
                  <path
                    d="M9 22l7-12 7 12M12 17.5h8"
                    stroke="#fff"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="23.5" cy="9.5" r="2.6" fill="#25E6D3" />
                </svg>
                {"AI "}
                <span>{"with"}</span>
                {" Bassa"}
              </a>{" "}
              <p className="footer-tag">
                {"A 24-week AI & machine learning engineering program for working professionals in the US."}
              </p>
            </div>{" "}
            <nav aria-label="Footer">
              <ul className="footer-links">
                <li>
                  <a href="#roadmap">{"Program"}</a>
                </li>
                <li>
                  <a href="#projects">{"Projects"}</a>
                </li>
                <li>
                  <a href="#outline">{"Lesson breakdown"}</a>
                </li>
                <li>
                  <a href="#instructor">{"Instructor"}</a>
                </li>
                <li>
                  <a href="#pricing">{"Pricing"}</a>
                </li>
                <li>
                  <a href="#faq">{"FAQ"}</a>
                </li>
              </ul>
            </nav>{" "}
            <div className="footer-contact">
              <span className="label">{"Contact"}</span>
              <a href="mailto:basazinb12@gmail.com">{"basazinb12@gmail.com"}</a>
              <a href="tel:+12064755393">{"(206) 475-5393"}</a>
            </div>{" "}
          </div>{" "}
          <p className="footer-bottom">
            {"© 2026 Basazin Belhu · AI & ML Engineer Accelerator · Built by a practitioner, for practitioners."}
          </p>{" "}
        </div>{" "}
      </footer>
      <MobileEnrollBar />
    </>
  );
}
