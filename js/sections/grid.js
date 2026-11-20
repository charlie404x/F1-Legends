/* =========================================================
   Parrilla actual: equipos con sus pilotos del último GP,
   logotipo, colores, número, retrato, monoplaza y puntos.
   ========================================================= */
F1.sections.grid = (function () {
  const { $, esc, loading, errorBox } = F1.u;
  const { href, flag, drv } = F1.ui;
  const t = F1.t;

  async function render() {
    const host = $("#currentGrid");
    host.innerHTML = loading("Cargando alineaciones desde la API…");
    try {
      const [last, cs, ds] = await Promise.all([F1.season.last(), F1.season.constructorStandings(), F1.season.driverStandings()]);
      if (!last.data) throw new Error(t("todavía no hay carreras disputadas"));
      const pts = Object.fromEntries(ds.data.list.map((s) => [s.Driver.driverId, s]));
      const teams = {};
      last.data.Results.forEach((r) => { (teams[r.Constructor.constructorId] = teams[r.Constructor.constructorId] || { c: r.Constructor, drivers: [] }).drivers.push(r.Driver); });
      const order = cs.data.list.map((s) => s.Constructor.constructorId);
      const ids = Object.keys(teams).sort((a, b) => order.indexOf(a) - order.indexOf(b));
      host.innerHTML = `
        <div class="live-meta">${F1.ui.freshness(last.ts, last.stale)}<span class="tag neutral">${t("Alineación del {r} {s}", { r: esc(last.data.raceName), s: esc(last.data.season) })}</span><span class="tag neutral">${t("{a} equipos · {b} pilotos", { a: ids.length, b: last.data.Results.length })}</span></div>
        <div class="grid-teams"></div>`;
      const wrap = host.querySelector(".grid-teams");
      ids.forEach((cid, i) => {
        const T = teams[cid], tm = F1.team.fromApi(cid), st = cs.data.list.find((s) => s.Constructor.constructorId === cid);
        const car = F1.data.currentCars[cid];
        const el = F1.u.el(`
          <article class="gt reveal" style="--tc:${tm?.color || "#888"};transition-delay:${Math.min(i, 6) * 50}ms">
            <div class="gt-head">
              <div class="team-head">${F1.ui.teamLogo(tm || { mono: T.c.name.slice(0, 2), color: "#888", key: cid, name: T.c.name }, 46)}<div><h3>${esc(T.c.name)}</h3><span class="tele-label">${flag(T.c.nationality)} ${car ? `${t("Monoplaza")} ${esc(car)}` : ""}</span></div></div>
              <div style="text-align:right"><span class="mono" style="font-size:1.4rem;font-weight:600">${esc(st?.points ?? "—")}</span><br/><span class="tele-label">P${esc(st?.position ?? "—")} · pts</span></div>
            </div>
            <div class="gt-social">${F1.ui.social(tm?.key || cid, { size: "sm" })}</div>
            <div class="gt-car"></div>
            <div class="gt-drivers"></div>
            <a class="btn btn-ghost btn-sm" style="margin:12px 18px 16px 24px" href="${href.team(tm?.key || cid)}">${t("Ficha del equipo, resultados y estadísticas")} →</a>
          </article>`);
        // Foto del monoplaza de la temporada (Commons, el nombre del archivo debe contener el modelo)
        el.querySelector(".gt-car").appendChild(F1.media.el(`${T.c.name} ${car || ""}`.trim(), { w: 960, alt: `${t("Monoplaza")} ${car || ""} · ${T.c.name}`, q: car ? `!${(tm?.short || T.c.name)} ${car}||${car}` : `!${T.c.name} Formula One car||${T.c.name.split(" ")[0]}`, fallback: car ? `${T.c.name} ${car}` : T.c.name }));
        T.drivers.forEach((d) => {
          const s = pts[d.driverId];
          const de = F1.u.el(`<a class="gt-driver" href="${href.driver(d.driverId)}"><div><span class="gt-num">${esc(d.permanentNumber || "")}</span><br/><b>${esc(d.givenName)} ${esc(d.familyName)}</b><br/><span class="small muted">${flag(d.nationality)} ${s ? `P${esc(s.position)} · ${esc(s.points)} pts` : "—"}</span></div></a>`);
          de.prepend(drv.photo(d.driverId, d, { w: 330 }));
          const soc = F1.ui.social(d.driverId, { size: "sm" });
          const box = F1.u.el(`<div class="gt-driver-wrap"></div>`); box.appendChild(de);
          if (soc) box.insertAdjacentHTML("beforeend", soc);
          el.querySelector(".gt-drivers").appendChild(box);
        });
        wrap.appendChild(el);
      });
      F1.u.reveal(host);
    } catch (e) {
      host.innerHTML = errorBox(t("No se pudo cargar la parrilla actual ({m}).", { m: e.message }), "gridRetry");
      $("#gridRetry")?.addEventListener("click", render);
    }
  }
  return { init() { render(); F1.auto.on("season", render); } };
})();
