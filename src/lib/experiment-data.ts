import type { ErrorCategory } from "./tag-parser";

import taggedFinal from "../../experiments/Legal Summarization EN -> HI/tagged_final.json";
import samplesExtracted from "../../experiments/Legal Summarization EN -> HI/samples_extracted.json";
import confirmedErrors from "../../experiments/Legal Summarization EN -> HI/confirmed_errors.json";

export type Verdict =
  | "confirmed"
  | "partially_confirmed"
  | "confirmed_with_rendering_bug"
  | "debunked"
  | "debunked_misattributed";

export interface AnnotationDetail {
  tag: string;
  category: ErrorCategory;
  verdict: Verdict;
  claimedError: string;
  explanation: string;
  tagged: string;
}

export interface ReferenceOmission {
  tag: string;
  category: ErrorCategory;
  verdict: Verdict;
  claimedError: string;
  missingText: string;
  explanation: string;
  tagged: string;
}

export interface TaggedSection {
  sampleId: string;
  method: string;
  methodLabel: string;
  originalText: string;
  taggedText: string;
  annotationDetails: AnnotationDetail[];
  referenceOmissions: ReferenceOmission[];
}

export interface Sample {
  sampleId: string;
  hiReference: string;
  zeroShot: string;
  fewShot: string;
  cot: string;
}

const sections = taggedFinal.sections as TaggedSection[];

export const sampleIds = [
  ...new Set(sections.map((s) => s.sampleId)),
].sort(
  (a, b) => Number(a.split("_")[1]) - Number(b.split("_")[1])
);

export function getSectionsForSample(sampleId: string): TaggedSection[] {
  return sections.filter((s) => s.sampleId === sampleId);
}

export function getSection(
  sampleId: string,
  method: string
): TaggedSection | undefined {
  return sections.find((s) => s.sampleId === sampleId && s.method === method);
}

export const experiments: Sample[] = Object.entries(samplesExtracted)
  .sort(
    ([a], [b]) =>
      Number(a.split("_")[1]) - Number(b.split("_")[1])
  )
  .map(([id, data]) => ({
    sampleId: id,
    hiReference: data.hiReference,
    zeroShot: data.zeroShot,
    fewShot: data.fewShot,
    cot: data.cot,
  }));

export function getErrorCounts(
  sampleId: string,
  method: string
): Map<ErrorCategory, number> {
  const counts = new Map<ErrorCategory, number>();
  for (const e of confirmedErrors.confirmedErrors) {
    if (e.sampleId !== sampleId || e.method !== method) continue;
    if (e.verdict === "debunked" || e.verdict === "debunked_misattributed")
      continue;
    const cat = e.category as ErrorCategory;
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return counts;
}
