---
title: Basel Rules for Backtesting
topic: market-risk
lesson: 4
tags: [market-risk, backtesting, basel, penalty-zones, regulatory-capital]
updated: 2026-06-13
---

# LO 4.f — The Basel Committee's backtesting framework

**In plain terms:** regulators turned the statistical machinery from earlier
in this lesson into a traffic-light system. Count exceptions over a year; the
color you land on determines whether — and how much — your capital
requirement goes up.

## The setup: 99% confidence, 250 trading days

Basel requires banks using internal models for market-risk capital to
compute a one-day VaR at the **99% confidence level** and backtest it over
the most recent **250 trading days** (roughly one year). Under the null
hypothesis that the model is correctly calibrated, p = 1 − 0.99 = 0.01, so
the **expected number of exceptions is 250 × 0.01 = 2.5** per year.

## The three zones

Basel classifies the outcome of the backtest into one of three zones based on
the number of exceptions N observed over the 250-day window:

| Zone | Exceptions (N) | Multiplier add-on (k) | Outcome |
|---|---|---|---|
| Green | 0 – 4 | k = 3 (no increase) | No penalty — consistent with a well-calibrated model |
| Yellow | 5 – 9 | k increases from 3 by an amount between 0.40 and 0.85, scaled to N | Supervisor evaluates the cause and decides whether a penalty applies |
| Red | 10 or more | k automatically increases by 1 (i.e., k + 1 = 4) | Automatic penalty — model presumed inadequate |

The multiplier k is applied to the model's VaR-based capital charge, so
moving from green to yellow or red directly increases the capital a bank must
hold against market risk.

## The yellow zone: four possible explanations

Because 5–9 exceptions could plausibly arise even from a sound model (recall
the 10.8% Type I error rate discussed in
[[Type I and Type II Errors and the Kupiec Test]]), the yellow zone is not an
automatic penalty. Instead, the supervisor investigates the *cause* of the
exceptions and classifies it into one of four categories:

1. **Basic integrity of the model is lacking** — the model is not being
   implemented correctly, or the underlying data/computations have errors.
   *A penalty applies.*
2. **Model accuracy needs improvement** — the risk-factor coverage, volatility
   and correlation estimates, or other modeling choices are not capturing
   risk well enough. *A penalty applies.*
3. **Intraday trading activity** — losses arose from positions taken and
   closed within the day, which the (close-of-day, static-portfolio) VaR
   model was never designed to capture. *A penalty is considered*, but with
   more latitude than categories 1–2.
4. **Bad luck (market conditions)** — volatile markets produced more large
   moves than usual, consistent with the model simply experiencing a
   higher-than-typical (but still plausible) draw of outcomes. Basel's
   framework does not mandate a penalty in this case, recognizing that some
   number of "unlucky" exception clusters is statistically expected even from
   a correctly specified model.

## The fundamental difficulty: 99% confidence is a tough target to backtest

As shown in [[Type I and Type II Errors and the Kupiec Test]], applying the
"N ≥ 5" yellow-zone trigger to a genuinely accurate 99% VaR model produces a
**10.8% Type I error rate** — about 1 in 10 sound models would land in the
yellow or red zone purely by chance over a given year. Meanwhile, a model
that is meaningfully too aggressive (e.g., its true confidence is only ~97%)
would still produce fewer than 5 exceptions, and thus stay in the green zone,
about **12.8% of the time** (the Type II error rate).

With only 250 observations per year and an expected exception count of just
2.5, there simply isn't enough data to make both error rates small
simultaneously at the 99% confidence level.

## A proposed alternative: lower the required confidence level

One idea discussed for improving backtesting power is to require a **lower**
VaR confidence level — say 95% instead of 99% — while compensating with a
larger capital multiplier, so that the *capital outcome* for a well-behaved
model is similar. At 95% confidence over 250 days:

- the expected number of exceptions rises to 250 × 0.05 = **12.5** (often
  rounded to 13), giving the test much more statistical power than the 2.5
  expected at 99% confidence;
- using a threshold around 17+ exceptions for the analogous "flag for review"
  rule, the **Type I error rate** is approximately **12.5%**;
- the corresponding **Type II error rate** improves to roughly **7.4%**,
  compared to 12.8% under the 99%/250-day setup.

The tradeoff is the one familiar from
[[Type I and Type II Errors and the Kupiec Test]]: shifting to a lower
confidence level with more expected exceptions improves the *test's* ability
to discriminate between good and bad
models, even though the headline VaR confidence number looks less
conservative. (A separate, less practical alternative — simply extending the
backtesting window beyond 250 days — runs into the problem that market
conditions, and therefore the "correct" model parameters, can change
meaningfully over a longer window, undermining the assumption that the same
model should apply throughout.)

## Why backtesting confidence levels also matter for incentives

Because moving from a 97% to a 99% confidence requirement for the *same*
underlying portfolio can require substantially more capital (one illustrative
comparison puts the increase around 1.24×), banks that are evaluated only on
whether they clear a fixed exception-count bar have an incentive to choose
model assumptions that minimize *measured* VaR (and thus capital) while still
clearing the bar — another reason regulators care about getting the
backtesting framework's statistical properties right.

## See also

- [[Type I and Type II Errors and the Kupiec Test]]
- [[Conditional Coverage Testing]]
- [[Backtesting Fundamentals]]
