"use client";

import { useEffect, useId, useState } from "react";

export default function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      const dark = document.documentElement.classList.contains("dark");
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: dark ? "dark" : "neutral",
        fontFamily: "ui-monospace, monospace",
      });
      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (!cancelled) {
            setSvg(svg);
            setFailed(false);
          }
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (failed) {
    return (
      <pre className="overflow-x-auto border border-foreground/15 bg-foreground/[0.04] p-4 mt-5 font-mono text-sm sm:text-base leading-relaxed text-foreground/60">
        {chart}
      </pre>
    );
  }

  return (
    <div
      className="mt-8 mb-2 overflow-x-auto [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
