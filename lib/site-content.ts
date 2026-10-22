export const MARKET_STATS = [
  "40% of all tech job postings now require AI/ML skills (LinkedIn, 2024)",
  "$165K+ median total comp for ML Engineers in the US (Levels.fyi, 2024)",
  "3× faster job growth than the available qualified talent supply",
] as const;

export const PROGRAM_PILLARS = [
  {
    title: "Machine Learning Foundations",
    body: "Strong fundamentals in statistics, classical ML, and model development — the backbone of every modern AI system.",
  },
  {
    title: "Generative AI & LLM Engineering",
    body: "Build applications using LLMs, RAG systems, and AI agents that power modern AI products at scale.",
  },
  {
    title: "Production AI & MLOps",
    body: "Deploy, monitor, and scale ML and AI systems using the same industry tools running in enterprise production today.",
  },
  {
    title: "Real-World AI Project Portfolio",
    body: "Build industry-style projects and a deployable AI product that demonstrates practical expertise to employers.",
  },
] as const;

export const WHO_FOR_YES = [
  "You're a software engineer who wants to move into AI/ML roles",
  "You're a data analyst or data scientist ready to engineer, not just analyze",
  "You're a BI developer or SQL developer with strong query skills — Python will be taught from the ground up",
  "You have programming experience in any language (SQL, Java, C#, R) and want to add ML and AI to your stack",
  "You're already writing Python and want to add ML, MLOps, and GenAI to your stack",
  "You're mid-level and targeting $150K–$260K AI engineering roles",
  "You want to build and deploy real systems — not just pass coding interviews",
  "You can commit 10–15 hrs/week for 24 weeks (evenings and weekends work)",
] as const;

export const WHO_FOR_NO = [
  "You have zero programming experience — some coding background in any language (SQL counts) is required",
  "You want a passive video course you can binge in a weekend",
  "You're looking for job-placement guarantees — this gives you the skills, you do the work",
  "You want theory-only lectures without hands-on project output",
] as const;

export const PREREQUISITES = [
  "Python basics",
  "Some SQL",
  "Basic stats",
  "CS fundamentals",
] as const;

export const JOURNEY_STEPS = [
  { label: "Foundations", phase: "Phase 1" },
  { label: "Applied ML", phase: "Phase 2" },
  { label: "Prod ML Eng", phase: "Phase 3" },
  { label: "Cloud MLOps", phase: "Phase 4" },
  { label: "GenAI + RAG", phase: "Phase 5" },
  { label: "Agentic AI", phase: "Phase 6" },
  { label: "Capstone", phase: "Phase 7" },
] as const;

export const WHY_PROGRAM = [
  {
    title: "Built by a Practitioner",
    body: "Instructor deployed BERT at USCIS, built early warning systems at Pratt & Whitney, and ran 9B+ row data pipelines on Databricks. Every lesson reflects systems that ran in production.",
  },
  {
    title: "Full ML Lifecycle",
    body: "From EDA and feature engineering through Docker, CI/CD, AWS, monitoring, drift detection, and automated retraining — not just model training.",
  },
  {
    title: "GenAI With Rigor",
    body: "Hybrid RAG with RRF reranking, pgvector HNSW tuning, RAGAS evaluation, and LangGraph agents — built to production quality, not demo quality.",
  },
  {
    title: "US Job Market Lens",
    body: "System design interviews, resume review, and salary negotiation framed around US AI/ML engineering roles — not placement stats from another market.",
  },
  {
    title: "Explainability Built In",
    body: "SHAP and LIME aren't optional extras — they're in Phase 2, because production ML in healthcare and finance requires interpretable models.",
  },
  {
    title: "Evaluation as Infrastructure",
    body: "Every phase measures its output — Precision@K for RAG, F1 and PR-AUC for classifiers, latency/cost for agents. You'll know what your system actually does.",
  },
] as const;

export const CAREER_OUTCOMES = [
  {
    title: "AI / ML Engineer",
    body: "Build real-world AI applications using LLMs, RAG, and agents — and deploy them into production systems used by real users.",
  },
  {
    title: "Data Scientist",
    body: "Develop predictive models and derive insights using statistical and ML methods — with the engineering skills to ship your work, not just present it in a notebook.",
  },
  {
    title: "Generative AI / LLM Engineer",
    body: "Build intelligent agents, multi-agent workflows, and LLM-powered applications — with evaluation frameworks, guardrails, and LLMOps built in from day one.",
  },
  {
    title: "AI Solutions Engineer",
    body: "Design end-to-end AI solutions for real business problems — bridging the gap between model capabilities and production value delivery.",
  },
] as const;

