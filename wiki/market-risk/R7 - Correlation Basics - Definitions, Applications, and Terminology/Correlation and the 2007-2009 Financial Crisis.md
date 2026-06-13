---
title: Correlation and the 2007-2009 Financial Crisis
topic: market-risk
lesson: 7
tags: [financial-crisis, cdo, copula, credit-default-swap, default-correlation, wrong-way-risk, basel-iii]
updated: 2026-06-13
---

# LO 7.b -- Explain how correlation contributed to the global financial crisis of 2007-2009

**In plain terms:** the 2007-2009 crisis is a case study in what happens when an
entire financial system relies on correlation assumptions that turn out to be wrong
at exactly the moment they matter most. New structured products were built on copula
models whose assumed correlations broke down, credit-rating downgrades on a few large
issuers rippled through correlated CDO tranches, and -- once the crisis was underway
-- correlations across asset classes that had previously seemed unrelated converged
toward one, wiping out diversification benefits across the board.

## The setup: conditions that primed the system

In the years leading up to the crisis, several factors combined to create an
environment that was unusually exposed to correlation risk:

- Coming out of the early-2000s downturn (following the bursting of the dot-com
  bubble), the broader economy enjoyed a period of low credit spreads, low interest
  rates, and low volatility -- conditions that tend to encourage more risk-taking.
- An overheated housing market encouraged households to take on increasing amounts of
  debt against properties whose values were inflated relative to fundamentals.
- New structured products -- collateralized debt obligations (CDOs), constant
  proportion debt obligations (CPDOs), and credit default swaps (CDSs) -- made it
  easier to package and distribute exposure to this real estate lending, which in turn
  encouraged further speculation.
- Rating agencies, risk managers, and regulators broadly underestimated how much
  leverage both individual borrowers and financial institutions were accumulating.

Together, these conditions set the stage for a crisis that was ultimately triggered by
defaults in subprime mortgages.

## The copula correlation model and CDO tranches

A central technical failure involved the **copula correlation model**, a relatively
new tool that risk managers adopted to estimate default correlations among the many
assets inside a CDO. A typical CDO might reference around 125 underlying credits. To
fully characterize the pairwise default correlations among that many assets requires
estimating n(n-1)/2 correlation pairs -- for 125 assets, that works out to
125 x 124 / 2 = 7,750 individual pairwise correlations. Estimating and managing a
number this large is an enormous undertaking, and the copula approach was the
shortcut the market relied on to make it tractable.

CDOs divide the pool of underlying credits into **tranches** ordered by seniority,
each absorbing losses in a defined order:

- The **equity tranche** is the riskiest slice, typically absorbing the first
  portion of losses (around the first 3% of defaults in the pool).
- The **mezzanine tranche** sits above the equity tranche, typically absorbing the
  next band of losses (roughly from 3% up to 7%).
- More senior tranches sit above that, absorbing losses only after the lower tranches
  are wiped out.

The copula model was relied upon to describe how defaults -- and therefore losses --
would be correlated across these tranches. A number of large hedge funds built
positions that were long the equity tranche and short the mezzanine tranche,
effectively betting that gains on one side would offset losses on the other. This
strategy depended on the copula model's assumptions about how the two tranches'
spreads would move relative to each other -- assumptions that turned out not to hold.

## The May 2005 trigger: GM and Ford downgrades

In May 2005, rating agencies downgraded the bonds of two large U.S. automakers (Ford
and General Motors) to below investment grade ("junk") status. Such downgrades
typically force large institutional holders -- pension funds, insurance companies,
and similar entities that are restricted from holding non-investment-grade debt -- to
sell their positions, often causing sharp price declines independent of the issuer's
actual default probability.

This episode is also useful for illustrating a broader pattern: bonds within the same
credit-quality tier tend to be more highly correlated with each other, while bonds
across different credit-quality tiers tend to be less correlated.

Following the downgrades, the equity tranche spread widened sharply, hurting the
hedge funds that were long that tranche (the spread they had locked in when entering
the position was now below the prevailing market spread, producing a paper loss). At
the same time, correlations *within* the investment-grade CDO universe declined, which
pushed the mezzanine tranche spread *down* -- hurting the same hedge funds on their
short mezzanine positions (they were now paying a higher spread than the market would
require for a new position). In other words, the hedge funds lost money on **both
legs** of what was supposed to be a hedged trade, because the copula-implied
relationship between the two tranches' spreads did not behave as assumed.

## From subprime defaults to a global crisis

The CDO market -- much of it backed by residential mortgages -- grew enormously in
the run-up to the crisis, expanding from roughly $64 billion in 2003 to roughly $455
billion in 2006. Loose lending standards combined with inflated real estate values
created the conditions for a sharp reversal: home prices stagnated starting in 2006,
the first wave of mortgage defaults followed, and by 2007 the broader real estate
market was in outright decline as defaults accelerated. Because the CDO market was so
closely tied to these mortgages, it collapsed in tandem -- and because CDOs and
related products were held globally, the collapse propagated into a worldwide crisis
affecting equity and commodity markets alike.

As the crisis spread, correlations rose sharply across multiple dimensions
simultaneously: correlations among stocks increased as equity markets fell together,
and default correlations within CDO and bond markets increased as the creditworthiness
of borrowers and institutions came into question across the board.

There is also an important relationship between the CDO equity tranche spread and
default correlation more generally: a *rise* in default correlation typically *lowers*
the equity tranche spread (which, other things equal, would raise the equity tranche's
value). However, during the crisis the **probability of default itself** rose so
dramatically across the subprime universe that it overwhelmed this correlation effect
and dragged down the value of *every* CDO tranche -- including tranches rated AAA,
some of which lost around 20% of their value once it became clear they were no longer
shielded by the lower tranches absorbing losses first. Institutions that had taken on
substantial leverage in these supposedly "safe" senior tranches suffered the largest
losses, with effective exposures many multiples (on the order of 10 to 20 times) of
the underlying invested amounts.

## The CDS market and systemically important failures

Alongside the CDO market, the credit default swap market expanded enormously over
roughly the 2004-2007 period -- from around $8 trillion to around $60 trillion in
notional terms. CDSs function similarly to insurance: they transfer credit exposure
from one party to a broader market of protection sellers, who in turn need to be
financially sound enough to make good on claims.

The crisis exposed serious weaknesses in this system. One large global insurer had
written roughly $500 billion of CDS protection with comparatively little reinsurance
backing it up, leaving it severely exposed once claims began to materialize. Separately,
one major investment bank entered bankruptcy in September 2008 with leverage
(liabilities relative to equity) of roughly 30 times -- and its actual risk exposure
was effectively even larger once its very large number of derivatives counterparties
(on the order of 8,000) is taken into account.

## Regulatory response

In response to these failures, regulators began developing a new framework (commonly
referred to as Basel III), including new liquidity and leverage requirements for
financial institutions. On the correlation modeling side, the crisis spurred
development and adoption of newer tools intended to better capture correlated default
risk in multi-asset portfolios, including Gaussian copula variants, credit valuation
adjustment (CVA) methods that explicitly price in counterparty correlations on
derivatives positions, and explicit modeling of wrong-way risk (the same WWR concept
introduced in [[Financial Correlation Risk and Its Applications]]).

## See also

- [[Financial Correlation Risk and Its Applications]] -- static vs. dynamic
  correlation, and the wrong-way-risk concept that recurs throughout this crisis
  narrative.
- [[Correlation Risk, Systemic Risk, and Concentration Risk]] -- the broader
  systemic-risk lens on the same 2007-2009 events.
- [[Formulas]]
