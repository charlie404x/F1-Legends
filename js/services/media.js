/* =========================================================
   Imágenes con cadena de respaldo y créditos:
   1) Imagen principal del artículo de Wikipedia (API REST).
   2) Búsqueda en Wikimedia Commons (API de búsqueda).
   3) Placeholder con el nombre del elemento.
   Los créditos (autor/licencia) se leen de Commons (extmetadata).
   ========================================================= */
(function () {
  const DAY = 86400e3;
  const BUCKETS = [120, 250, 330, 500, 960, 1280, 1920];
  const mem = new Map();

  function bucket(w) { return BUCKETS.find((b) => b >= w) || BUCKETS[BUCKETS.length - 1]; }

  /* Máximo 4 peticiones simultáneas a Wikimedia para respetar sus límites (evita HTTP 429). */
  let active = 0;
  const waiting = [];
  const acquire = () => new Promise((res) => { if (active < 3) { active++; res(); } else waiting.push(res); });
  const release = () => { const next = waiting.shift(); if (next) next(); else active--; };

  async function fetchOnce(url) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 12000);
    try { return await fetch(url, { signal: ctrl.signal }); } finally { clearTimeout(to); }
  }

  async function getJSON(url) {
    await acquire();
    try {
      let r = await fetchOnce(url);
      // Límite de peticiones de Wikimedia: espera progresiva (respeta Retry-After) y reintenta
      for (let i = 0; i < 3 && r.status === 429; i++) {
        const ra = +r.headers.get("Retry-After");
        await F1.u.sleep(ra > 0 && ra < 30 ? ra * 1000 : 1500 * Math.pow(2, i));
        r = await fetchOnce(url);
      }
      if (r.status === 404) return {};
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } finally { release(); }
  }

  const fileFromUrl = (u) => { try { return decodeURIComponent(u.split("?")[0].split("/").pop()); } catch { return null; } };

  /** Normaliza URLs de Wikimedia: siempre upload.wikimedia.org y sin parámetros de seguimiento. */
  const clean = (u) => (u ? String(u).replace(/^https:\/\/thumb\.wikimedia\.org\//, "https://upload.wikimedia.org/").replace(/\?utm_[^#]*$/, "") : u);

  /**
   * Agrupa peticiones individuales en lotes (hasta 40 títulos por llamada
   * a la API). Así una tabla con 22 retratos hace 1 petición, no 22, y se
   * evitan los errores 429 (demasiadas peticiones) de Wikimedia.
   */
  function batcher(run, delay = 60, max = 40) {
    let queue = new Map(), timer = null;
    const flush = () => {
      clearTimeout(timer); timer = null;
      const batch = queue; queue = new Map();
      run(Array.from(batch.keys()))
        .then((map) => batch.forEach((cbs, k) => cbs.forEach(([ok]) => ok(map[k] || null))))
        .catch((e) => batch.forEach((cbs) => cbs.forEach(([, ko]) => ko(e))));
    };
    return (key) => new Promise((ok, ko) => {
      if (!queue.has(key)) queue.set(key, []);
      queue.get(key).push([ok, ko]);
      if (queue.size >= max) flush(); else if (!timer) timer = setTimeout(flush, delay);
    });
  }

  /** Relaciona cada título pedido con la página devuelta (normalizaciones y redirecciones). */
  function mapPages(d, keys, prefix = "") {
    const q = d.query || {};
    const fwd = {};
    (q.normalized || []).forEach((n) => (fwd[n.from] = n.to));
    (q.redirects || []).forEach((n) => (fwd[n.from] = n.to));
    const pages = {};
    (q.pages ? (Array.isArray(q.pages) ? q.pages : Object.values(q.pages)) : []).forEach((pg) => (pages[pg.title] = pg));
    const out = {};
    keys.forEach((k) => {
      let tt = prefix + k;
      for (let i = 0; i < 3 && fwd[tt]; i++) tt = fwd[tt];
      out[k] = pages[tt] || null;
    });
    return out;
  }

  /* Imagen principal de artículos de Wikipedia (en lote, solo imágenes libres) */
  const wikiBatch = batcher(async (titles) => {
    const d = await getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&redirects=1"
      + `&prop=pageimages|info&inprop=url&piprop=original|thumbnail|name&pithumbsize=960&titles=${encodeURIComponent(titles.join("|"))}`);
    const m = mapPages(d, titles);
    const out = {};
    titles.forEach((k) => {
      const pg = m[k];
      if (!pg || (!pg.original && !pg.thumbnail)) return;
      const orig = clean(pg.original?.source || pg.thumbnail.source);
      out[k] = { thumb: clean(pg.thumbnail?.source || null), orig, width: pg.original?.width || pg.thumbnail?.width || 0, height: pg.original?.height || 0, file: pg.pageimage || fileFromUrl(orig), page: pg.fullurl || null, source: "Wikipedia" };
    });
    return out;
  });
  const fromWikipedia = (title) => wikiBatch(title);

  /* Archivos concretos de Commons (en lote) */
  const fileBatch = batcher(async (files) => {
    const d = await getJSON("https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=imageinfo&iiprop=url|size&iiurlwidth=960"
      + `&titles=${encodeURIComponent(files.map((f) => "File:" + f).join("|"))}`);
    const m = mapPages(d, files, "File:");
    const out = {};
    files.forEach((f) => {
      const ii = m[f]?.imageinfo?.[0];
      if (ii) out[f] = { thumb: clean(ii.thumburl), orig: clean(ii.url), width: ii.width, height: ii.height, file: f, page: ii.descriptionurl, source: "Wikimedia Commons" };
    });
    return out;
  });

  /**
   * Búsqueda en Commons. `must`: lista de términos que deben aparecer en el
   * nombre del archivo (cada término admite alternativas con "|"), para
   * descartar fotos que no correspondan al elemento.
   */
  async function commonsSearch(query, n = 1, must = []) {
    const cl = (x) => F1.u.norm(x).replace(/[^a-z0-9]/g, "");
    const url = "https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6"
      + `&gsrsearch=${encodeURIComponent(query + " filetype:bitmap")}&gsrlimit=${must.length ? 40 : Math.max(n, 3)}&prop=imageinfo&iiprop=url|size&iiurlwidth=960`;
    const d = await getJSON(url);
    const pages = Object.values(d.query?.pages || {}).sort((a, b) => a.index - b.index);
    // Cada término (con alternativas "a|b") debe aparecer en el nombre del archivo
    const ok = (title) => must.every((m) => m.split("|").some((alt) => cl(title).includes(cl(alt))));
    return pages
      .filter((p) => p.imageinfo?.[0] && /\.(jpe?g|png|webp)$/i.test(p.title) && ok(p.title))
      .slice(0, n)
      .map((p) => {
        const ii = p.imageinfo[0];
        const file = p.title.replace(/^File:/, "");
        const y = file.match(/\b(19[4-9]\d|20[0-3]\d)\b/);
        return { thumb: clean(ii.thumburl), orig: clean(ii.url), width: ii.width, height: ii.height, file, page: ii.descriptionurl, source: "Wikimedia Commons", year: y ? +y[1] : null };
      });
  }

  /** Imagen concreta de Commons por nombre de archivo (selección verificada a mano). */
  const commonsFile = (file) => fileBatch(file);

  /** Resuelve la mejor imagen disponible para un título (con caché).
   *  q: "file:<archivo>" → archivo exacto de Commons; "!<búsqueda>" → solo búsqueda en Commons. */
  function resolve(title, q) {
    const key = title + "|" + (q || "");
    if (mem.has(key)) return mem.get(key);
    const p = (async () => {
      const c = F1.cache.get("img2:" + key);
      if (c && c.fresh) return c.data;
      let info = null, failed = false;
      const attempt = async (fn) => { try { return await fn(); } catch { failed = true; return null; } };
      if (q && q.startsWith("file:")) {
        info = await attempt(() => commonsFile(q.slice(5)));
        q = "";
      }
      if (!info && title && (!q || !q.startsWith("!"))) info = await attempt(() => fromWikipedia(title));
      const text = (q || title || "").replace(/^!/, "");
      if (!info && text.trim()) {
        // Sintaxis "!búsqueda||término1,término2": los términos deben aparecer en el nombre del archivo
        const [query, must] = text.split("||");
        // Sin términos explícitos se exige la palabra más distintiva del título (p. ej. "Webber", "MCL39")
        const STOP = /^(formula|one|racing|team|grand|prix|circuit|in|the|f1|motorsport|de|del|la)$/i;
        const word = query.split(/\s+/).filter((w) => w.length > 1 && !STOP.test(w)).sort((x, y) => y.length - x.length)[0];
        const terms = must ? must.split(",") : word ? [word] : [];
        info = (await attempt(() => commonsSearch(query, 1, terms)))?.[0] || null;
      }
      // Un fallo de red no se guarda como "sin imagen": se reintentará en la próxima visita
      if (info) F1.cache.set("img2:" + key, info, 14 * DAY);
      else if (!c && !failed) F1.cache.set("img2:" + key, null, DAY);
      if (!info && failed) mem.delete(key);
      return info || (c ? c.data : null);
    })();
    mem.set(key, p);
    return p;
  }

  /** URL a un tamaño concreto usando los tamaños estándar de Wikimedia. */
  function url(info, w = 500) {
    if (!info) return null;
    info = { ...info, thumb: clean(info.thumb), orig: clean(info.orig) };
    const b = bucket(w);
    const src = info.thumb || info.orig;
    if (info.width && info.width <= b) return info.orig;
    if (/\/thumb\//.test(src) && /\/\d+px-/.test(src)) return src.replace(/\/\d+px-/, `/${b}px-`).replace(/\?.*$/, "");
    if (/upload\.wikimedia\.org\/wikipedia\/commons\/(?!thumb)/.test(info.orig) && info.file && !/\.svg$/i.test(info.file)) {
      const parts = info.orig.split("/wikipedia/commons/")[1];
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/${parts}/${b}px-${encodeURIComponent(info.file.replace(/ /g, "_"))}`;
    }
    return info.orig;
  }

  /* ---------- Carga diferida ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); load(e.target); } }), { rootMargin: "350px" })
    : null;

  function load(node) {
    const img = node.querySelector("img");
    if (node._reg) applyFrame(img, node._reg);
    const w = +node.dataset.w || 500;
    resolve(node.dataset.title, node.dataset.q || "").then((info) => {
      if (!info) { node.classList.add("fail"); return; }
      node._info = info;
      const src = url(info, w);
      img.onload = () => node.classList.add("ok");
      // Respaldo: miniatura más pequeña (tamaño estándar en caché) y, si el original es ligero, el original
      const tries = [url(info, 330), info.width && info.width <= 2000 && !/\.svg$/i.test(info.orig || "") ? clean(info.orig) : null].filter((u) => u && u !== src);
      img.onerror = () => {
        const next = tries.shift();
        if (next) img.src = next; else node.classList.add("fail");
      };
      img.src = src;
    }).catch(() => node.classList.add("fail"));
  }

  /**
   * Crea un contenedor de imagen con placeholder y carga diferida.
   * @param {string} title  título del artículo de Wikipedia (inglés)
   * @param {object} o { w, alt, q (búsqueda Commons; "!" = solo Commons), cls, contain, eager }
   */
  /** Encuadre de retratos del registro (pos = object-position, zoom = ampliación). */
  function applyFrame(img, r) {
    if (r.pos) img.style.objectPosition = r.pos;
    if (r.zoom) { img.style.transformOrigin = r.pos || "50% 30%"; img.style.scale = r.zoom; }
  }

  function el(title, o = {}) {
    const node = document.createElement("div");
    node.className = "media" + (o.cls ? " " + o.cls : "") + (o.contain ? " contain" : "") + (o.reg && o.reg.kind === "car" ? " is-car" : "");
    if (o.reg) {
      node._reg = o.reg;
      node.title = `${o.alt || ""} · ${o.reg.desc}`.replace(/^ · /, "");
    }
    node.dataset.title = title || "";
    node.dataset.w = o.w || 500;
    if (o.q) node.dataset.q = o.q;
    node.dataset.fallback = o.fallback || o.alt || title || "";
    const img = document.createElement("img");
    img.alt = o.alt || title || "";
    img.decoding = "async";
    img.loading = o.eager ? "eager" : "lazy";
    node.appendChild(img);
    // Archivo local (retratos y logotipos del proyecto): se pinta al momento; si falla, se busca en Wikimedia
    if (o.src) {
      img.onload = () => node.classList.add("ok");
      img.onerror = () => { img.onerror = null; if (title || o.q) load(node); else node.classList.add("fail"); };
      img.src = o.src;
      return node;
    }
    if (!title && !o.q) { node.classList.add("fail"); return node; }
    if (o.eager || !io) load(node); else io.observe(node);
    return node;
  }

  /** Autor y licencia de un archivo de Commons. */
  async function credits(file) {
    if (!file) return null;
    const key = "cred:" + file;
    const c = F1.cache.get(key);
    if (c && c.fresh) return c.data;
    try {
      const d = await getJSON("https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata|url"
        + `&iiextmetadatafilter=Artist|LicenseShortName|DateTimeOriginal&titles=${encodeURIComponent("File:" + file)}`);
      const page = Object.values(d.query?.pages || {})[0];
      const ii = page?.imageinfo?.[0];
      if (!ii) return null;
      const strip = (h) => (h || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      const out = {
        artist: strip(ii.extmetadata?.Artist?.value) || F1.t("Autor desconocido"),
        license: strip(ii.extmetadata?.LicenseShortName?.value) || F1.t("Ver licencia"),
        date: strip(ii.extmetadata?.DateTimeOriginal?.value).slice(0, 10),
        page: ii.descriptionurl,
      };
      F1.cache.set(key, out, 30 * DAY);
      return out;
    } catch { return null; }
  }

  /** Resumen biográfico de Wikipedia (primero en español; si no, en inglés). */
  async function summary(title, esTitle) {
    const key = "sum:" + (F1.i18n ? F1.i18n.lang : "es") + ":" + title;
    const c = F1.cache.get(key);
    if (c && c.fresh) return c.data;
    const tryLang = async (lang, t) => {
      const d = await getJSON(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t.replace(/ /g, "_"))}`);
      if (d.type === "disambiguation" || !d.extract) return null;
      return { text: d.extract, lang, url: d.content_urls?.desktop?.page };
    };
    let out = null;
    const first = F1.i18n && F1.i18n.lang === "en" ? [["en", title], ["es", esTitle || title]] : [["es", esTitle || title], ["en", title]];
    for (const [lg, tt] of first) { if (out) break; try { out = await tryLang(lg, tt); } catch {} }
    if (out) F1.cache.set(key, out, 14 * DAY);
    return out;
  }

  /* =========================================================
     Galerías desde categorías de Wikimedia Commons.
     Recorre la categoría y sus subcategorías (p. ej. "Ayrton Senna
     by year" → "Ayrton Senna in 1988"), reparte la selección entre
     temporadas distintas y descarta lo que no es una fotografía
     (logotipos, firmas, mapas, audio, video, documentos).
     Devuelve [{ thumb, orig, width, height, file, page, desc, date,
     year, artist, license, cat }] ordenado por fecha.
     ========================================================= */
  const SKIP_CAT = /signature|autograph|logo|video|audio|sound|pronunciation|map|plan|drawing|painting|art\b|caricature|stamp|coin|poster|toy|model|lego|scale|grave|tomb|memorial|statue|mural|document|text|book|magazine|newspaper|pdf|flag|coat of arms|family|relatives|wedding|bust|wax|by decade/i;
  const SKIP_FILE = /signature|autograph|firma|logo|\bmap\b|plan\b|diagram|icon|coat of arms|flag of|stamp|poster|ticket|programme|\bsvg\b|lego|scale model|statue|grave|plaque|wax/i;
  const YEAR = /\b(19[4-9]\d|20[0-3]\d)\b/;

  async function members(cat, limit = 50) {
    const lang = F1.i18n ? F1.i18n.lang : "es";
    const u = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*"
      + `&generator=categorymembers&gcmtitle=${encodeURIComponent("Category:" + cat)}&gcmtype=file|subcat&gcmlimit=${limit}`
      + "&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=500"
      + `&iiextmetadatafilter=ImageDescription|DateTimeOriginal|Artist|LicenseShortName&iiextmetadatalanguage=${lang}`;
    const d = await getJSON(u);
    const pages = d.query?.pages || [];
    const strip = (h) => (h || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const files = [], subcats = [];
    pages.forEach((p) => {
      if (p.ns === 14) { subcats.push(p.title.replace(/^Category:/, "")); return; }
      const ii = p.imageinfo?.[0];
      if (!ii || !/^image\/(jpeg|png|webp)$/.test(ii.mime) || ii.width < 600 || ii.height < 380) return;
      const file = p.title.replace(/^File:/, "");
      if (SKIP_FILE.test(file)) return;
      const em = ii.extmetadata || {};
      const date = strip(em.DateTimeOriginal?.value).slice(0, 10);
      // El año del nombre del archivo o de la categoría ("X in 1988") es más fiable que la fecha EXIF (a menudo la del escaneo)
      const y = (file.match(YEAR) || cat.match(YEAR) || date.match(YEAR) || [])[1];
      files.push({
        thumb: clean(ii.thumburl), orig: clean(ii.url), width: ii.width, height: ii.height, file, page: ii.descriptionurl,
        desc: strip(em.ImageDescription?.value).slice(0, 220), date: /^\d{4}-\d\d-\d\d/.test(date) && (!y || date.startsWith(y)) ? date : "", year: y ? +y : null,
        artist: strip(em.Artist?.value).slice(0, 80), license: strip(em.LicenseShortName?.value), cat, source: "Wikimedia Commons",
      });
    });
    return { files, subcats };
  }

  /** Reparte n elementos de forma uniforme a lo largo de una lista ordenada. */
  const spread = (arr, n) => arr.length <= n ? arr : Array.from({ length: n }, (_, i) => arr[Math.round(i * (arr.length - 1) / (n - 1 || 1))]);

  // Galerías de personas: fuera institutos, películas, homenajes, calles… (no son fotos del piloto)
  const SKIP_PERSON = /comic|cartoon|tirinha|senninha|anime|manga|trading card|cartão|exposi|doll|figurine|institut|foundation|fundaç|fundación|film|movie|documentar|museum|museo|monument|tribute|homage|street|avenue|square|road|rua|avenida|named after|popular culture|fans|exhibition|school|academy|park|stadium|bridge|airport|award|trophy design|graffiti|murals?/i;

  async function category(cats, { max = 30, perCat = 8, exclude = [], budget = 14, person = false, terms = [] } = {}) {
    exclude = exclude.concat((F1.img && F1.img.galleryExclude) || []);
    cats = (Array.isArray(cats) ? cats : [cats]).filter(Boolean);
    if (!cats.length) return [];
    const key = "gal3:" + (F1.i18n ? F1.i18n.lang : "es") + ":" + cats.join("|") + ":" + max;
    const nrm = (x) => F1.u.norm(x || "");
    const T = terms.map(nrm).filter(Boolean);
    // Relevancia (galerías de personas): la foto está en una subcategoría con su nombre (p. ej. "Senna in 1988")
    // o el nombre del archivo / la descripción lo menciona. Así no se cuelan fotos ajenas de la categoría raíz.
    const relevant = (x) => !T.length || T.some((tt) => (x.cat !== cats[0] && nrm(x.cat).includes(tt)) || nrm(x.file + " " + x.desc).includes(tt));
    const c = F1.cache.get(key);
    if (c && c.fresh) return c.data.filter((x) => !exclude.includes(x.file));
    let calls = 0, failed = 0;
    const seenCat = new Set();
    const pool = [];
    const visit = async (cat) => {
      if (seenCat.has(cat) || calls >= budget) return { files: [], subcats: [] };
      seenCat.add(cat); calls++;
      try { return await members(cat); } catch { failed++; return { files: [], subcats: [] }; }
    };
    // Nivel 0: las categorías raíz
    const roots = await Promise.all(cats.map(visit));
    let subs = [];
    roots.forEach((r) => { pool.push(...r.files.slice(0, perCat * 2)); subs.push(...r.subcats); });
    const okCat = (x) => !SKIP_CAT.test(x) && !(person && SKIP_PERSON.test(x));
    subs = subs.filter(okCat);
    // Nivel 1: categorías "por año" y otras relevantes
    const byYear = subs.filter((s) => /by year|by season|in formula one/i.test(s));
    const yearCats = subs.filter((s) => YEAR.test(s));
    // Otras subcategorías: primero las de carreras, coches, cascos y podios
    const score = (x) => (/racing automobiles|cars driven|helmets?|grand prix|formula one|podium|race|f1/i.test(x) ? 2 : 0) - (/by country|by location|people|portraits? by/i.test(x) ? 1 : 0);
    const others = subs.filter((s) => !byYear.includes(s) && !yearCats.includes(s)).sort((a, b) => score(b) - score(a));
    const lvl1 = await Promise.all(byYear.slice(0, 2).map(visit));
    lvl1.forEach((r) => { pool.push(...r.files.slice(0, perCat)); yearCats.push(...r.subcats.filter((s) => YEAR.test(s) && okCat(s))); });
    // Nivel 2: temporadas repartidas a lo largo de la trayectoria + otras subcategorías
    const years = Array.from(new Set(yearCats)).sort((a, b) => +(a.match(YEAR)?.[1] || 0) - +(b.match(YEAR)?.[1] || 0));
    const left = Math.max(0, budget - calls);
    const pickYears = spread(years, Math.min(years.length, Math.max(3, left - 2)));
    const pickOthers = others.slice(0, Math.max(0, left - pickYears.length));
    const lvl2 = await Promise.all(pickYears.concat(pickOthers).map(visit));
    lvl2.forEach((r) => pool.push(...r.files.slice(0, perCat)));
    // Limpieza: sin duplicados y como máximo 2 fotos de una misma serie
    const seen = new Set(), series = {};
    const base = (f) => f.toLowerCase().replace(/\.(jpe?g|png|webp)$/, "").replace(/\([^)]*\)/g, " ").replace(/\b(ultra|cropped|crop|edited|edit|retouched|recortada|recorte)\b/g, " ").replace(/[\s_-]+\d{1,5}$/g, "").replace(/[^a-z\u00e0-\u00ff]+/g, "");
    let out = pool.filter((x) => {
      if (seen.has(x.file)) return false;
      if (person && SKIP_PERSON.test(x.file)) return false;
      if (exclude.includes(x.file) || !relevant(x)) return false;
      seen.add(x.file);
      const b = base(x.file);
      series[b] = (series[b] || 0) + 1;
      // Recortes de una foto ya incluida no aportan variedad
      return series[b] <= (/crop|recort/i.test(x.file) ? 1 : 2);
    });
    out.sort((a, b) => (a.year || 9999) - (b.year || 9999) || (a.date || "").localeCompare(b.date || ""));
    out = out.length > max ? spread(out, max) : out;
    // Un resultado incompleto (peticiones rechazadas) no se guarda: se reintentará en la próxima visita
    if (!failed) F1.cache.set(key, out, out.length ? 7 * DAY : DAY);
    return out.filter((x) => !exclude.includes(x.file));
  }

  /** Texto legible a partir del nombre de archivo de Commons. */
  function caption(info) {
    if (info.desc && info.desc.length > 8 && !/^(own work|trabajo propio|\w+\.jpe?g)$/i.test(info.desc)) return info.desc;
    return (info.file || "").replace(/\.(jpe?g|png|webp)$/i, "").replace(/_/g, " ")
      .replace(/\s*\((\d{6,}|cropped\d*|DSC\w*|IMG\w*)\)/gi, "").replace(/\b(DSC|IMG|DSCF)[_-]?\d+\b/gi, "").replace(/\s{2,}/g, " ").trim();
  }

  F1.media = { resolve, url, el, credits, summary, commonsSearch, category, caption };
})();
