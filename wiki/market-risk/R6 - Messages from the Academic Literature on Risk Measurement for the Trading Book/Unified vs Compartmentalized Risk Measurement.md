---
title: Unified vs Compartmentalized Risk Measurement
topic: market-risk
lesson: 6
tags: [integrated-risk, unified-approach, compartmentalized-approach, basel-pillars, risk-diversification]
updated: 2026-06-13
---

# LO 6.d — Comparing unified and compartmentalized risk measurement

**In plain terms:** when a bank wants to know its total risk across market, credit,
and operational exposures, it can either measure each type of risk separately and add
the results (compartmentalized), or try to model how all the risk types interact at
once and measure the combined outcome directly (unified). This page explains both
approaches and where the current regulatory framework sits.

## Two ways to aggregate risk

**Compartmentalized (separate) measurement** treats each risk category — market
risk, credit risk, operational risk, and so on — as its own self-contained problem.
A risk figure (e.g., a capital requirement) is computed for each category in
isolation, using whatever model is appropriate for that category, and the bank's
total risk figure is simply the **sum** of these individual figures.

**Unified (integrated) measurement** instead tries to model all relevant risk
categories **together**, within a single framework, so that the relationships and
interactions between them are captured directly. Rather than asking "how risky is the
market book?" and "how risky is the credit book?" separately and adding the answers,
a unified approach asks "what does the joint distribution of outcomes across *all*
these risk sources look like?" and derives a single combined risk figure from that
joint distribution.

## Why the distinction matters: interaction effects

The central reason these two approaches can give different answers is **interaction**
between risk types. Some risk exposures genuinely combine in ways that are not
captured by treating them as independent and additive:

- Certain combinations of exposures can produce **compounding effects** — situations
  where having both exposures simultaneously is *worse* than the sum of having each
  one alone would suggest, because they tend to deteriorate together.
- Other combinations can produce **diversification effects** — situations where
  having both exposures is *better* than the sum would suggest, because they tend to
  offset each other (losses in one area coincide with gains, or at least no losses,
  in another).

A purely additive, compartmentalized approach implicitly assumes these interaction
effects are either absent or exactly cancel out — an assumption that is not generally
true. A unified approach, by modeling all risks jointly, can in principle capture
whichever of these effects (compounding or diversifying) is actually present.

## The Basel "building block" approach

The Basel regulatory capital framework is explicitly **compartmentalized** — it uses
what is often called a "building block" structure:

- **Pillar 1** covers the core, formula-driven capital requirements for **market
  risk**, **credit risk**, and **operational risk**. Each is calculated using its own
  methodology.
- **Pillar 2** addresses additional risk considerations that Pillar 1 does not fully
  capture — including concentration risk, the results of stress testing, and other
  categories such as liquidity risk, residual risk, and business risk.

A bank's overall regulatory capital requirement is obtained by **summing** the
capital figures produced for each of these categories. This is, by construction, a
**non-integrated (compartmentalized) approach**: it does not explicitly model how
market, credit, and operational risk might interact with one another, nor does it
adjust the total for any diversification or compounding that might exist between
them.

## The key caution

The central message from this comparison is that **simply adding up individually
computed risk measures does not necessarily produce an accurate measure of the bank's
true overall risk**. Depending on the actual (unmodeled) interactions between risk
types:

- If diversification effects dominate, the simple sum will **overstate** true risk
  (the bank is "safer" than the sum of its parts suggests).
- If compounding effects dominate, the simple sum will **understate** true risk (the
  bank is riskier than the sum of its parts suggests).

Which of these is more common in practice — and how the evidence splits between
"top-down" and "bottom-up" approaches to studying the question — is the subject of
[[Top-Down and Bottom-Up Risk Aggregation]].

## See also

- [[Summary]]
- [[Top-Down and Bottom-Up Risk Aggregation]]
- [[VaR vs Expected Shortfall and Spectral Risk Measures]]
