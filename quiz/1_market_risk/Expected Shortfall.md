## Expected Shortfall

> [!FAQ]+ How does Expected Shortfall (ES) improve on VaR?
> ES reports the average loss across the tail (beyond the VaR threshold), rather than just the threshold itself — capturing the severity of tail losses, not just their frequency/boundary.

> [!FAQ]+ How is ES constructed for a chosen number of slices n?
> Divide the tail region into n equal probability masses, compute the VaR at each of the resulting (n − 1) confidence levels, and average those (n − 1) VaRs. That average is ES.

> [!FAQ]+ For n = 5, how many VaRs are averaged to compute ES, and at what confidence levels (under a normal distribution example)?
> n − 1 = 4 VaRs, computed at the 96%, 97%, 98%, and 99% confidence levels, then averaged.

> [!FAQ]+ What happens to ES as the number of slices n increases?
> ES converges toward the true expected tail loss (the theoretical conditional expectation of loss beyond the VaR threshold).

> [!FAQ]+ How does ES relate to coherent risk measures?
> ES is a special case of a [[Coherent Risk Measures|coherent risk measure]] where the weighting function equals 1 / (1 − confidence level) for all tail quantiles and zero for all non-tail quantiles.
