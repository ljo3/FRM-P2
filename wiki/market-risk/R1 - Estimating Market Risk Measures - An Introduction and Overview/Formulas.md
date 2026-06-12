---
title: Formulas (Lesson 1 - Estimating Market Risk Measures)
topic: market-risk
lesson: 1
tags: [formulas, var, expected-shortfall, coherent-risk-measures]
updated: 2026-06-12
---

# Formulas — Estimating Market Risk Measures: An Introduction and Overview

All formulas from this lesson, grouped by the learning outcome that uses them.
Loss convention: VaR and ES are reported as **positive numbers**, even though
the underlying expressions often produce a negative value internally (a
negative P/L or return).

## Returns and P/L (background for [[Historical Simulation VaR]])

**Profit/loss over one period:**

P/L_t = P_t + D_t − P_(t−1)

where P_t is the position's value at the end of period t and D_t is any
interim cash distribution paid during the period.

**Arithmetic return** (assumes no reinvestment of D_t):

r_t = (P_t + D_t − P_(t−1)) / P_(t−1) = (P_t + D_t) / P_(t−1) − 1

**Geometric (continuously compounded) return** (assumes continuous
reinvestment of D_t):

R_t = ln((P_t + D_t) / P_(t−1))

## Normal VaR — [[Parametric VaR - Normal and Lognormal]] (LO 1.b)

**From P/L data:**

VaR(α%) = −μ_(P/L) + σ_(P/L) × z_α

**From arithmetic return data** (then scale by the starting value P_(t−1) to
get a dollar figure):

VaR(α%) = (−μ_r + σ_r × z_α) × P_(t−1)

where z_α is the standard normal critical value for significance level α
(commonly z = 1.65 for α = 5%, z = 2.33 for α = 1%).

## Lognormal VaR — [[Parametric VaR - Normal and Lognormal]] (LO 1.b)

If geometric returns are normal with mean μ_R and standard deviation σ_R:

VaR(α%) = P_(t−1) × (1 − e^(μ_R − σ_R × z_α))

## Expected shortfall — [[Expected Shortfall]] (LO 1.c)

ES is the average of n − 1 VaR figures computed at confidence levels evenly
spaced through the tail (e.g., for a 5% tail sliced into n = 5 pieces, average
the VaRs at the 96%, 97%, 98%, and 99% confidence levels). There is no single
closed-form symbol for ES here — it is an averaging *procedure* applied to the
VaR formulas above.

## Standard error of a quantile — [[Standard Errors of Risk Measure Estimators]] (LO 1.e)

se(q) = √(p(1 − p) / n) / f(q)

where:

- q is the quantile (e.g., the VaR critical value),
- p is the probability mass associated with the bin around q,
- n is the sample size,
- f(q) is the density of the distribution at q (estimated as p divided by the
  bin width).

**Confidence interval for the risk measure**, using the same critical value
z_α as the original VaR calculation:

[q + z_α × se(q)] > VaR > [q − z_α × se(q)]
