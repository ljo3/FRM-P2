---
title: Mapping Fixed-Income Portfolios
topic: market-risk
lesson: 5
tags: [market-risk, var-mapping, fixed-income, duration, cash-flow-mapping, undiversified-var, diversified-var]
updated: 2026-06-13
---

# LO 5.c & 5.d -- Differentiate among the three methods of mapping fixed-income
# portfolios, and summarize how to map a fixed-income portfolio into positions
# of standard instruments

**In plain terms:** a bond portfolio's risk can be re-expressed as a position
(or set of positions) in zero-coupon bonds of standard maturities, because the
VaR of zero-coupon bonds at each maturity is something the risk system already
tracks. There are three ways to do this re-expression, ranging from very crude
to very precise, and they differ only in *how much detail about the timing and
size of cash flows* they preserve.

## The three fixed-income mapping methods

### 1. Principal mapping (simplest)

Principal mapping looks only at when **principal** is repaid and ignores
coupons entirely. The whole portfolio is treated as if its total market value
were a single cash flow occurring at the portfolio's **weighted-average
maturity** (the average of each bond's maturity, weighted by its share of
total market value). VaR is then read off as the VaR percentage for a
zero-coupon bond of that average maturity, applied to the total portfolio
value.

This is fast and easy but throws away a lot of information -- coupon timing
is completely ignored, so two portfolios with very different cash-flow
profiles but the same average maturity would get identical VaR estimates.

### 2. Duration mapping (intermediate)

Duration mapping replaces the whole portfolio with a single zero-coupon bond
whose maturity equals the portfolio's **(Macaulay) duration** rather than its
average maturity. Since duration accounts for the size and timing of *all*
cash flows (not just principal), this is a better approximation of the
portfolio's interest-rate sensitivity than principal mapping. The practical
complication is that the portfolio's duration will rarely line up exactly with
one of the standard zero-coupon maturities for which VaR percentages are
available, so the VaR percentage typically must be **interpolated** between
two adjacent maturities.

### 3. Cash flow mapping (most precise)

Cash flow mapping decomposes the portfolio into its **individual cash
flows** -- every coupon and principal payment, at its own maturity date.
Each cash flow is discounted to its present value, and each present value is
mapped onto the zero-coupon risk factor for its own maturity. Because this
preserves the complete cash-flow profile (rather than collapsing it to one
average point), cash flow mapping is the most accurate of the three -- but
also the most computationally demanding, since it additionally requires the
**correlations between zero-coupon returns at different maturities** to
compute a diversified VaR.

### Comparing the three

The single underlying idea across all three methods is that a bond (or bond
portfolio) is replaced by an equivalent position (or positions) in
zero-coupon bonds. What differs is **how much of the cash-flow timing and
amount detail is preserved**:

| Method            | What's preserved                          | Precision |
|-------------------|--------------------------------------------|-----------|
| Principal mapping | Only the average timing of principal repayment | Lowest |
| Duration mapping  | The portfolio's overall interest-rate sensitivity (duration) | Medium |
| Cash flow mapping | The full timing and size of every cash flow, plus inter-maturity correlations | Highest |

## Worked example

Consider a portfolio of two par-value bonds, each with $100 million face
value:

- **Bond 1**: 1-year maturity, 3.5% coupon
- **Bond 2**: 5-year maturity, 5% coupon

Total portfolio market value = $200 million (50% weight in each bond, since
both are par bonds with $100 million face value).

Suppose the VaR percentages (at the 95% confidence level) for zero-coupon
bonds of maturities 1 through 5 years are known from the risk system (these
percentages express VaR as a percentage of the zero-coupon bond's present
value).

### Principal mapping calculation

The weighted-average life of the portfolio is:

0.50 x 1 + 0.50 x 5 = 3 years

Principal mapping treats the entire $200 million as if it were a single
3-year zero-coupon position. Using the 3-year zero's VaR percentage of
1.4841%:

Principal mapping VaR = $200 million x 1.4841% = $2.968 million

