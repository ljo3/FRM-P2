---
title: Failure Rates and the Z-Score Test
topic: market-risk
lesson: 4
tags: [market-risk, backtesting, failure-rate, z-score, hypothesis-test]
updated: 2026-06-13
---

# LO 4.c — Verify a model based on backtesting exceptions or failure rates

**In plain terms:** count up the exceptions, divide by the number of days
tested, and compare that "failure rate" to the rate the model promised. The
z-score test turns that comparison into a yes/no statistical verdict.

## The failure rate

Define:

- **T** = number of days (observations) in the testing sample,
- **N** = number of exceptions observed,
- **p** = 1 − c = the probability of an exception implied by the model's
  confidence level c.

The **failure rate** is simply N / T — the observed proportion of days on
which the model was breached.

If the VaR model is correctly specified, N/T should converge to p as T gets
large (this is just a statement of the law of large numbers applied to a
sequence of Bernoulli trials, each with "success" = exception, probability
p). A failure rate that is persistently and substantially different from p is
evidence the model's confidence level is mis-calibrated.

### Worked example — expected exception rate

A bank computes a one-day 95% VaR. By definition, p = 1 − 0.95 = **5%**: on
any given day, there should be roughly a 5% chance that the actual loss
exceeds VaR. Over a 252-day testing year, the *expected* number of exceptions
is therefore 252 × 0.05 = **12.6**.

## The z-score test

Because N is (under the null hypothesis that the model is correctly
calibrated) the sum of T independent Bernoulli(p) trials, N is approximately
binomial with mean pT and variance p(1−p)T. For reasonably large T, this can
be approximated with a normal distribution, giving the test statistic:

z = (N − pT) / √(p(1 − p)T)

Under the null hypothesis that the model is unbiased, z is approximately
standard normal. At a 95% confidence level for the *test itself*, the
critical value is **±1.96**. If |z| > 1.96, the hypothesis that the model is
unbiased is rejected.

### Worked example — testing a 95% VaR model over 252 days

Suppose a bank's actual losses exceeded its one-day 95% VaR on 22 of the last
252 trading days. Is this consistent with a correctly calibrated model?

- p = 0.05, T = 252, N = 22
- pT = 252 × 0.05 = 12.6
- p(1 − p)T = 0.05 × 0.95 × 252 ≈ 11.97, so √(p(1−p)T) ≈ 3.46
- z = (22 − 12.6) / 3.46 ≈ **2.72**

Since 2.72 > 1.96, the null hypothesis is **rejected**: 22 exceptions is too
many to be consistent with a well-calibrated 95% VaR model over this sample,
and the model likely understates risk.

## Interpreting the test

The z-score test is a quick, intuitive screen, but it has the same weakness
as any test based purely on a *count* of exceptions: it says nothing about
*when* those exceptions occurred. A model that produces exactly the expected
number of exceptions, but has all of them clustered in a two-week period of
market stress, would pass this test while still having a serious flaw — a
gap addressed later by [[Conditional Coverage Testing]]. The more formal,
likelihood-based version of this same "is the failure rate right?" question
is Kupiec's test, covered in [[Type I and Type II Errors and the Kupiec Test]].

## See also

- [[Backtesting Fundamentals]]
- [[Type I and Type II Errors and the Kupiec Test]]
- [[Formulas]]
