---
title: Non-Parametric Methods - Pros and Cons
topic: market-risk
lesson: 2
tags: [non-parametric, advantages, disadvantages, var]
updated: 2026-06-12
---

# LO 2.d — Identify advantages and disadvantages of non-parametric estimation methods

**In plain terms:** non-parametric methods (everything covered in this lesson,
plus plain [[Historical Simulation VaR|historical simulation]]) are
data-driven rather than assumption-driven. That's both their biggest strength
and the source of all their weaknesses — strengths and weaknesses that mostly
trace back to one root cause: **everything depends on the historical sample**.

## Advantages

- **Conceptually simple and computationally light.** The core operations —
  sorting, slicing, averaging, resampling — can be done on a spreadsheet, with
  no need for specialized statistical software.
- **No fight with skewness or fat tails.** Because no distribution is assumed,
  these methods automatically reflect whatever shape the actual data has —
  skewed, fat-tailed, or otherwise. (Contrast with
  [[Parametric VaR - Normal and Lognormal|parametric VaR]], which can be biased
  if the assumed distribution doesn't match reality — see [[QQ Plots]].)
- **No variance-covariance matrix headaches.** Parametric multi-asset VaR
  requires estimating and inverting a variance-covariance matrix, which gets
  unwieldy as the number of assets grows. Non-parametric methods sidestep this
  entirely (with the partial exception of correlation-weighting, which
  reintroduces a covariance matrix — but as an *input* to be updated, not a
  structural requirement of the whole approach).
- **Works with readily available data.** Historical price/return series are
  generally easy to obtain and require no special adjustments (unlike, say,
  financial-statement-based analyses).
- **Composable.** These techniques aren't mutually exclusive — e.g., one can
  combine age-weighting with volatility-weighting, or layer bootstrapping on
  top of any of the weighting schemes, as filtered historical simulation does.

## Disadvantages

All of the following trace back to the same root issue: **the result is only
as good as the historical sample it's built from.**

- **Critical dependence on historical data.** If the sample doesn't represent
  the future well, neither will the risk estimate — there's no model to fall
  back on.
- **Volatile historical periods → VaR/ES estimates that are too high** for
  current (calmer) conditions.
- **Quiet historical periods → VaR/ES estimates that are too low** for current
  (more volatile) conditions. (Volatility-weighting and filtered historical
  simulation specifically target this and the previous point.)
- **Slow to detect structural breaks or regime changes** — by construction,
  these methods describe the past, and a genuine regime change only shows up
  gradually as new data accumulates (or not at all, for age-weighting with λ
  close to 1).
- **Can't imagine losses that haven't happened yet.** If a plausible but
  extreme event never occurred during the sample period, plain historical
  simulation has no mechanism to generate a loss estimate beyond the worst
  observed loss. (Volatility-weighting partially escapes this — see
  [[Weighted Historical Simulation Approaches]] — because rescaling can push a
  historical return beyond its original magnitude.)
- **Data-hungry.** A long, clean history is needed for the estimates to be
  meaningful, which can be a problem for new instruments, new markets, or
  assets with short trading histories.

## See also

- [[Weighted Historical Simulation Approaches]] — several of these
  disadvantages are exactly what age-, volatility-, correlation-, and filtered
  weighting schemes are designed to mitigate.
- [[Parametric VaR - Normal and Lognormal]] — the alternative family of
  methods, with its own different tradeoffs.
- [[Formulas]]
