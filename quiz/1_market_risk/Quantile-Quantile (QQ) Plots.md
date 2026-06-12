## Quantile-Quantile (QQ) Plots

> [!FAQ]+ What does a QQ plot show?
> It plots the quantiles of an empirical distribution against the quantiles of a theoretical/reference distribution (commonly the standard normal) at matching confidence levels.

> [!FAQ]+ What does it mean if a QQ plot is a straight 45° line?
> The empirical distribution closely matches the theoretical reference distribution across all confidence levels.

> [!FAQ]+ If the centers of a QQ plot line up but the tails diverge, what can you conclude?
> The empirical distribution is symmetric like the reference distribution, but its tails are either fatter or thinner than the reference (e.g., a t-distribution vs. a normal distribution).

> [!FAQ]+ Why might a normal-based parametric VaR understate risk for real financial return data?
> If a QQ plot of the return data against the normal distribution bows away from the 45° line in the left tail (indicating fatter-than-normal tails), a normal-based VaR will understate the true probability/severity of extreme losses.

> [!FAQ]+ What is the primary use case for a QQ plot in risk management?
> As a visual diagnostic to check whether an assumed distribution (e.g., normal, for use in [[Parametric VaR]]) is a reasonable fit for the data, especially in the tails — informing whether [[Historical Simulation VaR]] or a different distributional assumption might be more appropriate.
