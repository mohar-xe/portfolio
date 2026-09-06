"use client";

import { useState, useMemo } from "react";
import type { Sample } from "@/lib/experiment-data";
import {
  getSectionsForSample,
  getErrorCounts,
  getErrorDetails,
  type ReferenceOmission,
  type ConfirmedError,
} from "@/lib/experiment-data";
import {
  parseTaggedText,
  errorLabels,
  errorColors,
  errorCategories,
  type ErrorCategory,
  type TaggedPart,
} from "@/lib/tag-parser";

const methodKeys = ["zero", "few", "cot"] as const;
type MethodKey = (typeof methodKeys)[number];

const methodLabels: Record<MethodKey, string> = {
  zero: "Zero-shot",
  few: "Few-shot",
  cot: "CoT",
};

const verdictLabels: Record<string, string> = {
  confirmed: "confirmed",
  partially_confirmed: "partial",
  confirmed_with_rendering_bug: "render bug",
  debunked: "debunked",
  debunked_misattributed: "misattributed",
};

const verdictColors: Record<string, string> = {
  confirmed: "#22C55E",
  partially_confirmed: "#F59E0B",
  confirmed_with_rendering_bug: "#A855F7",
  debunked: "#EF4444",
  debunked_misattributed: "#EF4444",
};

function TaggedText({ taggedText }: { taggedText: string }) {
  const parts = useMemo(() => parseTaggedText(taggedText), [taggedText]);

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

function OmissionPart({
  part,
  methods,
}: {
  part: TaggedPart;
  methods: ("zero" | "few" | "cot")[] | null;
}) {
  if (!methods) return <span>{part.text}</span>;
  return (
    <mark
      className="rounded-sm px-0.5 bg-amber-400/20 border-b-2 border-amber-500"
      title={`Omitted by: ${methods.map((m) => methodLabels[m]).join(", ")}`}
    >
      {part.text}
    </mark>
  );
}

function findOmissionParts(
  text: string,
  omissions: ReferenceOmission[]
): TaggedPart[] {
  if (omissions.length === 0) return [{ text, category: null }];

  const parts: TaggedPart[] = [];
  let remaining = text;

  for (const om of omissions) {
    const idx = remaining.indexOf(om.missingText);
    if (idx === -1) continue;

    if (idx > 0) {
      parts.push({ text: remaining.slice(0, idx), category: null });
    }
    parts.push({ text: om.missingText, category: "omissions" });
    remaining = remaining.slice(idx + om.missingText.length);
  }

  if (remaining.length > 0) {
    parts.push({ text: remaining, category: null });
  }

  return parts.length > 0 ? parts : [{ text, category: null }];
}

function ReferenceText({
  text,
  omissions,
}: {
  text: string;
  omissions: ReferenceOmission[];
}) {
  const methodsByText = useMemo(() => {
    const map = new Map<string, ("zero" | "few" | "cot")[]>();
    for (const om of omissions) {
      const existing = map.get(om.missingText);
      const method = om.claimedError.includes("zero")
        ? "zero"
        : om.claimedError.includes("few")
          ? "few"
          : om.claimedError.includes("cot")
            ? "cot"
            : ("zero" as const);
      if (existing) {
        if (!existing.includes(method)) existing.push(method);
      } else {
        map.set(om.missingText, [method]);
      }
    }
    return map;
  }, [omissions]);

  const parts = useMemo(
    () => findOmissionParts(text, omissions),
    [text, omissions]
  );

  return (
    <>
      {parts.map((part, i) => (
        <OmissionPart
          key={i}
          part={part}
          methods={
            part.category ? (methodsByText.get(part.text) ?? ["zero", "few", "cot"]) : null
          }
        />
      ))}
    </>
  );
}

function ErrorAnnotations({
  sampleId,
  method,
}: {
  sampleId: string;
  method: string;
}) {
  const [openCats, setOpenCats] = useState<Set<ErrorCategory>>(new Set());

  const pillCounts = useMemo(
    () => getErrorCounts(sampleId, method),
    [sampleId, method]
  );

  const allDetails = useMemo(
    () => getErrorDetails(sampleId, method),
    [sampleId, method]
  );

  const detailsByCat = useMemo(() => {
    const map = new Map<ErrorCategory, ConfirmedError[]>();
    for (const d of allDetails) {
      const cat = d.category;
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(d);
    }
    return map;
  }, [allDetails]);

  const toggle = (cat: ErrorCategory) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const totalErrors = [...pillCounts.values()].reduce((a, b) => a + b, 0);

  return (
    <div className="mt-4 pt-3 border-t border-foreground/10">
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-foreground/50">
        {totalErrors} errors · click a type to expand
      </p>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {errorCategories.map((cat) => {
          const count = pillCounts.get(cat) ?? 0;
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
          const items = detailsByCat.get(cat);
          if (!items || items.length === 0) return null;
          return (
            <div key={cat}>
              <p
                className="font-mono text-[0.6rem] uppercase tracking-widest mb-1"
                style={{ color: errorColors[cat] }}
              >
                {errorLabels[cat]}
              </p>
              <ul className="space-y-0.5">
                {items.map((d, i) => (
                  <li key={i} className="text-xs text-foreground/70 pl-3 relative">
                    <span
                      className="absolute left-0 top-[0.45em] w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: verdictColors[d.verdict] ?? errorColors[cat],
                      }}
                    />
                    <span className="font-mono text-[0.55rem] mr-1 opacity-60">
                      [{verdictLabels[d.verdict] ?? d.verdict}]
                    </span>
                    {d.claimedError}
                    {d.explanation && (
                      <span className="text-foreground/40 ml-1">
                        — {d.explanation}
                      </span>
                    )}
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

  const sections = getSectionsForSample(sample.sampleId);

  const refSection = sections.find((s) => s.method === "hiReference");
  const zeroSection = sections.find((s) => s.method === "zero");
  const fewSection = sections.find((s) => s.method === "few");
  const cotSection = sections.find((s) => s.method === "cot");

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
            {showHighlights && refSection ? (
              <ReferenceText
                text={refSection.originalText}
                omissions={refSection.referenceOmissions}
              />
            ) : (
              sample.hiReference
            )}
          </div>
        </div>

        {/* Output columns with error annotations */}
        {(
          [
            { key: "zeroShot" as const, method: "zero" as MethodKey, section: zeroSection },
            { key: "fewShot" as const, method: "few" as MethodKey, section: fewSection },
            { key: "cot" as const, method: "cot" as MethodKey, section: cotSection },
          ] as const
        ).map(({ key, method, section }) => (
          <div key={key} className="flex flex-col">
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
              {methodLabels[method]}
            </h3>
            <div className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {showHighlights && section ? (
                <TaggedText taggedText={section.taggedText} />
              ) : (
                sample[key]
              )}
            </div>
            {section && (
              <ErrorAnnotations
                sampleId={sample.sampleId}
                method={method}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
