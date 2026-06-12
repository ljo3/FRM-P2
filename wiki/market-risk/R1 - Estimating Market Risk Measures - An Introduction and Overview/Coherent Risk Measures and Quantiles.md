---
title: Coherent Risk Measures and Quantiles
topic: market-risk
lesson: 1
tags: [coherent-risk-measures, quantiles, expected-shortfall, var]
updated: 2026-06-12
---

# LO 1.d — Estimate risk measures by estimating quantiles

**In plain terms:** both VaR and [[Expected Shortfall|ES]] are really
statements about *quantiles* of the loss distribution. A **coherent risk
measure** generalizes this idea: it's a weighted average of quantiles taken
across the *entire* distribution (not just the tail), where the weights
reflect how averse the risk manager is to losses of different sizes.

## From "a quantile" to "a weighted average of quantiles"

- **VaR** is literally just *one* quantile of the loss distribution — the
  value separating the tail from the body at a chosen confidence level.
- **ES**, as built in [[Expected Shortfall]], is an *average* of several
  quantiles, but only the ones falling **inside the tail** — and each tail
  quantile gets equal weight.
- A **coherent risk measure** goes one step further: it takes a weighted
  average of quantiles spanning the **whole distribution**, with weights set
  according to the risk manager's own risk aversion. Where ES effectively
  applies a weight of 1 / (1 − confidence level) to every tail quantile and a
  weight of zero to everything else, a general coherent risk measure can
  spread non-zero weight across non-tail quantiles too, with the weighting
  function reflecting how much the user cares about losses at each point in
  the distribution.

So: **VaR ⊂ ES ⊂ coherent risk measures**, in the sense that each is a special
case of the next, obtained by choosing a particular (increasingly flexible)
weighting scheme over quantiles.

## Constructing a coherent risk measure

The mechanics mirror the ES construction, but applied to the full
distribution rather than just the tail:

1. Divide the **entire** return/loss distribution into *n* − 1 equal
   probability slices (rather than slicing only the tail, as ES does).
2. Identify the quantile (critical value) corresponding to each slice
   boundary. For example, with slices at every 10% of probability mass
   (n = 10), the boundaries sit at the 10th, 20th, ..., 90th percentiles of
   the distribution — for a standard normal distribution these correspond to
   critical values of roughly −1.2816 (10th percentile), −0.8416 (20th
   percentile), ..., +1.2816 (90th percentile).
3. Apply the chosen risk-aversion weighting function to each quantile.
4. Average the weighted quantiles to obtain the coherent risk measure.

## Sensitivity to the number of slices

Compared to ES, a general coherent risk measure is **more sensitive to the
choice of n**. Increasing n pushes the quantile boundaries further into the
extremes of the distribution (both tails, not just one), so a coherent risk
measure with a large n will be more influenced by extreme observations than
one with a small n. As with ES, however, the estimate **converges** to the
measure's true value as n grows large — the sensitivity is about precision and
stability of the estimate, not about the measure being "more correct" at
larger n in some absolute sense beyond convergence.

## See also

- [[Expected Shortfall]] — the special case where weight is concentrated
  entirely on tail quantiles.
- [[Standard Errors of Risk Measure Estimators]] — how precise these
  quantile-based estimates actually are.
- [[Formulas]]
