---
title: Managing Extreme Values
topic: market-risk
lesson: 3
tags: [extreme-value-theory, tail-risk, model-risk]
updated: 2026-06-13
---

# LO 3.a — Explain the importance and challenges of extreme values in risk management

**In plain terms:** the losses that matter most for a risk manager — the
ones that can sink an institution — are by definition the rarest ones. That
combination (high stakes, low frequency) is exactly what makes them hard to
model, and exactly why a dedicated set of tools is worth having.

## Why extreme values matter

Extreme losses arise from events such as:

- sharp market declines or crashes,
- the failure of large financial institutions,
- the outbreak of financial or political crises, and
- natural catastrophes.

Any one of these can be enormously costly, so a risk model that handles them
poorly is dangerous precisely where it matters most — in the tail.

## Why extreme values are hard to model

The core difficulty is **scarcity of data**. By construction, extreme events
happen rarely, so:

- there are very few historical observations to calibrate a model from, and
- some magnitudes of loss that are plausible going forward may never have
  occurred in the historical record at all.

Faced with this, a researcher has to *assume* some distribution for the data.
That assumed distribution will almost never match the true underlying
distribution exactly, so some model error is unavoidable. The trouble is that
most standard distribution-fitting approaches are chosen based on how well
they describe the **center** of the data — the bulk of "ordinary" days — which
is precisely the part of the distribution that matters least for tail risk.
A distribution that fits the middle of the data beautifully can still be a
poor description of what happens in the extreme tail.

This is not a problem unique to finance. Engineers designing a dam face the
same structural issue: they need to estimate the height of the highest
plausible flood, which may well exceed anything in the historical flood
record, in order to build a structure that won't fail under conditions no one
has yet observed.

## The takeaway

Because ordinary central-tendency-based modeling is ill-suited to the tail,
risk management needs an approach that is built around the tail from the
start. That approach is **extreme value theory (EVT)**, covered next in
[[Extreme Value Theory and the GEV Distribution]].

## See also

- [[Extreme Value Theory and the GEV Distribution]]
- [[Peaks-Over-Threshold Approach]]
