(() => {
  const PROGRESS_KEY = "frm-study-guide-progress";
  const el = (id) => document.getElementById(id);

  let manifest = null;
  let lessonsByTopic = {}; // topic -> [lessonData, ...]
  let flatStepsByTopic = {}; // topic -> [step, ...]
  let progress = {};

  let currentTopic = null;
  let currentIndex = -1;

  function loadProgress() {
    try {
      progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch {
      progress = {};
    }
  }

  function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }

  function stepKey(step) {
    return `${step.topic}/${step.lesson}/${step.id}`;
  }

  function isDone(step) {
    return !!progress[stepKey(step)];
  }

  async function loadManifest() {
    const res = await fetch("manifest.json");
    manifest = await res.json();
  }

  async function loadAllLessons() {
    for (const topic of Object.keys(manifest)) {
      const lessons = manifest[topic].lessons || [];
      if (!lessons.length) continue;
      lessonsByTopic[topic] = await Promise.all(
        lessons.map((l) => fetch(l.file).then((r) => r.json()))
      );
      flatStepsByTopic[topic] = buildFlatSteps(topic, lessonsByTopic[topic]);
    }
  }

  function buildFlatSteps(topic, lessons) {
    const steps = [];
    for (const lesson of lessons) {
      steps.push({
        topic,
        lesson: lesson.lesson,
        id: "intro",
        kind: "intro",
        badge: `Reading ${lesson.lesson} — Overview`,
        title: lesson.title,
        why: lesson.intro.why,
        content: lesson.intro.content || "",
      });
      for (const lo of lesson.los) {
        steps.push({
          topic,
          lesson: lesson.lesson,
          id: lo.id,
          kind: "lo",
          badge: lo.lo,
          title: lo.title,
          why: lo.why,
          keyIdea: lo.keyIdea,
          content: lo.content || "",
          formula: lo.formula || "",
          takeaways: lo.takeaways || [],
        });
      }
    }
    return steps;
  }

  function lessonSteps(topic, lessonNumber) {
    return flatStepsByTopic[topic].filter((s) => s.lesson === lessonNumber);
  }

  function lessonProgress(topic, lessonNumber) {
    const steps = lessonSteps(topic, lessonNumber);
    const done = steps.filter(isDone).length;
    return { done, total: steps.length };
  }

  // ---------- Sidebar ----------

  function renderSidebar() {
    const sidebar = el("sidebar");
    sidebar.innerHTML = "";

    for (const topic of Object.keys(manifest)) {
      const steps = flatStepsByTopic[topic];
      if (!steps || !steps.length) continue;

      const topicHeading = document.createElement("p");
      topicHeading.className = "sidebar-topic";
      topicHeading.textContent = manifest[topic].title;
      sidebar.appendChild(topicHeading);

      for (const lesson of lessonsByTopic[topic]) {
        const wrap = document.createElement("div");
        wrap.className = "sidebar-lesson";

        const introIndex = steps.findIndex(
          (s) => s.lesson === lesson.lesson && s.id === "intro"
        );

        const titleBtn = document.createElement("button");
        titleBtn.type = "button";
        titleBtn.className = "sidebar-lesson-title";
        titleBtn.textContent = `R${lesson.lesson} — ${lesson.title}`;
        titleBtn.addEventListener("click", () => showStep(topic, introIndex));
        wrap.appendChild(titleBtn);

        const list = document.createElement("ul");
        list.className = "sidebar-steps";

        steps.forEach((step, index) => {
          if (step.lesson !== lesson.lesson) return;

          const li = document.createElement("li");
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "sidebar-step";
          btn.dataset.topic = topic;
          btn.dataset.index = String(index);

          const check = document.createElement("span");
          check.className = "sidebar-check";
          check.textContent = isDone(step) ? "✓" : "○";

          const label = document.createElement("span");
          label.textContent =
            step.kind === "intro" ? "Overview" : `LO ${step.id} — ${step.title}`;

          btn.appendChild(check);
          btn.appendChild(label);
          if (isDone(step)) btn.classList.add("done");

          btn.addEventListener("click", () => showStep(topic, index));
          li.appendChild(btn);
          list.appendChild(li);
        });

        wrap.appendChild(list);
        sidebar.appendChild(wrap);
      }
    }

    updateSidebarState();
  }

  function updateSidebarState() {
    document.querySelectorAll(".sidebar-step").forEach((btn) => {
      const topic = btn.dataset.topic;
      const index = Number(btn.dataset.index);
      const step = flatStepsByTopic[topic][index];
      const done = isDone(step);
      btn.classList.toggle("done", done);
      btn.classList.toggle("active", topic === currentTopic && index === currentIndex);
      btn.querySelector(".sidebar-check").textContent = done ? "✓" : "○";
    });
  }

  // ---------- Home view ----------

  function renderHome() {
    currentTopic = null;
    currentIndex = -1;

    el("step-view").hidden = true;
    const home = el("home-view");
    home.hidden = false;
    home.innerHTML = "";

    const intro = document.createElement("p");
    intro.className = "home-intro";
    intro.textContent =
      "Work through each reading's learning outcomes one at a time. Each step " +
      "opens with why the idea matters, then a deeper walkthrough, then the key " +
      "things to remember. Mark a step as understood to track your progress " +
      "— saved locally in this browser.";
    home.appendChild(intro);

    for (const topic of Object.keys(manifest)) {
      const lessons = lessonsByTopic[topic];
      if (!lessons || !lessons.length) continue;

      const section = document.createElement("section");
      section.className = "topic-section";

      const h2 = document.createElement("h2");
      h2.textContent = manifest[topic].title;
      section.appendChild(h2);

      const cards = document.createElement("div");
      cards.className = "lesson-cards";

      for (const lesson of lessons) {
        const { done, total } = lessonProgress(topic, lesson.lesson);
        const pct = total ? Math.round((done / total) * 100) : 0;

        const card = document.createElement("div");
        card.className = "lesson-card";

        const info = document.createElement("div");
        info.className = "lesson-card-info";

        const h3 = document.createElement("h3");
        h3.textContent = `R${lesson.lesson} — ${lesson.title}`;

        const p = document.createElement("p");
        p.className = "lesson-card-progress";
        p.textContent = `${done} / ${total} steps complete`;

        const bar = document.createElement("div");
        bar.className = "lesson-card-bar";
        const fill = document.createElement("div");
        fill.className = "lesson-card-bar-fill";
        fill.style.width = `${pct}%`;
        bar.appendChild(fill);

        info.appendChild(h3);
        info.appendChild(p);
        info.appendChild(bar);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lesson-card-btn";
        btn.textContent = done === 0 ? "Start" : done === total ? "Review" : "Continue";
        btn.addEventListener("click", () => {
          const steps = flatStepsByTopic[topic];
          let target = steps.findIndex((s) => s.lesson === lesson.lesson && !isDone(s));
          if (target === -1) {
            target = steps.findIndex((s) => s.lesson === lesson.lesson);
          }
          showStep(topic, target);
        });

        card.appendChild(info);
        card.appendChild(btn);
        cards.appendChild(card);
      }

      section.appendChild(cards);
      home.appendChild(section);
    }
  }

  // ---------- Step view ----------

  function showStep(topic, index) {
    currentTopic = topic;
    currentIndex = index;

    const steps = flatStepsByTopic[topic];
    const step = steps[index];
    const lessonTitle = lessonsByTopic[topic].find((l) => l.lesson === step.lesson).title;

    el("home-view").hidden = true;
    el("step-view").hidden = false;

    el("step-breadcrumb").textContent =
      `${manifest[topic].title} › R${step.lesson} — ${lessonTitle}`;
    el("step-badge").textContent = step.badge;
    el("step-title").textContent = step.title;
    el("step-why").textContent = step.why;

    const keyIdea = el("step-key-idea");
    if (step.keyIdea) {
      keyIdea.hidden = false;
      keyIdea.textContent = step.keyIdea;
    } else {
      keyIdea.hidden = true;
    }

    el("step-content").innerHTML = step.content;

    const formulaWrap = el("step-formula");
    if (step.formula) {
      formulaWrap.innerHTML = step.formula;
      formulaWrap.hidden = false;
    } else {
      formulaWrap.innerHTML = "";
      formulaWrap.hidden = true;
    }

    const takeawaysSection = el("takeaways-section");
    const takeawaysList = el("takeaways-list");
    takeawaysList.innerHTML = "";
    if (step.takeaways && step.takeaways.length) {
      takeawaysSection.hidden = false;
      for (const t of step.takeaways) {
        const li = document.createElement("li");
        li.textContent = t;
        takeawaysList.appendChild(li);
      }
    } else {
      takeawaysSection.hidden = true;
    }

    el("mark-done-checkbox").checked = isDone(step);

    el("prev-btn").disabled = index === 0;
    el("next-btn").disabled = index === steps.length - 1;

    updateProgressBar();
    updateSidebarState();
    window.scrollTo(0, 0);
  }

  function updateProgressBar() {
    const steps = flatStepsByTopic[currentTopic];
    const completed = steps.filter(isDone).length;
    el("progress-fill").style.width = `${Math.round((completed / steps.length) * 100)}%`;
  }

  // ---------- Init ----------

  async function init() {
    loadProgress();
    await loadManifest();
    await loadAllLessons();
    renderSidebar();
    renderHome();

    el("home-btn").addEventListener("click", renderHome);

    el("prev-btn").addEventListener("click", () => {
      if (currentIndex > 0) showStep(currentTopic, currentIndex - 1);
    });

    el("next-btn").addEventListener("click", () => {
      const steps = flatStepsByTopic[currentTopic];
      if (currentIndex < steps.length - 1) showStep(currentTopic, currentIndex + 1);
    });

    el("mark-done-checkbox").addEventListener("change", (e) => {
      const step = flatStepsByTopic[currentTopic][currentIndex];
      const key = stepKey(step);
      if (e.target.checked) {
        progress[key] = true;
      } else {
        delete progress[key];
      }
      saveProgress();
      updateSidebarState();
      updateProgressBar();
    });

    el("reset-progress-btn").addEventListener("click", () => {
      if (!confirm("Reset all study guide progress? This cannot be undone.")) return;
      progress = {};
      saveProgress();
      updateSidebarState();
      if (currentTopic) {
        el("mark-done-checkbox").checked = false;
        updateProgressBar();
      }
      renderHome();
    });
  }

  init();
})();
