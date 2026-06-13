---
title: Formulas (Lesson 7 - Correlation Basics)
topic: market-risk
lesson: 7
tags: [formulas, correlation, covariance, portfolio-variance, correlation-swap, var, concentration-ratio]
updated: 2026-06-13
---

# Formulas -- Correlation Basics: Definitions, Applications, and Terminology

## Portfolio mean return -- [[Financial Correlation Risk and Its Applications]] (LO 7.a)

mu_P = w_X * mu_X + w_Y * mu_Y

where:

- mu_P is the average (expected) return of a two-asset portfolio,
- w_X, w_Y are the portfolio weights of assets X and Y (w_X + w_Y = 1),
- mu_X, mu_Y are the average returns of assets X and Y.

Used whenever you need the expected return of a portfolio built from individually
known asset returns and weights. This is the starting point for the return/risk ratio
discussed in [[Financial Correlation Risk and Its Applications]].

## Variance of an individual asset -- [[Financial Correlation Risk and Its Applications]] (LO 7.a)

Var(X) = sigma_X^2 = [ sum over t of (X_t - mu_X)^2 ] / (n - 1)

where:

- X_t is the observed return of asset X in period t,
- mu_X is the average return of asset X across all n periods,
- n is the number of return observations (division by n - 1 applies the
  degrees-of-freedom correction for a sample).

Standard deviation (volatility), sigma_X, is the square root of this variance. Used as
the diagonal entries of the covariance matrix and as the denominator input to the
correlation coefficient.

## Covariance between two assets -- [[Financial Correlation Risk and Its Applications]] (LO 7.a)

Cov(X, Y) = cov_XY = [ sum over t of (X_t - mu_X)(Y_t - mu_Y) ] / (n - 1)

where:

- X_t, Y_t are the returns of assets X and Y in period t,
- mu_X, mu_Y are the average returns of X and Y,
- n is the number of paired return observations.

Measures the degree to which two assets' returns move together. A negative sum of
cross-products (and therefore a negative covariance) indicates the two assets tend to
move in opposite directions. Covariance is the off-diagonal entry of the
variance-covariance matrix used throughout
[[Correlation Risk and the VaR Capital Charge]].

## Correlation coefficient -- [[Financial Correlation Risk and Its Applications]] (LO 7.a)

rho_XY = cov_XY / (sigma_X * sigma_Y)

where:

- cov_XY is the covariance between assets X and Y,
- sigma_X, sigma_Y are the standard deviations of X and Y.

Standardizes covariance into a value between -1 and +1, making it comparable across
any pair of assets regardless of their individual volatility scales. This is the
single most important number in the entire lesson -- it appears (directly or via the
covariance matrix) in essentially every other LO page.

### Worked example (from the reading's sample data)

Using the reading's small sample data set for two assets X and Y:

- Sum of squared deviations for X = 0.7079 -> Var(X) = 0.7079 / 4 = 0.1770
  -> sigma_X = sqrt(0.1770) ~= 0.4207
- sigma_Y ~= 0.4068 (analogous calculation for Y)
- Sum of cross-products of deviations = -0.5135 -> Cov(X, Y) = -0.5135 / 4 = -0.1284
- rho_XY = -0.1284 / (0.4207 * 0.4068) ~= -0.7501

## Two-asset portfolio standard deviation -- [[Financial Correlation Risk and Its Applications]] (LO 7.a)

sigma_P = sqrt( w_X^2 * sigma_X^2 + w_Y^2 * sigma_Y^2 + 2 * w_X * w_Y * cov_XY )

equivalently, substituting cov_XY = rho_XY * sigma_X * sigma_Y:

sigma_P = sqrt( w_X^2 * sigma_X^2 + w_Y^2 * sigma_Y^2 + 2 * w_X * w_Y * rho_XY * sigma_X * sigma_Y )

