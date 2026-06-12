---
title: Weighted Historical Simulation Approaches
topic: market-risk
lesson: 2
tags: [historical-simulation, age-weighting, volatility-weighting, correlation-weighting, filtered-historical-simulation, garch]
updated: 2026-06-12
---

# LO 2.c — Compare and contrast the age-weighted, the volatility-weighted, the correlation-weighted, and the filtered historical simulation approaches

**In plain terms:** plain [[Historical Simulation VaR|historical simulation]]
gives every observation inside the estimation window an **equal weight** of
1/n, and every observation outside the window a weight of **zero**. This is a
crude assumption, and the four approaches in this LO each relax it in a
different way.

## The problem with equal weighting

Equal weighting (1/n inside the window, 0 outside) has three specific
weaknesses:

1. **Arbitrary cutoff.** An observation from *n* days ago counts fully, while
   an observation from *n* + 1 days ago counts not at all — there's no
   principled reason the importance of an observation should drop off a cliff
   at exactly that point.
2. **"Ghost effects."** A single extreme historical event continues to affect
   the VaR estimate at full weight for the entire window, then disappears
   abruptly from the calculation once it ages out — producing a sudden jump in
   VaR with no corresponding change in market conditions.
3. **i.i.d. assumption.** Equal weighting implicitly assumes observations are
   independent and identically distributed — but real return data often shows
   **seasonality** (volatility clustering, time-varying correlations), which
   violates this assumption.

The four approaches below each target one (or more) of these weaknesses.

## Age-weighted historical simulation

**What it changes:** *how much weight an observation gets, based on how old it
is.*

Rather than a hard 1/n-vs-0 cutoff, age-weighting assigns **exponentially
decaying weights** based on recency: the most recent observation gets the
largest weight, and each successively older observation gets a weight equal to
the previous one multiplied by a decay parameter λ (with 0 ≤ λ ≤ 1). Weights
are constructed so they sum to 1 across the sample — see [[Formulas]] for the
exact expression.

- λ close to **1** → slow decay → close to equal weighting (in fact, equal
  weighting is the special case λ = 1, i.e., no decay at all).
- λ close to **0** → fast decay → recent observations dominate almost
  entirely.

**What it fixes:** directly addresses ghost effects (an old extreme event
fades out gradually instead of disappearing all at once) and softens the
arbitrary-cutoff problem (there's no hard edge — weight just gets very small
for very old data). This approach is sometimes called the **hybrid approach**.

## Volatility-weighted historical simulation

**What it changes:** *the magnitude of each historical return, based on the
volatility prevailing when it occurred versus the volatility prevailing now.*

Rather than reweighting *probabilities*, this approach rescales the *returns
themselves*. Each historical return is multiplied by the ratio of the
**current** volatility forecast to the volatility forecast that prevailed **on
the day that return occurred** (both typically estimated via a GARCH or EWMA
model) — see [[Formulas]] for the exact expression. After rescaling, VaR, ES,
or any other coherent risk measure is computed exactly as before, just using
the volatility-adjusted returns instead of the raw historical returns.

The intuition: if volatility has recently *risen*, old returns (recorded
during a calmer period) are too small relative to what's likely now — scaling
them up corrects this. If volatility has recently *fallen*, old returns
(recorded during a more turbulent period) are too large — scaling them down
corrects this.

**What it fixes:** directly targets the i.i.d./seasonality problem by
explicitly incorporating a time-varying volatility model. A practical
side-benefit: because old high-volatility returns get scaled up when current
volatility is elevated, this approach can produce VaR estimates **larger than
any individual loss actually observed in the raw historical data** — something
plain historical simulation can never do (its VaR is always bounded by the
worst historical loss).

## Correlation-weighted historical simulation

**What it changes:** *the same rescaling idea as volatility-weighting, but
applied to the full variance-covariance matrix rather than just individual
variances.*

For a portfolio of multiple assets, the variance-covariance matrix Σ has
**diagonal elements** (each asset's own variance — i.e., volatility) and
**off-diagonal elements** (the covariances between asset pairs, which combined
with the variances determine correlations). Volatility-weighting updates only
the diagonal. Correlation-weighting updates the **entire matrix** — both the
variances and the covariances/correlations — to reflect current conditions,
and uses this updated matrix to produce correlation-adjusted returns.

**What it fixes:** everything volatility-weighting fixes, *plus* the
possibility that the *relationships* between assets (not just their individual
volatilities) have shifted — making it a richer (and more complex) tool for
multi-asset portfolios. The exact matrix algebra isn't the focus here; what
matters is the conceptual step up from "update each asset's volatility" to
"update the whole correlation/covariance structure."

## Filtered historical simulation

**What it changes:** *combines several of the above ideas — it's the most
comprehensive (and most complex) of the four.*

The procedure:

1. Fit a conditional volatility model (e.g., GARCH or an asymmetric GARCH
   variant that can capture a "surprise" effect on volatility) to the
   historical return series, producing a volatility forecast for each day in
   the sample.
2. **Standardize** each historical return by dividing by its corresponding
   volatility forecast — this strips out the time-varying volatility, leaving
   a series that should be closer to i.i.d.
3. **Bootstrap** (resample with replacement, per
   [[Bootstrap Historical Simulation|LO 2.a]]) from this standardized series to
   simulate returns, then rescale the simulated returns using the *current*
   volatility forecast.
4. Read VaR (or ES) off the resulting simulated distribution.

**What it fixes:** by combining a volatility model with bootstrapped
historical simulation, filtered historical simulation captures **conditional
volatility, volatility clustering, and asymmetric ("surprise") effects** —
addressing the i.i.d. problem as thoroughly as any of these four approaches —
while remaining grounded in the historical-simulation framework. It can also
extend to longer holding periods and multi-asset portfolios, and despite its
sophistication, remains computationally reasonable even for large portfolios.
The tradeoff is complexity: it requires fitting a volatility model as an extra
step, on top of the historical simulation machinery itself.

## Summary comparison

| Approach | Reweights... | Mainly addresses |
|---|---|---|
| Age-weighted | probabilities (by recency) | arbitrary cutoff, ghost effects |
| Volatility-weighted | return magnitudes (by volatility ratio) | i.i.d. / changing volatility |
| Correlation-weighted | return magnitudes (by full covariance matrix) | i.i.d. / changing volatility *and* correlation |
| Filtered | both — standardizes, bootstraps, rescales | all of the above, most comprehensively |

## See also

- [[Historical Simulation VaR]] — the baseline (equal-weighted) method.
- [[Bootstrap Historical Simulation]] — the resampling technique used inside
  filtered historical simulation.
- [[Non-Parametric Methods - Pros and Cons]]
- [[Formulas]]
