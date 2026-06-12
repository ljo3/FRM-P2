# CLAUDE.md

Project-specific context for Claude Code when working in this repo.

## What this repo is

A private study system for the FRM Part 2 exam. Proprietary study materials stay
private in `private_materials/` (gitignored); they are synthesized into original-wording
public wiki notes (`wiki/`) and active-recall flashcards (`quiz/`). `build_quiz.js`
compiles `quiz/**/*.md` into a static quiz site in `public/`, ready to deploy to
Cloudflare Pages.

## Ingestion workflow

When asked to ingest new files (e.g. "ingest new files"), follow
[agent_instructions.md](agent_instructions.md) exactly:

- Hash-check files in `private_materials/inbox/` against `private_materials/sync_state.json`;
  skip files whose hash is unchanged.
- Never copy source material verbatim — synthesize concepts/formulas in original wording.
- Create cross-referenced wiki notes (Obsidian `[[wikilinks]]`) in the matching `wiki/<domain>/`.
- Append 3-5 `> [!FAQ]+ Question?\n> Answer` flashcard callouts per new concept note to the
  matching `quiz/<domain>/<Concept Name>.md` (filenames must match the wiki note exactly;
  index/MOC notes don't get a quiz file).
- Update `sync_state.json` (path, last_modified, sha256) and move the processed file to
  `private_materials/processed/`.
- Rebuild the site: `node build_quiz.js`.

## FRM domain map (used for both wiki/ and quiz/)

1. `1_market_risk` — Market Risk Measurement and Management
2. `2_credit_risk` — Credit Risk Measurement and Management
3. `3_operational_risk` — Operational Risk and Resiliency
4. `4_liquidity_risk` — Liquidity and Treasury Risk Measurement and Management
5. `5_investment_management` — Risk Management and Investment Management
6. `6_current_issues` — Current Issues in Financial Markets

## Build

```sh
node build_quiz.js
```

Dependency-free Node script. Reads every `quiz/<domain>/*.md`, parses `> [!FAQ]+` callouts,
and (re)writes `public/index.html`, `public/style.css`, `public/app.js`, and
`public/quiz-data.js`. Run this after any change under `quiz/`.

The generated site has three modes: a 30-question random flashcard quiz, a 30-question
multiple-choice quiz (4 options: 1 correct + 3 distractors drawn from other cards'
answers), and per-domain browsing.

## Conventions

- Never commit anything under `private_materials/` (already in `.gitignore`).
- Quiz card format per concept note:

  ```
  ## <Concept Name>

  > [!FAQ]+ Question?
  > Answer text (supports **bold**, *italic*, `code`, [[wikilinks]], and "- " bullets)
  ```
