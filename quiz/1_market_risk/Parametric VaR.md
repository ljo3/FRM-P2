## Parametric VaR

> [!FAQ]+ Write the normal (delta-normal) VaR formula for a P/L distribution with mean μ and standard deviation σ.
> VaR(α%) = −μ_P/L + σ_P/L × z_α, where z_α is the standard normal critical value for significance level α (e.g., z_5% ≈ 1.65, z_1% ≈ 2.33).

> [!FAQ]+ If P/L ~ N(mean = $5 million, std dev = $12 million), what are VaR(5%) and VaR(1%)?
> VaR(5%) = −5 + 12 × 1.65 = $14.8 million. VaR(1%) = −5 + 12 × 2.33 = $23.0 million. VaR(1%) > VaR(5%) because the smaller significance level pushes further into the tail.

> [!FAQ]+ Write the lognormal VaR formula and explain when it's used.
> VaR(α%) = P_{t-1} × (1 − exp(μ_R − σ_R × z_α)), where μ_R and σ_R are the mean and std dev of geometric returns. It's used when geometric returns are assumed normal, which implies prices are lognormally distributed and stay positive — see [[Return Calculation Methods]].

> [!FAQ]+ If geometric returns ~ N(mean = 5%, std dev = 20%) and P_{t-1} = $500, what is the 5% lognormal VaR?
> VaR(5%) = 500 × (1 − exp(0.05 − 0.20 × 1.65)) = 500 × (1 − exp(−0.28)) ≈ $122.2.

> [!FAQ]+ What is the key practical difference between historical simulation and parametric VaR?
> Historical simulation makes no distributional assumption (it resamples actual data), while parametric VaR assumes a specific distribution (normal or lognormal) and uses a closed-form quantile formula — faster, but only as good as the distributional assumption. See [[Historical Simulation VaR]].
