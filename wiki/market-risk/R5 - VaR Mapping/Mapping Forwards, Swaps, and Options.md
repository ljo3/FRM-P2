---
title: Mapping Forwards, Swaps, and Options
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, delta-normal, forwards, fra, interest-rate-swaps, options, delta-gamma]
updated: 2026-06-13
---

# LO 5.g -- Describe the method of mapping forwards, forward rate agreements, interest rate swaps, and options

**In plain terms:** linear derivatives -- forwards, FRAs, and swaps -- can be
broken down into simple long/short positions in bonds and spot instruments,
each of which maps cleanly onto standard risk factors. Once mapped this way,
the same undiversified/diversified VaR machinery from
[[Mapping Fixed-Income Portfolios]] applies directly. Options are different:
their value doesn't move linearly with the underlying, so delta-normal mapping
only works as an approximation, and that approximation degrades as the time
horizon lengthens.

## The delta-normal method, generally

The **delta-normal method** estimates VaR by treating a portfolio's value as a
**linear combination of risk factors** that are assumed to be (jointly)
normally distributed. Once an instrument is expressed this way, the portfolio
inherits a covariance (or correlation) matrix from its underlying risk
factors, and VaR follows from standard matrix multiplication -- exactly the
undiversified/diversified VaR framework introduced for fixed-income mapping.

The method works best for instruments whose payoffs really are (approximately)
linear in their risk factors over the relevant horizon. Forwards, FRAs, and
swaps fit this description well because their values can be decomposed into a
small number of zero-coupon-bond-like positions, each of which has readily
available volatility and correlation data.

## Mapping forward contracts

A forward contract's current value is the present value of the difference
between the **current forward rate**, F_t, and the **locked-in delivery rate**,
K:

Forward_t = (F_t - K) e^(-rt)

To map a forward contract, it helps to recognize that a forward position is
economically equivalent to a combination of simpler positions. For a forward
contract to purchase a foreign currency (say, euros) with domestic currency
(say, US dollars) one year from now, the position is equivalent to holding,
simultaneously:

1. A **short position** in a domestic (e.g., US Treasury) zero-coupon bill,
2. A **long position** in a foreign-currency (e.g., one-year euro) zero-coupon
   bill, and
3. A **long position in the foreign currency spot market**.

Once decomposed this way, each piece is just a position in an instrument the
risk system already has volatility/correlation data for (a domestic rate, a
foreign rate, and an exchange rate). The present values of the long and short
legs are computed, the VaR percentage for each leg's risk factor is applied to
get each leg's contribution, and these contributions are combined -- summed
directly for **undiversified VaR**, or combined via the correlation matrix for
**diversified VaR** -- using the same matrix-algebra structure as in
[[Mapping Fixed-Income Portfolios]].

In a representative example, a forward position is decomposed into a long
position in a foreign bill (worth roughly $122.9 million) and a short position
in a domestic bill of the same present value. Applying VaR percentages to each
leg and summing gives an **undiversified VaR around $6.01 million**; combining
the legs through the correlation matrix gives a **diversified VaR around
$5.59 million** -- again illustrating that accounting for (imperfect)
correlation reduces the VaR estimate relative to the undiversified figure.

This decomposition approach generalizes: **any instrument that can be
expressed as a linear combination of basic building blocks** (zero-coupon
positions, spot FX positions, etc.) can be mapped this way, and delta-normal
VaR can be applied to it with reasonable accuracy.

## Mapping forward rate agreements (FRAs)

A forward rate agreement that locks in an interest rate starting at some
future date and ending later (e.g., a "6x12" FRA -- starting in 6 months,
ending in 12 months) is equivalent to a combination of borrowing for the near
period and lending for the far period (or vice versa, depending on the
direction of the FRA).

Concretely, selling a 6x12 FRA on a notional amount is equivalent to:

- **Borrowing** that notional amount for 6 months (180 days), and
- **Investing** the proceeds for 12 months (360 days) at the corresponding
  rate.

The mapping proceeds by:

1. Computing the **present value of the notional** discounted at the shorter
   (180-day) rate -- this present value is the amount that will be invested
   out to the 360-day maturity.
2. Deriving the implied **forward rate** between the 180-day and 360-day
   points from the two spot rates -- this is the rate the FRA effectively
   locks in.
3. Treating the position as **two offsetting zero-coupon exposures** (one at
   the 180-day point, one at the 360-day point), each with its own present
   value and VaR percentage.
4. Computing **undiversified VaR** as the sum of the absolute VaR
   contributions from the two legs, and **diversified VaR** by running the
   same present-value vector through the correlation matrix for the two
   maturities.

In a representative example, this produces an undiversified VaR of about
$0.62 million and a diversified VaR of about $0.35 million for a $100 million
notional FRA -- again, diversified VaR is meaningfully lower than
undiversified VaR because the two legs' maturities are not perfectly
correlated.

## Mapping interest rate swaps

