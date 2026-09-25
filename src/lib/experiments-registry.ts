export interface Experiment {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export const experiments: Experiment[] = [
  {
    slug: "legal-summarization",
    title: "Legal Summarization EN → HI",
    description:
      "Comparing zero-shot, few-shot, and chain-of-thought prompting for English→Hindi legal text summarization on the MILDSum dataset using Qwen3.5-4B (Q4_K_M).",
    tags: ["LLM", "Qwen3.5-4B", "Prompting", "Hindi", "Evaluation"],
  },
  {
    slug: "legal-atomizer",
    title: "Legal Proposition Atomizer",
    description:
      "Splitting legal-news paragraphs into atomic legal propositions with a three-stage LLM pipeline — 92 to 39 calls by batching per paragraph, and the failure modes I only found by reading the output.",
    tags: ["Legal NLP", "gemma-4-31b", "Pipeline", "Ablation"],
  },
];
