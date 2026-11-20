/* =========================================================
   Buscador global (Ctrl+K o "/"): pilotos, equipos, circuitos,
   monoplazas, jugadas, rivalidades, acontecimientos, términos y
   Grandes Premios de la temporada.
   ========================================================= */
F1.sections.search = (function () {
  const { $, $$, esc, norm, debounce } = F1.u;
  const { href } = F1.ui;
  const t = F1.t;
  let index = null, active = 0, results = [];

  function build() {
    const idx = [];
    const add = (type, ico, label, sub, go, extra = "") => idx.push({ type, ico, label, sub, go, hay: norm(`${label} ${sub} ${extra}`) });
    F1.data.drivers.forEach((d) => add(t("Pilotos"), "👤", d.name, `${F1.nat(d.nat)[1]} · ${d.era[0]}–${d.era[1]}`, href.driver(d.id), d.full + " " + d.teams.join(" ")));
    (F1.sections.drivers.getCurrent()?.list || []).forEach((s) => { if (!F1.drv.get(s.Driver.driverId)) add(t("Pilotos"), "👤", `${s.Driver.givenName} ${s.Driver.familyName}`, `${t("Temporada actual")} · ${s.Constructors.map((c) => c.name).join(" / ")}`, href.driver(s.Driver.driverId)); });
    F1.data.teams.forEach((x) => add(t("Equipos"), "🏁", x.name, `${F1.nat(x.nat)[1]} · ${t("desde")} ${x.debut}`, href.team(x.key), x.short));
    F1.data.circuits.forEach((c) => add(t("Circuitos"), "🛣️", c.name, `${c.city}, ${c.country}`, href.circuit(c.key), c.short));
    F1.data.cars.forEach((c) => add(t("Monoplazas"), "🏎️", c.name, `${c.seasons} · ${F1.team.name(c.team)}`, href.car(c.key), c.engine));
    F1.data.plays.forEach((p) => add(t("Jugadas y carreras"), "🎬", p.title, `${p.year} · ${p.circuit}`, href.play(p.id), p.desc));
    F1.data.rivalries.forEach((r) => add(t("Rivalidades"), "⚔️", r.title, r.tagline, href.rivalry(r.id)));
    F1.data.timeline.forEach((x) => add(t("Historia"), "📜", `${x.y} · ${x.title}`, x.text.slice(0, 80) + "…", x.gp ? href.gp(x.gp[0], x.gp[1]) : F1.page("cronologia"), x.text));
    F1.data.decades.forEach((d) => add(t("Historia"), "🗂️", `${t("Década")} ${d.label}: ${d.title}`, d.kicker, F1.page("historia", { era: d.key }) + "#historia", d.context.join(" ")));
    F1.data.glossary.forEach(([k, d]) => add(t("Glosario"), "📖", k, d.slice(0, 90), F1.page("glosario", { q: k }), d));
    [["inicio", "Inicio"], ["campeones", "Campeones del mundo"], ["campeonato", "Live Championship"], ["parrilla", "Parrilla actual"], ["galeria", "Galería"], ["tecnologia", "F1 Technology"], ["reglamento", "Reglamento"], ["comparador", "Comparadores"], ["quiz", "Quiz"]].forEach(([id, l]) => add(t("Páginas"), "📄", t(l), "F1 Legends", F1.page(id)));
    F1.season.schedule().then((s) => s.data.forEach((r) => add(t("Grandes Premios") + " " + r.season, "📅", r.raceName, `${t("Ronda")} ${r.round} · ${r.Circuit.Location.locality}`, href.gp(r.season, r.round), r.Circuit.circuitName))).catch(() => {});
    return idx;
  }

  function run(q) {
    const box = $("#searchResults");
    const n = norm(q.trim());
    if (!n) { box.innerHTML = `<p class="muted small" style="padding:14px">${t("Escribe para buscar. Atajos: <kbd>Ctrl</kbd>+<kbd>K</kbd> o <kbd>/</kbd> · <kbd>↑</kbd><kbd>↓</kbd> para moverte · <kbd>Enter</kbd> para abrir.")}</p>`; results = []; return; }
    const words = n.split(/\s+/);
    results = index.filter((it) => words.every((w) => it.hay.includes(w)))
      .sort((a, b) => (norm(a.label).startsWith(n) ? -1 : 0) - (norm(b.label).startsWith(n) ? -1 : 0)).slice(0, 40);
    active = 0;
    if (!results.length) { box.innerHTML = `<p class="muted" style="padding:16px">${t("Sin resultados para «{q}».", { q: esc(q) })}</p>`; return; }
    let html = "", last = "";
    results.forEach((r, k) => {
      if (r.type !== last) { html += `<div class="sr-group tele-label">${esc(r.type)}</div>`; last = r.type; }
      html += `<button class="sr-item ${k === 0 ? "active" : ""}" role="option" data-k="${k}"><span class="sr-ico" aria-hidden="true">${r.ico}</span><span><span>${esc(r.label)}</span><small>${esc(r.sub)}</small></span></button>`;
    });
    box.innerHTML = html;
  }

  function go(k) {
    const r = results[k];
    if (!r) return;
    close();
    F1.u.go(r.go);
  }

  function open() {
    if (!index) index = build();
    const o = $("#searchOverlay");
    o.hidden = false;
    document.body.classList.add("locked");
    const inp = $("#globalSearch");
    inp.value = ""; run(""); inp.focus();
  }
  function close() { $("#searchOverlay").hidden = true; document.body.classList.remove("locked"); }

  function init() {
    $("#searchOpen").addEventListener("click", open);
    $("#globalSearch").addEventListener("input", debounce((e) => run(e.target.value), 100));
    $("#searchOverlay").addEventListener("click", (e) => { if (e.target.id === "searchOverlay") close(); const it = e.target.closest(".sr-item"); if (it) go(+it.dataset.k); });
    document.addEventListener("keydown", (e) => {
      const isOpen = !$("#searchOverlay").hidden;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); isOpen ? close() : open(); return; }
      if (!isOpen && e.key === "/" && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); return; }
      if (!isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        active = (active + (e.key === "ArrowDown" ? 1 : results.length - 1)) % Math.max(results.length, 1);
        $$(".sr-item").forEach((b) => b.classList.toggle("active", +b.dataset.k === active));
        $(`.sr-item[data-k="${active}"]`)?.scrollIntoView({ block: "nearest" });
      }
      if (e.key === "Enter") { e.preventDefault(); go(active); }
    });
  }
  return { init, open, rebuild: () => (index = null) };
})();
