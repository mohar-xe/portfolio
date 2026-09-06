import samplesExtracted from "../../experiments/Legal Summarization EN -> HI/samples_extracted.json";

export interface Sample {
  sampleId: string;
  hiReference: string;
  zeroShot: string;
  fewShot: string;
  cot: string;
}

export const experiments: Sample[] = Object.entries(samplesExtracted)
  .sort(
    ([a], [b]) =>
      Number(a.split("_")[1]) - Number(b.split("_")[1])
  )
  .map(([id, data]) => ({
    sampleId: id,
    hiReference: data.hiReference,
    zeroShot: data.zeroShot,
    fewShot: data.fewShot,
    cot: data.cot,
  }));
