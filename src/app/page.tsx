"use client";

import { useState } from "react";
import {
  FolderOpen,
  Briefcase,
  GraduationCap,
  Code,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Globe,
  Zap,
  Network,
  BrainCircuit,
  Bot,
  BarChart3,
  Building2,
  BookOpen,
  ExternalLink,
  Calendar,
  GitPullRequest,
  CircleDot,
} from "lucide-react";

type TabKey = "projects" | "experience" | "education" | "opensource";

interface CardData {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  badge?: string;
  footer?: React.ReactNode;
  color: string;
}

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "projects", label: "Projects", icon: <FolderOpen className="w-4 h-4" /> },
  { key: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { key: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  { key: "opensource", label: "Open Source", icon: <Code className="w-4 h-4" /> },
];

const projectsData: CardData[] = [
  {
    title: "Hybrid Graph RAG",
    description:
      "8-stage hybrid retrieval pipeline fusing dense HNSW, BM25 and knowledge-graph traversal with Reciprocal Rank Fusion + cross-encoder reranking. HotpotQA ablation: KG traversal lifted Exact Match 29% → 52%; full pipeline at 66% F1, 80% answer recall, 82% Hit@5, 90% answer-in-context.",
    tags: ["Python", "PostgreSQL/pgvector", "KuzuDB", "FastAPI", "Docker"],
    icon: <Network className="w-5 h-5" />,
    badge: "FEATURED",
    color: "emerald",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 cursor-pointer">
          <a href="https://github.com/mohar-xe/Hybrid-RAG" target="_blank" rel="noopener noreferrer">View Project <ArrowRight className="w-3.5 h-3.5" /></a>
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <a href="https://hybrid-rag-6fnb.onrender.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">Live Demo</a>
        </span>
      </>
    ),
  },
  {
    title: "Knowledge Graph Extraction Pipeline",
    description:
      "End-to-end pipeline: 3,350 instruction-tuning samples across 20 relation types (MinHash dedup, hard negatives, curriculum ordering) + Qwen3-0.6B fine-tune with 4-bit LoRA → 100% schema adherence, 0.6850 composite on multi-axis eval.",
    tags: ["Qwen3", "LoRA", "Unsloth", "Hugging Face"],
    icon: <BrainCircuit className="w-5 h-5" />,
    badge: "FEATURED",
    color: "purple",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer">
          <a href="https://github.com/mohar-xe/HGR_dataset_pipeline" target="_blank" rel="noopener noreferrer">3 Repos <ExternalLink className="w-3.5 h-3.5" /></a>
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <span>Dataset · Fine-tune · Eval</span>
        </span>
      </>
    ),
  },
  {
    title: "Grey – Agentic Research Framework",
    description:
      "Agentic research system based on bisociation. 9-agent LangGraph pipeline with qualifier-driven routing and automated critique loops; persistent workflow state, per-node error boundaries, and a metrics-first evaluation suite.",
    tags: ["Python", "LangGraph", "FastAPI", "Anthropic", "Groq", "Tavily"],
    icon: <Bot className="w-5 h-5" />,
    color: "amber",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 cursor-pointer">
          <a href="https://github.com/mohar-xe/Grey" target="_blank" rel="noopener noreferrer">View Project <ArrowRight className="w-3.5 h-3.5" /></a>
        </span>
      </>
    ),
  },
  {
    title: "BIS Standard Recommendation Engine",
    description:
      "Recommendation engine for Bureau of Indian Standards (BIS). Most-starred public project with eval script, inference, and presentation. Built with a focus on clean, reproducible evaluation.",
    tags: ["Python", "Recommendation", "Evaluation"],
    icon: <BarChart3 className="w-5 h-5" />,
    color: "pink",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 cursor-pointer">
          <a href="https://github.com/mohar-xe/bis-re" target="_blank" rel="noopener noreferrer">View Project <ArrowRight className="w-3.5 h-3.5" /></a>
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 2
        </span>
      </>
    ),
  },
];

const experienceData: CardData[] = [
  {
    title: "AI Research Intern – Azmth Lab",
    description:
      "Research and develop proprietary neuro-symbolic AI architectures for advanced reasoning systems. Prototype, implement and evaluate novel architectures from SOTA research; review and synthesize AI literature; contribute to architecture design and research-driven engineering.",
    tags: ["Neuro-symbolic AI", "Research", "LLMs", "Prototyping"],
    icon: <Building2 className="w-5 h-5" />,
    color: "emerald",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Calendar className="w-3.5 h-3.5" /> July 2026 – Present
        </span>
        <span className="flex items-center gap-1 text-gray-400">India</span>
      </>
    ),
  },
];

