---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.f]
tags: [frm-part-2, market-risk, qq-plot]
---

# Quantile-Quantile (QQ) Plots

## Purpose

You never observe the "true" distribution generating your data — only a sample of
realizations. A **QQ plot** is a visual diagnostic: it plots the quantiles of your
**empirical** data against the quantiles of a **theoretical/reference** distribution
(commonly the standard normal) at the same confidence levels.

## Reading the plot

- If the empirical distribution matches the theoretical one, the points fall on (or
  close to) a **straight 45° line** — e.g., both medians (50% confidence level) plot near
  zero.
- **Deviations in the tails** are the most informative part: if the empirical quantiles
  diverge from the theoretical line as you move toward the extremes, the empirical
  distribution has different tail behavior.

## Fat tails vs. thin tails

A classic example: compare a Student's t-distribution (with relatively few degrees of
freedom) to the standard normal. Both are symmetric, so the *centers* of the QQ plot line
up closely. But because the t-distribution has **fatter tails**, its extreme quantiles
sit further out than the normal's — e.g., at 97.5% confidence the normal critical value
is about 1.96, while a t-distribution (≈40 df) critical value might be closer to 2.02.
The QQ plot visibly bows away from the 45° line at the extremes.

**General reading rule:** if the centers of a QQ plot align but the tails diverge, the
empirical distribution is symmetric but has tails that are either fatter or thinner than
the reference distribution.

## Why this matters for risk management

QQ plots are a quick sanity check before relying on [[Parametric VaR]]: if your return
data's QQ plot against the normal distribution bows away from the line in the left tail,
a normal-based VaR will likely **understate** tail risk (because real tails are fatter
than normal). This is part of the motivation for non-normal models and for cross-checking
with [[Historical Simulation VaR]].

## Related

- [[Historical Simulation VaR]]
- [[Value at Risk (VaR)]]
- [[Parametric VaR]]
