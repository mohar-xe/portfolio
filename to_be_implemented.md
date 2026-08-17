# To Be Implemented

> Checked against Cloudflare Developer Platform free tier (2026-08-02).
> Ref: https://www.cloudflare.com/plans/developer-platform/, https://developers.cloudflare.com/pages/platform/limits/
>
> Real data pulled from GitHub API (mohar-xe) + `resume.tex` (2026-08-02).
> Note: `gh` CLI not installed / no token configured — used `api.github.com` directly.

---

## 1. Convert portfolio to Cloudflare Pages static export

**Status:** ✅ Done (2026-08-02)
**Why:** Current setup uses `output: "standalone"` (Node server + Caddy + `.zscripts/`) which targets a Function-Compute-style sandbox, not Cloudflare Pages. The portfolio page itself (`src/app/page.tsx`) is a pure client component — all data is inline, zero server fetches — so it's trivially static and fits the free tier with huge headroom.

### Steps
1. `next.config.ts` → set `output: "export"` (and drop `typescript.ignoreBuildErrors`)
2. Delete or gate `src/app/api/route.ts` (the "Hello world" `/api` route **breaks** `output: "export"` — verified build failure)
3. Fix the npm `build` script in `package.json` — remove the standalone `cp` steps (`cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/`)
4. (Optional) Prune unused server deps: prisma, @prisma/client, next-auth, next-intl, react-query, dnd-kit, etc.
5. Deploy: Git → Cloudflare Pages, or `npx wrangler pages deploy out/`

### Verified
- `output: "export"` compiles clean; `/` prerenders as static in ~400ms
- Disabling `/api` route alone makes the static export succeed

### Notes / not applicable
- Prisma + SQLite (`db/custom.db`) is dead scaffolding — imported by nothing
- `upload/` (1.9M), `download/`, `db/`, empty `mini-services/` are filesystem state that doesn't exist on the free tier
- Do **not** go the OpenNext/D1 route unless SQLite + API is actually needed later — it hits the 10 ms CPU / 100k-req-per-day ceiling for no benefit on a portfolio

---

## 2. Fix stale/fabricated portfolio content with real data

**Status:** ✅ Done (2026-08-02)
**Why:** `src/app/page.tsx` contains fabricated projects, metrics, and personal details that don't exist on GitHub or in `resume.tex`. Replace with real data below.

### Real GitHub projects (mohar-xe — public only, pulled via `gh` 2026-08-02)
**17 own repos (2 starred):**
- `bis-re` (Python) — **2 stars**, "BIS Standard Recommendation Engine" (README, eval script, presentation.pdf, src)
- `Hybrid-RAG` (Python) — flagship, see resume detail below
- `csv_cleaner` (Python) — 1 star, CSV cleaning script
- `HGR_dataset_pipeline` (Python) — KG extraction dataset generation
- `finetuning_qwen3` (Jupyter) — LoRA fine-tune notebook
- `HGR-finetuned-model-evaluation-pipeline` (Python) — eval harness
- `Grey` (Python) — "agentic research system based on bisociation"
- `PunyPunk` (Jupyter) — train PunyPunk scripts
- `discord-toxicity-bot` (Go) — classification ML + Go backend
- `KAN-Symbolic` (Python) — KAN symbolic regression
- `trading_bot` (Python)
- `Speculative-Decoder-Simulator` (Python)
- `fume-client-intelligence` (Python)
- `builds` (Jupyter)
- `Darpan`
- `mohar-xe` (About me), `Resume`

**Forks (NOT authored by you — exclude):** `jaeger`, `khoj`, `cognee`, `tracer`, `sdk` (CNCF / Kubeflow ecosystem)

**Note:** `warroom-ai` and `MeetingSummarizer` are **private** — intentionally excluded.

### Real contact / identity (from resume.tex)
- Name: **Mohar Das**
- Location: **Kolkata, India**
- Phone: **+91-9775211066** (page currently shows +91 98042 45845 — WRONG)
- Email: **official.mohar.d@gmail.com** (page currently shows mohardas19@gmail.com — WRONG)
- GitHub: **github.com/mohar-xe** ✓ (correct on page)
- LinkedIn: **linkedin.com/in/mohardas** (page currently shows /in/mohar-das — WRONG)
- Hugging Face: **huggingface.co/mohar07** (missing on page)
- Tagline: "Self-taught AI/ML engineer — Retrieval Systems & Agentic AI. Available full-time, immediate start. Open to remote roles."

### Real experience (from resume.tex)
- **AI Research Intern @ Azmth Lab Pvt. Ltd.** (July 2026 – Present, India)
  - Research/prototype neuro-symbolic AI architectures for reasoning systems
  - Translate SOTA research into experimental code + benchmarking
  - Literature review, architecture design, research-driven engineering

### Real education (from resume.tex)
- **Indian Institute of Technology Madras** — B.S. in Data Science and Applications (2025 – Expected 2029)
  - Online, self-paced (built for concurrent full-time employment)
  - Coursework: ML Foundations, Deep Learning, Computer Vision, DBMS, DSA, OS, Software Engineering, Business Analytics

