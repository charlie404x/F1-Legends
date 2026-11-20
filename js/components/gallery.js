/* =========================================================
   Galería fotográfica reutilizable.
   - Mosaico con fotos grandes y pequeñas (según la orientación).
   - Carrusel horizontal con flechas para el resto de fotos.
   - Lightbox con zoom, flechas, gestos, miniaturas, descripción,
     fecha y créditos (autor y licencia de Wikimedia Commons).
   - Placeholder animado mientras carga y respaldo si una foto falla
     (la tesela se retira y la galería se recompone sin huecos).
   Uso:
     F1.gallery.commons(host, { cats, subject, max, exclude, fallbackQuery, must })
     F1.gallery.render(host, items, { subject })
   ========================================================= */
(function () {
  const { esc } = F1.u;
  const t = F1.t;

  const yearOf = (it) => it.year || (it.date ? +it.date.slice(0, 4) : null);
  const subOf = (it, subject) => [it.date ? F1.u.fmtDate(it.date, { day: "numeric", month: "long", year: "numeric" }) : yearOf(it), subject].filter(Boolean).join(" · ");

  function tile(it, i, subject, cls = "") {
    const ratio = it.width && it.height ? it.width / it.height : 1.5;
    const shape = ratio > 1.7 ? "wide" : ratio < 0.85 ? "tall" : "";
    const cap = F1.media.caption(it);
    const fig = document.createElement("figure");
    fig.className = `gal-tile media ${shape} ${cls}`.trim();
    fig.dataset.lb = i;
    fig.tabIndex = 0;
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", t("Ampliar fotografía") + ": " + cap);
    const img = document.createElement("img");
    img.alt = cap;
    img.loading = "lazy";
    img.decoding = "async";
    img.src = F1.media.url(it, cls.includes("big") ? 960 : 500);
    img.onload = () => fig.classList.add("ok");
    img.onerror = () => {
      if (!img.dataset.retry && it.orig && !/\.svg$/i.test(it.orig)) { img.dataset.retry = 1; img.src = F1.media.url(it, 330); return; }
      fig.remove(); // sin huecos: la galería se recompone
    };
    fig.appendChild(img);
    const y = yearOf(it);
    fig.insertAdjacentHTML("beforeend", `<figcaption><span>${esc(cap)}</span>${y ? `<b>${y}</b>` : ""}</figcaption>`);
    return fig;
  }

  /**
   * Pinta una galería.
   * @param {HTMLElement} host
   * @param {Array} items  objetos de F1.media.category / commonsSearch
   * @param {object} o { subject, mosaic = 7, source }
   */
  function render(host, items, o = {}) {
    const subject = o.subject || "";
    if (!items.length) {
      host.innerHTML = `<p class="muted">${t("No se encontraron fotografías adicionales con licencia libre.")}</p>`;
      return;
    }
    const nMosaic = Math.min(items.length, o.mosaic || (items.length > 9 ? 7 : items.length));
    host.innerHTML = `
      <div class="gal">
        <div class="gal-mosaic"></div>
        ${items.length > nMosaic ? `<div class="gal-carousel">
          <button class="gal-arrow prev" aria-label="${t("Anterior")}">‹</button>
          <div class="gal-track" tabindex="0" aria-label="${t("Más fotografías")}"></div>
          <button class="gal-arrow next" aria-label="${t("Siguiente")}">›</button>
        </div>` : ""}
        <div class="gal-foot">
          <span class="tele-label">${t("{n} fotografías", { n: items.length })}</span>
          <button class="btn btn-ghost btn-sm" data-gal-all>${t("Ver a pantalla completa")} ⤢</button>
        </div>
        <p class="note">${o.source || t("Fotografías de Wikimedia Commons. Autor, licencia y fecha visibles al ampliar.")}</p>
      </div>`;
    const mosaic = host.querySelector(".gal-mosaic");
    items.slice(0, nMosaic).forEach((it, i) => mosaic.appendChild(tile(it, i, subject, i === 0 ? "big" : "")));
    const track = host.querySelector(".gal-track");
    if (track) {
      items.slice(nMosaic).forEach((it, k) => track.appendChild(tile(it, nMosaic + k, subject)));
      const step = () => track.clientWidth * 0.8;
      host.querySelector(".gal-arrow.prev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
      host.querySelector(".gal-arrow.next").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
      const upd = () => {
        host.querySelector(".gal-arrow.prev").disabled = track.scrollLeft < 8;
        host.querySelector(".gal-arrow.next").disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      };
      track.addEventListener("scroll", F1.u.debounce(upd, 60), { passive: true });
      setTimeout(upd, 300);
    }
    const lbItems = () => items.map((it) => ({ title: F1.media.caption(it), sub: subOf(it, subject), info: it }));
    F1.lightbox.bindMedia(host, lbItems);
    host.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.dataset.lb != null) e.target.click(); });
    host.querySelector("[data-gal-all]").addEventListener("click", () => F1.lightbox.open(lbItems(), 0));
  }

  /**
   * Galería a partir de categorías de Commons, con respaldo de búsqueda.
   * @param {HTMLElement} host
   * @param {object} o { cats, subject, max, exclude, fallbackQuery, must, min }
   */
  async function commons(host, o) {
    host.innerHTML = `<div class="gal-skeleton" aria-hidden="true">${"<i></i>".repeat(7)}</div><p class="muted small">${t("Buscando fotografías en Wikimedia Commons…")}</p>`;
    let items = [];
    try { items = await F1.media.category(o.cats, { max: o.max || 30, exclude: o.exclude || [], person: !!o.person, terms: o.terms || [] }); } catch (e) { console.warn("[gallery]", e); }
    if (items.length < (o.min || 6) && o.fallbackQuery) {
      try {
        const extra = await F1.media.commonsSearch(o.fallbackQuery, 12, o.must || []);
        const have = new Set(items.map((x) => x.file));
        items = items.concat(extra.filter((x) => !have.has(x.file) && !(o.exclude || []).includes(x.file)));
      } catch {}
    }
    render(host, items, o);
    return items;
  }

  F1.gallery = { render, commons };
})();
