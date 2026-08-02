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
  Sparkles,
  BookOpen,
  GitFork,
  ExternalLink,
  Calendar,
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
    title: "Hybrid Graph RAG (HGR)",
    description:
      "Graph-enhanced RAG system with hierarchical chunking, entity linking and hybrid retrieval (Dense + Sparse + Graph) with RRF fusion.",
    tags: ["Python", "PGVector", "KuzuDB", "FastAPI", "RRF"],
    icon: <Network className="w-5 h-5" />,
    badge: "FEATURED",
    color: "emerald",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 cursor-pointer">
          View Project <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 120
        </span>
      </>
    ),
  },
  {
    title: "Grey – Research Intelligence Agent",
    description:
      "Personalized AI research assistant that plans, retrieves, connects ideas and generates insights using multi-agent architecture.",
    tags: ["LangGraph", "Qwen3", "Tavily", "Supabase", "MCP"],
    icon: <BrainCircuit className="w-5 h-5" />,
    badge: "FEATURED",
    color: "purple",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer">
          View Project <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 98
        </span>
      </>
    ),
  },
  {
    title: "Argus – Agent Orchestrator",
    description:
      "Unified multimodal agent orchestrator with Live Mode (fast actions) and Deep Mode (reasoning + tool use + memory).",
    tags: ["Python", "LangChain", "Groq", "FastAPI", "WebSocket"],
    icon: <Bot className="w-5 h-5" />,
    color: "amber",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 cursor-pointer">
          View Project <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 86
        </span>
      </>
    ),
  },
  {
    title: "ReviewSage – Local SaaS",
    description:
      "AI-powered review analytics platform for local businesses. Extracts insights from reviews and delivers actionable feedback.",
    tags: ["Go", "TF-IDF", "PostgreSQL", "Docker", "VPS"],
    icon: <BarChart3 className="w-5 h-5" />,
    color: "pink",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 cursor-pointer">
          View Project <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 64
        </span>
      </>
    ),
  },
];

const experienceData: CardData[] = [
  {
    title: "AI Research Engineer",
    description:
      "Leading R&D on Graph RAG architectures and multi-agent systems. Published 2 papers on retrieval-augmented generation and knowledge graphs.",
    tags: ["LLMs", "GraphRAG", "Research", "Publications"],
    icon: <Building2 className="w-5 h-5" />,
    color: "emerald",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-emerald-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2024 – Present
        </span>
      </>
    ),
  },
  {
    title: "ML Engineer – Agentic Systems",
    description:
      "Built and deployed production-grade AI agents with tool-use capabilities. Designed orchestration pipelines serving 10K+ daily users.",
    tags: ["LangGraph", "MCP", "FastAPI", "Agents"],
    icon: <Sparkles className="w-5 h-5" />,
    color: "purple",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-purple-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2023 – 2024
        </span>
      </>
    ),
  },
  {
    title: "Backend Developer – AI Products",
    description:
      "Developed scalable APIs and microservices for AI-driven SaaS products. Implemented real-time WebSocket pipelines for agent communication.",
    tags: ["Python", "Go", "Docker", "PostgreSQL"],
    icon: <Bot className="w-5 h-5" />,
    color: "amber",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-amber-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2022 – 2023
        </span>
      </>
    ),
  },
  {
    title: "Data Science Intern",
    description:
      "Built NLP pipelines for sentiment analysis and entity extraction. Automated data preprocessing workflows reducing pipeline time by 60%.",
    tags: ["NLP", "Python", "Pandas", "Scikit-learn"],
    icon: <BarChart3 className="w-5 h-5" />,
    color: "pink",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-pink-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2021 – 2022
        </span>
      </>
    ),
  },
];

