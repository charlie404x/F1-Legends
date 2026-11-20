/* Circuitos del mundo: tarjetas con plano + acceso a ficha con trazado interactivo. */
F1.sections.circuits = (function () {
  const { $, esc } = F1.u;
  const { href } = F1.ui;

  const t = F1.t;
  function init() {
    const host = $("#circuits");
    host.innerHTML = `
      <div class="toolbar"><div id="cirChips">${F1.ui.chips([{ v: "cal", l: t("En el calendario actual") }, { v: "hist", l: t("Históricos") }], { name: t("Circuitos"), allLabel: "Todos" })}</div>
      <span class="count-label">${t("Pulsa un circuito para ver su trazado interactivo, fotografías y ganadores")}</span></div>
      <div class="grid" id="cirGrid"></div>`;
    const grid = $("#cirGrid");
    let calendarIds = null;
    const render = (f) => {
      grid.innerHTML = "";
      F1.data.circuits.filter((c) => f === "all" || !calendarIds || (f === "cal" ? calendarIds.has(c.id) : !calendarIds.has(c.id))).forEach((c, i) => {
        const card = F1.u.el(`
          <article class="card clickable circuit-card reveal" tabindex="0" role="link" aria-label="${t("Ficha de {n}", { n: esc(c.name) })}" style="transition-delay:${Math.min(i, 8) * 40}ms">
            ${F1.ui.favBtn("circuit", c.key, c.short)}
            <div class="card-body">
              <span class="tele-label">${F1.ui.flagImg(c.iso, c.country)} ${esc(c.country)} · ${esc(c.city)}</span>
              <h3>${esc(c.short)}</h3>
              <p>${esc(c.desc)}</p>
              <div class="card-foot"><span class="mono">${F1.u.fmtKm(c.length)} km · ${c.turns} ${t("curvas")}</span>${calendarIds && calendarIds.has(c.id) ? `<span class="tag ok">${t("Calendario actual")}</span>` : ""}</div>
            </div>
          </article>`);
        // Foto real del circuito con el plano superpuesto
        const ph = F1.media.el("", { w: 500, alt: c.name, q: c.photo });
        ph.classList.add("cir-photo");
        const map = F1.media.el(c.map, { w: 250, alt: t("Plano de {n}", { n: c.name }), contain: true, cls: "cir-map" });
        ph.appendChild(map);
        card.prepend(ph);
        const go = () => F1.u.go(href.circuit(c.key));
        card.addEventListener("click", go);
        card.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
        grid.appendChild(card);
      });
      F1.u.reveal(grid);
    };
    let filter = "all";
    F1.ui.bindChips($("#cirChips"), (v) => { filter = v; render(v); });
    render("all");
    F1.season.schedule().then((s) => { calendarIds = new Set(s.data.map((r) => r.Circuit.circuitId)); render(filter); }).catch(() => {});
  }
  return { init };
})();
