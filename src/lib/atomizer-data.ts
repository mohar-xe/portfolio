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

export interface AtomizerRunHeadline {
  paragraphs: number;
  callsPerRun: number;
  facts: number;
  deeperFacts: number;
  unresolved: number;
  gaps: number;
  /** only the merged run reports this: facts the loop never got to judge */
  unverified?: number;
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
  iterations?: number;
}

export interface AtomizerRun {
  headline: AtomizerRunHeadline;
  ablation: { label: string; calls: number; delta: number | null; lost: string }[];
  paragraphs: AtomizerParagraph[];
}

export interface AtomizerData extends AtomizerRun {
  article: { title: string; url: string };
  /** added alongside the three-stage payload, which is emitted unchanged */
  mergedRun?: AtomizerRun;
}

interface ManualEvalFile {
  runs: Record<string, { label: string; verdicts: Record<string, ManualVerdict> }>;
  factFlags?: Record<string, string[]>;
  paragraphTags?: Record<string, string[]>;
}

/** Must match normalize() in p2facts/stage1_facts.py, which produces the keys. */
function claimKey(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\.+$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .join(" ");
}

const manualEval = manualEvalData as ManualEvalFile;
const verdicts = manualEval.runs.current?.verdicts ?? {};
const factFlags = manualEval.factFlags ?? {};
const paragraphTags = manualEval.paragraphTags ?? {};

/**
 * manual_eval.json keys its 56 verdicts by the three-stage fact id. The merged run
 * renumbers every fact, so those ids only resolve there by claim text: 46 of 56
 * verdicts match a merged claim.
 *
 * The 10 that do not are rewordings, not missing claims. One of them, p2-l1-f2,
 * changed meaning - the merged run corrected the actor from "the court" to "the
 * bench" - so a changed claim deliberately inherits no verdict. Anything unlabelled
 * is counted in the UI rather than assumed correct.
 */
function buildVerdictByClaim(threeStageFacts: AtomizerFact[]): Map<string, ManualVerdict> {
  const keyById = new Map<string, string>();
  for (const fact of threeStageFacts) {
    if (fact.id) keyById.set(fact.id, claimKey(fact.fact));
  }
  const byClaim = new Map<string, ManualVerdict>();
  for (const [id, verdict] of Object.entries(verdicts)) {
    const key = keyById.get(id);
    if (key) byClaim.set(key, verdict);
  }
  return byClaim;
}

function applyVerdicts(
  facts: AtomizerFact[],
  byClaim: Map<string, ManualVerdict>,
): AtomizerFact[] {
  return facts.map((fact) => {
    const byId = fact.id ? verdicts[fact.id] : undefined;
    const manualVerdict = byId ?? byClaim.get(claimKey(fact.fact));
    // flags are keyed by three-stage id too; they map by claim, but the prose of
    // "duplicate of p4-l1-f3" names an id that means something else in the merged run
    const flags = fact.id ? factFlags[fact.id] : undefined;
    if (manualVerdict === undefined && !flags) return fact;
    return {
      ...fact,
      ...(manualVerdict ? { manualVerdict } : {}),
      ...(flags && flags.length > 0 ? { manualFlags: flags } : {}),
    };
  });
}

const raw = atomizerData as AtomizerData;

function decorateRun(run: AtomizerRun, byClaim: Map<string, ManualVerdict>): AtomizerRun {
  return {
    ...run,
    paragraphs: run.paragraphs.map((paragraph) => {
      const tags = paragraphTags[`p${paragraph.id}`];
      return {
        ...paragraph,
        stage1: applyVerdicts(paragraph.stage1, byClaim),
        final: applyVerdicts(paragraph.final, byClaim),
        ...(tags ? { tags } : {}),
      };
    }),
  };
}

const byClaim = buildVerdictByClaim(raw.paragraphs.flatMap((p) => p.final));

const threeStage = decorateRun(raw, byClaim);
const merged = raw.mergedRun ? decorateRun(raw.mergedRun, byClaim) : null;

/** The three-stage run, unchanged in shape, for anything already importing this. */
export const atomizer: AtomizerData = { ...threeStage, article: raw.article };

export const runs: { threeStage: AtomizerRun; merged: AtomizerRun | null } = {
  threeStage,
  merged,
};

/**
 * Derived from the facts actually on screen, not from a module constant, so the
 * count cannot describe a different run than the one being displayed.
 */
export function manualEvalTotals(facts: AtomizerFact[]) {
  let correct = 0;
  let incorrect = 0;
  for (const fact of facts) {
    if (fact.manualVerdict === "correct") correct += 1;
    else if (fact.manualVerdict === "incorrect") incorrect += 1;
  }
  const judged = correct + incorrect;
  return { correct, incorrect, total: judged, unlabelled: facts.length - judged };
}
