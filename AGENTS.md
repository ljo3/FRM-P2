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
quiz/                Static HTML/CSS/JS site deployed to Cloudflare Pages
                     (build output directory = quiz/). Two linked apps:
  index.html         Quiz/flashcard app (entry point).
  styles.css
  app.js
  data/              Generated quiz/flashcard JSON, mirrored by topic.
    manifest.json    Catalog of all lessons (the app reads this on load).
  study-guide/       Interactive study guide subpage, linked from the quiz
                     app's header nav ("Study Guide" / "Back to Quiz").
                     Sequential "why this matters + deep dive" walkthrough
                     per learning outcome, with progress tracked in browser
                     localStorage.
    index.html
    styles.css
    app.js
    manifest.json    Catalog of topics/lessons, nested by topic (different
                     shape from quiz/data/manifest.json's flat per-topic
                     arrays — see INGEST step 5).
    <TOPIC>/
      lesson<N>.json Per-LO content: { intro: {why, content}, los: [...] }.
_INDEX.md            Master catalog of all wiki pages, grouped by topic.
log.md               Append-only chronological record of every ingest.
sync_state.json      Hash-tracked record of every source file ingested.
```

Each `raw/<TOPIC>/` folder also gets a `processed/` subfolder the first time a
file from that topic is ingested — processed source PDFs are moved there
(see step 9 below).

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

4. **Generate study-guide content** at `quiz/study-guide/<TOPIC>/lesson<N>.json`.
   This is deployed alongside the quiz app, so generate it for every ingested
   reading to keep the study guide in sync with the wiki/quiz. Schema:
   ```json
   {
     "topic": "<TOPIC>",
     "lesson": <N>,
     "title": "<chapter title>",
     "intro": { "why": "...", "content": "<p>...</p>..." },
     "los": [
       {
         "id": "<Na>",
         "lo": "LO <N>.<x> — <LO statement>",
         "title": "<short LO title>",
         "why": "...",
         "keyIdea": "...",
         "content": "<h4>...</h4><p>...</p>...",
         "formula": "<div class='formula'>...</div>",
         "takeaways": ["...", "...", "...", "..."]
       }
     ]
   }
   ```
   - `intro.why` and each `los[].why`: a fresh 2-4 sentence "why this
     matters" framing — big-picture motivation/intuition, written from
     scratch (not paraphrased from the source's framing).
   - `los[].content`: a condensed, paraphrased deep-dive drawn from the
     corresponding wiki learning-outcome page — the same copyright rules as
     wiki pages apply. Rewrite any `[[wikilinks]]` from the wiki page as
     plain `<strong>`/`<em>` text (this app has no cross-page links).
   - `los[].keyIdea`: one-sentence distillation of the core idea.
   - `los[].formula`: optional — include only if the LO has a key formula
     worth isolating; omit the field entirely otherwise.
   - `los[].takeaways`: 3-5 short bullet strings — the "if you remember
     nothing else" points for this LO.
   - `los[].id` should match the LO numbering used in the wiki/quiz (e.g.
     `1a`, `1b`, ... for lesson 1's learning outcomes).
   - Validate the file is valid JSON (e.g.
     `python3 -c "import json; json.load(open(f))"`) before moving on.

5. **Update manifests**:
   - `quiz/data/manifest.json` — add or update this topic's array with an
     entry for the lesson:
     ```json
     { "lesson": <N>, "title": "<chapter title>", "file": "data/<TOPIC>/lesson<N>.json" }
     ```
   - `quiz/study-guide/manifest.json` — add or update this topic's entry:
     ```json
     {
       "<TOPIC>": {
         "title": "<Topic Title>",
         "lessons": [
           { "lesson": <N>, "title": "<chapter title>", "file": "<TOPIC>/lesson<N>.json" }
         ]
       }
     }
     ```
     If the topic key doesn't exist yet, create it (use the topic's title
     from the table above).
   - In both files, if an entry for this `lesson` number already exists under
     this topic (re-ingest), replace it in place rather than duplicating.

6. **Refresh `_INDEX.md`** (project root): under the matching topic heading,
   add/update a bullet linking to the new lesson's `Summary` page (and
   optionally its learning-outcome pages) using `[[wikilinks]]`.

7. **Refresh folder indexes**: add/update a bullet in
   `wiki/<TOPIC>/_INDEX.md` linking to this reading's `_INDEX.md`, e.g.
   `[R<N> — <Chapter Title>](<R<N> - Chapter Title/_INDEX.md>)` (wrap the
   destination in `<...>` since the folder name has spaces). `wiki/_INDEX.md`
   (the top-level topic list) only needs touching if a new topic folder is
   introduced.

8. **Append to `log.md`**: a new entry with the date, source filename, and a
   short list of wiki pages, quiz files, and study-guide files
   created/updated.

9. **Mark the source as processed:**
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
         "quiz": "quiz/data/<TOPIC>/lesson<N>.json",
         "study_guide": "quiz/study-guide/<TOPIC>/lesson<N>.json"
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
- The header's "Study Guide" link opens `study-guide/` (see below); the study
  guide's header has a matching "Back to Quiz" link.

After adding or editing anything under `quiz/data/`, no build step is
required — the app reads the JSON directly at runtime.

## Study guide app

`quiz/study-guide/index.html` + `quiz/study-guide/styles.css` +
`quiz/study-guide/app.js` form a second static site, deployed as a subpage of
the quiz app (linked via the header nav on both pages). It reads
`quiz/study-guide/manifest.json`, then fetches each topic's `lesson<N>.json`
files on demand.

- Each reading contributes one "Overview" step (from `intro`) followed by one
  step per learning outcome (from `los[]`), flattened into a single per-topic
  sequence that Next/Previous walk through (crossing lesson boundaries within
  a topic).
- Each step shows: why it matters, an optional one-line key idea, the
  deep-dive `content`, an optional `formula` block, and a `takeaways` list.
- A "Mark as understood" checkbox persists per-step progress to
  `localStorage` (key `frm-study-guide-progress`), shown via checkmarks in
  the sidebar and progress bars on the home view. A footer link resets all
  progress.
- `quiz/study-guide/progress.json` is a repo-tracked backup of completed
  steps, merged into `localStorage` on load (union — entries marked `true`
  here are always treated as done, even if the browser's storage was wiped,
  e.g. by Cloudflare Access re-auth redirects or a browser/device switch).
  Format: a flat map of `"<topic>/<lesson>/<lo-id>": true`, e.g.
  `"market-risk/5/1a": true` (use `"intro"` as the `<lo-id>` for a lesson's
  Overview step).
- **PROGRESS workflow**: when the user reports finishing one or more steps
  (e.g. "mark LO 5.1a as done", "I finished lesson 6"), add the
  corresponding key(s) to `quiz/study-guide/progress.json` (look up the
  topic/lesson/LO ids from `quiz/study-guide/<TOPIC>/lesson<N>.json` —
  `los[].id`, plus `"intro"` for the overview), keep the file sorted/valid
  JSON, and commit/push the change so it survives the next deploy.
- After adding or editing anything under `quiz/study-guide/`, no build step
  is required — the app reads the JSON directly at runtime.
