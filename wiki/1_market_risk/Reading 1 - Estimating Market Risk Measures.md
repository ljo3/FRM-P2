---
domain: Market Risk
reading: "Reading 1 — Estimating Market Risk Measures: An Introduction and Overview"
source-reference: "Dowd, Measuring Market Risk, Chapter 3"
tags: [frm-part-2, market-risk, index]
---

# Reading 1: Estimating Market Risk Measures — Overview

This reading lays the statistical foundation for everything else in the Market Risk topic
area: how to turn a distribution of profits/losses (or returns) into a single risk number,
and how to judge whether that number is trustworthy.

## Map of concepts

- **Foundations**
  - [[Return Calculation Methods]] — how P/L, arithmetic returns, and geometric returns
    are defined, and why the choice matters for VaR.
- **Estimating VaR**
  - [[Value at Risk (VaR)]] — the central concept: what VaR is, how it's quoted, and its
    main weakness.
  - [[Historical Simulation VaR]] — the non-parametric, "reorder the data" approach.
  - [[Parametric VaR]] — the normal (delta-normal) and lognormal closed-form approaches.
- **Beyond VaR**
  - [[Expected Shortfall]] — averaging tail VaRs to capture severity, not just frequency.
  - [[Coherent Risk Measures]] — generalizing ES to arbitrary risk-aversion weighting
    across the whole distribution.
- **Judging the estimates**
  - [[Standard Errors of Risk Measures]] — how precise a quantile-based estimate is, and
    what drives that precision.
  - [[Quantile-Quantile (QQ) Plots]] — a visual check of whether the assumed distribution
    is reasonable.

## How the pieces fit together

1. Start from a return/P&L series ([[Return Calculation Methods]]).
2. Pick a method to estimate the loss quantile: either resample history
   ([[Historical Simulation VaR]]) or assume a distribution ([[Parametric VaR]]).
3. Recognize that a single quantile ([[Value at Risk (VaR)]]) hides tail severity —
   average across tail quantiles instead ([[Expected Shortfall]]), or generalize further
   with risk-aversion weights ([[Coherent Risk Measures]]).
4. Quality-check both the distributional assumption
   ([[Quantile-Quantile (QQ) Plots]]) and the precision of the estimate itself
   ([[Standard Errors of Risk Measures]]).
