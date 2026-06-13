---
title: Backtesting VaR - Summary
topic: market-risk
lesson: 4
tags: [market-risk, backtesting, VaR, model-validation, summary]
updated: 2026-06-13
---

# Backtesting VaR

A VaR model is only useful if it's *right* — or at least, right often enough.
**Backtesting** is the discipline of checking a VaR model against reality:
counting how often actual losses exceeded the model's predicted VaR
(**exceptions**), and asking whether that count is consistent with the
confidence level the model claims to deliver. This lesson builds up the
statistical machinery for that check, then connects it to the Basel
Committee's regulatory framework for bank VaR models.

## How the pieces fit together

- [[Backtesting Fundamentals]] sets the stage: what backtesting is, why
  exceptions matter, and the practical difficulties (static-portfolio
  assumptions, limited sample sizes, actual vs. hypothetical returns) that
  make backtesting harder than it sounds.
- [[Failure Rates and the Z-Score Test]] introduces the simplest formal test:
  is the observed failure rate (exceptions / sample size) statistically
  consistent with the model's stated confidence level?
- [[Type I and Type II Errors and the Kupiec Test]] frames the whole exercise
  as a hypothesis test with two ways to go wrong, and introduces Kupiec's
  log-likelihood ratio test for **unconditional coverage** — a more rigorous
  version of the failure-rate idea.
- [[Conditional Coverage Testing]] adds a dimension the unconditional tests
  miss entirely: *when* exceptions happen, not just how many. Clustered
  exceptions can signal a model that's gone stale.
- [[Basel Rules for Backtesting]] shows how regulators turned these ideas into
  a concrete penalty system — the green/yellow/red zone framework that ties
  exception counts to a bank's capital requirements.

## Learning outcome pages

- [[Backtesting Fundamentals]] (LO 4.a, LO 4.b)
- [[Failure Rates and the Z-Score Test]] (LO 4.c)
- [[Type I and Type II Errors and the Kupiec Test]] (LO 4.d)
- [[Conditional Coverage Testing]] (LO 4.e)
- [[Basel Rules for Backtesting]] (LO 4.f)
- [[Formulas]] — formulas from this lesson