where all terms are as defined above. For an equally weighted portfolio (w_X = w_Y =
0.5) using the worked example's numbers (mu_X = 0.3019, mu_Y = 0.2032, sigma_X =
0.4207, sigma_Y = 0.4068, rho_XY = -0.7501), the portfolio average return is mu_P =
0.2526 and the portfolio standard deviation is sigma_P ~= 0.1464.

## Return/risk ratio -- [[Financial Correlation Risk and Its Applications]] (LO 7.a)

return/risk ratio = mu_P / sigma_P

Using the worked example above: 0.2526 / 0.1464 ~= 1.725 (i.e., approximately 172.5%).
This ratio rises as correlation between the two portfolio assets falls -- a
correlation of about -0.9 can push the ratio above 250%, while a correlation of about
+0.9 can pull it down to roughly 50%. Used to compare portfolios on a risk-adjusted
basis, illustrating the diversification benefit of low/negative correlation.

## Exchange option implied volatility -- [[Correlation in Multi-Asset Options]] (LO 7.a)

sigma_E = sqrt( sigma_1^2 + sigma_2^2 - 2 * rho_12 * sigma_1 * sigma_2 )

where:

- sigma_E is the implied volatility of the ratio S2 / S1 (the "effective volatility"
  driving the exchange option's price),
- sigma_1, sigma_2 are the individual volatilities of assets S1 and S2,
- rho_12 is the correlation coefficient between S1 and S2.

The exchange option's payoff is max(0, S2 - S1). As rho_12 approaches 1, sigma_E
approaches |sigma_2 - sigma_1| (often near zero if the two volatilities are similar),
so the option's value falls toward zero. As rho_12 falls, sigma_E rises, increasing the
option's value. This is the formula that drives the "lower correlation ->
higher correlation-option price" rule discussed throughout
[[Correlation in Multi-Asset Options]].

## Realized correlation for a correlation swap -- [[Correlation Swaps]] (LO 7.c)

rho_realized = [ sum over all pairs (i, j) with i > j of rho_(i,j) ] / [ n(n-1)/2 ]

where:

- rho_(i,j) is the pairwise correlation coefficient of the daily log returns
  [ln(S_t / S_(t-1))] of assets i and j over the life of the swap,
- n is the number of assets in the underlying basket,
- n(n-1)/2 is the number of distinct pairs among n assets.

For the worked example (n = 3 assets, pairwise correlations 0.60, 0.20, and 0.04):

rho_realized = (0.60 + 0.20 + 0.04) / 3 = 0.28

## Correlation swap payoff -- [[Correlation Swaps]] (LO 7.c)

payoff to buyer = notional amount x (rho_realized - rho_fixed)

where:

- notional amount is the contract's notional value,
- rho_realized is the realized correlation computed above,
- rho_fixed is the fixed correlation rate agreed at inception.

Worked example: notional = $1,000,000, rho_fixed = 0.20, rho_realized = 0.28 ->
payoff = $1,000,000 x (0.28 - 0.20) = $80,000. A positive payoff to the buyer requires
realized correlation to exceed the fixed rate; otherwise the seller gains.

## Number of pairwise correlations for n assets -- [[Correlation and the 2007-2009 Financial Crisis]] (LO 7.b)

number of pairs = n(n-1) / 2

For a CDO referencing n = 125 underlying credits: 125 x 124 / 2 = 7,750 pairwise
correlations. Illustrates the scale of the estimation problem that copula correlation
models were built to address -- and that, when those models were wrong, left risk
managers exposed across thousands of correlation assumptions simultaneously.

## Variance-covariance (delta-normal) VaR -- [[Correlation Risk and the VaR Capital Charge]] (LO 7.d)

VaR = sigma_P * alpha * sqrt(x)

where:

- sigma_P is the daily volatility (standard deviation) of the portfolio's value,
- alpha is the z-value from the standard normal distribution corresponding to the
  desired confidence level (e.g., alpha = 2.33 for a 99% one-tailed confidence level),
- x is the number of trading days in the VaR horizon (e.g., x = 10 for a 10-day VaR).

This is the core formula linking portfolio volatility (and therefore correlation, via
sigma_P below) to a dollar VaR figure.

## Portfolio volatility from the covariance matrix -- [[Correlation Risk and the VaR Capital Charge]] (LO 7.d)

sigma_P = sqrt( beta_h x C x beta_v )

where:

- beta_h is the horizontal (row) vector of dollar exposures to each asset,
- C is the variance-covariance matrix of asset returns (diagonal entries = each
  asset's variance; off-diagonal entries = covariances between asset pairs),
- beta_v is the vertical (column) vector of the same dollar exposures (i.e., beta_h
  transposed).

The expression beta_h x C x beta_v produces the portfolio's variance in dollar terms;
its square root is the portfolio's dollar standard deviation, sigma_P, which feeds
directly into the VaR formula above. Because C contains correlation-derived
covariances off the diagonal, any change in the assumed correlation between assets
changes sigma_P and therefore VaR.

### Worked example (two-asset portfolio)

Portfolio: $8 million in asset A (daily sigma_A = 1.5%), $4 million in asset B (daily
sigma_B = 2.0%), correlation rho_AB = 0.6, confidence level 99% (alpha = 2.33), horizon
x = 10 days.

1. Covariance matrix entries: Var(A) = sigma_A^2, Var(B) = sigma_B^2,
   Cov(A,B) = rho_AB * sigma_A * sigma_B (and symmetric Cov(B,A)).
2. Compute beta_h x C, then (beta_h x C) x beta_v, to get portfolio variance in dollar
   terms.
3. sigma_P = sqrt of that result.
4. 10-day 99% VaR = sigma_P x 2.33 x sqrt(10) ~= $1,324,800.

## Basel trading-book capital charge -- [[Correlation Risk and the VaR Capital Charge]] (LO 7.d)

capital charge = 3 x (10-day VaR)

Applying the worked VaR example above: capital charge = 3 x $1,324,800 = $3,974,400.
Because 10-day VaR rises with the correlation between trading-book assets, the capital
charge rises with it too -- the most direct mechanical link in this lesson between a
correlation assumption and a regulatory capital number.

## Concentration ratio -- [[Correlation Risk, Systemic Risk, and Concentration Risk]] (LO 7.f)

concentration ratio = 1 / (number of equally sized exposures)

Examples: 100 equal loans -> concentration ratio = 1/100 = 0.01 (highly diversified);
1 loan -> concentration ratio = 1/1 = 1.0 (fully concentrated); 2 equal loans ->
0.5; 3 equal loans -> 0.333. A lower concentration ratio indicates more
diversification.

## Expected loss under the worst-case (joint default) scenario -- [[Correlation Risk, Systemic Risk, and Concentration Risk]] (LO 7.f)

EL = P(joint default) x total exposure (with LGD = 100%)

For a two-borrower portfolio (each with default probability p = 5%, total exposure =
$5,000,000), the joint default probability P(AB) depends on the default correlation
rho_default between the two borrowers:

- rho_default = 1.0 -> P(AB) = p = 0.05 -> EL = 0.05 x $5,000,000 = $250,000
  (equivalent to a single $5 million loan -- no diversification benefit).
- rho_default = 0.5 -> P(AB) ~= 0.02627 -> EL ~= 0.02627 x $5,000,000 = $131,350.
- rho_default = 0.0 (independent) -> P(AB) = p^2 = 0.05 x 0.05 = 0.0025 -> EL =
  0.0025 x $5,000,000 = $12,500.

General relationship used to derive P(AB) for two binary (0/1) default indicators each
with standard deviation sigma = sqrt(p(1-p)):

P(AB) = p^2 + rho_default x sigma_A x sigma_B

(with sigma_A = sigma_B = sqrt(0.05 x 0.95) ~= 0.2179 for p = 0.05). Lower default
correlation (for a fixed concentration ratio) and a lower concentration ratio (for a
fixed default correlation) both reduce the joint default probability and therefore the
expected loss under the worst-case scenario.
