import { readFileSync, readdirSync } from "fs";
import path from "path";

export interface Sample {
  sampleId: string;
  hiReference: string;
  zeroShot: string;
  fewShot: string;
  cot: string;
}

const BASE = path.join(
  process.cwd(),
  "experiments",
  "Legal Summarization EN -> HI"
);

function read(p: string): string {
  return readFileSync(p, "utf8").trim();
}

function loadSample(id: string): Sample {
  return {
    sampleId: id,
    hiReference: read(path.join(BASE, "Data", id, "HI_Summary.txt")),
    zeroShot: read(path.join(BASE, "outputs", "zero", `${id}_HI.txt`)),
    fewShot: read(path.join(BASE, "outputs", "few", `${id}_HI.txt`)),
    cot: read(path.join(BASE, "outputs", "cot", `${id}_HI.txt`)),
  };
}

export const experiments: Sample[] = readdirSync(path.join(BASE, "Data"))
  .filter((d) => d.startsWith("Sample_"))
  .sort(
    (a, b) =>
      Number(a.split("_")[1]) - Number(b.split("_")[1])
  )
  .map((d) => loadSample(d));