const educationData: CardData[] = [
  {
    title: "IIT Madras – B.S. Data Science",
    description:
      "B.S. in Data Science and Applications (online, self-paced, designed for concurrent full-time employment). Coursework: ML Foundations, Deep Learning, Computer Vision, DBMS, Data Structures & Algorithms, Operating Systems, Software Engineering, Business Analytics.",
    tags: ["Machine Learning", "Deep Learning", "DBMS", "DSA"],
    icon: <GraduationCap className="w-5 h-5" />,
    color: "purple",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-purple-400">
          <Calendar className="w-3.5 h-3.5" /> 2025 – Expected 2029
        </span>
        <span className="flex items-center gap-1 text-gray-400">IIT Madras</span>
      </>
    ),
  },
];

const openSourceData = {
  metrics: [
    { label: "Pull Requests", value: "2", icon: <GitPullRequest className="w-4 h-4" /> },
    { label: "Issues Opened", value: "3", icon: <CircleDot className="w-4 h-4" /> },
    { label: "Repos", value: "17", icon: <Github className="w-4 h-4" /> },
    { label: "Followers", value: "14", icon: <Star className="w-4 h-4" /> },
  ],
  prs: [
    {
      repo: "khoj-ai/khoj",
      title: "Fix GPT-5 temperature incompatibility in all 4 API paths",
      url: "https://github.com/khoj-ai/khoj/pull/1385",
      state: "Open",
    },
    {
      repo: "kubeflow/sdk",
      title: "fix(trainer): validate LoraConfig params and correctly pass falsy-but-valid values",
      url: "https://github.com/kubeflow/sdk/pull/588",
      state: "Open",
    },
  ],
  issues: [
    {
      repo: "kubeflow/sdk",
      title: "LoraConfig/TorchTuneConfig accept invalid PEFT hyperparameters, and valid 0/[] values are silently dropped",
      url: "https://github.com/kubeflow/sdk/issues/579",
      state: "Open",
    },
    {
      repo: "adrida/tracer",
      title: "bug: Router.predict() raises IndexError on scalar embedding input instead of a descriptive ValueError",
      url: "https://github.com/adrida/tracer/issues/69",
      state: "Open",
    },
    {
      repo: "mohar-xe/csv_cleaner",
      title: "No output file is saved",
      url: "https://github.com/mohar-xe/csv_cleaner/issues/1",
      state: "Closed",
    },
  ],
};

const cardDataMap: Record<TabKey, CardData[]> = {
  projects: projectsData,
  experience: experienceData,
  education: educationData,
  opensource: [],
};

const colorClasses: Record<string, { iconBg: string; iconText: string; tagBg: string; tagText: string; badgeBg: string; badgeText: string }> = {
  emerald: {
    iconBg: "bg-emerald-400/15",
    iconText: "text-emerald-400",
    tagBg: "bg-emerald-400/10",
    tagText: "text-emerald-400",
    badgeBg: "bg-emerald-400/10",
    badgeText: "text-emerald-400",
  },
  purple: {
    iconBg: "bg-purple-400/15",
    iconText: "text-purple-400",
    tagBg: "bg-purple-400/10",
    tagText: "text-purple-400",
    badgeBg: "bg-purple-400/10",
    badgeText: "text-purple-400",
  },
  amber: {
    iconBg: "bg-amber-400/15",
    iconText: "text-amber-400",
    tagBg: "bg-amber-400/10",
    tagText: "text-amber-400",
    badgeBg: "bg-amber-400/10",
    badgeText: "text-amber-400",
  },
  pink: {
    iconBg: "bg-pink-400/15",
    iconText: "text-pink-400",
    tagBg: "bg-pink-400/10",
    tagText: "text-pink-400",
    badgeBg: "bg-pink-400/10",
    badgeText: "text-pink-400",
  },
};

const contactItems = [
  { icon: <Mail className="w-4 h-4" />, label: "official.mohar.d@gmail.com", href: "mailto:official.mohar.d@gmail.com" },
  { icon: <Phone className="w-4 h-4" />, label: "+91 97752 11066", href: "tel:+919775211066" },
  { icon: <Github className="w-4 h-4" />, label: "github.com/mohar-xe", href: "https://github.com/mohar-xe" },
  { icon: <Linkedin className="w-4 h-4" />, label: "linkedin.com/in/mohardas", href: "https://linkedin.com/in/mohardas" },
  { icon: <Globe className="w-4 h-4" />, label: "huggingface.co/mohar07", href: "https://huggingface.co/mohar07" },
  { icon: <MapPin className="w-4 h-4" />, label: "Kolkata, India" },
];

