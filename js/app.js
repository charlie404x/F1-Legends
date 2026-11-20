/* =========================================================
   Arranque de la aplicación: navegación, tema, favoritos,
   progreso de lectura e inicialización de secciones.
   Las secciones con datos de la API se inicializan al
   acercarse al viewport para ahorrar peticiones.
   ========================================================= */
(function () {
  const { $, $$, esc } = F1.u;
  const { href } = F1.ui;

  /* ---------- Tema claro / oscuro ---------- */
  function theme() {
    const root = document.documentElement;
    $("#themeToggle").addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      F1.store.set("theme", next);
      document.querySelector('meta[name="theme-color"]').content = next === "dark" ? "#080808" : "#F4F1EA";
    });
  }

  /* ---------- Navegación ---------- */
  function nav() {
    const navEl = $("#nav"), links = $("#navLinks"), burger = $("#burger");
    const setOpen = (o) => { links.classList.toggle("open", o); burger.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); };
    burger.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    $$(".nav-btn").forEach((b) => b.addEventListener("click", () => {
      const g = b.parentElement, o = !g.classList.contains("open");
      $$(".nav-group").forEach((x) => { x.classList.remove("open"); x.querySelector(".nav-btn").setAttribute("aria-expanded", "false"); });
      g.classList.toggle("open", o); b.setAttribute("aria-expanded", o);
    }));
    links.addEventListener("click", (e) => { if (e.target.closest("a")) { setOpen(false); $$(".nav-group").forEach((x) => x.classList.remove("open")); } });
    document.addEventListener("click", (e) => { if (!e.target.closest(".nav-group")) $$(".nav-group.open").forEach((x) => x.classList.remove("open")); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setOpen(false); $$(".nav-group.open").forEach((x) => x.classList.remove("open")); } });

    // Fondo sólido, barra de progreso y botón volver arriba
    const bar = $("#scrollProgress"), top = $("#toTop");
    let ticking = false;
    const onScroll = () => {
      ticking = false;
      navEl.classList.toggle("solid", scrollY > 30);
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      top.classList.toggle("show", scrollY > innerHeight);
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

  }

  /* ---------- Favoritos ---------- */
  function favorites() {
    const drawer = $("#favDrawer");
    const labels = { driver: "Pilotos", team: "Equipos", car: "Monoplazas", circuit: "Circuitos", play: "Jugadas", race: "Carreras" };
    Object.keys(labels).forEach((k) => (labels[k] = F1.t(labels[k])));
    const link = (type, id) => type === "race" ? href.gp(...id.split("-")) : ({ driver: href.driver, team: href.team, car: href.car, circuit: href.circuit, play: href.play }[type])(id);
    const count = () => { const n = F1.favs.count(); $("#favCount").hidden = !n; $("#favCount").textContent = n; };
    const render = () => {
      const all = F1.favs.all();
      const groups = Object.entries(labels).filter(([t]) => all[t] && Object.keys(all[t]).length);
      $("#favList").innerHTML = groups.length ? groups.map(([t, l]) => `
        <div class="fav-group"><p class="tele-label">${l}</p>${Object.entries(all[t]).map(([id, label]) => `
          <div class="fav-item"><a href="${link(t, id)}" data-close-drawer>${esc(label)}</a>${F1.ui.favBtn(t, id, label, "inline on")}</div>`).join("")}</div>`).join("")
        : `<p class="muted">${F1.t("Todavía no tienes favoritos. Pulsa ☆ en pilotos, equipos, monoplazas, circuitos, jugadas o carreras para guardarlos aquí. Se guardan solo en este navegador.")}</p>`;
    };
    const open = () => { render(); drawer.hidden = false; drawer.querySelector(".icon-btn").focus(); };
    const close = () => { drawer.hidden = true; };
    $("#favOpen").addEventListener("click", open);
    drawer.addEventListener("click", (e) => { if (e.target.closest("[data-close-drawer]")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !drawer.hidden) close(); });
    F1.favs.onChange(() => { count(); if (!drawer.hidden) render(); });
    count();
  }

  /* ---------- Aviso al abrir con doble clic (file://) ---------- */
  function envBanner() {
    if (!F1.video.isFile || F1.store.get("hide-file-banner")) return;
    const b = $("#envBanner");
    b.innerHTML = `${F1.t("<b>Consejo:</b> estás abriendo la web como archivo local. Todo funciona, pero YouTube puede bloquear los videos insertados. Para la mejor experiencia ejecuta <code>iniciar-servidor.bat</code> (ver README).")} <button class="icon-btn" aria-label="${F1.t("Cerrar aviso")}">✕</button>`;
    b.hidden = false;
    b.querySelector("button").addEventListener("click", () => { b.hidden = true; F1.store.set("hide-file-banner", true); });
  }

  /* ---------- Inicialización segura de secciones ---------- */
  function safe(name, fn) {
    try { fn(); } catch (e) {
      console.error(`[${name}]`, e);
      const host = document.querySelector(`[data-section="${name}"]`);
      if (host) host.insertAdjacentHTML("beforeend", F1.u.errorBox(F1.t("Esta sección no pudo cargarse ({m}).", { m: e.message })));
    }
  }
  const lazy = (sel, name, fn) => F1.u.whenVisible($(sel), () => safe(name, fn), "600px");

  function boot() {
    F1.i18n.applyData();
    theme(); nav(); favorites(); envBanner();
    F1.lightbox.init();
    F1.sections.search.init();

    // Cabecera fotográfica de cada página interior
    $$(".page-banner").forEach((bn) => { if (bn.dataset.img || bn.dataset.q) bn.prepend(F1.media.el(bn.dataset.img, { w: 1920, alt: "", q: bn.dataset.q, eager: true })); });

    const S = F1.sections;
    const has = (sel) => !!$(sel);
    // Cada página solo inicializa las secciones que contiene
    const list = [
      ["#inicio", "hero", S.hero.init], ["#liveSummary", "live-summary", S.live.init], ["#explore", "explore", S.explore.init],
      ["#decadesMenu", "decades", S.history.menu], ["#historyArchive", "history", S.history.archive],
      ["#championsArchive", "champions", S.champions.init], ["#plays", "plays", S.plays.init], ["#rivalries", "rivalries", S.rivalries.init],
      ["#driversDb", "drivers", S.drivers.init], ["#teamsDb", "teams", S.teams.init], ["#carsMuseum", "cars", S.cars.init],
      ["#circuits", "circuits", S.circuits.init], ["#gallery", "gallery", S.gallery.init], ["#timeline", "timeline", S.timeline.init],
      ["#tech", "tech", S.learn.tech], ["#rules", "rules", S.learn.rules], ["#quizApp", "quiz", S.quiz.init], ["#glossary", "glossary", S.learn.glossary],
      ["#championship", "championship", S.championship.init], ["#currentGrid", "grid", S.grid.init], ["#compare", "compare", S.compare.init], ["#credits", "credits", S.credits.init],
    ];
    list.forEach(([sel, name, fn]) => { if (has(sel)) safe(name, fn); });

    F1.u.$$(".section-head").forEach((h) => h.classList.add("reveal"));
    F1.u.reveal();
    F1.router.init();
    // Ancla dentro de la página (p. ej. temporada.html#parrilla) una vez pintado el contenido
    if (location.hash && !location.hash.startsWith("#/")) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(() => target.scrollIntoView(), 150);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
