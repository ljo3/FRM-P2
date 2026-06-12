---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.a]
tags: [frm-part-2, market-risk, var, historical-simulation]
---

# Historical Simulation VaR

## The idea

Historical simulation is the "no model" way to estimate [[Value at Risk (VaR)]]: take a
history of actual P/L (or return) observations, **sort them from worst loss to best
gain**, and read off the observation that sits at the boundary of the tail.

## Picking the cutoff observation

For `n` observations and a `(1 − α)` confidence level, the tail contains roughly `α × n`
observations. The boundary observation is approximately:

```
(α × n) + 1
```

In practice, exam conventions vary — sometimes the `α × n`-th observation itself is used
as a simpler approximation, especially when it produces a round number. The +1 mainly
matters at the margins.

## Worked example

With 1,000 monthly return observations and a 95% confidence level:
- `α = 5%`, so `α × n = 50`
- The 51st-worst observation (≈ `(α × n) + 1`) separates the bottom 5% (tail) from the
  top 95% (body)
- If that observation corresponds to a return of −15.5%, and the portfolio is worth
  $1,000,000, the one-month 95% VaR is `0.155 × $1,000,000 = $155,000`.

## Strengths and weaknesses

**Strengths**
- No distributional assumption needed — works for any shape (skewed, fat-tailed, etc.).
- Simple to compute and explain.

**Weaknesses**
- Only sensible if the future is expected to resemble the historical sample period.
- Can't adapt quickly to a structural break or regime change (e.g., a sudden spike in
  volatility) because it's entirely backward-looking.
- With limited history, tail estimates rely on very few observations →
  large [[Standard Errors of Risk Measures|standard error]].

## Checking the distribution-free claim

Even though historical simulation doesn't *assume* a distribution, you can still use a
[[Quantile-Quantile (QQ) Plots|QQ plot]] to compare the empirical distribution to a
theoretical one (e.g., normal) — useful for sanity-checking whether a
[[Parametric VaR]] shortcut would give a similar answer.

## Related

- [[Value at Risk (VaR)]]
- [[Parametric VaR]] — the model-based alternative
- [[Quantile-Quantile (QQ) Plots]]
