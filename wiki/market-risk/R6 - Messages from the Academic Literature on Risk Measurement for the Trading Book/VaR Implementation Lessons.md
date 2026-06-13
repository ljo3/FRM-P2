---
title: VaR Implementation Lessons
topic: market-risk
lesson: 6
tags: [var, time-horizon, time-varying-volatility, backtesting, procyclicality]
updated: 2026-06-13
---

# LO 6.a — Time horizon, time-varying volatility, and backtesting in VaR implementation

**In plain terms:** this page pulls together three practical lessons that academic
research has drawn about how VaR is actually built and checked: how long a holding
period to use, whether to let volatility move around over time inside the model, and
how reliable backtesting really is once you start changing those design choices.

## Choosing a time horizon

There is no single "correct" holding period for a VaR calculation, and academics have
not converged on one. The right choice depends on:

- **Why the number is being calculated.** A VaR used to set a desk's daily trading
  limit serves a different purpose than one used to size a bank's overall economic
  capital cushion, and the two can reasonably use different horizons.
- **How liquid the portfolio is.** A book of liquid, exchange-traded instruments can
  realistically be unwound or hedged quickly, supporting a short horizon. A book with
  illiquid or concentrated positions cannot be exited quickly, so a short horizon
  understates the real risk.

Because no single rule fits every use case, there is also no agreed-upon method for
combining or comparing VaR figures that were computed over different horizons — a
1-day VaR and a 10-day VaR are not simply related by a clean scaling rule once you
move away from idealized assumptions.

In practice, the industry leans toward **short horizons** (often 1 day) mainly because
they are computationally cheap — recalculating risk for a large, complex portfolio
every day at a 1-day horizon is far more tractable than doing so at, say, a 1-month
horizon. The Basel Committee's commonly cited **10-day** horizon is a regulatory
convention, not a horizon that is optimal for every portfolio or purpose. A more
defensible approach lets the horizon track the characteristics of the actual
investment — its liquidity, its turnover, and how the position is expected to be
managed.

A further complication at longer horizons: a portfolio's composition does not stay
fixed. Positions are added, closed, and rebalanced. A VaR model that assumes a static
portfolio over a long horizon ignores this turnover. For purposes like sizing economic
capital, a horizon meaningfully longer than 10 days may be justified, but only if the
model also accounts for how the portfolio's makeup is likely to evolve over that
window.

## Time-varying volatility (and correlation)

Asset return volatility is not constant — it clusters, rises during turbulent periods,
and falls during calm ones. A VaR model that assumes a single, fixed volatility
(estimated, say, from a long historical average) will misstate risk whenever current
conditions differ from that average.

Key points:

- **Ignoring time variation in volatility tends to understate risk.** If a model uses
  a long-run average volatility while current volatility is elevated, the VaR figure
  will be too low precisely when it matters most.
- **The impact of time-varying volatility on VaR accuracy shrinks as the horizon
  grows.** Over a very long horizon, short-term swings in volatility average out more,
  so a static volatility assumption does relatively less damage. Over short horizons,
  getting the current volatility level right matters much more.
- **Stochastic jumps are a separate problem.** Even at long horizons, sudden
  discontinuous moves (jumps) in volatility — driven by random shocks rather than
  gradual drift — degrade the accuracy of long-horizon VaR unless the model
  explicitly adjusts for them. A model that only smooths out gradual volatility
  changes but ignores jump risk will still misstate tail risk.
- **Correlations also move over time**, not just volatilities. A risk manager who
  updates volatility forecasts but holds correlations fixed at historical averages is
  only solving part of the problem — co-movements between risk factors can shift
  sharply in stressed markets, changing portfolio-level risk even if each individual
  position's volatility is modeled correctly.

The practical takeaway is that a VaR framework which incorporates time-varying
volatility (and correlation) produces a more realistic, responsive risk estimate —
but this responsiveness comes with side effects, discussed next.

## Backtesting limitations

Backtesting — comparing realized portfolio outcomes against the VaR figures predicted
in advance — has historically been the primary tool for checking whether a VaR model
is well calibrated. However, backtesting has real limits:

- **Few exceptions, little information.** At a 99% confidence level, a well-specified
  model should produce roughly one exception (a loss exceeding VaR) every 100
  observations. With a realistic sample size, the number of exceptions actually
  observed is small, so the statistical power to distinguish a good model from a
  subtly miscalibrated one is limited.
- **Longer horizons make backtesting harder.** As the VaR horizon lengthens, the
  number of independent, non-overlapping observations available for backtesting over
  any realistic sample period shrinks. Worse, a portfolio's composition is unlikely
  to stay constant over a long horizon, so a loss that exceeds the original VaR might
  reflect a *change in the portfolio* rather than a failure of the risk model applied
  to the *original* portfolio. This portfolio instability undermines the
  interpretability of long-horizon backtests.

## The procyclicality trade-off

There is a tension between making VaR more *responsive* (by incorporating
time-varying volatility) and keeping it *stable*:

- A VaR model that reacts quickly to changing volatility will rise sharply during a
  market downturn (when realized volatility spikes) and fall sharply during calm
  periods.
- If capital requirements or risk limits are tied directly to this VaR figure, the
  model's responsiveness translates into **procyclical** behavior: capital
  requirements tighten exactly when markets are stressed (forcing deleveraging at the
  worst possible time) and loosen during calm periods (permitting more
  risk-taking when conditions look benign).
- At the same time, frequently re-estimating volatility and correlation parameters
  introduces estimation noise, which can make the risk model itself **less stable**
  from one period to the next, even though it is, in principle, more "realistic."

This procyclicality theme reappears in [[Leverage, Balance Sheet Management, and Procyclicality]],
which looks at how VaR-based constraints interact with bank balance sheets over the
economic cycle.

## See also

- [[Summary]]
- [[Liquidity Risk and LVaR]]
- [[VaR vs Expected Shortfall and Spectral Risk Measures]]
- [[Leverage, Balance Sheet Management, and Procyclicality]]
