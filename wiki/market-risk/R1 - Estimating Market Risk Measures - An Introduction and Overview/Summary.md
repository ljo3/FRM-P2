---
title: Estimating Market Risk Measures - Summary
topic: market-risk
lesson: 1
tags: [market-risk, var, expected-shortfall, coherent-risk-measures, summary]
updated: 2026-06-12
---

# Estimating Market Risk Measures: An Introduction and Overview

This lesson lays the groundwork for the market risk curriculum by introducing
the core tools used to measure potential trading losses. It starts from the
basic building blocks — profit/loss (P/L) data and the two ways of expressing
returns (arithmetic vs. geometric) — and then builds up to the major loss
measures used throughout the rest of the syllabus: value at risk (VaR),
expected shortfall (ES), and the broader family of coherent risk measures. It
closes with a method for checking whether a return series matches an assumed
distribution (the QQ plot).

Everything here is **foundational**: the next lesson on non-parametric
approaches builds directly on the historical-simulation idea introduced here,
and later readings on backtesting, volatility forecasting, and portfolio VaR
all assume familiarity with VaR, ES, and coherent risk measures as defined in
this lesson.

## How the pieces fit together

- A loss distribution can be estimated either by **letting the data speak for
  itself** ([[Historical Simulation VaR|historical simulation]]) or by
  **assuming a shape** for the distribution and estimating its parameters
  ([[Parametric VaR - Normal and Lognormal|parametric VaR]]).
- VaR answers "how bad could it get at this confidence level?" but says
  nothing about how bad things get *beyond* that point.
  [[Expected Shortfall|Expected shortfall]] fixes this by averaging losses
  throughout the tail.
- [[Coherent Risk Measures and Quantiles|Coherent risk measures]] generalize
  both VaR and ES into a single framework based on weighting quantiles of the
  loss distribution according to the risk manager's own aversion to extreme
  losses.
- No estimate is exact —
  [[Standard Errors of Risk Measure Estimators|standard errors]] tell us how
  much uncertainty surrounds a risk-measure estimate, and how that uncertainty
  changes with sample size, bin width, and tail depth.
- [[QQ Plots|QQ plots]] give a quick visual check of whether a chosen
  distributional assumption (e.g., normal) is reasonable for the data at hand
  — useful context for deciding whether the parametric approach is
  trustworthy.

## Learning outcome pages

- [[Historical Simulation VaR]] (LO 1.a)
- [[Parametric VaR - Normal and Lognormal]] (LO 1.b)
- [[Expected Shortfall]] (LO 1.c)
- [[Coherent Risk Measures and Quantiles]] (LO 1.d)
- [[Standard Errors of Risk Measure Estimators]] (LO 1.e)
- [[QQ Plots]] (LO 1.f)
- [[Formulas]] — every formula from this lesson in one place
