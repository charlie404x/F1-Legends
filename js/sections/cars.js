/* Legendary Cars: museo con filtros por era y escudería. */
F1.sections.cars = (function () {
  const { $, esc, uniq, decadeOf } = F1.u;
  const { href } = F1.ui;
  const t = F1.t;
  const state = { era: "", team: "" };

  function render() {
    const grid = $("#carGrid");
    grid.innerHTML = "";
    F1.data.cars.filter((c) => (!state.era || decadeOf(c.year) === +state.era) && (!state.team || c.team === state.team)).forEach((c, i) => {
      const tm = F1.team.get(c.team);
      const card = F1.u.el(`
        <article class="card clickable car-card reveal" tabindex="0" role="link" aria-label="${t("Ficha de {n}", { n: esc(c.name) })}" style="transition-delay:${Math.min(i, 8) * 40}ms">
          <span class="year-pill">${esc(c.seasons)}</span>
          ${F1.ui.favBtn("car", c.key, c.name)}
          <div class="card-body">
            <span class="car-team">${F1.ui.teamLogo(tm, 26, { year: c.year }) || ""}<span class="tele-label" style="color:${tm?.color}">${esc(tm?.short || c.team)}</span></span>
            <h3>${esc(c.name)}</h3>
            <p class="spec-line">${esc(c.engine)}</p>
            <p>${esc(c.story)}</p>
            <div class="card-foot">${c.titles ? `<span class="tag gold">${esc(c.titles.split(";")[0])}</span>` : `<span class="tag neutral">${t("Innovación")}</span>`}</div>
          </div>
        </article>`);
      card.prepend(F1.media.el(c.img, { w: 500, alt: c.name }));
      const go = () => F1.u.go(href.car(c.key));
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      grid.appendChild(card);
    });
    F1.u.reveal(grid);
  }

  function init() {
    const eras = uniq(F1.data.cars.map((c) => decadeOf(c.year))).map((d) => ({ v: String(d), l: `${d}s` }));
    const teams = uniq(F1.data.cars.map((c) => c.team)).map((t) => ({ v: t, l: F1.team.name(t) }));
    $("#carsMuseum").innerHTML = `
      <div class="toolbar"><div class="filters-row">${F1.ui.select("carEra", eras, "Todas las épocas")}${F1.ui.select("carTeam", teams, "Todas las escuderías")}</div>
      <a class="btn btn-ghost btn-sm" href="${F1.page("comparador", { tab: "cars" })}">${t("Comparar monoplazas")} →</a></div>
      <div class="grid" id="carGrid"></div>
      <p class="note">${t("Potencias: cifras aproximadas citadas habitualmente; los equipos rara vez publican datos oficiales. Los datos no documentados se indican como tales.")}</p>`;
    $("#carEra").addEventListener("change", (e) => { state.era = e.target.value; render(); });
    $("#carTeam").addEventListener("change", (e) => { state.team = e.target.value; render(); });
    render();
  }
  return { init };
})();
