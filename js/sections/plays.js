/* =========================================================
   Las jugadas que hicieron historia: destacada con reproductor,
   filtros por tipo, buscador, favoritos y fichas detalladas.
   ========================================================= */
F1.sections.plays = (function () {
  const { $, esc, norm, debounce } = F1.u;
  const { href } = F1.ui;
  const T = F1.data.playTypes;
  const t = F1.t;
  const state = { type: "all", q: "" };
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);
  const names = (p) => p.drivers.map((id) => F1.drv.name(id)).join(", ");

  function featured() {
    const p = F1.data.plays.find((x) => x.featured) || F1.data.plays[0];
    const host = $("#playFeature");
    host.innerHTML = `
      <div class="feature-video"></div>
      <div class="feature-body">
        <span class="tag gold">★ ${t("Jugada destacada")} · ${p.year}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <dl class="kv"><dt>${t("Pilotos")}</dt><dd>${esc(names(p))}</dd><dt>${t("Circuito")}</dt><dd>${esc(p.circuit)}</dd><dt>${t("Resultado")}</dt><dd>${esc(p.result)}</dd></dl>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><a class="btn btn-primary btn-sm" href="${href.play(p.id)}">${t("Ficha completa")} →</a>${F1.ui.favBtn("play", p.id, p.title, "inline")}</div>
      </div>`;
    host.querySelector(".feature-video").replaceWith(F1.video.node({ ids: p.video, title: p.title, sub: `${p.circuit} · ${p.year}` }));
  }

  function match(p) {
    if (state.type === "fav" && !F1.favs.has("play", p.id)) return false;
    if (!["all", "fav"].includes(state.type) && !p.types.includes(state.type)) return false;
    if (state.q) {
      const hay = norm(`${p.title} ${names(p)} ${p.circuit} ${p.year} ${p.desc} ${p.context}`);
      if (!norm(state.q).split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  }

  function render() {
    const grid = $("#playGrid");
    const list = F1.data.plays.filter(match).sort((a, b) => b.rating - a.rating || a.year - b.year);
    grid.innerHTML = "";
    $("#playCount").textContent = t("{n} jugadas", { n: list.length });
    list.forEach((p, i) => {
      const card = F1.u.el(`
        <article class="card clickable reveal" tabindex="0" role="link" aria-label="${t("Ficha")}: ${esc(p.title)}" style="transition-delay:${Math.min(i, 6) * 50}ms">
          <span class="year-pill">${p.year}</span>
          ${F1.ui.favBtn("play", p.id, p.title)}
          <div class="card-body">
            <div style="display:flex;gap:6px;flex-wrap:wrap">${p.types.map((t) => `<span class="tag">${esc(T[t])}</span>`).join("")}</div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.desc)}</p>
            <div class="card-foot"><span>${esc(p.circuit)}</span><span style="color:var(--gold)" aria-label="${p.rating}/5">${stars(p.rating)}</span></div>
          </div>
        </article>`);
      const m = F1.media.el(p.img, { w: 500, alt: p.title });
      m.insertAdjacentHTML("beforeend", `<span class="play-btn" style="width:56px;height:56px;z-index:2" aria-hidden="true"></span>`);
      card.prepend(m);
      const go = () => F1.u.go(href.play(p.id));
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      grid.appendChild(card);
    });
    $("#playEmpty").hidden = list.length > 0;
    $("#playEmpty").textContent = t(state.type === "fav" && !state.q ? "Aún no tienes jugadas favoritas. Pulsa ☆ en cualquier tarjeta." : "No hay jugadas que coincidan con tu búsqueda.");
    F1.u.reveal(grid);
  }

  function init() {
    const opts = Object.entries(T).map(([v, l]) => ({ v, l })).concat([{ v: "fav", l: "★ " + t("Favoritas") }]);
    $("#plays").innerHTML = `
      <article class="feature" id="playFeature"></article>
      <div class="toolbar">
        <div id="playChips">${F1.ui.chips(opts, { name: t("Tipo de jugada"), allLabel: "Todas" })}</div>
        <div class="filters-row">${F1.ui.searchField("playSearch", "Buscar: Senna, 2021, lluvia…")}<span class="count-label" id="playCount"></span></div>
      </div>
      <div class="grid" id="playGrid"></div>
      <p class="empty" id="playEmpty" hidden></p>`;
    featured();
    F1.ui.bindChips($("#playChips"), (v) => { state.type = v; render(); });
    $("#playSearch").addEventListener("input", debounce((e) => { state.q = e.target.value; render(); }, 180));
    F1.favs.onChange(() => { if (state.type === "fav") render(); });
    render();
  }
  return { init };
})();
