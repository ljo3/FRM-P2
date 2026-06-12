var QUIZ_DATA = {
  "1_market_risk": {
    "label": "1. Market Risk",
    "cards": [
      {
        "topic": "Coherent Risk Measures",
        "question": "How does a coherent risk measure generalize Expected Shortfall?",
        "answer": "ES is a weighted average of quantiles within the tail using equal weights. A coherent risk measure is a weighted average of quantiles across the ENTIRE distribution, with user-specific weights reflecting individual risk aversion."
      },
      {
        "topic": "Coherent Risk Measures",
        "question": "How are VaR and ES special cases of a coherent risk measure?",
        "answer": "VaR puts 100% of the weight on a single quantile. ES puts weight 1/(1 − confidence level) on every tail quantile and zero elsewhere. A general coherent risk measure can spread weight across all quantiles, tail and non-tail."
      },
      {
        "topic": "Coherent Risk Measures",
        "question": "In the n = 10 illustration, how many quantiles/slices are used and at what confidence levels?",
        "answer": "n − 1 = 9 equal-probability slices, at confidence levels 10%, 20%, ..., 90%."
      },
      {
        "topic": "Coherent Risk Measures",
        "question": "Compared to ES, how does a general coherent risk measure behave as the number of slices n changes?",
        "answer": "It is more sensitive to the choice of n than ES is, but it converges to the true risk-measure value as n grows large, since larger n pushes the quantiles further into the tails."
      },
      {
        "topic": "Coherent Risk Measures",
        "question": "Why might an institution prefer a general coherent risk measure over plain ES?",
        "answer": "Because it allows the institution to encode its own risk-aversion profile across the whole distribution (not just the tail), rather than being restricted to ES's fixed equal-weighting-in-the-tail scheme."
      },
      {
        "topic": "Expected Shortfall",
        "question": "How does Expected Shortfall (ES) improve on VaR?",
        "answer": "ES reports the average loss across the tail (beyond the VaR threshold), rather than just the threshold itself — capturing the severity of tail losses, not just their frequency/boundary."
      },
      {
        "topic": "Expected Shortfall",
        "question": "How is ES constructed for a chosen number of slices n?",
        "answer": "Divide the tail region into n equal probability masses, compute the VaR at each of the resulting (n − 1) confidence levels, and average those (n − 1) VaRs. That average is ES."
      },
      {
        "topic": "Expected Shortfall",
        "question": "For n = 5, how many VaRs are averaged to compute ES, and at what confidence levels (under a normal distribution example)?",
        "answer": "n − 1 = 4 VaRs, computed at the 96%, 97%, 98%, and 99% confidence levels, then averaged."
      },
      {
        "topic": "Expected Shortfall",
        "question": "What happens to ES as the number of slices n increases?",
        "answer": "ES converges toward the true expected tail loss (the theoretical conditional expectation of loss beyond the VaR threshold)."
      },
      {
        "topic": "Expected Shortfall",
        "question": "How does ES relate to coherent risk measures?",
        "answer": "ES is a special case of a [[Coherent Risk Measures|coherent risk measure]] where the weighting function equals 1 / (1 − confidence level) for all tail quantiles and zero for all non-tail quantiles."
      },
      {
        "topic": "Historical Simulation VaR",
        "question": "Describe the core mechanic of historical simulation VaR in one sentence.",
        "answer": "Sort historical P/L (or return) observations from worst loss to best gain, and read off the observation that sits at the boundary between the tail and the body of the distribution."
      },
      {
        "topic": "Historical Simulation VaR",
        "question": "For a sample of n observations and significance level α, which ordered observation approximately marks the VaR cutoff?",
        "answer": "Approximately the (α × n) + 1 th worst observation (some conventions instead use the α × n th observation as a simpler approximation)."
      },
      {
        "topic": "Historical Simulation VaR",
        "question": "With 1,000 monthly return observations at a 95% confidence level, how many observations fall in the tail, and which ordered observation is the approximate VaR cutoff?",
        "answer": "5% of 1,000 = 50 observations fall in the tail; the 51st-worst observation (≈ (α × n) + 1) is the approximate VaR cutoff (some conventions use the 50th)."
      },
      {
        "topic": "Historical Simulation VaR",
        "question": "What is the main practical assumption behind historical simulation, and why is it a weakness?",
        "answer": "It assumes the future return-generating process will resemble the historical sample. It's a weakness because the method is purely backward-looking and can't adapt to structural breaks or sudden shifts in market conditions."
      },
      {
        "topic": "Historical Simulation VaR",
        "question": "How can a QQ plot complement historical simulation?",
        "answer": "It can visually check whether the empirical (historical) distribution resembles a theoretical one (e.g., normal), helping you judge whether a faster parametric VaR approach would give a similar answer. See [[Quantile-Quantile (QQ) Plots]]."
      },
      {
        "topic": "Parametric VaR",
        "question": "Write the normal (delta-normal) VaR formula for a P/L distribution with mean μ and standard deviation σ.",
        "answer": "VaR(α%) = −μ_P/L + σ_P/L × z_α, where z_α is the standard normal critical value for significance level α (e.g., z_5% ≈ 1.65, z_1% ≈ 2.33)."
      },
      {
        "topic": "Parametric VaR",
        "question": "If P/L ~ N(mean = $5 million, std dev = $12 million), what are VaR(5%) and VaR(1%)?",
        "answer": "VaR(5%) = −5 + 12 × 1.65 = $14.8 million. VaR(1%) = −5 + 12 × 2.33 = $23.0 million. VaR(1%) > VaR(5%) because the smaller significance level pushes further into the tail."
      },
      {
        "topic": "Parametric VaR",
        "question": "Write the lognormal VaR formula and explain when it's used.",
        "answer": "VaR(α%) = P_{t-1} × (1 − exp(μ_R − σ_R × z_α)), where μ_R and σ_R are the mean and std dev of geometric returns. It's used when geometric returns are assumed normal, which implies prices are lognormally distributed and stay positive — see [[Return Calculation Methods]]."
      },
      {
        "topic": "Parametric VaR",
        "question": "If geometric returns ~ N(mean = 5%, std dev = 20%) and P_{t-1} = $500, what is the 5% lognormal VaR?",
        "answer": "VaR(5%) = 500 × (1 − exp(0.05 − 0.20 × 1.65)) = 500 × (1 − exp(−0.28)) ≈ $122.2."
      },
      {
        "topic": "Parametric VaR",
        "question": "What is the key practical difference between historical simulation and parametric VaR?",
        "answer": "Historical simulation makes no distributional assumption (it resamples actual data), while parametric VaR assumes a specific distribution (normal or lognormal) and uses a closed-form quantile formula — faster, but only as good as the distributional assumption. See [[Historical Simulation VaR]]."
      },
      {
        "topic": "Quantile Quantile (QQ) Plots",
        "question": "What does a QQ plot show?",
        "answer": "It plots the quantiles of an empirical distribution against the quantiles of a theoretical/reference distribution (commonly the standard normal) at matching confidence levels."
      },
      {
        "topic": "Quantile Quantile (QQ) Plots",
        "question": "What does it mean if a QQ plot is a straight 45° line?",
        "answer": "The empirical distribution closely matches the theoretical reference distribution across all confidence levels."
      },
      {
        "topic": "Quantile Quantile (QQ) Plots",
        "question": "If the centers of a QQ plot line up but the tails diverge, what can you conclude?",
        "answer": "The empirical distribution is symmetric like the reference distribution, but its tails are either fatter or thinner than the reference (e.g., a t-distribution vs. a normal distribution)."
      },
      {
        "topic": "Quantile Quantile (QQ) Plots",
        "question": "Why might a normal-based parametric VaR understate risk for real financial return data?",
        "answer": "If a QQ plot of the return data against the normal distribution bows away from the 45° line in the left tail (indicating fatter-than-normal tails), a normal-based VaR will understate the true probability/severity of extreme losses."
      },
      {
        "topic": "Quantile Quantile (QQ) Plots",
        "question": "What is the primary use case for a QQ plot in risk management?",
        "answer": "As a visual diagnostic to check whether an assumed distribution (e.g., normal, for use in [[Parametric VaR]]) is a reasonable fit for the data, especially in the tails — informing whether [[Historical Simulation VaR]] or a different distributional assumption might be more appropriate."
      },
      {
        "topic": "Return Calculation Methods",
        "question": "What is the formula for profit/loss (P/L) over one period?",
        "answer": "P/L_t = P_t + D_t − P_{t-1}, where D_t is any interim payment received during the period."
      },
      {
        "topic": "Return Calculation Methods",
        "question": "What reinvestment assumption underlies the arithmetic return formula, and what limitation does this create?",
        "answer": "Arithmetic returns assume interim payments are NOT reinvested. This makes the arithmetic return approach less appropriate for long investment horizons, where compounding matters."
      },
      {
        "topic": "Return Calculation Methods",
        "question": "What reinvestment assumption underlies the geometric (log) return, and what useful property does this give asset prices?",
        "answer": "Geometric returns assume interim payments ARE continuously reinvested. Because the geometric return is defined via a natural log, the implied asset price can never become negative — a property that motivates using the lognormal distribution for prices."
      },
      {
        "topic": "Return Calculation Methods",
        "question": "Write the formula for geometric (log) return.",
        "answer": "R_t = ln[(P_t + D_t) / P_{t-1}]"
      },
      {
        "topic": "Return Calculation Methods",
        "question": "When do normal VaR (on arithmetic returns) and lognormal VaR (on geometric returns) tend to produce similar answers?",
        "answer": "Over short time horizons and for typical (small) volatilities, arithmetic and geometric returns are numerically close, so the two VaR approaches converge. The gap widens for longer horizons or higher volatility."
      },
      {
        "topic": "Standard Errors Of Risk Measures",
        "question": "Why is it important to compute the standard error of a VaR (or ES) estimate?",
        "answer": "Because VaR/ES are estimated from a finite sample and therefore have sampling uncertainty. A point estimate without a precision measure could be misleadingly precise-looking."
      },
      {
        "topic": "Standard Errors Of Risk Measures",
        "question": "Write the formula for the standard error of a quantile q.",
        "answer": "se(q) = sqrt(p(1 − p) / n) / f(q), where p is the tail probability associated with the bin around q, n is the sample size, and f(q) is the estimated probability density (mass) at q."
      },
      {
        "topic": "Standard Errors Of Risk Measures",
        "question": "How is a confidence interval for VaR constructed from se(q), and is it one-tailed or two-tailed?",
        "answer": "[q − se(q) × z_α] < VaR < [q + se(q) × z_α]. This confidence interval is two-tailed, even though VaR itself is a one-tailed concept."
      },
      {
        "topic": "Standard Errors Of Risk Measures",
        "question": "How does increasing the sample size n affect se(q), and why?",
        "answer": "It decreases se(q) — more observations reduce the sampling variance of the quantile estimate, narrowing the confidence interval."
      },
      {
        "topic": "Standard Errors Of Risk Measures",
        "question": "How does increasing the bin width around q affect se(q)?",
        "answer": "It decreases se(q): a wider bin captures more probability mass, raising the estimated density f(q) and lowering the associated tail probability p — both of which shrink the standard error."
      },
      {
        "topic": "Value At Risk (VaR)",
        "question": "In plain terms, what question does VaR answer?",
        "answer": "\"Over a given holding period, at a given confidence level, what is the most I'm likely to lose?\" It is the loss threshold that should not be exceeded with the stated probability."
      },
      {
        "topic": "Value At Risk (VaR)",
        "question": "Why are VaR losses conventionally reported as positive numbers?",
        "answer": "Because VaR represents an amount \"at risk.\" A 95% VaR of $155,000 means there's a 95% chance the loss will not exceed $155,000 — even though the underlying P/L outcome driving this is negative."
      },
      {
        "topic": "Value At Risk (VaR)",
        "question": "What two broad approaches can be used to find the quantile that defines VaR?",
        "answer": "(1) [[Historical Simulation VaR]] — reorder actual historical observations and read off the cutoff; (2) [[Parametric VaR]] — assume a distribution (e.g., normal or lognormal) and use its quantile function."
      },
      {
        "topic": "Value At Risk (VaR)",
        "question": "What is VaR's main weakness, and which risk measures address it?",
        "answer": "VaR says nothing about the severity of losses beyond the threshold — two distributions can share the same VaR but have very different tail risk. [[Expected Shortfall]] and [[Coherent Risk Measures]] address this by looking at (or beyond) the tail rather than just its boundary."
      },
      {
        "topic": "Value At Risk (VaR)",
        "question": "Why does an estimated VaR need a standard error?",
        "answer": "Because VaR is a sample quantile estimated from finite data — it has sampling uncertainty. See [[Standard Errors of Risk Measures]] for how that uncertainty is quantified."
      }
    ]
  },
  "2_credit_risk": {
    "label": "2. Credit Risk",
    "cards": []
  },
  "3_operational_risk": {
    "label": "3. Operational Risk",
    "cards": []
  },
  "4_liquidity_risk": {
    "label": "4. Liquidity Risk",
    "cards": []
  },
  "5_investment_management": {
    "label": "5. Investment Management",
    "cards": []
  },
  "6_current_issues": {
    "label": "6. Current Issues",
    "cards": []
  }
};
