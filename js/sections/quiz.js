/* =========================================================
   Quiz: niveles, categorías, preguntas aleatorias, explicación,
   récord personal (localStorage) y pantalla de resultado animada.
   ========================================================= */
F1.sections.quiz = (function () {
  const { $, $$, esc } = F1.u;
  const t = F1.t;
  const LV = { 1: t("Principiante"), 2: t("Intermedio"), 3: t("Experto") };
  let cfg = { lvl: "1", cat: "all" }, qs = [], i = 0, score = 0;

  const shuffle = (a) => { const b = a.slice(); for (let k = b.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [b[k], b[j]] = [b[j], b[k]]; } return b; };
  const recKey = () => `quiz-rec-${cfg.lvl}-${cfg.cat}`;

  function setup() {
    const host = $("#quizApp");
    const cats = Object.entries(F1.data.quizCats).map(([v, l]) => ({ v, l }));
    host.innerHTML = `
      <div class="quiz-card"><div class="quiz-setup">
        <p class="tele-label red">${t("Configura tu partida")}</p>
        <div><p class="small muted" style="margin-bottom:8px">${t("Nivel")}</p><div id="qLvl">${F1.ui.chips(Object.entries(LV).map(([v, l]) => ({ v, l })), { name: t("Nivel"), value: cfg.lvl, allLabel: "" })}</div></div>
        <div><p class="small muted" style="margin-bottom:8px">${t("Categoría")}</p><div id="qCat">${F1.ui.chips(cats, { name: t("Categoría"), value: cfg.cat, allLabel: "Todas" })}</div></div>
        <p class="small" id="qInfo"></p>
        <div><button class="btn btn-primary" id="qStart">${t("Empezar")} <span>→</span></button></div>
      </div></div>`;
    const info = () => {
      const pool = F1.data.quiz.filter((q) => q.lvl <= +cfg.lvl && (cfg.cat === "all" || q.cat === cfg.cat));
      const rec = F1.store.get(recKey(), null);
      $("#qInfo").innerHTML = `${t("{a} preguntas aleatorias de un banco de {b}.", { a: Math.min(pool.length, 10), b: pool.length })} ${rec ? `${t("Tu récord")}: <b>${rec.s}/${rec.n}</b>` : t("Aún no tienes récord en esta combinación.")}`;
      $("#qStart").disabled = !pool.length;
    };
    F1.ui.bindChips($("#qLvl"), (v) => { cfg.lvl = v; info(); });
    F1.ui.bindChips($("#qCat"), (v) => { cfg.cat = v; info(); });
    $("#qStart").addEventListener("click", start);
    info();
  }

  function start() {
    const pool = F1.data.quiz.filter((q) => q.lvl <= +cfg.lvl && (cfg.cat === "all" || q.cat === cfg.cat));
    // Prioriza preguntas del nivel elegido
    const main = shuffle(pool.filter((q) => q.lvl === +cfg.lvl)), rest = shuffle(pool.filter((q) => q.lvl !== +cfg.lvl));
    qs = main.concat(rest).slice(0, 10).map((q) => {
      const order = shuffle(q.o.map((_, k) => k));
      return { ...q, o: order.map((k) => q.o[k]), a: order.indexOf(q.a) };
    });
    i = 0; score = 0;
    ask();
  }

  function ask() {
    if (i >= qs.length) return result();
    const q = qs[i];
    $("#quizApp").innerHTML = `
      <div class="quiz-card">
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span class="tele-label">${esc(LV[q.lvl])} · ${esc(F1.data.quizCats[q.cat])}</span><span class="tele-label">${t("Pregunta")} ${i + 1}/${qs.length} · ${t("Aciertos")} ${score}</span></div>
        <div class="quiz-progress"><i style="width:${(i / qs.length) * 100}%"></i></div>
        <p class="quiz-q">${esc(q.q)}</p>
        <div class="quiz-opts">${q.o.map((o, k) => `<button class="quiz-opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
        <div id="qExp"></div>
      </div>`;
    $$(".quiz-opt").forEach((b) => b.addEventListener("click", () => {
      const k = +b.dataset.k;
      $$(".quiz-opt").forEach((x) => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("right"); });
      if (k === q.a) score++; else b.classList.add("wrong");
      $("#qExp").innerHTML = `<div class="quiz-exp"><b>${t(k === q.a ? "✔ ¡Correcto!" : "✘ Incorrecto.")}</b> ${esc(q.e)}</div>
        <button class="btn btn-primary btn-sm" id="qNext" style="margin-top:14px">${t(i + 1 < qs.length ? "Siguiente" : "Ver resultado")} <span>→</span></button>`;
      $("#qNext").focus();
      $("#qNext").addEventListener("click", () => { i++; ask(); });
    }));
  }

  function result() {
    const pct = Math.round((score / qs.length) * 100);
    const prev = F1.store.get(recKey(), null);
    const isRec = !prev || score / qs.length > prev.s / prev.n;
    if (isRec) F1.store.set(recKey(), { s: score, n: qs.length, d: Date.now() });
    const msg = t(pct === 100 ? "¡Campeón del mundo! 🏆" : pct >= 70 ? "¡Al podio! 🥈" : pct >= 40 ? "Zona de puntos 🏁" : "Toca volver a boxes 🔧");
    $("#quizApp").innerHTML = `
      <div class="quiz-card" style="position:relative;overflow:hidden">
        <div class="confetti" aria-hidden="true"></div>
        <div class="quiz-result">
          <span class="tele-label red">${esc(LV[cfg.lvl])} · ${cfg.cat === "all" ? t("Todas las categorías") : esc(F1.data.quizCats[cfg.cat])}</span>
          <div class="ring" style="--p:0"><b>${score}/${qs.length}</b></div>
          <h3>${msg}</h3>
          <p class="muted">${isRec ? t("🎉 ¡Nuevo récord personal!") : `${t("Tu récord")}: ${prev.s}/${prev.n}`}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn btn-primary" id="qAgain">${t("Jugar otra vez")}</button><button class="btn btn-ghost" id="qCfg">${t("Cambiar nivel")}</button></div>
        </div>
      </div>`;
    // Anillo animado
    const ring = $(".ring"); let p = 0;
    const step = () => { p = Math.min(pct, p + 2); ring.style.setProperty("--p", p); if (p < pct) requestAnimationFrame(step); };
    requestAnimationFrame(step);
    if (pct >= 70 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const c = $(".confetti");
      const colors = ["#E10600", "#C9A227", "#F4F1EA", "#2E9BFF"];
      for (let k = 0; k < 40; k++) c.insertAdjacentHTML("beforeend", `<i style="left:${Math.random() * 100}%;background:${colors[k % 4]};animation-delay:${Math.random() * .8}s"></i>`);
    }
    $("#qAgain").addEventListener("click", start);
    $("#qCfg").addEventListener("click", setup);
  }

  return { init: setup };
})();
