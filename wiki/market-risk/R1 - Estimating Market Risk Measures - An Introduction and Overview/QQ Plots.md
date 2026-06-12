---
title: QQ Plots
topic: market-risk
lesson: 1
tags: [qq-plot, distribution-fit, normal-distribution]
updated: 2026-06-12
---

# LO 1.f — Interpret quantile-quantile (QQ) plots to identify the characteristics of a distribution

**In plain terms:** a QQ plot is a scatter plot that lets you eyeball whether
your data's distribution matches a reference distribution (commonly the
normal) — without running any formal statistical test.

## How it's built

For a range of confidence levels (say, every 10th percentile from 10% through
90%), plot:

- on one axis, the quantile of the **empirical** (observed) distribution at
  that confidence level, and
- on the other axis, the quantile of the **theoretical/reference**
  distribution (e.g., standard normal) at the same confidence level.

Each confidence level produces one point. If the empirical data were drawn
from *exactly* the reference distribution, every point would fall on the 45°
line (empirical quantile = theoretical quantile), and the overall plot would
be a straight line.

## Reading the plot

- **Straight line ≈ good fit.** If the points trace out something close to a
  straight line across the whole range of confidence levels, the empirical
  distribution is well-approximated by the reference distribution.
- **Middle matches, tails diverge → differing tail behavior.** It's common for
  the points near the center (around the 50% confidence level / median) to
  line up closely even when the tails don't. When this happens, the empirical
  distribution can be described as *symmetric* (since the center matches) but
  with **tails that differ from the reference distribution** — either fatter
  or thinner.

> **Worked example.** Compare a standard normal reference distribution to data
> actually drawn from a Student's t-distribution with a moderate number of
> degrees of freedom (a distribution that is symmetric but fat-tailed relative
> to the normal). Near the median, the t-distribution's quantiles closely
> track the normal's. But move out to the 95% confidence level: the normal
> critical value is 1.65, while the t-distribution's critical value at that
> level is noticeably further out. At the 97.5% level the gap widens further:
> the normal critical value is 1.96, while the t-distribution's is somewhat
> larger again. Plotting t-quantiles against normal quantiles produces a curve
> that hugs the 45° line near the center but bends away from it in both tails
> — the visual signature of a fat-tailed distribution being compared to the
> normal.

## Why this matters for VaR

The whole appeal of [[Parametric VaR - Normal and Lognormal|parametric VaR]] is
that it lets you compute VaR at *any* confidence level once you've assumed a
distribution. A QQ plot is the natural first check on that assumption: if the
plot bends away from the 45° line in the tail relevant to your VaR confidence
level, a normal (or lognormal) VaR estimate at that confidence level is likely
to be biased — typically *understating* risk if the true tails are fatter than
the reference distribution's.

## See also

- [[Parametric VaR - Normal and Lognormal]]
- [[Historical Simulation VaR]] — an approach that sidesteps the
  distributional assumption entirely.
- [[Formulas]]
