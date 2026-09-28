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
    title: "Paragraphs to Atomic Facts",
    description:
      "Splitting legal-news paragraphs into atomic legal propositions — a three-stage LLM pipeline, a merged check/split/fill loop, and a stage-1-only version that does it in one call, each with a fact-by-fact manual check of what the model got wrong.",
    tags: ["Legal NLP", "gemma-4-31b", "Pipeline", "Ablation"],
  },
];
