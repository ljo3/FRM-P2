## Standard Errors of Risk Measures

> [!FAQ]+ Why is it important to compute the standard error of a VaR (or ES) estimate?
> Because VaR/ES are estimated from a finite sample and therefore have sampling uncertainty. A point estimate without a precision measure could be misleadingly precise-looking.

> [!FAQ]+ Write the formula for the standard error of a quantile q.
> se(q) = sqrt(p(1 − p) / n) / f(q), where p is the tail probability associated with the bin around q, n is the sample size, and f(q) is the estimated probability density (mass) at q.

> [!FAQ]+ How is a confidence interval for VaR constructed from se(q), and is it one-tailed or two-tailed?
> [q − se(q) × z_α] < VaR < [q + se(q) × z_α]. This confidence interval is two-tailed, even though VaR itself is a one-tailed concept.

> [!FAQ]+ How does increasing the sample size n affect se(q), and why?
> It decreases se(q) — more observations reduce the sampling variance of the quantile estimate, narrowing the confidence interval.

> [!FAQ]+ How does increasing the bin width around q affect se(q)?
> It decreases se(q): a wider bin captures more probability mass, raising the estimated density f(q) and lowering the associated tail probability p — both of which shrink the standard error.