export const LAYOFF_ROWS = [
  { role: "Software Engineers", rate: "35–45%" },
  { role: "Frontend Engineers", rate: "15–20%" },
  { role: "QA / Test Engineers", rate: "10–15%" },
  { role: "IT / SysAdmin", rate: "10–15%" },
  { role: "Data / ML Engineers", rate: "5–10%", highlight: true },
  { role: "DevOps / SRE", rate: "3–7%" },
  { role: "Security Engineers", rate: "2–5%" },
] as const;

export const PREDICTIONS = [
  {
    n: "01",
    title:
      "Every software engineer will need ML literacy to stay employable",
    body: "AI is eating the software stack. Engineers who can't read a training loop, tune a model, or evaluate an LLM output will be passed over — not fired, just not hired. The bar is moving from \"knows Python\" to \"knows how models work in production.\"",
    response:
      "Phase 1 + Phase 2 build ML intuition from first principles so you understand why models behave the way they do, not just how to call an API.",
  },
  {
    n: "02",
    title:
      "MLOps will become the most leveraged skill in AI engineering teams",
    body: "Organizations are drowning in experiments and failing at deployment. The engineers who can take a model from notebook to production — with monitoring, versioning, and CI/CD — will be the ones running the platform and setting the architecture.",
    response:
      "Phase 4 is an entire 4-week deep dive into full cloud MLOps: MLflow, Airflow, Kubernetes, Prometheus, and end-to-end ML pipeline automation.",
  },
  {
    n: "03",
    title:
      "RAG + Agents will replace most \"build a chatbot\" use cases by 2026 — and most engineers are unprepared",
    body: "Basic prompt wrappers are already commoditized. What companies actually need are engineers who can build reliable retrieval systems, evaluate hallucination, manage agent tool use, and wire everything together in a production LangChain or LlamaIndex stack.",
    response:
      "Phase 5 + Phase 6 cover production RAG architecture, LLM evaluation, LangGraph agents, LLMOps with Langfuse — the full agentic AI stack.",
  },
  {
    n: "04",
    title:
      "The \"AI Engineer\" title will overtake \"Data Scientist\" in job postings within 2 years",
    body: "The shift is already happening. Companies aren't just analyzing data — they're embedding AI into every product. The new default hire isn't a BI-focused data scientist; it's someone who can engineer end-to-end AI systems that ship.",
    response:
      "Every phase is structured around what an AI Engineer actually does at work: build, test, deploy, and maintain ML systems in the cloud — not just model training.",
  },
  {
    n: "05",
    title:
      "The engineers who get hired in 2026–2027 will be those with deployable portfolios, not certifications",
    body: "Hiring managers have seen thousands of AWS and Coursera certificates. What cuts through is a GitHub with a live MLOps pipeline, a real RAG system, and a capstone that shows end-to-end system design thinking. Proof beats credentials every time.",
    response:
      "You graduate with 5+ production-ready projects hosted on GitHub — a clinical ML pipeline, a live RAG app, a GenAI API, and a capstone with system design doc reviewers can open in the browser.",
  },
] as const;

export const SALARY_ROLES = [
  {
    title: "AI / ML Engineer",
    targeted: true,
    mid: "$170K–$260K",
    senior: "$220K–$350K+",
    note: "Median: $176K · 14% QoQ growth in postings · Fastest Growing",
  },
  {
    title: "GenAI / LLM Engineer",
    targeted: true,
    mid: "$165K–$230K",
    senior: "$240K–$350K+",
    note: "Leads all AI roles in comp growth",
  },
  {
    title: "AI Solutions Engineer",
    targeted: true,
    mid: "$145K–$200K",
    senior: "$210K–$280K+",
    note: "48% of roles are hybrid or remote",
  },
] as const;

export const SALARY_FACTS = [
  "43,480 Active US AI/ML job postings analyzed (2026)",
  "62% of postings require Python — the #1 mandatory skill",
  "55% require cloud platforms (AWS / GCP / Azure)",
  "51% require foundation model / LLM experience",
] as const;

