---
title: Correlation in Multi-Asset Options
topic: market-risk
lesson: 7
tags: [correlation, multi-asset-options, exchange-option, quanto-option, implied-volatility, trading]
updated: 2026-06-13
---

# Correlation Trading With Multi-Asset Options

**In plain terms:** some option contracts pay off based on the relationship *between*
two (or more) underlying assets, not just on the level of a single asset. The price of
these "correlation options" is highly sensitive to the correlation between the
underlyings -- and for most of these structures, a *lower* correlation makes the
option *more* valuable, because it makes a wide spread between the two asset prices
more likely. This page works through the intuition using two concrete examples: the
exchange option and the quanto option.

> Note: this material supports the broader discussion of where correlation risk shows
> up in trading (part of LO 7.a's survey of finance areas), with the specific
> mechanics illustrated here.

## Notation recap

Throughout this material, S1 and S2 denote the prices of two underlying assets. For a
call option, the strike price K is the price at which the holder can buy the
underlying; for a put option, K is the price at which the holder can sell.

## General pattern: lower correlation, higher option price

A family of multi-asset (correlation) option strategies pays off based on
combinations such as the better-performing of two assets, the worse-performing of two
assets, the spread between two assets, or a basket of several assets. For nearly all
of these structures, **a lower correlation between the underlying assets increases
the option's value**. The intuition is straightforward: if two assets are not closely
linked, it becomes more likely that one of them moves up substantially while the other
moves down (or stays flat), widening the gap between them. Since many of these payoffs
reward exactly that kind of divergence, a wider expected gap translates into a higher
expected payoff and therefore a higher option price.

There is one notable exception worth remembering: an option whose payoff is based on
the *minimum* of two asset prices (i.e., a payoff tied to whichever of the two assets
performs worse) behaves the opposite way -- for this structure, a *lower* correlation
actually *reduces* the option's value, because low correlation increases the chance
that at least one of the two assets performs poorly, which drags down a "minimum of
the two" payoff.

## The exchange option

An exchange option gives its holder the right to swap one asset for another at
maturity. Its payoff is the greater of zero or the difference S2 minus S1 -- in other
words, the holder benefits whenever asset 2 ends up worth more than asset 1, and the
payoff is the size of that excess (or zero if asset 1 turns out to be worth more).

The key driver of this option's value is the **volatility of the ratio S2 / S1**,
which behaves as the option's effective "implied volatility." This combined
volatility depends on the individual volatilities of S1 and S2 *and* on the
correlation between them (see [[Formulas]] for the exact relationship).

The intuition follows directly from that formula:

- If S1 and S2 are highly (positively) correlated -- moving up and down together in
  near lockstep -- then the *ratio* S2/S1 barely changes over time, the spread
  between the two assets stays narrow, and the exchange option's value approaches
  zero.
- As the correlation between S1 and S2 falls, the ratio S2/S1 becomes more volatile,
  the spread between the two assets is more likely to widen meaningfully in either
  direction, and the exchange option becomes more valuable.

This is a clean illustration of the general rule above: lower correlation increases
the implied volatility of the relevant spread, which increases the price of an option
written on that spread.

## The quanto option

A quanto (quantity-adjusted) option lets a domestic investor gain exposure to a
foreign asset while locking in a fixed exchange rate for converting any payoff back
into domestic currency -- effectively stripping out currency risk from the foreign
investment. The seller of a quanto option faces uncertainty not only about how far the
foreign asset will move, but also about what the actual exchange rate will be at
exercise (since the rate used for conversion is fixed in advance, regardless of where
the market exchange rate ends up).

As with the exchange option, the correlation between the underlying foreign asset and
the relevant exchange rate is central to the quanto's value. The general rule again
applies: **lower correlation between the foreign asset and the exchange rate produces
a higher quanto option price.**

### Worked intuition: a quanto call on a foreign equity index

Consider a domestic investor who buys a quanto call giving exposure to a foreign
equity index, with the foreign-currency payoff converted back to domestic currency at
a pre-agreed exchange rate. The relationship between the index level and the exchange
rate (expressed as domestic currency per unit of foreign currency) matters for the
option seller's hedging costs:

- If the index and the exchange rate are **positively correlated**, then a rising
  index tends to coincide with a stronger foreign currency (relative to the domestic
  currency) -- and vice versa for a falling index.
- If they are **negatively correlated**, a rising index tends to coincide with a
  *weaker* foreign currency.

From the option seller's perspective, the negatively correlated case is the more
expensive one to hedge: if the index rises (so the call is deep in the money and the
seller owes a large foreign-currency-denominated payoff) at the same time that the
foreign currency weakens, the seller needs to acquire *more* units of the foreign
currency to convert that larger foreign-currency payoff into the promised amount of
domestic currency at the fixed rate. This added hedging cost and uncertainty is priced
into the option, so **lower (or more negative) correlation between the index and the
exchange rate results in a higher quanto option price** -- consistent with the general
correlation-option pattern.

## See also

- [[Financial Correlation Risk and Its Applications]] -- the broader survey of finance
  areas where correlation risk appears, including trading.
- [[Correlation Swaps]] -- another correlation-sensitive trading structure, this time
  written directly on the realized correlation coefficient.
- [[Formulas]]
