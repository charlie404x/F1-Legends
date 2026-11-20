/* =========================================================
   Datos de la temporada en curso (servicio compartido) +
   sección "Actualidad".
   ========================================================= */
F1.season = (function () {
  const H = F1.api.TTL.HOUR;
  const pick = (r, f) => ({ data: f(r.data), ts: r.ts, stale: r.stale });
  return {
    driverStandings: async () => pick(await F1.api.get("current/driverstandings.json?limit=100", { ttl: H }), (d) => ({ season: d.StandingsTable.season, round: d.StandingsTable.round, list: d.StandingsTable.StandingsLists[0]?.DriverStandings || [] })),
    constructorStandings: async () => pick(await F1.api.get("current/constructorstandings.json?limit=100", { ttl: H }), (d) => ({ season: d.StandingsTable.season, round: d.StandingsTable.round, list: d.StandingsTable.StandingsLists[0]?.ConstructorStandings || [] })),
    schedule: async () => pick(await F1.api.get("current.json?limit=100", { ttl: 6 * H }), (d) => d.RaceTable.Races || []),
    last: async () => pick(await F1.api.get("current/last/results.json?limit=100", { ttl: H }), (d) => d.RaceTable.Races[0] || null),
    next: async () => pick(await F1.api.get("current/next.json", { ttl: H }), (d) => d.RaceTable.Races[0] || null),
  };
})();

