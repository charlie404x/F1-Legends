/* =========================================================
   Comparadores: pilotos (toda la carrera o una temporada
   concreta, claramente diferenciados) y monoplazas.
   ========================================================= */
F1.sections.compare = (function () {
  const { $, esc, loading, errorBox } = F1.u;
  const { href } = F1.ui;
  const t = F1.t;
  const qp = new URLSearchParams(location.search);
  const st = { a: qp.get("a") || "senna", b: qp.get("b") || "prost", mode: "career", season: "" };
  let options = [];

  function driverOptions() {
    const map = new Map(F1.data.drivers.map((d) => [d.id, { v: d.id, l: d.name, img: d.img, nat: d.nat }]));
    const cur = F1.sections.drivers.getCurrent();
    (cur?.list || []).forEach((s) => { if (!map.has(s.Driver.driverId)) map.set(s.Driver.driverId, { v: s.Driver.driverId, l: `${s.Driver.givenName} ${s.Driver.familyName}`, img: F1.drv.img(s.Driver.driverId, s.Driver), nat: s.Driver.nationality }); });
    options = Array.from(map.values()).sort((a, b) => a.l.localeCompare(b.l));
  }

  function bars(rows, A, B) {
    return `<div class="bar-compare">${rows.map((r) => {
      const a = r.a ?? 0, b = r.b ?? 0, max = Math.max(a, b, 1);
      return `<div class="bc-row"><div class="bc-side l"><span class="bc-val">${r.fa ? r.fa(a) : a}</span><div class="bc-bar" style="width:${(a / max) * 100}%"></div></div>
        <div class="bc-label">${esc(r.l)}</div>
        <div class="bc-side r"><div class="bc-bar" style="width:${(b / max) * 100}%"></div><span class="bc-val">${r.fa ? r.fa(b) : b}</span></div></div>`;
    }).join("")}</div>`;
  }

  function heads(A, B) {
    const h = (o, side) => `<div class="cmp-head ${side}"><div class="media-slot"></div><div><span class="tele-label">${F1.ui.flag(o.nat)} ${esc(F1.nat(o.nat)[1])}</span><h3><a href="${href.driver(o.v)}">${esc(o.l)}</a></h3></div></div>`;
    return `<div class="cmp-heads">${h(A, "")}${h(B, "r")}</div>`;
  }

  async function runDrivers() {
    const out = $("#cmpOut");
    const A = options.find((o) => o.v === st.a), B = options.find((o) => o.v === st.b);
    if (!A || !B) return;
    out.innerHTML = loading("Calculando estadísticas desde la API…");
    history.replaceState(null, "", F1.page("comparador", { a: A.v, b: B.v }));
    try {
      const [ca, cb] = [await F1.stats.driverCareer(A.v), await F1.stats.driverCareer(B.v)];
      const common = ca.seasonList.filter((y) => cb.seasonList.includes(y));
      const seasonSel = `<select class="select" id="cmpSeason" aria-label="Temporada">${common.length ? common.map((y) => `<option ${String(y) === st.season ? "selected" : ""}>${y}</option>`).join("") : `<option value=''>${t("Sin temporadas en común")}</option>`}</select>`;
      let body = "";
      if (st.mode === "career") {
        const ta = F1.champ.years(A.v).length, tb = F1.champ.years(B.v).length;
        const pct = (w, s) => (s ? Math.round((w / s) * 1000) / 10 : 0);
        body = `<p class="tele-label gold" style="margin-bottom:16px">${t("Estadísticas de TODA la carrera deportiva")}</p>` + bars([
          { l: "Campeonatos", a: ta, b: tb }, { l: "Victorias", a: ca.wins, b: cb.wins }, { l: "Podios", a: ca.podiums, b: cb.podiums },
          { l: "Poles*", a: ca.poles, b: cb.poles }, { l: "Carreras", a: ca.starts, b: cb.starts }, { l: "Temporadas", a: ca.seasons, b: cb.seasons },
          { l: "% victorias", a: pct(ca.wins, ca.starts), b: pct(cb.wins, cb.starts), fa: (v) => v + "%" },
        ]) + `<p class="note">${t("* Salidas desde la posición 1 de parrilla según Jolpica-F1; puede diferir ligeramente de las poles oficiales por sanciones.")} ${t("Trayectorias")}: ${ca.first}–${ca.last} / ${cb.first}–${cb.last}.</p>`;
      } else {
        const year = st.season || common[common.length - 1];
        if (!year) body = `<div class="state">${t("Estos pilotos no coincidieron en ninguna temporada.")}</div>`;
        else {
          st.season = String(year);
          const [stand, season] = [await F1.stats.standings(year), await F1.stats.season(year).catch(() => null)];
          const sa = stand.find((s) => s.Driver.driverId === A.v), sb = stand.find((s) => s.Driver.driverId === B.v);
          const xa = season?.by[A.v], xb = season?.by[B.v];
          body = `<p class="tele-label gold" style="margin-bottom:16px">${t("Estadísticas SOLO de la temporada {y}", { y: year })}</p>` + bars([
            { l: "Posición final", a: sa ? +sa.position : 0, b: sb ? +sb.position : 0, fa: (v) => (v ? "P" + v : "—") },
            { l: "Puntos", a: sa ? +sa.points : 0, b: sb ? +sb.points : 0 }, { l: "Victorias", a: sa ? +sa.wins : 0, b: sb ? +sb.wins : 0 },
            { l: "Podios", a: xa?.podiums ?? 0, b: xb?.podiums ?? 0 }, { l: "Poles", a: xa?.poles ?? 0, b: xb?.poles ?? 0 },
            { l: "Abandonos", a: xa?.dnf ?? 0, b: xb?.dnf ?? 0 },
          ]) + `<p class="note">${t("En \"Posición final\" una barra más corta es mejor. Poles de temporada según la clasificación oficial (disponible en la API desde 1994 aproximadamente).")}</p>`;
        }
      }
      out.innerHTML = heads(A, B) + `<div class="cmp-mode filters-row">${F1.ui.chips([{ v: "career", l: "Toda la carrera" }, { v: "season", l: "Una temporada" }], { name: "Modo", value: st.mode, allLabel: "" })}${st.mode === "season" ? seasonSel : ""}</div>` + body;
      out.querySelectorAll(".media-slot").forEach((slot, i) => slot.replaceWith(F1.ui.drv.photo((i ? B : A).v, null, { w: 330 })));
      F1.ui.bindChips(out.querySelector(".cmp-mode"), (v) => { st.mode = v; runDrivers(); });
      out.querySelector("#cmpSeason")?.addEventListener("change", (e) => { st.season = e.target.value; runDrivers(); });
    } catch (e) {
      out.innerHTML = errorBox(t("No se pudieron calcular las estadísticas ({m}). La API tiene un límite de peticiones por hora; inténtalo más tarde.", { m: e.message }), "cmpRetry");
      $("#cmpRetry").addEventListener("click", runDrivers);
    }
  }

  function runCars() {
    const a = F1.car.get($("#carA").value), b = F1.car.get($("#carB").value);
    const rows = [["Temporada", (c) => c.seasons], ["Escudería", (c) => F1.team.name(c.team)], ["Pilotos", (c) => c.drivers.map((d) => F1.drv.name(d)).join(", ")],
      ["Motor", (c) => c.engine], ["Configuración", (c) => c.layout], ["Potencia", (c) => c.power], ["Velocidad máxima", (c) => c.top], ["Títulos", (c) => c.titles], ["Victorias", (c) => c.wins],
      ["Innovaciones", (c) => c.innovations.join(" · ")]];
    const cell = (v) => (v ? `<td>${esc(v)}</td>` : `<td class="nd">${t("No documentado")}</td>`);
    $("#carOut").innerHTML = `
      <div class="cmp-heads"><div class="car-slot-a"></div><div class="car-slot-b"></div></div>
      <div class="table-wrap"><table class="spec-table"><thead><tr><th></th><th><a class="link" href="${href.car(a.key)}">${esc(a.name)}</a></th><th><a class="link" href="${href.car(b.key)}">${esc(b.name)}</a></th></tr></thead>
      <tbody>${rows.map(([l, f]) => `<tr><th>${t(l)}</th>${cell(f(a))}${cell(f(b))}</tr>`).join("")}</tbody></table></div>`;
    $("#carOut .car-slot-a").replaceWith(F1.media.el(a.img, { w: 500, alt: a.name, cls: "card" }));
    $("#carOut .car-slot-b").replaceWith(F1.media.el(b.img, { w: 500, alt: b.name, cls: "card" }));
    $$("#carOut .media").forEach((m) => (m.style.aspectRatio = "16/9"));
  }
  const $$ = F1.u.$$;

  async function init() {
    const host = $("#compare");
    host.innerHTML = `<div id="cmpTabs"></div><div id="cmpBody"></div>`;
    F1.ui.tabs($("#cmpTabs"), [{ id: "drivers", label: "Comparador de pilotos" }, { id: "cars", label: "Comparador de monoplazas" }], async (id) => {
      const body = $("#cmpBody");
      if (id === "drivers") {
        try { await F1.sections.drivers.loadCurrent(); } catch {}
        driverOptions();
        const sel = (sid, v) => `<select class="select" id="${sid}" aria-label="${t("Piloto")}">${options.map((o) => `<option value="${esc(o.v)}" ${o.v === v ? "selected" : ""}>${esc(o.l)}</option>`).join("")}</select>`;
        body.innerHTML = `<div class="cmp-pickers">${sel("cmpA", st.a)}<span class="cmp-vs">VS</span>${sel("cmpB", st.b)}</div><div id="cmpOut"></div>`;
        $("#cmpA").addEventListener("change", (e) => { st.a = e.target.value; st.season = ""; runDrivers(); });
        $("#cmpB").addEventListener("change", (e) => { st.b = e.target.value; st.season = ""; runDrivers(); });
        F1.u.whenVisible(body, runDrivers, "200px");
      } else {
        const opts = F1.data.cars.map((c) => `<option value="${c.key}">${esc(c.name)} (${esc(c.seasons)})</option>`).join("");
        body.innerHTML = `<div class="cmp-pickers"><select class="select" id="carA" aria-label="${t("Monoplaza")} A">${opts}</select><span class="cmp-vs">VS</span><select class="select" id="carB" aria-label="${t("Monoplaza")} B">${opts}</select></div><div id="carOut"></div>`;
        $("#carA").value = F1.car.get(qp.get("ca")) ? qp.get("ca") : "mclaren_mp4_4"; $("#carB").value = F1.car.get(qp.get("cb")) ? qp.get("cb") : "red_bull_rb19";
        $("#carA").addEventListener("change", runCars); $("#carB").addEventListener("change", runCars);
        runCars();
      }
    }, qp.get("tab") === "cars" || qp.get("ca") ? "cars" : "drivers");
  }

  /** Preselecciona dos pilotos y abre el comparador (desde fichas). */
  function preset(a, b) { st.a = a; if (b) st.b = b; st.mode = "career"; }
  return { init, preset };
})();
