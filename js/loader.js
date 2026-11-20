/* =========================================================
   Cargador común de scripts para todas las páginas HTML.
   Mantiene la lista y el orden en un único sitio:
   núcleo → idioma → servicios → datos → componentes →
   secciones → vistas → arranque.
   Los scripts dinámicos con async=false se ejecutan en orden,
   también al abrir los archivos con doble clic (file://).
   ========================================================= */
(function () {
  var lang = "es";
  try { lang = JSON.parse(localStorage.getItem("f1l-lang") || '"es"'); } catch (e) {}
  try { var q = new URLSearchParams(location.search).get("lang"); if (q) lang = q; } catch (e) {}

  var files = [
    "core/utils", "core/i18n",
    lang === "en" ? "i18n/en" : null,
    "core/store", "core/layout",
    "services/api", "services/stats", "services/media", "services/video", "services/news",
    "data/nations", "data/drivers", "data/champions", "data/teams", "data/cars", "data/circuits",
    "data/plays", "data/rivalries", "data/history", "data/timeline", "data/gallery", "data/tech",
    "data/rules", "data/glossary", "data/quiz", "data/images", "data/social",
    lang === "en" ? "i18n/en-data" : null,
    "components/ui", "components/lightbox", "components/track", "components/gallery",
    "sections/hero", "sections/live", "sections/history", "sections/champions", "sections/plays",
    "sections/rivalries", "sections/drivers", "sections/teams", "sections/championship", "sections/grid",
    "sections/cars", "sections/circuits", "sections/gallery", "sections/timeline", "sections/learn",
    "sections/compare", "sections/quiz", "sections/search", "sections/explore", "sections/credits",
    "views/views", "core/router", "app",
  ];
  var base = (document.currentScript && document.currentScript.src || "").replace(/loader\.js.*$/, "");
  // Raíz del proyecto (carpeta que contiene js/, css/, assets/ y paginas/): base de todos los enlaces
  window.F1_ROOT = base.replace(/js\/$/, "");
  files.forEach(function (f) {
    if (!f) return;
    var s = document.createElement("script");
    s.src = base + f + ".js";
    s.async = false;
    document.body.appendChild(s);
  });
})();
