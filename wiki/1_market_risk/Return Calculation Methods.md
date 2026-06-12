---
domain: Market Risk
reading: "[[Reading 1 - Estimating Market Risk Measures]]"
los: [1.a, 1.b]
tags: [frm-part-2, market-risk, returns]
---

# Return Calculation Methods

Before computing VaR, you need to be clear about *what* you're taking the distribution
of: raw profit/loss, simple (arithmetic) returns, or continuously-compounded
(geometric/log) returns. Each carries different assumptions.

## Profit/Loss (P/L)

The change in portfolio value over one period, including any interim cash flows `D_t`:

```
P/L_t = P_t + D_t − P_{t-1}
```

## Arithmetic return

```
r_t = (P_t + D_t − P_{t-1}) / P_{t-1} = (P_t + D_t) / P_{t-1} − 1
```

Implicitly assumes interim payments are **not reinvested**. Fine for short horizons, but
not appropriate for compounding over long horizons.

## Geometric (log) return

```
R_t = ln[(P_t + D_t) / P_{t-1}]
```

Assumes interim payments are continuously reinvested. The key practical payoff: because
this is defined via a natural log, the implied price `P_t` can never become negative — no
matter how negative `R_t` gets, `exp(R_t)` stays positive. This is exactly why the
lognormal distribution (built on geometric returns) is a natural choice for modeling
asset prices.

## Why this matters for VaR

- [[Parametric VaR]] under a **normal** assumption is typically applied to P/L or
  arithmetic returns.
- [[Parametric VaR]] under a **lognormal** assumption is built directly from geometric
  returns, and inherits the "prices can't go negative" property.
- For short horizons, arithmetic and geometric returns are numerically close, so normal
  VaR (on arithmetic returns) and lognormal VaR (on geometric returns) tend to converge —
  see [[Parametric VaR]].

## Related

- [[Value at Risk (VaR)]]
- [[Parametric VaR]]
