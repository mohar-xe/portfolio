#!/usr/bin/env node

/**
 * Adds `snippet` fields to annotation_detail entries in confirmed_errors.json.
 * For each entry, extracts Hindi text from the claimedError description and
 * checks if it exists (normalized) in the model output. If found, sets snippet
 * to the verbatim output substring. If not, sets snippet to null (panel-only).
 *
 * Run with: node scripts/add-snippets.mjs
 */

import fs from "node:fs";
import path from "node:path";

const DIR = "experiments/Legal Summarization EN -> HI";

// --- Unicode normalization (same as highlight-match.ts) ------------------

const NUKTA = {
  "\u0958": "\u0915", "\u0959": "\u0916", "\u095A": "\u0917",
  "\u095B": "\u091C", "\u095C": "\u0921", "\u095D": "\u0922",
  "\u095E": "\u092B", "\u095F": "\u092F",
};
const QUOTES = { "\u201C": '"', "\u201D": '"', "\u2018": "'", "\u2019": "'" };
const DASHES = { "\u2013": "-", "\u2014": "-" };

function fold(ch) {
  const n = NUKTA[ch] ?? ch;
  if (QUOTES[n] !== undefined) return QUOTES[n];
  if (DASHES[n] !== undefined) return DASHES[n];
  return n;
}

function normalize(text) {
  const cps = [...text.normalize("NFC")];
  let norm = "";
  let prevSpace = false;
  for (const ch of cps) {
    if ((ch >= "\u200B" && ch <= "\u200D") || ch === "\uFEFF") continue;
    if (ch === "\u00A0" || /\s/.test(ch)) {
      if (!prevSpace) { norm += " "; prevSpace = true; }
      continue;
    }
    prevSpace = false;
    norm += fold(ch).toLowerCase();
  }
  return norm;
}

/** Find the verbatim haystack slice corresponding to a normalized needle match. */
function findVerbatimSlice(haystack, needleNorm) {
  const hayNorm = normalize(haystack);
  const idx = hayNorm.indexOf(needleNorm);
  if (idx === -1) return null;

  // Map normalized position back to original code points
  const cps = [...haystack.normalize("NFC")];
  const map = [];
  let nIdx = 0;
  let prevSpace = false;
  for (let i = 0; i < cps.length; i++) {
    const ch = cps[i];
    if ((ch >= "\u200B" && ch <= "\u200D") || ch === "\uFEFF") continue;
    if (ch === "\u00A0" || /\s/.test(ch)) {
      if (!prevSpace) { map.push(i); prevSpace = true; }
      continue;
    }
    prevSpace = false;
    map.push(i);
  }

  const start = map[idx];
  const end = map[idx + needleNorm.length - 1] + 1;
  return haystack.slice(start, end);
}

// --- Extract Hindi text from claimedError ---------------------------------

function extractHindiCandidates(claimedError) {
  const candidates = [];

  // Pattern 1: Quoted Devanagari text — "रासा" for राशि
  const quoted = claimedError.match(/[""\u201C\u201D]([\u0900-\u097F][^""\u201C\u201D]*)[""\u201C\u201D]/g);
  if (quoted) {
    for (const q of quoted) {
      const inner = q.slice(1, -1);
      if (/[\u0900-\u097F]/.test(inner)) candidates.push(inner);
    }
  }

  // Pattern 2: Parenthesized Devanagari — (वाइटर), (secular) for circular
  const paren = claimedError.match(/\(([\u0900-\u097F][^)]*)\)/g);
  if (paren) {
    for (const p of paren) {
      const inner = p.slice(1, -1);
      if (/[\u0900-\u097F]/.test(inner)) candidates.push(inner);
    }
  }

  // Pattern 3: Standalone Devanagari words in the string
  const standalone = claimedError.match(/[\u0900-\u097F]{2,}/g);
  if (standalone) {
    for (const s of standalone) {
      if (!candidates.some(c => c.includes(s) || s.includes(c))) {
        candidates.push(s);
      }
    }
  }

  return candidates;
}

// --- Load data -----------------------------------------------------------

const confirmed = JSON.parse(
  fs.readFileSync(path.join(DIR, "confirmed_errors.json"), "utf8")
);
const samples = JSON.parse(
  fs.readFileSync(path.join(DIR, "samples_extracted.json"), "utf8")
);

const FIELD = { zero: "zeroShot", few: "fewShot", cot: "cot" };

// --- Process annotation_details ------------------------------------------

let added = 0;
let skipped = 0;
const warnings = [];

for (const entry of confirmed.confirmedErrors) {
  if (entry.kind !== "annotation_detail") continue;

  const sampleData = samples[entry.sampleId];
  if (!sampleData) {
    entry.snippet = null;
    skipped++;
    continue;
  }

  const outputText = sampleData[FIELD[entry.method]];
  if (!outputText) {
    entry.snippet = null;
    skipped++;
    continue;
  }

  const candidates = extractHindiCandidates(entry.claimedError);

  let foundSnippet = null;
  for (const cand of candidates) {
    const candNorm = normalize(cand);
    if (candNorm.length < 2) continue;

    const slice = findVerbatimSlice(outputText, candNorm);
    if (slice) {
      foundSnippet = slice;
      break;
    }
  }

  entry.snippet = foundSnippet;

  if (foundSnippet) {
    added++;
  } else {
    skipped++;
    if (candidates.length > 0) {
      warnings.push(
        `${entry.sampleId}/${entry.method}: "${entry.claimedError.slice(0, 60)}" — candidates [${candidates.join(", ")}] not found in output`
      );
    }
  }
}

// --- Write back ----------------------------------------------------------

fs.writeFileSync(
  path.join(DIR, "confirmed_errors.json"),
  JSON.stringify(confirmed, null, 2) + "\n"
);

// --- Report --------------------------------------------------------------

const total = confirmed.confirmedErrors.filter(e => e.kind === "annotation_detail").length;
console.log(`Processed ${total} annotation_detail entries`);
console.log(`  ${added} got snippets`);
console.log(`  ${skipped} remain panel-only (snippet: null)`);

if (warnings.length > 0) {
  console.log(`\n${warnings.length} candidate(s) extracted but not found in output:`);
  for (const w of warnings.slice(0, 30)) {
    console.log(`  ${w}`);
  }
  if (warnings.length > 30) {
    console.log(`  ... and ${warnings.length - 30} more`);
  }
}
