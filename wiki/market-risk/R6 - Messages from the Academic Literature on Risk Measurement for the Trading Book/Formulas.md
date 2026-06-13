---
title: Formulas (Lesson 6 - Messages from the Academic Literature on Risk Measurement for the Trading Book)
topic: market-risk
lesson: 6
tags: [formulas, lvar, var, expected-shortfall, leverage]
updated: 2026-06-13
---

# Formulas — Messages from the Academic Literature on Risk Measurement for the Trading Book

This reading is **conceptual rather than computational** — it surveys academic
findings about VaR implementation, liquidity risk, risk measure comparisons, and risk
aggregation, but it does not introduce new numerical formulas of its own. The few
quantitative relationships that do appear are conceptual/definitional rather than
formulas to be solved in a calculation problem. They are noted here for completeness
and for cross-referencing.

## Liquidity-adjusted VaR (LVaR) — conceptual relationship — [[Liquidity Risk and LVaR]] (LO 6.b)

LVaR ≈ VaR + Liquidity Cost

where:

- VaR is the standard value-at-risk estimate (from the methods covered in earlier
  readings — e.g., parametric, historical simulation, or Monte Carlo VaR), and
- Liquidity Cost is an add-on that reflects the cost of crossing the bid/ask spread
  (exogenous liquidity) to exit the position.

This relationship is presented at a conceptual level in this reading — LVaR is
described as VaR plus an adjustment for transaction (liquidity) costs, without a
prescribed formula for the liquidity cost component itself. A fully worked
bid/ask-spread-based LVaR formula is developed in later readings on liquidity risk
(see the liquidity-treasury topic area).

## Leverage and the market value of assets — conceptual relationship — [[Leverage, Balance Sheet Management, and Procyclicality]] (LO 6.f)

Leverage = Total Assets / Equity

This is the standard balance-sheet definition of leverage used to motivate the
procyclicality discussion: leverage moves inversely with the market value of assets
(equity absorbs gains and losses), which is the mechanical starting point for the
feedback-loop story in [[Leverage, Balance Sheet Management, and Procyclicality]].

## Diversification (integration) ratio — conceptual relationship — [[Top-Down and Bottom-Up Risk Aggregation]] (LO 6.e)

Diversification ratio = Unified (integrated) capital / Compartmentalized (separate) capital

- Ratio < 1 → diversification benefit (compartmentalized approach overstates risk).
- Ratio > 1 → risk compounding (compartmentalized approach understates risk).

This ratio is used in academic studies to evaluate whether top-down or bottom-up risk
aggregation methods support a diversification or a compounding conclusion; see
[[Top-Down and Bottom-Up Risk Aggregation]] for the discussion of findings.

## Related formula pages

- For the VaR and expected shortfall formulas themselves (parametric VaR, historical
  simulation VaR, ES tail-slicing), see the [[Formulas|Formulas page in R1 — Estimating Market Risk Measures]]
  — this lesson's [[VaR vs Expected Shortfall and Spectral Risk Measures]] page builds
  on those definitions rather than restating them.
