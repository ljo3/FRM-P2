---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.e]
tags: [frm-part-2, market-risk, standard-errors]
---

# Standard Errors of Risk Measures

## Why this matters

[[Value at Risk (VaR)]], [[Expected Shortfall]], and general
[[Coherent Risk Measures]] are all **estimates** based on a finite sample. An estimate
without a sense of its precision isn't very useful — a VaR of "$1 million ± $50,000" is a
very different statement from "$1 million ± $900,000," even though the point estimate is
identical.

## Standard error of a quantile

For a quantile `q` (e.g., the 95% VaR quantile), estimated from a sample of size `n` with
bin width `Δ` around `q`:

```
se(q) = sqrt(p(1 − p) / n) / f(q)
```

where:
- `p` = the tail probability associated with the bin around `q`
- `f(q)` = the probability mass (density) in that bin

## Building a confidence interval

A `(1 − α)` confidence interval for the true VaR, centered on the estimated quantile `q`,
takes the form:

```
[q − se(q) × z_α]  <  VaR  <  [q + se(q) × z_α]
```

Note this is a **two-tailed** interval (unlike VaR itself, which is one-tailed) — so a
90% confidence interval splits the remaining 10% into 5% in each tail, using the same
`z_α` as a 5% one-tailed VaR critical value.

## Comparative statics — what makes the estimate more/less precise?

| Change | Effect on `se(q)` | Why |
|---|---|---|
| Sample size `n` ↑ | ↓ | More observations shrink the sampling variance of any quantile estimate. |
| Bin width `Δ` (around `q`) ↑ | ↓ | A wider bin raises the estimated density `f(q)` and lowers the associated tail probability `p`, both of which reduce `se(q)`. |
| Tail probability `p` ↑ | ↑ | `p(1 − p)` — the variance driver in the numerator — increases as `p` moves toward 0.5, widening the confidence interval. |

## Related

- [[Value at Risk (VaR)]]
- [[Coherent Risk Measures]] — the same logic generalizes from a single quantile to a
  weighted average of many quantiles.
- [[Quantile-Quantile (QQ) Plots]] — a complementary, visual way to assess whether the
  underlying distributional assumption is reasonable.
