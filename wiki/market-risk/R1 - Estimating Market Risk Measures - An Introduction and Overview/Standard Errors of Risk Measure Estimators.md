---
title: Standard Errors of Risk Measure Estimators
topic: market-risk
lesson: 1
tags: [standard-error, confidence-interval, var, quantile-estimation]
updated: 2026-06-12
---

# LO 1.e — Evaluate estimators of risk measures by estimating their standard errors

**In plain terms:** a VaR (or ES, or coherent risk measure) figure is an
*estimate*, not a fact — it comes with sampling uncertainty just like any
other statistic. This LO is about quantifying that uncertainty so a risk
estimate can be reported with a confidence interval rather than as a single
"true" number.

## Why precision matters

An estimator that bounces around wildly from sample to sample — i.e., one
with a **large standard error** — is far less useful for decision-making than
one that's stable, even if both have the same expected value. Best practice is
therefore to report not just the point estimate of a coherent risk measure
(VaR, ES, or the general case), but also its standard error and an implied
confidence interval.

## Building blocks: bin width and the density at the quantile

Think of a histogram of the loss distribution. A **quantile** *q* sits at some
point on this histogram, and we can draw a small **bin** of width *r* around
it. The standard error of the quantile estimate depends on:

- **p** — the probability mass falling in that bin (the area under the
  histogram between the bin's edges).
- **f(q)** — the height of the density at the quantile, i.e., how "tall" the
  distribution is at that point. This is recovered from p and the bin width.
- **n** — the sample size.

The standard error formula (see [[Formulas]]) combines these into a single
expression: se(q) = √(p(1 − p) / n) / f(q).

Once se(q) is known, a confidence interval for the risk measure is built by
applying the *same* critical value z_α used in the original VaR calculation,
symmetrically around q:

[q + z_α × se(q)] > VaR > [q − z_α × se(q)]

> **Worked example.** Suppose we want a 90% confidence interval around the 5%
> VaR (i.e., the 95% quantile) of a standard normal distribution, using a bin
> width of 0.1 and a sample size of 800.
>
> The 5% VaR quantile for the standard normal is 1.65. With bin width 0.1, the
> bin spans [1.65 − 0.05, 1.65 + 0.05] = [1.60, 1.70]. Using standard normal
> probabilities, the area to the left of 1.60 is about 0.9452 and the area to
> the left of 1.70 is about 0.9554, so the probability mass *inside* the bin
> is p ≈ 0.9554 − 0.9452 = 0.0102. The density at the quantile is then
> f(q) = p / (bin width) = 0.0102 / 0.1 = 0.102.
>
> se(q) = √(0.0102 × (1 − 0.0102) / 800) / 0.102 ≈ √(0.0000126) / 0.102 ≈
> 0.00355 / 0.102 ≈ 0.0349
>
> A 90% confidence interval (using the same z = 1.65 from the VaR calculation
> itself, since a 90% two-tailed interval splits 5% into each tail) is then:
> 1.65 ± 1.65 × 0.0349 ≈ 1.65 ± 0.058, or roughly [1.59, 1.71].

## How the inputs move the standard error

Holding everything else fixed:

- **Larger sample size (n) → smaller standard error.** More data always
  tightens the confidence interval, all else equal.
- **Wider bin (r), holding n fixed → smaller standard error.** A wider bin
  captures more probability mass p around the quantile, and the net effect of
  a wider bin is to make the quantile estimate less sensitive to exactly where
  individual observations fall — narrowing the confidence interval.
- **Probability mass closer to the centre of the distribution (p closer to
  0.5) → larger standard error**, holding n and the bin width fixed. The term
  p(1 − p) inside the square root is maximized at p = 0.5 and shrinks toward
  zero as p approaches 0 or 1, so — all else equal — standard errors for
  quantiles nearer the median are larger than for quantiles deep in a tail.

## See also

- [[Coherent Risk Measures and Quantiles]] — the quantile-based estimates whose
  precision this LO addresses.
- [[Formulas]]
