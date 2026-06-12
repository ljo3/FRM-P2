# Agent Operating Instructions — FRM Part 2 Study Wiki & Quiz Engine

These rules govern how an AI agent (or collaborator) should process material in this
repository. They apply to every ingestion pass over `private_materials/inbox/`.

## CORE RULE

Never copy verbatim passages from `private_materials/`. Synthesize the formulas,
concepts, and risks in my own words.

## STATE TRACKING

Before ingesting any file in `private_materials/inbox/`, calculate its SHA-256 hash.
Compare it against `private_materials/sync_state.json`. If the hash is identical to
the stored state, skip it. If it is new or changed, proceed with ingestion and update
`sync_state.json` with the new timestamp and hash.

The record for each file should track:
- The absolute path of the source file.
- The last modified timestamp at the time of processing.
- The SHA-256 hash of the file contents.

## INGESTION

Parse the file and create clear, highly cross-referenced Markdown notes in the
corresponding `wiki/` subfolder using Obsidian wikilinks (e.g., `[[Value at Risk]]`).

## QUIZ GENERATION

For every new concept note created, automatically append 3-5 active-recall questions
to the corresponding `quiz/` markdown file using Obsidian callout syntax, e.g.:

```
> [!FAQ]+ Question?
> Answer details
```

## CLEANUP

Move processed files to `private_materials/processed/`.

## FRM Domain Map

Use these folder mappings for both `wiki/` and `quiz/`:

1. `1_market_risk` — Market Risk Measurement and Management
2. `2_credit_risk` — Credit Risk Measurement and Management
3. `3_operational_risk` — Operational Risk and Resiliency
4. `4_liquidity_risk` — Liquidity and Treasury Risk Measurement and Management
5. `5_investment_management` — Risk Management and Investment Management
6. `6_current_issues` — Current Issues in Financial Markets
