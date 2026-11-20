/* =========================================================
   Archivo completo de campeones con filtros.
   Si la temporada en curso ha terminado y la API ya da un
   campeón que no está en champions.js, se añade automáticamente
   (marcado como "dato de la API").
   ========================================================= */
F1.sections.champions = (function () {
  const { $, esc, decadeOf, uniq } = F1.u;
  const { href, flag } = F1.ui;
  const t = F1.t;
  const state = { decade: "", nat: "", team: "", titles: "", view: "cards" };

  /** Comprueba si existe un campeón más reciente en la API (temporada terminada). */
  async function syncLatest() {
    try {
      const sched = await F1.season.schedule();
      const races = sched.data;
      if (!races.length) return;
      const season = +races[0].season;
      const lastRace = races[races.length - 1];
      const finished = F1.u.sessionDate(lastRace) < new Date(Date.now() - 6 * 3600e3);
      if (!finished || F1.data.champions.some((c) => c.year === season)) return;
      const ds = await F1.season.driverStandings();
      if (+ds.data.round !== races.length) return;
      const top = ds.data.list[0];
      if (!top) return;
      const tk = F1.team.fromApi(top.Constructors[0].constructorId)?.key || top.Constructors[0].constructorId;
      F1.data.champions.push({ year: season, driver: top.Driver.driverId, team: tk, car: F1.data.currentCars[top.Constructors[0].constructorId] || "—", fromApi: true, api: top.Driver });
      render();
    } catch {}
  }

  function grouped() {
    const g = {};
    F1.data.champions.forEach((c) => { (g[c.driver] = g[c.driver] || { id: c.driver, list: [] }).list.push(c); });
    return Object.values(g);
  }

  function filtered() {
    return grouped().filter((g) => {
      const d = F1.drv.get(g.id);
      if (state.decade && !g.list.some((c) => decadeOf(c.year) === +state.decade)) return false;
      if (state.nat && d?.nat !== state.nat) return false;
      if (state.team && !g.list.some((c) => c.team === state.team)) return false;
      if (state.titles) {
        const n = g.list.length;
        if (state.titles === "1" && n !== 1) return false;
        if (state.titles === "2-3" && (n < 2 || n > 3)) return false;
        if (state.titles === "4+" && n < 4) return false;
      }
      return true;
    }).sort((a, b) => a.list[0].year - b.list[0].year);
  }

  function render() {
    const list = filtered();
    const grid = $("#champGrid");
    $("#champCount").textContent = t("{a} campeones · {b} títulos", { a: list.length, b: list.reduce((n, g) => n + g.list.length, 0) });
    if (state.view === "years") {
      const years = list.flatMap((g) => g.list).sort((a, b) => a.year - b.year);
      grid.className = "";
      grid.innerHTML = `<div class="table-wrap"><table class="timing"><thead><tr><th>${t("Año")}</th><th>${t("Campeón")}</th><th>${t("Nac.")}</th><th>${t("Escudería")}</th><th>${t("Monoplaza")}</th></tr></thead><tbody>
        ${years.map((c) => { const d = F1.drv.get(c.driver); return `<tr class="clickable" data-go="${href.driver(c.driver)}"><td class="pos">${c.year}</td><td><b>${esc(F1.drv.name(c.driver, c.api))}</b>${c.fromApi ? ' <span class="tag neutral">API</span>' : ""}</td><td>${flag(d?.nat || c.api?.nationality)}</td><td><span class="team-cell">${F1.ui.teamLogo(F1.team.get(c.team), 24, { year: c.year }) || `<span class="team-bar" style="background:${F1.team.get(c.team)?.color || "#888"}"></span>`}${esc(F1.team.name(c.team))}</span></td><td>${c.carKey ? `<a class="link" href="${href.car(c.carKey)}">${esc(c.car)}</a>` : esc(c.car)}</td></tr>`; }).join("")}
      </tbody></table></div>`;
      return;
    }
    grid.className = "grid sm";
    grid.innerHTML = "";
    list.forEach((g, i) => {
      const d = F1.drv.get(g.id) || {};
      const name = F1.drv.name(g.id, g.list[0].api);
      const teams = uniq(g.list.map((c) => F1.team.name(c.team)));
      const card = F1.u.el(`
        <article class="card clickable champ-card reveal" style="transition-delay:${Math.min(i, 8) * 40}ms" tabindex="0" role="link" aria-label="${t("Perfil de {n}", { n: esc(name) })}">
          <div class="champ-titles" aria-label="${g.list.length} ${t("títulos")}">${g.list.map(() => "<i></i>").join("")}</div>
          ${F1.ui.favBtn("driver", g.id, name)}
          <span class="card-num big-num" aria-hidden="true">${g.list.length}</span>
          <div class="card-body">
            <span class="tele-label">${flag(d.nat || g.list[0].api?.nationality)} ${esc(F1.nat(d.nat)[1])}</span>
            <h3>${esc(name)}</h3>
            <div class="year-badges">${g.list.map((c) => `<span>${c.year}</span>`).join("")}</div>
            <p class="small muted champ-teams">${uniq(g.list.map((c) => c.team)).map((k) => F1.ui.teamLogo(F1.team.get(k), 22, { year: g.list.find((c) => c.team === k).year }) || "").join("")}<span>${esc(teams.join(" · "))}</span></p>
          </div>
        </article>`);
      card.prepend(F1.ui.drv.photo(g.id, g.list[0].api, { w: 500 }));
      card.addEventListener("click", () => F1.u.go(href.driver(g.id)));
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") F1.u.go(href.driver(g.id)); });
      grid.appendChild(card);
    });
    if (!list.length) grid.innerHTML = `<p class="empty">${t("Ningún campeón coincide con los filtros.")}</p>`;
    F1.u.reveal(grid);
  }

  function init() {
    const decs = uniq(F1.data.champions.map((c) => decadeOf(c.year))).map((d) => ({ v: String(d), l: `${d}s` }));
    const nats = uniq(F1.data.champions.map((c) => F1.drv.get(c.driver)?.nat).filter(Boolean)).sort((a, b) => F1.nat(a)[1].localeCompare(F1.nat(b)[1])).map((n) => ({ v: n, l: F1.nat(n)[1] }));
    const teams = uniq(F1.data.champions.map((c) => c.team)).map((t) => ({ v: t, l: F1.team.name(t) })).sort((a, b) => a.l.localeCompare(b.l));
    $("#championsArchive").innerHTML = `
      <div class="toolbar">
        <div class="filters-row">
          ${F1.ui.select("chDecade", decs, "Todas las décadas")}
          ${F1.ui.select("chNat", nats, "Todas las nacionalidades")}
          ${F1.ui.select("chTeam", teams, "Todas las escuderías")}
          ${F1.ui.select("chTitles", [{ v: "1", l: t("1 título") }, { v: "2-3", l: t("2–3 títulos") }, { v: "4+", l: t("4 o más títulos") }], "Cualquier nº de títulos")}
        </div>
        <div class="filters-row">
          <span class="count-label" id="champCount"></span>
          <div class="view-toggle" role="group" aria-label="${t("Vista")}"><button aria-pressed="true" data-view="cards">${t("Fichas")}</button><button aria-pressed="false" data-view="years">${t("Año a año")}</button></div>
        </div>
      </div>
      <div id="champGrid"></div>`;
    [["chDecade", "decade"], ["chNat", "nat"], ["chTeam", "team"], ["chTitles", "titles"]].forEach(([id, k]) => $("#" + id).addEventListener("change", (e) => { state[k] = e.target.value; render(); }));
    $(".view-toggle").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      state.view = b.dataset.view;
      F1.u.$$(".view-toggle button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      render();
    });
    $("#champGrid").addEventListener("click", (e) => { const tr = e.target.closest("[data-go]"); if (tr && !e.target.closest("a")) F1.u.go(tr.dataset.go); });
    render();
    syncLatest();
  }
  return { init };
})();
