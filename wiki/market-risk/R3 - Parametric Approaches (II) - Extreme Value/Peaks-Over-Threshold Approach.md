---
title: Peaks-Over-Threshold Approach
topic: market-risk
lesson: 3
tags: [extreme-value-theory, POT, tail-risk]
updated: 2026-06-13
---

# LO 3.c — Describe the peaks-over-threshold (POT) approach

**In plain terms:** instead of asking "what's the worst loss in each block of
time?" (the GEV approach), POT asks "of the losses that cross some high bar,
how much do they cross it by?" That reframing turns the modeling problem into
one about a *conditional* distribution of excess losses.

## Setting up the problem

Define a random variable X to represent the **loss** on a position or
portfolio, and choose a high **threshold** u. The POT approach models the
distribution of the amount by which losses exceed u, conditional on the
threshold being exceeded at all.

Formally, the distribution of excesses over the threshold, F_u(x), is the
conditional distribution of X given that X exceeds u by no more than x — see
[[Formulas]] for the expression. Importantly, this is a **conditional**
distribution: it only describes what happens *given* that a loss beyond u has
already occurred.

The parent distribution of X — i.e., the overall distribution of losses,
most of which are nowhere near the threshold — can in principle be normal,
lognormal, or anything else, and in practice it will usually be unknown. POT
sidesteps the need to know it by working only with the conditional excess
distribution.

## Why POT is attractive

- It generally requires **fewer parameters** to estimate than approaches
  built directly from extreme value theorems (i.e., GEV-based approaches).
- It provides a natural way to model "how bad could it get **given that**
  it's already bad" — which is directly useful for VaR and expected
  shortfall at high confidence levels.
- It corresponds conceptually to GEV theory: both are about modeling the
  *maxima* (or minima) of large samples, just from different angles — GEV
  from block maxima, POT from threshold exceedances.

## Where this leads

POT on its own doesn't specify *which* distribution the excesses follow —
that's the role of the generalized Pareto distribution, covered next in
[[Generalized Pareto Distribution and Extreme VaR]], which also shows how to
turn POT into concrete VaR and expected shortfall numbers.

## See also

- [[Extreme Value Theory and the GEV Distribution]]
- [[Generalized Pareto Distribution and Extreme VaR]]
- [[Comparing GEV and POT Approaches]]
- [[Formulas]]
