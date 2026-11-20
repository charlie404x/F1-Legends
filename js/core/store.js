/* =========================================================
   Almacenamiento local seguro + caché con caducidad + favoritos.
   ========================================================= */
(function () {
  const PREFIX = "f1l-";

  const store = {
    get(key, def) {
      try { const v = localStorage.getItem(PREFIX + key); return v == null ? def : JSON.parse(v); } catch { return def; }
    },
    set(key, val) {
      try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); return true; } catch { return false; }
    },
    del(key) { try { localStorage.removeItem(PREFIX + key); } catch {} },
  };

  /** Caché con TTL. Si el almacenamiento se llena, purga entradas antiguas. */
  const cache = {
    get(key) {
      const e = store.get("c:" + key);
      if (!e) return null;
      return { data: e.d, ts: e.t, fresh: Date.now() - e.t < e.ttl };
    },
    set(key, data, ttl) {
      const ok = store.set("c:" + key, { d: data, t: Date.now(), ttl });
      if (!ok) { cache.purge(); store.set("c:" + key, { d: data, t: Date.now(), ttl }); }
    },
    purge() {
      try {
        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(PREFIX + "c:")) {
            try { items.push([k, JSON.parse(localStorage.getItem(k)).t || 0]); } catch { items.push([k, 0]); }
          }
        }
        items.sort((a, b) => a[1] - b[1]).slice(0, Math.ceil(items.length / 2)).forEach(([k]) => localStorage.removeItem(k));
      } catch {}
    },
  };

  /** Favoritos: { type: { id: label } } */
  const listeners = new Set();
  const favs = {
    all() { return store.get("favs", {}); },
    has(type, id) { const a = favs.all(); return !!(a[type] && a[type][id]); },
    toggle(type, id, label) {
      const a = favs.all();
      a[type] = a[type] || {};
      if (a[type][id]) delete a[type][id]; else a[type][id] = label || id;
      store.set("favs", a);
      listeners.forEach((fn) => fn());
      return !!a[type][id];
    },
    count() { return Object.values(favs.all()).reduce((n, o) => n + Object.keys(o).length, 0); },
    onChange(fn) { listeners.add(fn); },
  };

  F1.store = store;
  F1.cache = cache;
  F1.favs = favs;
})();
