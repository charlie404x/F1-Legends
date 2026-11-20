/* =========================================================
   Teams & Constructors: equipos actuales e históricos,
   con logotipo de cada escudería y foto de su monoplaza.
   ========================================================= */
F1.sections.teams = (function () {
  const { $, esc } = F1.u;
  const { href } = F1.ui;
  const t = F1.t;
  let filter = "all";

  function render() {
    const grid = $("#teamGrid");
    grid.innerHTML = "";
    const list = F1.data.teams.filter((x) => filter === "all" || (filter === "cur" ? x.current : !x.current));
    list.forEach((tm, i) => {
      const cy = F1.champ.constructorYears(tm.key).length;
      const dy = F1.champ.byTeam(tm.key).length;
      const c = F1.u.el(`
        <article class="card clickable team-card reveal" style="--tc:${tm.color};transition-delay:${Math.min(i, 8) * 35}ms" tabindex="0" role="link" aria-label="${t("Ficha de {n}", { n: esc(tm.name) })}">
          ${F1.ui.favBtn("team", tm.key, tm.name)}
          <div class="team-band"></div>
          <div class="card-body">
            <div class="team-head">${F1.ui.teamLogo(tm, 54)}<div><h3>${esc(tm.short)}</h3><span class="tele-label">${F1.ui.flag(tm.nat)} ${tm.debut}${tm.current ? " · " + t("en activo") : ""}</span></div></div>
            <p>${esc(tm.history.split(". ").slice(0, 2).join(". "))}.</p>
            ${tm.current ? F1.ui.social(tm.key, { size: "sm" }) : ""}
            <div class="card-foot"><span class="tag gold">${cy} ${t("constructores")}</span><span class="tag neutral">${dy} ${t("pilotos")}</span></div>
          </div>
        </article>`);
      const [ti, tq] = F1.team.photo(tm);
      c.insertBefore(F1.media.el(ti, { w: 500, alt: tm.name, q: tq }), c.querySelector(".team-band"));
      const go = () => F1.u.go(href.team(tm.key));
      c.addEventListener("click", go);
      c.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      grid.appendChild(c);
    });
    F1.u.reveal(grid);
  }

  function init() {
    $("#teamsDb").innerHTML = `
      <div class="toolbar"><div id="teamChips">${F1.ui.chips([{ v: "cur", l: t("Parrilla actual") }, { v: "hist", l: t("Históricos") }], { name: t("Equipos"), allLabel: "Todos" })}</div>
      <span class="count-label">${t("Títulos de pilotos y constructores según los registros oficiales")}</span></div>
      <div class="logo-wall" id="logoWall" aria-label="${t("Logotipos de las escuderías")}"></div>
      <div class="grid" id="teamGrid"></div>
      <p class="note">${t("Logotipos: marcas registradas de cada escudería, mostradas con fines informativos. Los equipos históricos usan el logotipo de su época.")}</p>`;
    $("#logoWall").innerHTML = F1.data.teams.map((tm) => `<a href="${href.team(tm.key)}" title="${esc(tm.name)}">${F1.ui.teamLogo(tm, 44)}</a>`).join("");
    F1.ui.bindChips($("#teamChips"), (v) => { filter = v; render(); });
    render();
  }
  return { init };
})();
