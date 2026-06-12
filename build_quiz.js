#!/usr/bin/env node
/**
 * build_quiz.js
 *
 * Reads every Markdown file under quiz/<domain>/, extracts active-recall
 * Q&A pairs written as Obsidian "[!FAQ]" callouts, and compiles them into a
 * static site under public/:
 *
 *   public/index.html    - page shell (domain picker + quiz screen)
 *   public/style.css     - styles
 *   public/app.js        - app logic (domain browsing + random quiz mode)
 *   public/quiz-data.js  - generated flashcard data (var QUIZ_DATA = {...})
 *
 * Usage:
 *   node build_quiz.js
 *
 * The output has no external dependencies (no CDN links, no node_modules at
 * runtime) and is ready to deploy as-is to Cloudflare Pages.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const QUIZ_DIR = path.join(ROOT_DIR, 'quiz');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_HTML = path.join(OUTPUT_DIR, 'index.html');
const OUTPUT_CSS = path.join(OUTPUT_DIR, 'style.css');
const OUTPUT_APP_JS = path.join(OUTPUT_DIR, 'app.js');
const OUTPUT_DATA_JS = path.join(OUTPUT_DIR, 'quiz-data.js');

// Number of cards drawn at random (across all domains) for "Random Quiz" mode.
const RANDOM_QUIZ_SIZE = 30;

// Canonical order + folder names for the six FRM Part 2 domains.
const DOMAIN_ORDER = [
  '1_market_risk',
  '2_credit_risk',
  '3_operational_risk',
  '4_liquidity_risk',
  '5_investment_management',
  '6_current_issues',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function titleCase(str) {
  return str
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDomainName(dirName) {
  const match = dirName.match(/^(\d+)_(.+)$/);
  if (!match) return titleCase(dirName);
  return `${match[1]}. ${titleCase(match[2])}`;
}

function formatTopicName(fileName) {
  return titleCase(fileName.replace(/\.md$/i, ''));
}

/**
 * Extract Q&A flashcards from an Obsidian-style callout block:
 *
 *   > [!FAQ]+ Question text?
 *   > Answer line 1
 *   > Answer line 2
 *
 * Any callout whose type is "FAQ" (case-insensitive, with or without the
 * +/- fold marker) is treated as a flashcard. The rest of the opening line
 * becomes the question; every immediately following line that starts with
 * ">" becomes part of the answer.
 */
function parseQuizFile(content, topic) {
  const lines = content.split(/\r?\n/);
  const calloutStart = /^>\s*\[!\s*faq\s*\]([+-]?)\s*(.*)$/i;
  const continuation = /^>(.*)$/;
  const cards = [];

  let i = 0;
  while (i < lines.length) {
    const startMatch = lines[i].match(calloutStart);
    if (!startMatch) {
      i += 1;
      continue;
    }

    const question = startMatch[2].trim();
    const answerLines = [];
    let j = i + 1;
    while (j < lines.length) {
      const contMatch = lines[j].match(continuation);
      if (!contMatch) break;
      let text = contMatch[1];
      if (text.startsWith(' ')) text = text.slice(1);
      answerLines.push(text);
      j += 1;
    }

    if (question) {
      cards.push({
        topic,
        question,
        answer: answerLines.join('\n').trim(),
      });
    }

    i = j > i ? j : i + 1;
  }

  return cards;
}

/**
 * Walk quiz/<domain>/*.md for every domain and return:
 *   { "1_market_risk": { label: "1. Market Risk", cards: [...] }, ... }
 */
