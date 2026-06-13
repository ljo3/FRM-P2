---
title: Conditional Coverage Testing
topic: market-risk
lesson: 4
tags: [market-risk, backtesting, conditional-coverage, christoffersen-test, independence]
updated: 2026-06-13
---

# LO 4.e — Why conditional coverage matters in backtesting

**In plain terms:** the Kupiec test answers "did we get roughly the right
*number* of exceptions?" It says nothing about whether those exceptions were
spread out evenly or all happened in the same bad week. Conditional coverage
testing fills that gap.

## The blind spot in unconditional coverage

The unconditional coverage test (Kupiec's LR_uc, see
[[Type I and Type II Errors and the Kupiec Test]]) treats the T daily
pass/fail outcomes as if only their *total count* N matters. Two very
different sequences of outcomes can produce the identical LR_uc statistic:

- 12 exceptions spread roughly evenly across a 252-day year, versus
- the same 12 exceptions all occurring within a single two-week stretch.

Both sequences have the same failure rate N/T = 12/252, so both would pass
(or fail) the unconditional coverage test identically. But the second
pattern — a **cluster** of exceptions — is a red flag in its own right: it
suggests the model failed to adapt when market conditions changed (e.g.,
correlations or volatilities shifted and the model kept using stale
estimates), even if it "averages out" to a reasonable exception count over
the full year.

## Christoffersen's test of independence (LR_ind)

Christoffersen developed a likelihood ratio test, **LR_ind**, that examines
whether exceptions are **serially independent** — i.e., whether an exception
on one day makes an exception on the next day more or less likely than the
model would imply. Like LR_uc, LR_ind is asymptotically chi-squared
distributed with **1 degree of freedom**, so the same critical value applies:
reject the hypothesis of independence if LR_ind > 3.84.

A significant LR_ind statistic — exceptions clustering together more than
chance would predict — indicates the model isn't adapting quickly enough to
changing conditions, even if its long-run exception rate looks fine.

## Combining the two tests: conditional coverage (LR_cc)

**Conditional coverage** combines both questions — is the overall rate right,
*and* are exceptions independent over time — into a single test:

LR_cc = LR_uc + LR_ind

Because LR_uc and LR_ind are each asymptotically chi-squared with 1 degree of
freedom, and (under the joint null hypothesis) independent of one another,
their sum LR_cc is asymptotically chi-squared with **2 degrees of freedom**.
At a 95% confidence level, the chi-squared(2) critical value is **5.99**.

**Decision rule:** reject the model under the conditional coverage test if
LR_cc > 5.99.

A model can fail the conditional coverage test even if it passes the
unconditional coverage test on its own — for example, if the exception count
is about right (LR_uc small) but exceptions are heavily clustered (LR_ind
large enough to push LR_cc past 5.99).

> For exam purposes, the focus is conceptual: understanding *what* LR_ind and
> LR_cc test for and *why* clustering matters, rather than computing LR_ind
> from raw data. The arithmetic for LR_uc (covered in
> [[Type I and Type II Errors and the Kupiec Test]]) is the more
> computation-heavy piece.

## Why this matters in practice

If a model's exceptions are found to be serially dependent, the appropriate
response isn't just to flag the model as "wrong" in some generic sense — it's
a specific diagnostic that the model's risk-factor correlations, volatilities,
or other inputs likely need to be re-estimated to reflect current market
conditions, since the clustering suggests the model lagged a real shift in
the environment.

## See also

- [[Type I and Type II Errors and the Kupiec Test]]
- [[Basel Rules for Backtesting]]
- [[Formulas]]
