---
title: Correlation Risk, Systemic Risk, and Concentration Risk
topic: market-risk
lesson: 7
tags: [systemic-risk, concentration-risk, concentration-ratio, default-correlation, expected-loss, 2007-2009-crisis]
updated: 2026-06-13
---

# LO 7.f -- Relate correlation risk to systemic and concentration risk

**In plain terms:** systemic risk is what happens when correlation risk shows up
everywhere at once -- a crisis in one corner of the financial system spreads because
assets and institutions that previously seemed unrelated all start moving together.
Concentration risk is a more local, portfolio-level version of the same idea: the
fewer (and more correlated) your exposures are, the more a single bad outcome can hurt
you. This page covers both, including a set of worked examples showing exactly how
default correlation changes the expected loss on a small loan book.

## Systemic risk

**Systemic risk** refers to the risk that the financial system as a whole could
collapse -- not just that an individual institution or asset class suffers losses,
but that the failure of one part of the system cascades into failures across many
parts. The bankruptcy filing of a major investment bank in September 2008 is widely
viewed as a key signal of how severe the broader crisis had become.

The scale of the 2007-2009 equity market decline illustrates systemic risk vividly.
Over the period from October 2007 to March 2009, a major U.S. equity benchmark (the
Dow Jones Industrial Average) fell by more than 50%, and within a broad 500-stock
index, only a small handful of constituents (around 11 out of 500) actually rose in
value over that stretch -- the remaining roughly 489 stocks declined. This kind of
broad-based decline reflects the real-economy consequences of a systemic crisis:
falling disposable income, falling GDP, and rising unemployment all reinforcing each
other.

It is informative to look at *which* sectors were represented among the small number
of stocks that rose during this period: consumer staples (companies selling
everyday necessities like food and household goods), education (which tends to see
increased enrollment from workers who are laid off and choose to retrain),
pharmaceuticals (ongoing demand for medication regardless of the economic cycle),
and a scattering of names from agriculture, entertainment, energy, and auto-parts
retail. The common thread is that demand for these goods and services tends to hold up
-- or even increase -- during a downturn, making these sectors comparatively
"recession-resistant."

### Correlation spikes during the crisis

Studies of U.S. equity returns around the 2007-2009 crisis found that the average
pairwise correlation among individual stocks rose dramatically during the worst part
of the downturn (roughly August 2008 to March 2009) -- from a pre-crisis average
correlation level of around 27% to over 50%. The practical consequence is exactly the
opposite of what investors want during a crisis: diversification benefits shrink right
when they are needed most, because nearly all stocks start moving down together. The
problem is compounded further once you account for correlations *across* asset
classes -- the reading notes that correlations between equities, bonds, and
international equities also rose during this period, meaning that even multi-asset
diversification strategies offered less protection than usual.

## Concentration risk and the concentration ratio

**Concentration risk** is the risk of loss arising from having exposure concentrated
among a small number of counterparties (or within a small number of related groups,
such as a single industry) rather than spread broadly. It is measured using the
**concentration ratio**, defined as one divided by the number of (equally-sized)
exposures:

- A lender with 100 equally sized loans to 100 different borrowers has a concentration
  ratio of 1/100 = 0.01 -- highly diversified.
- A lender with a single loan to a single borrower has a concentration ratio of
  1/1 = 1.0 -- maximally concentrated.

A **lower** concentration ratio indicates **more** diversification (lower
concentration risk), while a **higher** concentration ratio indicates **less**
diversification (higher concentration risk).

Concentration risk and default correlation are closely linked: if a lender's exposures
are grouped by sector and defaults within a sector tend to be correlated, then a
default by one borrower in a sector raises the likelihood of further defaults within
that same sector. **Changes in the concentration ratio move together with changes in
the effective default correlation of the portfolio** -- reducing the concentration
ratio (spreading exposure across more, less-correlated borrowers) reduces the joint
probability that multiple loans default together, which is exactly the "worst case
scenario" that matters for expected loss under stress.

## Worked examples: concentration ratio and expected loss

