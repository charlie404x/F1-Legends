/* Línea de tiempo interactiva con filtros por categoría y década. */
F1.sections.timeline = (function () {
  const { $, esc, decadeOf, uniq } = F1.u;
  const { href } = F1.ui;
  const t = F1.t;
  const state = { cat: "all", dec: "" };

  function render() {
    const host = $("#tlList");
    const list = F1.data.timeline.filter((t) => (state.cat === "all" || t.cat.includes(state.cat)) && (!state.dec || decadeOf(t.y) === +state.dec));
    host.innerHTML = "";
    list.forEach((ev) => {
      const li = F1.u.el(`
        <li class="tl-item reveal">
          <article class="tl-card">
            <div class="tl-card-body">
              <div class="tl-year">${ev.y}</div>
              <h4>${esc(ev.title)}</h4>
              <p>${esc(ev.text)}</p>
              <div class="tl-meta">
                ${ev.cat.map((c) => `<span class="tag neutral">${esc(F1.data.timelineCats[c])}</span>`).join("")}
                ${(ev.drivers || []).map((d) => `<a class="tag" href="${href.driver(d)}">${esc(F1.drv.name(d))}</a>`).join("")}
                ${ev.team ? `<a class="tag gold tag-logo" href="${href.team(ev.team)}">${F1.ui.teamLogo(F1.team.get(ev.team), 18, { year: ev.y }) || ""}${esc(F1.team.name(ev.team))}</a>` : ""}
                ${ev.circuit && F1.circuit.get(ev.circuit) ? `<a class="tag ok" href="${href.circuit(ev.circuit)}">${esc(F1.circuit.get(ev.circuit).short)}</a>` : ""}
              </div>
              <div class="tl-actions">
                ${ev.gp ? `<a class="link small" href="${href.gp(ev.gp[0], ev.gp[1])}">${t("Ver resultados del GP")} →</a>` : ""}
                ${ev.video ? `<button class="btn btn-ghost btn-sm" data-video="${esc(ev.video)}" style="margin-left:${ev.gp ? "10px" : "0"}">▶ ${t("Ver video")}</button>` : ""}
              </div>
              <div class="tl-video"></div>
            </div>
          </article>
        </li>`);
      li.querySelector(".tl-card").prepend(F1.media.el(ev.img, { w: 500, alt: ev.title }));
      host.appendChild(li);
    });
    if (!list.length) host.innerHTML = `<li class="empty">${t("No hay acontecimientos para este filtro.")}</li>`;
    F1.u.reveal(host);
  }

  function init() {
    const decs = uniq(F1.data.timeline.map((t) => decadeOf(t.y))).map((d) => ({ v: String(d), l: `${d}s` }));
    const cats = Object.entries(F1.data.timelineCats).map(([v, l]) => ({ v, l }));
    $("#timeline").innerHTML = `
      <div class="toolbar"><div id="tlChips">${F1.ui.chips(cats, { name: t("Categoría"), allLabel: "Todo" })}</div>${F1.ui.select("tlDec", decs, "Todas las décadas")}</div>
      <ol class="tl" id="tlList"></ol>`;
    F1.ui.bindChips($("#tlChips"), (v) => { state.cat = v; render(); });
    $("#tlDec").addEventListener("change", (e) => { state.dec = e.target.value; render(); });
    $("#tlList").addEventListener("click", (e) => {
      const b = e.target.closest("[data-video]");
      if (!b) return;
      const slot = b.closest(".tl-card-body").querySelector(".tl-video");
      if (!slot.firstChild) slot.appendChild(F1.ui.videoNode(F1.ui.videoRef(b.dataset.video)));
      b.remove();
    });
    render();
  }
  return { init };
})();
