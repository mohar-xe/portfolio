import type { Metadata } from "next";
import { experiments } from "@/lib/experiments-registry";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "experiments | mohar@portfolio",
  description: "AI/ML experiments and evaluations",
};

const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 w-full mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 max-w-[1200px]">
        <p className="font-mono text-sm sm:text-base text-foreground/70 mb-16 sm:mb-20 tracking-tight">
          {">_ "}mohar@portfolio:~/experiments$
        </p>

        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black leading-[1.1] tracking-[-0.01em]">
          experiments<span className="text-foreground">.</span>
        </h1>
        <p className="text-lg sm:text-xl leading-[1.65] mt-5 text-foreground/80">
          Hands-on evaluations, stress tests, and reimplementations of AI
          systems — taking ideas from papers and turning them into something
          I can break.
        </p>

        {experiments.length === 0 ? (
          <p className="mt-14 text-lg sm:text-xl leading-[1.65] text-foreground/70">
            no experiments yet — check back soon.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {experiments.map((exp) => (
              <a
                key={exp.slug}
                href={`/experiments/${exp.slug}`}
                className="group block rounded-lg border border-foreground/15 p-5 transition-colors duration-150 hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                <h2 className="text-[1.15rem] sm:text-[1.2rem] font-bold leading-snug group-hover:underline decoration-1 underline-offset-4">
                  {exp.title}
                </h2>
                <p className="mt-2 text-base leading-[1.65] text-foreground/70">
                  {exp.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 rounded border border-foreground/15 text-foreground/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full border-t border-foreground/10 mt-auto pb-24 sm:pb-28">
        <div className="max-w-[1200px] w-full mx-auto px-5 sm:px-8 md:px-10 py-8 sm:py-10 flex justify-center">
          <p className="text-sm text-foreground/50">© 2026 mohar das</p>
        </div>
      </footer>

      <NavBar />
    </div>
  );
}
