---
title: Backtesting Fundamentals
topic: market-risk
lesson: 4
tags: [market-risk, backtesting, VaR, exceptions, model-validation]
updated: 2026-06-13
---

# LO 4.a / LO 4.b — Backtesting, exceptions, and why backtesting is hard

**In plain terms:** a VaR model makes a daily prediction — "tomorrow's loss
shouldn't exceed $X with c% confidence." Backtesting is just keeping score:
how often was that prediction wrong, and is that wrong-rate believable given
the confidence level the model claims?

## What backtesting is

Backtesting compares a VaR model's predicted losses against the portfolio's
*actual* profit and loss over some historical testing period. Each day the
actual loss is checked against that day's VaR estimate:

- If the actual loss is **larger** than the VaR prediction, that day is
  counted as an **exception** (sometimes called an exceedance or a breach).
- If the actual loss stays within the VaR prediction, the model "passed" that
  day.

## Why exceptions matter

A VaR figure is, by construction, a threshold that should be breached only a
known fraction of the time. A 95% confidence, one-day VaR says: "on a typical
day, there's only a 5% chance that tomorrow's loss exceeds this number." Over
a long enough testing window, the *fraction* of days that turn out to be
exceptions should be close to that 5%.

- Too many exceptions → the model is **understating risk** (VaR is too low).
- Far fewer exceptions than expected → the model may be **overstating risk**
  (VaR is too conservative), which is wasteful from a capital-efficiency
  standpoint even though it isn't dangerous.

Backtesting is therefore the primary tool for answering the question "can we
trust this model?" — both for the bank's own risk managers and for
regulators. Under the Basel framework, a bank that racks up more than four
exceptions in a 250-day testing window faces capital penalties (covered in
detail in [[Basel Rules for Backtesting]]).

## Why backtesting is harder than it sounds (LO 4.b)

### 1. VaR models assume a static portfolio, but real portfolios change

A VaR estimate is calculated for the portfolio *as it stands today*, holding
positions fixed over the VaR horizon. In reality, a trading desk's portfolio
changes constantly — positions are added, closed, and resized throughout the
day. Comparing "yesterday's VaR" to "today's actual P&L" therefore compares a
static-portfolio prediction against a P&L that reflects a portfolio that
didn't stay static.

### 2. Actual P&L reflects much more than just market-risk factors

The VaR model is built to capture market risk — changes in prices, rates,
and volatilities. But the actual daily P&L a bank reports also includes items
the VaR model never tried to predict, such as:

- trading commissions and fees,
- net interest income earned on positions,
- bid-ask spread effects from market making, and
- gains or losses from intraday trades that are opened and closed before the
  end of the day.

These items can push actual P&L away from what the VaR model alone would
predict, even on a day when market-risk factors behaved exactly as expected.

### 3. The fix: shorter holding periods, and "cleaning" the P&L series

The standard practical response is to backtest using a **one-day holding
period**. Shrinking the window between the VaR estimate and the P&L
comparison limits how much the portfolio composition (and the other
P&L-distorting items above) can drift in the meantime.

A complementary fix is to distinguish between two versions of the P&L series:

- **Actual returns** — the P&L the bank actually reported, including all the
  non-market-risk items listed above.
- **Cleaned (hypothetical) returns** — the P&L recalculated to strip out
  changes unrelated to mark-to-market price movements (fees, commissions,
  intraday trading gains, etc.), so it reflects only what the static
  end-of-day portfolio would have earned or lost from market moves.

Best practice is to backtest **both** series. If a model passes on cleaned
returns but fails on actual returns, that points to a problem with how
non-market-risk P&L items are being handled, rather than with the VaR model's
core risk-factor assumptions — useful diagnostic information either way.

### 4. Choosing a holding period more generally

Beyond the backtesting-specific argument above, the choice of VaR holding
period in general reflects two considerations: (1) how long it would actually
take to liquidate or hedge the position, and (2) the length of time over
which the portfolio can reasonably be assumed not to change for reasons
unrelated to market-risk management. In practice, banks most commonly use a
one-day holding period for VaR, which is also the natural choice for daily
backtesting.

## See also

- [[Failure Rates and the Z-Score Test]]
- [[Basel Rules for Backtesting]]
