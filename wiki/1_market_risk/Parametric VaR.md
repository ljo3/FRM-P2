---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.b]
tags: [frm-part-2, market-risk, var, parametric, delta-normal, lognormal]
---

# Parametric VaR

## The idea

Instead of resampling history ([[Historical Simulation VaR]]), parametric VaR **assumes a
distribution** for P/L or returns (commonly normal or lognormal) and plugs the
distribution's quantile (critical value `z_α`) into a closed-form formula.

## Normal VaR (delta-normal)

If P/L is assumed normal with mean `μ_P/L` and standard deviation `σ_P/L`:

```
VaR(α%) = −μ_P/L + σ_P/L × z_α
```

`z_α` is the standard normal critical value for significance level `α` (e.g.,
`z_5% ≈ 1.65`, `z_1% ≈ 2.33`).

**Example.** P/L is normal with mean $5 million and standard deviation $12 million:
- `VaR(5%) = −$5m + $12m × 1.65 = $14.8m`
- `VaR(1%) = −$5m + $12m × 2.33 = $23.0m`

Note `VaR(1%) > VaR(5%)`: a smaller significance level pushes further into the tail, so
the loss threshold is larger.

The same formula applies to **arithmetic returns** (`r_t`, mean `μ_r`, std dev `σ_r`),
scaled by the starting portfolio value `P_{t-1}`:

```
VaR(α%) = (−μ_r + σ_r × z_α) × P_{t-1}
```

## Lognormal VaR

If **geometric returns** (`R_t`, from [[Return Calculation Methods]]) are normally
distributed with mean `μ_R` and std dev `σ_R`, then prices are lognormally distributed —
which guarantees they stay positive. The corresponding VaR formula is:

```
VaR(α%) = P_{t-1} × (1 − exp(μ_R − σ_R × z_α))
```

**Example.** Geometric returns have mean 5% and std dev 20%, starting portfolio value
$500:
- `VaR(5%) = $500 × (1 − exp(0.05 − 0.20 × 1.65)) = $500 × (1 − exp(−0.28)) ≈ $122.2`
- `VaR(1%) = $500 × (1 − exp(0.05 − 0.20 × 2.33)) = $500 × (1 − exp(−0.416)) ≈ $170.2`

## Normal vs. lognormal — when do they agree?

Over **short time horizons**, arithmetic and geometric returns are numerically close, so
normal VaR (on arithmetic returns) and lognormal VaR (on geometric returns) give similar
answers. The gap widens for longer horizons or larger return volatilities, where the
compounding effect captured by the lognormal model becomes more important.

## Related

- [[Value at Risk (VaR)]]
- [[Return Calculation Methods]]
- [[Historical Simulation VaR]] — the model-free alternative
- [[Expected Shortfall]] — what parametric VaR is missing
