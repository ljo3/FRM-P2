---
title: Leverage, Balance Sheet Management, and Procyclicality
topic: market-risk
lesson: 6
tags: [leverage, procyclicality, var-constraint, balance-sheet-management, boom-bust]
updated: 2026-06-13
---

# LO 6.f — Leverage, the market value of assets, and VaR in active balance sheet management

**In plain terms:** this page connects VaR-based risk management to how financial
institutions actually adjust their balance sheets over time, and explains why this
behavior can make the financial system *more* volatile rather than less — even though
each individual institution is "just" following its own risk limits.

## The leverage / asset value relationship

Define **leverage** as the ratio of total assets to equity (total assets divided by
net worth). This ratio moves **inversely** with the market value of a firm's assets,
for a simple balance-sheet reason:

- When the **market value of assets rises**, and liabilities (debt) do not rise by
  the same amount, **equity (net worth) increases** — and since equity is now larger
  relative to assets, **leverage falls**.
- When the **market value of assets falls**, equity absorbs the loss and shrinks —
  and since equity is now smaller relative to assets, **leverage rises**.

So far this is just arithmetic. The behavioral question is: what does a financial
institution *do* in response to these mechanical changes in its leverage ratio?

## Active balance sheet management creates a feedback loop

If an institution actively manages its balance sheet toward a **target leverage
ratio** (or a target risk level expressed via that ratio), the mechanical relationship
above turns into a **behavioral feedback loop**:

- When asset prices **rise**, net worth rises and leverage falls *below* target. To
  restore the target leverage, the institution **buys more assets** (using new
  borrowing capacity created by the now-larger equity cushion). This additional
  buying can itself put further upward pressure on asset prices.
- When asset prices **fall**, net worth falls and leverage rises *above* target. To
  restore the target, the institution **sells assets** (or otherwise shrinks its
  balance sheet) to bring leverage back down. This additional selling can itself put
  further downward pressure on asset prices.

In both directions, the institution's own risk-management response **reinforces**
the initial price move rather than dampening it. This is the cyclical feedback loop:
rising prices beget more buying, and falling prices beget more selling — exactly the
opposite of what a "buy low, sell high" stabilizing strategy would do.

## How VaR enters the picture

Many institutions tie their risk-taking to a **VaR-based constraint**: risk (as
measured by VaR) is kept within some target proportion of the institution's economic
capital (equity).

- During an **economic boom**, rising asset prices increase the value of equity. With
  more capital available, the same dollar amount of VaR now represents a *smaller*
  share of capital — the VaR constraint becomes **less binding** ("relaxes"). This
  frees up capacity for the institution to take on **more risk and more debt**,
  reinforcing the asset-buying side of the feedback loop above.
- During an **economic bust**, falling asset prices reduce equity. The same VaR now
  represents a *larger* share of a smaller capital base — the VaR constraint
  **tightens**. To bring measured risk back within the (now tighter) constraint, the
  institution must **reduce leverage**, typically by selling assets — and it must do
  so precisely when asset prices are falling and market liquidity is also
  deteriorating, reinforcing the asset-selling side of the loop.

## The procyclicality conclusion

Putting these pieces together: capital requirements and risk constraints that are
based on measures like VaR — which respond to current market conditions — tend to
**amplify boom-and-bust cycles** rather than dampen them. Institutions are pushed
toward taking on more risk exactly when conditions are good (and risk measures look
low), and pushed toward shedding risk exactly when conditions are bad (and risk
measures look high) — even though, from a forward-looking perspective, the *true*
underlying risk may not have changed nearly as much as the measured risk has.

This produces a paradox: regulatory frameworks built around increasingly
sophisticated VaR models, intended to **limit** risk-taking, can end up **amplifying**
financial and economic fluctuations — increasing systemic risk in financial markets
rather than reducing it. Academic research on balance-sheet adjustments by leveraged
institutions has linked this active, target-leverage behavior to broader effects on
risk premiums and overall financial market volatility.

## Connections to the rest of the lesson

This procyclicality dynamic is the natural conclusion of several threads from earlier
in this lesson:

- [[VaR Implementation Lessons]] noted that incorporating time-varying volatility
  makes VaR more responsive — which is precisely the property that drives the
  tightening/relaxing of the VaR constraint described here.
- [[Liquidity Risk and LVaR]] described how forced selling during a downturn runs into
  reduced market liquidity (a "flight to quality") — exactly the situation an
  institution faces when deleveraging during a bust.
- [[Top-Down and Bottom-Up Risk Aggregation]] discussed how risk measurement errors
  can understate true risk when categories interact — a leveraged institution that
  underestimates risk during a boom is, in effect, setting itself up for a sharper
  forced deleveraging during the subsequent bust.

## See also

- [[Summary]]
- [[VaR Implementation Lessons]]
- [[Liquidity Risk and LVaR]]
- [[Top-Down and Bottom-Up Risk Aggregation]]
