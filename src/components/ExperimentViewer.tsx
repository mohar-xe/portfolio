"use client";

import { useState, useMemo } from "react";
import type { Sample } from "@/lib/experiment-data";
import {
  errors,
  type ErrorCategory,
  errorLabels,
  errorColors,
} from "@/lib/experiment-errors";
import {
  highlights,
  type TextHighlight,
  type ReferenceOmission,
} from "@/lib/experiment-highlights";

const methodKeys = ["zero", "few", "cot"] as const;
type MethodKey = (typeof methodKeys)[number];

const methodLabels: Record<MethodKey, string> = {
  zero: "Zero-shot",
  few: "Few-shot",
  cot: "CoT",
};

const errorCategories: ErrorCategory[] = [
  "hallucinations",
  "omissions",
  "wrongFacts",
  "wrongLegal",
  "translation",
  "terminology",
];

function HighlightedText({
  text,
  highlightsList,
}: {
  text: string;
  highlightsList: TextHighlight[];
}) {
  const parts = useMemo(() => {
    if (highlightsList.length === 0) return [{ text, category: null }];

    const sorted = [...highlightsList].sort(
      (a, b) => b.text.length - a.text.length
    );

    const result: { text: string; category: ErrorCategory | null }[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      let earliestIdx = Infinity;
      let earliestHL: TextHighlight | null = null;

      for (const hl of sorted) {
        const idx = remaining.indexOf(hl.text);
        if (idx !== -1 && idx < earliestIdx) {
          earliestIdx = idx;
          earliestHL = hl;
        }
      }

      if (earliestHL && earliestIdx !== Infinity) {
        if (earliestIdx > 0) {
          result.push({ text: remaining.slice(0, earliestIdx), category: null });
        }
        result.push({
          text: remaining.slice(earliestIdx, earliestIdx + earliestHL.text.length),
          category: earliestHL.category,
        });
        remaining = remaining.slice(earliestIdx + earliestHL.text.length);
      } else {
        result.push({ text: remaining, category: null });
        break;
      }
    }

    return result;
  }, [text, highlightsList]);

  return (
    <>
      {parts.map((part, i) =>
        part.category ? (
          <mark
            key={i}
            className="rounded-sm px-0.5"
            style={{
              backgroundColor: `${errorColors[part.category]}25`,
              color: errorColors[part.category],
              borderBottom: `2px solid ${errorColors[part.category]}`,
            }}
            title={errorLabels[part.category]}
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

function ReferenceText({
  text,
  omissions,
}: {
  text: string;
  omissions: ReferenceOmission[];
}) {
  const parts = useMemo(() => {
    const sorted = [...omissions].sort((a, b) => b.text.length - a.text.length);

    const result: {
      text: string;
      methods: ("zero" | "few" | "cot")[] | null;
    }[] = [];
    let remaining = text;

    while (remaining.length > 0) {
      let earliestIdx = Infinity;
      let earliestOmit: ReferenceOmission | null = null;

      for (const om of sorted) {
        const idx = remaining.indexOf(om.text);
        if (idx !== -1 && idx < earliestIdx) {
          earliestIdx = idx;
          earliestOmit = om;
        }
      }

      if (earliestOmit && earliestIdx !== Infinity) {
        if (earliestIdx > 0) {
          result.push({
            text: remaining.slice(0, earliestIdx),
            methods: null,
          });
        }
        result.push({
          text: remaining.slice(
            earliestIdx,
            earliestIdx + earliestOmit.text.length
          ),
          methods: earliestOmit.methods,
        });
        remaining = remaining.slice(
          earliestIdx + earliestOmit.text.length
        );
      } else {
        result.push({ text: remaining, methods: null });
        break;
      }
    }

    return result;
  }, [text, omissions]);

  return (
    <>
      {parts.map((part, i) =>
        part.methods ? (
          <mark
            key={i}
            className="rounded-sm px-0.5 bg-amber-400/20 border-b-2 border-amber-500"
            title={`Omitted by: ${part.methods.map((m) => methodLabels[m]).join(", ")}`}
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

function ErrorAnnotations({ sampleIdx, method }: { sampleIdx: number; method: MethodKey }) {
  const [openCats, setOpenCats] = useState<Set<ErrorCategory>>(new Set());
  const sampleErrors = errors[sampleIdx];
  if (!sampleErrors) return null;
  const methodErrors = sampleErrors.methods[method];

  const toggle = (cat: ErrorCategory) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const totalErrors = errorCategories.reduce(
    (sum, cat) => sum + methodErrors[cat].count,
    0
  );

  return (
    <div className="mt-4 pt-3 border-t border-foreground/10">
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-foreground/50">
        {totalErrors} errors · click a type to expand
      </p>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {errorCategories.map((cat) => {
          const count = methodErrors[cat].count;
          if (count === 0) return null;
          const isOpen = openCats.has(cat);
          return (
            <button
              key={cat}
              onClick={() => toggle(cat)}
              className="inline-flex items-center gap-1 font-mono text-[0.6rem] px-1.5 py-0.5 rounded transition-opacity hover:opacity-80"
              style={{
                backgroundColor: isOpen ? `${errorColors[cat]}30` : `${errorColors[cat]}15`,
                color: errorColors[cat],
                border: `1px solid ${errorColors[cat]}${isOpen ? "60" : "30"}`,
              }}
            >
              {isOpen ? "−" : "+"} {errorLabels[cat]}: {count}
            </button>
          );
        })}
      </div>

      <div className="mt-2 space-y-3">
        {errorCategories.map((cat) => {
          if (!openCats.has(cat)) return null;
          const detail = methodErrors[cat];
          if (detail.details.length === 0) return null;
          return (
            <div key={cat}>
              <p
                className="font-mono text-[0.6rem] uppercase tracking-widest mb-1"
                style={{ color: errorColors[cat] }}
              >
                {errorLabels[cat]}
              </p>
              <ul className="space-y-0.5">
                {detail.details.map((d, i) => (
                  <li key={i} className="text-xs text-foreground/70 pl-3 relative">
                    <span
                      className="absolute left-0 top-[0.45em] w-1 h-1 rounded-full"
                      style={{ backgroundColor: errorColors[cat] }}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.6rem] font-mono text-foreground/50 mb-6">
      <span className="uppercase tracking-widest">Errors:</span>
      {errorCategories.map((cat) => (
        <span key={cat} className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm inline-block"
            style={{ backgroundColor: errorColors[cat] }}
          />
          {errorLabels[cat]}
        </span>
      ))}
    </div>
  );
}

export default function ExperimentViewer({ data }: { data: Sample[] }) {
  const [selected, setSelected] = useState(0);
  const [showHighlights, setShowHighlights] = useState(true);
  const sample = data[selected];

  const sampleHL = highlights[selected];

  return (
    <div className="mt-10">
      {/* Sample selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((s, i) => (
          <button
            key={s.sampleId}
            onClick={() => setSelected(i)}
            className={`font-mono text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors duration-150 ${
              i === selected
                ? "bg-foreground text-background border-foreground"
                : "border-foreground/20 hover:border-foreground/50"
            }`}
          >
            {s.sampleId.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Toggle + Legend row */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className={`font-mono text-[0.65rem] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-150 ${
            showHighlights
              ? "bg-foreground text-background border-foreground"
              : "border-foreground/20 hover:border-foreground/50"
          }`}
        >
          {showHighlights ? "Highlights on" : "Highlights off"}
        </button>
      </div>

      <Legend />

      {/* 4-column output grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* HI Reference column */}
        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            HI Reference
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {showHighlights && sampleHL ? (
              <ReferenceText
                text={sample.hiReference}
                omissions={sampleHL.referenceOmissions}
              />
            ) : (
              sample.hiReference
            )}
          </div>
        </div>

        {/* Output columns with error annotations */}
        {(
          [
            { key: "zeroShot" as const, method: "zero" as MethodKey },
            { key: "fewShot" as const, method: "few" as MethodKey },
            { key: "cot" as const, method: "cot" as MethodKey },
          ] as const
        ).map(({ key, method }) => (
          <div key={key} className="flex flex-col">
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
              {methodLabels[method]}
            </h3>
            <div className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {showHighlights && sampleHL ? (
                <HighlightedText
                  text={sample[key]}
                  highlightsList={sampleHL.methods[method]}
                />
              ) : (
                sample[key]
              )}
            </div>
            <ErrorAnnotations sampleIdx={selected} method={method} />
          </div>
        ))}
      </div>
    </div>
  );
}