function collectQuizData() {
  const data = {};

  for (const domain of DOMAIN_ORDER) {
    const domainDir = path.join(QUIZ_DIR, domain);
    const cards = [];

    if (fs.existsSync(domainDir)) {
      const files = fs
        .readdirSync(domainDir)
        .filter((f) => f.toLowerCase().endsWith('.md'))
        .sort();

      for (const file of files) {
        const filePath = path.join(domainDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const topic = formatTopicName(file);
        cards.push(...parseQuizFile(content, topic));
      }
    }

    data[domain] = {
      label: formatDomainName(domain),
      cards,
    };
  }

  return data;
}

// ---------------------------------------------------------------------------
// Output file builders
// ---------------------------------------------------------------------------

function buildIndexHtml(generatedAt) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FRM Part 2 - Quiz Engine</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>FRM Part 2 Quiz Engine</h1>
    <p class="subtitle">Active-recall practice across all six exam domains</p>
  </header>

  <main>
    <section id="domain-screen">
      <div class="launch-row">
        <div class="quiz-launch">
          <h2>Flashcards</h2>
          <p id="random-quiz-sub"></p>
          <button id="random-quiz-btn" class="primary-btn">Start Flashcards</button>
        </div>

        <div class="quiz-launch mc-launch">
          <h2>Multiple Choice</h2>
          <p id="mc-quiz-sub"></p>
          <button id="mc-quiz-btn" class="primary-btn">Start Multiple Choice</button>
        </div>
      </div>

      <h2 class="section-heading">Browse by Domain</h2>
      <div id="domain-grid"></div>
    </section>

    <section id="quiz-screen" class="hidden">
      <button id="back-btn">&larr; All Domains</button>
      <h2 id="domain-title"></h2>
      <div id="progress"></div>

      <div class="card-wrap">
        <div class="flashcard" id="flashcard">
          <div class="face front">
            <span class="topic-tag" id="front-topic"></span>
            <div class="question" id="question-text"></div>
            <div class="hint">Click card to reveal answer</div>
          </div>
          <div class="face back">
            <span class="topic-tag" id="back-topic"></span>
            <div class="answer" id="answer-text"></div>
            <div class="hint">Click card to see question</div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button id="prev-btn">&larr; Prev</button>
        <button id="shuffle-btn">Shuffle</button>
        <button id="next-btn">Next &rarr;</button>
      </div>

      <div id="empty-message" class="hidden">
        No quiz cards yet. Run the ingestion workflow to generate some.
      </div>
    </section>

    <section id="mc-screen" class="hidden">
      <button id="mc-back-btn">&larr; Menu</button>
      <h2 id="mc-title">Multiple Choice Quiz</h2>
      <div id="mc-progress"></div>

      <div id="mc-question-wrap">
        <span class="topic-tag" id="mc-topic-tag"></span>
        <div class="question" id="mc-question"></div>
        <div id="mc-options"></div>
        <div id="mc-feedback" class="hidden"></div>
        <div class="controls">
          <button id="mc-next-btn" class="hidden">Next &rarr;</button>
        </div>
      </div>

      <div id="mc-results" class="hidden">
        <h2>Quiz Complete</h2>
        <p id="mc-score-summary"></p>
        <div class="controls">
          <button id="mc-retry-btn">New Quiz</button>
          <button id="mc-menu-btn">Back to Menu</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <p id="footer-stats"></p>
    <p>Last built ${generatedAt}</p>
  </footer>

  <script src="quiz-data.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;
}