An interest rate swap exchanges a fixed-rate cash flow stream for a
floating-rate cash flow stream (or vice versa). The key insight for mapping is
that **a swap can be decomposed into a fixed-rate bond position and a
floating-rate note position**:

- The **fixed leg** behaves like a coupon-paying bond with a maturity equal to
  the swap's remaining life.
- The **floating leg** behaves like a floating-rate note, which (because its
  coupon resets periodically to the current market rate) has a present value
  that stays close to its notional/par value at each reset date.

To map and compute the VaR of, say, a $100 million four-year swap paying fixed
in exchange for receiving floating (or vice versa):

**Step 1:** Build a table of present values of cash flows representing a
**short position in the fixed leg** (since paying fixed is economically like
being short a fixed-coupon bond -- you owe those fixed payments) out to the
swap's final maturity, together with a **long position in the floating leg**,
valued at its notional amount (≈ $100 million) because a floating-rate note
reprices to par at each reset.

**Step 2:** Multiply the vector of absolute present values by the appropriate
VaR percentages (at the chosen confidence level) for each maturity, and sum
these products to get the **undiversified VaR**.

**Step 3:** Apply the correlation matrix across the relevant maturities to the
same vector of present values, using matrix algebra, to obtain the
**diversified VaR** -- which will again be lower than the undiversified figure
due to imperfect correlation across maturities.

This is structurally identical to the fixed-income cash-flow mapping process
from [[Mapping Fixed-Income Portfolios]] -- the only new step is recognizing
that a swap's two legs map onto a short fixed-bond position and a long
floating-rate-note position before the usual present-value/VaR-percentage/
correlation-matrix machinery is applied.

## Mapping nonlinear derivatives: options

Everything above relies on **linearity** -- the mapped position's value moves
proportionally with the risk factor. Options break this assumption: an
option's value is a **nonlinear** function of the underlying asset's price.

In many cases, the delta-normal method can still be applied **approximately**,
because over a small enough range, an option's value change can be
approximated as:

(change in option value) ~ delta x (change in underlying price)

This treats the option, for VaR purposes, as if it were a position of size
"delta" in the underlying asset -- a linear approximation.

### Why this approximation is fragile

The accuracy of the delta approximation depends critically on **delta staying
roughly constant** over the period being analyzed. But delta is *not* a
constant -- it changes as the underlying price moves and as time passes (this
sensitivity of delta to the underlying price is what "gamma" measures, though
gamma itself is introduced in more depth elsewhere in the curriculum). Over
**long horizons**, delta can change substantially, so a linear approximation
based on today's delta becomes increasingly inaccurate -- the delta-normal
method should *not* be relied on for accurate VaR over long horizons where
deltas are unstable.

Over **very short horizons** (such as one day), delta changes much less, so
the linear approximation is much more reasonable -- even for options with
longer remaining maturities, a one-day delta-normal VaR can be a reasonable
approximation, *as long as* the horizon itself stays short.

### Worked example: one-day delta-normal VaR for an option

Suppose an option has a strike price of $100 and the underlying's volatility
is 25% (annualized). Restricting attention to a one-day horizon and applying
the 95% confidence factor to the (appropriately scaled) volatility, the
one-day worst-case loss works out to approximately **$2.59**, bringing the
position down to about $97.41 (i.e., $100 - $2.59). This illustrates the
delta-normal logic applied to an option over a short horizon: a single-day
"VaR percentage" derived from volatility and the confidence level is applied
directly to the position's value, just as it would be for a linear
instrument.

### Beyond delta-normal: delta-gamma

For situations where the delta-normal approximation isn't good enough --
typically because the horizon is longer or the option is far from being
linear in its underlying -- options are more accurately mapped using a
**Taylor series approximation** that includes both delta (first-order) and
gamma (second-order) terms, known as the **delta-gamma method**. This captures
the curvature in the option's payoff that the simple delta-normal approach
ignores. The delta-gamma method itself is developed in more detail elsewhere
in the curriculum; the key takeaway for this lesson is simply that
delta-normal mapping is a *first approximation* for options, valid mainly over
short horizons, and delta-gamma is the natural refinement when that
approximation breaks down.

## Relationship to the rest of the lesson

The forward, FRA, and swap examples here are direct extensions of the
cash-flow mapping, undiversified VaR, and diversified VaR concepts from
[[Mapping Fixed-Income Portfolios]] -- each derivative is simply decomposed
into the same kind of zero-coupon-like building blocks before the same
present-value / VaR-percentage / correlation-matrix steps are applied. The
options discussion connects back to
[[VaR Mapping Principles and Process|the general mapping framework]]: mapping
works best when the mapped position's behavior genuinely mirrors the original
instrument's behavior, and for options that mirroring is only good locally
(small moves, short horizons).

## See also

- [[VaR Mapping Principles and Process]]
- [[Mapping Fixed-Income Portfolios]]
- [[Formulas]]
