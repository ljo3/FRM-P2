---
title: Type I and Type II Errors and the Kupiec Test
topic: market-risk
lesson: 4
tags: [market-risk, backtesting, type-I-error, type-II-error, kupiec-test, unconditional-coverage]
updated: 2026-06-13
---

# LO 4.d — Type I and Type II errors in backtesting, and the Kupiec test

**In plain terms:** any backtest is a hypothesis test, and any hypothesis
test can fail in two different directions. Backtesting design is about
balancing those two failure modes — and Kupiec's test gives a rigorous,
likelihood-based way to do the balancing.

## Two ways a backtest can go wrong

- **Type I error**: rejecting a VaR model that is actually correctly
  calibrated, based on a sample that happens to show "too many" exceptions
  purely by chance.
- **Type II error**: failing to reject (i.e., accepting) a VaR model that is
  actually mis-calibrated, because the sample happened to show "too few"
  exceptions for that particular window.

A good backtesting framework tries to keep *both* error rates low — but
there's an inherent tension. Making the acceptance band wider (harder to
reject a model) reduces Type I errors but increases Type II errors, and vice
versa. The width of the acceptance band is itself a design choice that
depends on the sample size T and the model's stated confidence level p.

## The binomial test framework

Under the null hypothesis that the model is correctly calibrated, the number
of exceptions N follows a binomial distribution with parameters T (number of
trials) and p (probability of an exception each trial, i.e., p = 1 −
confidence level). This binomial distribution defines, for any given T and
p, a range of exception counts that would *not* be surprising if the model
were correct — and a range that would be.

### Illustration: Basel's 99% / 250-day setup

For a 99% confidence VaR backtested over 250 days, p = 0.01 and the expected
number of exceptions is 250 × 0.01 = **2.5**. Basel's framework (covered in
detail in [[Basel Rules for Backtesting]]) treats 5 or more exceptions in 250
days as the threshold for considering whether the model needs scrutiny.

How often would a *correctly calibrated* model produce 5 or more exceptions
just by chance? Using the binomial distribution with T = 250 and p = 0.01,
the probability of observing 5 or more exceptions is about **10.8%**. That
10.8% is the **Type I error rate** of a "reject if N ≥ 5" rule applied to a
genuinely accurate 99% model — over 1 in 10 well-specified models would be
flagged.

Now flip the question: how often would a model that is actually *miscalibrated*
— say, its true confidence level is only 97% rather than the claimed 99% —
produce *fewer than* 5 exceptions in 250 days, and therefore escape scrutiny?
That probability is about **12.8%**. This is the **Type II error rate**: more
than 1 in 8 models that are meaningfully too aggressive would still pass the
"N ≥ 5" screen.

These two numbers (10.8% and 12.8%) illustrate the core difficulty: with a
sample of only 250 daily observations, a simple exception-count rule at the
99% confidence level cannot simultaneously deliver low Type I *and* low Type
II error rates. This tension motivates the discussion of alternative
confidence levels in [[Basel Rules for Backtesting]].

## Kupiec's (1995) likelihood ratio test for unconditional coverage

Rather than relying on a fixed exception-count cutoff, Kupiec proposed a
**likelihood ratio test** that directly compares the likelihood of the
observed data under the model's stated probability p versus under the
sample's own observed failure rate N/T. This is referred to as a test of
**unconditional coverage** — it asks only whether the overall *proportion* of
exceptions is right, without regard to timing (timing is the subject of
[[Conditional Coverage Testing]]).

The test statistic is:

LR_uc = −2 ln[ (1−p)^(T−N) p^N / (1 − N/T)^(T−N) (N/T)^N ]

Under the null hypothesis that p is the true exception probability, LR_uc is
asymptotically chi-squared distributed with **1 degree of freedom**. At a 95%
confidence level, the chi-squared(1) critical value is **3.84** — notably,
this equals 1.96², the square of the z-test's critical value, since a
chi-squared(1) variable is the square of a standard normal variable.

**Decision rule:** reject the null hypothesis that the model is correctly
calibrated if LR_uc > 3.84.

### Worked example

A bank backtests its one-day 95% VaR model (p = 0.05) over T = 252 days and
observes N = 12 exceptions (compare with the expected value pT = 12.6 from
[[Failure Rates and the Z-Score Test]]).

- (1−p)^(T−N) p^N = 0.95^240 × 0.05^12
- (1 − N/T)^(T−N) (N/T)^N = (240/252)^240 × (12/252)^12

Evaluating these terms gives LR_uc ≈ **0.03**, far below the critical value
of 3.84. The null hypothesis is **not rejected** — 12 exceptions out of 252
is entirely consistent with a well-calibrated 95% VaR model.

## Nonrejection regions shrink as confidence level rises

A useful way to visualize the Kupiec test is as a **nonrejection region** for
the failure rate N/T, for a given T and p. For example:

- At a 97.5% confidence level (p = 0.025) with T = 252, the nonrejection
  region for N is roughly [2, 12], i.e., a failure rate between about 0.79%
  and 4.76%.
- At the same 97.5% confidence level with a larger sample, T = 1,000, the
  nonrejection region for N is roughly [15, 36], i.e., a failure rate between
  about 1.5% and 3.6% — a *narrower* band in percentage terms, because larger
  samples allow tighter discrimination.
- At a 95% confidence level (p = 0.05) with T = 252, the nonrejection region
  for N is roughly [6, 20], i.e., a failure rate between about 2.4% and 7.9%.

The general pattern: nonrejection bands narrow (in relative terms) as the
sample size T grows, and they narrow in absolute exception-count terms as the
required VaR confidence level rises (smaller p). This is precisely why
backtesting a 99% VaR model is statistically harder than backtesting a 95%
model with the same sample size — there are fewer expected exceptions to work
with, so the test has less power to distinguish a correct model from an
incorrect one.

## See also

- [[Failure Rates and the Z-Score Test]]
- [[Conditional Coverage Testing]]
- [[Basel Rules for Backtesting]]
- [[Formulas]]