function buildStyleCss() {
  return `:root {
  --bg: #f4f6fb;
  --surface: #ffffff;
  --ink: #1e293b;
  --muted: #64748b;
  --accent: #1d4ed8;
  --accent-soft: #dbeafe;
  --border: #e2e8f0;
  --header-bg: #0f172a;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: var(--header-bg);
  color: #f8fafc;
  padding: 1.75rem 1.5rem;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: 0.02em;
}

header .subtitle {
  margin: 0.35rem 0 0;
  color: #94a3b8;
  font-size: 0.95rem;
}

main {
  flex: 1;
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
}

.hidden { display: none !important; }

/* Random quiz launch banner */
.quiz-launch {
  background: linear-gradient(135deg, var(--accent), #1e3a8a);
  color: #fff;
  border-radius: 0.85rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.quiz-launch h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.quiz-launch p {
  margin: 0 0 1rem;
  color: #dbeafe;
  font-size: 0.9rem;
}

.primary-btn {
  background: #fff;
  color: var(--accent);
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.18);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.launch-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.launch-row .quiz-launch {
  flex: 1 1 240px;
  margin-bottom: 0;
}

.mc-launch {
  background: linear-gradient(135deg, #7c3aed, #4c1d95);
}

.mc-launch .primary-btn {
  color: #7c3aed;
}

.section-heading {
  font-size: 1rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.75rem;
}

/* Domain selection screen */
#domain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.domain-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--ink);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.domain-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
  border-color: var(--accent);
}

.domain-name {
  font-weight: 600;
  font-size: 1.05rem;
}

.domain-count {
  color: var(--muted);
  font-size: 0.85rem;
}

/* Quiz screen */
#back-btn, #mc-back-btn {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.25rem 0;
  margin-bottom: 0.75rem;
  font-family: inherit;
}

#domain-title, #mc-title {
  margin: 0 0 0.25rem;
  font-size: 1.35rem;
}

#progress, #mc-progress {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-wrap {
  perspective: 1600px;
  margin-bottom: 1.25rem;
}

.flashcard {
  position: relative;
  min-height: 260px;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
  cursor: pointer;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  inset: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 1.5rem;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

.face.back {
  transform: rotateY(180deg);
}

.topic-tag {
  display: inline-block;
  align-self: flex-start;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.85rem;
}

.question, .answer {
  font-size: 1.1rem;
  line-height: 1.5;
  flex: 1;
}

.question p, .answer p {
  margin: 0 0 0.6rem;
}

.question ul, .answer ul {
  margin: 0 0 0.6rem 1.1rem;
  padding: 0;
}

.question code, .answer code {
  background: var(--accent-soft);
  border-radius: 0.25rem;
  padding: 0.05rem 0.3rem;
  font-size: 0.95em;
}

.wikilink {
  color: var(--accent);
  font-weight: 600;
}

.hint {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--muted);
  text-align: center;
}

.controls {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
}

.controls button {
  flex: 1;
  max-width: 160px;
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  font-size: 0.95rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.controls button:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

#empty-message {
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  color: var(--muted);
}

/* Multiple choice screen */
#mc-question-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

#mc-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;
}

.mc-option {
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--ink);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.mc-option p, .mc-option ul {
  margin: 0;
}

.mc-option ul {
  padding-left: 1.1rem;
}

.mc-option code {
  background: var(--accent-soft);
  border-radius: 0.25rem;
  padding: 0.05rem 0.3rem;
  font-size: 0.95em;
}

.mc-option:hover:not(.disabled) {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.mc-option.disabled {
  cursor: default;
}

.mc-option.correct {
  border-color: #16a34a;
  background: #dcfce7;
}

.mc-option.incorrect {
  border-color: #dc2626;
  background: #fee2e2;
}

#mc-feedback {
  margin-top: 1rem;
  font-weight: 600;
}

#mc-feedback.correct {
  color: #16a34a;
}

#mc-feedback.incorrect {
  color: #dc2626;
}

#mc-question-wrap .controls {
  margin-top: 1.25rem;
}

#mc-results {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.85rem;
  padding: 2rem;
  text-align: center;
}

#mc-results h2 {
  margin: 0 0 0.5rem;
}

#mc-results p {
  color: var(--muted);
  margin: 0 0 1rem;
}

footer {
  text-align: center;
  padding: 1.25rem;
  color: var(--muted);
  font-size: 0.8rem;
  border-top: 1px solid var(--border);
}

footer p { margin: 0.15rem 0; }
`;
}

