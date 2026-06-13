---
title: Formulas (Lesson 5 - VaR Mapping)
topic: market-risk
lesson: 5
tags: [formulas, var-mapping, fixed-income, duration, undiversified-var, diversified-var, tracking-error]
updated: 2026-06-13
---

# Formulas -- VaR Mapping

## Equity beta / risk-factor regression -- [[General and Specific Risk in Mapping]] (LO 5.b)

Sensitivity of an individual stock's return to a market index return:

R_i = alpha_i + beta_i * R_M + epsilon_i

where:

- R_i is the return on stock i,
- R_M is the return on the market index (the chosen general risk factor),
- alpha_i is the intercept (excluded from the risk decomposition),
- beta_i is stock i's factor exposure to the market index,
- epsilon_i is the firm-specific (specific-risk) residual, assumed
  uncorrelated with R_M and with the residuals of other stocks.

The portfolio beta is the weighted sum of the individual betas (weights w_i =
each stock's portfolio weight). Portfolio return variance V then splits into:

V = (general market risk component, driven by portfolio beta and Var(R_M))
    + (specific risk component, driven by the residual terms)

Used to justify mapping a large equity portfolio onto a single market-index
risk factor, leaving a (much smaller) specific-risk residual.

## Principal mapping VaR -- [[Mapping Fixed-Income Portfolios]] (LO 5.c, 5.d)

Weighted-average life of the portfolio:

WAL = sum_i ( w_i * maturity_i )

Principal mapping VaR:

Principal mapping VaR = (Total portfolio market value) x VaR%(WAL)

where VaR%(WAL) is the VaR percentage of a zero-coupon bond whose maturity
equals the portfolio's weighted-average life (interpolated if necessary).

Worked example: WAL = 0.50(1) + 0.50(5) = 3 years; VaR%(3) = 1.4841%; total
value = $200 million ->

Principal mapping VaR = $200 million x 1.4841% = $2.968 million

## Duration mapping VaR -- [[Mapping Fixed-Income Portfolios]] (LO 5.c, 5.d)

Macaulay duration:

Duration = ( sum_t [ t x PV(cash flow at t) ] ) / ( sum_t PV(cash flow at t) )

Linear interpolation of the VaR percentage for a maturity between two standard
maturities (here, between 2-year and 3-year zeros for a duration of 2.768):

VaR%(2.768) = VaR%(2) + [ VaR%(3) - VaR%(2) ] x (2.768 - 2)

Worked example: VaR%(2) = 0.9868%, VaR%(3) = 1.4841% ->

VaR%(2.768) = 0.9868 + (1.4841 - 0.9868) x 0.768 = 1.3687%

Duration mapping VaR:

Duration mapping VaR = (Total portfolio market value) x VaR%(Duration)

Worked example:

Duration mapping VaR = $200 million x 1.3687% = $2.737 million

## Undiversified VaR -- [[Mapping Fixed-Income Portfolios]], [[Stress Testing via Mapping]] (LO 5.d, 5.e, 5.g)

When all mapped risk factors are assumed perfectly correlated (correlation =
1), portfolio VaR equals the simple sum of each mapped position's individual
VaR contribution:

Undiversified VaR = sum_i | x_i | x VaR%_i

where x_i is the present value of the cash flow (or position) mapped to risk
factor i, and VaR%_i is that risk factor's VaR percentage.

Worked example (cash flow mapping of the two-bond portfolio): summing the five
maturity-by-maturity VaR contributions gives an undiversified VaR of $2.674
million.

This is also the figure reproduced by the stress-testing shortcut in
[[Stress Testing via Mapping]]: shocking every mapped cash flow's present
value down by its own VaR% and revaluing the portfolio gives a value drop of
$2.67 million (= undiversified VaR, up to rounding).

## Diversified VaR -- [[Mapping Fixed-Income Portfolios]], [[Mapping Forwards, Swaps, and Options]] (LO 5.d, 5.g)

Diversified VaR is computed using matrix algebra, combining the vector of
mapped present values, the vector of risk-factor VaRs, and the correlation
matrix across risk factors:

Diversified VaR = sqrt( x' R x )

where:

- x is the vector whose i-th element is | x_i | x VaR%_i (the same
  "individual VaR contribution" used in the undiversified sum),
- R is the correlation matrix of returns across the mapped risk factors
  (maturities, currencies, etc.),
- x' is the transpose of x.

Equivalently: each entry of the matrix product x' R x represents a
correlation-weighted cross-term between two risk factors' VaR contributions;
summing all these terms and taking the square root gives the diversified VaR.

Worked example (cash flow mapping of the two-bond portfolio): the sum of the
matrix-algebra terms is 6.840; the square root gives a diversified VaR of
$2.615 million -- lower than the undiversified VaR of $2.674 million because
the zero-coupon maturities are not perfectly correlated.

Used again for the forward contract ($6.01 million undiversified -> $5.588
million diversified), the FRA ($0.62 million undiversified -> $0.348 million
diversified), and the interest rate swap example in
[[Mapping Forwards, Swaps, and Options]].

## Tracking error VaR and variance improvement -- [[Benchmarking and Tracking Error VaR]] (LO 5.f)

Tracking error (TE) VaR is computed from the difference between the
benchmark's vector of market value positions, x0, and a candidate portfolio's
vector of market value positions, x, run through the same VaR-percentage and
correlation-matrix machinery used for diversified VaR:

TE VaR = VaR( x - x0 )

i.e., apply the diversified-VaR matrix-algebra formula to the difference
vector (x - x0) instead of to x alone.

Variance improvement (analogous to R-squared in a regression):

Variance improvement = 1 - ( TE VaR / Benchmark VaR )^2

Worked example: for the best-matching candidate portfolio (TE VaR = $0.17
million, Benchmark VaR = $1.99 million):

Variance improvement = 1 - (0.17 / 1.99)^2 = 99.3%

## Forward contract valuation -- [[Mapping Forwards, Swaps, and Options]] (LO 5.g)

Current value of a forward contract:

Forward_t = (F_t - K) x e^(-rt)

where:

- F_t is the current forward rate (or price) for the underlying,
- K is the rate (or price) locked in at inception,
- r is the continuously-compounded discount rate,
- t is the time remaining to settlement.

Used as the starting point for decomposing a forward contract into a long
position in one currency's zero-coupon instrument and a short position in the
other's (plus a spot FX position), each of which is then mapped onto standard
risk factors for undiversified/diversified VaR as above.

## FRA forward rate -- [[Mapping Forwards, Swaps, and Options]] (LO 5.g)

Implied forward rate between a near date (e.g., 180 days) and a far date
(e.g., 360 days), given the corresponding spot rates:

(1 + F_(1,2) / 2) = (1 + spot rate to far date) / (1 + spot rate to near date / 2)

Worked example: with a 360-day spot rate of 4.5% and a 180-day spot rate of
4.1%:

(1 + F_(1,2)/2) = 1.045 / (1 + 0.041/2) -> F_(1,2) = [(1.045 / 1.0205) - 1] x 2 = 4.8%

Present value of the notional (used as the basis for the two legs of the FRA
mapping):

PV(notional) = Notional / (1 + near-date spot rate x near-date fraction of year)

Worked example: PV($100 million) = $100 / 1.0205 = $97.991 million.

## One-day delta-normal VaR for an option (linear approximation) -- [[Mapping Forwards, Swaps, and Options]] (LO 5.g)

For a short horizon (e.g., one day), the option's value change is approximated
linearly:

(One-day loss at confidence level c) ~ (confidence multiplier) x (one-day volatility) x (option value or underlying price)

Worked example: strike = $100, annualized volatility = 25%, 95% confidence ->
one-day worst-case loss ~ $2.59, bringing the position to about $100 - $2.59 =
$97.41.

This is the delta-normal approximation: the option is treated as a linear
position of size "delta" for the purpose of a short-horizon VaR estimate. For
longer horizons (where delta is unstable), this approximation breaks down and
a delta-gamma (Taylor series) approach is preferred.
