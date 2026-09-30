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
  /** v7: stage 1 alone, no downstream stage to show */
  stage1Run?: AtomizerRun;
  /** v8: an AMR graph per paragraph, no LLM anywhere */
  amrRun?: AtomizerRun;
}

interface ManualEvalRun {
  label: string;
  verdicts: Record<string, ManualVerdict>;
  flags?: Record<string, string[]>;
}

interface ManualEvalFile {
  runs: Record<string, ManualEvalRun>;
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
const threeStageLabels = manualEval.runs.current;
const mergedLabels = manualEval.runs.merged;
const stage1Labels = manualEval.runs.stage1;
const amrLabels = manualEval.runs.amr;
const paragraphTags = manualEval.paragraphTags ?? {};

/**
 * manual_eval.json holds one entry per run. `runs.current` is the three-stage run, keyed by its
 * own fact ids. `runs.merged` is the stage23 run, keyed by the ids in data/merged, which is what
 * a hand pass over the merged run fills in.
 *
 * The two runs renumber the same claims, so the three-stage labels are also indexed by claim text
 * and used as a fallback: 46 of 56 match a merged claim. Precedence for a fact is
 *
 *   its own id  ->  the carried-over label  ->  unlabelled
 *
 * A label keyed to the run's own id always wins, so a hand pass over the merged run overrides
 * anything carried over. A reworded claim is never treated as checked because a differently
 * worded claim was: the 10 that do not match are rewordings, and one of them changed meaning -
 * p2-l1-f2, where the merged run corrects "the court stated" to "the bench stated" - which is
 * exactly why they fall through to unlabelled and get counted in the UI.
 */
function buildCarried(threeStageFacts: AtomizerFact[]): {
  verdicts: Map<string, ManualVerdict>;
  flags: Map<string, string[]>;
} {
  const keyById = new Map<string, string>();
  for (const fact of threeStageFacts) {
    if (fact.id) keyById.set(fact.id, claimKey(fact.fact));
  }
  const verdictsByClaim = new Map<string, ManualVerdict>();
  const flagsByClaim = new Map<string, string[]>();
  for (const [id, verdict] of Object.entries(threeStageLabels?.verdicts ?? {})) {
    const key = keyById.get(id);
    if (key) verdictsByClaim.set(key, verdict);
  }
  for (const [id, flags] of Object.entries(manualEval.factFlags ?? {})) {
    const key = keyById.get(id);
    if (key && flags.length > 0) flagsByClaim.set(key, flags);
  }
  return { verdicts: verdictsByClaim, flags: flagsByClaim };
}

function applyVerdicts(
  facts: AtomizerFact[],
  labels: { verdicts: Record<string, ManualVerdict>; flags: Record<string, string[]> },
  carried: { verdicts: Map<string, ManualVerdict>; flags: Map<string, string[]> },
): AtomizerFact[] {
  return facts.map((fact) => {
    const key = claimKey(fact.fact);
    const manualVerdict =
      (fact.id ? labels.verdicts[fact.id] : undefined) ?? carried.verdicts.get(key);
    const flags = (fact.id ? labels.flags[fact.id] : undefined) ?? carried.flags.get(key);
    if (manualVerdict === undefined && (!flags || flags.length === 0)) return fact;
    return {
      ...fact,
      ...(manualVerdict ? { manualVerdict } : {}),
      ...(flags && flags.length > 0 ? { manualFlags: flags } : {}),
    };
  });
}

const raw = atomizerData as AtomizerData;

function decorateRun(
  run: AtomizerRun,
  labels: { verdicts: Record<string, ManualVerdict>; flags: Record<string, string[]> },
  carried: { verdicts: Map<string, ManualVerdict>; flags: Map<string, string[]> },
): AtomizerRun {
  return {
    ...run,
    paragraphs: run.paragraphs.map((paragraph) => {
      const tags = paragraphTags[`p${paragraph.id}`];
      return {
        ...paragraph,
        stage1: applyVerdicts(paragraph.stage1, labels, carried),
        final: applyVerdicts(paragraph.final, labels, carried),
        ...(tags ? { tags } : {}),
      };
    }),
  };
}

const carried = buildCarried(raw.paragraphs.flatMap((p) => p.final));

const threeStage = decorateRun(
  raw,
  { verdicts: threeStageLabels?.verdicts ?? {}, flags: manualEval.factFlags ?? {} },
  carried,
);
const merged = raw.mergedRun
  ? decorateRun(raw.mergedRun, { verdicts: mergedLabels?.verdicts ?? {}, flags: mergedLabels?.flags ?? {} }, carried)
  : null;
// v7 carries its own hand pass in manual_eval.json. flags is per-run, not the
// global factFlags, so p4-l1-f3's "redundant" does not leak onto the other runs'
// fact with the same id.
const stage1Only = raw.stage1Run
  ? decorateRun(
      raw.stage1Run,
      { verdicts: stage1Labels?.verdicts ?? {}, flags: stage1Labels?.flags ?? {} },
      carried,
    )
  : null;
/**
 * v8. The AMR arm emits text the other runs never produced, so `carried` is empty
 * rather than shared: a verdict on a differently-worded v5 claim is not a verdict
 * on this sentence, and the run is published precisely because none of these facts
 * have been read yet. The check it needs is its own.
 */
const amrGraph = raw.amrRun
  ? decorateRun(
      raw.amrRun,
      { verdicts: amrLabels?.verdicts ?? {}, flags: amrLabels?.flags ?? {} },
      { verdicts: new Map(), flags: new Map() },
    )
  : null;

/** The three-stage run, unchanged in shape, for anything already importing this. */
export const atomizer: AtomizerData = { ...threeStage, article: raw.article };

export const runs: {
  threeStage: AtomizerRun;
  merged: AtomizerRun | null;
  stage1: AtomizerRun | null;
  amr: AtomizerRun | null;
} = {
  threeStage,
  merged,
  stage1: stage1Only,
  amr: amrGraph,
};

/**
 * Derived from the facts actually on screen, not from a module constant, so the
 * count cannot describe a different run than the one being displayed.
 */
export function manualEvalTotals(facts: AtomizerFact[]) {  let correct = 0;
  let incorrect = 0;
  for (const fact of facts) {
    if (fact.manualVerdict === "correct") correct += 1;
    else if (fact.manualVerdict === "incorrect") incorrect += 1;
  }
  const judged = correct + incorrect;
  return { correct, incorrect, total: judged, unlabelled: facts.length - judged };
}

/**
 * Compares two runs' claims for one paragraph by claim key, so the UI can say which
 * are genuinely different rather than inferring it from the count. Several paragraphs
 * have the same number of facts in both runs: p7, p8, p11 and p12 are identical claim
 * sets, while p1 and p5 differ only in wording. A count-only comparison calls all six
 * "the same" and is wrong about two of them.
 */
export function claimDiff(left: AtomizerParagraph, right: AtomizerParagraph) {
  const leftKeys = new Set(left.final.map((fact) => claimKey(fact.fact)));
  const rightKeys = new Set(right.final.map((fact) => claimKey(fact.fact)));
  let shared = 0;
  for (const key of leftKeys) {
    if (rightKeys.has(key)) shared += 1;
  }
  return { leftOnly: leftKeys.size - shared, rightOnly: rightKeys.size - shared, shared };
}
