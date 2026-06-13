---
title: Correlation Risk, Market Risk, and Credit Risk
topic: market-risk
lesson: 7
tags: [market-risk, credit-risk, var, expected-shortfall, default-correlation, migration-risk, term-structure-of-default]
updated: 2026-06-13
---

# LO 7.e -- Explain the role of correlation risk in market risk and credit risk

**In plain terms:** correlation risk is not a separate, standalone risk category --
it is woven into how both market risk and credit risk are measured. On the market
risk side, correlation sits inside the covariance matrix that drives VaR and expected
shortfall. On the credit risk side, correlation governs how likely it is that multiple
borrowers default together, which in turn determines how much real diversification a
loan portfolio actually has. This page covers both halves of that picture.

## Correlation risk and market risk

Market risk is typically broken down into several major drivers: interest rate risk,
currency risk, equity price risk, and commodity price risk. Risk managers most
commonly summarize market risk using **value at risk (VaR)**, and the covariance
matrix of the portfolio's assets is a core input to that calculation (as detailed in
[[Correlation Risk and the VaR Capital Charge]]). Because correlation is what
populates the off-diagonal entries of that covariance matrix, **any change in
correlation directly changes VaR**, even if no individual asset's own volatility
changes at all.

A second commonly used market risk measure is **expected shortfall (ES)**, which
focuses on the *severity* of losses in the tail of the distribution -- i.e., it asks
"given that a loss beyond the VaR threshold occurs, how large is it likely to be?"
Like VaR, ES depends on the covariance matrix of the portfolio's assets, so it is
equally exposed to correlation risk.

Putting these together, correlation risk in the market-risk context can be summarized
as: the risk that the correlations feeding into the covariance matrix used for VaR and
ES calculations change over time, which changes the risk measures themselves --
independent of any change in the underlying assets' individual volatilities.

## Correlation risk and credit risk

On the credit side, risk managers focus on two related concepts:

- **Migration risk** is the risk that a borrower's credit quality deteriorates --
  for example, a downgrade by a rating agency. A downgrade signals a higher
  probability of eventual default, and the market price of the borrower's debt
  typically falls in response, creating a mark-to-market (paper) loss for holders even
  before any actual default occurs.
- **Default risk** is the risk that a borrower fails to meet its obligations
  outright.

Correlation enters credit risk most directly through **default correlation** -- the
degree to which multiple borrowers' defaults tend to happen at the same time. This
matters enormously for institutions like banks and mortgage lenders that extend many
loans across many borrowers: a *lower* default correlation among those borrowers
means defaults are more spread out over time and across circumstances, giving the
lender more genuine diversification. A *higher* default correlation means that when
one borrower defaults, others are more likely to default at the same time, which
concentrates losses into the same period.

The wrong-way-risk discussion from
[[Financial Correlation Risk and Its Applications]] is a special case of this
same idea, applied to a single CDS counterparty/reference-entity pair rather
than a whole loan portfolio: a higher
correlation between the counterparty's and the reference entity's default
probabilities raises the chance of a total loss on the position.

### Default correlation across and within industries

Empirical studies of historical default data point to a consistent pattern: default
correlations tend to be **positive across most industry sectors** -- when conditions
worsen broadly, defaults tend to rise together across many different industries. One
notable exception is the energy sector, which has historically shown little to no
correlation with the broader economy and tends to be comparatively resilient during
downturns.

More importantly, default correlations tend to be **higher within an industry than
across industries**. This reflects the fact that broad, systematic factors (the
overall state of the economy, industry-wide demand shocks, and so on) influence
defaults far more than factors specific to an individual company. A useful mental
model: if one major automaker defaults, that is more likely to signal trouble for
other automakers (because they share the same systematic exposures -- weak consumer
demand, high input costs, and so on) than to create an opportunity for the surviving
automakers to simply absorb the failed company's market share and benefit.

The practical implication for lenders is straightforward: **diversifying loan
exposure across industries -- rather than concentrating it within a single industry
-- reduces default correlation among the borrowers in the portfolio**, which reduces
the chance that a large share of the portfolio defaults at the same time.

## The term structure of default probabilities

Credit rating agencies publish default probabilities broken down by both credit
rating and time to maturity -- a "term structure" of default risk. Two patterns stand
out:

- For **investment-grade** borrowers, the probability of default tends to *increase*
  (gradually) as the time horizon lengthens. This makes intuitive sense: the longer
  the horizon, the more opportunity there is for adverse company-specific or
  macroeconomic developments to occur.
- For **non-investment-grade (speculative/junk)** borrowers, the pattern is
  different: the probability of default is *higher in the near term* than in later
  years. The interpretation is that a weak borrower's most dangerous period is the
  immediate future -- if the borrower survives an initial period of financial
  distress, its conditional probability of default in subsequent years actually
  declines.

## See also

- [[Correlation Risk and the VaR Capital Charge]] -- the mechanics of how correlation
  feeds VaR for market risk.
- [[Correlation Risk, Systemic Risk, and Concentration Risk]] -- extends default
  correlation to the concentration-ratio framework and systemic risk.
- [[Correlation and the 2007-2009 Financial Crisis]] -- a real-world episode where
  default correlations across credit-quality tiers shifted dramatically.
- [[Formulas]]