export const HIRING_COMPANIES = [
  "Google DeepMind",
  "Microsoft Azure AI",
  "Amazon AWS",
  "Meta AI",
  "Palantir",
  "Anthropic",
  "Databricks",
  "Booz Allen Hamilton",
  "Leidos",
  "SAIC",
  "Capital One",
  "JPMorgan Chase",
] as const;

export const URGENCY_POINTS = [
  "Founding price locked in forever — never increases as you progress",
  "Direct Slack access to your instructor (6yr US production ML experience)",
  "2 live sessions/week + weekly office hours — not pre-recorded and forgotten",
  "You help shape the curriculum — founding students' feedback sets the roadmap",
  "Graduation certificate + LinkedIn verification for all 5 portfolio projects",
] as const;

export const PORTFOLIO_PROJECTS = [
  {
    tag: "PROJECT 01 · PHASE 2",
    title: "Customer Churn Prediction System",
    body: "End-to-end classification with SHAP explainability and stakeholder-ready output. Threshold optimization, PR-AUC, imbalanced class handling, and a visual explanation dashboard.",
    stack: ["XGBoost", "SHAP", "Optuna", "Streamlit"],
  },
  {
    tag: "PROJECT 02 · PHASE 3",
    title: "Risk Prediction API",
    body: "Take Phase 1's model and turn it into software: MLflow experiment tracking, typed FastAPI endpoints, Docker containerization, and a container registry-ready image.",
    stack: ["MLflow", "FastAPI", "Pydantic", "Docker"],
  },
  {
    tag: "PROJECT 03 · PHASE 4",
    title: "Full MLOps Pipeline on AWS",
    body: "GitHub Actions CI/CD to ECS Fargate, CloudWatch monitoring, Evidently drift alerts, and an automated retraining trigger. The operational loop, not just a deploy.",
    stack: ["AWS ECS", "GitHub Actions", "Evidently", "DVC"],
  },
  {
    tag: "PROJECT 04 · PHASE 5",
    title: "Production RAG System",
    body: "Hybrid retrieval over real documents — pgvector HNSW + BM25 + RRF fusion + cross-encoder reranking, evaluated with RAGAS on a gold-standard query set. Precision@5 and Recall@10 reported.",
    stack: ["pgvector", "SBERT", "BM25", "RAGAS"],
  },
  {
    tag: "PROJECT 05 · PHASE 6",
    title: "Multi-Agent Support System",
    body: "LangGraph state machine with RAG tool, API tool, human-in-the-loop checkpoint, and full LangSmith tracing. Deployed and monitored, with cost and latency metrics.",
    stack: ["LangGraph", "MCP", "LangSmith", "FastAPI"],
  },
  {
    tag: "CAPSTONE · PHASE 7",
    title: "Your Production AI Platform",
    body: "The centerpiece of your portfolio. A complete production AI system in your own domain — data to model to API to cloud to monitoring, all wired together and deployed live.",
    stack: ["Your Domain", "Full MLOps", "GenAI Layer", "AWS"],
  },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Live Session #1",
    body: "2 hours of live engineering. Bassa implements real systems, walks through architecture decisions, and reviews student code in real time.",
    meta: "Weekly · 2 hrs · Recorded",
  },
  {
    title: "Live Session #2",
    body: "Second live session each week focused on project work, debugging, and going deeper on the week's production topic. More hands-on, less lecture.",
    meta: "Weekly · 90 min · Recorded",
  },
  {
    title: "Office Hours",
    body: "90-minute weekly session. Bring your GitHub repo, your stuck point, or your ML system design question. Direct access to Bassa — no waiting on a forum.",
    meta: "Weekly · 90 min · Optional",
  },
] as const;

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

export const INSTRUCTOR_BULLETS = [
  "Production ML across aerospace, biotech, and federal sectors — models running in real systems",
  "NLP and deep learning systems deployed at enterprise scale — classification, extraction, and automation",
  "9B+ row data pipelines on Databricks + Spark; MLflow, AWS, Docker, FastAPI in production",
  "BS Bioengineering (Data Science), University of Washington",
  "Based in Alexandria, VA — US market, US hiring standards, US salary expectations",
] as const;

export const LAUNCH_DATE = "2026-11-14T00:00:00-05:00";
