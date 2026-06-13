---
title: Liquidity Risk and LVaR
topic: market-risk
lesson: 6
tags: [liquidity-risk, exogenous-liquidity, endogenous-liquidity, lvar, flight-to-quality]
updated: 2026-06-13
---

# LO 6.b — Exogenous and endogenous liquidity risk, and integrating them into VaR

**In plain terms:** standard VaR assumes a position can be sold at the quoted market
price with no friction. Real markets don't work that way — selling costs something
(the bid/ask spread), and selling *enough* of something can itself move the price
against you. This page covers the two ways academics split up that "liquidity gap" and
how each is folded into a VaR-style measure.

## Why liquidity horizons change

The **liquidity horizon** of a position is the time it takes to exit (or hedge) that
position without materially moving its price. This horizon is not fixed — it
contracts and expands with market conditions. During a financial crisis, liquidity can
evaporate: instruments that traded freely in normal times suddenly become difficult to
sell at anything close to the pre-crisis price. A VaR model that assumes a constant
liquidity horizon, calibrated from normal-market data, will therefore understate risk
precisely during the periods when liquidity matters most.

Academics distinguish two sources of this liquidity gap.

## Exogenous liquidity

Exogenous liquidity risk is the cost that exists **regardless of how large your own
trade is** — it is a feature of the market for that instrument, driven by the
behavior of other participants (market makers, other traders), not by your own order.
It shows up as the **bid/ask spread**: the gap between the price at which you can buy
and the price at which you can sell, even for a small, "normal" trade size.

This component is captured through a **liquidity-adjusted VaR (LVaR)** measure.
Conceptually, LVaR starts from an ordinary VaR estimate and then adds an extra charge
for the cost of crossing the spread to actually exit the position. The result is a risk
figure that reflects not just potential price moves but also the transaction cost of
converting the position back to cash. Because exogenous liquidity is "market-specific"
in the sense that it depends on the typical trading costs for that instrument or
market segment (rather than on the size of any one trader's book), it can reasonably
be estimated from observed average spreads.

## Endogenous liquidity

Endogenous liquidity risk is the **additional** price impact that comes specifically
from the size of your own trade. If you need to sell a large quantity of an asset
relative to its normal trading volume, your own selling pressure pushes the price down
— over and above the bid/ask spread that a small trade would face. This is sometimes
described as the sensitivity (elasticity) of price to the volume being traded: the
larger the order relative to typical market depth, the larger this price-impact
component becomes.

Important features of endogenous liquidity risk:

- It depends on **trade size relative to market depth**, not just on the instrument
  itself — the same bond might have negligible endogenous liquidity cost for a small
  position but a substantial one for a position large enough to be a meaningful share
  of daily trading volume.
- It is most clearly observed in situations where liquidity risk is already elevated —
  i.e., it tends to be largest exactly when exogenous liquidity (spreads) is also
  widening.
- It is especially relevant for **exotic or complex positions**, which may have few
  natural counterparties and limited standardized markets, making large trades
  especially price-disruptive.
- Even so, endogenous liquidity costs are not purely a "crisis" phenomenon — some
  degree of price impact from trading exists in **all** market conditions; it is just
  much larger and more damaging during stress.

## Flight to quality

During periods of market stress, investors often shift collectively toward safer,
more liquid assets — a pattern commonly called a **flight to quality**. For a trader
holding thinly traded or niche assets, this shift is especially painful: at the exact
moment they might want or need to reduce risk, the pool of willing buyers for their
specific holdings shrinks, making it much harder (and more costly) to unwind those
positions. This is one of the mechanisms by which endogenous liquidity risk becomes
most severe in stressed markets.

## Integrating liquidity into VaR

Academic research suggests that, of the two, **endogenous liquidity should be the
first priority** when adapting a risk valuation model — because it reflects a cost
that is directly within the institution's control (driven by its own position sizes)
and because it can become severe very quickly as a position grows or as markets
deteriorate. Exogenous liquidity (the spread-based LVaR adjustment) is more
straightforward to estimate from market data and is typically treated as the second,
complementary adjustment.

Put together, a liquidity-aware VaR framework starts from a standard VaR estimate,
adds a charge for the cost of crossing the market spread (exogenous liquidity /
LVaR), and ideally also reflects how the act of unwinding a position of the
institution's actual size would itself move the price (endogenous liquidity) — though
this second piece is harder to quantify and is less commonly built into standard
models.

## Connections elsewhere in this lesson

Liquidity considerations interact with the time-horizon discussion in
[[VaR Implementation Lessons]] — a position with a longer liquidity horizon needs a
longer VaR horizon to be measured realistically. Liquidity stress is also one of the
channels through which the balance-sheet feedback loop described in
[[Leverage, Balance Sheet Management, and Procyclicality]] operates: forced asset
sales during a downturn occur into markets where endogenous liquidity costs are
elevated, amplifying losses.

## See also

- [[Summary]]
- [[VaR Implementation Lessons]]
- [[VaR vs Expected Shortfall and Spectral Risk Measures]]
- [[Formulas]]
