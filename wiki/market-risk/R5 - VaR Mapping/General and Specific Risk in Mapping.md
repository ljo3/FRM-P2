---
title: General and Specific Risk in Mapping
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, general-risk, specific-risk, beta, equity-portfolio]
updated: 2026-06-13
---

# LO 5.b -- Explain and demonstrate how the mapping process captures general and specific risks

**In plain terms:** every mapping choice involves a trade-off. The factors you
choose to keep ("general" risk factors) explain part of each position's
behavior; whatever is left unexplained becomes "specific" risk. Adding more,
more granular risk factors shrinks the leftover specific risk -- but increases
the modeling burden. This page works through that trade-off and a worked
example of mapping a large equity portfolio onto a single index.

## How many risk factors is enough?

There is no fixed answer -- it depends on the portfolio and on how much
modeling effort the institution is prepared to invest. Sometimes a single risk
factor (or just a couple) is sufficient to capture the bulk of a portfolio's
risk. Adding more risk factors generally improves the accuracy of the risk
estimate, but each additional factor adds to the time and complexity of
building and maintaining the model -- more volatilities to estimate, and a
larger correlation matrix to manage.

## General risk vs. specific risk

The factors retained in the mapping are called **general** (or **primitive**)
**risk factors** -- broad, systematic drivers like overall interest rate
levels, equity market indices, or major exchange rates. Whatever variation in
a position's value is *not* explained by movements in these general factors is
classified as **specific risk** -- the unsystematic, position-specific
component (sometimes called idiosyncratic or asset-specific risk).

The key relationship to internalize: **the definition of "specific risk" is
not fixed -- it depends on how finely the general risk factors are defined.**
The more precisely (granularly) general risk is defined, the smaller the
residual specific risk becomes. A simple illustration with a bond portfolio
makes this concrete:

- If the only risk factor used is **duration**, bonds that differ in credit
  quality, currency, or other characteristics will show a lot of unexplained
  variance -- a large specific-risk component.
- Adding a **credit risk factor** (e.g., a measure tied to credit spreads or
  ratings) captures more of that variance, shrinking specific risk.
- Adding a further **currency risk factor** shrinks specific risk again.

In other words, specific risk is simply whatever general risk *hasn't* been
asked to explain yet. As the set of general risk factors becomes richer,
specific risk asymptotically shrinks toward zero (though in practice it never
fully disappears).

## Worked example: mapping a large equity portfolio

Consider an equity portfolio holding 5,000 individual stocks. Conceptually,
each stock's return has two components: a market-wide (systematic) component
and a firm-specific component.

If every one of those 5,000 stocks were treated as its own risk factor, the
risk model would need a separate covariance term for every pair of stocks.
The number of such pairs is:

[5,000 x (5,000 - 1)] / 2 ~ 12.5 million covariance terms

Estimating, storing, and inverting a matrix of that size is completely
impractical. Mapping provides the way out: diversification within the
portfolio tends to wash out the firm-specific components, leaving mostly the
market-wide (systematic, or "beta") component. That means each stock's market
risk can be **mapped onto a single common factor** -- a broad equity market
index -- collapsing millions of covariance terms down to a handful of
parameters (the index's own volatility, plus each stock's sensitivity to it).

### The regression behind the mapping

The sensitivity of stock *i* to the market index is estimated by regressing
the stock's return on the index return:

R_i = alpha_i + beta_i * R_M + epsilon_i

- alpha_i (the intercept) is dropped from the risk calculation -- it reflects
  average excess return, not risk.
- epsilon_i is the firm-specific residual, assumed uncorrelated with both the
  market return and the residuals of other stocks.
- beta_i is the **factor exposure** -- how much stock *i* moves, on average,
  for a given move in the market index. This beta is exactly the "risk factor
  exposure" concept from [[VaR Mapping Principles and Process|the general
  mapping framework]], applied to equities.

### Aggregating to the portfolio level

If w_i is the portfolio weight of stock *i*, the portfolio return is a
weighted sum of the individual stock returns (using the regression
decomposition above). Aggregating the betas by their portfolio weights gives
the **portfolio beta** -- the single number that summarizes the entire
portfolio's exposure to the common market-index risk factor.

### Splitting portfolio variance

Once the portfolio is expressed this way, its total return variance, V,
decomposes cleanly into two pieces:

- a **general market risk** component, driven by the portfolio beta and the
  variance of the market index, and
- a **specific risk** component, driven by the (diversified, but not fully
  eliminated) firm-specific residuals.

This is the same general-vs-specific split described above, just applied at
portfolio scale: the index mapping captures the general risk; everything else
is specific risk.

## Relationship to the rest of the lesson

This general/specific distinction is the conceptual lens for evaluating *any*
mapping choice in this lesson. When [[Mapping Fixed-Income Portfolios|fixed-income
positions]] are mapped to standard maturities, or when
[[Mapping Forwards, Swaps, and Options|derivatives]] are decomposed into
component cash flows, the same question applies: how much of the true risk is
captured by the chosen factors, and how much is left as specific risk?

## See also

- [[VaR Mapping Principles and Process]]
- [[Mapping Fixed-Income Portfolios]]
- [[Formulas]]
