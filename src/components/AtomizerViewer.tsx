"use client";

import { useMemo, useState } from "react";

import Mermaid from "@/components/Mermaid";
import type { AtomizerData, AtomizerFact, AtomizerParagraph } from "@/lib/atomizer-data";

const verdictGreen = "#22C55E";
const verdictAmber = "#F59E0B";
const verdictRed = "#EF4444";
const verdictGrey = "#6B7280";

const PIPELINE = `flowchart LR
    A["paragraph<br/>+ article title"] --> B["stage 1<br/>extract facts"]
    B --> C["stage 2<br/>atomicity + split"]
    C --> D["stage 3<br/>support + coverage"]
    D --> E["fact tree<br/>ids, depth, verdicts"]`;

function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\.$/, "")
    .split(/\s+/)
    .join(" ");
}

function atomicMark(value: boolean | null | undefined) {
  if (value === true) return { label: "atomic", color: verdictGreen };
  if (value === false) return { label: "compound", color: verdictAmber };
  return { label: "not judged", color: verdictGrey };
}

function entailedMark(value: boolean | null | undefined) {
  if (value === true) return { label: "supported", color: verdictGreen };
  if (value === false) return { label: "unsupported", color: verdictRed };
  return { label: "unverified", color: verdictGrey };
}

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 rounded-sm whitespace-nowrap"
      style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}40` }}
    >
      {text}
    </span>
  );
}

function FactRow({
  fact,
  depth = 0,
  showEntailed,
}: {
  fact: AtomizerFact;
  depth?: number;
  showEntailed?: boolean;
}) {
  const atomic = atomicMark(fact.atomic);
  const entailed = entailedMark(fact.entailed);
  const reasons = [fact.atomicReason, fact.entailmentReason].filter(Boolean);
  return (
    <li className="border-b border-foreground/10 last:border-0 py-2" style={{ paddingLeft: `${depth * 1.1}rem` }}>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="font-mono text-[0.6rem] text-foreground/40">{fact.id ?? "rejected"}</span>
        <Pill text={atomic.label} color={atomic.color} />
        {showEntailed && <Pill text={entailed.label} color={entailed.color} />}
        {fact.unresolved && <Pill text="unresolved" color={verdictRed} />}
        {fact.origin === "coverage_gap" && <Pill text="gap fill" color={verdictAmber} />}
      </div>
      <p className="text-sm sm:text-base leading-relaxed text-foreground/90">{fact.fact}</p>
      {reasons.length > 0 && (
        <p className="font-mono text-[0.65rem] leading-relaxed text-foreground/50 mt-1">
          {reasons.join(" · ")}
        </p>
      )}
    </li>
  );
}

function treeFacts(facts: AtomizerFact[]) {
  const children = new Map<string | null, AtomizerFact[]>();
  for (const fact of facts) {
    const key = fact.parentId ?? null;
    if (!children.has(key)) children.set(key, []);
    children.get(key)!.push(fact);
  }
  return children;
}

function MetricStrip({ data }: { data: AtomizerData }) {
  const items: [string, string | number][] = [
    ["paragraphs", data.headline.paragraphs],
    ["llm calls", data.headline.callsPerRun],
    ["facts", data.headline.facts],
    ["depth 2+", data.headline.deeperFacts],
    ["unresolved", data.headline.unresolved],
    ["gaps", data.headline.gaps],
  ];
  return (
    <div className="font-mono text-sm sm:text-base text-foreground/80 mb-10">
      {items.map(([label, value], index) => (
        <span key={label}>
          {index > 0 && <span className="text-foreground/40"> / </span>}
          <span className="font-black text-foreground">{value}</span> {label}
        </span>
      ))}
    </div>
  );
}

function Iterations({ data, selected, onSelect }: {
  data: AtomizerData;
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        iterations
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-6">
        Five configurations, same 12 paragraphs from the last four. Calls are LLM requests
        per full run; unresolved counts compound facts the splitter could not break.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.iterations.map((iteration) => {
          const active = iteration.id === selected;
          return (
            <button
              key={iteration.id}
              onClick={() => onSelect(iteration.id)}
              className={`text-left rounded-lg border p-4 transition-colors duration-150 ${
                active
                  ? "border-foreground/50 bg-foreground/[0.03]"
                  : "border-foreground/15 hover:border-foreground/40"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <span className="font-black text-base">{iteration.label}</span>
                <span className="font-mono text-[0.65rem] text-foreground/50">
                  {iteration.model} · {iteration.schema}
                </span>
              </div>
              <div className="font-mono text-[0.7rem] text-foreground/70 mb-2">
                {iteration.calls === null ? "calls n/r" : iteration.calls} calls ·{" "}
                {iteration.facts} facts · {iteration.deeper} deeper · {iteration.unresolved} unresolved ·{" "}
                {iteration.gaps} gaps
              </div>
              <p className="text-sm leading-relaxed text-foreground/70">{iteration.note}</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-foreground/40 mt-2">
                artifacts: {iteration.artifacts}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function StageColumns({ paragraph }: { paragraph: AtomizerParagraph }) {
  const children = treeFacts(paragraph.final);
  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        the three stages, one paragraph
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-6">
        One call per stage, batched across the paragraph. Stage 2 nests children under the
        claim they came from; stage 3 adds a support verdict and the coverage result.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            stage 1 · extract ({paragraph.stage1.length})
          </h3>
          <ul>
            {paragraph.stage1.map((fact, index) => (
              <FactRow key={fact.id ?? `s1-${index}`} fact={fact} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            stage 2 · atomicity + split ({paragraph.final.length})
          </h3>
          <ul>
            {(children.get(null) ?? []).map((fact) => (
              <FactRow key={fact.id ?? fact.fact} fact={fact} />
            ))}
            {(children.get(null) ?? []).map((parent) =>
              (children.get(parent.id ?? null) ?? []).map((child) => (
                <FactRow key={child.id ?? child.fact} fact={child} depth={1} />
              )),
            )}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            stage 3 · support + coverage
          </h3>
          <ul>
            {paragraph.final
              .filter((fact) => fact.depth === 1)
              .map((fact) => (
                <FactRow key={fact.id ?? fact.fact} fact={fact} showEntailed />
              ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-foreground/10">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-foreground/50 mb-1">
              coverage
            </p>
            <p className="font-mono text-[0.7rem] text-foreground/70">
              {paragraph.coverageClosed ? "closed" : "not closed"} · {paragraph.gaps.length} gap(s)
              found · {paragraph.gapsFilled} filled
            </p>
            {paragraph.gaps.map((gap) => (
              <p key={gap.missing_fact} className="text-sm leading-relaxed text-foreground/80 mt-2">
                {gap.missing_fact}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CrossIteration({ paragraph }: { paragraph: AtomizerParagraph }) {
  const older = paragraph.perFactRun.final;
  const newer = paragraph.final;
  const olderTexts = useMemo(
    () => new Set(older.filter((f) => f.depth === 1).map((f) => normalize(f.fact))),
    [older],
  );
  const newerTexts = useMemo(
    () => new Set(newer.filter((f) => f.depth === 1).map((f) => normalize(f.fact))),
    [newer],
  );
  const shared = [...newerTexts].filter((text) => olderTexts.has(text)).length;
  const union = new Set([...olderTexts, ...newerTexts]).size;

  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        same paragraph, two architectures
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-6">
        Left is the per-fact run, where every split failed and compound facts were left
        unresolved. Right is the current batched run, with the evidence field removed.{" "}
        {shared} of {union} level-1 claims are textually identical between them; the rest were
        reworded or added.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            v3 per-fact · {older.length} facts · with evidence
          </h3>
          <ul>
            {older.map((fact) => (
              <FactRow key={fact.id ?? fact.fact} fact={fact} />
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            v5 current · {newer.length} facts · no evidence
          </h3>
          <ul>
            {newer.map((fact) => (
              <FactRow key={fact.id ?? fact.fact} fact={fact} showEntailed />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Ablation({ data }: { data: AtomizerData }) {
  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        call ablation
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-6">
        What each stage costs, and what breaks if it is removed. Deltas are arithmetic on the
        measured 39-call run, not new runs.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono text-sm sm:text-base">
          <thead>
            <tr>
              <th className="border-b border-foreground/30 px-2 py-1 font-black">ablation</th>
              <th className="border-b border-foreground/30 px-2 py-1 font-black">calls</th>
              <th className="border-b border-foreground/30 px-2 py-1 font-black">delta</th>
              <th className="border-b border-foreground/30 px-2 py-1 font-black">what is lost</th>
            </tr>
          </thead>
          <tbody>
            {data.ablation.map((row) => (
              <tr key={row.label}>
                <td className="border-b border-foreground/10 px-2 py-1 align-top">{row.label}</td>
                <td className="border-b border-foreground/10 px-2 py-1 align-top">{row.calls}</td>
                <td className="border-b border-foreground/10 px-2 py-1 align-top">
                  {row.delta === null ? "—" : row.delta}
                </td>
                <td
                  className="border-b border-foreground/10 px-2 py-1 align-top font-sans text-base leading-relaxed"
                  style={{ color: row.delta === null ? undefined : "var(--foreground)" }}
                >
                  {row.lost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Issues({ data }: { data: AtomizerData }) {
  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        what is still broken
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-6">
        The pipeline runs clean and every guard fires, but nothing here has been checked against
        human labels. These are the reasons I would not trust the output yet.
      </p>
      <div className="space-y-3">
        {data.issues.map((issue) => (
          <div key={issue.title} className="rounded-lg border border-foreground/15 p-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-black text-base">{issue.title}</span>
              <Pill
                text={issue.status}
                color={issue.status === "open" ? verdictRed : verdictGrey}
              />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
              {issue.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AtomizerViewer({ data }: { data: AtomizerData }) {
  const [paragraphIndex, setParagraphIndex] = useState(7);
  const [iteration, setIteration] = useState("current");
  const paragraph = data.paragraphs[paragraphIndex] ?? data.paragraphs[0];
  const legacy = data.legacy;

  return (
    <div className="mt-10">
      <MetricStrip data={data} />

      <div className="mb-12">
        <Mermaid chart={PIPELINE} />
      </div>

      <Iterations data={data} selected={iteration} onSelect={setIteration} />

      <section className="mb-12">
        <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
          pick a paragraph
        </h2>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {data.paragraphs.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setParagraphIndex(index)}
              className={`font-mono text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                index === paragraphIndex
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/20 hover:border-foreground/50"
              }`}
            >
              p{item.id}
            </button>
          ))}
        </div>
        <p className="text-lg sm:text-xl leading-[1.65] text-foreground/90 whitespace-pre-wrap">
          {paragraph.text}
        </p>
      </section>

      <StageColumns paragraph={paragraph} />
      <CrossIteration paragraph={paragraph} />
      <Ablation data={data} />

      <section className="mb-12">
        <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
          iteration 1, in full
        </h2>
        <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-4">
          The first run was a single paragraph from a different article, using the qualifier
          schema and a per-fact depth loop that ran to level 3 on its own. None of the six
          qualifier fields were ever read by code. {legacy.text}
        </p>
        <ul>
          {legacy.facts.map((fact) => (
            <FactRow key={fact.id} fact={fact} />
          ))}
        </ul>
      </section>

      <Issues data={data} />
    </div>
  );
}