Note how crude this is -- it completely ignores that Bond 2 pays coupons every
year for five years and Bond 1 pays a coupon after one year along with its
principal.

### Duration mapping calculation

First, the portfolio's Macaulay duration is computed from all of the cash
flows: each cash flow's present value is multiplied by the time at which it
occurs (its "time-weighted present value"), these are summed, and the total is
divided by the sum of the present values (= the portfolio's total market
value, $200 million). In this example the sum of time-weighted present values
works out to $553.69 million, giving:

Duration = $553.69 million / $200 million = 2.768 years

Since 2.768 years falls between the 2-year and 3-year zero-coupon maturities
(with VaR percentages of 0.9868% and 1.4841% respectively), the VaR percentage
for a 2.768-year zero is found by linear interpolation:

VaR%(2.768) = 0.9868 + (1.4841 - 0.9868) x (2.768 - 2)
            = 0.9868 + (0.4973 x 0.768)
            = 1.3687%

Applying this interpolated rate to the total portfolio value:

Duration mapping VaR = $200 million x 1.3687% = $2.737 million

This is noticeably lower than the principal mapping figure, because duration
(2.768 years) is shorter than the average life (3 years) -- coupons received
along the way effectively shorten the portfolio's interest-rate exposure
relative to looking only at final maturities.

### Cash flow mapping calculation

Cash flow mapping breaks the portfolio into its five distinct cash flows (one
per year, years 1 through 5: Bond 1's coupon-plus-principal in year 1, and Bond
2's four coupons in years 1-4 plus its coupon-plus-principal in year 5 --
combined, every year from 1 to 5 has a cash flow). Each cash flow is
discounted to a present value, and each present value is multiplied by the
zero-coupon VaR percentage for that maturity, giving a column of "VaR
contributions" -- one per maturity.

#### Undiversified VaR

If every zero-coupon maturity were **perfectly correlated** with every other
(correlation = 1 across the board), the portfolio VaR would simply be the
**sum** of the individual VaR contributions -- this sum is called the
**undiversified VaR**. In this example, summing the five VaR contributions
gives an undiversified VaR of **$2.674 million**.

Undiversified VaR represents the *worst case* from a diversification
standpoint: it assumes the worst losses at every maturity happen
simultaneously, with no offsetting effects from imperfect correlation.

#### Diversified VaR

In reality, zero-coupon returns at different maturities are not perfectly
correlated -- they move together to some degree, but not in lockstep. The
**diversified VaR** accounts for this using the actual correlation matrix
between the maturities. It is computed via matrix algebra: the vector of
present-value cash flows is combined with the vector of zero-coupon VaRs and
the correlation matrix (see [[Formulas]] for the exact expression). In this
example, working through the matrix algebra produces a sum of 6.840 under the
square root; taking the square root gives a diversified VaR of **$2.615
million**.

Notice that diversified VaR ($2.615 million) is *lower* than undiversified VaR
($2.674 million) -- this is the general pattern. Imperfect correlation between
risk factors means that losses at different maturities are less likely to all
occur at their worst simultaneously, so accounting for correlation reduces the
estimated portfolio VaR. The gap between the two numbers is a direct measure
of the diversification benefit captured once correlations are incorporated.

A professor's note in the source material points out that the matrix-algebra
calculation behind diversified VaR via cash flow mapping is too involved to
perform by hand on an exam calculator, so it is unlikely to be tested as a
full numerical problem -- but understanding *what* undiversified and
diversified VaR represent, and that diversified VaR is generally smaller, is
essential.

## Relationship to the rest of the lesson

The cash-flow map built here is reused directly in
[[Stress Testing via Mapping|stress testing]] (where each zero-coupon position
is shocked by its own VaR) and in
[[Benchmarking and Tracking Error VaR|benchmarking]] (where a portfolio's cash
flows are compared against a benchmark's). The undiversified/diversified
distinction introduced here also reappears when
[[Mapping Forwards, Swaps, and Options|mapping forwards and swaps]].

## See also

- [[VaR Mapping Principles and Process]]
- [[Stress Testing via Mapping]]
- [[Formulas]]
