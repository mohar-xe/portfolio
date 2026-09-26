"use client";

import { useState } from "react";

import Mermaid from "@/components/Mermaid";
import type { AtomizerData, AtomizerFact, AtomizerParagraph, ManualVerdict } from "@/lib/atomizer-data";
import { manualEvalTotals } from "@/lib/atomizer-data";

const verdictGreen = "#22C55E";
const verdictAmber = "#F59E0B";
const verdictRed = "#EF4444";
const verdictGrey = "#6B7280";

const PIPELINE = `flowchart LR
    A["paragraph<br/>+ article title"] --> B["stage 1<br/>extract facts"]
    B --> C["stage 2<br/>atomicity + split"]
    C --> D["stage 3<br/>support + coverage"]
    D --> E["fact tree<br/>ids, depth, verdicts"]`;

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

function manualMark(value: ManualVerdict | undefined) {
  if (value === "correct") return { label: "manual: correct", color: verdictGreen };
  if (value === "incorrect") return { label: "manual: incorrect", color: verdictRed };
  return null;
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
  const manual = manualMark(fact.manualVerdict);
  const reasons = [fact.atomicReason, fact.entailmentReason].filter(Boolean);
  return (
    <li className="border-b border-foreground/10 last:border-0 py-2" style={{ paddingLeft: `${depth * 1.1}rem` }}>
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="font-mono text-[0.6rem] text-foreground/40">{fact.id ?? "rejected"}</span>
        <Pill text={atomic.label} color={atomic.color} />
        {showEntailed && <Pill text={entailed.label} color={entailed.color} />}
        {fact.unresolved && <Pill text="unresolved" color={verdictRed} />}
        {fact.origin === "coverage_gap" && <Pill text="gap fill" color={verdictAmber} />}
        {manual && <Pill text={manual.label} color={manual.color} />}
        {fact.manualFlags?.map((flag) => (
          <Pill key={flag} text={flag} color={verdictAmber} />
        ))}
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

function treeOrder(facts: AtomizerFact[]) {
  const children = new Map<string | null, AtomizerFact[]>();
  for (const fact of facts) {
    const key = fact.parentId ?? null;
    if (!children.has(key)) children.set(key, []);
    children.get(key)!.push(fact);
  }
  const ordered: { fact: AtomizerFact; depth: number }[] = [];
  const walk = (parentId: string | null, depth: number) => {
    for (const fact of children.get(parentId) ?? []) {
      ordered.push({ fact, depth });
      walk(fact.id, depth + 1);
    }
  };
  walk(null, 0);
  return ordered;
}

function manualTally(facts: AtomizerFact[]) {
  const seen = new Set<string>();
  let correct = 0;
  let incorrect = 0;
  for (const fact of facts) {
    if (!fact.id || seen.has(fact.id)) continue;
    seen.add(fact.id);
    if (fact.manualVerdict === "correct") correct += 1;
    else if (fact.manualVerdict === "incorrect") incorrect += 1;
  }
  return { correct, incorrect, judged: correct + incorrect };
}

function MetricStrip({ data }: { data: AtomizerData }) {
  const manual = manualEvalTotals();
  const items: [string, string | number][] = [
    ["paragraphs", data.headline.paragraphs],
    ["llm calls", data.headline.callsPerRun],
    ["facts", data.headline.facts],
    ["depth 2+", data.headline.deeperFacts],
    ["unresolved", data.headline.unresolved],
    ["gaps", data.headline.gaps],
    ["manually verified", manual.total],
    ["manual errors", manual.incorrect],
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

function StageColumns({ paragraph }: { paragraph: AtomizerParagraph }) {
  const finalFacts = treeOrder(paragraph.final);
  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        the three stages, one paragraph
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-6">
        One call per stage per paragraph, so 36 of the 39 calls; the rest go to paragraphs that
        fail the coverage check. Stage 2 nests children under the claim they came from; stage 3
        adds a support verdict and the coverage result.
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
            {finalFacts.map(({ fact, depth }) => (
              <FactRow key={fact.id ?? fact.fact} fact={fact} depth={depth} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
            stage 3 · support + coverage ({paragraph.final.length})
          </h3>
          <ul>
            {finalFacts.map(({ fact, depth }) => (
              <FactRow key={fact.id ?? fact.fact} fact={fact} depth={depth} showEntailed />
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

function SourceParagraphs({ data, selected, onSelect }: {
  data: AtomizerData;
  selected: number;
  onSelect: (index: number) => void;
}) {
  const current = data.paragraphs[selected] ?? data.paragraphs[0];
  const tally = manualTally(current.final);
  return (
    <section className="mb-12">
      <h2 className="text-[1.6rem] sm:text-[1.75rem] md:text-[2rem] font-black leading-tight mb-1">
        the original paragraph
      </h2>
      <p className="text-lg sm:text-xl leading-[1.65] text-foreground/80 mb-4">
        Paragraph {current.id} of {data.headline.paragraphs}, exactly as scraped. Pick another
        to load its three stages below. The count on each pill is how many of that
        paragraph&apos;s facts I have checked by hand.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {data.paragraphs.map((item, index) => {
          const itemTally = manualTally(item.final);
          return (
            <button
              key={item.id}
              onClick={() => onSelect(index)}
              title={item.tags?.join(", ")}
              className={`font-mono text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors duration-150 ${
                index === selected
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/20 hover:border-foreground/50"
              }`}
            >
              p{item.id}
              {item.tags && <span style={{ color: verdictAmber }}> ✱</span>}
              {itemTally.judged > 0 && (
                <span style={itemTally.incorrect > 0 ? { color: verdictRed } : undefined}>
                  {" "}
                  {itemTally.correct}/{itemTally.judged}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="rounded-lg border border-foreground/50 bg-foreground/[0.03] p-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <span className="font-mono text-xs text-foreground/50">p{current.id}</span>
          <span className="font-mono text-[0.65rem] text-foreground/50">
            {current.stage1.length} extracted · {current.final.length} final ·{" "}
            {current.gaps.length} gap(s) · coverage {current.coverageClosed ? "closed" : "open"}
            {tally.judged > 0 && ` · ${tally.correct}/${tally.judged} verified by hand`}
          </span>
          {current.tags?.map((tag) => (
            <Pill key={tag} text={tag} color={verdictAmber} />
          ))}
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-foreground/90">{current.text}</p>
      </div>
    </section>
  );
}

export default function AtomizerViewer({ data }: { data: AtomizerData }) {
  const [paragraphIndex, setParagraphIndex] = useState(7);
  const paragraph = data.paragraphs[paragraphIndex] ?? data.paragraphs[0];
  const manual = manualEvalTotals();

  return (
    <div className="mt-10">
      <MetricStrip data={data} />
      <p className="text-base leading-relaxed text-foreground/70 mb-10 max-w-[70ch]">
        The <span className="font-mono text-[0.7rem] text-foreground/90">manual: correct</span>{" "}
        and <span className="font-mono text-[0.7rem] text-foreground/90">manual: incorrect</span>{" "}
        tags are my own reading of each fact against its source paragraph, not a model verdict.{" "}
        <span className="font-mono text-[0.7rem] text-foreground/90">inferred</span> marks a fact
        I accept but the paragraph never states outright. {manual.total} of {data.headline.facts}{" "}
        facts checked so far, {manual.incorrect} of them wrong.
      </p>

      <div className="mb-12">
        <Mermaid chart={PIPELINE} />
      </div>

      <SourceParagraphs data={data} selected={paragraphIndex} onSelect={setParagraphIndex} />

      <StageColumns paragraph={paragraph} />
      <Ablation data={data} />
    </div>
  );
}
