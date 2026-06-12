# Ingest Log

Append-only chronological record of every ingest. Newest entries at the
bottom. Each entry: date, source file, what was created.

## 2026-06-12

- Scaffolded the LLM wiki: created `raw/`, `wiki/`, `quiz/` (with
  `quiz/data/`) topic folders for market-risk, credit-risk,
  operational-risk, liquidity-treasury, investment-management, and
  current-issues; initialized `quiz/data/manifest.json`; wrote `_INDEX.md`,
  `log.md`, `AGENTS.md`, and `sync_state.json`. Every topic folder (and the
  project root) has its own `_INDEX.md`. No lessons ingested yet.
