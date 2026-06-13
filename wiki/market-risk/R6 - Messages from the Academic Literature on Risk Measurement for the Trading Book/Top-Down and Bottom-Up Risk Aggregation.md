---
title: Top-Down and Bottom-Up Risk Aggregation
topic: market-risk
lesson: 6
tags: [risk-aggregation, top-down, bottom-up, diversification-ratio, market-credit-risk-interaction]
updated: 2026-06-13
---

# LO 6.e — Comparing top-down and bottom-up risk aggregation research

**In plain terms:** if compartmentalized (additive) risk measurement might over- or
understate true risk, how big is the error in practice, and which direction does it
go? This page covers two families of academic research that try to answer that
question — "top-down" studies and "bottom-up" studies — and what each has found.

## Why risk categories are hard to cleanly separate

A bank's overall portfolio is often described as if it were neatly divisible into
sub-portfolios: a market-risk book, a credit-risk book, an operational-risk book, and
so on. In reality, individual exposures frequently mix risk types. A foreign-currency
loan is a textbook example: it carries **credit risk** (the borrower might default)
and **foreign-exchange risk** (the value of the loan in the bank's home currency
moves with the exchange rate) *at the same time*, within the same instrument. You
cannot fully separate "the credit risk part" from "the FX risk part" of that single
exposure — they are intertwined. This kind of overlap is the underlying reason why
risk categories interact rather than behaving as cleanly independent buckets.

## The diversification ratio

To measure how much error is introduced by treating risks as separable, researchers
compute a ratio:

- **Numerator:** total capital required under a **unified (integrated)** approach —
  i.e., capital based on the joint distribution of all risks together.
- **Denominator:** total capital required under a **compartmentalized (separate)**
  approach — i.e., the simple sum of capital computed for each risk type in
  isolation.

A ratio **less than one** means the integrated capital figure is *smaller* than the
sum of the separate figures — in other words, **diversification** is present: holding
the risks together is less risky than the sum of holding them apart would suggest,
and the compartmentalized approach overstates true risk.

A ratio **greater than one** means the opposite — the integrated figure exceeds the
sum of the separate figures, indicating **compounding**: holding the risks together
is *more* risky than the sum suggests, and the compartmentalized approach
*understates* true risk.

## Top-down studies

Top-down research starts from the premise that a bank's portfolio genuinely can be
divided along market/credit/operational lines (even if imperfectly) and then asks how
the combined risk of those pieces compares to their simple sum.

- Top-down studies have generally found the diversification ratio to be **less than
  one** — consistent with the presence of diversification benefits when risk types
  are considered together, and consistent with the idea that a compartmentalized
  approach (which ignores these benefits) is, if anything, **conservative** (it
  overstates risk).

## Bottom-up studies

Bottom-up research instead starts from the individual exposures themselves —
recognizing, as with the FX-loan example above, that many exposures carry more than
one type of risk simultaneously — and tries to model the interactions between risk
factors directly, building up to a portfolio-level figure from these
interaction-aware building blocks.

- Bottom-up studies have **often** also found a ratio less than one, broadly echoing
  the top-down finding of net diversification.
- However, the bottom-up evidence is **not conclusive**. Some more recent bottom-up
  research has instead found evidence of **risk compounding** — i.e., a ratio
  *greater than one* — suggesting that for at least some portfolios or risk
  combinations, treating risks separately can **understate** true risk rather than
  overstate it.
- Because of this mixed evidence, bottom-up research suggests that the assumption of
  net diversification benefits should not be taken for granted, and should instead
  be evaluated case by case.

## Market risk and credit risk together

A specific and frequently studied interaction is between **market risk** and
**credit risk**. While it might seem conservative (i.e., safety-margin-building) to
measure these two risk types independently and add the results:

- Most academic evidence supports looking at market risk and credit risk **jointly**
  rather than separately, because they interact in ways that pure addition misses
  (the FX-loan example is one instance of this).
- If a bank ignores these interdependencies, its capital requirement will be
  **mismeasured** — specifically, because diversification effects are typically
  present between market and credit risk, ignoring the interaction tends to leave the
  bank holding **more** capital than is strictly necessary relative to the true
  integrated risk.
- This implies that **separate measurement of market and credit risk most likely
  produces an upper bound** on the true integrated capital requirement — i.e., a
  conservative (if imprecise) estimate, in the typical case where diversification
  dominates.

## The exception: incomplete separation

The "separate measurement is conservative" conclusion depends on being able to
cleanly separate the risk types in the first place. If a bank's exposures are like
the FX-loan example — genuinely **mixed** across risk categories rather than cleanly
divisible — then a compartmentalized approach may fail to capture some risk
altogether, rather than merely double-counting it.

In this situation, the compartmentalized approach is **not conservative enough**: the
lack of complete separation can lead to an **underestimation** of total risk. The
practical conclusion for bank management and regulators is that, where exposures
cannot be cleanly separated into single risk categories, the bank's overall capital
should be set **higher** than the simple sum of its individually computed risk-type
capital figures — the opposite adjustment from the "upper bound" conclusion above.

## See also

- [[Summary]]
- [[Unified vs Compartmentalized Risk Measurement]]
- [[Leverage, Balance Sheet Management, and Procyclicality]]
