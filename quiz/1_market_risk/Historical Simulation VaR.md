## Historical Simulation VaR

> [!FAQ]+ Describe the core mechanic of historical simulation VaR in one sentence.
> Sort historical P/L (or return) observations from worst loss to best gain, and read off the observation that sits at the boundary between the tail and the body of the distribution.

> [!FAQ]+ For a sample of n observations and significance level α, which ordered observation approximately marks the VaR cutoff?
> Approximately the (α × n) + 1 th worst observation (some conventions instead use the α × n th observation as a simpler approximation).

> [!FAQ]+ With 1,000 monthly return observations at a 95% confidence level, how many observations fall in the tail, and which ordered observation is the approximate VaR cutoff?
> 5% of 1,000 = 50 observations fall in the tail; the 51st-worst observation (≈ (α × n) + 1) is the approximate VaR cutoff (some conventions use the 50th).

> [!FAQ]+ What is the main practical assumption behind historical simulation, and why is it a weakness?
> It assumes the future return-generating process will resemble the historical sample. It's a weakness because the method is purely backward-looking and can't adapt to structural breaks or sudden shifts in market conditions.

> [!FAQ]+ How can a QQ plot complement historical simulation?
> It can visually check whether the empirical (historical) distribution resembles a theoretical one (e.g., normal), helping you judge whether a faster parametric VaR approach would give a similar answer. See [[Quantile-Quantile (QQ) Plots]].
