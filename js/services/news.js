/* =========================================================
   Noticias reales desde los feeds RSS públicos de medios
   especializados, convertidos a JSON con rss2json (los feeds
   originales no permiten CORS desde el navegador).
   Cada noticia conserva fecha, medio y enlace al original.
   ========================================================= */
(function () {
  // Fuentes según el idioma de la web (en español se combinan medios en español e inglés)
  const ALL = {
    marca: { name: "Marca", url: "https://www.marca.com/rss/motor/formula1.xml", lang: "es" },
    msEs: { name: "Motorsport.com ES", url: "https://es.motorsport.com/rss/f1/news/", lang: "es" },
    ms: { name: "Motorsport.com", url: "https://www.motorsport.com/rss/f1/news/", lang: "en" },
    autosport: { name: "Autosport", url: "https://www.autosport.com/rss/f1/news/", lang: "en" },
    bbc: { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/formula1/rss.xml", lang: "en" },
    racefans: { name: "RaceFans", url: "https://www.racefans.net/feed/", lang: "en" },
  };
  const FEEDS = (F1.i18n && F1.i18n.lang === "en") ? [ALL.ms, ALL.autosport, ALL.bbc, ALL.racefans] : [ALL.marca, ALL.msEs, ALL.ms, ALL.bbc];
  const TTL = 8 * 60e3;

  const parseDate = (s) => {
    if (!s) return null;
    const d = new Date(/Z|[+-]\d\d:?\d\d$/.test(s) ? s : s.replace(" ", "T") + "Z");
    return isNaN(d) ? null : d;
  };

  async function fetchFeed(f) {
    const r = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(f.url));
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    if (j.status !== "ok") throw new Error(j.message || "feed error");
    return (j.items || []).map((it) => ({
      title: it.title, link: it.link, date: parseDate(it.pubDate)?.toISOString() || null,
      source: f.name, lang: f.lang, image: it.enclosure?.link || it.thumbnail || null,
    }));
  }

  /** Devuelve { items, ts, stale, failed[] } */
  async function latest(limit = 9, { force = false } = {}) {
    const KEY = "news:" + (F1.i18n ? F1.i18n.lang : "es");
    const c = F1.cache.get(KEY);
    if (c && c.fresh && !force) return { ...c.data, ts: c.ts, stale: false };
    const settled = await Promise.allSettled(FEEDS.map(fetchFeed));
    const failed = FEEDS.filter((_, i) => settled[i].status !== "fulfilled").map((f) => f.name);
    let items = settled.flatMap((s) => (s.status === "fulfilled" ? s.value : []));
    if (!items.length) {
      if (c) return { ...c.data, ts: c.ts, stale: true };
      throw new Error("No se pudieron cargar las noticias");
    }
    const seen = new Set();
    items = items
      .filter((i) => i.link && !seen.has(i.link) && seen.add(i.link))
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    // Diversidad: máximo 3 noticias por medio
    const per = {};
    const pick = items.filter((i) => (per[i.source] = (per[i.source] || 0) + 1) <= 3).slice(0, limit);
    const data = { items: pick, failed };
    F1.cache.set(KEY, data, TTL);
    return { ...data, ts: Date.now(), stale: false };
  }

  F1.news = { latest, FEEDS };
})();
