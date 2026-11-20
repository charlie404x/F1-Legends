/* =========================================================
   Driver Database: pilotos históricos (datos editoriales) y
   pilotos de la temporada vigente (API). Filtros por
   nacionalidad, equipo, campeonatos y época.
   ========================================================= */
F1.sections.drivers = (function () {
  const { $, esc, uniq, decadeOf, norm, debounce, loading, errorBox } = F1.u;
  const { href, flag } = F1.ui;
  const state = { tab: "hist", nat: "", team: "", titles: "", era: "", q: "" };
  let current = null; // { list, lineup:Set, season, ts, stale }

  const t = F1.t;
  const titlesOf = (id) => F1.champ.years(id).length;

  function card(o, i) {
    const tc = o.teamColor || "var(--red)";
    const c = F1.u.el(`
      <article class="card clickable driver-card reveal" tabindex="0" role="link" aria-label="${t("Perfil de {n}", { n: esc(o.name) })}" style="transition-delay:${Math.min(i, 8) * 35}ms">
        ${F1.ui.favBtn("driver", o.id, o.name)}
        ${o.num ? `<span class="card-num big-num" style="-webkit-text-stroke-color:${tc}" aria-hidden="true">${esc(o.num)}</span>` : ""}
        <div class="team-stripe" style="background:${tc}"></div>
        <div class="card-body">
          <span class="tele-label">${flag(o.nat)} ${esc(F1.nat(o.nat)[1])}${o.era ? " · " + esc(o.era) : ""}</span>
          <h3>${esc(o.name)}</h3>
          <p class="small">${esc(o.sub)}</p>
          <div class="card-foot">${o.titles ? `<span class="tag gold">${o.titles} ${t(o.titles > 1 ? "títulos" : "título")}</span>` : o.logo || "<span></span>"}${o.extra ? `<span class="mono">${o.extra}</span>` : ""}</div>
        </div>
      </article>`);
    c.prepend(F1.ui.drv.photo(o.id, o.api, { w: 500 }));
    const go = () => F1.u.go(href.driver(o.id));
    c.addEventListener("click", go);
    c.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    return c;
  }

  function histItems() {
    return F1.data.drivers.map((d) => ({
      id: d.id, name: d.name, nat: d.nat, img: d.img, num: d.num, titles: titlesOf(d.id),
      era: `${d.era[0]}–${d.era[1] >= new Date().getFullYear() ? t("hoy") : d.era[1]}`,
      sub: d.teams.map((t) => F1.team.name(t)).join(" · "), teams: d.teams, decades: [decadeOf(d.era[0]), decadeOf(Math.min(d.era[1], 2029))],
    }));
  }

  function currentItems() {
    if (!current) return [];
    return current.list.map((s) => {
      const cid = s.Constructors[s.Constructors.length - 1]?.constructorId;
      const tm = F1.team.fromApi(cid);
      return {
        id: s.Driver.driverId, api: s.Driver, name: `${s.Driver.givenName} ${s.Driver.familyName}`, nat: s.Driver.nationality, logo: F1.ui.teamLogo(tm, 26),
        img: F1.drv.img(s.Driver.driverId, s.Driver), num: s.Driver.permanentNumber, titles: titlesOf(s.Driver.driverId),
        sub: `${s.Constructors.map((c) => c.name).join(" / ")}${current.lineup.has(s.Driver.driverId) ? "" : " · " + F1.t("no disputó la última carrera")}`,
        teams: [tm?.key || cid], teamColor: tm?.color, extra: `P${s.position} · ${s.points} pts`, decades: [2020],
      };
    });
  }

  function filtered(items) {
    return items.filter((o) => {
      if (state.nat && o.nat !== state.nat) return false;
      if (state.team && !o.teams.includes(state.team)) return false;
      if (state.titles === "0" && o.titles) return false;
      if (state.titles === "1+" && !o.titles) return false;
      if (state.titles === "3+" && o.titles < 3) return false;
      if (state.era && state.tab === "hist") { const dec = +state.era; if (!(o.decades[0] <= dec && dec <= o.decades[1])) return false; }
      if (state.q && !norm(o.name + " " + o.sub).includes(norm(state.q))) return false;
      return true;
    });
  }

  function filtersHTML(items) {
    const nats = uniq(items.map((o) => o.nat)).sort((a, b) => F1.nat(a)[1].localeCompare(F1.nat(b)[1])).map((n) => ({ v: n, l: F1.nat(n)[1] }));
    const teams = uniq(items.flatMap((o) => o.teams)).filter(Boolean).map((t) => ({ v: t, l: F1.team.name(t) })).sort((a, b) => a.l.localeCompare(b.l));
    const eras = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020].map((d) => ({ v: String(d), l: `${d}s` }));
    return `
      ${F1.ui.searchField("drvSearch", "Buscar piloto…")}
      ${F1.ui.select("drvNat", nats, "Nacionalidad")}
      ${F1.ui.select("drvTeam", teams, "Equipo")}
      ${F1.ui.select("drvTitles", [{ v: "0", l: t("Sin títulos") }, { v: "1+", l: t("Campeones") }, { v: "3+", l: t("3 o más títulos") }], "Campeonatos")}
      ${state.tab === "hist" ? F1.ui.select("drvEra", eras, "Época") : ""}`;
  }

  function renderList() {
    const items = state.tab === "hist" ? histItems() : currentItems();
    const list = filtered(items);
    const grid = $("#drvGrid");
    grid.innerHTML = "";
    list.forEach((o, i) => grid.appendChild(card(o, i)));
    if (!list.length) grid.innerHTML = `<p class="empty">${t("Ningún piloto coincide con los filtros.")}</p>`;
    $("#drvCount").textContent = t("{n} pilotos", { n: list.length });
    F1.u.reveal(grid);
  }

  function bindFilters() {
    const on = (id, k) => $("#" + id)?.addEventListener("change", (e) => { state[k] = e.target.value; renderList(); });
    on("drvNat", "nat"); on("drvTeam", "team"); on("drvTitles", "titles"); on("drvEra", "era");
    $("#drvSearch").addEventListener("input", debounce((e) => { state.q = e.target.value; renderList(); }, 160));
  }

  async function loadCurrent() {
    const [ds, last] = await Promise.all([F1.season.driverStandings(), F1.season.last()]);
    current = {
      list: ds.data.list, season: ds.data.season, ts: Math.min(ds.ts, last.ts), stale: ds.stale || last.stale,
      lineup: new Set((last.data?.Results || []).map((r) => r.Driver.driverId)),
    };
  }

  async function show(tab) {
    state.tab = tab; Object.assign(state, { nat: "", team: "", titles: "", era: "", q: "" });
    const body = $("#drvBody");
    if (tab === "cur" && !current) {
      body.innerHTML = loading("Cargando la parrilla de la temporada desde la API…");
      try { await loadCurrent(); } catch (e) {
        body.innerHTML = errorBox(t("No se pudo cargar la temporada vigente ({m}).", { m: e.message }), "drvRetry");
        $("#drvRetry").addEventListener("click", () => show("cur"));
        return;
      }
    }
    const items = tab === "hist" ? histItems() : currentItems();
    body.innerHTML = `
      ${tab === "cur" ? `<div class="live-meta">${F1.ui.freshness(current.ts, current.stale)}<span class="tag neutral">${t("Temporada {s} · todos los pilotos que han puntuado o corrido", { s: esc(current.season) })}</span></div>` : ""}
      <div class="toolbar"><div class="filters-row">${filtersHTML(items)}</div><span class="count-label" id="drvCount"></span></div>
      <div class="grid sm" id="drvGrid"></div>`;
    bindFilters();
    renderList();
  }

  function init() {
    $("#driversDb").innerHTML = `<div id="drvTabs"></div><div id="drvBody"></div>`;
    F1.ui.tabs($("#drvTabs"), [{ id: "hist", label: "Leyendas históricas" }, { id: "cur", label: "Temporada vigente" }], show);
  }
  return { init, loadCurrent: () => (current ? Promise.resolve() : loadCurrent()), getCurrent: () => current };
})();
