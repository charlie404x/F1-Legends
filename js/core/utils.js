/* =========================================================
   Núcleo: espacio de nombres global y utilidades DOM/formato.
   Se usan scripts clásicos (no módulos ES) para que la web
   también funcione abriendo index.html con doble clic.
   ========================================================= */
window.F1 = window.F1 || {};
F1.data = F1.data || {};
F1.sections = F1.sections || {};
/** URL absoluta de la raíz del proyecto (la calcula js/loader.js). */
F1.root = window.F1_ROOT || "";

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  /** Escapa texto para insertarlo en HTML. */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Crea un elemento a partir de HTML (devuelve el primer nodo). */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /** Configuración regional activa (es / en-GB). */
  const L = () => (F1.i18n ? F1.i18n.locale : "es");
  const debounce = (fn, ms = 200) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const norm = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const uniq = (arr) => Array.from(new Set(arr));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const decadeOf = (y) => Math.floor(+y / 10) * 10;

  const fmtDate = (d, opts = { day: "numeric", month: "short", year: "numeric" }) => {
    if (!d) return "—";
    const date = d instanceof Date ? d : new Date(d);
    return isNaN(date) ? "—" : date.toLocaleDateString(L(), opts);
  };
  const fmtTime = (d) => (d ? new Date(d).toLocaleTimeString(L(), { hour: "2-digit", minute: "2-digit" }) : "—");
  const fmtDateTime = (d) => (d ? new Date(d).toLocaleString(L(), { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—");
  const fmtNum = (n) => (n == null || n === "" ? "—" : Number(n).toLocaleString(L()));
  const relTime = (ts) => {
    const s = Math.round((Date.now() - ts) / 1000);
    const T = (x, v) => (F1.t ? F1.t(x, v) : x.replace(/\{n\}/, v && v.n));
    if (s < 60) return T("hace unos segundos");
    if (s < 3600) return T("hace {n} min", { n: Math.round(s / 60) });
    if (s < 86400) return T("hace {n} h", { n: Math.round(s / 3600) });
    return T("hace {n} días", { n: Math.round(s / 86400) });
  };

  /** Combina fecha y hora de la API (UTC) en un Date. */
  const sessionDate = (o) => (o && o.date ? new Date(`${o.date}T${o.time || "00:00:00Z"}`) : null);

  /** Extrae el título de artículo de una URL de Wikipedia. */
  function wikiTitleFromUrl(url) {
    if (!url) return null;
    try {
      const m = decodeURIComponent(url).match(/wikipedia\.org\/wiki\/(.+)$/);
      return m ? m[1].replace(/_/g, " ").replace(/#.*$/, "") : null;
    } catch { return null; }
  }

  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /** Observador de aparición para animaciones de entrada. */
  const revealIO = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
      }), { threshold: 0.08, rootMargin: "0px 0px -40px 0px" })
    : null;
  function reveal(root = document) {
    $$(".reveal:not(.in)", root).forEach((n) => (revealIO ? revealIO.observe(n) : n.classList.add("in")));
  }

  /** Ejecuta fn la primera vez que el elemento se acerca al viewport. */
  function whenVisible(node, fn, margin = "400px") {
    if (!node) return;
    if (!("IntersectionObserver" in window)) return fn();
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); fn(); }
    }, { rootMargin: margin });
    io.observe(node);
  }

  /** Animación de contador numérico. */
  function countUp(node, target, { dur = 1400, suffix = "" } = {}) {
    if (typeof target !== "number" || isNaN(target)) { node.textContent = target ?? "—"; return; }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { node.textContent = target.toLocaleString(L()) + suffix; return; }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      node.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString(L()) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /** Estados reutilizables de carga / error. */
  const loading = (msg = "Cargando datos…") => `<div class="state"><span class="spinner"></span><span>${esc(F1.t(msg))}</span></div>`;
  const errorBox = (msg, retryId) => `<div class="state error"><span>⚠️ ${esc(msg)}</span>${retryId ? `<button class="btn btn-ghost btn-sm" id="${retryId}">${F1.t("Reintentar")}</button>` : ""}</div>`;
  const nd = (v, label = "No documentado") => (v == null || v === "" ? `<span class="muted"><em>${F1.t(label)}</em></span>` : esc(v));
  /** Navega a una URL interna (página o ficha). */
  const go = (url) => { if (url) location.href = url; };
  /** Número con decimales en la configuración regional activa. */
  const fmtKm = (n) => Number(n).toLocaleString(L(), { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  F1.u = { L, go, fmtKm, $, $$, esc, el, debounce, norm, uniq, sleep, decadeOf, fmtDate, fmtTime, fmtDateTime, fmtNum, relTime, sessionDate, wikiTitleFromUrl, toast, reveal, whenVisible, countUp, loading, errorBox, nd };
})();
