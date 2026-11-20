/* =========================================================
   Cliente de la API Jolpica-F1 (sucesora compatible de Ergast).
   https://github.com/jolpica/jolpica-f1
   - Cola de peticiones con espaciado (límite: ~4 req/s, 500 req/h).
   - Caché en localStorage con caducidad (TTL) por endpoint.
   - Si la red falla, devuelve la última copia en caché marcada como "stale".
   - Publica el estado de conexión para mostrarlo en la interfaz.
   ========================================================= */
(function () {
  const BASE = "https://api.jolpi.ca/ergast/f1/";
  const GAP_MS = 280;
  const MIN = 60e3, HOUR = 3600e3, DAY = 86400e3;

  const status = { state: "idle", lastOk: null, lastError: null, fromCache: false };
  const subs = new Set();
  const setStatus = (patch) => { Object.assign(status, patch); subs.forEach((fn) => fn(status)); };

  let chain = Promise.resolve();
  let lastAt = 0;
  const inflight = new Map();

  function schedule(fn) {
    const run = chain.then(async () => {
      const wait = Math.max(0, lastAt + GAP_MS - Date.now());
      if (wait) await F1.u.sleep(wait);
      lastAt = Date.now();
      return fn();
    });
    chain = run.catch(() => {});
    return run;
  }

  async function fetchJSON(url, tries = 3) {
    for (let i = 0; i < tries; i++) {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 15000);
      try {
        const r = await fetch(url, { signal: ctrl.signal });
        clearTimeout(to);
        if (r.status === 429) { await F1.u.sleep(1500 * (i + 1)); continue; }
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return await r.json();
      } catch (e) {
        clearTimeout(to);
        if (i === tries - 1) throw e;
        await F1.u.sleep(700 * (i + 1));
      }
    }
    throw new Error("Demasiadas peticiones");
  }

  /**
   * Obtiene un endpoint. Devuelve { data: MRData, ts, stale }.
   * @param {string} path p.ej. "current/driverstandings.json"
   * @param {object} o { ttl, force }
   */
  async function get(path, { ttl = HOUR, force = false } = {}) {
    const key = "api:" + path;
    const cached = F1.cache.get(key);
    if (cached && cached.fresh && !force) {
      if (status.state === "idle") setStatus({ state: "fresh", lastOk: cached.ts });
      return { data: cached.data, ts: cached.ts, stale: false, cached: true };
    }
    if (inflight.has(path)) return inflight.get(path);

    const p = schedule(() => fetchJSON(BASE + path))
      .then((json) => {
        const data = json.MRData;
        if (!data) throw new Error("Respuesta inesperada de la API");
        F1.cache.set(key, data, ttl);
        setStatus({ state: "online", lastOk: Date.now(), fromCache: false, lastError: null });
        return { data, ts: Date.now(), stale: false, cached: false };
      })
      .catch((err) => {
        setStatus({ state: cached ? "cache" : "offline", lastError: err.message, fromCache: !!cached });
        if (cached) return { data: cached.data, ts: cached.ts, stale: true, cached: true };
        throw err;
      })
      .finally(() => inflight.delete(path));
    inflight.set(path, p);
    return p;
  }

  /** Total de registros de un endpoint (usa limit=1). */
  async function total(path, opts) {
    const sep = path.includes("?") ? "&" : "?";
    const r = await get(`${path}${sep}limit=1`, opts);
    return +r.data.total;
  }

  /**
   * Descarga todas las páginas de un endpoint de carreras (RaceTable)
   * y fusiona las carreras partidas entre páginas.
   */
  async function allRaces(path, listKey = "Results", opts = {}) {
    const limit = 100;
    let offset = 0, totalN = Infinity, ts = Date.now(), stale = false;
    const byKey = new Map();
    while (offset < totalN) {
      const sep = path.includes("?") ? "&" : "?";
      const r = await get(`${path}${sep}limit=${limit}&offset=${offset}`, opts);
      ts = Math.min(ts, r.ts); stale = stale || r.stale;
      totalN = +r.data.total;
      (r.data.RaceTable?.Races || []).forEach((race) => {
        const k = race.season + "-" + race.round;
        if (!byKey.has(k)) byKey.set(k, { ...race, [listKey]: [] });
        byKey.get(k)[listKey].push(...(race[listKey] || []));
      });
      offset += limit;
      if (offset > 3000) break; // salvaguarda
    }
    const races = Array.from(byKey.values()).sort((a, b) => a.season - b.season || a.round - b.round);
    return { races, ts, stale };
  }

  F1.api = { BASE, get, total, allRaces, status, onStatus: (fn) => subs.add(fn), TTL: { MIN, HOUR, DAY } };
})();
