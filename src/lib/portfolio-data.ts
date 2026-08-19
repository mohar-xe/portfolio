/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  badge?: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    title: "Inference Router",
    description:
      "Production-grade LLM inference router in Go, sitting between apps and OpenAI-compatible/Anthropic backends. Adaptive routing (EWMA latency / weighted / priority), sliding-window circuit breaking with a zero-allocation hot path (4.8 ns/op), health-gated failover with backoff, multi-dimension token-bucket rate limiting, TTL response caching, SSE streaming that never hangs, config hot-reload preserving breaker state, and dependency-free Prometheus metrics — ~5k stdlib lines, one external dependency (yaml.v3).",
    tags: ["Go", "Circuit Breaking", "Rate Limiting", "Streaming", "Prometheus"],
    badge: "FEATURED",
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/inference-router",
        external: true,
      },
    ],
  },
  {
    title: "Hybrid Graph RAG",
    description:
      "8-stage hybrid retrieval pipeline fusing dense HNSW, BM25 and knowledge-graph traversal with Reciprocal Rank Fusion + cross-encoder reranking. HotpotQA ablation: KG traversal lifted Exact Match 29% → 52%; full pipeline at 66% F1, 80% answer recall, 82% Hit@5, 90% answer-in-context.",
    tags: ["Python", "PostgreSQL/pgvector", "KuzuDB", "FastAPI", "Docker"],
    badge: "FEATURED",
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/Hybrid-RAG",
        external: true,
      },
      {
        label: "Live Demo",
        href: "https://hybrid-rag-6fnb.onrender.com",
        external: true,
      },
    ],
  },
  {
    title: "Knowledge Graph Extraction Pipeline",
    description:
      "End-to-end pipeline: 3,350 instruction-tuning samples across 20 relation types (MinHash dedup, hard negatives, curriculum ordering) + Qwen3-0.6B fine-tune with 4-bit LoRA → 100% schema adherence, 0.6850 composite on multi-axis eval.",
    tags: ["Qwen3", "LoRA", "Unsloth", "Hugging Face"],
    badge: "FEATURED",
    links: [
      {
        label: "3 Repos",
        href: "https://github.com/mohar-xe/HGR_dataset_pipeline",
        external: true,
      },
    ],
  },
  {
    title: "Logical-LM",
    description:
      "From-scratch reimplementation of Logic-LM (Findings of EMNLP 2023), the neuro-symbolic framework that pairs LLMs with symbolic solvers for logical reasoning tasks.",
    tags: ["Python", "Neuro-symbolic", "LLM Reasoning"],
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/Logical-LM",
        external: true,
      },
    ],
  },
  {
    title: "Grey – Agentic Research Framework",
    description:
      "Agentic research system based on bisociation. 9-agent LangGraph pipeline with qualifier-driven routing and automated critique loops; persistent workflow state, per-node error boundaries, and a metrics-first evaluation suite.",
    tags: ["Python", "LangGraph", "FastAPI", "Anthropic", "Groq", "Tavily"],
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/Grey",
        external: true,
      },
    ],
  },
  {
    title: "KAN Symbolic Regression",
    description:
      "Rediscover physics equations from noisy data with a from-scratch Kolmogorov–Arnold Network (KAN).",
    tags: ["Python", "KAN", "Symbolic Regression"],
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/KAN-Symbolic",
        external: true,
      },
    ],
  },
  {
    title: "PunyPunk",
    description:
      "Scripts to train PunyPunk and bestow great capabilities from larger models.",
    tags: ["Python", "Distillation", "Fine-tuning"],
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/PunyPunk",
        external: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    title: "AI/ML Research Intern",
    company: "Azmth Lab Private Limited",
    location: "Remote",
    period: "Jul 2026 – Present",
    description:
      "Research and develop proprietary neuro-symbolic AI architectures for advanced reasoning systems.",
    points: [
      "Investigated recent research in neuro-symbolic AI, compact language models, and edge AI, translating findings into experimental directions for the team's proprietary architecture.",
      "Prototyped and evaluated research-driven techniques for resource-constrained language models, designing experiments and evaluation protocols to assess architectural trade-offs for edge deployment.",
      "Productionized a voice-recognition prototype by implementing leveled logging across 7 modules, environment-driven configuration, and hardened SQLite storage with WAL mode and context managers for CI/headless compatibility and concurrent access.",
      "Reworked heuristic emotion classification and acoustic feature estimation, improving observed real-world accuracy from 64% to 89% through recalibrated arousal/valence gates and revised pitch and speaking-rate algorithms.",
      "Engineered a multi-format audio ingestion pipeline supporting WAV, FLAC, OGG, and M4A at 16 kHz mono, alongside an 8-scenario synthetic test harness and CLI packaging.",
      "Collaborated with the founder and core research team on literature review, architecture exploration, hypothesis development, and research-driven engineering decisions.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Education                                                          */
/* ------------------------------------------------------------------ */

export interface Education {
  title: string;
  school: string;
  period: string;
  coursework: string[];
}

export const education: Education[] = [
  {
    title: "B.S. in Data Science and Applications",
    school: "Indian Institute of Technology Madras",
    period: "2025 – Expected 2029",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Reinforcement Learning",
      "LLMs",
      "Data Structures & Algorithms",
      "Databases",
      "Computer Vision",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Open Source                                                        */
/* ------------------------------------------------------------------ */

export interface OpenItem {
  repo: string;
  title: string;
  url: string;
}

export const openSource = {
  metrics: [
    { label: "Pull Requests", value: "2" },
    { label: "Issues Opened", value: "3" },
    { label: "Repos", value: "24" },
    { label: "Followers", value: "11" },
  ] as { label: string; value: string }[],
  prsUrl: "https://github.com/pulls?q=is%3Apr+author%3Amohar-xe",
  issuesUrl: "https://github.com/issues?q=is%3Aissue+author%3Amohar-xe",
  prs: [
    {
      repo: "khoj-ai/khoj",
      title: "Fix GPT-5 temperature incompatibility in all 4 API paths",
      url: "https://github.com/khoj-ai/khoj/pull/1385",
    },
    {
      repo: "kubeflow/sdk",
      title:
        "fix(trainer): validate LoraConfig params and correctly pass falsy-but-valid values",
      url: "https://github.com/kubeflow/sdk/pull/588",
    },
  ] as OpenItem[],
  issues: [
    {
      repo: "kubeflow/sdk",
      title:
        "LoraConfig/TorchTuneConfig accept invalid PEFT hyperparameters, and valid 0/[] values are silently dropped",
      url: "https://github.com/kubeflow/sdk/issues/579",
    },
    {
      repo: "adrida/tracer",
      title:
        "bug: Router.predict() raises IndexError on scalar embedding input instead of a descriptive ValueError",
      url: "https://github.com/adrida/tracer/issues/69",
    },
  ] as OpenItem[],
};

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export interface ContactItem {
  label: string;
  href?: string;
  copy?: string;
}

export const contactItems: ContactItem[] = [
  {
    label: "official.mohar.d@gmail.com",
    href: "mailto:official.mohar.d@gmail.com",
    copy: "official.mohar.d@gmail.com",
  },
  { label: "+91 97752 11066", href: "tel:+919775211066", copy: "+91 97752 11066" },
  { label: "github.com/mohar-xe", href: "https://github.com/mohar-xe", copy: "github.com/mohar-xe" },
  { label: "linkedin.com/in/mohardas", href: "https://linkedin.com/in/mohardas", copy: "linkedin.com/in/mohardas" },
  { label: "huggingface.co/mohar07", href: "https://huggingface.co/mohar07", copy: "huggingface.co/mohar07" },
  { label: "Kolkata, India" },
];
