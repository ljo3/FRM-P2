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

- Ingested `R2_Non_Parametric_Approaches.pdf` (Reading 2, lesson 2) from
  `raw/market-risk/`:
  - Wrote `wiki/market-risk/R2 - Non-Parametric Approaches/` with
    `Summary.md`, `Formulas.md`, `_INDEX.md`, and one page per learning
    outcome (`Bootstrap Historical Simulation.md`, `Non-Parametric Density
    Estimation.md`, `Weighted Historical Simulation Approaches.md`,
    `Non-Parametric Methods - Pros and Cons.md`).
  - Generated `quiz/data/market-risk/lesson2.json` (16 flashcards, 14
    questions); added it to `quiz/data/manifest.json` and
    `wiki/market-risk/_INDEX.md`.
  - Updated the root `_INDEX.md` under `market-risk` with a link to the
    Summary page and each learning-outcome page.
  - Moved the source PDF to `raw/market-risk/processed/` and recorded its
    sha256 hash, lesson number, and output paths in `sync_state.json`.

## 2026-06-13

- Ingested `R3_Parametric_Approaches_II_Extreme_Value.pdf` (Reading 3,
  lesson 3) from `raw/market-risk/`:
  - Wrote `wiki/market-risk/R3 - Parametric Approaches (II) - Extreme Value/`
    with `Summary.md`, `Formulas.md`, `_INDEX.md`, and one page per learning
    outcome (`Managing Extreme Values.md`, `Extreme Value Theory and the GEV
    Distribution.md`, `Peaks-Over-Threshold Approach.md`, `Comparing GEV and
    POT Approaches.md`, `Generalized Pareto Distribution and Extreme
    VaR.md`, `Multivariate Extreme Value Theory.md`).
  - Generated `quiz/data/market-risk/lesson3.json` (15 flashcards, 15
    questions); added it to `quiz/data/manifest.json` and
    `wiki/market-risk/_INDEX.md`.
  - Updated the root `_INDEX.md` under `market-risk` with a link to the
    Summary page and each learning-outcome page.
  - Moved the source PDF to `raw/market-risk/processed/` and recorded its
    sha256 hash, lesson number, and output paths in `sync_state.json`.

- Ingested `R4_Backtesting_VaR.pdf` (Reading 4, lesson 4) from
  `raw/market-risk/`:
  - Wrote `wiki/market-risk/R4 - Backtesting VaR/` with `Summary.md`,
    `Formulas.md`, `_INDEX.md`, and one page per learning outcome
    (`Backtesting Fundamentals.md`, `Failure Rates and the Z-Score Test.md`,
    `Type I and Type II Errors and the Kupiec Test.md`, `Conditional
    Coverage Testing.md`, `Basel Rules for Backtesting.md`).
  - Generated `quiz/data/market-risk/lesson4.json` (15 flashcards, 15
    questions); added it to `quiz/data/manifest.json` and
    `wiki/market-risk/_INDEX.md`.
  - Updated the root `_INDEX.md` under `market-risk` with a link to the
    Summary page and each learning-outcome page.
  - Moved the source PDF to `raw/market-risk/processed/` and recorded its
    sha256 hash, lesson number, and output paths in `sync_state.json`.

- Ingested `R5_VaR_Mapping.pdf` (Reading 5, lesson 5) from
  `raw/market-risk/`:
  - Wrote `wiki/market-risk/R5 - VaR Mapping/` with `Summary.md`,
    `Formulas.md`, `_INDEX.md`, and one page per learning outcome (`VaR
    Mapping Principles and Process.md`, `General and Specific Risk in
    Mapping.md`, `Mapping Fixed-Income Portfolios.md`, `Stress Testing via
    Mapping.md`, `Benchmarking and Tracking Error VaR.md`, `Mapping
    Forwards, Swaps, and Options.md`).
  - Generated `quiz/data/market-risk/lesson5.json` (15 flashcards, 15
    questions); added it to `quiz/data/manifest.json` and
    `wiki/market-risk/_INDEX.md`.
  - Updated the root `_INDEX.md` under `market-risk` with a link to the
    Summary page and each learning-outcome page.
  - Moved the source PDF to `raw/market-risk/processed/` and recorded its
    sha256 hash, lesson number, and output paths in `sync_state.json`.

- Ingested `R6_Messages_from_Academic_Literature_Trading_Book.pdf`
  (Reading 6, lesson 6) from `raw/market-risk/`:
  - Wrote `wiki/market-risk/R6 - Messages from the Academic Literature on
    Risk Measurement for the Trading Book/` with `Summary.md`,
    `Formulas.md`, `_INDEX.md`, and one page per learning outcome (`VaR
    Implementation Lessons.md`, `Liquidity Risk and LVaR.md`, `VaR vs
    Expected Shortfall and Spectral Risk Measures.md`, `Unified vs
    Compartmentalized Risk Measurement.md`, `Top-Down and Bottom-Up Risk
    Aggregation.md`, `Leverage, Balance Sheet Management, and
    Procyclicality.md`).
  - Generated `quiz/data/market-risk/lesson6.json` (17 flashcards, 22
    questions — above the usual 10-15 range, reflecting this lesson's six
    learning outcomes); added it to `quiz/data/manifest.json` and
    `wiki/market-risk/_INDEX.md`.
  - Updated the root `_INDEX.md` under `market-risk` with a link to the
    Summary page and each learning-outcome page.
  - Moved the source PDF to `raw/market-risk/processed/` and recorded its
    sha256 hash, lesson number, and output paths in `sync_state.json`.

