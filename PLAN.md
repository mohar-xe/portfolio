# Highlight Rendering Fix Plan

Three stages to close the gap between "N ERRORS" panel counts and inline highlight marks.

---

## Stage 1 — Normalizing Renderer (zero data changes)

**Goal:** Recover 21 dead spans + harden against Devanagari/ZWJ/whitespace/quote variants.

### New file: `src/lib/highlight-match.ts`

Create a normalizing, range-collecting matcher shared by both `HighlightedText` and `ReferenceText`.

Core functions:

- `buildMatcher(text) → { norm, map, cps }`
  - NFC-normalize
  - Strip ZWJ/ZWNJ/ZWSP/BOM (U+200B-200D, U+FEFF)
  - Fold Devanagari nukta chars (U+0958-U+095F → base forms: क़→क, ख़→ख, ग़→ग, ज़→ज, ड़→ड, ढ़→ढ, फ़→फ, य़→य)
  - Fold smart quotes (U+201C/D → ", U+2018/9 → ')
  - Fold dashes (U+2013/-, U+2014/-)
  - Collapse whitespace to single space
  - `map[i]` tracks original code point index for each normalized position

- `collectMatches(text, needles: TextHighlight[]) → { text, category }[]`
  - Build normalized haystack once
  - For each needle: normalize, find all occurrences via `indexOf` on normalized strings
  - Collect ranges `{ s, e, category }` in original string coordinates
  - Sort by position (earliest first, longest on tie)
  - Walk ranges: emit plain text between marks, emit mark spans
  - Return complete partition of the text

### Modify: `src/components/ExperimentViewer.tsx`

**HighlightedText (lines 35-104):** Replace `useMemo` body:

```tsx
const parts = useMemo(
  () => (highlightsList.length ? collectMatches(text, highlightsList) : [{ text, category: null }]),
  [text, highlightsList],
);
```

Rendering JSX stays identical.

**ReferenceText (lines 106-177):** Call `collectMatches` with omissions mapped to `{ text, category: "omissions" }`, then correlate the `methods` array back via a lookup map keyed by normalized span text. Amber `<mark>` styling and `title` attribute remain unchanged.

### Files touched
- `src/lib/highlight-match.ts` (new)
- `src/components/ExperimentViewer.tsx` (modify lines 35-177)

### Verification
- `npm run build` passes
- Visual check: Sample_5 CoT shows marks for `"由被告"` (was already rendering) and any other spans whose normalized forms now match
- 21 previously-dead spans render where the underlying text is present but had minor variants

---

## Stage 2 — Generate Highlights from confirmed_errors.json (big coverage jump)

**Goal:** Replace 122 hand-curated spans with all confirmed `highlight_span` entries from the verification file, growing inline marks to ~700+.

### New file: `scripts/generate-highlights.mjs`

Node script that:

1. Reads `experiments/Legal Summarization EN -> HI/confirmed_errors.json`
2. Reads `experiments/Legal Summarization EN -> HI/samples_extracted.json`
3. Filters `confirmedErrors` to `kind === "highlight_span"` where verdict is not `debunked` or `debunked_misattributed`
4. For each entry:
   - Normalize `claimedError` using the same normalization as Stage 1
   - Search for it in the normalized output text (`zeroShot`, `fewShot`, or `cot` depending on `method`)
   - If found → emit `{ text: claimedError, category }` entry
   - If not found → attempt fuzzy fallback: character-level alignment (longest common subsequence) between claimed span and nearest substring in output; if similarity > 85%, use the actual output substring as the span text instead
   - If unrecoverable → log to build warnings, skip
5. Groups spans by `sampleId` and `method` into the `SampleHighlights[]` structure
6. Derives `referenceOmissions` from `kind === "reference_omission"` entries (same logic as current hand-curated data)
7. Writes `src/lib/experiment-highlights.generated.ts`

### Modify: `package.json`

Add script:
```json
"generate-highlights": "node scripts/generate-highlights.mjs"
```

Wire into build:
```json
"build": "node scripts/generate-highlights.mjs && next build"
```

### Modify: `src/components/ExperimentViewer.tsx`

Change import from:
```tsx
import { highlights, type TextHighlight, type ReferenceOmission } from "@/lib/experiment-highlights";
```
To:
```tsx
import { highlights, type TextHighlight, type ReferenceOmission } from "@/lib/experiment-highlights.generated";
```

### Files touched
- `scripts/generate-highlights.mjs` (new)
- `src/lib/experiment-highlights.generated.ts` (generated, do not edit manually)
- `package.json` (add generate-highlights script, update build)
- `src/components/ExperimentViewer.tsx` (change import)

### Verification
- Run `node scripts/generate-highlights.mjs` and check console warnings for unmatched spans
- `npm run build` passes
- Visual check: Sample_5 CoT inline marks increase from 1-2 toward the number of span-kind confirmations in JSON
- Total visible `<mark>` elements across all samples increases dramatically

---

## Stage 3 — Full Parity: Snippets for Every Annotation Detail

**Goal:** Every annotation detail in the panel gets a corresponding inline span, so the panel count equals the inline mark count per category.

### Modify: `experiments/Legal Summarization EN -> HI/confirmed_errors.json`

Add a `snippet` field to every `annotation_detail` entry. The snippet is a verbatim substring from the model output that corresponds to the error. For entries that describe errors without a direct text substring (e.g. "Missing key legal principles", "Inverted ratio"), the snippet should be the closest relevant sentence or phrase from the output.

This is the labor-intensive step — ~736 annotation details need snippets. Process:

1. For each `annotation_detail` entry, read the corresponding output text from `samples_extracted.json`
2. Find the most relevant substring (manual or automated via the error description + output text alignment)
3. Set `snippet` to that substring
4. For entries where no suitable substring exists (omission-type errors, structural errors), set `snippet` to `null` and mark `renderable: false`

### Modify: `scripts/generate-highlights.mjs`

Extend the codegen to also process `annotation_detail` entries:

1. For entries with `snippet !== null && renderable !== false`:
   - Verify snippet normalizes to a substring of the output text
   - If found → emit as a `TextHighlight` with the entry's category
   - If not found → log warning, skip
2. For entries with `snippet === null || renderable === false`:
   - Keep as panel-only detail (no inline mark)
   - This is the documented remainder — the panel will always show more than inline marks for these structural/omission errors

### Modify: `src/lib/experiment-highlights.generated.ts` (output of codegen)

The generated module now contains two types of spans:
- `highlight_span` items (from Stage 2) — always rendered inline
- `annotation_detail` items with valid snippets — rendered inline with a slightly different visual treatment (e.g., lower opacity or dashed underline) to distinguish them from the primary highlight spans

Add a `source` field to the generated type:
```ts
interface GeneratedHighlight {
  text: string;
  category: ErrorCategory;
  source: "highlight_span" | "annotation_detail";
}
```

### Modify: `src/components/ExperimentViewer.tsx`

Update `HighlightedText` to accept both source types. Annotation-detail marks can use:
```tsx
style={{
  backgroundColor: `${errorColors[part.category]}15`,  // lighter than highlight_span's 25
  color: errorColors[part.category],
  borderBottom: `1px dashed ${errorColors[part.category]}`,  // dashed vs solid
}}
```

### Build-time drift assertion

In `generate-highlights.mjs`, after generating all spans, compare per sample/method:
- Count of rendered inline marks (highlight_span + annotation_detail with snippets)
- Count of total annotation details in `experiment-errors.ts`

Log a warning if they diverge by more than a threshold (e.g., >10% of details remain panel-only). This prevents silent drift like the current 122-vs-736 gap from recurring.

### Files touched
- `experiments/Legal Summarization EN -> HI/confirmed_errors.json` (add `snippet` field to annotation_details)
- `scripts/generate-highlights.mjs` (extend to process annotation_details)
- `src/lib/experiment-highlights.generated.ts` (generated output changes)
- `src/components/ExperimentViewer.tsx` (visual treatment for annotation-detail marks)

### Verification
- Run codegen, check warnings for unmatchable snippets
- `npm run build` passes
- Visual check: inline mark count per sample/method closely matches the panel error count
- Remaining panel-only items are structural errors with no text substring (documented, expected)
- Drift assertion fires if future annotation passes add details without snippets
