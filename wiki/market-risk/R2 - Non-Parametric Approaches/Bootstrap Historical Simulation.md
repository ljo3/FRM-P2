---
title: Bootstrap Historical Simulation
topic: market-risk
lesson: 2
tags: [bootstrap, resampling, historical-simulation, coherent-risk-measures]
updated: 2026-06-12
---

# LO 2.a — Apply the bootstrap historical simulation approach to estimate coherent risk measures

**In plain terms:** instead of computing one VaR (or ES) from the historical
sample and stopping there, repeatedly draw random resamples *from* that
sample, compute a risk measure from each resample, and average the results.
The average across many resamples is a more reliable estimate than the single
figure produced by plain historical simulation.

## The procedure

1. Start with the original historical data set of *n* observations.
2. Draw a random sample from this data set **with replacement** — i.e., after
   an observation is drawn it goes back into the pool, so it can be drawn
   again. (This is what "bootstrap" means: each resample is the same size as
   a draw from the population, but only the original sample's observations
   are available to draw from.)
3. Compute the risk measure (VaR, or ES via the tail-slicing procedure from
   [[Expected Shortfall]]) on this resample.
4. Repeat steps 2–3 many times, producing many sample risk-measure estimates.
5. The final estimate is the **average across all the resampled risk
   measures**.

Critically, the VaR/ES computed from the *original, unmodified* data set plays
no role in the final answer — only the resampled estimates are averaged.

## Why averaging over resamples helps

A single historical-simulation VaR depends heavily on exactly which
observations happen to fall near the tail boundary in the one sample you
have. Bootstrapping effectively asks "if I had gotten a slightly different
sample from the same underlying process, what would my VaR estimate have
looked like?" — many times over — and averages out that sample-to-sample
noise. Empirically, this consistently produces **more precise estimates of
coherent risk measures** (including VaR and ES as special cases) than relying
on the single VaR/ES computed from the raw, un-resampled data.

## Relationship to the rest of the lesson

Bootstrapping is a technique for *using* a historical data set more
effectively — it doesn't, by itself, address *which* historical observations
should be included or how they should be weighted. That's the role of
[[Weighted Historical Simulation Approaches|weighted historical simulation]].
The two ideas can be combined: for example,
[[Weighted Historical Simulation Approaches|filtered historical simulation]]
explicitly uses bootstrapping as one of its steps.

## See also

- [[Expected Shortfall]] — the tail-slicing procedure used to compute ES on
  each resample.
- [[Non-Parametric Methods - Pros and Cons]]
- [[Formulas]]
