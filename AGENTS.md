# AGENTS.md — Operating Spec for the FRM Part 2 LLM Wiki

This file is the operating manual for any AI agent (Claude or otherwise)
working in this repository. It governs how source material becomes wiki
pages and quiz data, and how the agent should answer study questions.

## Repo layout

```
raw/                 Immutable source PDFs. NEVER edited or deleted after landing.
  market-risk/ credit-risk/ operational-risk/ liquidity-treasury/
  investment-management/ current-issues/    one subfolder per topic
wiki/                AI-written, paraphrased study pages.
  _INDEX.md          Folder index: lists the six topic folders.
  <same six topic folders>
    _INDEX.md        Folder index: lists the readings ingested for this topic.
    R<N> - <Chapter Title>/   lesson folder created on ingest, named after the
                              reading number and the reading's title, e.g.
                              market-risk/R5 - Estimating Liquidity Risks/
      _INDEX.md      Folder index: lists every page in this reading's folder.
quiz/                Static HTML/CSS/JS quiz app for Cloudflare Pages.
  index.html
  styles.css
  app.js
  data/              Generated quiz/flashcard JSON, mirrored by topic.
    manifest.json    Catalog of all lessons (the app reads this on load).
_INDEX.md            Master catalog of all wiki pages, grouped by topic.
log.md               Append-only chronological record of every ingest.
sync_state.json      Hash-tracked record of every source file ingested.
```

Each `raw/<TOPIC>/` folder also gets a `processed/` subfolder the first time a
file from that topic is ingested — processed source PDFs are moved there
(see step 7 below).

## Topic folders

| Folder                   | Topic                                                    |
|--------------------------|----------------------------------------------------------|
| market-risk              | Market Risk Measurement and Management                   |
| credit-risk              | Credit Risk Measurement and Management                   |
| operational-risk         | Operational Risk and Resilience                          |
| liquidity-treasury       | Liquidity and Treasury Risk Measurement and Management   |
| investment-management    | Risk Management and Investment Management                |
| current-issues           | Current Issues in Financial Markets                      |

## Copyright (strict)

Source PDFs are copyrighted (GARP / publishers). **Nothing** in `wiki/` or
`quiz/` may copy sentences verbatim from a PDF.

- Restate every definition, explanation, and worked example in original
  wording — explain it as if teaching it from scratch.
- Formulas are not copyrightable and may be reproduced exactly, but all
  surrounding prose (setup, interpretation, intuition) must be original.
- If a specific phrase truly can't be reworded without losing meaning, keep
  it to a few words and quote it sparingly with quotation marks.
- `raw/` is gitignored and never published. Treat it as a private reference
  only — never echo large chunks of it back into chat either.

## INGEST workflow

Triggered when the user says a file was added to `raw/<TOPIC>/` (or asks to
ingest new files).

1. **Identify the file.** Infer the topic from the subfolder
   (`raw/<TOPIC>/...`). Compute its sha256 and check `sync_state.json` for an
   entry with this topic/filename:
   - Same filename, same hash -> already ingested, skip it.
   - Same filename, different hash -> source was replaced; re-ingest and
     overwrite the existing wiki pages/quiz file for that lesson.
   - No entry -> new file, ingest it.

   Read the source to find the reading's actual title and its stated learning
   outcomes/objectives. Infer the lesson number `<N>` from the reading/chapter
   number (e.g. "Reading 5" -> `lesson: 5`); this is used for quiz file naming
   below, independent of the wiki folder name. If the lesson number is
   ambiguous, ask the user before proceeding rather than guessing.

2. **Write wiki pages** in `wiki/<TOPIC>/R<N> - <Chapter Title>/`, where `<N>`
   is the lesson/reading number from step 1 and `<Chapter Title>` is the
   reading's actual title as given in the source (e.g.
   `R5 - Estimating Liquidity Risks/`):
   - `Summary.md` — a lesson overview: what the reading covers, how it
     connects to other lessons, and a bullet list linking (via
     `[[wikilinks]]`) to every learning-outcome page below.
   - One page per learning outcome, named after a short paraphrase of that
     outcome (e.g. `Calculate Liquidity-Adjusted VaR.md`). Restate the
     outcome in your own words at the top of the page, then explain the
     concepts, models, and worked examples needed to meet it.
   - `Formulas.md` — every formula from the lesson in one place, with brief
     notes on when/why each is used and which learning-outcome page(s) it
     relates to.
   - `_INDEX.md` — a folder index: one bullet per page in this folder
     (Summary, each learning-outcome page, Formulas), plus a
     `[← <Topic> Index](../_INDEX.md)` back-link. Use plain relative markdown
     links (`[Text](Page Name.md)`, wrapped in `<...>` if the filename has
     spaces) rather than `[[wikilinks]]` — `Summary.md`, `Formulas.md`, and
     `_INDEX.md` filenames repeat across reading folders, so bare wikilinks to
     them would be ambiguous. The leading underscore keeps `_INDEX.md` sorted
     first in file listings.
   - Cross-link content pages (Summary, learning-outcome pages, Formulas)
     with `[[wikilinks]]` (Obsidian-style, page name only, no `.md`
     extension, no path).
   - Every content page gets YAML frontmatter:
     ```yaml
     ---
     title: <Page Title>
     topic: <TOPIC>
     lesson: <N>
     tags: [<relevant tags>]
     updated: <YYYY-MM-DD>
     ---
     ```

