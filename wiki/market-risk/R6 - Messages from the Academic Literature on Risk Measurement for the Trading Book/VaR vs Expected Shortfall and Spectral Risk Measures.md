---
title: VaR vs Expected Shortfall and Spectral Risk Measures
topic: market-risk
lesson: 6
tags: [var, expected-shortfall, spectral-risk-measures, subadditivity, stress-testing]
updated: 2026-06-13
---

# LO 6.c — Comparing VaR, expected shortfall, and other risk measures

**In plain terms:** this page steps back and asks "what makes a good risk measure?"
It compares VaR against expected shortfall and against the broader family of spectral
risk measures, and then looks at how stress testing fits alongside these
quantitative measures.

## Value at Risk: strengths and weaknesses

VaR answers the question: "given a chosen confidence level, what is the worst loss I
should expect, other than in the worst (1 − confidence)% of outcomes?" Its appeal is
practical:

- It is **simple to compute** relative to more sophisticated alternatives.
- It produces a **single, easily communicated number** that can be compared across
  desks, portfolios, and time.

But VaR has two well-known structural weaknesses:

1. **It says nothing about what happens beyond the threshold.** Two portfolios can
   have identical VaR at a given confidence level, yet one could have a tail loss
   distribution that is only marginally worse than the VaR figure, while the other
   could have a tail that includes catastrophic losses far beyond it. VaR cannot
   distinguish between these — it only tells you the boundary, not what lies past it.
2. **It is not subadditive.** For a "good" (coherent) risk measure, the risk of a
   combined portfolio should never exceed the sum of the risks of its parts —
   diversification should never make things look *worse* on paper. VaR can violate
   this: it is possible to construct two positions where VaR(A) + VaR(B) <
   VaR(A + B), even though combining the positions could not actually make the true
   economic risk worse than holding them separately. This makes VaR an unreliable
   basis for risk-based capital allocation across business units, since the sum of
   stand-alone VaRs may not bound the VaR of the combined book.

## Expected Shortfall

Expected shortfall (ES) addresses both weaknesses, at the cost of additional
complexity:

- **It looks past the threshold.** Rather than stopping at the boundary of the worst
  (1 − confidence)% of outcomes, ES averages the losses *within* that tail region —
  so it directly reflects how severe the worst outcomes are, not just how likely they
  are to be breached.
- **It is always subadditive.** Combining portfolios can never increase ES beyond the
  sum of the individual ES figures, which makes it consistent with the intuitive idea
  that diversification should not be penalized.
- **It reduces sensitivity to the choice of confidence level.** Because VaR is a
  single point on the loss distribution, a risk manager's choice of confidence level
  (95% vs. 99%, say) can materially change which positions look "risky." ES, by
  averaging over a tail region, is less sensitive to exactly where that region's
  boundary is drawn, making risk rankings more stable across reasonable choices of
  confidence level.

The trade-off is that ES is **more computationally demanding** — it requires
characterizing (or simulating) the shape of the tail beyond the VaR threshold, not
just locating the threshold itself. For a detailed treatment of how ES is actually
calculated from a historical sample (the "tail-slicing" procedure), see
[[Expected Shortfall]].

## Spectral risk measures

Spectral risk measures are a **generalization** of expected shortfall. Where ES
applies equal weight to every outcome within the tail region (effectively a simple
average of tail losses), a spectral risk measure applies a **weighting function**
across the whole loss distribution that can be chosen to reflect a specific
decision-maker's attitude toward risk.

Key properties:

- **Smoothness.** Because the weighting function can be chosen to vary smoothly
  across outcomes (rather than switching abruptly from "zero weight" to "equal
  weight" at the VaR threshold, as ES effectively does), spectral measures can avoid
  some of the discontinuities that arise from a hard cutoff.
- **Customizable risk aversion.** The weighting function is a direct expression of how
  much extra weight a particular investor or institution places on increasingly
  severe losses. A more risk-averse decision-maker can use a weighting scheme that
  puts disproportionately more weight on the worst outcomes; a less risk-averse one
  can use a flatter weighting scheme.
- **Expected shortfall is a special case.** ES corresponds to one particular, simple
  choice of weighting function (equal weight on the tail, zero elsewhere). The
  broader spectral family nests ES as a member rather than replacing it.

Despite these theoretical advantages, **spectral risk measures other than expected
shortfall are rarely used in practice** — the extra flexibility of a general weighting
function comes with extra estimation burden and less standardization, so the industry
has largely converged on VaR and ES (with ES increasingly favored for the reasons
above) rather than adopting more general spectral measures.

## Stress testing alongside quantitative risk measures

VaR, ES, and spectral measures are all typically estimated under **normal market
conditions** — they describe the distribution of outcomes that history (or a model
calibrated to history) suggests is plausible in "ordinary" times. Stress testing is
the complementary practice of asking "what if conditions are *not* ordinary?" Three
broad types of stress-testing exercises are used:

1. **Historical scenarios** — replaying a previously observed period of market
   turmoil against the current portfolio to see what the resulting loss would be.
2. **Predefined (hypothetical) scenarios** — specifying a set of adverse moves in key
   risk factors (e.g., a parallel shift in rates plus a credit-spread widening) that
   have not necessarily occurred historically, and assessing the profit/loss impact.
3. **Mechanical-search stress tests** — using automated routines to systematically
   search across combinations of risk-factor moves for particularly damaging
   scenarios, rather than relying on a small set of hand-picked cases.

A subtlety in stress testing is that **correlations themselves need to be stressed**,
not just individual risk factor levels — correlations that hold in normal markets
often break down or move toward extremes (e.g., toward 1) during a crisis, and a
stress scenario that keeps "normal" correlations while shocking levels can understate
the true combined impact.

Stress tests also rest on a debatable assumption: that shocks happen **instantaneously**
and that traders have **no opportunity to re-hedge or adjust positions** in response.
In reality, market participants would likely react as a shock unfolds, which could
either dampen or (through forced selling) amplify the ultimate impact — stress tests
that assume a frozen portfolio may therefore over- or understate the realistic outcome.

**Stressed VaR** is an attempt to bridge the gap: rather than calibrating VaR to
recent, possibly calm, data, a stressed VaR approach calibrates the model using data
from a historical period of significant financial stress, so the resulting VaR figure
better reflects what could happen in a crisis. However, this approach has not been
extensively validated, and ordinary VaR computed under normalized conditions can
remain a poor guide to losses under genuine market stress.

## See also

- [[Summary]]
- [[Expected Shortfall]] — detailed ES calculation procedure (from Reading 1)
- [[VaR Implementation Lessons]]
- [[Liquidity Risk and LVaR]]