function ContentCard({ card }: { card: CardData }) {
  const colors = colorClasses[card.color];
  return (
    <div className="relative bg-[#1a2235] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-3 h-full">
      {/* Badge */}
      {card.badge && (
        <span
          className={`absolute top-3.5 right-4 text-[10px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
        >
          {card.badge}
        </span>
      )}

      {/* Icon + Title */}
      <div className="flex items-start gap-3">
        <div
          className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${colors.iconBg} ${colors.iconText}`}
        >
          {card.icon}
        </div>
        <h3 className="text-white font-semibold text-[15px] leading-tight mt-0.5">
          {card.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-4">
        {card.description}
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${colors.tagBg} ${colors.tagText}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      {card.footer && (
        <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
          {card.footer}
        </div>
      )}
    </div>
  );
}

function OpenSourceView() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* GitHub metrics row */}
      <div className="grid grid-cols-4 gap-4">
        {openSourceData.metrics.map((m) => (
          <div
            key={m.label}
            className="bg-[#1a2235] border border-white/[0.06] rounded-xl px-4 py-4 flex flex-col gap-1.5"
          >
            <span className="text-emerald-400">{m.icon}</span>
            <span className="text-white font-semibold text-2xl">{m.value}</span>
            <span className="text-gray-400 text-xs">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {/* Pull Requests */}
        <div className="flex flex-col bg-[#1a2235] border border-white/[0.06] rounded-xl p-5 gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-semibold text-sm">Pull Requests</h3>
            <a
              href="https://github.com/pulls?q=is%3Apr+author%3Amohar-xe"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View all <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto">
            {openSourceData.prs.map((pr) => (
              <a
                key={pr.url}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-white/[0.06] p-3 hover:border-purple-400/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-400">
                    {pr.state}
                  </span>
                  <span className="text-[11px] text-gray-500 truncate">{pr.repo}</span>
                </div>
                <p className="text-[13px] text-gray-300 group-hover:text-purple-300 transition-colors leading-snug">
                  {pr.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="flex flex-col bg-[#1a2235] border border-white/[0.06] rounded-xl p-5 gap-3 min-h-0">
          <div className="flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-emerald-400" />
            <h3 className="text-white font-semibold text-sm">Issues Opened</h3>
            <a
              href="https://github.com/issues?q=is%3Aissue+author%3Amohar-xe"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View all <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto">
            {openSourceData.issues.map((issue) => (
              <a
                key={issue.url}
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-white/[0.06] p-3 hover:border-emerald-400/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      issue.state === "Open"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-gray-400/10 text-gray-400"
                    }`}
                  >
                    {issue.state}
                  </span>
                  <span className="text-[11px] text-gray-500 truncate">{issue.repo}</span>
                </div>
                <p className="text-[13px] text-gray-300 group-hover:text-emerald-300 transition-colors leading-snug">
                  {issue.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("projects");
  const cards = cardDataMap[activeTab];

  return (
    <div className="min-h-screen w-screen overflow-hidden flex bg-[#0B1120]">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-[38%] max-w-[440px] min-w-[300px] min-h-screen flex flex-col justify-between border-r border-white/[0.06] px-8 py-10 bg-[#0B1120]">
        <div>
          {/* Name */}
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">Mohar </span>
            <span className="text-emerald-400">Das</span>
          </h1>

          {/* Role */}
          <p className="text-emerald-400/80 text-sm font-medium tracking-widest mt-1.5 uppercase">
            AI Engineer & Researcher
          </p>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-emerald-400/30 rounded-full mt-5 mb-5" />

          {/* Bio */}
          <p className="text-gray-400 text-[14px] leading-relaxed">
            Self-taught AI/ML engineer focused on Retrieval Systems & Agentic
            AI. Currently researching neuro-symbolic architectures at Azmth
            Lab. Available full-time, immediate start — open to remote roles.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.06] my-6" />

          {/* Contact Info */}
          <div className="flex flex-col gap-3.5">
            {contactItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[13px]">
                <span className="text-gray-500 shrink-0">{item.icon}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-400 transition-colors truncate"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-gray-400">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 text-gray-500 text-[13px] mt-8">
          <Zap className="w-4 h-4 text-emerald-400/60" />
          <span>Always building. Always shipping.</span>
        </div>
      </aside>

      {/* ===== RIGHT CONTENT ===== */}
      <main className="flex-1 min-h-screen flex flex-col bg-[#0f172a]">
        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 px-8 pt-8 pb-5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab.key
                  ? "bg-white/[0.08] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Card Grid / Open Source */}
        <div className="flex-1 px-8 pb-8">
          {activeTab === "opensource" ? (
            <OpenSourceView />
          ) : (
            <div className="grid grid-cols-2 gap-4 h-full">
              {cards.map((card, i) => (
                <ContentCard key={`${activeTab}-${i}`} card={card} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
