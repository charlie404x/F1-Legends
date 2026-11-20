/* =========================================================
   Live Championship: clasificación de pilotos y constructores,
   calendario completo con estado de cada GP.
   Indicadores: estado de conexión, hora de actualización,
   ronda a la que corresponden los datos. Caché de 1 h.
   ========================================================= */
F1.sections.championship = (function () {
  const { $, esc, loading, errorBox, sessionDate, fmtDate } = F1.u;
  const { href, flag, drv } = F1.ui;
  const t = F1.t;
  let tab = "drivers";

  async function drivers(body) {
    body.innerHTML = loading("Calculando clasificación, podios y poles de la temporada…");
    const ds = await F1.season.driverStandings();
    let season = null;
    try { season = await F1.stats.season("current"); } catch {}
    const list = ds.data.list;
    const leader = +list[0]?.points || 0;
    body.innerHTML = `
      <div class="champ-toolbar">${F1.ui.freshness(Math.min(ds.ts, season?.ts || ds.ts), ds.stale)}<span class="tag neutral">${t("Datos tras la ronda {r} de {s}", { r: esc(ds.data.round), s: esc(ds.data.season) })}</span></div>
      <div class="table-wrap"><table class="timing standings st-drivers">
        <thead><tr><th>Pos</th><th>${t("Piloto")}</th><th>${t("Equipo")}</th><th class="num">${t("Puntos")}</th><th class="num">${t("Victorias")}</th><th class="num">${t("Podios")}</th><th class="num">Poles</th><th class="num">${t("Dif. líder")}</th></tr></thead>
        <tbody>${list.map((s) => {
          const st = season?.by[s.Driver.driverId];
          const c = s.Constructors[s.Constructors.length - 1];
          const tc = F1.team.color(c?.constructorId);
          return `<tr class="p${s.position} clickable" data-go="${href.driver(s.Driver.driverId)}" style="--tc:${tc}">
            <td class="pos">${s.positionText}</td>
            <td><div class="st-driver" data-pid="${esc(s.Driver.driverId)}"><span class="av-slot"></span><span><span class="st-num">${esc(s.Driver.permanentNumber || "")}</span> ${flag(s.Driver.nationality)} <b>${esc(s.Driver.givenName)} ${esc(s.Driver.familyName)}</b></span></div></td>
            <td><span class="team-cell">${F1.ui.teamLogoApi(c?.constructorId, 26)}<span>${esc(s.Constructors.map((x) => x.name).join(" / "))}</span></span></td>
            <td class="num"><b>${esc(s.points)}</b></td><td class="num">${esc(s.wins)}</td>
            <td class="num">${st ? st.podiums : "—"}</td><td class="num">${st ? st.poles : "—"}</td>
            <td class="num">${+s.position === 1 ? "—" : "−" + (leader - +s.points)}</td></tr>`;
        }).join("")}</tbody></table></div>
      <p class="note">${t("Podios y poles calculados a partir de los resultados de carrera y de clasificación de la temporada (Jolpica-F1). Las carreras sprint no cuentan como victorias.")}${season ? "" : " " + t("No se pudieron calcular podios y poles en este momento.")} ${t("Retratos: fotografías reales de Wikimedia Commons con el uniforme del equipo (temporada indicada al pasar el cursor).")}</p>`;
    const byId = Object.fromEntries(list.map((x) => [x.Driver.driverId, x.Driver]));
    body.querySelectorAll(".st-driver").forEach((cell) => {
      const id = cell.dataset.pid;
      cell.querySelector(".av-slot").replaceWith(drv.photo(id, byId[id], { w: 120, cls: "avatar" }));
    });
  }

  async function constructors(body) {
    body.innerHTML = loading("Cargando clasificación de constructores…");
    const cs = await F1.season.constructorStandings();
    const list = cs.data.list;
    const leader = +list[0]?.points || 0;
    body.innerHTML = `
      <div class="champ-toolbar">${F1.ui.freshness(cs.ts, cs.stale)}<span class="tag neutral">${t("Datos tras la ronda {r} de {s}", { r: esc(cs.data.round), s: esc(cs.data.season) })}</span></div>
      <div class="table-wrap"><table class="timing standings">
        <thead><tr><th>Pos</th><th>${t("Escudería")}</th><th>${t("Monoplaza")}</th><th class="num">${t("Puntos")}</th><th class="num">${t("Victorias")}</th><th class="num">${t("Dif. líder")}</th></tr></thead>
        <tbody>${list.map((s) => {
          const tm = F1.team.fromApi(s.Constructor.constructorId);
          return `<tr class="p${s.position} clickable" data-go="${href.team(tm?.key || s.Constructor.constructorId)}" style="--tc:${tm?.color || "#888"}">
            <td class="pos">${s.positionText}</td>
            <td><span class="team-cell big">${F1.ui.teamLogo(tm, 40) || ""}<span><b>${esc(s.Constructor.name)}</b> ${flag(s.Constructor.nationality)}</span></span></td>
            <td class="mono small">${esc(F1.data.currentCars[s.Constructor.constructorId] || "—")}</td>
            <td class="num"><b>${esc(s.points)}</b></td><td class="num">${esc(s.wins)}</td>
            <td class="num">${+s.position === 1 ? "—" : "−" + (leader - +s.points)}</td></tr>`;
        }).join("")}</tbody></table></div>`;
  }

  async function calendar(body) {
    body.innerHTML = loading("Cargando calendario…");
    const [sc, last] = await Promise.all([F1.season.schedule(), F1.season.last()]);
    let winners = {};
    try {
      const res = await F1.api.allRaces("current/results/1.json", "Results", { ttl: F1.api.TTL.HOUR });
      res.races.forEach((r) => (winners[r.round] = r.Results[0]));
    } catch {}
    const now = Date.now();
    const nextRound = sc.data.find((r) => sessionDate(r) > now - 3 * 3600e3)?.round;
    body.innerHTML = `
      <div class="champ-toolbar">${F1.ui.freshness(sc.ts, sc.stale)}<span class="tag neutral">${t("{n} Grandes Premios · {s} con sprint", { n: sc.data.length, s: sc.data.filter((r) => r.Sprint).length })}</span></div>
      <div class="cal-grid">${sc.data.map((r) => {
        const d = sessionDate(r);
        const done = !!winners[r.round] || (last.data && +r.round <= +last.data.round);
        const w = winners[r.round];
        const cls = done ? "done" : r.round === nextRound ? "next" : "";
        return `<article class="cal-card ${cls}" tabindex="0" role="link" data-go="${href.gp(r.season, r.round)}" aria-label="${esc(r.raceName)}">
          <span class="cal-round">${t("RONDA")} ${r.round}${r.Sprint ? " · SPRINT" : ""}</span>
          <h4>${esc(r.raceName.replace("Grand Prix", "GP"))}</h4>
          <p class="small muted">${esc(r.Circuit.circuitName)}<br/>${esc(r.Circuit.Location.locality)}, ${esc(r.Circuit.Location.country)}</p>
          <p class="mono small" style="margin-top:6px">${fmtDate(d, { weekday: "short", day: "numeric", month: "short" })} · ${F1.u.fmtTime(d)}</p>
          ${w ? `<p class="winner">🏆 ${esc(w.Driver.givenName)} ${esc(w.Driver.familyName)} ${F1.ui.teamLogoApi(w.Constructor.constructorId, 20)}</p>` : r.round === nextRound ? `<p class="winner"><span class="tag">${t("Próxima carrera")}</span></p>` : done ? "" : `<p class="winner muted small">${t("Pendiente")}</p>`}
        </article>`;
      }).join("")}</div>
      <p class="note">${t("Horarios mostrados en tu zona horaria local.")}</p>`;
  }

  async function show(id, silent) {
    tab = id;
    const body = $("#champBody");
    const y = scrollY;
    try {
      if (id === "drivers") await drivers(body);
      else if (id === "constructors") await constructors(body);
      else await calendar(body);
      if (silent) window.scrollTo(0, y);
      const a = $("#champAuto"); if (a) a.innerHTML = F1.auto.badge("season");
    } catch (e) {
      body.innerHTML = errorBox(t("No se pudieron obtener los datos ({m}). No se muestran datos simulados.", { m: e.message }), "champRetry");
      $("#champRetry").addEventListener("click", () => show(id));
    }
  }

  function init() {
    const host = $("#championship");
    host.innerHTML = `
      <div class="champ-toolbar"><span class="status-pill" id="champStatus"></span><span id="champAuto"></span>
        <button class="btn btn-ghost btn-sm" id="champRefresh" title="${t("Forzar actualización desde la API")}">↻ ${t("Actualizar")}</button></div>
      <div id="champTabs"></div><div id="champBody"></div>`;
    F1.ui.statusPill($("#champStatus"));
    F1.season.driverStandings().then((r) => { const n = $("#champSeason"); if (n) n.textContent = r.data.season; }).catch(() => {});
    $("#champRefresh").addEventListener("click", async () => {
      const b = $("#champRefresh"); b.disabled = true; b.textContent = t("Actualizando…");
      try {
        await Promise.all(["current/driverstandings.json?limit=100", "current/constructorstandings.json?limit=100", "current.json?limit=100", "current/last/results.json?limit=100"].map((p) => F1.api.get(p, { ttl: F1.api.TTL.HOUR, force: true })));
        F1.u.toast(t("Datos actualizados"));
      } catch { F1.u.toast(t("No se pudo actualizar; se mantienen los datos guardados")); }
      b.disabled = false; b.textContent = "↻ " + t("Actualizar");
      show(tab);
    });
    host.addEventListener("click", (e) => { const g = e.target.closest("[data-go]"); if (g && !e.target.closest("a")) F1.u.go(g.dataset.go); });
    host.addEventListener("keydown", (e) => { const g = e.target.closest("[data-go]"); if (g && e.key === "Enter") F1.u.go(g.dataset.go); });
    F1.auto.on("season", () => show(tab, true));
    F1.ui.tabs($("#champTabs"), [{ id: "drivers", label: "Pilotos" }, { id: "constructors", label: "Constructores" }, { id: "calendar", label: "Calendario y resultados" }], show);
  }
  return { init };
})();
