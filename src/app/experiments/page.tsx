import type { Metadata } from "next";
import { experiments } from "@/lib/experiment-data";
import ExperimentViewer from "@/components/ExperimentViewer";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "experiments | mohar@portfolio",
  description:
    "Legal summarization experiments — EN to HI, zero/few/CoT vs reference",
};

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
          Legal summarization — English to Hindi. Comparing zero-shot, few-shot,
          and chain-of-thought prompting against the HI reference on 10 samples
          from the MILDSum dataset using Qwen3.5-4B (Q4_K_M).
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
