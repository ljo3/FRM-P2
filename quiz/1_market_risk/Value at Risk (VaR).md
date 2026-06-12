## Value at Risk (VaR)

> [!FAQ]+ In plain terms, what question does VaR answer?
> "Over a given holding period, at a given confidence level, what is the most I'm likely to lose?" It is the loss threshold that should not be exceeded with the stated probability.

> [!FAQ]+ Why are VaR losses conventionally reported as positive numbers?
> Because VaR represents an amount "at risk." A 95% VaR of $155,000 means there's a 95% chance the loss will not exceed $155,000 — even though the underlying P/L outcome driving this is negative.

> [!FAQ]+ What two broad approaches can be used to find the quantile that defines VaR?
> (1) [[Historical Simulation VaR]] — reorder actual historical observations and read off the cutoff; (2) [[Parametric VaR]] — assume a distribution (e.g., normal or lognormal) and use its quantile function.

> [!FAQ]+ What is VaR's main weakness, and which risk measures address it?
> VaR says nothing about the severity of losses beyond the threshold — two distributions can share the same VaR but have very different tail risk. [[Expected Shortfall]] and [[Coherent Risk Measures]] address this by looking at (or beyond) the tail rather than just its boundary.

> [!FAQ]+ Why does an estimated VaR need a standard error?
> Because VaR is a sample quantile estimated from finite data — it has sampling uncertainty. See [[Standard Errors of Risk Measures]] for how that uncertainty is quantified.
