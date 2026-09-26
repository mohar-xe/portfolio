import atomizerData from "../../experiments/Legal Proposition Atomizer/atomizer_data.json";
import manualEvalData from "../../experiments/Legal Proposition Atomizer/manual_eval.json";

export type AtomicVerdict = boolean | null;
export type ManualVerdict = "correct" | "incorrect";

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
  manualVerdict?: ManualVerdict;
  manualFlags?: string[];
}

export interface AtomizerParagraph {
  id: number;
  text: string;
  stage1: AtomizerFact[];
  final: AtomizerFact[];
  gaps: { missing_fact: string }[];
  gapsFilled: number;
  coverageClosed: boolean;
  tags?: string[];
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
  ablation: { label: string; calls: number; delta: number | null; lost: string }[];
  paragraphs: AtomizerParagraph[];
}

interface ManualEvalFile {
  runs: Record<string, { label: string; verdicts: Record<string, ManualVerdict> }>;
  factFlags?: Record<string, string[]>;
  paragraphTags?: Record<string, string[]>;
}

const manualEval = manualEvalData as ManualEvalFile;
const verdicts = manualEval.runs.current?.verdicts ?? {};
const factFlags = manualEval.factFlags ?? {};
const paragraphTags = manualEval.paragraphTags ?? {};

function applyVerdicts(facts: AtomizerFact[]): AtomizerFact[] {
  return facts.map((fact) => {
    if (!fact.id) return fact;
    const manualVerdict = fact.id in verdicts ? verdicts[fact.id] : undefined;
    const flags = factFlags[fact.id];
    if (manualVerdict === undefined && !flags) return fact;
    return {
      ...fact,
      ...(manualVerdict ? { manualVerdict } : {}),
      ...(flags ? { manualFlags: flags } : {}),
    };
  });
}

const raw = atomizerData as AtomizerData;

export const atomizer: AtomizerData = {
  article: raw.article,
  headline: raw.headline,
  ablation: raw.ablation,
  paragraphs: raw.paragraphs.map((paragraph) => {
    const tags = paragraphTags[`p${paragraph.id}`];
    return {
      id: paragraph.id,
      text: paragraph.text,
      stage1: applyVerdicts(paragraph.stage1),
      final: applyVerdicts(paragraph.final),
      gaps: paragraph.gaps,
      gapsFilled: paragraph.gapsFilled,
      coverageClosed: paragraph.coverageClosed,
      ...(tags ? { tags } : {}),
    };
  }),
};

export function manualEvalTotals() {
  let correct = 0;
  let incorrect = 0;
  for (const verdict of Object.values(verdicts)) {
    if (verdict === "correct") correct += 1;
    else incorrect += 1;
  }
  return { correct, incorrect, total: correct + incorrect };
}
