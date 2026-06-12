---
title: Parametric VaR - Normal and Lognormal
topic: market-risk
lesson: 1
tags: [var, parametric, normal-distribution, lognormal-distribution]
updated: 2026-06-12
---

# LO 1.b — Estimate VaR using a parametric approach for both normal and lognormal return distributions

**In plain terms:** instead of relying purely on the empirical sample like
[[Historical Simulation VaR|historical simulation]], assume the P/L or return
series follows a known distribution (normal or lognormal), estimate that
distribution's mean and standard deviation from the sample, and read the VaR
straight off the distribution's formula.

## Why assume a distribution at all?

The parametric (sometimes called "delta-normal") approach trades the
flexibility of historical simulation for two advantages: it can produce a VaR
estimate for *any* confidence level (not just ones representable by the
sample size), and it smooths over noise in a small or unusual sample by
leaning on the mathematical structure of the assumed distribution. The cost is
the obvious one — if the assumed distribution doesn't fit the data well, the
VaR estimate will be biased. (The [[QQ Plots|QQ plot]] is the standard tool
for checking this.)

## Normal VaR

If the P/L distribution is normal with mean μ and standard deviation σ, VaR at
significance level α is found by shifting the (negative of the) mean by a
multiple of the standard deviation, where the multiple is the standard normal
critical value z_α for that significance level (e.g., z = 1.65 for α = 5%,
z = 2.33 for α = 1%). See [[Formulas]] for the exact expression.

Two equivalent flavors show up depending on what kind of data you start with:

- If you have **P/L data** directly, plug the P/L mean and standard deviation
  into the VaR formula and the result is already in dollar terms.
- If you have **arithmetic return data**, compute VaR as a *return*, then
  scale by the starting portfolio value to convert to dollars.

> **Worked example (P/L data).** A portfolio's annual P/L is normally
> distributed with a mean profit of $12 million and a standard deviation of
> $8 million.
>
> - VaR(5%) = −$12m + $8m × 1.65 = $1.2 million
> - VaR(1%) = −$12m + $8m × 2.33 = $6.64 million
>
> Both numbers are losses: at 95% confidence the portfolio won't lose more
> than $1.2 million; at 99% confidence it won't lose more than $6.64 million.
> The 99% figure is larger because moving further into the tail (a less likely
> event) requires a bigger cushion.

> **Worked example (return data).** A $200 portfolio has arithmetic returns
> that are normally distributed with mean 8% and standard deviation 18%.
>
> - VaR(5%) = (−8% + 1.65 × 18%) × $200 = $21.4
> - VaR(1%) = (−8% + 2.33 × 18%) × $200 = $68.0

Notice the pattern in both examples: VaR = −(mean) + (critical value) ×
(standard deviation), and a *higher* confidence level (smaller α, bigger
critical value) always produces a *larger* VaR figure, because you're now
guarding against a more extreme — and therefore rarer — outcome.

## Lognormal VaR

The normal distribution allows negative values, which is awkward for asset
*prices* (a price can't go below zero). The **lognormal distribution** —
bounded below by zero and right-skewed — is the natural fix: if geometric
(continuously compounded) returns are normally distributed with mean μ_R and
standard deviation σ_R, then the price level itself follows a lognormal
distribution.

Working through the algebra of this relationship produces a VaR formula that
looks different from the normal case but plays the same role — see
[[Formulas]] for the expression. The key structural difference is that the
lognormal VaR formula uses an **exponential** of the shifted-mean term, rather
than a simple linear combination, because we're translating a statement about
log-returns back into a statement about the level of the portfolio.

> **Worked example.** A portfolio currently worth $500 has geometric returns
> that are normally distributed with mean 6% and standard deviation 25%.
>
> - Lognormal VaR(5%) = $500 × (1 − e^(0.06 − 0.25 × 1.65)) = $500 ×
>   (1 − e^(−0.3525)) ≈ $146.5
> - Lognormal VaR(1%) = $500 × (1 − e^(0.06 − 0.25 × 2.33)) = $500 ×
>   (1 − e^(−0.5225)) ≈ $203.7

## When do normal and lognormal VaR converge?

Over **short holding periods**, geometric and arithmetic returns are close to
each other numerically (the gap between ln(1 + r) and r shrinks as r shrinks),
so normal VaR computed from arithmetic returns and lognormal VaR computed from
geometric returns will give very similar dollar figures. The gap widens as the
holding period — and therefore the typical size of r — grows.

## See also

- [[Historical Simulation VaR]] — the assumption-free alternative.
- [[QQ Plots]] — how to check whether the normal/lognormal assumption is
  reasonable.
- [[Formulas]]
