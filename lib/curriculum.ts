export type TopicCard = {
  title: string;
  items: string[];
};

export type PhaseModule = {
  label: string;
  items: string[];
};

export type CurriculumPhase = {
  tab: string;
  badge: string;
  title: string;
  description: string;
  projectLabel: string;
  project: string;
  /** Flat topic list (simpler phases) */
  topics?: string[];
  /** Topic cards with titles (Phase 1 style) */
  topicCards?: TopicCard[];
  /** Module groups (Phase 2 style) */
  modules?: PhaseModule[];
  tools?: string[];
  /** Highlighted topic indices in `topics` (e.g. fine-tuning stars) */
  highlightTopics?: number[];
};

export const CURRICULUM_PHASES: CurriculumPhase[] = [
  {
    tab: "P1 · Foundations",
    badge: "Phase 1 · 2 Weeks",
    title: "Python for ML & AI",
    description:
      "Starts from the ground up — no assumed Python knowledge. Week 1 builds the core language from data types through functions and file handling. Week 2 moves into the data science stack: NumPy, Pandas, Matplotlib, and a first look at Scikit-learn. By the end you write code that belongs in a real repository, not just a notebook.",
    projectLabel: "Mini Project",
    project:
      "EDA Pipeline — clean, transform, and visualize raw data with a structured ML project layout, automated data quality checks, and full Git history.",
    topicCards: [
      {
        title: "Python Foundation — Week 1",
        items: [
          "Data types, variables, and operators",
          "Lists, dicts, indexing, and slicing",
          "If/else, for loops, and control flow",
          "Functions, scope, and reusability",
          "List/dict comprehensions",
          "File handling and exception handling",
        ],
      },
      {
        title: "Data Science Stack — Week 2",
        items: [
          "NumPy: arrays, broadcasting, vectorized operations",
          "Pandas: DataFrames, groupby, joins, reshaping",
          "Matplotlib: figures, subplots, custom styling",
          "Scikit-learn: first look at the ML API and pipelines",
        ],
      },
      {
        title: "Data Analysis & Visualization",
        items: [
          "Distributions, correlations, and outlier detection",
          "Matplotlib, Seaborn, Plotly",
          "Feature engineering basics",
          "Data cleaning pipelines",
        ],
      },
    ],
    tools: [
      "Python 3.11+",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Scikit-learn",
      "Jupyter",
      "VS Code",
      "Git",
      "GitHub",
      "venv / pip",
    ],
  },
  {
    tab: "P1b · Math & Stats",
    badge: "Phase 1b · 2 Weeks",
    title: "Math & Statistics for ML",
    description:
      "Not a math textbook — applied statistics in the context of real ML problems. Probability for understanding model uncertainty. Hypothesis testing for comparing model versions. Linear algebra for understanding what optimizers and embeddings are actually doing.",
    projectLabel: "Applied Lab",
    project:
      "A/B Test a Model — compare two classifiers using statistical significance testing, confidence intervals, and effect size. Make a defensible go/no-go recommendation the way you would in production.",
    topics: [
      "Probability fundamentals — Bayes' theorem, conditional probability, distributions",
      "Normal, Bernoulli, Poisson, binomial — when each distribution applies",
      "Central Limit Theorem and sampling — the foundation of model evaluation",
      "Hypothesis testing: t-test, chi-square, ANOVA — applied to model comparison",
      "Confidence intervals and p-values — what they actually mean in practice",
      "A/B testing design and analysis — for comparing model versions in production",
      "Correlation vs causation — the most common mistake in data science",
      "Vectors, matrices, dot products — intuition for embeddings and linear models",
      "Gradient descent variants — why Adam beats SGD for most problems",
    ],
  },
  {
    tab: "P2 · Applied ML",
    badge: "Phase 2 · 6 Weeks",
    title: "Applied Machine Learning",
    description:
      "Full ML Specialization — from classical algorithms to deep learning. Interview-ready theory plus production-grade implementation. You'll understand why algorithms work, not just how to call them, so you can defend every decision in a technical interview or design review.",
    projectLabel: "Capstone Project",
    project:
      "End-to-end ML system: Churn prediction (XGBoost + SHAP) → fraud anomaly detection (Isolation Forest + PCA) → NLP sentiment classifier (LSTM + embeddings) — all with evaluation reports and stakeholder-ready dashboards.",
    modules: [
      {
        label: "Module 2A — Fundamentals of Classical ML",
        items: [
          "Introduction to Classical Machine Learning — the ML landscape and problem framing",
          "Linear Regression — OLS, polynomial features, bias-variance tradeoff",
          "Regularization — Ridge (L2), Lasso (L1), ElasticNet — when and why",
          "Cross-Validation — k-fold, stratified, leave-one-out — preventing data leakage",
          "Logistic Regression — Perceptron, Softmax for multi-class classification",
          "Introduction to Clustering — K-Means, K-Means++, Hierarchical clustering",
          "Model selection and evaluation — train/val/test split, learning curves",
        ],
      },
      {
        label: "Module 2B — Supervised Learning (Interview Focus)",
        items: [
          "MLE & MAP estimation — probabilistic foundations every ML interview tests",
          "Confidence intervals — interpreting model uncertainty in production",
          "Classification metrics — precision, recall, F1, ROC-AUC, PR-AUC, calibration",
          "Imbalanced data — SMOTE, class weights, threshold optimization",
          "Decision Trees — splitting criteria, pruning, depth tuning",
          "Ensemble methods — Bagging, Random Forest, Gradient Boosting, XGBoost, LightGBM",
          "Naive Bayes — Gaussian, Multinomial — fast baselines for text and tabular",
          "Support Vector Machines — kernels, margin, when SVMs beat trees",
          "SHAP and LIME explainability — required in healthcare, finance, and government",
          "Hyperparameter tuning — GridSearch, RandomSearch, Optuna (Bayesian)",
        ],
      },
      {
        label: "Module 2C — Unsupervised, Recommenders & Time Series",
        items: [
          "Clustering deep dive — K-Means++, Hierarchical, DBSCAN, Gaussian Mixture Models",
          "Anomaly / Outlier / Novelty Detection — Isolation Forest, LOF, One-Class SVM",
          "Dimensionality reduction — PCA (linear) and t-SNE (non-linear) with intuition",
          "Recommender Systems — collaborative filtering, matrix factorization, hybrid models",
          "Time Series Analysis — stationarity, ACF/PACF, ARIMA, seasonal decomposition",
          "Feature engineering for time series — lag features, rolling stats, trend extraction",
        ],
      },
      {
        label: "Module 2D — Deep Learning Specialization (10 Weeks)",
        items: [
          "Neural Networks — Perceptron, hidden layers, forward & backward propagation, MLP",
          "TensorFlow & Keras — model building, callbacks, TensorBoard visualization",
          "Optimization — SGD, Adam, learning rate schedules, hyperparameter tuning",
          "Computer Vision — CNNs, data augmentation, transfer learning, CNN visualization",
          "Popular CNN architectures — AlexNet, VGG, ResNet, Inception, EfficientNet, MobileNet",
          "Object segmentation, localization & detection — YOLO, Faster R-CNN, U-Net",
          "Natural Language Processing — text processing, tokenization, stemming, lemmatization",
          "Vector space models — cosine similarity, Euclidean distance, TF-IDF",
          "POS tagging, dependency parsing, topic modeling, language modeling",
          "Word embeddings — Word2Vec, GloVe, FastText",
          "Recurrent Neural Networks — RNN, LSTM, GRU — sequence modeling",
          "Information extraction, Named Entity Recognition (NER)",
        ],
      },
    ],
    tools: [
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "TensorFlow",
      "Keras",
      "PyTorch",
      "SHAP",
      "LIME",
      "Optuna",
      "OpenCV",
      "NLTK",
      "spaCy",
      "Hugging Face",
      "TensorBoard",
      "Google Colab",
    ],
  },
  {
    tab: "P3 · Prod ML Eng",
    badge: "Phase 3 · 4 Weeks",
    title: "Production ML Engineering",
    description:
      "Take the Phase 2 model and turn it into software. Professional project structure, experiment tracking, REST API serving, and containerization. By the end, every student has a live POST /predict endpoint running in Docker.",
    projectLabel: "Mini Project 2",
    project:
      "Risk Prediction API — MLflow experiment tracking → FastAPI endpoint → Docker container, with typed Pydantic request/response schemas.",
    topics: [
      "Professional ML project structure (src/, tests/, configs/, pipelines/)",
      "MLflow: experiments, runs, parameters, metrics, model registry",
      "FastAPI: endpoints, Pydantic schemas, batch vs real-time inference",
      "Docker: Dockerfile, Compose, environment variables, secrets",
      "Building and testing POST /predict endpoints",
      "Container registry and image versioning",
    ],
  },
  {
    tab: "P4 · Cloud MLOps",
    badge: "Phase 4 · 4 Weeks",
    title: "Full Cloud MLOps",
    description:
      "This is the signature section — the phase most courses skip or compress. AWS deployment, CI/CD pipelines, orchestration, monitoring, drift detection, and automated retraining. The full operational loop, not just a one-time deploy.",
    projectLabel: "Mini Project 3",
    project:
      "MLOps Pipeline — GitHub Actions CI/CD → ECR → ECS Fargate → CloudWatch monitoring → Evidently drift alerts → automated retraining trigger.",
    topics: [
      "AWS: S3, ECR, ECS/Fargate, IAM, CloudWatch",
      "CI/CD: GitHub Actions → tests → Docker build → ECR → ECS deploy",
      "Orchestration: Airflow or Prefect for ML pipelines",
      "Data quality monitoring, data drift and concept drift detection",
      "Evidently: prediction distribution, latency, business metrics",
      "Champion/challenger retraining workflow with approval step",
      "DVC for data and model versioning",
      "Feature stores and model registries in production",
    ],
  },
  {
    tab: "P5 · GenAI + RAG",
    badge: "Phase 5 · 4 Weeks",
    title: "GenAI Engineering + RAG + Fine-Tuning",
    description:
      "LLMs from an engineer's perspective — APIs, structured output, embeddings, hybrid RAG, and a full fine-tuning module that most programs skip. You'll go from LoRA/QLoRA basics all the way to serving a fine-tuned model in production with quantization and evaluation.",
    projectLabel: "Mini Project 4",
    project:
      "Production RAG System — documents → embeddings → pgvector HNSW → BM25 lexical search → RRF fusion → cross-encoder reranking → RAGAS evaluation with Precision@5/Recall@10.",
    topics: [
      "LLM APIs (OpenAI, Anthropic), prompt engineering, function calling",
      "Structured output with JSON Schema enforcement and confidence scoring",
      "Embeddings: SBERT, OpenAI text-embedding, semantic similarity",
      "Vector DBs: pgvector (HNSW tuning, JSONB schema) vs Pinecone vs ChromaDB",
      "RAG pipeline: chunking strategies, retrieval, grounded generation",
      "Hybrid retrieval: BM25 + dense vector + Reciprocal Rank Fusion",
      "Cross-encoder reranking — beyond cosine similarity",
      "RAG evaluation with RAGAS: Precision@K, Recall@K, faithfulness",
      "Advanced RAG: HyDE, multi-query, self-RAG patterns",
      "Fine-Tuning: dataset prep, instruction tuning, chat-template formatting",
      "LoRA, QLoRA, PEFT — parameter-efficient fine-tuning at scale",
      "Multi-GPU training, gradient checkpointing, Flash Attention",
      "Quantization (GPTQ, AWQ, GGUF), model merging (TIES/DARE)",
      "Serving fine-tuned models: vLLM, TGI, Ollama",
      "Evaluating fine-tuned models: MMLU, HellaSwag, DeepEval, PromptFoo",
      "Domain-specific fine-tuning: medical, legal, code generation use cases",
    ],
    highlightTopics: [9, 10, 11, 12, 13, 14, 15],
  },
  {
    tab: "P6 · Agentic AI",
    badge: "Phase 6 · 4 Weeks",
    title: "Agentic AI + LLMOps + AI Safety & Evals",
    description:
      "Build agents with state, memory, tool use, and multi-agent orchestration — then monitor and operate them in production. Closes with a full week on AI Safety & Evals and NLP pipelines that most programs either skip or reduce to a single slide.",
    projectLabel: "Mini Project 5",
    project:
      "Multi-Agent Support System — LangGraph state machine + RAG tool + API tool + human-in-the-loop via interrupt() + SQLite checkpointer + LangSmith tracing.",
    topics: [
      "LangGraph: state machines, routing, conditional edges",
      "ReAct pattern, planning, tool/function calling",
      "Short-term and long-term memory, state persistence",
      "Human-in-the-loop with interrupt() and SQLite checkpointer",
      "Multi-agent orchestration (CrewAI patterns, LangGraph supervisor)",
      "Model Context Protocol (MCP) — building tool servers",
      "LLMOps: tracing with LangSmith, prompt versioning, cost tracking",
      "Hallucination handling, guardrails, failure modes",
      "Latency optimization, caching strategies, reliability patterns",
      "AI Safety & Evals: evaluation frameworks, red-teaming, jailbreak testing",
    ],
    highlightTopics: [9],
  },
  {
    tab: "P7 · Capstone",
    badge: "Phase 7 · 3 Weeks",
    title: "Capstone + System Design + Career",
    description:
      "Ship a complete production AI platform — your centerpiece portfolio project. Plus ML system design practice with real interview prompts, and career preparation focused on the US AI/ML engineering market.",
    projectLabel: "Capstone Project",
    project:
      "Full Production AI Platform — data ingestion → validation → feature engineering → MLflow registry → FastAPI → Docker → AWS Fargate → monitoring → drift detection → retraining loop. Your own domain, your own data.",
    topics: [
      "ML system design framework: data → features → training → serving → monitoring",
      "Design prompts: fraud detection at 10M tx/day, early warning system",
      "RAG and agent systems at scale — latency and cost trade-offs",
      "Batch vs streaming, model selection, scaling decisions",
      "Resume, GitHub profile, and LinkedIn optimization for AI/ML roles",
      "Mock interviews: technical + ML system design + behavioral",
      "Salary negotiation and US market positioning",
    ],
  },
];