function buildAppJs() {
  return `'use strict';

(function () {
  var RANDOM_QUIZ_SIZE = ${RANDOM_QUIZ_SIZE};
  var DOMAIN_ORDER = Object.keys(QUIZ_DATA);

  // Flatten every domain's cards into one pool for "Random Quiz" mode.
  var ALL_CARDS = [];
  DOMAIN_ORDER.forEach(function (key) {
    var domain = QUIZ_DATA[key];
    domain.cards.forEach(function (card) {
      ALL_CARDS.push({
        tag: domain.label + ' \\u00b7 ' + card.topic,
        question: card.question,
        answer: card.answer
      });
    });
  });

  var domainGrid = document.getElementById('domain-grid');
  var domainScreen = document.getElementById('domain-screen');
  var quizScreen = document.getElementById('quiz-screen');
  var backBtn = document.getElementById('back-btn');
  var domainTitle = document.getElementById('domain-title');
  var progressEl = document.getElementById('progress');
  var flashcard = document.getElementById('flashcard');
  var frontTopic = document.getElementById('front-topic');
  var backTopic = document.getElementById('back-topic');
  var questionText = document.getElementById('question-text');
  var answerText = document.getElementById('answer-text');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var shuffleBtn = document.getElementById('shuffle-btn');
  var emptyMessage = document.getElementById('empty-message');
  var cardWrap = document.querySelector('.card-wrap');
  var controls = document.querySelector('.controls');
  var footerStats = document.getElementById('footer-stats');
  var randomQuizBtn = document.getElementById('random-quiz-btn');
  var randomQuizSub = document.getElementById('random-quiz-sub');

  var mcScreen = document.getElementById('mc-screen');
  var mcBackBtn = document.getElementById('mc-back-btn');
  var mcProgress = document.getElementById('mc-progress');
  var mcTopicTag = document.getElementById('mc-topic-tag');
  var mcQuestionEl = document.getElementById('mc-question');
  var mcOptions = document.getElementById('mc-options');
  var mcFeedback = document.getElementById('mc-feedback');
  var mcNextBtn = document.getElementById('mc-next-btn');
  var mcQuestionWrap = document.getElementById('mc-question-wrap');
  var mcResults = document.getElementById('mc-results');
  var mcScoreSummary = document.getElementById('mc-score-summary');
  var mcRetryBtn = document.getElementById('mc-retry-btn');
  var mcMenuBtn = document.getElementById('mc-menu-btn');
  var mcQuizBtn = document.getElementById('mc-quiz-btn');
  var mcQuizSub = document.getElementById('mc-quiz-sub');

  var state = { mode: 'domain', pool: [], index: 0, score: 0, answered: false };

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function inlineFormat(str) {
    return str
      .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
      .replace(/\`(.+?)\`/g, '<code>$1</code>')
      .replace(/\\[\\[(.+?)\\]\\]/g, '<span class="wikilink">$1</span>');
  }

  function formatText(text) {
    if (!text) return '';
    var lines = escapeHtml(text).split('\\n');
    var html = '';
    var inList = false;

    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (/^[-*]\\s+/.test(trimmed)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + inlineFormat(trimmed.replace(/^[-*]\\s+/, '')) + '</li>';
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        if (trimmed !== '') {
          html += '<p>' + inlineFormat(trimmed) + '</p>';
        }
      }
    }
    if (inList) html += '</ul>';
    return html;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function renderDomainGrid() {
    domainGrid.innerHTML = '';
    DOMAIN_ORDER.forEach(function (key) {
      var domain = QUIZ_DATA[key];
      var count = domain.cards.length;
      var card = document.createElement('button');
      card.className = 'domain-card';
      card.innerHTML =
        '<span class="domain-name">' + escapeHtml(domain.label) + '</span>' +
        '<span class="domain-count">' + count + (count === 1 ? ' card' : ' cards') + '</span>';
      card.addEventListener('click', function () { openDomain(key); });
      domainGrid.appendChild(card);
    });
  }

  function openDomain(key) {
    state.mode = 'domain';
    state.pool = QUIZ_DATA[key].cards.map(function (card) {
      return { tag: card.topic, question: card.question, answer: card.answer };
    });
    state.index = 0;
    domainScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    domainTitle.textContent = QUIZ_DATA[key].label;
    backBtn.textContent = '\\u2190 All Domains';
    shuffleBtn.textContent = 'Shuffle';
    renderCard();
  }

  function startRandomQuiz() {
    if (!ALL_CARDS.length) return;
    state.mode = 'random';
    var shuffled = shuffle(ALL_CARDS.slice());
    state.pool = shuffled.slice(0, Math.min(RANDOM_QUIZ_SIZE, shuffled.length));
    state.index = 0;
    domainScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    domainTitle.textContent = 'Random Quiz';
    backBtn.textContent = '\\u2190 Menu';
    shuffleBtn.textContent = 'New Set';
    renderCard();
  }

  function showDomainScreen() {
    quizScreen.classList.add('hidden');
    mcScreen.classList.add('hidden');
    domainScreen.classList.remove('hidden');
  }

  function buildMcQuestion(card) {
    var seen = {};
    var pool = [];
    for (var i = 0; i < ALL_CARDS.length; i++) {
      var ans = ALL_CARDS[i].answer;
      if (ans !== card.answer && !seen[ans]) {
        seen[ans] = true;
        pool.push(ans);
      }
    }
    shuffle(pool);
    var options = pool.slice(0, 3);
    options.push(card.answer);
    shuffle(options);
    return {
      tag: card.tag,
      question: card.question,
      options: options,
      correctIndex: options.indexOf(card.answer)
    };
  }

  function startMultipleChoice() {
    if (ALL_CARDS.length < 4) return;
    state.mode = 'mc';
    state.score = 0;
    state.answered = false;
    var shuffled = shuffle(ALL_CARDS.slice());
    var size = Math.min(RANDOM_QUIZ_SIZE, shuffled.length);
    state.pool = shuffled.slice(0, size).map(buildMcQuestion);
    state.index = 0;
    domainScreen.classList.add('hidden');
    mcScreen.classList.remove('hidden');
    mcResults.classList.add('hidden');
    mcQuestionWrap.classList.remove('hidden');
    renderMcQuestion();
  }

  function renderMcQuestion() {
    var q = state.pool[state.index];
    state.answered = false;

    mcTopicTag.textContent = q.tag;
    mcQuestionEl.innerHTML = formatText(q.question);
    mcProgress.textContent = 'Question ' + (state.index + 1) + ' of ' + state.pool.length + ' \\u00b7 Score: ' + state.score;
    mcFeedback.className = 'hidden';
    mcFeedback.textContent = '';
    mcNextBtn.classList.add('hidden');

    mcOptions.innerHTML = '';
    q.options.forEach(function (optText, i) {
      var btn = document.createElement('button');
      btn.className = 'mc-option';
      btn.innerHTML = formatText(optText) || '(No answer provided)';
      btn.addEventListener('click', function () { selectMcOption(i); });
      mcOptions.appendChild(btn);
    });
  }

  function selectMcOption(i) {
    if (state.answered) return;
    state.answered = true;

    var q = state.pool[state.index];
    var buttons = mcOptions.querySelectorAll('.mc-option');
    buttons.forEach(function (btn, idx) {
      btn.classList.add('disabled');
      if (idx === q.correctIndex) btn.classList.add('correct');
      else if (idx === i) btn.classList.add('incorrect');
    });

    if (i === q.correctIndex) {
      state.score += 1;
      mcFeedback.textContent = 'Correct!';
      mcFeedback.className = 'correct';
    } else {
      mcFeedback.textContent = 'Incorrect.';
      mcFeedback.className = 'incorrect';
    }

    mcProgress.textContent = 'Question ' + (state.index + 1) + ' of ' + state.pool.length + ' \\u00b7 Score: ' + state.score;
    mcNextBtn.classList.remove('hidden');
    mcNextBtn.textContent = (state.index + 1 < state.pool.length) ? 'Next \\u2192' : 'See Results';
  }

  function showMcResults() {
    mcQuestionWrap.classList.add('hidden');
    mcResults.classList.remove('hidden');
    mcScoreSummary.textContent = 'You scored ' + state.score + ' out of ' + state.pool.length + '.';
  }

  function renderCard() {
    var cards = state.pool;
    flashcard.classList.remove('flipped');

    if (cards.length === 0) {
      cardWrap.classList.add('hidden');
      controls.classList.add('hidden');
      progressEl.classList.add('hidden');
      emptyMessage.classList.remove('hidden');
      return;
    }

    cardWrap.classList.remove('hidden');
    controls.classList.remove('hidden');
    progressEl.classList.remove('hidden');
    emptyMessage.classList.add('hidden');

    var card = cards[state.index];
    frontTopic.textContent = card.tag;
    backTopic.textContent = card.tag;
    questionText.innerHTML = formatText(card.question);
    answerText.innerHTML = formatText(card.answer || '(No answer provided)');
    var label = state.mode === 'random' ? 'Question ' : 'Card ';
    progressEl.textContent = label + (state.index + 1) + ' of ' + cards.length;
  }

  flashcard.addEventListener('click', function () {
    flashcard.classList.toggle('flipped');
  });

  prevBtn.addEventListener('click', function () {
    if (!state.pool.length) return;
    state.index = (state.index - 1 + state.pool.length) % state.pool.length;
    renderCard();
  });

  nextBtn.addEventListener('click', function () {
    if (!state.pool.length) return;
    state.index = (state.index + 1) % state.pool.length;
    renderCard();
  });

  shuffleBtn.addEventListener('click', function () {
    if (state.mode === 'random') {
      var shuffled = shuffle(ALL_CARDS.slice());
      state.pool = shuffled.slice(0, Math.min(RANDOM_QUIZ_SIZE, shuffled.length));
    } else {
      shuffle(state.pool);
    }
    state.index = 0;
    renderCard();
  });

  backBtn.addEventListener('click', showDomainScreen);
  randomQuizBtn.addEventListener('click', startRandomQuiz);

  mcBackBtn.addEventListener('click', showDomainScreen);
  mcMenuBtn.addEventListener('click', showDomainScreen);
  mcQuizBtn.addEventListener('click', startMultipleChoice);
  mcRetryBtn.addEventListener('click', startMultipleChoice);
  mcNextBtn.addEventListener('click', function () {
    if (state.index + 1 < state.pool.length) {
      state.index += 1;
      renderMcQuestion();
    } else {
      showMcResults();
    }
  });

  var total = ALL_CARDS.length;
  footerStats.textContent = total + (total === 1 ? ' card' : ' cards') + ' across ' + DOMAIN_ORDER.length + ' domains';

  if (total === 0) {
    randomQuizBtn.disabled = true;
    randomQuizSub.textContent = 'No quiz cards yet. Run the ingestion workflow to generate some.';
    mcQuizBtn.disabled = true;
    mcQuizSub.textContent = 'No quiz cards yet. Run the ingestion workflow to generate some.';
  } else {
    var quizSize = Math.min(RANDOM_QUIZ_SIZE, total);
    randomQuizSub.textContent = quizSize + (quizSize === 1 ? ' question' : ' questions') +
      ' picked at random from ' + total + ' total, across ' + DOMAIN_ORDER.length + ' domains.';

    if (total < 4) {
      mcQuizBtn.disabled = true;
      mcQuizSub.textContent = 'Need at least 4 cards with distinct answers for multiple choice.';
    } else {
      var mcSize = Math.min(RANDOM_QUIZ_SIZE, total);
      mcQuizSub.textContent = mcSize + (mcSize === 1 ? ' question' : ' questions') +
        ' with 4 answer choices each, picked at random from ' + total + ' total.';
    }
  }

  renderDomainGrid();
})();
`;
}

