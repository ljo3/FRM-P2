---
title: Correlation Swaps
topic: market-risk
lesson: 7
tags: [correlation-swap, realized-correlation, variance-swap, payoff, trading]
updated: 2026-06-13
---

# LO 7.c -- Describe the structure, uses, and payoffs of a correlation swap

**In plain terms:** a correlation swap lets two parties bet directly on what the
average correlation among a basket of assets will turn out to be over some future
period, versus a correlation level they agree on today. One side locks in a fixed
correlation rate; the other side is exposed to whatever correlation actually shows up
in the data once the swap matures.

## Structure

A correlation swap has two counterparties:

- The party **buying** the correlation swap agrees to pay a **fixed correlation
  rate**, set at inception (for example, 30%).
- The party **selling** the correlation swap receives that fixed rate.

At maturity, the contract is settled based on the difference between the **realized
correlation** that actually occurred over the life of the swap and the fixed rate
agreed at the start. Realized correlation (sometimes called stochastic correlation,
since it is not known in advance) is computed from the actual pairwise correlations
observed among the assets in the underlying basket over the swap's term.

## Payoff

The buyer of the correlation swap profits when the realized correlation comes in
*above* the fixed rate -- the present value of the position to the buyer rises as
realized correlation increases. The payoff to the buyer is calculated as the notional
amount of the swap multiplied by the difference between realized correlation and the
fixed correlation rate (see [[Formulas]] for the exact expression). If realized
correlation turns out to be below the fixed rate, this payoff is negative -- the
buyer loses, and the seller of the swap gains the corresponding amount.

## Realized correlation for a basket of assets

When the underlying basket contains more than two assets, "realized correlation" is
defined as the simple average of all the **pairwise** correlation coefficients among
the assets in the basket, computed from each asset's actual log returns over the
swap's life. For a basket of n assets, there are n(n-1)/2 distinct pairs, and the
realized correlation is the average of the correlation coefficients across all of
those pairs.

### Worked example

Suppose a correlation swap buyer agrees to pay a fixed correlation rate of 0.20 on a
notional amount of $1,000,000, for a one-year swap referencing a basket of three
assets. At maturity, the three pairwise correlations of the assets' daily log returns
turn out to be 0.60, 0.20, and 0.04.

The realized correlation is the simple average of these three pairwise figures:
(0.60 + 0.20 + 0.04) / 3 = 0.28.

The buyer's payoff is then the notional amount multiplied by the difference between
realized and fixed correlation:

$1,000,000 x (0.28 - 0.20) = $80,000.

Because realized correlation (0.28) exceeded the fixed rate (0.20), the buyer
receives a positive payoff of $80,000.

## Other ways to "buy correlation"

Correlation swaps are not the only way market participants take a view on
correlation. Two other structures achieve a similar economic exposure:

- **Index versus single-name call options.** An investor can buy call options on a
  broad equity index (such as a large-cap stock index) while simultaneously selling
  call options on the individual constituent stocks of that index. If correlation
  among the constituents increases, the implied volatility used to price the index
  call options tends to rise more than the implied volatility of the individual-stock
  call options, because the index's volatility is itself a function of how correlated
  its components are. The resulting gain on the long index-call position is expected
  to outweigh the loss on the short single-stock-call positions -- effectively a long
  correlation trade.
- **Index versus single-name variance swaps.** Similarly, an investor can pay the
  fixed leg of a variance swap on an index while receiving the fixed leg of variance
  swaps on the individual securities within that index. A rise in the correlation
  among the index constituents increases the variance of the index itself. Since the
  payer of fixed in a variance swap benefits when realized variance rises, an increase
  in correlation increases the present value of this position to the investor who pays
  fixed on the index leg -- again, a long correlation exposure.

## See also

- [[Financial Correlation Risk and Its Applications]] -- the broader survey of where
  correlation matters in trading and risk management.
- [[Correlation in Multi-Asset Options]] -- another correlation-sensitive derivative
  structure.
- [[Correlation Risk and the VaR Capital Charge]] -- how correlation feeds into
  portfolio volatility and VaR, the next topic in the lesson.
- [[Formulas]]
