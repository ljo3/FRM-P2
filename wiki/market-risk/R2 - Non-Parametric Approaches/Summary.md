---
title: Non-Parametric Approaches - Summary
topic: market-risk
lesson: 2
tags: [market-risk, non-parametric, historical-simulation, summary]
updated: 2026-06-12
---

# Non-Parametric Approaches

This lesson extends historical simulation from the previous lesson in two
directions: making better use of a *given* sample (via bootstrapping and
density smoothing), and making the sample itself more representative of
*current* conditions (via various reweighting schemes). The unifying theme of
"non-parametric" methods is that **the data drives the estimate** — no normal,
lognormal, or other distributional assumption is imposed, in contrast to the
parametric approaches of the previous lesson.

## How the pieces fit together

- [[Bootstrap Historical Simulation|Bootstrap historical simulation]] takes
  repeated random resamples (with replacement) of the historical data,
  computes a risk measure from each resample, and averages the results — a
  way of squeezing a more *precise* estimate out of the same underlying data.
- [[Non-Parametric Density Estimation|Non-parametric density estimation]]
  tackles a different problem: ordinary historical simulation can only
  produce VaR at confidence levels that line up with actual data points.
  Smoothing the histogram lets you read off VaR at *any* confidence level.
- [[Weighted Historical Simulation Approaches|Weighted historical simulation]]
  approaches — age-weighted, volatility-weighted, correlation-weighted, and
  filtered — address the equal-weighting assumption baked into plain
  historical simulation, each in a different way and with different
  tradeoffs.
- [[Non-Parametric Methods - Pros and Cons|Advantages and disadvantages]] ties
  it together: when do these data-driven methods shine, and when does their
  reliance on historical data become a liability?

## Learning outcome pages

- [[Bootstrap Historical Simulation]] (LO 2.a)
- [[Non-Parametric Density Estimation]] (LO 2.b)
- [[Weighted Historical Simulation Approaches]] (LO 2.c)
- [[Non-Parametric Methods - Pros and Cons]] (LO 2.d)
- [[Formulas]] — formulas from this lesson
