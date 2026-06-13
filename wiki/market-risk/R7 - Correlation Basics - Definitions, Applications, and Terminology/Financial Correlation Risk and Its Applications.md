---
title: Financial Correlation Risk and Its Applications
topic: market-risk
lesson: 7
tags: [correlation-risk, static-correlation, dynamic-correlation, portfolio-variance, covariance, correlation-coefficient, markowitz]
updated: 2026-06-13
---

# LO 7.a -- Describe financial correlation risk and the areas in which it appears in finance

**In plain terms:** correlation risk is the chance of losing money simply because the
relationship between two assets (or two variables) shifts -- a co-movement that used
to help you can suddenly hurt you, even though nothing about the individual assets
themselves looks unusual. This page surveys where that risk shows up across finance,
introduces the distinction between correlation measures that are fixed snapshots and
ones that evolve, walks through how a credit default swap is exposed to it, and then
covers the foundational portfolio math -- mean, variance, covariance, and the
correlation coefficient -- that underlies almost everything else in this lesson.

## What correlation risk is

Correlation risk is the possibility of a financial loss that comes from a change in
how two or more variables move together, rather than from a change in either variable
on its own. A classic illustration is the relationship between interest rates and
commodity prices: when these tend to move in opposite directions, a rise in rates can
translate into losses on commodity positions even if nothing happened to commodity
supply or demand directly. A real-world episode along these lines occurred during the
2012 Greek sovereign debt troubles, when bonds issued by an unrelated country
(Mexico) that happened to move in the same direction as Greek bonds also lost value --
investors who held Mexican bonds were hurt by a correlation they may not have even
been tracking.

The 2007-2009 financial crisis is the textbook case of correlation risk operating at a
global scale. Assets and markets that had historically shown low or even negative
correlation with each other suddenly began moving together, and moving down together,
which destroyed the diversification benefits that many portfolios were relying on.

Correlation risk is not limited to financial instruments. Macro and political
variables can also be correlated in ways that create losses:

- A weaker currency for one country can hurt exporters in another country whose goods
  become relatively more expensive -- a 2012 episode involving a weaker euro created
  losses for some U.S. exporters.
- Weak growth in a large economy (such as the United States) tends to ripple outward
  and depress demand for exporters in Asia and Europe that depend on that market.
- Political instability (for example, unrest that pushes oil prices higher) can lower
  airline travel volumes, linking a geopolitical event to an operational/demand
  outcome in an apparently unrelated industry.

## Static versus dynamic correlation

The reading separates correlation measures into two broad categories:

- **Static correlation measures** describe the relationship between assets as a
  fixed figure for a given period -- a snapshot rather than a process. Typical
  examples include the correlation numbers embedded in a VaR covariance matrix, the
  copula-based correlation assumptions used to price tranches of a collateralized
  debt obligation (CDO), and the binomial default-correlation model used in credit
  analysis.
- **Dynamic correlation measures** instead try to capture how the relationship
  between assets evolves over time. Examples include pairs-trading strategies (which
  rely on a relationship that is expected to persist but can drift), models that
  build in a deterministic time-varying correlation, and models where correlation
  itself is treated as a random (stochastic) process.

The practical implication is that a static measure can become stale very quickly --
a correlation that was accurate "for this period" may say nothing about next period --
while a dynamic measure tries to track the relationship as conditions change, at the
cost of being more complex to estimate and apply.

## Correlation risk in a credit default swap (illustrative example)

A credit default swap (CDS) is a contract that shifts default risk from a protection
buyer to a protection seller. Suppose an investor holds bonds issued by one
government and is worried about that government defaulting. The investor can buy
protection from a large bank: if the bond issuer defaults, the bank pays the investor
the face value of the position (assuming, for simplicity, a zero recovery rate and no
accrued interest).

This arrangement introduces a new correlation question: how correlated is the
likelihood that the *protection seller* (the bank) defaults with the likelihood that
the *reference bond issuer* defaults? If those two default probabilities are
positively correlated, the investor faces **wrong-way risk (WWR)** -- the protection
is most likely to fail (because the seller is in trouble) exactly when it is most
needed (because the reference entity is also in trouble). All else equal, higher
positive correlation between the protection seller and the reference entity lowers
the fair CDS spread, because the protection is worth less when it is more likely to
be unavailable precisely when a claim would be made.

Interestingly, the relationship between correlation and the CDS spread is not always
a simple straight line (it can be **nonmonotonic**). At very high negative
correlation, a slight increase in the spread can actually occur, because a strong
negative correlation implies that at most one of the two parties (reference entity or
protection seller) is likely to default, not both. If the reference entity defaults
while the protection seller remains solvent, the investor is made whole. If instead
the protection seller defaults while the reference entity does not, the investor
loses the value of the existing protection and must pay to replace it -- and that
replacement is likely to cost more if the reference entity's own credit quality has
also deteriorated in the meantime.