const educationData: CardData[] = [
  {
    title: "M.Tech in AI & ML",
    description:
      "Specialized in deep learning, NLP, and knowledge representation. Thesis on Graph-augmented Retrieval Augmented Generation systems.",
    tags: ["Deep Learning", "NLP", "Knowledge Graphs", "Research"],
    icon: <GraduationCap className="w-5 h-5" />,
    badge: "CURRENT",
    color: "emerald",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-emerald-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2023 – 2025
        </span>
      </>
    ),
  },
  {
    title: "B.Tech in Computer Science",
    description:
      "Core coursework in algorithms, distributed systems, and machine learning. Dean’s List recipient for 4 consecutive semesters.",
    tags: ["Algorithms", "Distributed Systems", "ML"],
    icon: <BookOpen className="w-5 h-5" />,
    color: "purple",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-purple-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2019 – 2023
        </span>
      </>
    ),
  },
  {
    title: "AI Safety Research Fellowship",
    description:
      "Intensive 6-month program focused on alignment, interpretability, and safe deployment of large language models in production systems.",
    tags: ["AI Safety", "Alignment", "Interpretability"],
    icon: <Sparkles className="w-5 h-5" />,
    color: "amber",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-amber-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2024
        </span>
      </>
    ),
  },
  {
    title: "Deep Learning Specialization",
    description:
      "Completed Andrew Ng’s 5-course specialization covering neural networks, optimization, CNNs, sequence models, and Transformers.",
    tags: ["Coursera", "CNNs", "Transformers", "PyTorch"],
    icon: <BrainCircuit className="w-5 h-5" />,
    color: "pink",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-pink-400">
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" /> 2022
        </span>
      </>
    ),
  },
];

const opensourceData: CardData[] = [
  {
    title: "langchain-kuzu",
    description:
      "Official KuzuDB integration for LangChain. Enables graph-based retrieval and knowledge graph construction in LLM pipelines.",
    tags: ["LangChain", "KuzuDB", "Python", "GraphDB"],
    icon: <GitFork className="w-5 h-5" />,
    badge: "MAINTAINER",
    color: "emerald",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 cursor-pointer">
          View Repo <ExternalLink className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 340
        </span>
      </>
    ),
  },
  {
    title: "rag-fusion-py",
    description:
      "A lightweight library implementing Reciprocal Rank Fusion for combining multiple retrieval signals in RAG systems.",
    tags: ["RAG", "RRF", "Python", "Library"],
    icon: <Network className="w-5 h-5" />,
    badge: "AUTHOR",
    color: "purple",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer">
          View Repo <ExternalLink className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 215
        </span>
      </>
    ),
  },
  {
    title: "graph-chunker",
    description:
      "Hierarchical document chunking library that preserves semantic relationships. Used by 50+ projects for knowledge graph construction.",
    tags: ["Chunking", "NLP", "Graph", "Python"],
    icon: <Bot className="w-5 h-5" />,
    color: "amber",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 cursor-pointer">
          View Repo <ExternalLink className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 178
        </span>
      </>
    ),
  },
  {
    title: "Contributor – LlamaIndex",
    description:
      "Active contributor to LlamaIndex core. Added graph store integrations, improved query engine performance, and fixed 20+ issues.",
    tags: ["LlamaIndex", "TypeScript", "Core"],
    icon: <Sparkles className="w-5 h-5" />,
    color: "pink",
    footer: (
      <>
        <span className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 cursor-pointer">
          View Contributions <ExternalLink className="w-3.5 h-3.5" />
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Star className="w-3.5 h-3.5" /> 15 PRs
        </span>
      </>
    ),
  },
];

const cardDataMap: Record<TabKey, CardData[]> = {
  projects: projectsData,
  experience: experienceData,
  education: educationData,
  opensource: opensourceData,
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
  { icon: <Mail className="w-4 h-4" />, label: "mohardas19@gmail.com", href: "mailto:mohardas19@gmail.com" },
  { icon: <Phone className="w-4 h-4" />, label: "+91 98042 45845", href: "tel:+919804245845" },
  { icon: <Github className="w-4 h-4" />, label: "github.com/mohar-xe", href: "https://github.com/mohar-xe" },
  { icon: <Linkedin className="w-4 h-4" />, label: "linkedin.com/in/mohar-das", href: "https://linkedin.com/in/mohar-das" },
  { icon: <MapPin className="w-4 h-4" />, label: "Kolkata, India" },
  { icon: <Globe className="w-4 h-4" />, label: "mohar.dev", href: "https://mohar.dev" },
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
      <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-3">
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("projects");
  const cards = cardDataMap[activeTab];

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#0B1120]">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-[38%] max-w-[440px] min-w-[300px] h-screen flex flex-col justify-between border-r border-white/[0.06] px-8 py-10 bg-[#0B1120]">
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
            I build intelligent systems that reason, retrieve and act. Currently
            focused on LLMs, Agentic Systems, Graph RAG and real-world AI
            products.
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
      <main className="flex-1 h-screen flex flex-col bg-[#0f172a]">
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

        {/* Card Grid */}
        <div className="flex-1 px-8 pb-8">
          <div className="grid grid-cols-2 gap-4 h-full">
            {cards.map((card, i) => (
              <ContentCard key={`${activeTab}-${i}`} card={card} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