function buildQuizDataJs(data) {
  const dataJson = JSON.stringify(data, null, 2);
  return `var QUIZ_DATA = ${dataJson};\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const data = collectQuizData();
  const generatedAt = new Date().toISOString();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_HTML, buildIndexHtml(generatedAt), 'utf8');
  fs.writeFileSync(OUTPUT_CSS, buildStyleCss(), 'utf8');
  fs.writeFileSync(OUTPUT_APP_JS, buildAppJs(), 'utf8');
  fs.writeFileSync(OUTPUT_DATA_JS, buildQuizDataJs(data), 'utf8');

  let total = 0;
  console.log('FRM Part 2 Quiz Engine - build summary');
  console.log('---------------------------------------');
  for (const domain of DOMAIN_ORDER) {
    const count = data[domain].cards.length;
    total += count;
    console.log(`  ${data[domain].label.padEnd(32)} ${count} card(s)`);
  }
  console.log('---------------------------------------');
  console.log(`  Total: ${total} card(s)`);
  console.log(`  Random Quiz pool: ${Math.min(RANDOM_QUIZ_SIZE, total)} of ${RANDOM_QUIZ_SIZE} question(s)`);
  console.log('\nWrote:');
  for (const f of [OUTPUT_HTML, OUTPUT_CSS, OUTPUT_APP_JS, OUTPUT_DATA_JS]) {
    console.log(`  ${path.relative(ROOT_DIR, f)}`);
  }
}

main();