The reading develops this relationship through a sequence of small worked examples
involving a hypothetical lender, a fixed total loan amount, and a fixed
per-borrower default probability of 5%, with loss given default (LGD) assumed to be
100% (i.e., a default means a complete loss of that loan's outstanding balance).

### One loan of $5 million (concentration ratio = 1.0)

A lender that has made a single $5 million loan to one borrower has a concentration
ratio of 1.0 (one loan, divided by one). The worst case is simply that the borrower
defaults. With a 5% default probability and 100% LGD, the expected loss is:

0.05 x $5,000,000 = $250,000.

### Two loans of $2.5 million each (concentration ratio = 0.5)

Now suppose the same total exposure ($5 million) is instead split evenly between two
borrowers ($2.5 million each), each with the same 5% individual default probability.
The concentration ratio falls to 1/2 = 0.5.

The "worst case scenario" here is the **joint** probability that *both* borrowers
default at the same time -- this joint probability depends on the **default
correlation** between the two borrowers, not just their individual default
probabilities. Each borrower's default can be modeled as a binary (0/1) outcome with
its own standard deviation determined by its 5% default probability (a standard
deviation of roughly 0.2179 for a Bernoulli variable with p = 0.05).

The reading walks through this joint probability under three different assumed
default correlations between the two borrowers:

- **Default correlation = 1.0** (the two borrowers always default together): the
  joint probability of both defaulting works out to 5% -- exactly the same as the
  single-borrower case above. The expected loss is again 0.05 x $5,000,000 =
  $250,000. In other words, **perfectly correlated defaults across two loans behave
  exactly like one big loan** -- splitting the exposure provided no diversification
  benefit at all.
- **Default correlation = 0.5**: the joint probability of both defaulting falls to
  roughly 0.02627 (2.627%), giving an expected loss of approximately 0.02627 x
  $5,000,000 = $131,350 -- noticeably lower than the fully-correlated case.
- **Default correlation = 0** (independent defaults): the joint probability of both
  defaulting falls further, to 0.05 x 0.05 = 0.0025 (0.25%), giving an expected loss of
  0.0025 x $5,000,000 = $12,500 -- dramatically lower than either of the above.

The pattern is unambiguous: **for a fixed total exposure and fixed individual default
probabilities, lower default correlation between the borrowers produces a lower
expected loss under the worst-case (joint default) scenario.** Diversifying across
borrowers only helps to the extent that those borrowers' defaults are not highly
correlated with each other.

### Three loans of roughly $1.67 million each (concentration ratio = 0.333)

Extending the same total exposure across three equally sized loans (each
approximately $1,666,667) to three different borrowers, each with a 5% default
probability, lowers the concentration ratio further to 1/3 = 0.333. The relevant
"worst case" now becomes the joint probability that *all three* borrowers default
simultaneously -- a smaller probability still than the two-borrower joint default
probability, for any given level of pairwise default correlation. The broader
takeaway is the same as in the two-loan case: **both a lower concentration ratio and
a lower default correlation push the joint (worst-case) default probability down**,
and therefore reduce expected loss under stress. (The reading does not work through
the full three-way joint probability formula in detail -- the key point to take away
is the directional relationship, not a specific calculation.)

## Tying it together

Systemic risk and concentration risk are really two views of the same underlying
phenomenon at different scales. Concentration risk asks: "if my (small number of)
exposures are correlated, how much worse does my worst case get?" Systemic risk asks
the same question at the scale of the entire financial system: "if everything becomes
correlated at once, how much worse does the worst case get for everyone
simultaneously?" The 2007-2009 crisis demonstrated both effects together -- individual
portfolios that looked diversified on paper (because their components had
historically shown low correlation) turned out to be far more concentrated in
practice once correlations spiked across the board.

## See also

- [[Correlation Risk, Market Risk, and Credit Risk]] -- default correlation and the
  term structure of default, which underpin the worked examples here.
- [[Correlation and the 2007-2009 Financial Crisis]] -- the crisis narrative that
  motivates this systemic-risk discussion.
- [[Formulas]]
