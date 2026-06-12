'use strict';

(function () {
  var RANDOM_QUIZ_SIZE = 30;
  var DOMAIN_ORDER = Object.keys(QUIZ_DATA);

  // Flatten every domain's cards into one pool for "Random Quiz" mode.
  var ALL_CARDS = [];
  DOMAIN_ORDER.forEach(function (key) {
    var domain = QUIZ_DATA[key];
    domain.cards.forEach(function (card) {
      ALL_CARDS.push({
        tag: domain.label + ' \u00b7 ' + card.topic,
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
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[\[(.+?)\]\]/g, '<span class="wikilink">$1</span>');
  }

  function formatText(text) {
    if (!text) return '';
    var lines = escapeHtml(text).split('\n');
    var html = '';
    var inList = false;

    for (var i = 0; i < lines.length; i++) {
      var trimmed = lines[i].trim();
      if (/^[-*]\s+/.test(trimmed)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + inlineFormat(trimmed.replace(/^[-*]\s+/, '')) + '</li>';
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
    backBtn.textContent = '\u2190 All Domains';
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
    backBtn.textContent = '\u2190 Menu';
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
    mcProgress.textContent = 'Question ' + (state.index + 1) + ' of ' + state.pool.length + ' \u00b7 Score: ' + state.score;
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

    mcProgress.textContent = 'Question ' + (state.index + 1) + ' of ' + state.pool.length + ' \u00b7 Score: ' + state.score;
    mcNextBtn.classList.remove('hidden');
    mcNextBtn.textContent = (state.index + 1 < state.pool.length) ? 'Next \u2192' : 'See Results';
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
