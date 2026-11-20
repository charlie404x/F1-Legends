/* =========================================================
   Rivalidades legendarias (lista). La ficha completa con
   tablas comparativas calculadas vive en views.js.
   ========================================================= */
F1.sections.rivalries = (function () {
  const { $, esc } = F1.u;
  const { href } = F1.ui;

  const t = F1.t;
  function init() {
    const host = $("#rivalries");
    host.innerHTML = `<div class="rival-list"></div>`;
    const list = host.firstElementChild;
    F1.data.rivalries.forEach((r) => {
      const a = F1.drv.get(r.a), b = F1.drv.get(r.b);
      const card = F1.u.el(`
        <article class="rival reveal" tabindex="0" role="link" aria-label="${t("Rivalidad")} ${esc(r.title)}">
          <div class="rival-mid">
            <span class="tele-label red">${r.seasons[0]}${r.seasons.length > 1 ? "–" + r.seasons[r.seasons.length - 1] : ""}</span>
            <span class="rival-vs">VS</span>
            <h3>${esc(r.title)}</h3>
            <p>${esc(r.tagline)}</p>
            <span class="btn btn-ghost btn-sm">${t("Historia, estadísticas, fotos y videos")} →</span>
          </div>
        </article>`);
      card.prepend(F1.ui.drv.photo(r.a, null, { w: 500 }));
      card.append(F1.ui.drv.photo(r.b, null, { w: 500 }));
      const go = () => F1.u.go(href.rivalry(r.id));
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      list.appendChild(card);
    });
    F1.u.reveal(host);
  }
  return { init };
})();
