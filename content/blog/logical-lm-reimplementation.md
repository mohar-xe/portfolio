---
title: Logical-LM: A Complete Reimplementation of Logic Programming with LLMs
date: 2026-08-17
readTime: 6 min read
excerpt: A from-scratch reimplementation of Logic-LM (EMNLP 2023) that translates natural language reasoning into symbolic logic, executes programs with deterministic solvers, and iteratively refines failures. My notes on what works, what doesn't, and how it compares to the original paper.
---

## Project Overview

I reimplemented the Logic-LM paper (arXiv:2305.12295) from scratch in Python. In my pipeline, the LLM translates natural-language reasoning problems into symbolic logic programs. Deterministic solvers execute those programs and return letter answers. A self-refinement loop revises failed programs from solver error messages, up to 3 rounds. Core dependencies are z3-solver and pyarrow; LLM backends are optional.

## What Makes This Implementation Different

- Fresh uninterpreted sort per FOLIO example to avoid unintended object equality
- Z3 "unknown" is treated as an execution error, never silently converted to a verdict
- ProofWriter uses data-level negation (not negation-as-failure) for open-world semantics
- No exec() of LLM output: CSP uses whitelisted AST evaluator; others compile to AST
- Unicode-tolerant lexers via normalization (∀→forall, ∧→&&, smart-quotes normalized)

## Pipeline Architecture

Input is a natural language problem; the LLM generates a logic program; the solver executes it. On failure, the error message is returned to the LLM for program revision, repeated up to 3 times. I kept the metrics to the three numbers from the paper: overall accuracy, executable rate, exec-accuracy.

## Dataset Support & Handling

- Five datasets: ProntoQA, FOLIO, LogicalDeduction, AR-LSAT, ProofWriter
- Downloads cached lazily into data/raw/; samples split reads bundled JSON
- Letter mapping: FOLIO True/False/Uncertain → A/B/C; ProofWriter adds C for unknown
- ProntoQA: A iff expected label derivable; B otherwise
- ProofWriter: C if nothing derivable from the program

## Solver Ecosystem

- Datalog (ProntoQA/ProofWriter): forward-chaining engine with Horn-ish rules, supports data-level negation, $x-style variables
- CSP (LogicalDeduction): full enumeration via backtracking with 20s timeout, most-constrained-first ordering
- FOL (FOLIO): recursive-descent parser, compiles to Z3 with proof→refute→unknown semantics
- Z3DSL (AR-LSAT): handles EnumSort, Count, Distinct, exactly-one-winner requirement; parser strips only is_valid/is_sat wrappers
- Each solver includes graceful error classification: ParseError, ExecutionError, CompileError, TimeoutError

## LLM Integration

I wrote adapters for OpenAI (gpt-4o-mini), Anthropic (claude-sonnet-4-5), and Ollama (OpenAI-compatible). MockClient enables offline testing: substring keyed, longest match wins. A factory maps aliases: mock/offline, openai/gpt, claude/anthropic, ollama/local. PromptLibrary reads from prompts/ with [[PLACEHOLDER]] filling (PROBLEM, QUESTION, CHOICES, PROGRAM, ERROR MESSAGE).

## Refinement System

- Per round: re-solves all examples, revises only failures via self-correct prompt
- Early-exits when all examples pass execution
- Returns RefineReport with rounds used, revised count, calls per example
- Refinement is execution-driven (failed programs only), not accuracy-driven
- Backup strategies trigger only on solver failures, not wrong answers

## Testing Philosophy

