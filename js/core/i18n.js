/* =========================================================
   Internacionalización (español / inglés).
   - El idioma se guarda en localStorage ("f1l-lang") y se aplica
     al recargar la página (todas las secciones se vuelven a pintar).
   - Textos de interfaz: F1.t("texto en español", { variables }).
     El diccionario inglés vive en js/i18n/en.js y usa como clave
     el propio texto en español (si falta una traducción, se muestra
     el original en español: nunca queda un hueco vacío).
   - HTML estático: atributos data-i18n (contenido) y
     data-i18n-attr="placeholder,aria-label,title" (atributos).
   - Contenido editorial: js/i18n/en-data.js sobrescribe los campos
     de texto de los datos (biografías, historia, etc.) por id.
   ========================================================= */
(function () {
  const KEY = "f1l-lang";
  let lang = "es";
  try { const v = JSON.parse(localStorage.getItem(KEY) || '"es"'); if (v === "en" || v === "es") lang = v; } catch (e) {}
  // Permite forzar el idioma por URL (?lang=en) para compartir enlaces
  try { const q = new URLSearchParams(location.search).get("lang"); if (q === "en" || q === "es") { lang = q; localStorage.setItem(KEY, JSON.stringify(q)); } } catch (e) {}

  const dict = {};       // es → en (interfaz)
  const dataPatches = []; // funciones que traducen F1.data

  /** Traduce un texto de interfaz y sustituye {variables}. */
  function t(s, vars) {
    let out = lang === "en" && dict[s] != null ? dict[s] : s;
    if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return out;
  }

  /** Plural sencillo: tn(n, "título", "títulos"). */
  function tn(n, one, many) { return t(n === 1 ? one : many); }

  /** Traduce los nodos con data-i18n dentro de root. */
  function apply(root = document) {
    if (lang === "es") return;
    root.querySelectorAll("[data-i18n]").forEach((n) => {
      const k = n.getAttribute("data-i18n") || n.innerHTML.trim();
      if (dict[k] != null) n.innerHTML = dict[k];
    });
    root.querySelectorAll("[data-i18n-attr]").forEach((n) => {
      n.getAttribute("data-i18n-attr").split(",").forEach((a) => {
        const v = n.getAttribute(a.trim());
        if (v && dict[v] != null) n.setAttribute(a.trim(), dict[v]);
      });
    });
  }

  function set(l) {
    try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {}
    // Quita ?lang= de la URL para que el cambio manual prevalezca
    const u = new URL(location.href);
    u.searchParams.delete("lang");
    location.replace(u.toString());
  }

  F1.i18n = {
    get lang() { return lang; },
    get locale() { return lang === "en" ? "en-GB" : "es"; },
    dict,
    add(entries) { Object.assign(dict, entries); },
    patchData(fn) { dataPatches.push(fn); },
    applyData() { if (lang === "en") dataPatches.forEach((fn) => { try { fn(F1.data); } catch (e) { console.error("[i18n data]", e); } }); },
    apply, set, t, tn,
  };
  F1.t = t;
  document.documentElement.lang = lang;
})();
