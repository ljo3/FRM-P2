## Coherent Risk Measures

> [!FAQ]+ How does a coherent risk measure generalize Expected Shortfall?
> ES is a weighted average of quantiles within the tail using equal weights. A coherent risk measure is a weighted average of quantiles across the ENTIRE distribution, with user-specific weights reflecting individual risk aversion.

> [!FAQ]+ How are VaR and ES special cases of a coherent risk measure?
> VaR puts 100% of the weight on a single quantile. ES puts weight 1/(1 − confidence level) on every tail quantile and zero elsewhere. A general coherent risk measure can spread weight across all quantiles, tail and non-tail.

> [!FAQ]+ In the n = 10 illustration, how many quantiles/slices are used and at what confidence levels?
> n − 1 = 9 equal-probability slices, at confidence levels 10%, 20%, ..., 90%.

> [!FAQ]+ Compared to ES, how does a general coherent risk measure behave as the number of slices n changes?
> It is more sensitive to the choice of n than ES is, but it converges to the true risk-measure value as n grows large, since larger n pushes the quantiles further into the tails.

> [!FAQ]+ Why might an institution prefer a general coherent risk measure over plain ES?
> Because it allows the institution to encode its own risk-aversion profile across the whole distribution (not just the tail), rather than being restricted to ES's fixed equal-weighting-in-the-tail scheme.
