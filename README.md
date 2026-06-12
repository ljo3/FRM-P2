# FRM Part 2 — Study Wiki & Quiz

A personal study repo for the GARP FRM Part 2 exam, organized as an
LLM-maintained markdown wiki plus a static flashcard/quiz app.

- `wiki/` — paraphrased study notes, one folder per topic, one subfolder per
  reading (`R<N> - <Chapter Title>/`). Start at [`_INDEX.md`](_INDEX.md).
- `quiz/` — a static HTML/CSS/JS flashcard and quiz app with no build step,
  driven by `quiz/data/manifest.json`.
- `raw/` — gitignored source PDFs (private, never published).
- `AGENTS.md` — the operating spec an AI agent follows to ingest new
  readings into `wiki/` and `quiz/data/`.
- `log.md` / `sync_state.json` — append-only ingest log and hash-tracked
  record of processed sources.

## Topics

| Folder                   | Topic                                                    |
|--------------------------|----------------------------------------------------------|
| market-risk              | Market Risk Measurement and Management                   |
| credit-risk              | Credit Risk Measurement and Management                   |
| operational-risk         | Operational Risk and Resilience                          |
| liquidity-treasury       | Liquidity and Treasury Risk Measurement and Management   |
| investment-management    | Risk Management and Investment Management                |
| current-issues           | Current Issues in Financial Markets                      |

## Ingesting a new reading

1. Drop the chapter PDF into `raw/<topic>/`.
2. Ask the study agent to ingest it (it follows the workflow in
   [AGENTS.md](AGENTS.md)).
3. The agent writes paraphrased notes under `wiki/<topic>/R<N> - .../`,
   generates `quiz/data/<topic>/lesson<N>.json`, and updates the indexes,
   manifest, and log.

## Running the quiz app locally

The quiz app is plain static files — serve `quiz/` with any static file
server and open it in a browser:

```bash
cd quiz
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to Cloudflare Pages

The quiz app has no build step and uses only relative paths, so it deploys
directly from the `quiz/` folder.

### Option A: Git integration (recommended)

1. In the Cloudflare dashboard, go to **Workers & Pages → Create →
   Pages → Connect to Git** and select this repository.
2. Configure the build settings:
   - **Production branch**: `main`
   - **Build command**: _(leave empty)_
   - **Build output directory**: `quiz`
3. Save and deploy. Every push to `main` will redeploy automatically.

### Option B: Direct upload via Wrangler

```bash
npx wrangler pages deploy quiz --project-name=frm-p2-quiz
```

Either way, the app loads `data/manifest.json` and the per-lesson JSON files
under `quiz/data/` at runtime — no rebuild is needed after running an ingest,
just commit and push (or redeploy) the updated files.
