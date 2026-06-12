---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.d]
tags: [frm-part-2, market-risk, coherent-risk-measures]
---

# Coherent Risk Measures

## The generalization

[[Expected Shortfall]] averages quantiles **within the tail** with equal weights. A
**coherent risk measure** generalizes this one step further: it's a **weighted average
of quantiles across the *entire* loss distribution**, where the weights reflect the
user's own risk-aversion profile — not just a mechanical "equal weight in the tail, zero
elsewhere" rule.

## ES and VaR as special cases

- **VaR** = a coherent risk measure that puts 100% of the weight on a single quantile.
- **ES** = a coherent risk measure with weight `1 / (1 − confidence level)` on every
  quantile in the tail, and zero weight everywhere else.
- A general coherent risk measure can spread weight across *all* quantiles (tail and
  non-tail), according to however the user defines their aversion to different levels
  of loss.

## Worked intuition (n = 10)

Split the entire return distribution into `n − 1 = 9` equal-probability slices (10%,
20%, ..., 90% confidence levels), each corresponding to a quantile (e.g., the 10%
quantile ↔ critical value ≈ −1.28, the 90% quantile ↔ critical value ≈ +1.28 under
normality). Apply the chosen risk-aversion weighting function to each quantile, then
average — that weighted average is the coherent risk measure.

## Practical trade-off

A general coherent risk measure is **more sensitive to the number of slices `n`** than
ES is, but it **converges to the true risk-measure value** as `n` grows large — the
larger `n` is, the further into the tails the quantiles reach, capturing more extreme
scenarios.

## Related

- [[Expected Shortfall]]
- [[Value at Risk (VaR)]]
- [[Standard Errors of Risk Measures]] — any quantile-based estimate (VaR, ES, or a
  general coherent measure) needs a precision check.
