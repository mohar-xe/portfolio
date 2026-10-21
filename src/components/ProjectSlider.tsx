"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/portfolio-data";

const GAP = 16; // matches gap-4

export default function ProjectSlider({ projects }: { projects: Project[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const step = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const distance = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  const arrow =
    "flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 font-mono text-sm text-foreground/60 transition-colors duration-150 hover:border-foreground/50 hover:text-foreground disabled:opacity-25 disabled:hover:border-foreground/20 disabled:hover:text-foreground/60";

  return (
    <div className="mt-6">
      <div className="mx-auto flex max-w-[680px] items-center justify-end gap-1.5 px-5 sm:px-8 md:px-10">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous projects"
          className={arrow}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next projects"
          className={arrow}
        >
          →
        </button>
      </div>

      <div
        ref={scroller}
        onScroll={sync}
        role="region"
        aria-label="Projects"
        tabIndex={0}
        className="no-scrollbar full-bleed-track mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
      >
        {projects.map((project) => (
          <a
            data-card
            key={project.title}
            href={project.links[0].href}
            target="_blank"
            rel="noreferrer"
            className="group flex w-[85%] shrink-0 snap-start flex-col rounded-lg border border-foreground/15 p-5 transition-colors duration-150 hover:border-foreground/40 hover:bg-foreground/[0.03] sm:w-[24rem]"
          >
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="text-[1.05rem] sm:text-[1.1rem] font-bold leading-snug group-hover:underline decoration-1 underline-offset-4">
                {project.title}
              </h3>
              {project.badge && (
                <span className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 rounded border border-foreground/15 text-foreground/50">
                  {project.badge.toLowerCase()}
                </span>
              )}
            </div>
            <p className="mt-2 text-[0.95rem] leading-[1.6] text-foreground/70">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 rounded border border-foreground/15 text-foreground/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-auto pt-3 font-mono text-sm text-foreground/50">
              ↗ {project.links[0].label.toLowerCase()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
