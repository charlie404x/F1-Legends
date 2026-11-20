/* =========================================================
   Explorar por décadas + F1 History Archive (Historical Mode).
   - menu(): tarjetas de décadas (portada e historia.html).
   - archive(): archivo con estilo visual por época, contenido
     editorial y galería fotográfica de la década (Commons).
   ========================================================= */
F1.sections.history = (function () {
  const { $, $$, esc } = F1.u;
  const { href } = F1.ui;
  const t = F1.t;
  let current = null;

  function menu() {
    const host = $("#decadesMenu");
    const inArchive = !!$("#historyArchive");
    host.innerHTML = `<div class="decades">${F1.data.decades.map((d, i) => `
      <a class="decade-card reveal" data-decade="${d.key}" href="${F1.page("historia", { era: d.key })}#historia" style="transition-delay:${i * 50}ms" aria-label="${t("Ir a la década de {d}", { d: d.label })}">
        <span class="decade-info"><b>${d.label}</b><small>${esc(d.title)}</small></span>
      </a>`).join("")}</div>`;
    $$(".decade-card", host).forEach((b) => {
      const d = F1.data.decades.find((x) => x.key === b.dataset.decade);
      b.prepend(F1.media.el(d.photos[0], { w: 500, alt: "" }));
      if (inArchive) b.addEventListener("click", (e) => { e.preventDefault(); select(d.key, true); $("#historia").scrollIntoView({ behavior: "smooth" }); });
    });
    F1.u.reveal(host);
  }

  const champsOf = (d) => F1.data.champions.filter((c) => c.year >= d.range[0] && c.year <= d.range[1]);
  const list = (items) => `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;

  function renderEra(d) {
    const stage = $("#eraStage");
    const champs = champsOf(d);
    const byDriver = {};
    champs.forEach((c) => (byDriver[c.driver] = byDriver[c.driver] || []).push(c.year));
    const constr = Object.entries(F1.data.constructorChampions).filter(([y]) => +y >= d.range[0] && +y <= d.range[1]);
    const constrCount = {};
    constr.forEach(([, k]) => (constrCount[k] = (constrCount[k] || 0) + 1));
    const mid = Math.round((d.range[0] + d.range[1]) / 2);

    stage.querySelector(".era-content").innerHTML = `
      <div class="era-hero">
        <div class="era-text">
          <p class="era-kicker">${d.range[0]} — ${d.range[1]} · ${esc(d.kicker)}</p>
          <h3 class="era-title">${esc(d.title)}</h3>
          ${d.context.map((p) => `<p>${esc(p)}</p>`).join("")}
          <div style="margin-top:18px"><p class="tele-label">${t("Campeones de la década")}</p>
            <div class="era-champs">${Object.entries(byDriver).map(([id, ys]) =>
              `<a class="era-champ" href="${href.driver(id)}"><span class="ec-photo"></span><span><b>${esc(F1.drv.name(id))}</b><small>${ys.length}× · ${ys.join(", ")}</small></span></a>`).join("")}</div>
          </div>
        </div>
        <div class="era-img"></div>
      </div>
      <div class="era-blocks">
        <div class="era-block"><h4>${t("Pilotos destacados")}</h4>${list(d.drivers.map((id) => `<a href="${href.driver(id)}">${esc(F1.drv.name(id))}</a>`))}</div>
        <div class="era-block"><h4>${t("Equipos dominantes")}</h4><ul class="era-teams">${d.teams.map((k) => `<li>${F1.ui.teamLogo(F1.team.get(k), 30, { year: mid }) || ""}<span><a href="${href.team(k)}">${esc(F1.team.name(k))}</a>${constrCount[k] ? ` <span class="muted">· ${constrCount[k]} ${t(constrCount[k] > 1 ? "títulos de constructores" : "título de constructores")}</span>` : ""}</span></li>`).join("")}</ul>${d.range[0] < 1958 ? `<p class="note">${t("El campeonato de constructores existe desde 1958.")}</p>` : ""}</div>
        <div class="era-block"><h4>${t("Monoplazas representativos")}</h4><div class="era-cars"></div></div>
        <div class="era-block"><h4>${t("Cambios técnicos")}</h4>${list(d.tech.map(esc))}</div>
        <div class="era-block"><h4>${t("Cambios reglamentarios")}</h4>${list(d.rules.map(esc))}</div>
        <div class="era-block"><h4>${t("Grandes rivalidades")}</h4>${list(d.rivalries.map(esc))}</div>
        <div class="era-block"><h4>${t("Carreras inolvidables")}</h4>${list(d.races.map((r) => `<a href="${href.gp(r.y, r.c)}">${r.y}</a> · ${esc(r.t)}`))}<p class="note">${t("Cada carrera abre su ficha con resultados reales.")}</p></div>
        <div class="era-block"><h4>${t("Campeones año a año")}</h4>${list(champs.map((c) => `<b>${c.year}</b> · <a href="${href.driver(c.driver)}">${esc(F1.drv.name(c.driver))}</a> <span class="muted">(${esc(F1.team.name(c.team))}, ${esc(c.car)})</span>`))}</div>
      </div>
      <p class="tele-label" style="margin-top:34px">${t("Fotografías icónicas de la época · clic para ampliar")}</p>
      <div class="era-photos"></div>
      <p class="tele-label" style="margin-top:34px">${t("Archivo fotográfico de la década (Wikimedia Commons)")}</p>
      <div class="era-gallery" style="margin-top:12px"></div>
      <p class="tele-label" style="margin-top:34px">${t("Videos y documentales")}</p>
      <div class="video-row era-videos" style="margin-top:12px"></div>`;

    stage.querySelector(".era-img").appendChild(F1.media.el(d.img, { w: 960, alt: d.title, eager: true }));
    stage.querySelectorAll(".era-champ").forEach((a, i) => {
      const id = Object.keys(byDriver)[i];
      a.querySelector(".ec-photo").replaceWith(F1.ui.drv.photo(id, null, { w: 120, cls: "ec-photo" }));
    });
    const cars = stage.querySelector(".era-cars");
    d.cars.forEach((k) => {
      const c = F1.car.get(k);
      if (!c) return;
      const a = F1.u.el(`<a class="era-car" href="${href.car(k)}"><span><b>${esc(c.name)}</b><small>${esc(c.seasons)}</small></span></a>`);
      a.prepend(F1.media.el(c.img, { w: 330, alt: c.name }));
      cars.appendChild(a);
    });
    const photos = stage.querySelector(".era-photos");
    d.photos.forEach((p, i) => { const m = F1.media.el(p, { w: 500, alt: p }); m.dataset.lb = i; m.tabIndex = 0; m.setAttribute("role", "button"); m.insertAdjacentHTML("beforeend", `<span class="ph-cap">${esc(p)}</span>`); photos.appendChild(m); });
    const gal = stage.querySelector(".era-gallery");
    F1.u.whenVisible(gal, () => F1.gallery.commons(gal, { cats: [F1.img.decadeCats[d.key]], subject: d.label, max: 24, fallbackQuery: `Formula One ${d.key}s`, must: [String(d.key).slice(0, 3)] }));
    const vids = stage.querySelector(".era-videos");
    d.videos.forEach((ref) => { const v = F1.ui.videoRef(ref); if (v) { const w = document.createElement("div"); w.appendChild(F1.ui.videoNode(v)); w.insertAdjacentHTML("beforeend", `<p class="video-cap">${esc(v.title)} · ${esc(v.sub)}</p>`); vids.appendChild(w); } });
  }

  function select(key, animate) {
    if (key === current || !$("#eraStage")) return;
    const d = F1.data.decades.find((x) => x.key === key) || F1.data.decades[0];
    key = d.key;
    current = key;
    const arch = $("#historia");
    $$(".era-btn").forEach((b) => b.setAttribute("aria-selected", b.dataset.era === key));
    const wipe = $(".era-wipe");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (animate && !reduced) {
      wipe.classList.remove("run"); void wipe.offsetWidth; wipe.classList.add("run");
      setTimeout(() => { arch.dataset.era = key; renderEra(d); }, 340);
    } else { arch.dataset.era = key; renderEra(d); }
    F1.store.set("era", key);
  }

  function archive() {
    const host = $("#historyArchive");
    host.innerHTML = `
      <div class="era-nav" role="tablist" aria-label="${t("Décadas")}">${F1.data.decades.map((d) => `<button class="era-btn" role="tab" data-era="${d.key}" aria-selected="false">${d.label}</button>`).join("")}</div>
      <div class="era-stage" id="eraStage"><div class="era-wipe"></div><div class="era-content"></div></div>`;
    host.querySelector(".era-nav").addEventListener("click", (e) => { const b = e.target.closest(".era-btn"); if (b) select(b.dataset.era, true); });
    // Solo las fotos icónicas: la galería de Commons gestiona su propio lightbox
    $("#eraStage").addEventListener("click", (e) => {
      const m = e.target.closest(".era-photos [data-lb]");
      if (!m) return;
      const d = F1.data.decades.find((x) => x.key === current);
      F1.lightbox.open(d.photos.map((p) => ({ title: p, sub: d.label, wiki: p })), +m.dataset.lb);
    });
    $("#eraStage").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.dataset.lb != null) e.target.click(); });
    const fromUrl = new URLSearchParams(location.search).get("era");
    select(fromUrl || F1.store.get("era", "1950"), false);
  }

  function init() { if ($("#decadesMenu")) menu(); if ($("#historyArchive")) archive(); }
  return { init, menu, archive, select };
})();