- Fully offline with 100+ assertions across 14 test files
- Each dataset has bundled samples with MockClient (executable-rate and accuracy must both be 1.0)
- Golden programs adapted from reference repo for datalog and FOLIO solvers
- Covers parser precedence, scope, refinement loop convergence, carry-over
- Network tests marked @pytest.mark.network (opt-in)
- Verified: 86/86 tests passing (goldens from the original repo's own solvers); all 5 sample dataset runs show accuracy=1.000, executable=1.000, exec-acc=1.000; package versioned 0.1.0

## Design Decisions Worth Noting

FOLIO "unknown" is a logical verdict, not a solver failure: a three-way split where prove P ∧ ¬C unsat → True (A); P ∧ C unsat → False (B); else Unknown (C). AR-LSAT requires exactly one winner; 0 winners means "no option was entailed/satisfiable"; more than 1 means "ambiguous". The CSP timeout is hardcoded to 20s internally, a minor inconsistency with the CLI's 10s default. refine.py runs the solver twice per failed example, once for collection and once for the error message: harmless redundancy. AR-LSAT repairs Function([...] -> [bool]) work; is_exception wrappers in prompts are not parsed, intentionally.

## How This Compares to the Original Paper

- Built from scratch (not a fork of teacherpeterpan/logic-llm): Python ≥3.13, uv, z3-solver, five dataset-specific solvers
- I deliberately diverged from the original paper in places, updated to modern standards rather than a strict reproduction
- Solver stack: replaced Prover9 binary with hand-written FOL→Z3; Pyke backward-chaining with custom forward-chaining; OR-tools CP-SAT with hand-rolled CSP; AR-LSAT exec subprocess with in-process Z3 (no exec anywhere)
- FOLIO semantics: fresh uninterpreted sort per example; Z3 unknown treated as execution error with --strict-unknown (the paper had no such guard)
- Data sources: fetches live from current public sources (BIG-bench, FOLIO GitHub, AR-LSAT GitHub, HF parquet) rather than bundled preprocessed datasets
- ProntoQA: narrowed to ProofsOnly zip members only (all answers A) vs. the paper's broader 2hop–5hop mix
- ProofWriter: capped at 20 depth-5 OWA examples
- LLMs: 2023-era GPT-4/OpenAI API → modern defaults (gpt-4o-mini, claude-sonnet-4-5, local Ollama), plus deterministic MockClient
- Robustness: Unicode-tolerant lexing (∀/∧/¬/⟹ canonicalized); structured SolverError types safe for refinement prompts

## Known Weaknesses & Gaps

## Generation Stage

My fundamental silent failure: the pipeline cannot distinguish semantically correct programs from syntactically valid but wrong ones. I added no retry on API failures: a transient 429 kills the whole run. generate_many exists but is unused; generation is sequential only. No output caching: regenerating on re-runs costs API money.

## Inference Stage: Solver Failure Nodes

- Datalog: no timeout at all, pathological programs can hang indefinitely; bare-word variables (x, y, z, a, b, c) silently mis-parse; no parentheses support in rules
- CSP: misspelled variable → constraint silently dropped; 10,000 solution cap can make answer unsound; hardcoded 20s timeout ignores CLI --solver-timeout-ms; query options not matching ^([A-G])\) are silently skipped
- FOL/Z3: Z3 is incomplete for first-order logic; quantifier-heavy formulas often return unknown; default maps to "Uncertain"/C (Prover9 would have proved it); --strict-unknown trades for execution-error→backup
- Z3-DSL: unknown name → silently wrong sort; is_exception wrapper in prompts isn't parsed; wrapper regex requires is_valid( (space flips semantics); options without ::: comment are dropped silently
- Registry: solve() catches only SolverError; any unexpected exception escapes and crashes the entire run

## Refinement Stage

Error-driven only, not answer-driven: wrong but executable programs are never revised. --max-refine-rounds > 0 on ProntoQA/ProofWriter/LogicalDeduction crashes (CLI accepts flag for all datasets despite missing templates). Last-write-wins: a worse "fix" replaces the original. No guarantee the revised program still contains original problem facts.

## Backup Stage

Random backup over the full letter space, not per-question options: for 3-object LogicalDeduction, backup gets 1/7 instead of 1/3 expected accuracy. LLM backup keyed by example id; if precomputed file IDs don't match the dataset version, silently falls back to random.

## Data & Evaluation

- ProntoQA loader only extracts ProofsOnly files and hardcodes every answer to "A"; eval can never test "False" reasoning
- ProofWriter capped at 20 rows (tiny, same for dev and test)
- URLs are unpinned → reproducibility drifts as upstream datasets change
- No flag-level breakdown beyond three headline numbers; parse error vs exec error drift isn't visible

## Testing Gaps

- Registry error-classification paths untested
- CSP timeout/cap behavior untested
- is_exception template bug untested
- test_lockers_golden assertion is vacuous
- test_strict_unknown_escalates never actually triggers z3 unknown
- No test for datalog timeout (the most likely hang risk)

## The Weaknesses That Matter Most

- Silent semantic failures (CSP dropped constraints, DSL wrong-sort constants) — solver succeeds on wrong program, no signal
- FOLIO fidelity gap: Z3 unknown vs Prover9 completeness
- Random-backup letter-space mismatch (1/7 vs 1/3 for 3-object LogicalDeduction)
- No per-example exception isolation — one unexpected solver exception kills entire run
- No datalog timeout — worst-case hang
- Degenerate ProntoQA eval (all-A) and 20-example ProofWriter

## Repository Structure

- logiclm/ — main package (~2500 LOC)
- cli.py — CLI commands: run, generate, infer, refine, evaluate, download-data
- pipeline.py — LogicLMPipeline orchestrates generate→infer→refine→evaluate
- prompts/ — 7 few-shot templates (5 generation, 2 self-correct)
- tests/ — 14 test files with offline golden programs and MockClient
- data/samples/ — bundled mini-datasets with canned programs
- scripts/download_datasets.py — fetches raw datasets on demand

## Getting Started

- git clone https://github.com/mohar-xe/Logical-LM.git
- cd Logical-LM
- Install with uv (Python ≥3.13): uv sync --extra llm
- Download datasets: logiclm download-data
- Run the full pipeline (requires API key or mock mode): logiclm run --dataset prontoqa --llm mock --output outputs/

## Conclusion

I built this compact (~2.5K LOC core) reimplementation to demonstrate that LLM-based logic programming can be reliable, testable, and reproducible. My deliberate design decisions (no exec, honest unknown handling, fresh sorts, data-level negation) are documented and enforced throughout the codebase. The gaps above are known, honest, and tracked as roadmap work rather than blockers. The result is a self-contained research system that reproduces the paper's pipeline end-to-end offline via bundled samples, and against real datasets once an API key is provided. But treat its numbers with care, especially for ProntoQA and ProofWriter.

The full codebase lives at [github.com/mohar-xe/Logical-LM](https://github.com/mohar-xe/Logical-LM).
