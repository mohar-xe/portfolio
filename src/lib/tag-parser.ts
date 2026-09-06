export type ErrorCategory =
  | "hallucinations"
  | "omissions"
  | "wrongFacts"
  | "wrongLegal"
  | "translation"
  | "terminology";

export interface TaggedPart {
  text: string;
  category: ErrorCategory | null;
}

const TAG_MAP: Record<string, ErrorCategory> = {
  hallucination_error: "hallucinations",
  omission_error: "omissions",
  wrong_facts_error: "wrongFacts",
  wrong_legal_error: "wrongLegal",
  translation_error: "translation",
  terminology_error: "terminology",
  reference_omission_error: "omissions",
};

const TAG_RE = /<(hallucination_error|omission_error|wrong_facts_error|wrong_legal_error|translation_error|terminology_error|reference_omission_error)>([\s\S]*?)<\/\1>/g;

export function parseTaggedText(text: string): TaggedPart[] {
  const parts: TaggedPart[] = [];
  let lastIdx = 0;

  for (const match of text.matchAll(TAG_RE)) {
    const start = match.index!;
    if (start > lastIdx) {
      parts.push({ text: text.slice(lastIdx, start), category: null });
    }
    parts.push({
      text: match[2],
      category: TAG_MAP[match[1]] ?? null,
    });
    lastIdx = start + match[0].length;
  }

  if (lastIdx < text.length) {
    parts.push({ text: text.slice(lastIdx), category: null });
  }

  return parts;
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

export const errorCategories: ErrorCategory[] = [
  "hallucinations",
  "omissions",
  "wrongFacts",
  "wrongLegal",
  "translation",
  "terminology",
];
