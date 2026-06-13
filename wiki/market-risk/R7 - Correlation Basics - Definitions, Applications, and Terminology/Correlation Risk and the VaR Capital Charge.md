---
title: Correlation Risk and the VaR Capital Charge
topic: market-risk
lesson: 7
tags: [var, variance-covariance-method, delta-normal, covariance-matrix, basel, capital-charge, trading-book]
updated: 2026-06-13
---

# LO 7.d -- Estimate the impact of different correlations between assets in the trading book on the VaR capital charge

**In plain terms:** because correlation is baked directly into the covariance matrix
used to compute portfolio VaR, changing the assumed correlation between two assets --
holding everything else constant -- changes the portfolio's VaR, and therefore
changes how much regulatory capital a bank must hold against its trading book. This
page works through the variance-covariance (delta-normal) VaR calculation for a
two-asset portfolio and shows the direction and size of that effect, plus how the
result maps into the Basel trading-book capital charge.

## The variance-covariance (delta-normal) VaR formula

Under the variance-covariance approach, portfolio VaR over a chosen holding period is
calculated from three ingredients: the portfolio's daily volatility, a z-value
corresponding to the desired confidence level (drawn from the standard normal
distribution), and the square root of the number of trading days in the holding
period (to scale a one-day volatility up to a multi-day horizon). See [[Formulas]] for
the exact expression.

The portfolio's daily volatility itself is computed from the covariance matrix of the
underlying assets together with each asset's dollar exposure. Conceptually, you take
a "horizontal" vector of dollar exposures, multiply it by the covariance matrix, then
multiply that result by the same exposures arranged as a "vertical" vector, and take
the square root of the resulting number. Because the covariance matrix contains both
each asset's own variance (on the diagonal) and the covariances between pairs of
assets (off the diagonal), and because covariance is just correlation scaled by the
two assets' standard deviations, **the correlation between the assets is embedded
directly in this calculation**.

## Worked example: two-asset portfolio VaR

Consider a portfolio with $8 million invested in asset A and $4 million invested in
asset B. The two assets have a correlation of 0.6, and their daily return standard
deviations are 1.5% (asset A) and 2.0% (asset B). We want the 10-day VaR at a 99%
confidence level, where the corresponding z-value is 2.33.

The procedure has three steps:

1. **Build the covariance matrix.** The diagonal entries are each asset's own
   variance (standard deviation squared). The off-diagonal entries are the covariance
   between A and B, obtained by multiplying the correlation (0.6) by both assets'
   standard deviations.
2. **Compute portfolio variance.** Multiply the vector of dollar exposures ($8
   million, $4 million) by the covariance matrix, then multiply that result by the
   same exposure vector again. This produces the portfolio's variance in dollar terms
   for one day.
3. **Take the square root** of that portfolio variance to get the one-day dollar
   standard deviation of the portfolio, then scale by the square root of 10 (for the
   10-day horizon) and multiply by the z-value of 2.33 to get the 10-day 99% VaR.

Carrying through this calculation produces a 10-day 99% VaR of approximately
$1,324,800. The interpretation of this number is the usual VaR interpretation: under
the model's assumptions, a loss this large or larger over a 10-day period should occur
only about 1% of the time -- roughly once every 100 ten-day periods, which (at 250
trading days per year) works out to roughly once every four years.

## How correlation changes the answer

If the same two-asset portfolio (same dollar amounts, same individual volatilities) is
re-evaluated at a *different* assumed correlation between A and B, the resulting VaR
changes -- and the relationship is monotonic over the relevant range: **the higher the
correlation between the two assets, the higher the portfolio VaR.** Intuitively, a
higher correlation means the two positions are less able to offset each other's
moves, so the portfolio behaves more like a single larger position and less like a
diversified combination -- raising overall portfolio volatility and therefore VaR. A
lower (or more negative) correlation has the opposite effect, reducing portfolio
volatility and VaR because losses in one asset are more likely to be offset by gains
in the other.

This is the same diversification logic introduced in
[[Financial Correlation Risk and Its Applications]] for the return/risk ratio, just
applied here to a dollar VaR number instead of a standardized portfolio standard
deviation.

## From VaR to the regulatory capital charge

The Basel Committee on Banking Supervision (BCBS) requires banks to hold regulatory
capital against the market risk of positions held in the **trading book** -- the set
of positions that are marked to market, such as stocks, futures, options, and swaps --
based on the portfolio's VaR. Specifically, the required capital is set as a multiple
of (at least) three times the 10-day VaR.

Applying this to the worked example above: with a 10-day 99% VaR of $1,324,800, the
required trading-book capital charge would be:

$1,324,800 x 3 = $3,974,400.

Because VaR itself increases with the correlation assumed between the portfolio's
assets, **the capital charge increases right along with it** -- a bank that assumes
(or experiences) higher correlations among its trading-book positions must hold more
capital against those positions, all else equal. This is one of the most direct,
mechanical links in the entire lesson between an abstract correlation assumption and
a concrete regulatory capital requirement.

## See also

- [[Financial Correlation Risk and Its Applications]] -- the underlying portfolio
  variance/covariance/correlation math.
- [[Correlation Risk, Market Risk, and Credit Risk]] -- how the same covariance matrix
  feeds VaR and expected shortfall more generally.
- [[Formulas]]
