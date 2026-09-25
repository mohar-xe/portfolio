import atomizerData from "../../experiments/Legal Proposition Atomizer/atomizer_data.json";

export type AtomicVerdict = boolean | null;

export interface AtomizerFact {
  id: string | null;
  fact: string;
  depth: number;
  parentId: string | null;
  atomic?: AtomicVerdict;
  atomicConfidence?: number | null;
  atomicReason?: string | null;
  entailed?: AtomicVerdict;
  entailmentConfidence?: number | null;
  entailmentReason?: string | null;
  origin?: string | null;
  unresolved?: boolean;
  sourceIndex?: number;
}

export interface AtomizerParagraph {
  id: number;
  text: string;
  stage1: AtomizerFact[];
  final: AtomizerFact[];
  gaps: { missing_fact: string }[];
  gapsFilled: number;
  coverageClosed: boolean;
  perFactRun: { stage1: AtomizerFact[]; final: AtomizerFact[] };
}

export interface AtomizerIteration {
  id: string;
  label: string;
  model: string;
  schema: string;
  paragraphs: number;
  calls: number | null;
  facts: number;
  deeper: number;
  unresolved: number;
  gaps: number;
  artifacts: string;
  note: string;
}

export interface AtomizerData {
  article: { title: string; url: string };
  headline: {
    paragraphs: number;
    callsPerRun: number;
    facts: number;
    deeperFacts: number;
    unresolved: number;
    gaps: number;
  };
  legacy: { id: number; text: string; facts: AtomizerFact[] };
  iterations: AtomizerIteration[];
  ablation: { label: string; calls: number; delta: number | null; lost: string }[];
  issues: { title: string; status: string; detail: string }[];
  paragraphs: AtomizerParagraph[];
}

export const atomizer = atomizerData as AtomizerData;
