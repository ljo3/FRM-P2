---
title: Generalized Pareto Distribution and Extreme VaR
topic: market-risk
lesson: 3
tags: [extreme-value-theory, generalized-pareto, POT, VaR, expected-shortfall]
updated: 2026-06-13
---

# LO 3.e — Discuss the application of the generalized Pareto (GP) distribution in the POT approach

**In plain terms:** the GP distribution is the "answer" to the question POT
poses — it's the shape that excess-loss distributions converge to as the
threshold gets high enough — and once you have its two parameters, a few
lines of algebra turn it into VaR and expected shortfall numbers.

## The GPBdH theorem

The Gnedenko-Pickands-Balkema-deHaan (GPBdH) theorem states that, as the
threshold u gets large, the conditional excess distribution F_u(x) from
[[Peaks-Over-Threshold Approach]] converges to a **generalized Pareto (GP)
distribution** (see [[Formulas]] for the CDF).

## Parameters and shape

The GP distribution has two parameters:

- **ξ (the tail/shape index)** — the *same* parameter that appears in the
  GEV distribution. It can in principle be positive, zero, or negative, but
  risk managers are mainly interested in ξ ≥ 0 (the heavy- or normal-tailed
  cases).
- **β (beta), the scale parameter.**

The domain of the distribution depends on the sign of ξ: x ≥ 0 when ξ ≥ 0,
and 0 ≤ x ≤ −β/ξ when ξ < 0.

Graphically, the GP distribution's tail dips slightly *below* the normal
distribution just before the tail begins, then rises *above* the normal
distribution as it moves into the extreme tail — giving an approximately
linear shape there that tends to match empirical loss data better than a
normal-distribution tail would.

## Why GP is the natural model for excess losses

Because **all** distributions of excess losses converge to the GP
distribution as the threshold rises (per GPBdH), it's the natural,
distribution-agnostic choice for modeling exceedances — you don't need to
know or assume the parent distribution of losses.

## Choosing the threshold u

Using the GP distribution requires choosing a threshold u, which in turn
determines N_u, the number of observations that exceed u. This choice
involves a genuine tradeoff:

- u must be **high enough** that the GPBdH convergence result is a reasonable
  approximation.
- u must be **low enough** that there remain **enough exceedances (N_u)** to
  estimate β and ξ with reasonable precision (both are typically estimated
  via maximum likelihood).

## From GP parameters to VaR and expected shortfall

Given β, ξ, the threshold u, the total number of observations n, and the
number of exceedances N_u, the POT-based VaR formula converts these inputs
directly into a VaR estimate at a chosen confidence level (see [[Formulas]]
for the full expression).

**Expected shortfall (ES)**, also called conditional VaR, is the average (or
expected) loss *given that* the loss exceeds VaR — formally E[L_P | L_P >
VaR]. Because it describes the typical severity of losses beyond the VaR
cutoff (not just the cutoff itself), it has become a popular complement to
VaR. Under the GP/POT framework, ES can be computed directly from VaR, β, ξ,
and u (again, see [[Formulas]]).

## Worked example

Suppose β = 0.75, ξ = 0.25, the threshold u = 1%, and N_u/n = 5%. To find the
1% VaR (i.e., the loss exceeded with 1% probability, so the tail probability
1 − c = 0.01):

1. Compute n/N_u = 1 / 0.05 = 20.
2. Compute (n/N_u)(1 − c) = 20 × 0.01 = 0.2.
3. Raise to the power −ξ: 0.2^(−0.25) ≈ 1.495.
4. Subtract 1 and multiply by β/ξ = 0.75/0.25 = 3: 3 × (1.495 − 1) ≈ 1.486.
5. Add the threshold: VaR ≈ 1% + 1.486% ≈ **2.49%**.

Then expected shortfall:

ES = VaR/(1 − ξ) + (β − ξu)/(1 − ξ)
   = 2.486/0.75 + (0.75 − 0.25 × 1)/0.75
   ≈ 3.315 + 0.667
   ≈ **3.98%**

So a position with these GP parameters has an estimated 1% VaR of about
2.49% and, conditional on a loss that bad occurring, an expected loss of
about 3.98%.

## See also

- [[Peaks-Over-Threshold Approach]]
- [[Extreme Value Theory and the GEV Distribution]]
- [[Comparing GEV and POT Approaches]]
- [[Formulas]]