### Real skills (from resume.tex)
- **Languages:** Python, Go, SQL
- **ML:** PyTorch, Hugging Face, Unsloth, LoRA/QLoRA, LLM Fine-tuning, Knowledge Graphs, RAG, LangGraph
- **Retrieval & AI:** pgvector, BM25, HNSW, Reciprocal Rank Fusion, Cross-encoder Reranking, Agentic AI, Structured Reasoning
- **Infrastructure:** PostgreSQL, KuzuDB, FastAPI, Docker, Supabase, Ollama
- **Libraries & Tools:** sentence-transformers, NumPy, SciPy, Tavily, Typer, Gradio, Streamlit

### Flagship project details (from resume.tex) — for the Projects tab
1. **Hybrid Graph RAG** — Python, PostgreSQL/pgvector, KuzuDB, FastAPI, Docker
   - 8-stage hybrid retrieval (dense HNSW, BM25, KG traversal, RRF, cross-encoder rerank)
   - HotpotQA ablation (100 queries): KG traversal lifted EM 29%→52%; full pipeline **66% F1, 80% answer recall, 82% Hit@5, 90% answer-in-context**
   - Repo: github.com/mohar-xe/Hybrid-RAG · Live: hybrid-rag-6fnb.onrender.com
2. **Knowledge Graph Extraction Pipeline** — Qwen3, LoRA, Unsloth, HF
   - 3,350 instruction samples / 20 relation types; Qwen3-0.6B 4-bit LoRA → **100% schema adherence, 0.6850 composite**
   - Repos: HGR_dataset_pipeline · finetuning_qwen3 · HGR-finetuned-model-evaluation-pipeline
3. **Grey — Agentic Research Framework** — Python, LangGraph, FastAPI, Anthropic, Groq, Tavily
   - 9-agent LangGraph pipeline, qualifier-driven routing, critique loops; metrics-first eval over 9 scenarios
   - Repo: github.com/mohar-xe/Grey

### Fabricated content currently on page — REPLACE or REMOVE
- Projects: **Argus, ReviewSage, langchain-kuzu, rag-fusion-py, graph-chunker, LlamaIndex contributor** — none exist publicly
- Star counts (120 / 98 / 86 / 64, 340 / 215 / 178, "15 PRs") — fabricated; real top is `bis-re` at 2 stars
- Metrics: 120 / 98 / 86 / 64 stars, 340 / 215 / 178 stars, "15 PRs", "10K+ daily users", "50+ projects" — all fabricated
- Experience: AI Research Engineer / ML Engineer / Backend Dev / Data Science Intern (2021–2024) — fabricated; real experience is only the Azmth internship
- Education: M.Tech in AI & ML, B.Tech CSE, fellowships — fabricated; real = IIT Madras B.S. Data Science (2025–2029)
- Contact: mohardas19@gmail.com, +91 98042 45845, linkedin /in/mohar-das — wrong per resume

---

## What was implemented (2026-08-02)

### Cloudflare static export conversion
- `next.config.ts` → `output: "export"`, `images: { unoptimized: true }`; dropped `typescript.ignoreBuildErrors`
- Deleted `src/app/api/route.ts` (hello-world API route — blocked `output: "export"`)
- `package.json` → `build: next build`, new `deploy: bun run build && wrangler pages deploy out`, `start: bunx serve out`
- Added `wrangler.toml` (`pages_build_output_dir = "out"`) — `npx wrangler pages deploy out` works out of the box
- `tsconfig.json` → excluded `examples`, `download`, `upload`, `db` from type-check (scaffold debris was failing the build once `ignoreBuildErrors` was removed)
- `public/logo.svg` → replaced Z-ai/chatglm CDN branding with a clean "MD" monogram (emerald on dark)
- `src/app/layout.tsx` → favicon points to local `/logo.svg` instead of external CDN

### Real content
- `src/app/page.tsx` fully rewritten with real data (kept the exact design: split-screen, 4 tabs, 2×2 color-coded grid)
  - **Contact:** official.mohar.d@gmail.com · +91 97752 11066 · github.com/mohar-xe · linkedin.com/in/mohardas · huggingface.co/mohar07 · Kolkata, India
  - **Projects tab:** Hybrid Graph RAG · Knowledge Graph Extraction Pipeline · Grey (Agentic Research) · BIS Standard Recommendation Engine (bis-re, 2★)
  - **Experience tab:** AI Research Intern @ Azmth Lab (July 2026–Present)
  - **Education tab:** IIT Madras B.S. Data Science (2025–2029)
  - **Open Source tab:** csv_cleaner · KAN-Symbolic · discord-toxicity-bot · Speculative-Decoder-Simulator
- All fabricated content removed (Argus, ReviewSage, langchain-kuzu, M.Tech/B.Tech, fake star counts, wrong contacts)

### Verified
- `bun run build` → static export succeeds (out/, 44 files, 1.2M), `/` prerendered
- All real content present in bundle; all fabricated content gone
- `bun run lint` → clean
- Local serve test: `/`, `/logo.svg`, `/robots.txt` all HTTP 200
- Note: `examples/websocket` still references `socket.io-client` but is excluded from the build — safe to delete later

### Deploy (not yet run — needs your Cloudflare account)
```bash
npx wrangler login          # one-time
bun run deploy              # builds then deploys to Cloudflare Pages
```
