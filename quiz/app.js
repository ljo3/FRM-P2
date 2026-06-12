(() => {
  const TOPIC_NAMES = {
    "market-risk": "Market Risk Measurement and Management",
    "credit-risk": "Credit Risk Measurement and Management",
    "operational-risk": "Operational Risk and Resilience",
    "liquidity-treasury": "Liquidity and Treasury Risk Measurement and Management",
    "investment-management": "Risk Management and Investment Management",
    "current-issues": "Current Issues in Financial Markets",
  };

  const TOPIC_ORDER = [
    "market-risk",
    "credit-risk",
    "operational-risk",
    "liquidity-treasury",
    "investment-management",
    "current-issues",
  ];

  let manifest = null;
  const lessonCache = new Map();

  let cardsDeck = [];
  let cardIndex = 0;

  let quizPool = [];
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  const el = (id) => document.getElementById(id);

  async function loadManifest() {
    const res = await fetch("data/manifest.json");
    manifest = await res.json();
  }

  async function loadLesson(file) {
    if (lessonCache.has(file)) return lessonCache.get(file);
    const res = await fetch(file);
    const data = await res.json();
    lessonCache.set(file, data);
    return data;
  }

  function hasAnyLessons() {
    return TOPIC_ORDER.some((t) => (manifest[t] || []).length > 0);
  }

  function topicsWithLessons() {
    return TOPIC_ORDER.filter((t) => (manifest[t] || []).length > 0);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function setupModeSwitcher() {
    const buttons = document.querySelectorAll(".mode-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.mode;
        el("cards-view").hidden = mode !== "cards";
        el("quiz-view").hidden = mode !== "quiz";
      });
    });
  }

  // ---- Study Cards mode ----

  function populateCardsControls() {
    const topicSelect = el("cards-topic");
    topicSelect.innerHTML = "";

    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = "All topics";
    topicSelect.appendChild(allOpt);

    topicsWithLessons().forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = TOPIC_NAMES[code];
      topicSelect.appendChild(opt);
    });

    topicSelect.addEventListener("change", () => {
      populateCardsLessonSelect();
      refreshCards();
    });

    el("cards-lesson").addEventListener("change", refreshCards);
    populateCardsLessonSelect();

    el("cards-shuffle").addEventListener("click", () => {
      cardsDeck = shuffle(cardsDeck);
      cardIndex = 0;
      showCard();
    });

    el("card-prev").addEventListener("click", () => {
      if (!cardsDeck.length) return;
      cardIndex = (cardIndex - 1 + cardsDeck.length) % cardsDeck.length;
      showCard();
    });

    el("card-next").addEventListener("click", () => {
      if (!cardsDeck.length) return;
      cardIndex = (cardIndex + 1) % cardsDeck.length;
      showCard();
    });

    const flashcard = el("flashcard");
    flashcard.addEventListener("click", flipCard);
    flashcard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flipCard();
      }
    });
  }

  function populateCardsLessonSelect() {
    const topic = el("cards-topic").value;
    const lessonSelect = el("cards-lesson");
    lessonSelect.innerHTML = "";

    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = "All lessons";
    lessonSelect.appendChild(allOpt);

    if (topic !== "ALL") {
      (manifest[topic] || [])
        .slice()
        .sort((a, b) => a.lesson - b.lesson)
        .forEach((entry) => {
          const opt = document.createElement("option");
          opt.value = String(entry.lesson);
          opt.textContent = `Lesson ${entry.lesson}: ${entry.title}`;
          lessonSelect.appendChild(opt);
        });
    }
  }

  function flipCard() {
    if (!cardsDeck.length) return;
    const card = el("flashcard");
    card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(card.classList.contains("flipped")));
  }

  async function refreshCards() {
    const topic = el("cards-topic").value;
    const lesson = el("cards-lesson").value;

    let files = [];
    if (topic === "ALL") {
      TOPIC_ORDER.forEach((t) => {
        (manifest[t] || []).forEach((entry) => files.push(entry.file));
      });
    } else {
      (manifest[topic] || []).forEach((entry) => {
        if (lesson === "ALL" || String(entry.lesson) === lesson) {
          files.push(entry.file);
        }
      });
    }

    const lessons = await Promise.all(files.map(loadLesson));
    cardsDeck = [];
    lessons.forEach((l) => {
      (l.flashcards || []).forEach((fc) => {
        cardsDeck.push({ ...fc, topic: l.topic, lesson: l.lesson });
      });
    });

    cardIndex = 0;
    el("flashcard").classList.remove("flipped");

    if (cardsDeck.length === 0) {
      el("cards-deck").hidden = true;
      el("cards-empty").hidden = false;
    } else {
      el("cards-deck").hidden = false;
      el("cards-empty").hidden = true;
      showCard();
    }
  }

  function showCard() {
    const card = el("flashcard");
    card.classList.remove("flipped");
    card.setAttribute("aria-pressed", "false");

    const data = cardsDeck[cardIndex];
    el("flashcard-front").textContent = data.front;
    el("flashcard-back").textContent = data.back;
    el("card-counter").textContent = `Card ${cardIndex + 1} of ${cardsDeck.length}`;
  }

  // ---- Quiz mode ----

  function populateQuizScope() {
    const scopeSelect = el("quiz-scope");
    scopeSelect.innerHTML = "";

    const allOpt = document.createElement("option");
    allOpt.value = "ALL";
    allOpt.textContent = "Everything so far";
    scopeSelect.appendChild(allOpt);

    topicsWithLessons().forEach((code) => {
      const topicOpt = document.createElement("option");
      topicOpt.value = `TOPIC:${code}`;
      topicOpt.textContent = `${TOPIC_NAMES[code]} — all lessons`;
      scopeSelect.appendChild(topicOpt);

      (manifest[code] || [])
        .slice()
        .sort((a, b) => a.lesson - b.lesson)
        .forEach((entry) => {
          const opt = document.createElement("option");
          opt.value = `LESSON:${code}:${entry.lesson}`;
          opt.textContent = `${TOPIC_NAMES[code]} — Lesson ${entry.lesson}: ${entry.title}`;
          scopeSelect.appendChild(opt);
        });
    });

    el("quiz-start").addEventListener("click", startQuiz);
    el("quiz-next").addEventListener("click", nextQuestion);
    el("quiz-restart").addEventListener("click", () => {
      el("quiz-results").hidden = true;
      el("quiz-question-area").hidden = true;
      el("quiz-empty").hidden = true;
    });
  }

  async function gatherQuestions(scope) {
    let files = [];

    if (scope === "ALL") {
      TOPIC_ORDER.forEach((t) => {
        (manifest[t] || []).forEach((entry) => files.push(entry.file));
      });
    } else if (scope.startsWith("TOPIC:")) {
      const code = scope.split(":")[1];
      (manifest[code] || []).forEach((entry) => files.push(entry.file));
    } else if (scope.startsWith("LESSON:")) {
      const [, code, num] = scope.split(":");
      const entry = (manifest[code] || []).find((e) => String(e.lesson) === num);
      if (entry) files.push(entry.file);
    }

    const lessons = await Promise.all(files.map(loadLesson));
    const pool = [];
    lessons.forEach((l) => {
      (l.questions || []).forEach((q) => {
        pool.push({ ...q, topic: l.topic, lesson: l.lesson });
      });
    });
    return pool;
  }

  async function startQuiz() {
    const scope = el("quiz-scope").value;
    quizPool = shuffle(await gatherQuestions(scope));
    quizIndex = 0;
    quizScore = 0;

    el("quiz-results").hidden = true;

    if (quizPool.length === 0) {
      el("quiz-question-area").hidden = true;
      el("quiz-empty").hidden = false;
      return;
    }

    el("quiz-empty").hidden = true;
    el("quiz-question-area").hidden = false;
    showQuestion();
  }

  function showQuestion() {
    quizAnswered = false;
    const q = quizPool[quizIndex];

    el("quiz-progress").textContent = `Question ${quizIndex + 1} of ${quizPool.length}`;
    el("quiz-score-running").textContent = `Score: ${quizScore} / ${quizIndex}`;
    el("quiz-question").textContent = q.q;

    const choicesEl = el("quiz-choices");
    choicesEl.innerHTML = "";
    q.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = choice;
      btn.addEventListener("click", () => selectChoice(idx));
      choicesEl.appendChild(btn);
    });

    el("quiz-feedback").hidden = true;
    el("quiz-feedback").className = "quiz-feedback";
    el("quiz-next").hidden = true;
  }

  function selectChoice(idx) {
    if (quizAnswered) return;
    quizAnswered = true;

    const q = quizPool[quizIndex];
    const correct = idx === q.answer;
    if (correct) quizScore++;

    el("quiz-choices").querySelectorAll(".choice-btn").forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.answer) btn.classList.add("correct");
      else if (i === idx) btn.classList.add("incorrect");
    });

    const feedback = el("quiz-feedback");
    feedback.hidden = false;
    feedback.className = `quiz-feedback ${correct ? "correct" : "incorrect"}`;
    feedback.innerHTML = "";

    const label = document.createElement("span");
    label.className = "feedback-label";
    label.textContent = correct ? "Correct" : "Incorrect";
    feedback.appendChild(label);

    const explanation = document.createElement("span");
    explanation.textContent = q.explanation || "";
    feedback.appendChild(explanation);

    el("quiz-score-running").textContent = `Score: ${quizScore} / ${quizIndex + 1}`;

    const nextBtn = el("quiz-next");
    nextBtn.hidden = false;
    nextBtn.textContent = quizIndex + 1 < quizPool.length ? "Next Question" : "See Results";
  }

  function nextQuestion() {
    quizIndex++;
    if (quizIndex >= quizPool.length) {
      showResults();
    } else {
      showQuestion();
    }
  }

  function showResults() {
    el("quiz-question-area").hidden = true;
    el("quiz-results").hidden = false;
    el("quiz-score-final").textContent = `You scored ${quizScore} / ${quizPool.length}`;
  }

  // ---- Init ----

  async function init() {
    await loadManifest();

    if (!hasAnyLessons()) {
      el("empty-state").hidden = false;
      return;
    }

    el("mode-switch").hidden = false;
    el("cards-view").hidden = false;

    populateCardsControls();
    populateQuizScope();
    setupModeSwitcher();
    await refreshCards();
  }

  init();
})();
