export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "hybrid-graph-rag",
    title: "Why I built a hybrid graph RAG",
    date: "2026-08-10",
    readTime: "7 min read",
    excerpt:
      "Dense vectors alone weren't cutting it on multi-hop questions. Fusing HNSW, BM25 and knowledge-graph traversal with Reciprocal Rank Fusion changed the numbers — 29% → 52% Exact Match from KG traversal alone.",
    content: [
      {
        type: "p",
        text: "Retrieval systems ship with a default assumption: embed everything, retrieve by cosine distance, call it done. That assumption breaks on questions that need two or more facts chained together. A question like \"which country has a national dish containing rice, and who wrote a famous poem about that country's capital?\" demands a retrieval signal no single vector can express.",
      },
      {
        type: "p",
        text: "The fix I landed on is an 8-stage hybrid pipeline. Dense retrieval over HNSW and sparse BM25 run in parallel; a knowledge-graph traversal over KuzuDB contributes structured path evidence; then Reciprocal Rank Fusion merges the three ranked lists before a cross-encoder reranker picks the final context.",
      },
      {
        type: "h2",
        text: "The ablation that changed my mind",
      },
      {
        type: "p",
        text: "On HotpotQA, the dense-only baseline sat at 29% Exact Match. Adding the knowledge-graph traversal stage lifted it to 52% — before any reranking. The full pipeline lands at 66% F1, 80% answer recall, 82% Hit@5 and 90% answer-in-context.",
      },
      {
        type: "p",
        text: "The KG stage doesn't win on every query. On simple lookups it adds latency and noise. The interesting engineering problem is routing: knowing when to pay the graph traversal cost. I went with a cheap classifier that peeks at the query and the top fused candidates.",
      },
      {
        type: "ul",
        items: [
          "PostgreSQL/pgvector for dense vectors with an HNSW index",
          "KuzuDB for the knowledge graph and cypher-style traversal",
          "Cross-encoder reranker over the fused candidate set",
          "FastAPI + Docker for a deployable service",
        ],
      },
      {
        type: "p",
        text: "The code lives in the Hybrid-RAG repo. If you're building retrieval over multi-hop questions, the graph stage is worth the complexity.",
      },
    ],
  },
  {
    slug: "kan-from-scratch",
    title: "KANs from scratch: rediscovering physics equations",
    date: "2026-07-22",
    readTime: "5 min read",
    excerpt:
      "A Kolmogorov–Arnold Network built from zero dependencies, trained on noisy measurements until it recovered a physics equation. What the KAN architecture gets right and where it still hurts.",
    content: [
      {
        type: "p",
        text: "The Kolmogorov–Arnold theorem says any multivariate function can be written as a sum of univariate functions. A KAN exploits exactly that: learnable B-spline activations on edges instead of fixed activations on nodes. The payoff is interpretability — the learned edge functions can be inspected, simplified, and turned back into equations.",
      },
      {
        type: "p",
        text: "I built a from-scratch KAN in pure Python — no autograd, no framework. Spline basis computation, grid adaptation, and the L1 regularization on activation weights that forces the network toward sparsity.",
      },
      {
        type: "h2",
        text: "Recovering the equation",
      },
      {
        type: "p",
        text: "Trained on noisy samples of a damped-oscillator-style function, the sparse KAN converged to the expected structure: a handful of active edge functions that symbolically matched the ground-truth terms. The sparse shape — not the final numeric accuracy — is the win. That is what you cannot get from a dense MLP.",
      },
      {
        type: "ul",
        items: [
          "From-scratch B-spline basis with grid refinement",
          "L1 penalty on activation norms for sparsity",
          "Symbolic post-processing of learned edge functions",
          "Noise robustness tested at several SNR levels",
        ],
      },
      {
        type: "p",
        text: "KANs are slower to train and finicky about grid size. But when your goal is scientific insight rather than benchmark scores, being able to read the network's reasoning is a trade I will take.",
      },
    ],
  },
  {
    slug: "reimplementing-logic-lm",
    title: "Reimplementing Logic-LM: LLMs with symbolic solvers",
    date: "2026-07-05",
    readTime: "6 min read",
    excerpt:
      "The EMNLP 2023 Logic-LM paper pairs LLMs with external solvers for logical reasoning. Rebuilding it from scratch taught me where the LLM ends and the solver begins.",
    content: [
      {
        type: "p",
        text: "LLMs pattern-match well and reason poorly. Logic-LM's bet is: don't ask the LLM to solve the problem — ask it to translate the problem into a formal language, then hand the translation to a deterministic solver.",
      },
      {
        type: "p",
        text: "The pipeline in the paper is simple and effective: natural language question → LLM generates a formal representation (SAT, first-order logic, constraint program) → solver runs it → answer is read out. Failures get re-attempted with additional prompting until the program is parseable.",
      },
      {
        type: "h2",
        text: "What from-scratch reimplementation teaches",
      },
      {
        type: "p",
        text: "Most of the failure modes live in the translation step, not the solver. Variables that never get declared, constraints that contradict the premise, solvers fed malformed input. Getting the LLM to produce parseable, well-typed programs — and detecting when it hasn't — is the real engineering surface.",
      },
      {
        type: "ul",
        items: [
          "Formalization prompts per problem family (SAT/FOL/CP)",
          "Parser + validator that rejects malformed solver input",
          "Retry loop with error feedback to the LLM",
          "Evaluation harness mirroring the paper's benchmarks",
        ],
      },
      {
        type: "p",
        text: "The takeaway is a division of labor: neural for the ambiguous translation, symbolic for the exact computation. It is the same division of labor running through everything I build.",
      },
    ],
  },
  {
    slug: "bisociation-agentic-research",
    title: "Bisociation in agentic research systems",
    date: "2026-06-18",
    readTime: "8 min read",
    excerpt:
      "Arthur Koestler called the intersection of two unrelated frames of reference 'bisociation'. The Grey framework operationalizes it as a routing problem in a 9-agent LangGraph pipeline.",
    content: [
      {
        type: "p",
        text: "Research is not linear. A useful idea often comes from a concept in one domain colliding with an unrelated one. Koestler called that collision bisociation — thinking on two planes at once instead of one.",
      },
      {
        type: "p",
        text: "Grey is my attempt to build that into an agentic research system. Instead of a single chain of reasoning, nine agents run in a LangGraph pipeline with qualifier-driven routing: the qualifier agent decides which frame of reference a query belongs to, and the routing stage decides which agents should look at it together.",
      },
      {
        type: "h2",
        text: "Where the bisociation actually happens",
      },
      {
        type: "p",
        text: "The system doesn't fake creativity — it manufactures collisions. Queries are decomposed and re-presented to agents specialized in unrelated domains, then a synthesis agent scores the intersections. The critique loop gives each proposed connection an adversarial review before it ever reaches the final answer.",
      },
      {
        type: "ul",
        items: [
          "9-agent LangGraph pipeline with persistent workflow state",
          "Per-node error boundaries so one failure doesn't kill the run",
          "Automated critique loops over candidate connections",
          "Metrics-first evaluation suite for every stage",
        ],
      },
      {
        type: "p",
        text: "The honest summary: routing is where the quality lives. The models are interchangeable; the state machine and the evaluation harness are the product.",
      },
    ],
  },
];
