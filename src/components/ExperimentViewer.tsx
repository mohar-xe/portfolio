"use client";

import { useState } from "react";
import type { Sample } from "@/lib/experiment-data";

const columns = [
  { key: "hiReference", label: "HI Reference" },
  {key: "zeroShot", label: "Zero-shot" },
  { key: "fewShot", label: "Few-shot" },
  { key: "cot", label: "CoT" },
] as const;

export default function ExperimentViewer({ data }: { data: Sample[] }) {
  const [selected, setSelected] = useState(0);
  const sample = data[selected];

  return (
    <div className="mt-10">
      {/* Sample selector */}
      <div className="flex flex-wrap gap-2 mb-8">
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

      {/* 4-column output grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="flex flex-col">
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/50 mb-2 border-b border-foreground/10 pb-2">
              {col.label}
            </h3>
            <div className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {sample[col.key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
