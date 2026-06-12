## Return Calculation Methods

> [!FAQ]+ What is the formula for profit/loss (P/L) over one period?
> P/L_t = P_t + D_t − P_{t-1}, where D_t is any interim payment received during the period.

> [!FAQ]+ What reinvestment assumption underlies the arithmetic return formula, and what limitation does this create?
> Arithmetic returns assume interim payments are NOT reinvested. This makes the arithmetic return approach less appropriate for long investment horizons, where compounding matters.

> [!FAQ]+ What reinvestment assumption underlies the geometric (log) return, and what useful property does this give asset prices?
> Geometric returns assume interim payments ARE continuously reinvested. Because the geometric return is defined via a natural log, the implied asset price can never become negative — a property that motivates using the lognormal distribution for prices.

> [!FAQ]+ Write the formula for geometric (log) return.
> R_t = ln[(P_t + D_t) / P_{t-1}]

> [!FAQ]+ When do normal VaR (on arithmetic returns) and lognormal VaR (on geometric returns) tend to produce similar answers?
> Over short time horizons and for typical (small) volatilities, arithmetic and geometric returns are numerically close, so the two VaR approaches converge. The gap widens for longer horizons or higher volatility.