F1.sections.live = (function () {
  const { $, esc, sessionDate, fmtDate, loading, errorBox } = F1.u;
  const { href, flag, drv } = F1.ui;
  let cdTimer;

  const t = F1.t;
  const SESSIONS = [["FirstPractice", "Libres 1"], ["SecondPractice", "Libres 2"], ["ThirdPractice", "Libres 3"], ["SprintQualifying", "Clasificación sprint"], ["Sprint", "Sprint"], ["Qualifying", "Clasificación"]];

  function countdown(node, target) {
    clearInterval(cdTimer);
    const tick = () => {
      const ms = target - Date.now();
      if (ms <= 0) { node.innerHTML = `<p class="tag ok">${t("En curso o finalizada")}</p>`; clearInterval(cdTimer); return; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      node.innerHTML = [[d, "DÍAS"], [h, "HORAS"], [m, "MIN"], [s, "SEG"]].map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><span>${t(l)}</span></div>`).join("");
    };
    tick(); cdTimer = setInterval(tick, 1000);
  }

  async function render(silent) {
    const host = $("#liveSummary");
    if (!silent) host.innerHTML = loading("Conectando con la API de resultados…");
    const hs = $("#heroSeason");
    try {
      const [next, last, ds, cs] = await Promise.all([F1.season.next(), F1.season.last(), F1.season.driverStandings(), F1.season.constructorStandings()]);
      const ts = Math.min(next.ts, last.ts, ds.ts, cs.ts);
      const stale = next.stale || last.stale || ds.stale || cs.stale;
      const n = next.data, l = last.data, dl = ds.data.list[0], cl = cs.data.list[0];
      if (hs) hs.textContent = t("Temporada {s} · tras {r} carreras", { s: ds.data.season, r: ds.data.round });
      host.innerHTML = `
        <div class="live-meta"><span class="status-pill" id="liveStatus"></span>${F1.ui.freshness(ts, stale)}
          <span class="tag neutral">${t("Temporada {s} · Ronda {r}", { s: esc(ds.data.season), r: esc(ds.data.round) })}</span>${F1.auto.badge("season")}</div>
        <div class="live-grid">
          <article class="live-card next">
            <p class="tele-label red">${t("Próxima carrera")}${n ? ` · ${t("Ronda")} ${esc(n.round)}` : ""}</p>
            ${n ? `
              <h3>${esc(n.raceName)}</h3>
              <p class="muted">${esc(n.Circuit.circuitName)} · ${esc(n.Circuit.Location.locality)}, ${esc(n.Circuit.Location.country)}</p>
              <div class="countdown" id="cd" aria-label="${t("Cuenta atrás")}"></div>
              <ul class="sessions">
                ${SESSIONS.filter(([k]) => n[k]).map(([k, lbl]) => `<li><span>${t(lbl)}</span><span>${F1.u.fmtDateTime(sessionDate(n[k]))}</span></li>`).join("")}
                <li><span><b>${t("Carrera")}</b></span><span><b>${F1.u.fmtDateTime(sessionDate(n))}</b></span></li>
              </ul>
              <p class="note">${t("Horarios en tu zona horaria local.")} ${n.Sprint ? `<span class="tag">${t("Fin de semana sprint")}</span>` : ""}</p>
              <a class="btn btn-ghost btn-sm" style="margin-top:12px" href="${href.gp(n.season, n.round)}">${t("Ficha del GP")} →</a>`
              : `<h3>${t("Temporada finalizada")}</h3><p class="muted">${t("El calendario de la próxima temporada aparecerá en cuanto la API lo publique.")}</p>`}
          </article>
          <article class="live-card">
            <p class="tele-label">${t("Último Gran Premio")}</p>
            ${l ? `<h3>${esc(l.raceName)}</h3><p class="muted small">${fmtDate(l.date)} · ${t("Ronda")} ${esc(l.round)}</p>
              <ol class="podium-mini">${l.Results.slice(0, 3).map((r) => `<li data-pid="${esc(r.Driver.driverId)}"><span class="p">P${r.position}</span><span class="pm-photo"></span>${flag(r.Driver.nationality)} <a class="link" href="${href.driver(r.Driver.driverId)}">${esc(drv.name(r.Driver.driverId, r.Driver))}</a> ${F1.ui.teamLogoApi(r.Constructor.constructorId, 22)}</li>`).join("")}</ol>
              <a class="link small" href="${href.gp(l.season, l.round)}" style="display:inline-block;margin-top:10px">${t("Resultados completos")} →</a>` : `<p class="muted">${t("Aún no se ha disputado ninguna carrera.")}</p>`}
          </article>
          <article class="live-card">
            <p class="tele-label">${t("Líderes del campeonato")}</p>
            ${dl ? `<div class="leader" id="leaderD"><div><span class="muted small">${t("Pilotos")}</span><br/><a class="big" href="${href.driver(dl.Driver.driverId)}">${esc(dl.Driver.familyName)}</a><br/><span class="mono">${esc(dl.points)} pts · ${esc(dl.wins)} ${t("victorias")}</span></div></div>` : ""}
            ${cl ? `<div class="leader" style="margin-top:18px">${F1.ui.teamLogoApi(cl.Constructor.constructorId, 52)}<div><span class="muted small">${t("Constructores")}</span><br/><a class="big" href="${href.team(F1.team.fromApi(cl.Constructor.constructorId)?.key || cl.Constructor.constructorId)}">${esc(cl.Constructor.name)}</a><br/><span class="mono">${esc(cl.points)} pts</span></div></div>` : ""}
          </article>
          <article class="live-card" style="grid-column: span 2">
            <p class="tele-label">${t("Últimos resultados · Top 10")}</p>
            ${l ? `<div class="table-wrap" style="margin-top:12px"><table class="timing"><thead><tr><th>Pos</th><th>${t("Piloto")}</th><th>${t("Equipo")}</th><th class="num">${t("Tiempo / estado")}</th><th class="num">Pts</th></tr></thead><tbody>
              ${l.Results.slice(0, 10).map((r) => `<tr class="p${r.position} clickable" data-go="${href.driver(r.Driver.driverId)}"><td class="pos">${r.positionText}</td><td><span class="drv-cell" data-pid="${esc(r.Driver.driverId)}"><span class="av-slot"></span>${flag(r.Driver.nationality)} ${esc(drv.name(r.Driver.driverId, r.Driver))}</span></td><td><span class="team-cell">${F1.ui.teamLogoApi(r.Constructor.constructorId, 24)}${esc(r.Constructor.name)}</span></td><td class="num">${esc(r.Time?.time || r.status)}</td><td class="num">${esc(r.points)}</td></tr>`).join("")}
            </tbody></table></div>` : ""}
          </article>
        </div>`;
      F1.ui.statusPill($("#liveStatus"));
      if (n) countdown($("#cd"), sessionDate(n));
      if (dl) $("#leaderD").prepend(drv.photo(dl.Driver.driverId, dl.Driver, { w: 330 }));
      // Retratos del podio y del top 10
      const drvById = Object.fromEntries((l?.Results || []).map((r) => [r.Driver.driverId, r.Driver]));
      host.querySelectorAll(".pm-photo, .av-slot").forEach((slot) => {
        const id = slot.closest("[data-pid]").dataset.pid;
        slot.replaceWith(drv.photo(id, drvById[id], { w: 120, cls: "avatar" }));
      });
    } catch (e) {
      host.innerHTML = errorBox(t("No se pudieron obtener los datos de la temporada ({m}). No se muestran datos inventados.", { m: e.message }), "liveRetry");
      $("#liveRetry")?.addEventListener("click", render);
    }
  }

  async function news(silent) {
    const host = $("#newsBlock");
    if (!silent) host.innerHTML = `<div style="margin-top:34px">${loading("Cargando noticias de medios especializados…")}</div>`;
    try {
      const r = await F1.news.latest(9);
      host.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:10px;margin-top:48px">
          <h3 style="font-size:2rem;text-transform:uppercase">${t("Noticias destacadas")}</h3>
          <div class="filters-row">${F1.ui.freshness(r.ts, r.stale)}${F1.auto.badge("news")}<button class="btn btn-ghost btn-sm" id="newsRefresh">↻ ${t("Actualizar")}</button></div>
        </div>
        <div class="news-grid">${r.items.map((it, i) => `
          <a class="news-item reveal" href="${esc(it.link)}" target="_blank" rel="noopener" style="transition-delay:${i * 40}ms">
            ${it.image ? `<div class="media ok"><img src="${esc(it.image)}" alt="" loading="lazy" style="opacity:1" onerror="this.parentNode.remove()"/></div>` : ""}
            <span class="tele-label red">${esc(it.source)} · ${it.date ? F1.u.fmtDate(it.date, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : t("Sin fecha")}</span>
            <h4>${esc(it.title)}</h4>
            <span class="small muted ext">${t("Leer en {s}", { s: esc(it.source) })}</span>
          </a>`).join("")}</div>
        ${r.failed?.length ? `<p class="note">${t("No disponibles ahora")}: ${esc(r.failed.join(", "))}.</p>` : ""}<p class="note">${t("Fuentes")}: ${F1.news.FEEDS.map((f) => esc(f.name)).join(" · ")}. ${t("Los titulares se muestran en el idioma de cada medio.")}</p>`;
      F1.u.reveal(host);
      host.querySelector("#newsRefresh").addEventListener("click", async (e) => { e.currentTarget.disabled = true; await F1.auto.now("news"); });
    } catch {
      host.innerHTML = `<div class="state" style="margin-top:34px">${t("No se pudieron cargar las noticias en este momento. Fuentes:")} ${F1.news.FEEDS.map((f) => `<a class="link ext" href="${f.url.replace(/rss.*$|\/[^/]*\.xml$/, "")}" target="_blank" rel="noopener">${esc(f.name)}</a>`).join(" · ")}</div>`;
    }
  }

  function init() {
    render();
    F1.u.whenVisible($("#newsBlock"), () => { news(); F1.auto.on("news", () => news(true)); });
    F1.auto.on("season", () => render(true));
    $("#liveSummary").addEventListener("click", (e) => { const tr = e.target.closest("[data-go]"); if (tr && !e.target.closest("a")) F1.u.go(tr.dataset.go); });
  }
  return { init, render };
})();

/* =========================================================
   Actualización automática de puntos, resultados y noticias.
   - En fin de semana de GP (de 1 h antes de Libres 1 a 4 h
     después de la carrera): cada 2 minutos. Resto: cada 10.
   - Noticias: cada 5 minutos en fin de semana, si no cada 10.
   - Solo mientras la pestaña está visible; al volver a ella se
     actualiza enseguida si los datos han caducado.
   - Respeta el límite de la API (4 consultas por ciclo).
   Las secciones se suscriben con F1.auto.on("season" | "news", fn).
   ========================================================= */
F1.auto = (function () {
  const subs = { season: new Set(), news: new Set() };
  const due = { season: 0, news: 0 };
  let weekend = false, started = false;
  const ENDPOINTS = ["current/driverstandings.json?limit=100", "current/constructorstandings.json?limit=100", "current/last/results.json?limit=100", "current/next.json"];
  const period = (k) => (k === "season" ? (weekend ? 2 : 10) : (weekend ? 5 : 10)) * 60e3;

  async function checkWeekend() {
    try {
      const n = (await F1.season.next()).data;
      if (!n) { weekend = false; return; }
      const first = F1.u.sessionDate(n.FirstPractice) || F1.u.sessionDate(n);
      const race = F1.u.sessionDate(n);
      const now = Date.now();
      weekend = now > first - 3600e3 && now < race + 4 * 3600e3;
    } catch { weekend = false; }
  }

  async function run(kind) {
    due[kind] = Date.now() + period(kind);
    if (!subs[kind].size) return;
    try {
      if (kind === "season") {
        await Promise.all(ENDPOINTS.map((p) => F1.api.get(p, { ttl: F1.api.TTL.HOUR, force: true })));
        await checkWeekend();
      } else await F1.news.latest(9, { force: true });
      subs[kind].forEach((fn) => { try { fn(); } catch (e) { console.warn("[auto]", e); } });
    } catch (e) { console.warn("[auto] " + kind, e.message); }
  }

  function tick() {
    if (document.hidden) return;
    ["season", "news"].forEach((k) => { if (subs[k].size && Date.now() >= due[k]) run(k); });
    document.querySelectorAll("[data-auto]").forEach((n) => {
      const ms = Math.max(0, due[n.dataset.auto] - Date.now());
      n.textContent = `${Math.floor(ms / 60e3)}:${String(Math.floor(ms / 1e3) % 60).padStart(2, "0")}`;
    });
  }

  function start() {
    if (started) return; started = true;
    checkWeekend().then(() => { due.season = Date.now() + period("season"); due.news = Date.now() + period("news"); });
    setInterval(tick, 1000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
  }

  /** Etiqueta "⟳ Actualización automática · próxima en m:ss". */
  const badge = (kind) => `<span class="tag neutral auto-tag" title="${F1.t(weekend ? "Fin de semana de carrera: cada 2 minutos" : "Cada 10 minutos")}">⟳ ${F1.t("Actualización automática")} · ${F1.t("próxima en")} <b data-auto="${kind}">—</b>${weekend && kind === "season" ? ` · <i class="live-dot"></i> ${F1.t("fin de semana de GP")}` : ""}</span>`;

  return {
    on(kind, fn) { subs[kind].add(fn); start(); },
    now: (kind) => run(kind),
    badge,
    get weekend() { return weekend; },
  };
})();