## Five areas of finance where correlation risk matters

The reading groups the applications of correlation risk into five broad areas:
investments, trading, risk management, global markets, and regulation. The remaining
learning outcomes in this lesson dig into several of these areas individually
(trading via multi-asset options and correlation swaps, risk management via the VaR
capital charge, global markets via the 2007-2009 crisis narrative, and the
market/credit/systemic/concentration risk linkages). The remainder of this page
focuses on the **investments** application -- the foundational portfolio statistics
that correlation feeds into.

## Portfolio mean, variance, covariance, and correlation

Modern portfolio theory, originating with Harry Markowitz's work in the early 1950s,
established that the relationship between the returns of different assets -- not just
their individual risk and return -- determines how much risk reduction a portfolio
can achieve through diversification.

### Portfolio mean return

For a two-asset portfolio made up of asset X (weight w_X, average return mu_X) and
asset Y (weight w_Y, average return mu_Y), the portfolio's average (expected) return,
mu_P, is just the weighted average of the two individual average returns. Weights
represent the proportion of total portfolio value invested in each asset and sum to
one.

### Variance and standard deviation of each asset

For each asset, variance is computed by taking the deviation of each period's return
from that asset's average return, squaring each deviation (so that positive and
negative deviations both contribute positively), summing the squared deviations, and
dividing by the number of observations minus one (degrees of freedom). The standard
deviation -- often called volatility in this context -- is the square root of the
variance.

### Covariance

Covariance measures how two assets' returns move together over time. The calculation
parallels the variance calculation, except that instead of squaring each asset's own
deviation from its mean, you multiply the *paired* deviations of the two assets from
their respective means in each period, sum those products across all periods, and
divide by the number of observations minus one. Because the calculation multiplies
two deviations together (rather than squaring one), the sign of each period's
contribution depends on whether the two assets moved in the *same* direction (both
deviations positive, or both negative -- contributing a positive product) or in
*opposite* directions (one positive, one negative deviation -- contributing a
negative product). A negative sum of these products, and therefore a negative
covariance, indicates that the two assets have tended to move in opposite directions
over the sample period.

### Correlation coefficient

Covariance has a major practical drawback: its numeric value depends on the units and
volatility scale of the two variables, which makes it hard to compare across different
pairs of assets. The **correlation coefficient** standardizes covariance by dividing
it by the product of the two assets' standard deviations. The result is always between
-1 and +1, which makes it directly comparable across any pair of assets regardless of
how volatile each one is individually. A correlation near -1 indicates the two assets
move strongly in opposite directions; a correlation near +1 indicates they move
strongly together; a correlation near 0 indicates little linear relationship.

### Worked example structure

The reading illustrates these calculations with a small sample of historical prices
and returns for two hypothetical assets, X and Y. Working through the example
(computing each asset's average return, then each period's deviation from that
average, then squaring those deviations for variance and multiplying paired
deviations for covariance, and finally dividing by n - 1) produces a negative
covariance and a correlation coefficient of roughly -0.75 between the two assets --
i.e., a fairly strong tendency for X and Y to move in opposite directions over the
sample period. See [[Formulas]] for the exact equations and the worked numbers.

### Portfolio standard deviation and the return/risk ratio

For a two-asset portfolio, the portfolio standard deviation depends on each asset's
individual variance, each asset's portfolio weight, and the covariance (equivalently,
correlation) between the two assets. Holding everything else fixed, a *lower*
(more negative) correlation between the two assets produces a *lower* portfolio
standard deviation -- this is the mathematical expression of the diversification
benefit Markowitz emphasized.

Markowitz also stressed evaluating portfolios on a risk-adjusted basis, using a simple
**return/risk ratio**: the portfolio's average return divided by its standard
deviation. Using the example data (equal weights, average portfolio return around
0.25, and the roughly -0.75 correlation found above), the return/risk ratio comes out
well above 1. More generally, the lower the correlation between the two assets, the
higher this ratio becomes -- a very strong negative correlation (around -0.9) can push
the ratio above 250%, while a very strong positive correlation (around +0.9) can pull
it down to roughly 50%. In other words, for a fixed set of individual asset returns and
volatilities, lower correlation between the assets always improves the risk-adjusted
return of the combined portfolio.

## See also

- [[Correlation in Multi-Asset Options]] -- how this same correlation coefficient
  feeds into option pricing.
- [[Correlation Swaps]] -- a derivative written directly on the realized correlation
  coefficient.
- [[Correlation Risk and the VaR Capital Charge]] -- how the covariance matrix built
  from these same statistics drives portfolio VaR.
- [[Correlation and the 2007-2009 Financial Crisis]] -- what happens when static
  correlation assumptions (like copula correlations for CDOs) turn out to be wrong.
- [[Formulas]]
