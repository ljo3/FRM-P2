---
title: Stress Testing via Mapping
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, stress-testing, undiversified-var, fixed-income]
updated: 2026-06-13
---

# LO 5.e -- Describe how mapping of risk factors can support stress testing

**In plain terms:** once a portfolio has been mapped onto a set of zero-coupon
positions (see [[Mapping Fixed-Income Portfolios]]), that same mapping can be
reused to *stress test* the portfolio -- by asking "what happens to the
portfolio's value if every mapped position simultaneously takes its worst-case
(VaR) hit?" This page explains that shortcut and its limitation.

## The idea: revaluation under a uniform shock

Earlier, [[Mapping Fixed-Income Portfolios|cash flow mapping]] showed that if
all zero-coupon maturities are assumed to move in perfect lockstep
(correlation of 1), the portfolio VaR equals the **undiversified VaR** -- the
simple sum of each mapped position's individual VaR.

Stress testing offers an alternative route to that same number that doesn't
require summing VaR contributions directly. Instead:

1. Take each mapped zero-coupon position and **reduce its value by its own
   VaR percentage** -- i.e., apply the worst-case loss implied by that
   maturity's VaR to that cash flow's present value.
2. **Revalue the whole portfolio** using these stressed present values.
3. Compare the stressed portfolio value to the original portfolio value. The
   difference between the two is the stress-test loss.

Under the perfect-correlation assumption, this stress-test loss will equal
the undiversified VaR computed by summing individual VaR contributions. The
two approaches are mathematically equivalent ways of asking the same
"what if every position hits its 95% worst case at once" question -- one sums
contributions directly, the other revalues the whole portfolio after applying
the shocks and takes the difference.

## Worked example

Continuing the two-bond portfolio example from
[[Mapping Fixed-Income Portfolios]]:

- A 1-year zero-coupon bond discounted at a 3.5% rate has a present value
  factor of 1 / 1.035 = 0.9662.
- Its VaR percentage at the 95% confidence level is 0.4696%.
- Applying the VaR shock: the stressed present value factor becomes
  0.9662 x (1 - 0.4696/100) = 0.9616.

The same shock-and-revalue process is applied to every maturity's cash flow
using its own VaR percentage. Summing the stressed present values of all the
portfolio's cash flows gives a stressed portfolio value of $197.33 million,
compared with the original value of $200.00 million -- a difference of $2.67
million.

This $2.67 million stress-test loss matches (up to rounding) the
**undiversified VaR** of $2.674 million computed earlier by summing the
individual VaR contributions in the cash-flow map. The two calculations are
just different routes to the same underlying number.

## Why this is useful -- and its limitation

The appeal of the stress-testing approach is that it is **simple**: there is
no need to estimate or invert a correlation matrix, and the calculation
amounts to applying a known percentage shock to each cash flow and then doing
ordinary present-value arithmetic.

The catch is the assumption it rests on. The shock-and-revalue approach only
reproduces the *undiversified* VaR, which is valid **only if correlations
across maturities are exactly 1**. As soon as correlations are anything less
than perfect, the true (diversified) VaR will be lower than this stress-test
figure, and the stress test will overstate the portfolio's actual VaR. In that
sense, this style of stress testing is best understood as producing a
conservative, worst-case benchmark rather than a best estimate of VaR -- useful
precisely because it is conservative and easy to compute, but not a substitute
for the diversified VaR calculation when correlations matter.

## Relationship to the rest of the lesson

This page builds directly on the cash-flow map and undiversified/diversified
VaR concepts from [[Mapping Fixed-Income Portfolios]]. The same
shock-and-revalue logic generalizes to the
[[Mapping Forwards, Swaps, and Options|forward, FRA, and swap]] examples later
in the lesson, where undiversified VaR is likewise computed first (by summing
absolute VaR contributions) before correlations are layered in to get
diversified VaR.

## See also

- [[Mapping Fixed-Income Portfolios]]
- [[Benchmarking and Tracking Error VaR]]
- [[Formulas]]