3. **Generate quiz data** at `quiz/data/<TOPIC>/lesson<N>.json` using this
   schema:
   ```json
   {
     "topic": "<TOPIC>",
     "lesson": <N>,
     "title": "<chapter title>",
     "flashcards": [
       { "front": "...", "back": "..." }
     ],
     "questions": [
       {
         "q": "...",
         "choices": ["...", "...", "...", "..."],
         "answer": <index of correct choice, 0-based>,
         "explanation": "..."
       }
     ]
   }
   ```
   - Aim for ~10-15 flashcards and ~10-15 multiple-choice questions per
     chapter.
   - Exam-style, original wording — not copied from the PDF.
   - Each `questions[].choices` array should have exactly 4 entries, with
     `answer` being the 0-based index of the correct one.

4. **Update `quiz/data/manifest.json`**: add or update this topic's array
   with an entry for the lesson:
   ```json
   { "lesson": <N>, "title": "<chapter title>", "file": "data/<TOPIC>/lesson<N>.json" }
   ```
   If an entry for this `lesson` number already exists under this topic
   (re-ingest), replace it in place rather than duplicating.

5. **Refresh `_INDEX.md`** (project root): under the matching topic heading,
   add/update a bullet linking to the new lesson's `Summary` page (and
   optionally its learning-outcome pages) using `[[wikilinks]]`.

6. **Refresh folder indexes**: add/update a bullet in
   `wiki/<TOPIC>/_INDEX.md` linking to this reading's `_INDEX.md`, e.g.
   `[R<N> — <Chapter Title>](<R<N> - Chapter Title/_INDEX.md>)` (wrap the
   destination in `<...>` since the folder name has spaces). `wiki/_INDEX.md`
   (the top-level topic list) only needs touching if a new topic folder is
   introduced.

7. **Append to `log.md`**: a new entry with the date, source filename, and a
   short list of wiki pages and quiz files created/updated.

8. **Mark the source as processed:**
   - Move `raw/<TOPIC>/<file>` to `raw/<TOPIC>/processed/<file>` (creating
     `processed/` if needed). This is the one exception to "never modify
     `raw/`" — the file's bytes are untouched, only its location changes.
   - Add/update its entry in `sync_state.json`:
     ```json
     {
       "<TOPIC>/<file>": {
         "sha256": "<sha256 of the file>",
         "processed_at": "<YYYY-MM-DD>",
         "lesson": <N>,
         "title": "<chapter title>",
         "wiki": "wiki/<TOPIC>/R<N> - <Chapter Title>/",
         "quiz": "quiz/data/<TOPIC>/lesson<N>.json"
       }
     }
     ```
     Keep the key as `<TOPIC>/<file>` (its original path under `raw/`, before
     the move to `processed/`) so re-ingests can be matched by hash-check in
     step 1.

## QUERY workflow

When the user asks "what do I know about X" (or similar recall questions):

- Answer from `_INDEX.md` and the relevant `wiki/` pages **only**.
- Do not re-read or re-derive answers from `raw/` — if the wiki doesn't
  cover it, say so and suggest it may need to be ingested or expanded.

## Quiz app

`quiz/index.html` + `quiz/styles.css` + `quiz/app.js` form a static site with
no build step and no frameworks, using relative paths so it deploys directly
to Cloudflare Pages (root = `quiz/`). It reads `data/manifest.json`, then
fetches the referenced lesson JSON files on demand.

- **Study Cards mode**: flippable flashcards, filterable by topic and lesson.
- **Quiz mode**: scope selector for a single lesson, a whole topic, or
  "Everything so far" (cumulative across the whole manifest). Multiple
  choice, immediate feedback with explanation, running score, end-of-quiz
  summary.
- State lives in memory only (no localStorage dependency).

After adding or editing anything under `quiz/data/`, no build step is
required — the app reads the JSON directly at runtime.
