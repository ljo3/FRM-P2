---
title: Formulas (Lesson 2 - Non-Parametric Approaches)
topic: market-risk
lesson: 2
tags: [formulas, historical-simulation, age-weighting, volatility-weighting]
updated: 2026-06-12
---

# Formulas — Non-Parametric Approaches

## Age-weighted historical simulation — [[Weighted Historical Simulation Approaches]] (LO 2.c)

Weight assigned to the observation that is *i* days old:

w(i) = λ^(i−1) (1 − λ) / (1 − λ^n)

where:

- λ is the decay parameter, 0 ≤ λ ≤ 1 (values close to 1 indicate slow decay),
- n is the total number of observations in the sample.

Weights sum to 1 across i = 1, ..., n. Setting λ = 1 reduces this to the
equal-weighting scheme (w(i) = 1/n) used in plain historical simulation.

## Volatility-weighted historical simulation — [[Weighted Historical Simulation Approaches]] (LO 2.c)

Volatility-adjusted return for asset i on day t:

r*_(t,i) = (σ_(T,i) / σ_(t,i)) × r_(t,i)

where:

- r_(t,i) is the actual historical return for asset i on day t,
- σ_(t,i) is the volatility forecast for asset i on day t (made using
  information available at the end of day t − 1, e.g., from a GARCH or EWMA
  model),
- σ_(T,i) is the current volatility forecast for asset i (as of the date the
  VaR is being computed).

After substituting r*_(t,i) for r_(t,i), VaR, ES, or any other coherent risk
measure is computed using the same procedures as in plain historical
simulation.

## Correlation-weighted historical simulation — [[Weighted Historical Simulation Approaches]] (LO 2.c)

Variance-covariance matrix for a two-asset case:

Σ = [ σ_(i,i)  σ_(i,j) ]  =  [ Var(X_i)      Cov(X_i, X_j) ]
    [ σ_(j,i)  σ_(j,j) ]     [ Cov(X_j, X_i)  Var(X_j)     ]

Diagonal elements are updated variances (volatilities); off-diagonal elements
are updated covariances. Correlation-weighting updates the entire matrix,
whereas volatility-weighting updates only the diagonal.
