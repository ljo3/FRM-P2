# FRM Part 2 Study Wiki & Quiz Engine

A personal study system for the GARP FRM Part 2 exam: source study materials stay
private, while synthesized notes and active-recall flashcards are public and compiled
into a static quiz site deployable to Cloudflare Pages.

## How it works

1. Drop a source reading (PDF, etc.) into `private_materials/inbox/`.
2. Ask Claude Code to "ingest new files" — it follows the rules in
   [agent_instructions.md](agent_instructions.md):
   - hashes the file and checks it against `private_materials/sync_state.json`
   - synthesizes cross-referenced Markdown notes in `wiki/<domain>/`
   - generates 3-5 active-recall flashcards per concept in `quiz/<domain>/`
   - moves the source file to `private_materials/processed/`
3. Run `node build_quiz.js` to rebuild the static quiz site in `public/`.

## Structure

| Path | Purpose |
| --- | --- |
| `private_materials/` | Gitignored. Source readings + `sync_state.json` hash tracker. |
| `wiki/` | Public Obsidian-style notes, organized by FRM domain. |
| `quiz/` | Public flashcard source files (`> [!FAQ]+` callouts), mirroring `wiki/`. |
| `build_quiz.js` | Standalone Node script (no dependencies) that builds `public/`. |
| `public/` | Generated static site — deploy this to Cloudflare Pages. |

## FRM Part 2 domains

1. Market Risk Measurement and Management
2. Credit Risk Measurement and Management
3. Operational Risk and Resiliency
4. Liquidity and Treasury Risk Measurement and Management
5. Risk Management and Investment Management
6. Current Issues in Financial Markets

## Quiz site

`public/index.html` is a self-contained static SPA with three study modes:

- **Flashcards** — 30 random questions; click a card to flip and reveal the answer.
- **Multiple Choice** — 30 random questions, each with 4 answer choices (1 correct + 3
  distractors), with live scoring and a results screen.
- **Browse by Domain** — review every flashcard for a single FRM domain.

### Build

```sh
node build_quiz.js
```

Regenerates `public/index.html`, `public/style.css`, `public/app.js`, and
`public/quiz-data.js` from every `quiz/**/*.md` file.

### Deploy (Cloudflare Pages)

Point a Cloudflare Pages project at this repo:

- Build output directory: `public/`
- Build command (optional): `node build_quiz.js`
