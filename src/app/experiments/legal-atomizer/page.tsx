import type { Metadata } from "next";
import { atomizer } from "@/lib/atomizer-data";
import AtomizerViewer from "@/components/AtomizerViewer";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "legal proposition atomizer | mohar@portfolio",
  description:
    "Turning legal-news paragraphs into atomic legal propositions — three LLM stages, 92 to 39 calls, and the failure modes I found by reading the output",
};

const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default function LegalAtomizerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 w-full mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 max-w-[1200px]">
        <p className="font-mono text-sm sm:text-base text-foreground/70 mb-16 sm:mb-20 tracking-tight">
          {">_ "}mohar@portfolio:~/experiments/legal-atomizer$
        </p>

        <p className="mb-6">
          <a href="/experiments" className={ink}>
            ← all experiments
          </a>
        </p>

        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black leading-[1.1] tracking-[-0.01em]">
          legal proposition atomizer<span className="text-foreground">.</span>
        </h1>
        <p className="text-lg sm:text-xl leading-[1.65] mt-5 text-foreground/80">
          Splitting LiveLaw legal-news paragraphs into atomic, standalone legal propositions.
          Three LLM stages, one call per paragraph each, with mechanical guards no model can
          bypass. Built to find out where a decomposition pipeline actually breaks.
        </p>

        <AtomizerViewer data={atomizer} />
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
