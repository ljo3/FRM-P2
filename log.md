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

- Ingested `R1_Estimating_Market_Risk_Measures.pdf` (Reading 1, lesson 1)
  from `raw/market-risk/`:
  - Wrote `wiki/market-risk/R1 - Estimating Market Risk Measures - An Introduction and Overview/`
    with `Summary.md`, `Formulas.md`, `_INDEX.md`, and one page per learning
    outcome (`Historical Simulation VaR.md`, `Parametric VaR - Normal and
    Lognormal.md`, `Expected Shortfall.md`, `Coherent Risk Measures and
    Quantiles.md`, `Standard Errors of Risk Measure Estimators.md`,
    `QQ Plots.md`).
  - Generated `quiz/data/market-risk/lesson1.json` (16 flashcards, 14
    questions); added it to `quiz/data/manifest.json` and
    `wiki/market-risk/_INDEX.md`.
  - Updated the root `_INDEX.md` under `market-risk` with a link to the
    Summary page and each learning-outcome page.
  - Moved the source PDF to `raw/market-risk/processed/` and recorded its
    sha256 hash, lesson number, and output paths in `sync_state.json`.
