---
title: VaR Mapping - Summary
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, fixed-income, derivatives, tracking-error, summary]
updated: 2026-06-13
---

# VaR Mapping

This lesson tackles a practical problem: a real portfolio can hold thousands of
positions, far too many to model individually. **Mapping** is the technique of
re-expressing every position in a portfolio as a combination of exposures to a
small set of common **risk factors** (interest rates at various maturities,
equity indices, exchange rates, and so on). Once positions are mapped, the
portfolio's VaR can be computed from the risk factors' volatilities and
correlations rather than from each individual instrument -- drastically
reducing the computational burden and making it possible to monitor risk for
large, complex, and constantly-changing books.

The lesson works through mapping for several instrument types -- fixed-income
portfolios, forwards and swaps, and options -- and introduces two related
ideas that recur throughout the FRM curriculum: the gap between
**undiversified** and **diversified** VaR (the role of correlation), and the
use of mapping to support **stress testing** and **benchmark-relative**
(tracking error) VaR.

## How the pieces fit together

- [[VaR Mapping Principles and Process|VaR mapping principles and process]]
  lays the groundwork: why mapping is needed, what a risk factor is, and the
  two-step process of (1) identifying common risk factors and (2) expressing
  each position's market value as exposures to those factors.
- [[General and Specific Risk in Mapping|General and specific risk]] explains
  how the *choice* of risk factors determines how much of a portfolio's risk
  is captured by systematic ("general") factors versus left over as
  unexplained, position-specific ("specific") risk -- and why mapping a large
  equity portfolio onto a market index is such a powerful simplification.
- [[Mapping Fixed-Income Portfolios|Mapping fixed-income portfolios]] covers
  the three standard techniques -- principal mapping, duration mapping, and
  cash flow mapping -- and works a full numerical example showing how each
  produces a different VaR for the same two-bond portfolio, plus how
  undiversified and diversified VaR are computed from the cash-flow map.
- [[Stress Testing via Mapping|Stress testing via mapping]] shows how the
  cash-flow map can be reused to stress-test a portfolio by shocking each
  mapped risk factor by its own VaR -- a shortcut that is only valid under the
  perfect-correlation (undiversified) assumption.
- [[Benchmarking and Tracking Error VaR|Benchmarking and tracking error VaR]]
  introduces the idea of measuring a portfolio's VaR *relative to* a benchmark
  and shows how tracking error VaR depends on how closely the cash flows of
  the two portfolios line up.
- [[Mapping Forwards, Swaps, and Options|Mapping forwards, swaps, and options]]
  extends the framework to linear derivatives (forward contracts, FRAs,
  interest rate swaps), which map cleanly under the delta-normal approach, and
  to options, whose nonlinearity limits how far delta-normal mapping can be
  pushed.

## Learning outcome pages

- [[VaR Mapping Principles and Process]] (LO 5.a)
- [[General and Specific Risk in Mapping]] (LO 5.b)
- [[Mapping Fixed-Income Portfolios]] (LO 5.c, 5.d)
- [[Stress Testing via Mapping]] (LO 5.e)
- [[Benchmarking and Tracking Error VaR]] (LO 5.f)
- [[Mapping Forwards, Swaps, and Options]] (LO 5.g)
- [[Formulas]] -- formulas from this lesson
