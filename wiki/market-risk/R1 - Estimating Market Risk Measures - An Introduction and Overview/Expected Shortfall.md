---
title: Expected Shortfall
topic: market-risk
lesson: 1
tags: [expected-shortfall, var, tail-risk]
updated: 2026-06-12
---

# LO 1.c — Estimate the expected shortfall given profit and loss (P/L) or return data

**In plain terms:** VaR tells you the *threshold* loss at a given confidence
level but says nothing about how bad things get once that threshold is
crossed. Expected shortfall (ES) answers "if we *do* end up in the tail, how
big is the loss on average?"

## Why VaR isn't enough

Two portfolios can have identical VaR(5%) figures while having very different
tail risk — one might have a tail that "just barely" exceeds the VaR
threshold, while the other has a tail with occasional catastrophic losses far
beyond it. VaR can't distinguish these. ES can, because it looks *inside* the
tail rather than just at its edge.

## How ES is estimated

The construction takes the tail region — everything beyond the VaR threshold
— and slices it into *n* − 1 equally-sized probability bands. A VaR figure is
computed at the confidence level corresponding to each slice boundary, and ES
is simply the **average of those VaR figures**.

> **Worked example.** Suppose we want ES for the 95% VaR tail (i.e., the worst
> 5% of outcomes) using n = 5 slices, so we need n − 1 = 4 VaR figures at
> confidence levels spaced evenly through the tail: 96%, 97%, 98%, and 99%.
> Using a standard normal distribution, the corresponding critical values are
> approximately 1.7507, 1.8808, 2.0537, and 2.3263. Averaging these four
> values gives 2.003 — this is the ES estimate (in standard-deviation units).
> For comparison, the *true* ES for the normal distribution's 5% tail (using
> an arbitrarily large number of slices) is about 2.063. The 4-slice estimate
> of 2.003 is close but slightly understates the true tail average, because a
> coarse slicing misses the most extreme part of the tail.

Two patterns are worth noting from this construction:

- As you move from the 96% slice to the 99% slice, the VaR figure
  *increases* — the gaps between successive VaRs grow as you move deeper into
  the tail, which is exactly what you'd expect from a distribution whose
  density is dropping off in the tail.
- As **n increases** (more, finer slices), the ES estimate converges toward
  the true theoretical tail average. With a very large number of slices (in
  the thousands), the estimate becomes effectively exact.

## Relationship to VaR

ES can be thought of as a *refinement* of VaR rather than a competitor: it
uses the exact same building block (a VaR calculation at a given confidence
level) but applies it repeatedly across the tail and averages the results,
rather than reporting a single point on the tail's edge. This relationship
becomes even clearer in [[Coherent Risk Measures and Quantiles]], where ES is
shown to be one specific case of a much more general weighting scheme.

## See also

- [[Historical Simulation VaR]] and [[Parametric VaR - Normal and Lognormal]]
  — either can supply the underlying VaR figures used to build ES.
- [[Coherent Risk Measures and Quantiles]] — ES as a special case of a
  coherent risk measure.
- [[Formulas]]
