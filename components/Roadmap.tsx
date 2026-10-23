"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const TABS = [
  {
    code: "P1",
    name: "Foundations",
    weeks: "Wk 1–2",
  },
  {
    code: "P1b",
    name: "Math & Stats",
    weeks: "Wk 3",
  },
  {
    code: "P2",
    name: "Applied ML",
    weeks: "Wk 4–8",
  },
  {
    code: "P3",
    name: "Prod ML Eng",
    weeks: "Wk 9–11",
  },
  {
    code: "P4",
    name: "Cloud MLOps",
    weeks: "Wk 12–15",
  },
  {
    code: "P5",
    name: "GenAI + RAG",
    weeks: "Wk 16–19",
  },
  {
    code: "P6",
    name: "Agentic AI",
    weeks: "Wk 20–22",
  },
  {
    code: "P7",
    name: "Capstone",
    weeks: "Wk 23–24",
  },
];

/* Phase content, one fragment per tab. Week ranges follow the 24-week schedule. */
const PANELS = [
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 1 · 2 Weeks"}</div> <h3>{"Python for ML & AI"}</h3>{" "}
      <p className="phase-desc">
        {
          "Starts from the ground up — no assumed Python knowledge. Week 1 builds the core language from data types through functions and file handling. Week 2 moves into the data science stack: NumPy, Pandas, Matplotlib, and a first look at Scikit-learn. By the end you write code that belongs in a real repository, not just a notebook."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Mini Project"}</strong>
        {
          " EDA Pipeline — clean, transform, and visualize raw data with a structured ML project layout, automated data quality checks, and full Git history. "
        }
      </div>{" "}
    </div>{" "}
    <div className="phase-modules">
      {" "}
      <div className="topics-covered-label">{"Topics covered"}</div>{" "}
      <div className="topics-covered-grid">
        {" "}
        <div className="topics-covered-card">
          {" "}
          <div className="topics-covered-card-title">{"Python Foundation — Week 1"}</div>{" "}
          <ul className="topics-covered-list">
            {" "}
            <li>{"Data types, variables, and operators"}</li> <li>{"Lists, dicts, indexing, and slicing"}</li>{" "}
            <li>{"If/else, for loops, and control flow"}</li> <li>{"Functions, scope, and reusability"}</li>{" "}
            <li>{"List/dict comprehensions"}</li> <li>{"File handling and exception handling"}</li>{" "}
          </ul>{" "}
        </div>{" "}
        <div className="topics-covered-card">
          {" "}
          <div className="topics-covered-card-title">{"Data Science Stack — Week 2"}</div>{" "}
          <ul className="topics-covered-list">
            {" "}
            <li>{"NumPy: arrays, broadcasting, vectorized operations"}</li>{" "}
            <li>{"Pandas: DataFrames, groupby, joins, reshaping"}</li>{" "}
            <li>{"Matplotlib: figures, subplots, custom styling"}</li>{" "}
            <li>{"Scikit-learn: first look at the ML API and pipelines"}</li>{" "}
          </ul>{" "}
        </div>{" "}
        <div className="topics-covered-card">
          {" "}
          <div className="topics-covered-card-title">{"Data Analysis & Visualization"}</div>{" "}
          <ul className="topics-covered-list">
            {" "}
            <li>{"Distributions, correlations, and outlier detection"}</li> <li>{"Matplotlib, Seaborn, Plotly"}</li>{" "}
            <li>{"Feature engineering basics"}</li> <li>{"Data cleaning pipelines"}</li>{" "}
          </ul>{" "}
        </div>{" "}
      </div>{" "}
      <div className="phase-tools">
        {" "}
        <div className="phase-tools-label">{"Tools you'll master"}</div>{" "}
        <div className="phase-tools-chips">
          {" "}
          <span className="tool-chip">{"Python 3.11+"}</span> <span className="tool-chip">{"NumPy"}</span>{" "}
          <span className="tool-chip">{"Pandas"}</span> <span className="tool-chip">{"Matplotlib"}</span>{" "}
          <span className="tool-chip">{"Scikit-learn"}</span> <span className="tool-chip">{"Jupyter"}</span>{" "}
          <span className="tool-chip">{"VS Code"}</span> <span className="tool-chip">{"Git"}</span>{" "}
          <span className="tool-chip">{"GitHub"}</span> <span className="tool-chip">{"venv / pip"}</span>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 1b · 1 Week"}</div> <h3>{"Math & Statistics for ML"}</h3>{" "}
      <p className="phase-desc">
        {
          "Not a math textbook — applied statistics in the context of real ML problems. Probability for understanding model uncertainty. Hypothesis testing for comparing model versions. Linear algebra for understanding what optimizers and embeddings are actually doing."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Applied Lab"}</strong>
        {
          " A/B Test a Model — compare two classifiers using statistical significance testing, confidence intervals, and effect size. Make a defensible go/no-go recommendation the way you would in production. "
        }
      </div>{" "}
    </div>{" "}
    <ul className="topic-list">
      {" "}
      <li className="topic-item">
        {"Probability fundamentals — Bayes' theorem, conditional probability, distributions"}
      </li>{" "}
      <li className="topic-item">{"Normal, Bernoulli, Poisson, binomial — when each distribution applies"}</li>{" "}
      <li className="topic-item">{"Central Limit Theorem and sampling — the foundation of model evaluation"}</li>{" "}
      <li className="topic-item">{"Hypothesis testing: t-test, chi-square, ANOVA — applied to model comparison"}</li>{" "}
      <li className="topic-item">{"Confidence intervals and p-values — what they actually mean in practice"}</li>{" "}
      <li className="topic-item">{"A/B testing design and analysis — for comparing model versions in production"}</li>{" "}
      <li className="topic-item">{"Correlation vs causation — the most common mistake in data science"}</li>{" "}
      <li className="topic-item">{"Vectors, matrices, dot products — intuition for embeddings and linear models"}</li>{" "}
      <li className="topic-item">{"Gradient descent variants — why Adam beats SGD for most problems"}</li>{" "}
    </ul>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 2 · 5 Weeks"}</div> <h3>{"Applied Machine Learning"}</h3>{" "}
      <p className="phase-desc">
        {
          "Full ML Specialization — from classical algorithms to deep learning. Interview-ready theory plus production-grade implementation. You'll understand "
        }
        <em>{"why"}</em>
        {
          " algorithms work, not just how to call them, so you can defend every decision in a technical interview or design review."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Capstone Project"}</strong>
        {
          " End-to-end ML system: Churn prediction (XGBoost + SHAP) → fraud anomaly detection (Isolation Forest + PCA) → NLP sentiment classifier (LSTM + embeddings) — all with evaluation reports and stakeholder-ready dashboards. "
        }
      </div>{" "}
    </div>{" "}
    <div className="phase-modules">
      {" "}
      <details className="phase-module" open>
        {" "}
        <summary className="phase-module-label">{"Module 2A — Fundamentals of Classical ML"}</summary>{" "}
        <ul className="topic-list">
          {" "}
          <li className="topic-item">
            {"Introduction to Classical Machine Learning — the ML landscape and problem framing"}
          </li>{" "}
          <li className="topic-item">{"Linear Regression — OLS, polynomial features, bias-variance tradeoff"}</li>{" "}
          <li className="topic-item">{"Regularization — Ridge (L2), Lasso (L1), ElasticNet — when and why"}</li>{" "}
          <li className="topic-item">
            {"Cross-Validation — k-fold, stratified, leave-one-out — preventing data leakage"}
          </li>{" "}
          <li className="topic-item">{"Logistic Regression — Perceptron, Softmax for multi-class classification"}</li>{" "}
          <li className="topic-item">{"Introduction to Clustering — K-Means, K-Means++, Hierarchical clustering"}</li>{" "}
          <li className="topic-item">{"Model selection and evaluation — train/val/test split, learning curves"}</li>{" "}
        </ul>{" "}
      </details>{" "}
      <details className="phase-module">
        {" "}
        <summary className="phase-module-label">{"Module 2B — Supervised Learning (Interview Focus)"}</summary>{" "}
        <ul className="topic-list">
          {" "}
          <li className="topic-item">
            {"MLE & MAP estimation — probabilistic foundations every ML interview tests"}
          </li>{" "}
          <li className="topic-item">{"Confidence intervals — interpreting model uncertainty in production"}</li>{" "}
          <li className="topic-item">
            {"Classification metrics — precision, recall, F1, ROC-AUC, PR-AUC, calibration"}
          </li>{" "}
          <li className="topic-item">{"Imbalanced data — SMOTE, class weights, threshold optimization"}</li>{" "}
          <li className="topic-item">{"Decision Trees — splitting criteria, pruning, depth tuning"}</li>{" "}
          <li className="topic-item">
            {"Ensemble methods — Bagging, Random Forest, Gradient Boosting, XGBoost, LightGBM"}
          </li>{" "}
          <li className="topic-item">{"Naive Bayes — Gaussian, Multinomial — fast baselines for text and tabular"}</li>{" "}
          <li className="topic-item">{"Support Vector Machines — kernels, margin, when SVMs beat trees"}</li>{" "}
          <li className="topic-item">
            {"SHAP and LIME explainability — required in healthcare, finance, and government"}
          </li>{" "}
          <li className="topic-item">{"Hyperparameter tuning — GridSearch, RandomSearch, Optuna (Bayesian)"}</li>{" "}
        </ul>{" "}
      </details>{" "}
      <details className="phase-module">
        {" "}
        <summary className="phase-module-label">{"Module 2C — Unsupervised, Recommenders & Time Series"}</summary>{" "}
        <ul className="topic-list">
          {" "}
          <li className="topic-item">
            {"Clustering deep dive — K-Means++, Hierarchical, DBSCAN, Gaussian Mixture Models"}
          </li>{" "}
          <li className="topic-item">
            {"Anomaly / Outlier / Novelty Detection — Isolation Forest, LOF, One-Class SVM"}
          </li>{" "}
          <li className="topic-item">
            {"Dimensionality reduction — PCA (linear) and t-SNE (non-linear) with intuition"}
          </li>{" "}
          <li className="topic-item">
            {"Recommender Systems — collaborative filtering, matrix factorization, hybrid models"}
          </li>{" "}
          <li className="topic-item">
            {"Time Series Analysis — stationarity, ACF/PACF, ARIMA, seasonal decomposition"}
          </li>{" "}
          <li className="topic-item">
            {"Feature engineering for time series — lag features, rolling stats, trend extraction"}
          </li>{" "}
        </ul>{" "}
      </details>{" "}
      <details className="phase-module">
        {" "}
        <summary className="phase-module-label">{"Module 2D — Deep Learning Specialization"}</summary>{" "}
        <ul className="topic-list">
          {" "}
          <li className="topic-item">
            <strong>{"Neural Networks"}</strong>
            {" — Perceptron, hidden layers, forward & backward propagation, MLP"}
          </li>{" "}
          <li className="topic-item">{"TensorFlow & Keras — model building, callbacks, TensorBoard visualization"}</li>{" "}
          <li className="topic-item">{"Optimization — SGD, Adam, learning rate schedules, hyperparameter tuning"}</li>{" "}
          <li className="topic-item">
            <strong>{"Computer Vision"}</strong>
            {" — CNNs, data augmentation, transfer learning, CNN visualization"}
          </li>{" "}
          <li className="topic-item">
            {"Popular CNN architectures — AlexNet, VGG, ResNet, Inception, EfficientNet, MobileNet"}
          </li>{" "}
          <li className="topic-item">{"Object segmentation, localization & detection — YOLO, Faster R-CNN, U-Net"}</li>{" "}
          <li className="topic-item">
            <strong>{"Natural Language Processing"}</strong>
            {" — text processing, tokenization, stemming, lemmatization"}
          </li>{" "}
          <li className="topic-item">{"Vector space models — cosine similarity, Euclidean distance, TF-IDF"}</li>{" "}
          <li className="topic-item">{"POS tagging, dependency parsing, topic modeling, language modeling"}</li>{" "}
          <li className="topic-item">{"Word embeddings — Word2Vec, GloVe, FastText"}</li>{" "}
          <li className="topic-item">{"Recurrent Neural Networks — RNN, LSTM, GRU — sequence modeling"}</li>{" "}
          <li className="topic-item">{"Information extraction, Named Entity Recognition (NER)"}</li>{" "}
        </ul>{" "}
      </details>{" "}
      <div className="phase-tools">
        {" "}
        <div className="phase-tools-label">{"Tools you'll master"}</div>{" "}
        <div className="phase-tools-chips">
          {" "}
          <span className="tool-chip">{"Scikit-learn"}</span> <span className="tool-chip">{"XGBoost"}</span>{" "}
          <span className="tool-chip">{"LightGBM"}</span> <span className="tool-chip">{"TensorFlow"}</span>{" "}
          <span className="tool-chip">{"Keras"}</span> <span className="tool-chip">{"PyTorch"}</span>{" "}
          <span className="tool-chip">{"SHAP"}</span> <span className="tool-chip">{"LIME"}</span>{" "}
          <span className="tool-chip">{"Optuna"}</span> <span className="tool-chip">{"OpenCV"}</span>{" "}
          <span className="tool-chip">{"NLTK"}</span> <span className="tool-chip">{"spaCy"}</span>{" "}
          <span className="tool-chip">{"Hugging Face"}</span> <span className="tool-chip">{"TensorBoard"}</span>{" "}
          <span className="tool-chip">{"Google Colab"}</span>{" "}
        </div>{" "}
      </div>{" "}
    </div>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 3 · 3 Weeks"}</div> <h3>{"Production ML Engineering"}</h3>{" "}
      <p className="phase-desc">
        {
          "Take the Phase 2 model and turn it into software. Professional project structure, experiment tracking, REST API serving, and containerization. By the end, every student has a live POST /predict endpoint running in Docker."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Mini Project 2"}</strong>
        {
          " Risk Prediction API — MLflow experiment tracking → FastAPI endpoint → Docker container, with typed Pydantic request/response schemas. "
        }
      </div>{" "}
    </div>{" "}
    <ul className="topic-list">
      {" "}
      <li className="topic-item">{"Professional ML project structure (src/, tests/, configs/, pipelines/)"}</li>{" "}
      <li className="topic-item">{"MLflow: experiments, runs, parameters, metrics, model registry"}</li>{" "}
      <li className="topic-item">{"FastAPI: endpoints, Pydantic schemas, batch vs real-time inference"}</li>{" "}
      <li className="topic-item">{"Docker: Dockerfile, Compose, environment variables, secrets"}</li>{" "}
      <li className="topic-item">{"Building and testing POST /predict endpoints"}</li>{" "}
      <li className="topic-item">{"Container registry and image versioning"}</li>{" "}
    </ul>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 4 · 4 Weeks"}</div> <h3>{"Full Cloud MLOps"}</h3>{" "}
      <p className="phase-desc">
        {
          "This is the signature section — the phase most courses skip or compress. AWS deployment, CI/CD pipelines, orchestration, monitoring, drift detection, and automated retraining. The full operational loop, not just a one-time deploy."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Mini Project 3"}</strong>
        {
          " MLOps Pipeline — GitHub Actions CI/CD → ECR → ECS Fargate → CloudWatch monitoring → Evidently drift alerts → automated retraining trigger. "
        }
      </div>{" "}
    </div>{" "}
    <ul className="topic-list">
      {" "}
      <li className="topic-item">{"AWS: S3, ECR, ECS/Fargate, IAM, CloudWatch"}</li>{" "}
      <li className="topic-item">{"CI/CD: GitHub Actions → tests → Docker build → ECR → ECS deploy"}</li>{" "}
      <li className="topic-item">{"Orchestration: Airflow or Prefect for ML pipelines"}</li>{" "}
      <li className="topic-item">{"Data quality monitoring, data drift and concept drift detection"}</li>{" "}
      <li className="topic-item">{"Evidently: prediction distribution, latency, business metrics"}</li>{" "}
      <li className="topic-item">{"Champion/challenger retraining workflow with approval step"}</li>{" "}
      <li className="topic-item">{"DVC for data and model versioning"}</li>{" "}
      <li className="topic-item">{"Feature stores and model registries in production"}</li>{" "}
    </ul>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 5 · 4 Weeks"}</div> <h3>{"GenAI Engineering + RAG + Fine-Tuning"}</h3>{" "}
      <p className="phase-desc">
        {
          "LLMs from an engineer's perspective — APIs, structured output, embeddings, hybrid RAG, and a full fine-tuning module that most programs skip. You'll go from LoRA/QLoRA basics all the way to serving a fine-tuned model in production with quantization and evaluation."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Mini Project 4"}</strong>
        {
          " Production RAG System — documents → embeddings → pgvector HNSW → BM25 lexical search → RRF fusion → cross-encoder reranking → RAGAS evaluation with Precision@5/Recall@10. "
        }
      </div>{" "}
    </div>{" "}
    <ul className="topic-list">
      <li className="topic-item">
        {
          "Transformer architecture: tokenization, embeddings, self-attention and encoder/decoder models — how LLMs work under the hood"
        }
      </li>{" "}
      <li className="topic-item">{"LLM APIs (OpenAI, Anthropic), prompt engineering, function calling"}</li>{" "}
      <li className="topic-item">{"Structured output with JSON Schema enforcement and confidence scoring"}</li>{" "}
      <li className="topic-item">{"Embeddings: SBERT, OpenAI text-embedding, semantic similarity"}</li>{" "}
      <li className="topic-item">{"Vector DBs: pgvector (HNSW tuning, JSONB schema) vs Pinecone vs ChromaDB"}</li>{" "}
      <li className="topic-item">{"RAG pipeline: chunking strategies, retrieval, grounded generation"}</li>{" "}
      <li className="topic-item">{"Hybrid retrieval: BM25 + dense vector + Reciprocal Rank Fusion"}</li>{" "}
      <li className="topic-item">{"Cross-encoder reranking — beyond cosine similarity"}</li>{" "}
      <li className="topic-item">{"RAG evaluation with RAGAS: Precision@K, Recall@K, faithfulness"}</li>{" "}
      <li className="topic-item">{"Advanced RAG: HyDE, multi-query, self-RAG patterns"}</li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ Fine-Tuning: dataset prep, instruction tuning, chat-template formatting"}
      </li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ LoRA, QLoRA, PEFT — parameter-efficient fine-tuning at scale"}
      </li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ Multi-GPU training, gradient checkpointing, Flash Attention"}
      </li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ Quantization (GPTQ, AWQ, GGUF), model merging (TIES/DARE)"}
      </li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ Serving fine-tuned models: vLLM, TGI, Ollama"}
      </li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ Evaluating fine-tuned models: MMLU, HellaSwag, DeepEval, PromptFoo"}
      </li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ Domain-specific fine-tuning: medical, legal, code generation use cases"}
      </li>{" "}
    </ul>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 6 · 3 Weeks"}</div> <h3>{"Agentic AI + LLMOps + AI Safety & Evals"}</h3>{" "}
      <p className="phase-desc">
        {
          "Build agents with state, memory, tool use, and multi-agent orchestration — then monitor and operate them in production. Closes with a full week on AI Safety & Evals and NLP pipelines that most programs either skip or reduce to a single slide."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Mini Project 5"}</strong>
        {
          " Multi-Agent Support System — LangGraph state machine + RAG tool + API tool + human-in-the-loop via interrupt() + SQLite checkpointer + LangSmith tracing. "
        }
      </div>{" "}
    </div>{" "}
    <ul className="topic-list">
      {" "}
      <li className="topic-item">{"LangGraph: state machines, routing, conditional edges"}</li>{" "}
      <li className="topic-item">{"ReAct pattern, planning, tool/function calling"}</li>{" "}
      <li className="topic-item">{"Short-term and long-term memory, state persistence"}</li>{" "}
      <li className="topic-item">{"Human-in-the-loop with interrupt() and SQLite checkpointer"}</li>{" "}
      <li className="topic-item">{"Multi-agent orchestration (CrewAI patterns, LangGraph supervisor)"}</li>{" "}
      <li className="topic-item">{"Model Context Protocol (MCP) — building tool servers"}</li>{" "}
      <li className="topic-item">{"LLMOps: tracing with LangSmith, prompt versioning, cost tracking"}</li>{" "}
      <li className="topic-item">{"Hallucination handling, guardrails, failure modes"}</li>{" "}
      <li className="topic-item">{"Latency optimization, caching strategies, reliability patterns"}</li>{" "}
      <li className="topic-item" style={{ color: "var(--accent)", fontWeight: "500" }}>
        {"★ AI Safety & Evals: evaluation frameworks, red-teaming, jailbreak testing"}
      </li>{" "}
    </ul>{" "}
  </>,
  <>
    {" "}
    <div className="phase-meta">
      {" "}
      <div className="phase-badge">{"Phase 7 · 2 Weeks"}</div> <h3>{"Capstone + System Design + Career"}</h3>{" "}
      <p className="phase-desc">
        {
          "Ship a complete production AI platform — your centerpiece portfolio project. Plus ML system design practice with real interview prompts, and career preparation focused on the US AI/ML engineering market."
        }
      </p>{" "}
      <div className="phase-project">
        {" "}
        <strong>{"Capstone Project"}</strong>
        {
          " Full Production AI Platform — data ingestion → validation → feature engineering → MLflow registry → FastAPI → Docker → AWS Fargate → monitoring → drift detection → retraining loop. Your own domain, your own data. "
        }
      </div>{" "}
    </div>{" "}
    <ul className="topic-list">
      {" "}
      <li className="topic-item">
        {"ML system design framework: data → features → training → serving → monitoring"}
      </li>{" "}
      <li className="topic-item">{"Design prompts: fraud detection at 10M tx/day, early warning system"}</li>{" "}
      <li className="topic-item">{"RAG and agent systems at scale — latency and cost trade-offs"}</li>{" "}
      <li className="topic-item">{"Batch vs streaming, model selection, scaling decisions"}</li>{" "}
      <li className="topic-item">{"Resume, GitHub profile, and LinkedIn optimization for AI/ML roles"}</li>{" "}
      <li className="topic-item">{"Mock interviews: technical + ML system design + behavioral"}</li>{" "}
      <li className="topic-item">{"Salary negotiation and US market positioning"}</li>{" "}
    </ul>{" "}
  </>,
];

export function Roadmap() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number, focus = false) {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = TABS.length;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next !== null) {
      e.preventDefault();
      select(next, true);
    }
  }

  return (
    <>
      <div className="roadmap-track reveal" role="tablist" aria-label="Curriculum phases" onKeyDown={onKeyDown}>
        <span
          className="roadmap-progress"
          aria-hidden="true"
          style={{ width: `${(active / (TABS.length - 1)) * 92}%` }}
        />
        {TABS.map((t, i) => (
          <button
            key={t.code}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            className={`phase-tab${i === active ? " active" : ""}${i < active ? " done" : ""}`}
            type="button"
            role="tab"
            id={`phaseTab${i}`}
            aria-controls={`phasePanel${i}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
          >
            <span className="phase-dot">{t.code}</span>
            <span className="pt-name">{t.name}</span>
            <span className="pt-dur">{t.weeks}</span>
          </button>
        ))}
      </div>
      {PANELS.map((panel, i) => (
        <div
          key={i}
          className={`phase-panel${i === active ? " active" : ""}`}
          id={`phasePanel${i}`}
          role="tabpanel"
          aria-labelledby={`phaseTab${i}`}
          tabIndex={0}
          hidden={i !== active}
        >
          {panel}
        </div>
      ))}
    </>
  );
}
