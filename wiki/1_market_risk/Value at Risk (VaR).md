---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.a, 1.b]
tags: [frm-part-2, market-risk, var]
---

# Value at Risk (VaR)

## Definition

VaR answers the question: *"Over a given holding period and at a given confidence level,
how much could I lose?"* It is the loss amount that will not be exceeded with probability
equal to the confidence level (e.g., 95% or 99%).

## Sign convention

Losses are conventionally quoted as **positive numbers**. If a $1,000,000 portfolio has a
95% one-month VaR of $155,000, that means: "with 95% confidence, the one-month loss will
not exceed $155,000" — even though the underlying P/L outcome driving this is negative.

## VaR is a quantile

Geometrically, VaR is the cut-off point (quantile) that separates the worst `α%` of
outcomes (the tail) from the remaining `(1 − α)%` of the distribution. Two ways to land on
that cut-off:

- Resample actual historical outcomes → [[Historical Simulation VaR]]
- Assume a distribution and use its quantile function → [[Parametric VaR]]

## The big limitation

VaR tells you *the threshold* a loss probably won't cross — but says nothing about how bad
things get **if** that threshold is crossed. Two distributions can have the *same* 95% VaR
but very different tail risk beyond that point. This gap is exactly what
[[Expected Shortfall]] and, more generally, [[Coherent Risk Measures]] are designed to fix.

## Related

- Built on [[Return Calculation Methods]] (VaR can be expressed in P/L space, arithmetic
  return space, or geometric/lognormal return space).
- An estimated VaR is just a sample quantile, so it has sampling error — see
  [[Standard Errors of Risk Measures]].
- Whether a parametric VaR formula is appropriate depends on whether the assumed
  distribution actually fits the data — see [[Quantile-Quantile (QQ) Plots]].
