---
title: Non-Parametric Density Estimation
topic: market-risk
lesson: 2
tags: [historical-simulation, density-estimation, var]
updated: 2026-06-12
---

# LO 2.b — Describe historical simulation using non-parametric density estimation

**In plain terms:** plain [[Historical Simulation VaR|historical simulation]]
can only produce VaR at confidence levels that correspond to actual gaps
between sorted observations. Non-parametric density estimation "smooths" the
histogram of historical data so that VaR can be read off at *any* confidence
level — not just the ones the raw data happens to land on.

## The discreteness problem

With *n* historical observations, plain historical simulation can only
distinguish *n* different confidence levels. For example, with 100
observations you can estimate VaR at the 95% or 96% confidence level (because
those correspond to the 5th or 4th worst observation), but there's no
well-defined way to estimate VaR at 95.5% — there's no observation that sits
exactly there. More observations help (more achievable confidence levels), but
the underlying problem — a finite, discrete sample implying a step-function
distribution — never goes away on its own.

## The fix: a surrogate density function

The non-parametric fix doesn't add any new assumptions about the *shape* of
the distribution (it's still "non-parametric" in that sense) — it just
**connects the dots** of the existing histogram to create a continuous curve.

The simplest version of this: take the histogram of historical observations,
and instead of treating each bar as a flat block, connect the **midpoint of
the top of each bar** to the midpoint of the top of the next bar with a
straight line segment. The result is called a **surrogate density function** —
a piecewise-linear curve that approximates the true (unknown) density.

A key property of this construction: connecting the midpoints **shifts area
between adjacent bars but doesn't create or destroy any** — a taller bar
"donates" some of its area to a shorter neighboring bar, and vice versa, but
the total area under the curve is conserved. So the surrogate function remains
a valid probability distribution (it still integrates to 1), just with a
smoother shape than the original step-histogram.

Because the surrogate density is continuous rather than a step function, you
can now identify a cutoff point — and therefore a VaR estimate — at *any*
confidence level, including ones that fall strictly between two adjacent
historical observations.

## Beyond linear connections

Connecting midpoints with straight lines is the simplest possible smoothing
rule, but it's not the only one. More sophisticated versions connect
successive bars with **curves** rather than straight lines, which can track
the shape of the underlying data more faithfully — at the cost of additional
complexity. The linear version is the one most often discussed because it
illustrates the core idea (continuity from a discrete sample) without
requiring any additional machinery.

## See also

- [[Historical Simulation VaR]] — the method being extended here.
- [[Weighted Historical Simulation Approaches]] — a different way of improving
  on plain historical simulation, focused on *weighting* observations rather
  than *smoothing* the histogram.
- [[Formulas]]
