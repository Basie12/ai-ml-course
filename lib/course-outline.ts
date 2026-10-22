export type OutlineLesson = {
  code: string;
  kind: "Video" | "Lab" | "Quiz" | "Live";
  title: string;
};

export type OutlineSection = {
  title: string;
  lessons: OutlineLesson[];
};

export type OutlinePhase = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  sections: OutlineSection[];
};

export const COURSE_OUTLINE: OutlinePhase[] = [
  {
    id: "p1",
    title: "Phase 1",
    subtitle: "Data Science Engineering Foundations",
    meta: "3 Weeks · 15 Lessons",
    sections: [
      {
        title: "Section 1 · Python Foundation — Core Language (Week 1)",
        lessons: [
          { code: "1.1", kind: "Video", title: "Data types, variables, and operators — int, float, str, bool" },
          { code: "1.2", kind: "Video", title: "Lists, dicts, tuples, sets — indexing, slicing, and mutability" },
          { code: "1.3", kind: "Video", title: "If/else, for loops, while loops, and control flow" },
          { code: "1.4", kind: "Video", title: "Functions — parameters, return values, scope, default args" },
          { code: "1.5", kind: "Video", title: "List and dict comprehensions — clean, Pythonic data transformation" },
          { code: "1.6", kind: "Video", title: "File handling and exception handling — reading files, try/except" },
          { code: "1.7", kind: "Lab", title: "Mini exercises: data cleaning functions, file parser, error-safe reader" },
        ],
      },
      {
        title: "Section 2 · Data Science Stack — NumPy → Pandas → Matplotlib → Scikit-learn (Week 2)",
        lessons: [
          { code: "2.1", kind: "Video", title: "NumPy — arrays, broadcasting, vectorized operations" },
          { code: "2.2", kind: "Video", title: "Pandas — DataFrames, groupby, joins, reshaping, method chaining" },
          { code: "2.3", kind: "Video", title: "Matplotlib — figures, subplots, custom styling for data storytelling" },
          { code: "2.4", kind: "Video", title: "Scikit-learn first look — the ML API, pipelines, and train/test split" },
          { code: "2.5", kind: "Lab", title: "EDA on real e-commerce dataset — outliers, distributions, visualizations" },
        ],
      },
      {
        title: "Section 3 · Data Analysis & Visualization",
        lessons: [
          { code: "3.1", kind: "Video", title: "Git/GitHub — branches, PRs, commits, and code review basics" },
          { code: "3.2", kind: "Video", title: "Professional ML project structure — src/, tests/, configs/" },
          { code: "3.3", kind: "Video", title: "Virtual environments, pip, and dependency management" },
          { code: "3.4", kind: "Lab", title: "Mini Project: EDA pipeline with full Git history" },
          { code: "3.5", kind: "Live", title: "Saturday Session: Code review + Q&A" },
        ],
      },
    ],
  },
  {
    id: "p2",
    title: "Phase 2",
    subtitle: "Applied Machine Learning",
    meta: "4 Weeks · 18 Lessons",
    sections: [
      {
        title: "Section 4 · Supervised Learning (Week 4–5)",
        lessons: [
          { code: "4.1", kind: "Video", title: "Linear and logistic regression with regularization" },
          { code: "4.2", kind: "Video", title: "Random Forest and boosted trees: XGBoost, LightGBM" },
          { code: "4.3", kind: "Video", title: "Why 95% accuracy can still fail the business — PR-AUC deep dive" },
          { code: "4.4", kind: "Video", title: "Class imbalance: SMOTE, threshold optimization, calibration" },
          { code: "4.5", kind: "Video", title: "Cross-validation, data leakage, feature selection" },
          { code: "4.6", kind: "Lab", title: "Churn model with XGBoost — from raw data to predictions" },
        ],
      },
      {
        title: "Section 5 · Explainability + Evaluation (Week 6)",
        lessons: [
          { code: "5.1", kind: "Video", title: "SHAP: TreeExplainer, force plots, summary plots" },
          { code: "5.2", kind: "Video", title: "LIME: local approximations for any model" },
          { code: "5.3", kind: "Video", title: "Hyperparameter tuning with Optuna" },
          { code: "5.4", kind: "Quiz", title: "ML Evaluation Checkpoint" },
        ],
      },
      {
        title: "Section 6 · Unsupervised + Recommenders (Week 7)",
        lessons: [
          { code: "6.1", kind: "Video", title: "K-Means, DBSCAN, PCA, UMAP for dimensionality reduction" },
          { code: "6.2", kind: "Video", title: "Isolation Forest for anomaly detection — fraud and risk" },
          { code: "6.3", kind: "Video", title: "Recommender systems: collaborative filtering and content-based" },
          { code: "6.4", kind: "Lab", title: "Mini Project 1: Complete Churn Prediction System with SHAP dashboard" },
          { code: "6.5", kind: "Live", title: "Saturday Session: Project review + system design discussion" },
        ],
      },
    ],
  },
  {
    id: "p3",
    title: "Phase 3",
    subtitle: "Production ML Engineering",
    meta: "4 Weeks · 14 Lessons",
    sections: [
      {
        title: "Section 7 · Experiment Tracking (Week 8)",
        lessons: [
          { code: "7.1", kind: "Video", title: "MLflow: experiments, runs, parameters, metrics, artifacts" },
          { code: "7.2", kind: "Video", title: "Model registry: staging, production, versioning" },
          { code: "7.3", kind: "Lab", title: "Track Phase 2 model experiments with MLflow" },
        ],
      },
      {
        title: "Section 8 · API Serving (Week 9–10)",
        lessons: [
          { code: "8.1", kind: "Video", title: "FastAPI fundamentals: routing, Pydantic, dependency injection" },
          { code: "8.2", kind: "Video", title: "Building POST /predict: request/response schemas, error handling" },
          { code: "8.3", kind: "Video", title: "Batch vs real-time inference — when and why" },
          { code: "8.4", kind: "Video", title: "Docker: Dockerfile, multi-stage builds, Compose, secrets" },
          { code: "8.5", kind: "Lab", title: "Containerize Phase 2 model and expose prediction endpoint" },
          { code: "8.6", kind: "Lab", title: "Mini Project 2: Risk Prediction API — MLflow → FastAPI → Docker" },
          { code: "8.7", kind: "Live", title: "Saturday Session: Live API build + Docker debugging" },
        ],
      },
    ],
  },
  {
    id: "p4",
    title: "Phase 4",
    subtitle: "Cloud MLOps on AWS",
    meta: "4 Weeks · 16 Lessons",
    sections: [
      {
        title: "Section 9 · AWS Deployment (Week 11–12)",
        lessons: [
          { code: "9.1", kind: "Video", title: "AWS fundamentals: S3, IAM, ECR, ECS/Fargate" },
          { code: "9.2", kind: "Video", title: "Push Docker image to ECR, deploy to ECS Fargate" },
          { code: "9.3", kind: "Video", title: "GitHub Actions: CI/CD pipeline — test → build → push → deploy" },
          { code: "9.4", kind: "Lab", title: "Deploy Phase 3 API to AWS with full CI/CD pipeline" },
        ],
      },
      {
        title: "Section 10 · Monitoring + Retraining (Week 13–14)",
        lessons: [
          { code: "10.1", kind: "Video", title: "CloudWatch: latency, error rates, custom metrics" },
          { code: "10.2", kind: "Video", title: "Evidently: data drift, concept drift, prediction distribution" },
          { code: "10.3", kind: "Video", title: "DVC: data versioning, model versioning, pipeline tracking" },
          { code: "10.4", kind: "Video", title: "Orchestration with Airflow/Prefect: training pipeline DAGs" },
          { code: "10.5", kind: "Video", title: "Champion/challenger retraining workflow with approval gate" },
          { code: "10.6", kind: "Lab", title: "Mini Project 3: Full MLOps pipeline with drift alerts + retraining" },
          { code: "10.7", kind: "Quiz", title: "MLOps Architecture Checkpoint" },
          { code: "10.8", kind: "Live", title: "Saturday Session: Live AWS deploy + monitoring setup" },
        ],
      },
    ],
  },
  {
    id: "p5",
    title: "Phase 5",
    subtitle: "GenAI Engineering + RAG + Fine-Tuning",
    meta: "4 Weeks · 22 Lessons",
    sections: [
      {
        title: "Section 11 · LLM APIs + Structured Output (Week 15)",
        lessons: [
          { code: "11.1", kind: "Video", title: "LLM APIs: OpenAI, Anthropic — tokens, context, model selection" },
          { code: "11.2", kind: "Video", title: "Prompt engineering: zero-shot, few-shot, chain-of-thought" },
          { code: "11.3", kind: "Video", title: "Function calling, JSON Schema enforcement, confidence scoring" },
          { code: "11.4", kind: "Lab", title: "Structured extraction with uncertain input handling" },
        ],
      },
      {
        title: "Section 12 · Embeddings + Hybrid RAG (Week 16–17)",
        lessons: [
          { code: "12.1", kind: "Video", title: "Embeddings: SBERT, OpenAI text-embedding, semantic similarity" },
          { code: "12.2", kind: "Video", title: "Vector DBs: pgvector (HNSW tuning) vs Pinecone vs ChromaDB" },
          { code: "12.3", kind: "Video", title: "Basic RAG pipeline: chunking, retrieval, grounded generation" },
          { code: "12.4", kind: "Video", title: "Hybrid retrieval: BM25 + dense vector + RRF fusion" },
          { code: "12.5", kind: "Video", title: "Cross-encoder reranking — going beyond cosine similarity" },
          { code: "12.6", kind: "Video", title: "RAG evaluation with RAGAS: Precision@K, Recall@K, faithfulness" },
          { code: "12.7", kind: "Lab", title: "Mini Project 4: Production RAG system — hybrid + reranking + RAGAS" },
          { code: "12.8", kind: "Live", title: "Saturday Session: Build hybrid RAG live, ablation testing" },
        ],
      },
      {
        title: "Section 13 · Fine-Tuning LLMs (Week 18–19)",
        lessons: [
          { code: "13.1", kind: "Video", title: "Dataset preparation for fine-tuning: instruction tuning, chat-template formatting" },
          { code: "13.2", kind: "Video", title: "LoRA and QLoRA — parameter-efficient fine-tuning deep dive" },
          { code: "13.3", kind: "Video", title: "PEFT with HuggingFace: adapters, rank selection, target modules" },
          { code: "13.4", kind: "Video", title: "Multi-GPU training, gradient checkpointing, Flash Attention" },
          { code: "13.5", kind: "Video", title: "Quantization: GPTQ, AWQ, GGUF — when and why to use each" },
          { code: "13.6", kind: "Video", title: "Model merging: TIES and DARE — combining fine-tuned adapters" },
          { code: "13.7", kind: "Video", title: "Serving fine-tuned models: vLLM, TGI, Ollama" },
          { code: "13.8", kind: "Video", title: "Evaluating fine-tuned models: MMLU, HellaSwag, DeepEval, PromptFoo" },
          { code: "13.9", kind: "Lab", title: "Domain-specific fine-tuning project: medical, legal, or code generation" },
          { code: "13.10", kind: "Live", title: "Saturday Session: Fine-tuning end-to-end walkthrough + evaluation" },
        ],
      },
    ],
  },
  {
    id: "p6",
    title: "Phase 6",
    subtitle: "Agentic AI + LLMOps + AI Safety & Evals",
    meta: "4 Weeks · 18 Lessons",
    sections: [
      {
        title: "Section 14 · LangGraph + Agents (Week 20–21)",
        lessons: [
          { code: "14.1", kind: "Video", title: "Agent fundamentals: ReAct, planning, tool use" },
          { code: "14.2", kind: "Video", title: "LangGraph: state machines, nodes, conditional edges, routing" },
          { code: "14.3", kind: "Video", title: "Memory: short-term vs long-term, SQLite checkpointer" },
          { code: "14.4", kind: "Video", title: "Human-in-the-loop with interrupt() — approval workflows" },
          { code: "14.5", kind: "Video", title: "Multi-agent: supervisor pattern, LangGraph teams" },
          { code: "14.6", kind: "Video", title: "Model Context Protocol (MCP): building your own tool server" },
          { code: "14.7", kind: "Lab", title: "Build a ReAct agent with RAG + API tools in LangGraph" },
        ],
      },
      {
        title: "Section 15 · LLMOps + Reliability (Week 22)",
        lessons: [
          { code: "15.1", kind: "Video", title: "LangSmith: tracing, evaluation, prompt versioning" },
          { code: "15.2", kind: "Video", title: "Guardrails, hallucination handling, input/output validation" },
          { code: "15.3", kind: "Video", title: "Cost and latency management: caching, batching, model selection" },
          { code: "15.4", kind: "Lab", title: "Mini Project 5: Multi-agent support system with MCP + LangSmith" },
          { code: "15.5", kind: "Live", title: "Saturday Session: Agent debugging session + LangSmith walkthrough" },
        ],
      },
      {
        title: "Section 16 · AI Safety, Evals + NLP Pipelines (Week 23)",
        lessons: [
          { code: "16.1", kind: "Video", title: "AI evaluation frameworks: what to measure and why" },
          { code: "16.2", kind: "Video", title: "Red-teaming LLMs: adversarial prompts, jailbreak testing, failure taxonomy" },
          { code: "16.3", kind: "Lab", title: "Build and red-team your own LLM eval harness" },
          { code: "16.4", kind: "Live", title: "Saturday Session: AI safety deep dive + evaluation results review" },
        ],
      },
    ],
  },
  {
    id: "p7",
    title: "Phase 7",
    subtitle: "Capstone + System Design + Career",
    meta: "3 Weeks · 10 Lessons",
    sections: [
      {
        title: "Section 17 · ML System Design (Week 22–23)",
        lessons: [
          { code: "17.1", kind: "Video", title: "ML system design framework: data → features → training → serving → monitoring" },
          { code: "17.2", kind: "Video", title: "Design: fraud detection at 10M tx/day — batch vs streaming decisions" },
          { code: "17.3", kind: "Video", title: "Design: early warning system — your real-world reference architecture" },
          { code: "17.4", kind: "Video", title: "RAG and agent systems at scale — latency, cost, trade-offs" },
          { code: "17.5", kind: "Live", title: "Saturday Session: System design mock interviews" },
        ],
      },
      {
        title: "Section 18 · Capstone + Career (Week 24)",
        lessons: [
          { code: "18.1", kind: "Lab", title: "Capstone: Full production AI platform — your domain, your data" },
          { code: "18.2", kind: "Video", title: "GitHub portfolio: README templates, project presentation" },
          { code: "18.3", kind: "Video", title: "Resume for AI/ML engineering roles in the US market" },
          { code: "18.4", kind: "Live", title: "Saturday Session: Capstone presentations + peer feedback" },
          { code: "18.5", kind: "Live", title: "Final: Mock interviews + salary negotiation workshop" },
        ],
      },
    ],
  },
];
