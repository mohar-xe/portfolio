import type { Metadata } from "next";
import { experiments } from "@/lib/experiment-data";
import ExperimentViewer from "@/components/ExperimentViewer";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "legal summarization en→hi | mohar@portfolio",
  description:
    "Legal summarization experiments — EN to HI, zero/few/CoT vs reference",
};

const ink =
  "underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background";

export default function LegalSummarizationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 w-full mx-auto px-5 sm:px-8 md:px-10 py-16 sm:py-20 md:py-24 max-w-[1200px]">
        <p className="font-mono text-sm sm:text-base text-foreground/70 mb-16 sm:mb-20 tracking-tight">
          {">_ "}mohar@portfolio:~/experiments/legal-summarization$
        </p>

        <p className="mb-6">
          <a href="/experiments" className={ink}>
            ← all experiments
          </a>
        </p>

        <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-black leading-[1.1] tracking-[-0.01em]">
          legal summarization<span className="text-foreground">.</span>
        </h1>
        <p className="text-lg sm:text-xl leading-[1.65] mt-5 text-foreground/80">
          English to Hindi. Comparing zero-shot, few-shot, and chain-of-thought
          prompting against the Hindi reference on 10 samples from the MILDSum
          dataset using Qwen3.5-4B (Q4_K_M).
        </p>

        <p className="mt-4">
          <a
            href="https://github.com/mohar-xe/en-2-hi"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm sm:text-base text-foreground/60 underline decoration-1 underline-offset-4 transition-colors duration-150 hover:bg-foreground hover:text-background"
          >
            ↗ github repo
          </a>
        </p>

        <ExperimentViewer data={experiments} />
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
