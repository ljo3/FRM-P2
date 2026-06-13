---
title: Benchmarking and Tracking Error VaR
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, tracking-error, benchmark-portfolio, duration]
updated: 2026-06-13
---

# LO 5.f -- Explain how VaR can be computed and used relative to a performance benchmark

**In plain terms:** instead of asking "what is this portfolio's VaR in
isolation?", a portfolio manager often wants to know "how different is this
portfolio's risk from my benchmark's risk?" That comparison is called
**tracking error VaR**, and it depends heavily on how closely the portfolio's
cash flows resemble the benchmark's cash flows -- not just on whether their
overall duration or VaR levels match.

## Why benchmark relative to VaR?

A portfolio manager is often evaluated against a benchmark index or reference
portfolio. Two portfolios can have the *same* absolute VaR yet behave very
differently relative to a benchmark, because absolute VaR depends only on the
overall sensitivity of the portfolio's value to market moves, while
benchmark-relative risk depends on how the portfolio's *response pattern*
differs from the benchmark's, cash flow by cash flow.

**Tracking error VaR** is defined as the VaR of the *difference* between the
managed portfolio and the benchmark portfolio -- i.e., it measures the
riskiness of the deviation, not the riskiness of either portfolio on its own.

## Worked example setup

Suppose a $100 million bond portfolio with a duration of 4.77 is to be used as
a benchmark. The goal is to evaluate several candidate portfolios, each
consisting of just **two zero-coupon bonds**, that are constructed to match
the benchmark's duration of 4.77.

### Step 1: Match duration with two zero-coupon bonds

For each candidate two-bond portfolio, the weights of the two zero-coupon
bonds are chosen so that the resulting weighted-average duration equals the
benchmark's duration of 4.77. For example, one candidate portfolio might
combine a 4-year zero (weighted at 23%) with a 5-year zero (weighted at 77%):

0.23 x 4 + 0.77 x 5 = 4.77

This matches the benchmark's duration exactly, even though the *cash flow
profile* of this two-bond portfolio (concentrated at years 4 and 5) may look
quite different from the benchmark's actual cash flow profile (which might be
spread across many maturities).

Several such two-bond portfolios can be constructed -- each combining a
different pair of zero-coupon maturities, with weights chosen so that every
portfolio matches the benchmark's 4.77 duration.

### Step 2: Compute absolute VaR for the benchmark and each candidate

The absolute VaR of the benchmark is computed by applying the relevant VaR
percentages (for the appropriate time horizon -- here, monthly) to the market
value weights of the benchmark's actual holdings. In the worked example, this
comes out to approximately $1.99 million -- a figure close to the VaR
percentage of a 4-year note on its own, which makes sense given the
benchmark's duration of 4.77 sits close to 4 years.

The same VaR-percentage-times-market-value calculation is then applied to each
two-bond candidate portfolio to get its own absolute VaR.

### Step 3: Compute tracking error VaR

Tracking error VaR is computed from the **difference** between the benchmark's
vector of market value positions (x0) and each candidate portfolio's vector of
market value positions (x). This difference vector is then run through the
same VaR machinery (applying VaR percentages and the correlation matrix across
maturities) to produce the tracking error VaR for that candidate -- see
[[Formulas]] for the structure of this calculation.

## Interpreting the results

In the worked example, tracking error VaR figures for the various two-bond
candidates are all much smaller than the benchmark's absolute VaR of $1.99
million -- the largest is around $0.45 million, and the smallest (for the
candidate portfolio that performs best) is about $0.17 million.

A few important observations from this example generalize broadly:

- **Tracking error reflects nonparallel shifts in the yield curve.** Even
  though every candidate matches the benchmark's overall duration, none of
  them perfectly replicates the benchmark's cash-flow timing -- so when the
  yield curve doesn't move in a perfectly parallel way (different maturities
  move by different amounts), the candidate and benchmark portfolios respond
  differently. That residual difference *is* the tracking error.

- **The best-matching candidate is the one whose cash flows most resemble the
  benchmark's, not necessarily the one matching duration most "elegantly."**
  In the example, the benchmark portfolio's cash flows are concentrated most
  heavily around the 2-year maturity. The candidate portfolio that itself
  includes a 2-year zero-coupon bond ends up with the smallest tracking error
  -- because its cash-flow profile is closest to the benchmark's, not just its
  duration.

- **Minimizing absolute VaR is not the same as minimizing tracking error.**
  One candidate (a "barbell" portfolio, combining very short and very long
  maturities) actually has the *lowest* absolute VaR among the candidates, but
  the *highest* tracking error relative to the benchmark. A portfolio can look
  attractive on a stand-alone VaR basis while still being a poor match for the
  benchmark -- these are two different questions, and a low absolute VaR
  doesn't imply low tracking error.

## Variance improvement

Tracking error VaR can be converted into a measure analogous to R-squared in a
regression, called the **variance improvement** (or variance reduction). It
expresses what fraction of the benchmark's variance is "explained" by how
closely the candidate tracks the benchmark -- the smaller the tracking error
relative to the benchmark's VaR, the closer this figure is to 100%. See
[[Formulas]] for the exact expression and a worked calculation.

## Relationship to the rest of the lesson

Benchmarking reuses the same building blocks as
[[Mapping Fixed-Income Portfolios|fixed-income mapping]] (duration, cash flow
present values, VaR percentages by maturity, and the correlation matrix across
maturities) -- it just applies them to the *difference* between two portfolios
rather than to a single portfolio. The undiversified-vs-diversified theme from
[[Stress Testing via Mapping]] is also implicit here: tracking error VaR
depends on the correlation structure across maturities, just as diversified
VaR does.

## See also

- [[Mapping Fixed-Income Portfolios]]
- [[Stress Testing via Mapping]]
- [[Formulas]]
