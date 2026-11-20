/* =========================================================
   Estructura común de todas las páginas: navegación, pie,
   buscador, favoritos, lightbox, avisos y botón de idioma.
   Cada página HTML solo contiene su <main>; este archivo
   inyecta el resto para no duplicar marcado en 16 archivos.
   La página activa se indica con <body data-page="...">.
   ========================================================= */
(function () {
  const t = F1.t;

  /* ---------- Mapa de páginas (destino de cada sección) ---------- */
  const H = "paginas/historia/", E = "paginas/pilotos-y-equipos/", M = "paginas/museo/", A = "paginas/aprende/";
  const PAGES = {
    inicio: "paginas/inicio/inicio.html", actualidad: "paginas/inicio/inicio.html#actualidad", decadas: H + "historia.html#decadas",
    historia: H + "historia.html", cronologia: H + "historia.html#cronologia", campeones: H + "campeones.html",
    rivalidades: H + "rivalidades.html", jugadas: H + "jugadas.html", pilotos: E + "pilotos.html", equipos: E + "equipos.html",
    campeonato: "paginas/temporada/temporada.html", parrilla: "paginas/temporada/temporada.html#parrilla", monoplazas: M + "monoplazas.html",
    circuitos: M + "circuitos.html", galeria: M + "galeria.html", tecnologia: A + "tecnologia.html", reglamento: A + "tecnologia.html#reglamento",
    comparador: A + "comparador.html", glosario: A + "glosario.html", quiz: A + "quiz.html", creditos: A + "creditos.html",
    ficha: "paginas/fichas/ficha.html",
  };
  /** URL de una sección (con parámetros opcionales). */
  F1.page = (id, params) => {
    let u = F1.root + (PAGES[id] || PAGES.inicio);
    if (params) {
      const [path, hash] = u.split("#");
      const q = new URLSearchParams(params).toString();
      u = `${path}?${q}${hash ? "#" + hash : ""}`;
    }
    return u;
  };
  F1.pages = PAGES;
  const P = (id) => F1.page(id);

  const page = document.body.dataset.page || "inicio";
  const ICON = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 0 1 6.32 12.9l5.39 5.4-1.41 1.4-5.4-5.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.3 5.8 21l1.6-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.4 4.8 1.6 7z"/></svg>',
    sun: '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0-5 1 3h-2l1-3zm0 20-1-3h2l-1 3zM2 12l3-1v2l-3-1zm20 0-3 1v-2l3 1zM4.9 4.9l2.8 1.4-1.4 1.4-1.4-2.8zm14.2 14.2-2.8-1.4 1.4-1.4 1.4 2.8zM4.9 19.1l1.4-2.8 1.4 1.4-2.8 1.4zM19.1 4.9l-1.4 2.8-1.4-1.4 2.8-1.4z"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.3A8.5 8.5 0 0 1 8.7 4a8.5 8.5 0 1 0 11.3 11.3z"/></svg>',
  };

  /* ---------- Menú: grupos y enlaces ---------- */
  const MENU = [
    { label: "Historia", pages: ["historia", "campeones", "rivalidades", "jugadas"], items: [["historia", "F1 History Archive"], ["campeones", "Campeones del mundo"], ["rivalidades", "Rivalidades"], ["cronologia", "Línea de tiempo"], ["jugadas", "Jugadas históricas"]] },
    { id: "pilotos", label: "Pilotos" },
    { id: "equipos", label: "Equipos" },
    { label: "Temporada", pages: ["campeonato"], items: [["actualidad", "Actualidad"], ["campeonato", "Live Championship"], ["parrilla", "Parrilla actual"]] },
    { id: "monoplazas", label: "Monoplazas" },
    { id: "circuitos", label: "Circuitos" },
    { label: "Aprende", pages: ["tecnologia", "comparador", "glosario", "quiz", "galeria", "creditos"], items: [["tecnologia", "F1 Technology"], ["reglamento", "Reglamento"], ["comparador", "Comparadores"], ["glosario", "Glosario"], ["quiz", "Quiz"], ["galeria", "Galería"], ["creditos", "Créditos y licencias"]] },
  ];

  function navHTML() {
    const links = MENU.map((m) => {
      if (m.id) return `<a class="nav-a ${page === m.id ? "active" : ""}" href="${P(m.id)}" ${page === m.id ? 'aria-current="page"' : ""}>${t(m.label)}</a>`;
      const on = m.pages.includes(page);
      return `<div class="nav-group ${on ? "active" : ""}">
        <button class="nav-btn" aria-expanded="false">${t(m.label)}</button>
        <div class="nav-menu">${m.items.map(([id, l]) => `<a href="${P(id)}" ${PAGES[id] === PAGES[page] ? 'class="active" aria-current="page"' : ""}>${t(l)}</a>`).join("")}</div>
      </div>`;
    }).join("");
    const other = F1.i18n.lang === "es" ? "en" : "es";
    return `
  <a class="skip-link" href="#main">${t("Saltar al contenido")}</a>
  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
  <header class="nav" id="nav">
    <a href="${P("inicio")}" class="logo" aria-label="${t("F1 Legends, inicio")}">
      <span class="logo-mark" aria-hidden="true"></span>
      <span class="logo-text">F1<b>LEGENDS</b></span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="${t("Principal")}">${links}</nav>
    <div class="nav-tools">
      <button class="icon-btn" id="searchOpen" aria-label="${t("Buscar (Ctrl+K)")}" title="${t("Buscar (Ctrl+K)")}">${ICON.search}</button>
      <button class="icon-btn" id="favOpen" aria-label="${t("Favoritos")}" title="${t("Favoritos")}">${ICON.star}<span class="badge-count" id="favCount" hidden>0</span></button>
      <button class="lang-btn" id="langToggle" data-lang="${other}" aria-label="${other === "en" ? "Switch to English" : "Cambiar a español"}" title="${other === "en" ? "English" : "Español"}">
        <span class="${F1.i18n.lang === "es" ? "on" : ""}">ES</span><span class="${F1.i18n.lang === "en" ? "on" : ""}">EN</span>
      </button>
      <button class="icon-btn" id="themeToggle" aria-label="${t("Cambiar tema claro/oscuro")}" title="${t("Tema claro / oscuro")}">${ICON.sun}${ICON.moon}</button>
      <button class="burger" id="burger" aria-label="${t("Abrir menú")}" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
    </div>
  </header>
  <div class="env-banner" id="envBanner" hidden></div>`;
  }

  function footerHTML() {
    const col = (title, ids) => `<div><p class="tele-label">${t(title)}</p><ul class="small footer-links">${ids.map(([id, l]) => `<li><a href="${P(id)}">${t(l)}</a></li>`).join("")}</ul></div>`;
    return `
  <footer class="footer">
    <div class="footer-inner">
      <div>
        <a href="${P("inicio")}" class="logo"><span class="logo-mark"></span><span class="logo-text">F1<b>LEGENDS</b></span></a>
        <p class="muted small">${t("Proyecto de fans sin afiliación con Formula One Group, la FIA ni ninguna escudería. Marcas, logotipos y nombres pertenecen a sus propietarios y se muestran solo con fines informativos.")}</p>
      </div>
      ${col("Historia", [["historia", "F1 History Archive"], ["campeones", "Campeones del mundo"], ["rivalidades", "Rivalidades"], ["jugadas", "Jugadas históricas"], ["cronologia", "Línea de tiempo"]])}
      ${col("Explorar", [["pilotos", "Pilotos"], ["equipos", "Equipos"], ["monoplazas", "Monoplazas"], ["circuitos", "Circuitos"], ["campeonato", "Live Championship"], ["galeria", "Galería"], ["creditos", "Créditos y licencias"]])}
      <div class="footer-sources">
        <p class="tele-label">${t("Fuentes")}</p>
        <ul class="small">
          <li>${t("Resultados y calendario")}: <a href="https://github.com/jolpica/jolpica-f1" target="_blank" rel="noopener">Jolpica-F1 API</a></li>
          <li>${t("Imágenes y biografías")}: <a href="https://commons.wikimedia.org" target="_blank" rel="noopener">Wikimedia Commons</a> / <a href="https://www.wikipedia.org" target="_blank" rel="noopener">Wikipedia</a></li>
          <li>${t("Trazados")}: <a href="https://github.com/bacinger/f1-circuits" target="_blank" rel="noopener">bacinger/f1-circuits</a> (MIT)</li>
          <li>${t("Noticias")}: Motorsport.com, Autosport, BBC Sport (rss2json)</li>
          <li>${t("Videos")}: YouTube</li>
        </ul>
      </div>
    </div>
  </footer>`;
  }

  function overlaysHTML() {
    return `
  <button class="to-top" id="toTop" aria-label="${t("Volver arriba")}">↑</button>
  <div class="overlay search-overlay" id="searchOverlay" hidden>
    <div class="search-box" role="dialog" aria-modal="true" aria-label="${t("Buscador global")}">
      <div class="search-input-wrap">${ICON.search}
        <input id="globalSearch" type="search" placeholder="${t("Busca pilotos, equipos, circuitos, coches, carreras, términos…")}" autocomplete="off" aria-label="${t("Buscar")}" />
        <kbd>Esc</kbd>
      </div>
      <div class="search-results" id="searchResults" role="listbox"></div>
    </div>
  </div>
  <aside class="drawer" id="favDrawer" aria-label="${t("Favoritos")}" hidden>
    <div class="drawer-head"><h3>★ ${t("Mis favoritos")}</h3><button class="icon-btn" data-close-drawer aria-label="${t("Cerrar")}">✕</button></div>
    <div class="drawer-body" id="favList"></div>
  </aside>
  <div class="overlay lightbox" id="lightbox" hidden>
    <div class="lb-top">
      <span class="tele-label" id="lbCount"></span>
      <div class="lb-tools">
        <button class="icon-btn" id="lbZoom" aria-label="Zoom">⊕</button>
        <a class="icon-btn" id="lbOpen" target="_blank" rel="noopener" aria-label="${t("Ver original en Wikimedia")}">↗</a>
        <button class="icon-btn" data-close-lb aria-label="${t("Cerrar")}">✕</button>
      </div>
    </div>
    <button class="lb-nav prev" id="lbPrev" aria-label="${t("Anterior")}">‹</button>
    <div class="lb-stage" id="lbStage"><img id="lbImg" alt="" /></div>
    <button class="lb-nav next" id="lbNext" aria-label="${t("Siguiente")}">›</button>
    <div class="lb-caption"><strong id="lbTitle"></strong><span id="lbSub"></span><small id="lbCredit"></small></div>
    <div class="lb-strip" id="lbStrip"></div>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  /* ---------- Inyección ---------- */
  const main = document.getElementById("main");
  document.body.insertAdjacentHTML("afterbegin", navHTML());
  if (!document.getElementById("view")) {
    const v = document.createElement("div");
    v.className = "view"; v.id = "view"; v.setAttribute("role", "region"); v.setAttribute("aria-label", t("Ficha detallada")); v.hidden = true;
    (main || document.body).after(v);
  }
  document.getElementById("view").insertAdjacentHTML("afterend", footerHTML() + overlaysHTML());
  F1.i18n.apply();
  document.title = t(document.title);
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = t(md.content);

  document.getElementById("langToggle").addEventListener("click", (e) => F1.i18n.set(e.currentTarget.dataset.lang));
})();
