/* =========================================================
   Vistas de ficha completa (ficha.html):
   piloto, equipo, monoplaza, circuito, Gran Premio, rivalidad
   y jugada. Combinan contenido editorial, datos de la API y
   galerías fotográficas de Wikimedia Commons.
   ========================================================= */
F1.views = (function () {
  const { $, esc, fmtDate, loading, errorBox, sessionDate, uniq } = F1.u;
  const { href, flag, drv, stats } = F1.ui;
  const t = F1.t;

  /* ---------- Estructura común ---------- */
  function shell({ title, small, meta = [], num, tc, actions = "", logo = "" }) {
    const v = $("#view");
    v.innerHTML = `
      <a class="btn btn-ghost btn-sm back-btn" href="${F1.page("inicio")}" data-back>← ${t("Volver")}</a>
      <header class="vh" style="${tc ? `--tc:${tc}` : ""}">
        <div class="vh-bg"></div>
        ${num ? `<span class="vh-num big-num" aria-hidden="true">${esc(num)}</span>` : ""}
        <div class="vh-inner">
          ${logo ? `<div class="vh-logo">${logo}</div>` : ""}
          <h1>${small ? `<small>${esc(small)}</small>` : ""}${esc(title)}</h1>
          <div class="vh-meta">${meta.filter(Boolean).map((m) => `<span>${m}</span>`).join("")}</div>
          <div class="vh-actions">${actions}</div>
        </div>
      </header>
      <div class="vb"></div>`;
    v.querySelector("[data-back]").addEventListener("click", (e) => { e.preventDefault(); F1.router.back(); });
    return { bg: v.querySelector(".vh-bg"), body: v.querySelector(".vb") };
  }
  const setBg = (slot, title, q) => slot.appendChild(F1.media.el(title, { w: 1920, alt: "", q, eager: true }));
  const section = (body, title, html = "", cls = "") => { const s = F1.u.el(`<section class="${cls}"><h2>${esc(title)}</h2>${html}</section>`); body.appendChild(s); return s; };
  const notFound = (what) => { const { body } = shell({ title: t("No encontrado") }); body.innerHTML = `<div class="state error">${t("No existe {w}.", { w: esc(t(what)) })} <a class="link" href="${F1.page("inicio")}">${t("Volver al inicio")}</a></div>`; };
  const goRows = (body) => body.addEventListener("click", (e) => { const tr = e.target.closest("[data-go]"); if (tr && !e.target.closest("a")) F1.u.go(tr.dataset.go); });

  /** Galería diferida (se carga al acercarse a la vista). */
  function gallery(host, o) { F1.u.whenVisible(host, () => F1.gallery.commons(host, o), "300px"); }

  function videosFor(driverId) {
    const p = F1.data.plays.filter((x) => x.drivers.includes(driverId)).map((x) => ({ ids: x.video, title: x.title, sub: `${x.year} · ${x.circuit}` }));
    const r = F1.data.rivalries.filter((x) => x.a === driverId || x.b === driverId).map((x) => ({ ids: x.video, title: x.title, sub: x.tagline }));
    return p.concat(r);
  }
  function videoGrid(host, list) {
    if (!list.length) { host.innerHTML = `<p class="muted">${t("No hay videos verificados asociados todavía.")}</p>`; return; }
    host.innerHTML = `<div class="video-row"></div>`;
    list.forEach((v) => { const w = document.createElement("div"); w.appendChild(F1.video.node(v)); w.insertAdjacentHTML("beforeend", `<p class="video-cap">${esc(v.title)} · ${esc(v.sub)}</p>`); host.firstElementChild.appendChild(w); });
  }

  /** Tarjetas de monoplazas con foto (evolución visual). */
  function carStrip(keys, { current } = {}) {
    const wrap = F1.u.el(`<div class="car-strip"></div>`);
    keys.map((k) => F1.car.get(k)).filter(Boolean).sort((a, b) => a.year - b.year).forEach((c) => {
      const a = F1.u.el(`<a class="car-step" href="${href.car(c.key)}"><span class="cs-year">${c.year}</span><span class="cs-name"><b>${esc(c.name)}</b><small>${esc(c.seasons)}</small></span></a>`);
      a.prepend(F1.media.el(c.img, { w: 500, alt: c.name }));
      wrap.appendChild(a);
    });
    if (current) {
      const a = F1.u.el(`<div class="car-step"><span class="cs-year">${new Date().getFullYear()}</span><span class="cs-name"><b>${esc(current.name)}</b><small>${t("Monoplaza actual")}</small></span></div>`);
      a.prepend(F1.media.el(current.title, { w: 500, alt: current.name, q: current.q }));
      wrap.appendChild(a);
    }
    return wrap;
  }

  /** Cuadrícula de retratos de pilotos. */
  function portraitGrid(ids, apiById = {}) {
    const wrap = F1.u.el(`<div class="portrait-grid"></div>`);
    ids.forEach((id) => {
      const a = F1.u.el(`<a class="pg-item" href="${href.driver(id)}"><span>${esc(drv.name(id, apiById[id]))}</span></a>`);
      a.prepend(drv.photo(id, apiById[id], { w: 330 }));
      wrap.appendChild(a);
    });
    return wrap;
  }

  /* =================== PILOTO =================== */
  async function driver(id) {
    const d = drv.get(id);
    let api = null;
    try { api = await F1.stats.driverInfo(id); } catch {}
    if (!d && !api) return notFound("el piloto solicitado");
    const name = d?.name || `${api.givenName} ${api.familyName}`;
    const nat = d?.nat || api?.nationality;
    const born = d?.born || api?.dateOfBirth;
    const titles = F1.champ.years(id);
    const age = born && !d?.died ? Math.floor((Date.now() - new Date(born)) / 31557600000) : null;
    const reg = F1.img.portrait(id);
    const longDate = { day: "numeric", month: "long", year: "numeric" };
    const { bg, body } = shell({
      title: name, small: d?.full && d.full !== name ? d.full : (titles.length ? t("{n}× campeón del mundo", { n: titles.length }) : t("Piloto de Fórmula 1")),
      num: api?.permanentNumber || d?.num || (titles.length ? titles.length : ""),
      meta: [`${flag(nat)} ${esc(F1.nat(nat)[1])}`, born ? `${t("Nacido el")} ${fmtDate(born, longDate)}${age ? ` (${t("{n} años", { n: age })})` : ""}` : "", d?.died ? `${t("Fallecido el")} ${fmtDate(d.died, longDate)}` : "", api?.permanentNumber ? `${t("Dorsal")} #${esc(api.permanentNumber)}` : ""],
      actions: `${F1.ui.favBtn("driver", id, name, "inline")}${F1.ui.social(id, { size: "lg" })}<a class="btn btn-ghost btn-sm" href="${F1.page("comparador", { a: id })}">${t("Comparar con otro piloto")}</a>${api?.url ? `<a class="btn btn-ghost btn-sm ext" href="${esc(api.url)}" target="_blank" rel="noopener">Wikipedia</a>` : ""}`,
    });
    setBg(bg, drv.img(id, api));
    // Retrato nítido sobre fondo desenfocado
    const vh = $("#view .vh");
    vh.classList.add("portrait");
    const pt = F1.u.el(`<figure class="vh-portrait"></figure>`);
    pt.appendChild(drv.photo(id, api, { w: 960, eager: true }));
    if (reg) pt.insertAdjacentHTML("beforeend", `<figcaption>${esc(reg.desc)}</figcaption>`);
    vh.insertBefore(pt, vh.querySelector(".vh-inner"));

    const grid = F1.u.el(`<div class="vb-grid"><div class="vb-main"></div><aside class="vb-side"></aside></div>`);
    body.appendChild(grid);
    const main = grid.querySelector(".vb-main"), side = grid.querySelector(".vb-side");

    // Estadísticas de carrera (API)
    const st = section(main, t("Estadísticas de carrera"), `<div class="career">${loading("Calculando con la API Jolpica-F1…")}</div>`);
    const isActive = d ? d.era[1] >= new Date().getFullYear() : true;
    F1.stats.driverCareer(id, { active: isActive }).then((c) => {
      st.querySelector(".career").innerHTML = stats([
        { label: "Títulos", value: titles.length }, { label: "Grandes Premios", value: c.starts }, { label: "Victorias", value: c.wins },
        { label: "Podios", value: c.podiums }, { label: "Poles*", value: c.poles }, { label: "Temporadas", value: c.seasons, note: c.first ? `${c.first}–${c.last}` : "" },
      ]) + `<p class="note">${t("* Salidas desde la posición 1 de parrilla.")} ${t("Datos")}: Jolpica-F1 · ${F1.u.fmtDateTime(c.ts)}.</p>`;
      side.querySelector(".teams-list").innerHTML = c.teams.length ? `<ul class="team-list">${c.teams.map((x) => { const tk = F1.team.fromApi(x.id); return `<li>${tk ? F1.ui.teamLogo(tk, 30) : `<span class="team-dot"></span>`}<span>${tk ? `<a class="link" href="${href.team(tk.key)}">${esc(x.name)}</a>` : esc(x.name)}</span></li>`; }).join("")}</ul>` : `<p class="muted">${t("Sin datos.")}</p>`;
    }).catch((e) => {
      st.querySelector(".career").innerHTML = errorBox(t("Estadísticas no disponibles ahora ({m}). La API limita las peticiones por hora.", { m: e.message }));
      side.querySelector(".teams-list").innerHTML = d ? `<ul class="team-list">${d.teams.map((k) => `<li>${F1.ui.teamLogo(F1.team.get(k), 30) || ""}<span>${esc(F1.team.name(k))}</span></li>`).join("")}</ul>` : "";
    });

    // Temporada actual
    const curBox = section(main, t("Temporada actual"), `<div class="cur">${loading()}</div>`);
    F1.season.driverStandings().then(async (ds) => {
      const s = ds.data.list.find((x) => x.Driver.driverId === id);
      if (!s) { curBox.remove(); return; }
      const res = await F1.api.get(`current/drivers/${id}/results.json?limit=100`, { ttl: F1.api.TTL.HOUR });
      const races = res.data.RaceTable.Races || [];
      const pod = races.filter((r) => +r.Results[0].position <= 3).length;
      const cons = s.Constructors[s.Constructors.length - 1];
      curBox.querySelector(".cur").innerHTML = `<div class="cur-team">${F1.ui.teamLogoApi(cons?.constructorId, 40)}<span><b>${esc(cons?.name || "")}</b><small class="muted">${t("Temporada")} ${esc(ds.data.season)}${F1.data.currentCars[cons?.constructorId] ? ` · ${esc(F1.data.currentCars[cons.constructorId])}` : ""}</small></span></div>` + stats([
        { label: "Posición", value: "P" + s.position }, { label: "Puntos", value: s.points }, { label: "Victorias", value: s.wins }, { label: "Podios", value: pod }, { label: "Carreras", value: races.length },
      ]) + `<h3 style="margin:22px 0 10px">${t("Últimos resultados")}</h3><div class="table-wrap"><table class="timing"><thead><tr><th>${t("Ronda")}</th><th>${t("Gran Premio")}</th><th>${t("Equipo")}</th><th class="num">${t("Salida")}</th><th class="num">${t("Final")}</th><th class="num">Pts</th></tr></thead><tbody>
        ${races.slice(-8).reverse().map((r) => { const x = r.Results[0]; return `<tr class="clickable" data-go="${href.gp(r.season, r.round)}"><td class="pos">${r.round}</td><td>${esc(r.raceName)}</td><td><span class="team-cell">${F1.ui.teamLogoApi(x.Constructor.constructorId, 22)}${esc(x.Constructor.name)}</span></td><td class="num">${esc(x.grid)}</td><td class="num"><b>${esc(x.positionText)}</b></td><td class="num">${esc(x.points)}</td></tr>`; }).join("")}
      </tbody></table></div><p class="note">${t("Temporada")} ${esc(ds.data.season)} · ${F1.u.fmtDateTime(Math.min(ds.ts, res.ts))}</p>`;
    }).catch(() => curBox.remove());

    // Biografía
    const bio = section(main, t("Biografía"), `<div class="prose">${d ? `<p>${esc(d.bio)}</p>` : ""}<div class="wiki-sum">${loading("Cargando resumen de Wikipedia…")}</div></div>`);
    F1.media.summary(drv.img(id, api)).then((s) => {
      bio.querySelector(".wiki-sum").innerHTML = s ? `<p>${esc(s.text)}</p><p class="source-note">${t("Fuente")}: <a href="${esc(s.url)}" target="_blank" rel="noopener">Wikipedia${s.lang !== F1.i18n.lang ? ` (${t(s.lang === "en" ? "en inglés" : "en español")})` : ""}</a>, ${t("licencia CC BY-SA.")}</p>` : "";
    });
    if (d?.highlights?.length) section(main, t("Momentos destacados"), `<ul class="mini-timeline">${d.highlights.map((h) => `<li><b>★</b><span>${esc(h)}</span></li>`).join("")}</ul>`);

    // Galería propia: categorías de Commons del piloto (todas sus temporadas)
    const ph = section(main, t("Galería fotográfica"), `<p class="section-sub small">${t("Retratos, carreras, monoplazas, podios y celebraciones de toda su trayectoria, ordenados por fecha.")}</p><div class="gal-host"></div>`, "wide-sec");
    gallery(ph.querySelector(".gal-host"), {
      cats: [F1.img.driverCat(id, drv.img(id, api))], subject: name, max: 32, exclude: reg ? [reg.file] : [], person: true,
      terms: [api?.familyName || name.split(" ").filter((w) => !/^jr\.?$/i.test(w)).pop()],
      fallbackQuery: `${name} Formula One`, must: [name.split(" ").pop()],
    });

    // Monoplazas que pilotó (con foto)
    const myCars = F1.data.cars.filter((c) => c.drivers.includes(id)).map((c) => c.key);
    if (myCars.length) section(main, t("Monoplazas que pilotó"), "").appendChild(carStrip(myCars));

    // Videos
    const vs = section(main, t("Videos"), `<div></div>`);
    videoGrid(vs.lastElementChild, videosFor(id));

    // Columna lateral
    side.innerHTML = `
      ${titles.length ? `<div class="side-card"><p class="tele-label gold">${t("Campeonatos del mundo")}</p><ul class="title-list" style="margin-top:8px">${titles.map((c) => `<li><b>${c.year}</b>${F1.ui.teamLogo(F1.team.get(c.team), 28, { year: c.year }) || ""}<span><a class="link" href="${href.team(c.team)}">${esc(F1.team.name(c.team))}</a><br/><span class="small muted">${c.carKey ? `<a href="${href.car(c.carKey)}">${esc(c.car)}</a>` : esc(c.car)}</span></span></li>`).join("")}</ul></div>` : ""}
      ${F1.data.social[id] ? `<div class="side-card"><p class="tele-label">${t("Redes sociales oficiales")}</p><div style="margin-top:10px">${F1.ui.social(id, { labels: true })}</div><p class="note">${t("Cuentas verificadas en Wikidata")} · <a class="link" href="https://www.wikidata.org/wiki/${F1.data.social[id].wd}" target="_blank" rel="noopener">${F1.data.social[id].wd}</a></p></div>` : ""}
      <div class="side-card"><p class="tele-label">${t("Trayectoria · equipos")}</p><div class="teams-list" style="margin-top:8px">${loading()}</div></div>
      ${d ? `<div class="side-card"><p class="tele-label">${t("Época")}</p><p style="margin-top:6px" class="mono">${d.era[0]} – ${d.era[1] >= new Date().getFullYear() ? t("en activo") : d.era[1]}</p></div>` : ""}
      ${reg ? `<div class="side-card"><p class="tele-label">${t("Retrato")}</p><p class="small" style="margin-top:6px">${esc(reg.desc)}${reg.kind === "car" ? ` · <em>${t("No hay un retrato libre con el uniforme actual; se muestra al piloto con su monoplaza.")}</em>` : ""}</p><p class="note">${esc(reg.author)} · ${esc(reg.license)} · <a class="link" href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(reg.file.replace(/ /g, "_"))}" target="_blank" rel="noopener">Wikimedia Commons</a></p></div>` : ""}`;
    goRows(body);
  }

  /* =================== EQUIPO =================== */
  async function team(key) {
    let tm = F1.team.get(key) || F1.team.fromApi(key);
    if (!tm) return notFound("el equipo solicitado");
    const cy = F1.champ.constructorYears(tm.key), dy = F1.champ.byTeam(tm.key);
    const L = F1.img.logo(tm.key);
    const { bg, body } = shell({
      title: tm.short, small: tm.name, tc: tm.color, logo: F1.ui.teamLogo(tm, 76),
      meta: [`${flag(tm.nat)} ${esc(F1.nat(tm.nat)[1])}`, `${t("Fundación")}: ${tm.founded}`, `${t("Debut en F1")}: ${tm.debut}`, esc(tm.base)],
      actions: F1.ui.favBtn("team", tm.key, tm.name, "inline") + F1.ui.social(tm.key, { size: "lg" }),
    });
    const [pt, pq] = F1.team.photo(tm);
    setBg(bg, pt, pq);
    const grid = F1.u.el(`<div class="vb-grid"><div class="vb-main"></div><aside class="vb-side"></aside></div>`);
    body.appendChild(grid);
    const main = grid.querySelector(".vb-main"), side = grid.querySelector(".vb-side");

    const st = section(main, t("Palmarés"), `<div class="tstats">${stats([{ label: "Títulos de constructores", value: cy.length }, { label: "Títulos de pilotos", value: dy.length }, { label: "Victorias", value: "…" }, { label: "Poles*", value: "…" }, { label: "Temporadas", value: "…" }])}</div>`);
    F1.stats.teamCareer(tm.ids).then((c) => {
      st.querySelector(".tstats").innerHTML = stats([{ label: "Títulos de constructores", value: cy.length }, { label: "Títulos de pilotos", value: dy.length }, { label: "Victorias", value: c.wins }, { label: "Poles*", value: c.poles }, { label: "Temporadas", value: c.seasons, note: c.first ? `${c.first}–${c.last}` : "" }])
        + `<p class="note">${t("Victorias, poles (salidas desde P1) y temporadas calculadas con Jolpica-F1 sumando las denominaciones del equipo")}: ${esc(tm.ids.join(", "))}.</p>`;
    }).catch((e) => st.insertAdjacentHTML("beforeend", `<p class="note">${t("Victorias y poles no disponibles ahora ({m}).", { m: esc(e.message) })}</p>`));

    section(main, t("Historia"), `<div class="prose"><p>${esc(tm.history)}</p></div>`);

    // Evolución visual de sus monoplazas
    const curCarName = tm.current ? (tm.ids.map((i) => F1.data.currentCars[i]).find(Boolean) || null) : null;
    if (tm.cars.length || curCarName) {
      const ev = section(main, t("Evolución de sus monoplazas"), `<p class="section-sub small">${t("De su primer gran coche al actual, en orden cronológico.")}</p>`);
      ev.appendChild(carStrip(tm.cars, { current: curCarName ? { name: curCarName, title: `${tm.short} ${curCarName}`, q: `!${tm.short} ${curCarName}||${curCarName}` } : null }));
    }

    if (tm.current) {
      const cur = section(main, t("Temporada actual"), `<div>${loading()}</div>`);
      Promise.all([F1.season.last(), F1.season.constructorStandings()]).then(([last, cs]) => {
        const s = cs.data.list.find((x) => tm.ids.includes(x.Constructor.constructorId));
        const drivers = (last.data?.Results || []).filter((r) => tm.ids.includes(r.Constructor.constructorId));
        cur.lastElementChild.innerHTML = (s ? stats([{ label: "Posición", value: "P" + s.position }, { label: "Puntos", value: s.points }, { label: "Victorias", value: s.wins }, { label: "Monoplaza", value: F1.data.currentCars[s.Constructor.constructorId] || "—" }]) : "")
          + `<h3 style="margin:22px 0 10px">${t("Pilotos (último GP: {r})", { r: esc(last.data?.raceName || "—") })}</h3><div class="cur-drivers"></div>`;
        const box = cur.querySelector(".cur-drivers");
        drivers.forEach((r) => {
          const a = F1.u.el(`<a class="cur-driver" href="${href.driver(r.Driver.driverId)}" style="--tc:${tm.color}"><span><span class="gt-num">${esc(r.Driver.permanentNumber || "")}</span><b>${esc(r.Driver.givenName)} ${esc(r.Driver.familyName)}</b><small>${flag(r.Driver.nationality)} ${t("Último GP")}: P${esc(r.positionText)}</small></span></a>`);
          a.prepend(drv.photo(r.Driver.driverId, r.Driver, { w: 330 }));
          box.appendChild(a);
        });
      }).catch(() => cur.remove());
    }
    if (dy.length) {
      const champs = section(main, t("Pilotos campeones con el equipo"), `<div class="champ-strip">${dy.map((c) => `<a class="champ-chip" style="--era-accent:${tm.color}" href="${href.driver(c.driver)}"><b>${c.year}</b>${esc(F1.drv.name(c.driver))}</a>`).join("")}</div>`);
      champs.appendChild(portraitGrid(uniq(dy.map((c) => c.driver))));
    }
    if (tm.drivers.length) {
      const hist = section(main, t("Pilotos históricos"), "");
      hist.appendChild(portraitGrid(tm.drivers));
    }
    if (tm.seasons.length) section(main, t("Temporadas memorables"), `<ul class="mini-timeline">${tm.seasons.map((s) => `<li><b>${s.y}</b><span>${esc(s.t)}</span></li>`).join("")}</ul>`);

    const ph = section(main, t("Galería: historia, garaje, pilotos y celebraciones"), `<div class="gal-host"></div>`, "wide-sec");
    gallery(ph.querySelector(".gal-host"), { cats: F1.img.teamCats[tm.key] || [tm.img], subject: tm.name, max: 32, fallbackQuery: `${tm.short} Formula One`, must: [tm.short.split(" ")[0]] });

    side.innerHTML = `
      <div class="side-card logo-card" style="--tc:${tm.color}">${F1.ui.teamLogo(tm, 110)}
        <div><b>${esc(tm.name)}</b><br/><span class="small muted">${esc(tm.base)}</span></div>
        ${L ? `<p class="note">${t("Logotipo")}${L.season ? ` (${esc(L.season)})` : ""}: ${esc(L.license)} · <a class="link" href="${esc(L.page)}" target="_blank" rel="noopener">${esc(L.source)}</a></p>` : `<p class="note">${t("Sin logotipo disponible: se muestra un monograma con sus colores.")}</p>`}
        ${(F1.img.logos[tm.key] || []).length > 1 ? `<div class="logo-eras">${F1.img.logos[tm.key].map((x) => `<span title="${esc(x.season || "")}"><img src="${esc(x.src)}" alt="" loading="lazy"/><small>${esc(x.season || "")}</small></span>`).join("")}</div>` : ""}
      </div>
      ${F1.data.social[tm.key] ? `<div class="side-card"><p class="tele-label">${t("Redes sociales oficiales")}</p><div style="margin-top:10px">${F1.ui.social(tm.key, { labels: true })}</div><p class="note">${t("Cuentas verificadas en Wikidata")} · <a class="link" href="https://www.wikidata.org/wiki/${F1.data.social[tm.key].wd}" target="_blank" rel="noopener">${F1.data.social[tm.key].wd}</a></p></div>` : ""}
      <div class="side-card"><p class="tele-label">${t("Evolución de la escudería")}</p><ul class="mini-timeline" style="margin-top:8px">${tm.timeline.map((x) => `<li><b>${x.y}</b><span>${esc(x.t)}</span></li>`).join("")}</ul></div>
      ${cy.length ? `<div class="side-card"><p class="tele-label gold">${t("Títulos de constructores")}</p><p class="mono" style="margin-top:8px">${cy.join(" · ")}</p></div>` : ""}`;
  }

  /* =================== MONOPLAZA =================== */
  function car(key) {
    const c = F1.car.get(key);
    if (!c) return notFound("el monoplaza solicitado");
    const tm = F1.team.get(c.team);
    const others = F1.data.cars.filter((x) => x.team === c.team && x.key !== c.key);
    const { bg, body } = shell({
      title: c.name, small: `${tm?.short || ""} · ${c.seasons}`, tc: tm?.color, logo: F1.ui.teamLogo(tm, 60, { year: c.year }) || "",
      meta: [`<a class="link" href="${href.team(c.team)}">${esc(tm?.name || c.team)}</a>`, esc(c.engine)],
      actions: `${F1.ui.favBtn("car", c.key, c.name, "inline")}<a class="btn btn-ghost btn-sm" href="${F1.page("comparador", { tab: "cars", ca: c.key })}">${t("Comparar monoplazas")}</a>`,
    });
    setBg(bg, c.img);
    const cell = (v) => (v ? `<td>${esc(v)}</td>` : `<td class="nd">${t("No documentado")}</td>`);
    const grid = F1.u.el(`<div class="vb-grid"><div class="vb-main"></div><aside class="vb-side"></aside></div>`);
    body.appendChild(grid);
    const main = grid.querySelector(".vb-main"), side = grid.querySelector(".vb-side");
    section(main, t("Historia del vehículo"), `<div class="prose"><p>${esc(c.story)}</p></div>`);
    section(main, t("Innovaciones técnicas"), `<ul class="mini-timeline">${c.innovations.map((i) => `<li><b>⚙</b><span>${esc(i)}</span></li>`).join("")}</ul>`);
    const ph = section(main, t("Fotografías y vistas"), `<p class="section-sub small">${t("Vistas laterales, frontales y traseras, en pista, en boxes y en museos: solo fotografías de este modelo.")}</p><div class="gal-host"></div>`, "wide-sec");
    gallery(ph.querySelector(".gal-host"), { cats: [F1.img.carCats[c.key] || c.img], subject: c.name, max: 28, fallbackQuery: c.name, must: [c.name.split(" ").slice(1).join(" ") || c.name] });
    const pil = section(main, t("Pilotos"), "");
    pil.appendChild(portraitGrid(c.drivers));
    if (others.length) section(main, t("Otros monoplazas de {t}", { t: tm?.short || "" }), "").appendChild(carStrip(others.map((x) => x.key)));
    side.innerHTML = `<div class="side-card"><p class="tele-label">${t("Ficha técnica")}</p><table class="spec-table" style="margin-top:8px"><tbody>
      <tr><th>${t("Nombre oficial")}</th><td>${esc(c.name)}</td></tr><tr><th>${t("Temporada")}</th><td>${esc(c.seasons)}</td></tr><tr><th>${t("Escudería")}</th><td>${esc(tm?.name || c.team)}</td></tr>
      <tr><th>${t("Pilotos")}</th><td>${c.drivers.map((d) => `<a class="link" href="${href.driver(d)}">${esc(F1.drv.name(d))}</a>`).join(", ")}</td></tr>
      <tr><th>${t("Motor")}</th>${cell(c.engine)}</tr><tr><th>${t("Configuración")}</th>${cell(c.layout)}</tr><tr><th>${t("Potencia")}</th>${cell(c.power)}</tr><tr><th>${t("Velocidad máxima")}</th>${cell(c.top)}</tr>
      <tr><th>${t("Títulos")}</th>${cell(c.titles)}</tr><tr><th>${t("Victorias")}</th>${cell(c.wins)}</tr></tbody></table>
      <p class="note">${t("Potencias aproximadas según cifras citadas habitualmente.")}</p></div>`;
  }

  /* =================== CIRCUITO =================== */
  function circuit(key) {
    const c = F1.circuit.get(key);
    if (!c) return notFound("el circuito solicitado");
    const { bg, body } = shell({
      title: c.short, small: c.name,
      meta: [`${F1.ui.flagImg(c.iso, c.country)} ${esc(c.country)} · ${esc(c.city)}`, `${F1.u.fmtKm(c.length)} km`, `${c.turns} ${t("curvas")}`, `${t("Sentido")} ${esc(c.dir.toLowerCase())}`],
      actions: F1.ui.favBtn("circuit", c.key, c.short, "inline"),
    });
    setBg(bg, "", c.photo);
    const trackSec = section(body, t("Trazado interactivo"), `<div class="track-host"></div>`);
    F1.track.render(trackSec.querySelector(".track-host"), { geo: c.geo, length: c.length, name: c.name, dir: c.dir, fallbackTitle: c.map });
    const grid = F1.u.el(`<div class="vb-grid"><div class="vb-main"></div><aside class="vb-side"></aside></div>`);
    body.appendChild(grid);
    const main = grid.querySelector(".vb-main"), side = grid.querySelector(".vb-side");
    const st = section(main, t("Datos del circuito"), `<div class="cstats">${loading("Consultando historial en la API…")}</div>`);
    section(main, t("Descripción"), `<div class="prose"><p>${esc(c.desc)}</p></div>`);
    section(main, t("Momentos inolvidables"), `<ul class="mini-timeline">${c.moments.map((m) => { const y = m.slice(0, 4); return `<li><b><a href="${href.gp(y, c.id)}">${y}</a></b><span>${esc(m.slice(6))}</span></li>`; }).join("")}</ul>`);
    const ph = section(main, t("Galería del circuito"), `<p class="section-sub small">${t("Vistas aéreas, curvas, tribunas y carreras en este trazado.")}</p><div class="gal-host"></div>`, "wide-sec");
    gallery(ph.querySelector(".gal-host"), { cats: [F1.img.circuitCats[c.key] || c.name], subject: c.name, max: 28, fallbackQuery: `${c.short} Formula One Grand Prix`, must: [c.search || c.short.split(" ")[0]] });
    const win = section(main, t("Ganadores históricos"), `<div>${loading()}</div>`);
    side.innerHTML = `<div class="side-card"><p class="tele-label">${t("Plano (Wikipedia)")}</p><div class="map-slot" style="margin-top:10px"></div></div>`;
    side.querySelector(".map-slot").appendChild(F1.media.el(c.map, { w: 500, contain: true, alt: t("Plano de {n}", { n: c.name }) }));

    F1.stats.circuit(c.id).then((d) => {
      const races = d.races;
      const counts = {};
      races.forEach((r) => { const x = r.Results[0]; const k = x.Driver.driverId; (counts[k] = counts[k] || { d: x.Driver, n: 0 }).n++; });
      const top = Object.values(counts).sort((a, b) => b.n - a.n).slice(0, 6);
      st.querySelector(".cstats").innerHTML = stats([
        { label: "Grandes Premios", value: races.length }, { label: "Debut en el Mundial", value: races[0]?.season || "—" }, { label: "Último GP", value: races[races.length - 1]?.season || "—" },
        { label: "Longitud", value: F1.u.fmtKm(c.length) + " km" }, { label: "Curvas", value: c.turns },
        { label: "Vuelta rápida registrada", value: d.fastest?.time || "—", note: d.fastest ? `${d.fastest.driver.givenName} ${d.fastest.driver.familyName}, ${d.fastest.season}` : "" },
      ]) + `<p class="note">${t("\"Vuelta rápida registrada\": la más rápida en carrera según los datos de Jolpica-F1 (completos desde 2004). Puede corresponder a una configuración anterior del trazado y no coincidir con el récord oficial reconocido por la FIA.")}</p>`;
      win.lastElementChild.innerHTML = `
        <p class="tele-label">${t("Más victorias")}</p><div class="top-winners" style="margin:10px 0 22px"></div>
        <div class="table-wrap"><table class="timing"><thead><tr><th>${t("Año")}</th><th>${t("Ganador")}</th><th>${t("Equipo")}</th></tr></thead><tbody>
        ${races.slice(-12).reverse().map((r) => `<tr class="clickable" data-go="${href.gp(r.season, r.round)}"><td class="pos">${r.season}</td><td>${flag(r.Results[0].Driver.nationality)} ${esc(r.Results[0].Driver.givenName)} ${esc(r.Results[0].Driver.familyName)}</td><td><span class="team-cell">${F1.ui.teamLogo(F1.team.fromApi(r.Results[0].Constructor.constructorId), 22, { year: +r.season }) || ""}${esc(r.Results[0].Constructor.name)}</span></td></tr>`).join("")}
        </tbody></table></div>`;
      const tw = win.querySelector(".top-winners");
      top.forEach((x) => {
        const a = F1.u.el(`<a class="tw-item" href="${href.driver(x.d.driverId)}"><span><b>${x.n}</b> ${esc(x.d.givenName)} ${esc(x.d.familyName)}</span></a>`);
        a.prepend(drv.photo(x.d.driverId, x.d, { w: 120, cls: "avatar" }));
        tw.appendChild(a);
      });
    }).catch((e) => { st.querySelector(".cstats").innerHTML = errorBox(t("Historial no disponible ahora ({m}).", { m: e.message })); win.remove(); });
    goRows(body);
  }

  /* =================== GRAN PREMIO =================== */
  async function gp(season, ref) {
    const isRound = /^\d+$/.test(ref);
    const base = isRound ? `${season}/${ref}` : `${season}/circuits/${ref}`;
    const { bg, body } = shell({ title: t("Gran Premio"), small: `${t("Temporada")} ${season}` });
    body.innerHTML = loading("Cargando el Gran Premio desde la API…");
    const ttl = +season < new Date().getFullYear() ? 60 * F1.api.TTL.DAY : F1.api.TTL.HOUR;
    let race, results = [], quali = [], sprint = [];
    try {
      const r = await F1.api.get(`${base}/results.json?limit=100`, { ttl });
      race = r.data.RaceTable.Races[0];
      if (race) results = race.Results;
      else { const s = await F1.api.get(`${base}.json`, { ttl }); race = s.data.RaceTable.Races[0]; }
      if (!race) throw new Error(t("Gran Premio no encontrado"));
      try { const q = await F1.api.get(`${base}/qualifying.json?limit=100`, { ttl }); quali = q.data.RaceTable.Races[0]?.QualifyingResults || []; } catch {}
      if (race.Sprint || +season >= 2021) { try { const sp = await F1.api.get(`${base}/sprint.json?limit=100`, { ttl }); sprint = sp.data.RaceTable.Races[0]?.SprintResults || []; } catch {} }
    } catch (e) {
      body.innerHTML = errorBox(t("No se pudo cargar el Gran Premio ({m}).", { m: e.message }));
      return;
    }
    const cKey = F1.data.circuits.find((c) => c.id === race.Circuit.circuitId);
    const v = $("#view");
    const yr = +race.season;
    v.querySelector(".vh h1").innerHTML = `<small>${t("Temporada")} ${esc(race.season)} · ${t("Ronda")} ${esc(race.round)}</small>${esc(race.raceName)}`;
    v.querySelector(".vh-meta").innerHTML = [`📍 ${cKey ? `<a class="link" href="${href.circuit(cKey.key)}">${esc(race.Circuit.circuitName)}</a>` : esc(race.Circuit.circuitName)}`, `${esc(race.Circuit.Location.locality)}, ${esc(race.Circuit.Location.country)}`, `📅 ${fmtDate(race.date, { day: "numeric", month: "long", year: "numeric" })}`].map((m) => `<span>${m}</span>`).join("");
    v.querySelector(".vh-actions").innerHTML = F1.ui.favBtn("race", `${race.season}-${race.round}`, `${race.raceName} ${race.season}`, "inline");
    if (cKey) setBg(bg, "", cKey.photo); else setBg(bg, F1.u.wikiTitleFromUrl(race.Circuit.url) || race.Circuit.circuitName);
    body.innerHTML = "";
    const logo = (r) => F1.ui.teamLogo(F1.team.fromApi(r.Constructor.constructorId), 22, { year: yr }) || `<span class="team-bar" style="background:${F1.team.color(r.Constructor.constructorId)}"></span>`;

    if (!results.length) {
      const sess = [["FirstPractice", "Libres 1"], ["SecondPractice", "Libres 2"], ["ThirdPractice", "Libres 3"], ["SprintQualifying", "Clasificación sprint"], ["Sprint", "Sprint"], ["Qualifying", "Clasificación"]];
      section(body, t("Programa del fin de semana"), `<div class="side-card"><ul class="sessions">${sess.filter(([k]) => race[k]).map(([k, l]) => `<li><span>${t(l)}</span><span>${F1.u.fmtDateTime(sessionDate(race[k]))}</span></li>`).join("")}<li><span><b>${t("Carrera")}</b></span><span><b>${F1.u.fmtDateTime(sessionDate(race))}</b></span></li></ul><p class="note">${t("Este Gran Premio aún no se ha disputado. Los resultados aparecerán automáticamente cuando la API los publique.")}</p></div>`);
    } else {
      const winner = results[0], pole = quali[0] || results.find((r) => r.grid === "1");
      const fl = results.find((r) => r.FastestLap?.rank === "1");
      const dnf = results.filter((r) => !/^\d+$/.test(r.positionText));
      section(body, t("Resumen"), stats([
        { label: "Ganador", value: `${winner.Driver.familyName}`, note: winner.Constructor.name }, { label: "Pole position", value: pole ? pole.Driver.familyName : "—", note: quali[0]?.Q3 || quali[0]?.Q2 || quali[0]?.Q1 || "" },
        { label: "Vuelta rápida", value: fl ? fl.Driver.familyName : "—", note: fl?.FastestLap?.Time?.time || "" }, { label: "Clasificados", value: results.length - dnf.length, note: t("de {n} participantes", { n: results.length }) },
        { label: "Abandonos", value: dnf.length }, { label: "Vueltas", value: winner.laps },
      ]));
      const pod = section(body, t("Podio"), `<div class="podium-photos"></div>`);
      results.slice(0, 3).forEach((r, i) => {
        const a = F1.u.el(`<a class="pod-card p${i + 1}" href="${href.driver(r.Driver.driverId)}"><span class="pod-pos">P${i + 1}</span><span class="pod-info"><b>${flag(r.Driver.nationality)} ${esc(r.Driver.givenName)} ${esc(r.Driver.familyName)}</b><small>${logo(r)} ${esc(r.Constructor.name)} · ${esc(r.Time?.time || r.status)}</small></span></a>`);
        a.prepend(drv.photo(r.Driver.driverId, r.Driver, { w: 330 }));
        pod.querySelector(".podium-photos").appendChild(a);
      });
      const tbl = (rows, cols) => `<div class="table-wrap"><table class="timing"><thead><tr>${cols.map((c) => `<th class="${c[2] || ""}">${t(c[0])}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr class="clickable p${r.position}" data-go="${href.driver(r.Driver.driverId)}">${cols.map((c) => `<td class="${c[2] || ""}">${c[1](r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      const drvCell = (r) => `${flag(r.Driver.nationality)} ${esc(r.Driver.givenName)} ${esc(r.Driver.familyName)}`;
      const teamCell = (r) => `<span class="team-cell">${logo(r)}${esc(r.Constructor.name)}</span>`;
      const tabsHost = section(body, t("Resultados completos"), `<div class="gp-tabs"></div><div class="gp-tab-body"></div>`);
      const tabsList = [{ id: "race", label: "Carrera" }, { id: "grid", label: "Parrilla de salida" }];
      if (quali.length) tabsList.push({ id: "quali", label: "Clasificación" });
      if (sprint.length) tabsList.push({ id: "sprint", label: "Sprint" });
      tabsList.push({ id: "fl", label: "Vueltas rápidas" }, { id: "dnf", label: "Abandonos" });
      const tb = tabsHost.querySelector(".gp-tab-body");
      F1.ui.tabs(tabsHost.querySelector(".gp-tabs"), tabsList, (id) => {
        if (id === "race") tb.innerHTML = tbl(results, [["Pos", (r) => r.positionText, "pos"], ["Piloto", drvCell], ["Equipo", teamCell], ["Salida", (r) => r.grid === "0" ? "Pit" : r.grid, "num"], ["Vueltas", (r) => r.laps, "num"], ["Tiempo / estado", (r) => esc(r.Time?.time || r.status), "num"], ["Pts", (r) => r.points, "num"]]);
        if (id === "grid") tb.innerHTML = tbl(results.slice().sort((a, b) => (+a.grid || 99) - (+b.grid || 99)), [["Salida", (r) => (r.grid === "0" ? "Pit lane" : r.grid), "pos"], ["Piloto", drvCell], ["Equipo", teamCell], ["Final", (r) => r.positionText, "num"]]);
        if (id === "quali") tb.innerHTML = tbl(quali, [["Pos", (r) => r.position, "pos"], ["Piloto", drvCell], ["Equipo", teamCell], ["Q1", (r) => r.Q1 || "—", "num"], ["Q2", (r) => r.Q2 || "—", "num"], ["Q3", (r) => r.Q3 || "—", "num"]]);
        if (id === "sprint") tb.innerHTML = tbl(sprint, [["Pos", (r) => r.positionText, "pos"], ["Piloto", drvCell], ["Equipo", teamCell], ["Tiempo / estado", (r) => esc(r.Time?.time || r.status), "num"], ["Pts", (r) => r.points, "num"]]);
        if (id === "fl") { const f = results.filter((r) => r.FastestLap).sort((a, b) => +a.FastestLap.rank - +b.FastestLap.rank); tb.innerHTML = f.length ? tbl(f, [["#", (r) => r.FastestLap.rank, "pos"], ["Piloto", drvCell], ["Equipo", teamCell], ["Vuelta", (r) => r.FastestLap.lap, "num"], ["Tiempo", (r) => r.FastestLap.Time?.time || "—", "num"]]) : `<p class="muted">${t("La API no dispone de vueltas rápidas para esta carrera (datos completos desde 2004).")}</p>`; }
        if (id === "dnf") { const f = results.filter((r) => !/^\d+$/.test(r.positionText)); tb.innerHTML = f.length ? tbl(f, [["Piloto", drvCell], ["Equipo", teamCell], ["Vueltas", (r) => r.laps, "num"], ["Motivo", (r) => esc(r.status)]]) : `<p class="muted">${t("Todos los participantes fueron clasificados.")}</p>`; }
      });
    }
    // Fotografías del Gran Premio (categoría de Commons del evento)
    const ph = section(body, t("Fotografías del Gran Premio"), `<div class="gal-host"></div>`);
    gallery(ph.querySelector(".gal-host"), { cats: [`${race.season} ${race.raceName}`], subject: `${race.raceName} ${race.season}`, max: 24, min: 4, fallbackQuery: `${race.season} ${race.raceName}`, must: [String(race.season), "grand prix|gp|formula|f1"] });
    // Videos relacionados
    const plays = F1.data.plays.filter((p) => p.gp && +p.gp[0] === +race.season && p.gp[1] === race.Circuit.circuitId);
    const vs = section(body, t("Videos"), `<div></div>`);
    if (plays.length) videoGrid(vs.lastElementChild, plays.map((p) => ({ ids: p.video, title: p.title, sub: `${p.year} · ${p.circuit}` })));
    else vs.lastElementChild.innerHTML = `<div class="state">${t("No hay un video verificado para este Gran Premio en la plataforma.")} <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/results?search_query=${encodeURIComponent(`${race.season} ${race.raceName} highlights`)}" target="_blank" rel="noopener">${t("Buscar resúmenes en YouTube (sitio externo)")} ↗</a></div>`;
    goRows(body);
  }

  /* =================== RIVALIDAD =================== */
  async function rivalry(id) {
    const r = F1.data.rivalries.find((x) => x.id === id);
    if (!r) return notFound("la rivalidad solicitada");
    const A = drv.get(r.a), B = drv.get(r.b);
    const { bg, body } = shell({ title: r.title, small: r.tagline, meta: [`${t("Temporadas")}: ${r.seasons.join(", ")}`], actions: `<a class="btn btn-ghost btn-sm" href="${F1.page("comparador", { a: r.a, b: r.b })}">${t("Abrir en el comparador")}</a>` });
    bg.style.display = "grid"; bg.style.gridTemplateColumns = "1fr 1fr";
    bg.append(drv.photo(r.a, null, { w: 960, eager: true }), drv.photo(r.b, null, { w: 960, eager: true }));
    bg.querySelectorAll(".media").forEach((m) => (m.style.position = "relative"));
    const vid = section(body, t("Video"), `<div style="max-width:900px"></div>`);
    vid.lastElementChild.appendChild(F1.video.node({ ids: r.video, title: r.title, sub: r.tagline }));
    section(body, t("La historia"), `<div class="prose">${r.story.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`);
    const cmp = section(body, t("Estadísticas comparativas (toda la carrera)"), `<div>${loading("Calculando con la API…")}</div>`);
    const seas = section(body, t("Temporadas compartidas: clasificación final"), `<div>${loading()}</div>`);
    section(body, t("Carreras decisivas"), `<ul class="mini-timeline">${r.decisive.map((x) => `<li><b><a href="${href.gp(x.gp[0], x.gp[1])}">${x.year}</a></b><span>${esc(x.text)} <a class="link small" href="${href.gp(x.gp[0], x.gp[1])}">${t("Resultados")} →</a></span></li>`).join("")}</ul>`);
    const ga = section(body, t("Galería: {n}", { n: A.name }), `<div class="gal-host"></div>`);
    gallery(ga.querySelector(".gal-host"), { cats: [F1.img.driverCat(r.a, A.img)], subject: A.name, max: 14, mosaic: 5, person: true, terms: [A.name.split(" ").pop()] });
    const gb = section(body, t("Galería: {n}", { n: B.name }), `<div class="gal-host"></div>`);
    gallery(gb.querySelector(".gal-host"), { cats: [F1.img.driverCat(r.b, B.img)], subject: B.name, max: 14, mosaic: 5, person: true, terms: [B.name.split(" ").pop()] });
    try {
      const [ca, cb] = [await F1.stats.driverCareer(r.a), await F1.stats.driverCareer(r.b)];
      const row = (l, a, b) => `<tr><th>${t(l)}</th><td class="num">${a}</td><td class="num">${b}</td></tr>`;
      cmp.lastElementChild.innerHTML = `<div class="table-wrap"><table class="timing"><thead><tr><th></th><th class="num">${esc(A.name)}</th><th class="num">${esc(B.name)}</th></tr></thead><tbody>
        ${row("Títulos", F1.champ.years(r.a).length, F1.champ.years(r.b).length)}${row("Grandes Premios", ca.starts, cb.starts)}${row("Victorias", ca.wins, cb.wins)}${row("Podios", ca.podiums, cb.podiums)}${row("Poles*", ca.poles, cb.poles)}${row("Temporadas", `${ca.seasons} (${ca.first}–${ca.last})`, `${cb.seasons} (${cb.first}–${cb.last})`)}
        </tbody></table></div><p class="note">${t("* Salidas desde P1 de parrilla. Fuente: Jolpica-F1.")}</p>`;
    } catch (e) { cmp.lastElementChild.innerHTML = errorBox(t("No disponible ahora ({m}).", { m: e.message })); }
    try {
      const rows = [];
      for (const y of r.seasons) {
        const s = await F1.stats.standings(y);
        const a = s.find((x) => x.Driver.driverId === r.a), b = s.find((x) => x.Driver.driverId === r.b);
        const fmt = (x) => x ? `P${x.position} · ${x.points} pts · ${x.wins} ${t("vict.")}` : "—";
        rows.push(`<tr><td class="pos">${y}</td><td class="num">${fmt(a)}</td><td class="num">${fmt(b)}</td><td>${esc(F1.drv.name(s[0]?.Driver.driverId, s[0]?.Driver))}</td></tr>`);
      }
      seas.lastElementChild.innerHTML = `<div class="table-wrap"><table class="timing"><thead><tr><th>${t("Año")}</th><th class="num">${esc(A.name)}</th><th class="num">${esc(B.name)}</th><th>${t("Campeón")}</th></tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
    } catch (e) { seas.lastElementChild.innerHTML = errorBox(t("No disponible ahora ({m}).", { m: e.message })); }
  }

  /* =================== JUGADA =================== */
  function play(id) {
    const p = F1.data.plays.find((x) => x.id === id);
    if (!p) return notFound("la jugada solicitada");
    const { bg, body } = shell({
      title: p.title, small: `${p.year} · ${p.circuit}`,
      meta: p.types.map((x) => `<span class="tag">${esc(F1.data.playTypes[x])}</span>`),
      actions: `${F1.ui.favBtn("play", p.id, p.title, "inline")}${p.gp ? `<a class="btn btn-ghost btn-sm" href="${href.gp(p.gp[0], p.gp[1])}">${t("Resultados del GP")}</a>` : ""}`,
    });
    setBg(bg, p.img);
    const vid = section(body, t("Video"), `<div style="max-width:960px"></div>`);
    vid.lastElementChild.appendChild(F1.video.node({ ids: p.video, title: p.title, sub: `${p.circuit} · ${p.year}` }));
    section(body, t("La jugada"), `<dl class="kv" style="font-size:1rem;gap:12px 20px"><dt>${t("Contexto")}</dt><dd>${esc(p.context)}</dd><dt>${t("Qué pasó")}</dt><dd>${esc(p.desc)}</dd><dt>${t("Resultado")}</dt><dd>${esc(p.result)}</dd>
      <dt>${t("Pilotos")}</dt><dd>${p.drivers.map((d) => `<a class="link" href="${href.driver(d)}">${esc(F1.drv.name(d))}</a>`).join(", ") || "—"}</dd><dt>${t("Circuito")}</dt><dd>${esc(p.circuit)}</dd><dt>${t("Año")}</dt><dd>${p.year}</dd></dl>`);
    if (p.drivers.length) section(body, t("Protagonistas"), "").appendChild(portraitGrid(p.drivers));
    // Fotografías del Gran Premio en el que ocurrió (nombre oficial desde la API)
    if (p.gp) {
      const ph = section(body, t("Fotografías de aquel Gran Premio"), `<div class="gal-host"></div>`);
      const host = ph.querySelector(".gal-host");
      F1.u.whenVisible(host, async () => {
        let raceName = "";
        try { const r = await F1.api.get(`${p.gp[0]}/circuits/${p.gp[1]}.json`, { ttl: 60 * F1.api.TTL.DAY }); raceName = r.data.RaceTable.Races[0]?.raceName || ""; } catch {}
        const cats = raceName ? [`${p.gp[0]} ${raceName}`] : [];
        F1.gallery.commons(host, { cats, subject: `${raceName || p.circuit} ${p.year}`, max: 20, min: 4, fallbackQuery: `${p.year} ${raceName || p.circuit}`, must: [String(p.year)] });
      });
    }
    const rel = F1.data.plays.filter((x) => x.id !== p.id && x.drivers.some((d) => p.drivers.includes(d))).slice(0, 4);
    if (rel.length) {
      const rs = section(body, t("Jugadas relacionadas"), `<div class="grid sm rel-plays"></div>`);
      rel.forEach((x) => {
        const a = F1.u.el(`<a class="card clickable" href="${href.play(x.id)}"><div class="card-body"><span class="tele-label">${x.year}</span><h3>${esc(x.title)}</h3></div></a>`);
        a.prepend(F1.media.el(x.img, { w: 500, alt: x.title }));
        rs.querySelector(".rel-plays").appendChild(a);
      });
    }
  }

  return { driver, team, car, circuit, gp, rivalry, play };
})();
