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
    title: "Stampede",
    description:
      "Open-source control plane for AI coding-agent fleets. A Go control plane owns an append-only session log, the job queue, usage/cost tracking and approval-gated shipping; a TypeScript harness runs the plan → edit → test → iterate loop; every task gets its own isolated E2B sandbox. REST + SSE between dashboard and control plane, and the whole stack deploys on free tiers with no credit card.",
    tags: ["Go", "TypeScript", "SSE", "E2B", "Sandboxing"],
    badge: "FEATURED",
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/stampede",
        external: true,
      },
    ],
  },
  {
    title: "Refinery",
    description:
      "Verified agent trajectories in, a small distilled model out: the trace → SFT → student flywheel built end to end on a legal entailment task. Outcome verification filters runs before they become training data, one eval harness scores teacher, student and heuristic side by side, and the cost/quality frontier is emitted by the pipeline instead of hand-filled.",
    tags: ["Python", "Distillation", "LoRA", "Agent Traces", "Evals"],
    badge: "FEATURED",
    links: [
      {
        label: "View Project",
        href: "https://github.com/mohar-xe/Refinery",
        external: true,
      },
    ],
  },
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
    title: "Sequential Matching — Vouchsafe Hackathon",
    description:
      "Team Enigmatic Cats, Vouchsafe Sequential Matching Hackathon. Recovered the generative law behind the supplied simulator, decomposed the funnel, and found that only 1.24% of pairs are even legal, a third of people can never be matched, and the provided baseline already sits at 89% of the achievable ceiling. Nine stdlib-only scripts reproduce every number.",
    tags: ["Python", "Research", "Matching", "Optimization"],
    links: [
      {
        label: "Research + Code",
        href: "https://github.com/mohar-xe/sequential-matching-hackathon",
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
    title: "Research Intern — AMR for Legal Reasoning",
    company: "Indian Institute of Technology Madras",
    location: "Chennai, India",
    period: "Oct 2026 – Present",
    description:
      "Research internship with Assistant Professor Dr. Suman Kundu on meaning representation for legal reasoning — whether AMR graphs carry the structure a legal claim verifier actually needs.",
    points: [
      "Built the evaluation harness behind SONAA: 15 LiveLaw judgments (64 sentences) with 46 hand-written atomic claims and 23 single-edit corruptions (role swap, polarity flip, quantifier flip, number change, agent swap) designed so that string matching cannot detect them.",
      "Ran a channel ablation that keeps the graph intact and removes one structural channel at a time: concepts alone separate 0/23 corruption pairs, the full graph separates 16/23 — roles carry most of the signal, quantifiers and reentrancy carry none.",
      "Positioned the graph against a fact-graph baseline (0.565) and a direct Qwen3.5-9B baseline (0.935); the graph beats the fact graph but not the LLM, which reframes the result as channel attribution rather than a new benchmark number.",
      "Audited the off-the-shelf AMR parser landscape for legal prose — out-of-domain Smatch drops of 38–45% relative, concentrated in named entities, negation and reentrancy — and traced the residual system failures to parser errors on legal vocabulary rather than scoring.",
    ],
  },
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
    { label: "Pull Requests", value: "4" },
    { label: "Issues Opened", value: "3" },
    { label: "Projects", value: "4" },
    { label: "Followers", value: "18" },
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
/*  Contributor programme                                             */
/* ------------------------------------------------------------------ */

export interface Program {
  name: string;
  url: string;
  description: string;
  items: OpenItem[];
}

export const programs: Program[] = [
  {
    name: "The Boring Education — Contributor Program",
    url: "https://github.com/The-Boring-Education",
    description:
      "Open-source tech education for Bharat — 13 public repositories across a learning web app, APIs and an agent framework. Contributing to the Shiksha agent workstream: an agent that emits a valid Course Bundle, plus a purge path for completed sessions that were accumulating in temp/ forever.",
    items: [
      {
        repo: "The-Boring-Agents #56",
        title: "feat(shiksha): course generation agent emitting a valid Course Bundle",
        url: "https://github.com/The-Boring-Education/The-Boring-Agents/pull/56",
      },
      {
        repo: "The-Boring-Agents #59",
        title: "feat(sessions): bulk purge for completed sessions older than N days",
        url: "https://github.com/The-Boring-Education/The-Boring-Agents/pull/59",
      },
      {
        repo: "The-Boring-Agents #58",
        title: "bug: sessions in temp/ accumulate forever — no TTL or purge path",
        url: "https://github.com/The-Boring-Education/The-Boring-Agents/issues/58",
      },
    ],
  },
];

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
