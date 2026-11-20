/* =========================================================
   Enrutador de fichas (ficha.html).
   - "ficha.html#/piloto/<id>", "#/equipo/<key>", "#/coche/<key>",
     "#/circuito/<key>", "#/gp/<temporada>/<ronda|circuito>",
     "#/rivalidad/<id>", "#/jugada/<id>" → ficha completa.
   - En el resto de páginas, un enlace antiguo con "#/..." se
     redirige a ficha.html conservando la ruta.
   ========================================================= */
F1.router = (function () {
  const { $ } = F1.u;
  const isFicha = document.body.dataset.page === "ficha";

  const routes = {
    piloto: (a) => F1.views.driver(a[0]),
    equipo: (a) => F1.views.team(a[0]),
    coche: (a) => F1.views.car(a[0]),
    circuito: (a) => F1.views.circuit(a[0]),
    gp: (a) => F1.views.gp(a[0], a[1]),
    rivalidad: (a) => F1.views.rivalry(a[0]),
    jugada: (a) => F1.views.play(a[0]),
  };

  function openView(name, args) {
    document.body.classList.add("view-open");
    const v = $("#view");
    v.hidden = false;
    window.scrollTo(0, 0);
    Promise.resolve(routes[name](args)).catch((e) => {
      v.innerHTML = `<div class="vb" style="padding-top:40px">${F1.u.errorBox(F1.t("Error al abrir la ficha") + ": " + e.message)}</div>`;
      console.error(e);
    });
    const title = () => { const h = v.querySelector("h1"); if (h) document.title = `${(h.lastChild?.textContent || h.textContent).trim()} · F1 Legends`; };
    setTimeout(title, 600);
    setTimeout(title, 2500);
  }

  function handle() {
    const h = decodeURIComponent(location.hash || "");
    if (h.startsWith("#/")) {
      const [name, ...args] = h.slice(2).split("/");
      if (routes[name]) {
        if (!isFicha) { location.replace(F1.page("ficha") + h); return; }
        return openView(name, args);
      }
    }
    if (isFicha) location.replace(F1.page("inicio"));
  }

  /** Vuelve a la página anterior; si la ficha se abrió con enlace directo, va al inicio. */
  function back() {
    const sameSite = document.referrer && (location.protocol === "file:" || document.referrer.startsWith(location.origin));
    if (history.length > 1 && (sameSite || location.protocol === "file:")) history.back();
    else location.href = F1.page("inicio");
  }

  function init() {
    window.addEventListener("hashchange", handle);
    if (isFicha || location.hash.startsWith("#/")) handle();
  }
  return { init, back, handle };
})();
