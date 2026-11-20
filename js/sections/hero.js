/* =========================================================
   Portada: imagen cinematográfica, contadores históricos reales.
   ========================================================= */
F1.sections.hero = (function () {
  const { $, countUp, esc } = F1.u;
  // Candidatas para la imagen de portada (artículos con foto del coche en pista)
  const HERO_CANDIDATES = F1.img.featured.hero;

  async function bg() {
    for (const [title, q] of HERO_CANDIDATES) {
      const info = await F1.media.resolve(title, q);
      if (!info) continue;
      const src = F1.media.url(info, 1920);
      await new Promise((res) => {
        const im = new Image();
        im.onload = () => { const b = $("#heroBg"); b.style.backgroundImage = `url("${src}")`; b.classList.add("ready"); res(); };
        im.onerror = res;
        im.src = src;
      });
      if ($("#heroBg").classList.contains("ready")) {
        const c = await F1.media.credits(info.file);
        if (c) $("#heroCredit").innerHTML = `${F1.t("Foto")}: ${esc(c.artist)} · ${esc(c.license)} · <a href="${esc(c.page)}" target="_blank" rel="noopener">Wikimedia Commons</a>`;
        return;
      }
    }
  }

  async function counters() {
    const champs = new Set(F1.data.champions.map((c) => c.driver)).size;
    const record = Math.max(...Object.values(F1.data.champions.reduce((a, c) => ((a[c.driver] = (a[c.driver] || 0) + 1), a), {})));
    const year = new Date().getFullYear();
    const cell = (id) => document.querySelector(`[data-count-id="${id}"]`);
    countUp(cell("seasons"), year - 1950 + 1);
    countUp(cell("champions"), champs);
    countUp(cell("record"), record);
    try {
      const n = await F1.api.total("results/1.json", { ttl: 12 * 3600e3 });
      countUp(cell("races"), n);
      cell("races").title = F1.t("Grandes Premios disputados (fuente: Jolpica-F1)");
    } catch { cell("races").textContent = "—"; }
  }

  function init() {
    bg();
    F1.u.whenVisible($(".hero-board"), counters, "0px");
    // Paralaje moderado
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const b = $("#heroBg");
      let ticking = false;
      addEventListener("scroll", () => {
        if (ticking) return; ticking = true;
        requestAnimationFrame(() => { const y = Math.min(scrollY, innerHeight); b.style.translate = `0 ${y * 0.25}px`; ticking = false; });
      }, { passive: true });
    }
  }
  return { init };
})();
