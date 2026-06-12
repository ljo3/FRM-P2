---
title: Historical Simulation VaR
topic: market-risk
lesson: 1
tags: [var, historical-simulation, returns]
updated: 2026-06-12
---

# LO 1.a — Estimate VaR using a historical simulation approach

**In plain terms:** given a series of past profit/loss (or return) outcomes,
rank them from worst to best and read off the loss that sits at the boundary
of the tail you care about. That boundary loss *is* the VaR estimate.

## Background: P/L and return conventions

Before estimating anything, it helps to fix notation for how gains and losses
are expressed, since the same underlying data can be described as profit/loss
(P/L), arithmetic returns, or geometric (continuously compounded) returns.

- **Profit/loss (P/L):** the dollar change in the value of a position over one
  period, including any cash distributions received during the period (see
  [[Formulas]] for the exact expression).
- **Arithmetic return:** the percentage change in value over the period,
  assuming any interim cash distribution is *not* reinvested. This is a poor
  approximation over long horizons because it ignores compounding.
- **Geometric (continuously compounded) return:** the log of the ratio of
  end-of-period to start-of-period value (including distributions), which
  implicitly assumes continuous reinvestment of any distributions. Because
  it's a logarithm, the underlying price can never be driven to or below zero
  — a useful property when we later assume a lognormal distribution for
  prices.

One more convention worth internalizing: **losses are reported as positive
numbers**. If a $1 million portfolio is expected to fall in value by
$150,000, we say "the expected loss is $150,000," not "the expected profit is
−$150,000." VaR and ES figures inherit this convention — a "VaR of $1.5
million" describes a *loss*, even though the underlying calculation may
produce a negative number internally.

## The historical simulation idea

Historical simulation is the most direct way to estimate VaR because it makes
**no assumption about the shape of the return distribution** — it simply uses
the empirical distribution of past outcomes as a stand-in for the distribution
of future outcomes.

The procedure:

1. Collect a sample of *n* historical P/L (or return) observations for the
   position.
2. Order the observations from the largest loss to the largest gain.
3. Pick the significance level α you care about (e.g., α = 5% for a 95%
   confidence VaR).
4. The VaR estimate is the loss value sitting at approximately the
   **(α × n)-th** ordered observation, counting from the worst loss.

Because the data is discrete, "approximately" matters: with *n* observations,
only confidence levels that correspond to whole numbers of observations are
representable. In practice you'll see this implemented either as the
**(α × n)th** observation or the **(α × n) + 1th** observation — both are
reasonable approximations to the same underlying quantile. The +1 convention
treats the chosen observation as the first one *inside* the body of the
distribution (i.e., the boundary between the tail and the rest), while the
plain (α × n) convention treats it as the last one *inside* the tail.

> **Worked example.** Suppose a desk has 500 daily P/L observations and wants
> the 99% VaR (α = 1%). Then α × n = 5. Ordering losses from worst to best,
> the 5th worst loss (or the 6th, under the +1 convention) is read off
> directly as the VaR estimate — no distributional assumption required.

## Why this matters, and its limits

The appeal of historical simulation is its simplicity and its freedom from
distributional assumptions: if the real data is skewed or fat-tailed, the
historical method automatically reflects that, whereas a normal-distribution
assumption would not.

The cost is that historical simulation is a **backward-looking** method. It
implicitly assumes that the process generating returns going forward will look
like the process that generated the historical sample. Two practical
consequences:

- If market conditions change (a volatility regime shift, a structural break),
  historical simulation has no way to adjust until enough new data
  accumulates.
- The discreteness of the sample limits which confidence levels are even
  representable — a theme picked up again in
  [[Non-Parametric Density Estimation]], where the historical approach is
  extended to smooth over this limitation.

## See also

- [[Parametric VaR - Normal and Lognormal]] — the alternative approach that
  *does* assume a distribution.
- [[Formulas]] — P/L, arithmetic return, and geometric return formulas.
