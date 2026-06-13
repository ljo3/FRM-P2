---
title: Formulas (Lesson 4 - Backtesting VaR)
topic: market-risk
lesson: 4
tags: [formulas, backtesting, z-score, kupiec, conditional-coverage]
updated: 2026-06-13
---

# Formulas — Backtesting VaR

## Failure rate — [[Failure Rates and the Z-Score Test]] (LO 4.c)

Failure rate = N / T

where:

- N = number of exceptions observed,
- T = number of days (observations) in the testing sample.

Expected exceptions under a correctly calibrated model = p × T, where
p = 1 − c (c = the VaR confidence level).

## Z-score test for unbiasedness — [[Failure Rates and the Z-Score Test]] (LO 4.c)

z = (N − pT) / √(p(1 − p)T)

- Reject the hypothesis that the model is unbiased if |z| > 1.96 (the 95%
  confidence critical value for a standard normal variable).

### Worked example

p = 0.05, T = 252, N = 22:

- pT = 12.6
- p(1−p)T = 0.05 × 0.95 × 252 ≈ 11.97 → √11.97 ≈ 3.46
- z = (22 − 12.6) / 3.46 ≈ **2.72** → |z| > 1.96 → reject (model understates risk)

## Kupiec's unconditional coverage test (LR_uc) — [[Type I and Type II Errors and the Kupiec Test]] (LO 4.d)

LR_uc = −2 ln[ (1−p)^(T−N) p^N / (1 − N/T)^(T−N) (N/T)^N ]

- LR_uc ~ chi-squared(1) under the null hypothesis.
- Critical value at 95% confidence: **3.84** (= 1.96², consistent with the
  z-test above).
- Reject the model (unconditional coverage) if LR_uc > 3.84.

### Worked example

p = 0.05, T = 252, N = 12 (compare expected pT = 12.6):

- (1−p)^(T−N) p^N = 0.95^240 × 0.05^12
- (1 − N/T)^(T−N) (N/T)^N = (240/252)^240 × (12/252)^12
- LR_uc ≈ **0.03** << 3.84 → fail to reject (12 exceptions is consistent
  with a well-calibrated 95% VaR model over 252 days)

## Christoffersen's independence test (LR_ind) — [[Conditional Coverage Testing]] (LO 4.e)

- Tests whether exceptions are serially independent (not clustered).
- LR_ind ~ chi-squared(1) under the null hypothesis of independence.
- Critical value at 95% confidence: **3.84**.
- Reject independence if LR_ind > 3.84.

## Conditional coverage test (LR_cc) — [[Conditional Coverage Testing]] (LO 4.e)

LR_cc = LR_uc + LR_ind

- LR_cc ~ chi-squared(2) under the joint null hypothesis.
- Critical value at 95% confidence: **5.99**.
- Reject the model (conditional coverage) if LR_cc > 5.99.

## Basel backtesting setup — [[Basel Rules for Backtesting]] (LO 4.f)

- Confidence level c = 99% (p = 0.01), testing window T = 250 days.
- Expected exceptions = p × T = 250 × 0.01 = **2.5**.

| Zone | Exceptions (N) | Multiplier add-on (k) |
|---|---|---|
| Green | 0–4 | k = 3 |
| Yellow | 5–9 | k rises by 0.40–0.85 above 3, supervisor discretion |
| Red | ≥10 | k = 4 (automatic, k + 1) |

- At 99% / 250 days, a correct model produces ≥5 exceptions about **10.8%**
  of the time (Type I error rate for the yellow/red trigger).
- An incorrect model (true confidence ≈97%) produces <5 exceptions about
  **12.8%** of the time (Type II error rate).
- Alternative: 95% confidence / 250 days → expected exceptions ≈ 12.5–13;
  Type I error ≈ 12.5% (using a ≥17-exception trigger), Type II error ≈ 7.4%.
