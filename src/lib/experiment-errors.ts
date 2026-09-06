export type ErrorCategory =
  | "hallucinations"
  | "omissions"
  | "wrongFacts"
  | "wrongLegal"
  | "translation"
  | "terminology";

export interface ErrorDetail {
  count: number;
  details: string[];
}

export interface MethodErrors {
  hallucinations: ErrorDetail;
  omissions: ErrorDetail;
  wrongFacts: ErrorDetail;
  wrongLegal: ErrorDetail;
  translation: ErrorDetail;
  terminology: ErrorDetail;
}

export interface SampleErrors {
  sampleId: string;
  methods: { zero: MethodErrors; few: MethodErrors; cot: MethodErrors };
}

export const errorLabels: Record<ErrorCategory, string> = {
  hallucinations: "Hallucinations",
  omissions: "Omissions",
  wrongFacts: "Wrong Facts",
  wrongLegal: "Wrong Legal",
  translation: "Translation",
  terminology: "Terminology",
};

export const errorColors: Record<ErrorCategory, string> = {
  hallucinations: "#EF4444",
  omissions: "#F59E0B",
  wrongFacts: "#EAB308",
  wrongLegal: "#A855F7",
  translation: "#3B82F6",
  terminology: "#14B8A6",
};

import annotations from "../../experiments/Legal Summarization EN -> HI/annotations_raw.json";

export const errors: SampleErrors[] = annotations.map(a => ({
  sampleId: a.sampleId,
  methods: {
    zero: a.methods.zero,
    few: a.methods.few,
    cot: a.methods.cot,
  },
}));
