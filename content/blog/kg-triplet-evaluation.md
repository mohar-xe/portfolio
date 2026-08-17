---
title: Grading Knowledge-Graph Triplets: An Evaluator for a Fine-Tuned Qwen3-0.6B
date: 2026-05-21
readTime: 8 min read
excerpt: An offline-first evaluation harness I built to score predicted knowledge-graph triplets against a gold reference set — and what scoring 700 prompts revealed about my fine-tuned Qwen3-0.6B: well-formed output, low fidelity.
---

## Why an Evaluator?

This project is the final link in a chain: a dataset defines the KG schema, a fine-tuning script trains a small model to emit triplets, a RAG pipeline serves them — and somebody has to grade the predictions. That somebody was me. I wrote an evaluation harness that scores a model's predicted knowledge-graph triplets against a gold reference set, built with uv on Python 3.12+.

I kept the whole thing deliberately small: a single evaluator script of roughly a thousand lines, a prediction generator notebook, and two prediction files. It runs offline, needs no model at evaluation time, and produces a defensible number at the end.

## The Pipeline, in Six Stages

- validate_schema — per-triplet validation: source and target must have string titles and types, the relation must be non-empty, and the weight must live in [0, 1] (bools are explicitly rejected as weights). An empty list is valid; a malformed one is not.
- normalize_triplets — canonicalize everything before matching: underscores become spaces, whitespace collapses, company/legal suffixes (Ltd, Inc, Corp, GmbH, "., Ltd") are stripped, surrounding punctuation removed. Originals are preserved under `_raw` so nothing is lost.
- hungarian_algorithm — a self-contained O(n³) Kuhn–Munkres implementation with Jonker–Volgenant potentials, no SciPy dependency. It builds a square cost matrix with dummies and maximizes `align_sim = 0.45·src + 0.45·tgt + 0.10·rel`; pairs below the acceptance threshold (0.50) are rejected outright.
- embedding_matching — exact string match first; fuzzy matching via embeddings only as a gated fallback. Relations are matched as natural language (based_on → "based on"), and weight agreement is banded: |Δw| ≤ 0.10 scores 1.0, tighter bands score proportionally.
- final_hallucination_check — classifies unmatched predictions: self-loops are dropped; relations outside the 20-type VALID_RELATION_TYPES set are flagged as hallucinations; entities ungrounded in gold or prompt are marked novel_grounded (a precision cost, but not a hard hallucination).
- scoring — a multi-axis composite: schema 0.30 / entity_f1 0.25 / relation_acc 0.20 / weight 0.10 / grounding 0.15. Inapplicable axes are excluded and the composite renormalized so it stays in [0, 1]. Empty predictions get schema and grounding as N/A; for empty-gold entries the composite is 1.0 iff the prediction is also empty, else 0.0.

## Design Decisions I'm Keeping

- Graceful embedding degradation: fastembed (ONNX) falls back to sentence-transformers, which falls back to a 50/50 blend of difflib char-ratio and token-Jaccard similarity. The pipeline always runs offline with no model downloads at evaluation time.
- The Hungarian solver is dependency-free. A self-contained O(n³) assignment solver beats dragging SciPy into an evaluation harness.
- Schema adherence is the cheapest signal a small model can satisfy — so I gave it the highest weight. The composite is dominated by schema and grounding by design, which makes two entries with different schema/grounding diverge heavily.
- Strict-but-forgiving validation: malformed triplets fail cleanly at scoring time rather than crashing the run.

## The Data

I ran the harness over 700 prompts with predictions from two models:

- Finetuned (qwen3-0.6b): 4,881 predicted items, 23 empty or unparseable predictions, 1 malformed triplet (a source-only dict). Predicted relation types form a healthy distribution over the valid set — based_on at 767, defined_as at 656, and the rest spread across the 20-type taxonomy.
- Base Qwen: the same 700 prompts and gold references, with distinctly lower output quality — string-valued relation fields where the schema expects a type, and prose-like entity titles. Exactly what you'd expect from a base model that never saw the triplet schema.

## Results: Well-Formed but Low-Fidelity

On the finetuned predictions (string matching, no embeddings):

- Composite score: 0.6583
- Schema score (macro): 1.000
- Entity F1 (macro): 0.179
- Relation accuracy: 0.680
- Weight score: 0.526
- Grounding: 0.969
- Micro entity P/R/F1: 0.175 / 0.199 / 0.186
- Micro triplet P/R/F1: 0.118 / 0.135 / 0.126
- Hallucination rate: 0.033
- Empty predictions: 23 of 700

The story these numbers tell me: the model outputs perfectly valid triplets (schema 1.0, grounding 0.969, hallucination rate 3.3%) but gets the content wrong most of the time. Precision sits at roughly 0.12–0.18, with only ~578 exact full-triplet hits out of 4,278 gold triplets, and entity recall around 0.20 means the model frequently misses entities entirely.

This is the classic well-formed-but-low-fidelity small-model profile: the fine-tune taught the model the shape of a triplet, not the content. It is exactly the case I built the evaluator to catch — a model that looks compliant on the surface and fails on substance.

## Lessons and Warts

- I never configured tests — my "verification" step is just running the CLI. For a ~1000-line script with a self-contained Hungarian solver, that is a real gap.
- Malformed predictions pass my parser but fail scoring cleanly: score_entry handles them via fallback paths, and is_valid_triplet correctly treats them as schema-invalid. Correct behavior — just worth documenting so nobody "fixes" it.
- My warm-cache path has a minor inefficiency: the embedding cache is warmed once over all gold titles, and a fallback miss re-embeds a single text on the cold path. Not a correctness issue, just a slightly slower first run.
- My generator notebook is Colab-oriented and bakes in a specific model (mohar07/qwen3-0.6b-kg-triplets); the finetuned predictions come from that checkpoint.

## Closing

The repo is small, and my main takeaways are simple: the evaluator runs correctly end-to-end, degrades to offline operation as documented, and produced a defensible verdict on my fine-tuned model. The headline finding — that fine-tuning a 0.6B model buys you syntactic compliance without semantic fidelity — is a useful reminder that evaluation harnesses are worth building before, not after, the model lands in production.
