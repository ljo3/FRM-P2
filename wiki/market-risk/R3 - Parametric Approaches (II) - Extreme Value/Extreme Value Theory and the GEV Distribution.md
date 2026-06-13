---
title: Extreme Value Theory and the GEV Distribution
topic: market-risk
lesson: 3
tags: [extreme-value-theory, GEV, Fisher-Tippett, tail-index]
updated: 2026-06-13
---

# LO 3.b — Describe extreme value theory (EVT) and its use in risk management

**In plain terms:** EVT is the branch of statistics that asks "if I keep
taking the *worst* outcome from each big batch of data, what distribution do
those worst outcomes follow as the batches get large?" The answer is a
single family of distributions — the generalized extreme value (GEV) family
— no matter what the underlying data looks like.

## What makes EVT different

Most statistical tools risk managers use day to day — means, variances,
correlations, the central limit theorem — describe **central tendency**:
where the bulk of outcomes cluster. EVT deliberately ignores the center and
focuses only on the **extremes**. It gives risk managers a template for
estimating the parameters that describe how bad the bad outcomes can get,
without needing to get the whole distribution right.

## The Fisher-Tippett theorem and the GEV distribution

Split a long history of losses into many blocks (e.g., one block per month),
and take the **maximum loss in each block**, denoted M_n for a block of size
n. The Fisher-Tippett theorem says that as n gets large, the distribution of
these block maxima M_n converges to a single family of distributions: the
**generalized extreme value (GEV) distribution**.

The GEV distribution has three parameters:

- **μ (location)** and **σ (scale)** — related to, but not the same as, the
  mean and standard deviation of the limiting distribution.
- **ξ (xi), the tail index** — governs the *shape*, specifically the
  heaviness of the tail. This single parameter is what determines which of
  three families the GEV distribution reduces to.

(See [[Formulas]] for the GEV cumulative distribution function.)

## The three cases of the GEV distribution

The sign of ξ splits the GEV family into three named distributions:

1. **ξ > 0 → Frechet distribution.** Heavy tails — the same tail behavior as
   the Student's t-distribution or the Pareto distribution. This is the case
   most often relevant to financial loss data, which tends to be fat-tailed.
2. **ξ = 0 → Gumbel distribution.** Light tails — comparable to the normal
   or lognormal distribution.
3. **ξ < 0 → Weibull distribution.** Tails *lighter* than the normal
   distribution. This case is rarely encountered in financial applications.

Because the ξ < 0 (Weibull) case is uncommon in finance, practical risk
management essentially narrows the choice down to two cases: ξ > 0 (Frechet)
versus ξ = 0 (Gumbel).

## Choosing between ξ > 0 and ξ = 0 in practice

A researcher has three reasonable ways to decide which case to apply:

1. **Rely on knowledge of the parent distribution.** If there's good reason
   to believe the underlying return distribution is, say, a t-distribution
   (known to be heavy-tailed), assume ξ > 0.
2. **Test the data.** Run a statistical test for ξ = 0; if it cannot be
   rejected, proceed under the ξ = 0 (Gumbel) assumption.
3. **Be conservative.** When in doubt, assume ξ > 0 (Frechet). Treating tails
   as heavier than they might actually be is the more conservative choice
   from a model-risk standpoint — understating tail risk is the more
   dangerous error.

## Relationship to the rest of the lesson

The GEV distribution is one of two routes EVT takes to the tail — the other
being the threshold-exceedance route covered in
[[Peaks-Over-Threshold Approach]]. Both routes share the same tail index ξ,
which is why [[Comparing GEV and POT Approaches]] can treat them as two views
of the same underlying theory.

## See also

- [[Managing Extreme Values]]
- [[Peaks-Over-Threshold Approach]]
- [[Generalized Pareto Distribution and Extreme VaR]]
- [[Comparing GEV and POT Approaches]]
- [[Formulas]]
