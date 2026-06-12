---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.c]
tags: [frm-part-2, market-risk, expected-shortfall]
---

# Expected Shortfall (ES)

## Why ES exists

[[Value at Risk (VaR)]] tells you the *threshold* loss at a given confidence level but
says nothing about how severe losses get beyond that threshold. **Expected shortfall**
fixes this by reporting the **average loss across the tail**, not just the boundary.

## How it's constructed

Pick a number of slices `n`. Divide the tail region into `n` equal probability masses,
and compute the VaR at each of the resulting `n − 1` confidence levels. ES is the
**average of those VaRs**.

**Worked example (n = 5):** Compute VaR at the 96%, 97%, 98%, and 99% confidence levels
(four VaRs, since `n − 1 = 4`), then average them. The result is ES — a single number
that summarizes the expected loss *given that you're already in the tail*.

## Convergence

As `n` increases, the slices get finer and ES converges toward the **true expected tail
loss** — the theoretical conditional expectation of loss beyond the VaR threshold
(sometimes called "Conditional VaR" or CVaR in other contexts). With a small `n`, ES is
only a rough approximation; with a large `n` (thousands of slices), it approaches the
theoretical value.

## ES vs. VaR

| | VaR | ES |
|---|---|---|
| What it measures | A single quantile (the tail boundary) | The average of quantiles *within* the tail |
| Tells you about severity beyond the threshold? | No | Yes |
| Special case of? | — | A [[Coherent Risk Measures\|coherent risk measure]] |

## Related

- [[Value at Risk (VaR)]]
- [[Coherent Risk Measures]] — ES is the special case where the weighting function is
  `1 / (1 − confidence level)` for all tail quantiles and zero everywhere else.
- [[Parametric VaR]] — each "VaR" in the ES average can itself be computed
  parametrically.
