---
title: VaR Mapping Principles and Process
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, risk-factors, portfolio-risk]
updated: 2026-06-13
---

# LO 5.a -- Explain the principles underlying VaR mapping and describe the mapping process

**In plain terms:** mapping means swapping out a portfolio's actual holdings
for a small set of stand-in "risk factor" exposures that behave, for VaR
purposes, the same way the real positions do. Rather than tracking the price
history of every bond, swap, and option separately, the risk manager tracks
how the portfolio's value responds to a handful of underlying market
variables -- interest rates at different maturities, an equity index level, an
exchange rate, and so on.

## Why mapping is necessary

A trading book can easily contain thousands of distinct instruments. Computing
a full variance-covariance VaR position-by-position would require estimating
volatilities and pairwise correlations for every single instrument -- a
number of parameters that explodes combinatorially as the position count
grows. Mapping sidesteps this by recognizing that most positions are really
just different packages of exposure to the same underlying drivers. Once those
common drivers (the **risk factors**) are identified, the portfolio's risk can
be described with a much smaller, more manageable set of volatility and
correlation estimates.

Mapping is especially valuable in a few recurring situations:

- **Large, heterogeneous portfolios** where computing risk position-by-position
  is computationally impractical.
- **Instruments whose characteristics change through time**, such as a bond
  whose remaining maturity shortens every day -- mapping lets the risk model
  continuously re-express the bond's exposure in terms of the *current*
  maturity bucket rather than tracking a fixed instrument.
- **New or illiquid instruments with no usable price history**, such as a
  recent IPO. Since there's no historical return series to draw on, the
  manager instead has to reason about which broad market factors are likely to
  drive the position's value and map it onto those.

## The core principles

A few ideas summarize how mapping is used in practice:

1. Mapping lets a risk manager **aggregate exposure** across a portfolio that
   would otherwise be too large to evaluate position by position.
2. Mapping **collapses many similar exposures into one factor**. For instance,
   a book with thousands of trades all sensitive to the same exchange rate can
   be summarized by a single aggregate exposure to that currency pair, rather
   than thousands of individual sensitivities.
3. Risk mapping is allowed to diverge from how positions are valued for pricing
   purposes. Two instruments that must be priced separately (because their cash
   flows differ) can still be lumped together for risk-measurement purposes if
   they share the same risk drivers -- the aggregation is acceptable for
   measuring risk even where it would not be acceptable for valuation.
4. Mapping naturally handles **instruments that evolve over time**. A bond's
   exposure can be re-mapped to whichever point on the yield curve corresponds
   to its current remaining life, automatically keeping the risk
   characterization current as the bond ages.
5. Mapping is the natural tool when **no historical data exists** for the
   instrument itself, because the risk factors it's mapped to typically do
   have rich historical data even when the instrument doesn't.

## The two-step mapping process

**Step 1 -- Identify common risk factors.** The risk manager surveys every
position in the portfolio and determines which underlying market variables
drive its value. The goal is to find a set of factors that is shared across
many positions, so that the dimensionality of the problem shrinks.

**Step 2 -- Express each position's market value as factor exposures.** Each
position's market value (MV) is decomposed into pieces, with each piece
assigned to one of the chosen risk factors. If there are several positions and
several risk factors, this produces a grid: each row corresponds to a
position, each column to a risk factor, and each cell holds the portion of
that position's value exposed to that factor. Summing down each column
produces a single aggregate exposure figure for each risk factor -- a vector
of risk-factor exposures that fully replaces the original list of individual
positions for risk-measurement purposes.

Once the portfolio has been reduced to this vector of risk-factor exposures,
standard variance-covariance VaR machinery -- factor volatilities and a
factor correlation/covariance matrix -- can be applied directly, regardless of
how many individual instruments originally made up the portfolio.

## Relationship to the rest of the lesson

This two-step framework is the template that every other page in this lesson
applies to a specific instrument type: [[Mapping Fixed-Income Portfolios|bonds]]
are mapped onto points on the yield curve, [[Mapping Forwards, Swaps, and Options|forwards, swaps, and options]]
are decomposed into their basic building blocks, and the choice of *how many*
and *which* risk factors to use directly determines the split between
[[General and Specific Risk in Mapping|general and specific risk]] discussed
next.

## See also

- [[General and Specific Risk in Mapping]]
- [[Mapping Fixed-Income Portfolios]]
- [[Formulas]]
