---
title: Parametric Approaches (II) - Extreme Value - Summary
topic: market-risk
lesson: 3
tags: [market-risk, extreme-value-theory, GEV, POT, tail-risk, summary]
updated: 2026-06-13
---

# Parametric Approaches (II): Extreme Value

The parametric VaR methods from Lesson 1 (normal, lognormal) and the
non-parametric methods from Lesson 2 both have a weakness when it comes to
the *very* tail of the loss distribution: normal-type distributions
underestimate the likelihood of extreme moves, and historical data simply
may not contain enough extreme observations to say much about them.
**Extreme value theory (EVT)** is a branch of statistics built specifically
to model the tail — the rare, large losses that matter most for risk
management — rather than the center of the distribution.

This lesson develops EVT along two parallel tracks that both trace back to
the same underlying theory and share a common tail-shape parameter, ξ:

- The **block-maxima** track: take the maximum loss from each of many blocks
  of time, and model the distribution of those maxima directly. This leads
  to the **generalized extreme value (GEV)** distribution via the
  Fisher-Tippett theorem.
- The **threshold-exceedance** track: pick a high loss threshold and model
  only the losses that exceed it. This is the **peaks-over-threshold (POT)**
  approach, and the distribution of exceedances converges to the
  **generalized Pareto (GP)** distribution.

The lesson closes by extending these ideas to **multivariate EVT** — what
happens when extreme losses in *different* assets or markets tend to occur
together.

## How the pieces fit together

- [[Managing Extreme Values]] motivates the whole lesson: why extreme events
  are hard to model and why specialized tools are needed.
- [[Extreme Value Theory and the GEV Distribution]] introduces EVT proper and
  the GEV distribution, including the Frechet/Gumbel/Weibull cases governed
  by the tail index ξ.
- [[Peaks-Over-Threshold Approach]] introduces the alternative
  threshold-exceedance framing.
- [[Generalized Pareto Distribution and Extreme VaR]] shows how POT
  exceedances converge to the GP distribution, and how to turn GP parameters
  into VaR and expected shortfall estimates.
- [[Comparing GEV and POT Approaches]] weighs the practical tradeoffs between
  the two tracks.
- [[Multivariate Extreme Value Theory]] extends the single-variable story to
  multiple dependent extremes using copulas.

## Learning outcome pages

- [[Managing Extreme Values]] (LO 3.a)
- [[Extreme Value Theory and the GEV Distribution]] (LO 3.b)
- [[Peaks-Over-Threshold Approach]] (LO 3.c)
- [[Comparing GEV and POT Approaches]] (LO 3.d)
- [[Generalized Pareto Distribution and Extreme VaR]] (LO 3.e)
- [[Multivariate Extreme Value Theory]] (LO 3.f)
- [[Formulas]] — formulas from this lesson
