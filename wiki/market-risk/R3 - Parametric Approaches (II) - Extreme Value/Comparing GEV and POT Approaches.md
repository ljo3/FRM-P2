---
title: Comparing GEV and POT Approaches
topic: market-risk
lesson: 3
tags: [extreme-value-theory, GEV, POT, model-selection]
updated: 2026-06-13
---

# LO 3.d — Compare and contrast the generalized extreme value and POT approaches to estimating extreme risks

**In plain terms:** GEV and POT are two faces of the same coin — both come
from extreme value theory, both share the tail index ξ, and both aim to
characterize the tail of a loss distribution. The choice between them is
mostly a practical one about data efficiency and how comfortable you are
choosing a threshold.

## What they have in common

- Both approaches originate from extreme value theory.
- Both are governed by a tail (shape) parameter, ξ, which has the same
  interpretation in each — see
  [[Extreme Value Theory and the GEV Distribution]] and
  [[Generalized Pareto Distribution and Extreme VaR]].
- Conceptually, both are about characterizing the *extremes* of a sample
  rather than its center — [[Extreme Value Theory and the GEV Distribution|GEV]]
  by modeling the distribution of sample maxima directly, and
  [[Peaks-Over-Threshold Approach|POT]] by modeling the distribution of
  values that exceed a high threshold.

## Where they differ

1. **Number of parameters and data efficiency.** GEV requires estimating one
   additional parameter relative to POT (location, scale, and shape vs.
   POT's scale and shape). The most common ways of applying GEV can also be
   less efficient with data — because GEV is built from **block maxima**
   (one extreme value per block), a lot of the data within each block is
   effectively discarded, whereas POT can use every observation that happens
   to exceed the threshold, regardless of which "block" it falls in.
2. **Threshold choice.** POT requires choosing a threshold u, which
   introduces its own source of uncertainty (see the threshold tradeoff in
   [[Generalized Pareto Distribution and Extreme VaR]]). GEV avoids this
   specific choice, but at the cost of the block-size choice implicit in
   defining the maxima.
3. **Nature of the data.** Depending on how the available data is structured
   (e.g., naturally organized into blocks vs. a continuous series where a
   threshold is more natural), one approach may simply be more convenient or
   more defensible than the other.

## Practical takeaway

Neither approach dominates the other; the choice is a modeling judgment call
based on data availability, the acceptability of choosing a threshold, and
how much parameter-estimation efficiency matters for the application at
hand.

## See also

- [[Extreme Value Theory and the GEV Distribution]]
- [[Peaks-Over-Threshold Approach]]
- [[Generalized Pareto Distribution and Extreme VaR]]
