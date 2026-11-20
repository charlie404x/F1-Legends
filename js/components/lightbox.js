/* =========================================================
   Lightbox: navegación con flechas/teclado/gestos, zoom y
   créditos (autor y licencia leídos de Wikimedia Commons).
   Uso: F1.lightbox.open([{ title, sub, wiki, q }], index)
   ========================================================= */
(function () {
  const { $, esc } = F1.u;
  let items = [], idx = 0, lastFocus = null, token = 0;

  const box = () => $("#lightbox");

  async function show(i) {
    idx = (i + items.length) % items.length;
    const it = items[idx];
    const my = ++token;
    const img = $("#lbImg");
    const stage = $("#lbStage");
    stage.classList.remove("zoomed");
    img.style.opacity = .25;
    $("#lbTitle").textContent = it.title || "";
    $("#lbSub").textContent = it.sub || "";
    $("#lbCredit").textContent = F1.t("Cargando créditos…");
    $("#lbCount").textContent = `${idx + 1} / ${items.length}`;
    strip();
    const info = it.info || await F1.media.resolve(it.wiki || "", it.q || "");
    if (my !== token) return;
    if (!info) { img.removeAttribute("src"); $("#lbCredit").textContent = F1.t("Imagen no disponible."); return; }
    img.onload = () => { img.style.opacity = 1; };
    img.onerror = () => { if (!img.dataset.retry) { img.dataset.retry = 1; img.src = F1.media.url(info, 960); } else $("#lbCredit").textContent = F1.t("Imagen no disponible."); };
    delete img.dataset.retry;
    img.alt = it.title || "";
    img.src = F1.media.url(info, 1920);
    $("#lbOpen").href = info.page || info.orig;
    const c = info.artist && info.license ? { artist: info.artist, license: info.license, date: info.date, page: info.page } : await F1.media.credits(info.file);
    if (my !== token) return;
    $("#lbCredit").innerHTML = c
      ? `${F1.t("Foto")}: ${esc(c.artist)} · ${esc(c.license)}${c.date ? ` · ${esc(c.date)}` : ""} · <a href="${esc(c.page)}" target="_blank" rel="noopener">Wikimedia Commons</a>`
      : `${F1.t("Fuente")}: ${esc(info.source || "Wikimedia")}`;
  }

  /** Tira de miniaturas para saltar entre fotos (solo con información ya resuelta). */
  function strip() {
    const host = $("#lbStrip");
    if (!host) return;
    if (items.length < 2 || items.length > 80 || !items.every((x) => x.info)) { host.innerHTML = ""; host.hidden = true; return; }
    host.hidden = false;
    if (host._items !== items) {
      host._items = items;
      host.innerHTML = items.map((x, k) => `<button data-k="${k}" aria-label="${k + 1}"><img src="${esc(F1.media.url(x.info, 120))}" alt="" loading="lazy"/></button>`).join("");
    }
    host.querySelectorAll("button").forEach((b) => b.classList.toggle("on", +b.dataset.k === idx));
    host.querySelector("button.on")?.scrollIntoView({ block: "nearest", inline: "center" });
  }

  function open(list, i = 0) {
    items = list.filter(Boolean);
    if (!items.length) return;
    lastFocus = document.activeElement;
    box().hidden = false;
    document.body.classList.add("locked");
    show(i);
    $("[data-close-lb]").focus();
  }
  function close() {
    box().hidden = true;
    document.body.classList.remove("locked");
    token++;
    lastFocus && lastFocus.focus && lastFocus.focus();
  }

  function toggleZoom() { $("#lbStage").classList.toggle("zoomed"); }

  function init() {
    $("#lbPrev").addEventListener("click", () => show(idx - 1));
    $("#lbNext").addEventListener("click", () => show(idx + 1));
    $("#lbZoom").addEventListener("click", toggleZoom);
    $("#lbImg").addEventListener("click", toggleZoom);
    $("[data-close-lb]").addEventListener("click", close);
    $("#lbStrip")?.addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b) show(+b.dataset.k); });
    box().addEventListener("click", (e) => { if (e.target === box() || e.target.id === "lbStage") close(); });
    document.addEventListener("keydown", (e) => {
      if (box().hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "+" || e.key === "z") toggleZoom();
    });
    // Gestos táctiles
    let x0 = null;
    $("#lbStage").addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    $("#lbStage").addEventListener("touchend", (e) => {
      if (x0 == null || $("#lbStage").classList.contains("zoomed")) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    // Arrastrar para desplazar con zoom
    const st = $("#lbStage");
    let drag = null;
    st.addEventListener("pointerdown", (e) => { if (st.classList.contains("zoomed") && e.pointerType === "mouse") drag = { x: e.clientX, y: e.clientY, l: st.scrollLeft, t: st.scrollTop, moved: false }; });
    window.addEventListener("pointermove", (e) => { if (!drag) return; drag.moved = true; st.scrollLeft = drag.l - (e.clientX - drag.x); st.scrollTop = drag.t - (e.clientY - drag.y); });
    window.addEventListener("pointerup", () => { if (drag && drag.moved) setTimeout(() => {}, 0); drag = null; });
  }

  /** Abre el lightbox al hacer clic en cualquier .media dentro de `root`. */
  function bindMedia(root, getItems) {
    root.addEventListener("click", (e) => {
      const m = e.target.closest("[data-lb]");
      if (!m || !root.contains(m)) return;
      const list = getItems();
      open(list, +m.dataset.lb || 0);
    });
  }

  F1.lightbox = { open, close, init, bindMedia };
})();
