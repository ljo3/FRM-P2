---
title: Formulas (Lesson 3 - Parametric Approaches (II) - Extreme Value)
topic: market-risk
lesson: 3
tags: [formulas, GEV, generalized-pareto, POT, VaR, expected-shortfall]
updated: 2026-06-13
---

# Formulas — Parametric Approaches (II): Extreme Value

## Generalized extreme value (GEV) distribution — [[Extreme Value Theory and the GEV Distribution]] (LO 3.b)

For ξ ≠ 0:

F(x) = exp{ −[1 + ξ(x − μ)/σ]^(−1/ξ) }, defined where 1 + ξ(x − μ)/σ > 0

For ξ = 0 (the Gumbel case):

F(x) = exp{ −exp[−(x − μ)/σ] }

where:

- μ = location parameter,
- σ = scale parameter,
- ξ = tail index (shape parameter): ξ > 0 → Frechet, ξ = 0 → Gumbel,
  ξ < 0 → Weibull.

## Distribution of excess losses (POT) — [[Peaks-Over-Threshold Approach]] (LO 3.c)

F_u(x) = P(X − u ≤ x | X > u)

the conditional distribution of the excess (X − u) over threshold u, given
that the threshold is exceeded.

## Generalized Pareto (GP) distribution — [[Generalized Pareto Distribution and Extreme VaR]] (LO 3.e)

For ξ ≠ 0:

G(x) = 1 − (1 + ξx/β)^(−1/ξ)

For ξ = 0:

G(x) = 1 − exp(−x/β)

Domain: x ≥ 0 for ξ ≥ 0, and 0 ≤ x ≤ −β/ξ for ξ < 0, where:

- β = scale parameter,
- ξ = tail index (same parameter as in the GEV distribution).

## POT-based VaR — [[Generalized Pareto Distribution and Extreme VaR]] (LO 3.e)

VaR = u + (β/ξ) × [ ((n / N_u) × (1 − c))^(−ξ) − 1 ]

where:

- u = threshold (in percentage terms),
- n = total number of observations,
- N_u = number of observations exceeding the threshold,
- c = confidence level (so 1 − c is the tail probability),
- β, ξ = GP scale and shape parameters.

## POT-based expected shortfall — [[Generalized Pareto Distribution and Extreme VaR]] (LO 3.e)

ES = VaR / (1 − ξ) + (β − ξu) / (1 − ξ)

Expected shortfall is the expected loss conditional on the loss exceeding
VaR: ES = E[L_P | L_P > VaR].

## Worked example

Given β = 0.75, ξ = 0.25, u = 1%, N_u/n = 5% (so n/N_u = 20), and c = 99%
(1 − c = 0.01):

1. (n/N_u)(1 − c) = 20 × 0.01 = 0.2
2. 0.2^(−0.25) ≈ 1.495
3. (β/ξ) × (1.495 − 1) = 3 × 0.495 ≈ 1.486
4. VaR ≈ 1% + 1.486% ≈ **2.49%**
5. ES = 2.486/0.75 + (0.75 − 0.25)/0.75 ≈ 3.315 + 0.667 ≈ **3.98%**
