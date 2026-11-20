/* =========================================================
   Componentes de interfaz reutilizables.
   ========================================================= */
(function () {
  const { esc, $, $$ } = F1.u;

  /* ---------- Enlaces de rutas (fichas completas) ---------- */
  const F = F1.root + "paginas/fichas/ficha.html";
  const href = {
    driver: (id) => `${F}#/piloto/${encodeURIComponent(id)}`,
    team: (key) => `${F}#/equipo/${encodeURIComponent(key)}`,
    car: (key) => `${F}#/coche/${encodeURIComponent(key)}`,
    circuit: (key) => `${F}#/circuito/${encodeURIComponent(key)}`,
    gp: (season, ref) => `${F}#/gp/${season}/${encodeURIComponent(ref)}`,
    rivalry: (id) => `${F}#/rivalidad/${encodeURIComponent(id)}`,
    play: (id) => `${F}#/jugada/${encodeURIComponent(id)}`,
  };

  /* ---------- Pilotos ---------- */
  const drv = {
    get: (id) => F1.data.drivers.find((d) => d.id === id),
    name: (id, api) => drv.get(id)?.name || (api ? `${api.givenName} ${api.familyName}` : id),
    /** Título de Wikipedia para la foto: ficha propia o URL de la API. */
    img: (id, api) => drv.get(id)?.img || F1.u.wikiTitleFromUrl(api?.url) || (api ? `${api.givenName} ${api.familyName}` : id),
    /** Retrato verificado (registro central) o, si no hay, foto del artículo de Wikipedia. */
    photo: (id, api, o = {}) => {
      const r = F1.img.portrait(id);
      return F1.media.el(r ? "" : drv.img(id, api), { w: 330, alt: drv.name(id, api), ...o, q: r ? "file:" + r.file : o.q, reg: r, src: r && r.src });
    },
  };

  const flagImg = (iso, label) => iso ? `<img class="flag-img" src="https://flagcdn.com/w40/${iso}.png" srcset="https://flagcdn.com/w80/${iso}.png 2x" width="20" height="15" alt="${esc(label)}" title="${esc(label)}" loading="lazy" />` : "";
  const flag = (nat) => { const [iso, n] = F1.nat(nat); return flagImg(iso, n); };

  const teamMono = (t, size) => t ? `<span class="team-mono" style="--tc:${t.color};${size ? `width:${size}px;height:${size}px;font-size:${size / 2.6}px` : ""}" aria-hidden="true">${esc(t.mono)}</span>` : "";

  /**
   * Logotipo de la escudería (archivo local en assets/logos, ver js/data/images.js).
   * Si un equipo no tiene logotipo o el archivo falla, muestra el monograma de colores.
   * @param {object} t   ficha del equipo (F1.data.teams)
   * @param {number} size alto en píxeles
   * @param {object} o    { year } para elegir el logotipo de una época concreta
   */
  const teamLogo = (t, size = 54, o = {}) => {
    if (!t) return "";
    const L = F1.img.logo(t.key, o.year);
    if (!L) return teamMono(t, size);
    const mono = esc(t.mono || "");
    return `<span class="team-logo${L.dark ? " on-dark" : ""}" style="--tc:${t.color};--lh:${size}px" title="${esc(t.name)}${L.season ? ` · ${esc(F1.t("logotipo"))} ${esc(L.season)}` : ""}"><img src="${esc(L.src)}" alt="${esc(F1.t("Logotipo de {n}", { n: t.name }))}" loading="lazy" decoding="async" onerror="this.parentNode.outerHTML='<span class=&quot;team-mono&quot; style=&quot;--tc:${t.color}&quot; aria-hidden=&quot;true&quot;>${mono}</span>'"/></span>`;
  };
  /* ---------- Redes sociales oficiales (js/data/social.js) ---------- */
  const SOCIAL = {
    instagram: { n: "Instagram", u: (v) => `https://www.instagram.com/${v}/`, h: (v) => "@" + v, d: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.6a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4zm0 8.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8zm5.4-9.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" },
    x: { n: "X", u: (v) => `https://x.com/${v}`, h: (v) => "@" + v, d: "M17.8 3h3.1l-6.8 7.7 8 10.6h-6.3l-4.9-6.4L5.3 21.3H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3zm-1.1 16.4h1.7L7.3 4.8H5.5l11.2 14.6z" },
    youtube: { n: "YouTube", u: (v) => /^UC[\w-]{20,}$/.test(v) ? `https://www.youtube.com/channel/${v}` : `https://www.youtube.com/@${v}`, h: () => "YouTube", d: "M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3-5.8 3z" },
    tiktok: { n: "TikTok", u: (v) => `https://www.tiktok.com/@${v}`, h: (v) => "@" + v, d: "M16.6 2h-3.4v13.6a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.3a6.4 6.4 0 1 0 5.4 6.3V8.8a8 8 0 0 0 4.6 1.5V6.9A4.6 4.6 0 0 1 16.6 2z" },
    facebook: { n: "Facebook", u: (v) => /^\d+$/.test(v) ? `https://www.facebook.com/profile.php?id=${v}` : `https://www.facebook.com/${v}`, h: () => "Facebook", d: "M13.5 21.9v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.7V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6v3.2h2.7v8a10 10 0 1 1 3.2 0z" },
    twitch: { n: "Twitch", u: (v) => `https://www.twitch.tv/${v}`, h: (v) => v, d: "M3.6 2 2.2 5.6v14.7h5v2.7h2.8l2.7-2.7h4.1l5.5-5.5V2H3.6zm16.9 11.9-3.2 3.2h-5l-2.7 2.7v-2.7H5.4V3.8h15.1v10.1zM16.8 7.4v5.5h-1.9V7.4h1.9zm-5 0v5.5H9.9V7.4h1.9z" },
    web: { n: "Web", u: (v) => v, h: (v) => v.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, ""), d: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4a14 14 0 0 1 1.9 4h-3.8A14 14 0 0 1 12 4zM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6C8.8 5.5 8.4 6.7 8.1 8zM12 20a14 14 0 0 1-1.9-4h3.8A14 14 0 0 1 12 20zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.2 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4z" },
  };
  const SOCIAL_ORDER = ["instagram", "x", "youtube", "tiktok", "facebook", "twitch", "web"];
  /**
   * Botones de redes sociales oficiales.
   * @param {string} key  id del piloto (Jolpica) o clave del equipo
   * @param {object} o    { size: "sm" | "lg", labels: true para mostrar el usuario }
   */
  const social = (key, o = {}) => {
    const s = (F1.data.social || {})[key];
    if (!s) return "";
    const items = SOCIAL_ORDER.filter((k) => s[k]).map((k) => {
      const c = SOCIAL[k], v = s[k];
      return `<a class="soc soc-${k}" href="${esc(c.u(v))}" target="_blank" rel="noopener noreferrer" title="${esc(c.n)}: ${esc(c.h(v))}" aria-label="${esc(c.n)} (${F1.t("se abre en una pestaña nueva")})"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${c.d}"/></svg>${o.labels ? `<span>${esc(c.h(v))}</span>` : ""}</a>`;
    });
    return items.length ? `<div class="socials ${o.size || ""} ${o.labels ? "labeled" : ""}">${items.join("")}</div>` : "";
  };

  document.addEventListener("click", (e) => { if (e.target.closest(".soc")) e.stopPropagation(); }, true);

  /** Logotipo a partir de un constructorId de la API. */
  const teamLogoApi = (cid, size, o) => teamLogo(F1.team.fromApi(cid), size, o);

  /* ---------- Favoritos ---------- */
  const favBtn = (type, id, label, cls = "") => {
    const on = F1.favs.has(type, id);
    return `<button class="fav-btn ${cls} ${on ? "on" : ""}" data-fav-type="${esc(type)}" data-fav-id="${esc(id)}" data-fav-label="${esc(label)}" aria-pressed="${on}" aria-label="${F1.t(on ? "Quitar de favoritos" : "Añadir a favoritos")}: ${esc(label)}" title="${F1.t("Favorito")}">${on ? "★" : "☆"}</button>`;
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-fav-type]");
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const on = F1.favs.toggle(b.dataset.favType, b.dataset.favId, b.dataset.favLabel);
    $$(`[data-fav-type="${CSS.escape(b.dataset.favType)}"][data-fav-id="${CSS.escape(b.dataset.favId)}"]`).forEach((x) => {
      x.classList.toggle("on", on); x.textContent = on ? "★" : "☆"; x.setAttribute("aria-pressed", on);
    });
    F1.u.toast(F1.t(on ? "Añadido a favoritos ★" : "Eliminado de favoritos"));
  });

  /* ---------- Chips de filtro ---------- */
  function chips(options, { name, value = "all", allLabel = "Todos" } = {}) {
    const all = allLabel ? [{ v: "all", l: F1.t(allLabel) }, ...options] : options;
    return `<div class="chips" role="group" aria-label="${esc(name || "Filtro")}">${all.map((o) =>
      `<button class="chip ${o.v === value ? "on" : ""}" data-v="${esc(o.v)}" aria-pressed="${o.v === value}">${esc(o.l)}</button>`).join("")}</div>`;
  }
  function bindChips(container, onChange) {
    container.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c || !container.contains(c)) return;
      $$(".chip", c.parentElement).forEach((x) => { const on = x === c; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
      onChange(c.dataset.v);
    });
  }

  /* ---------- Pestañas accesibles ---------- */
  function tabs(container, items, onSelect, initial) {
    container.innerHTML = `<div class="tabs" role="tablist">${items.map((t) =>
      `<button class="tab" role="tab" id="tab-${t.id}" aria-selected="${t.id === (initial || items[0].id)}" data-tab="${t.id}">${esc(F1.t(t.label))}</button>`).join("")}</div>`;
    const select = (id) => {
      $$(".tab", container).forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === id));
      onSelect(id);
    };
    container.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) select(b.dataset.tab); });
    container.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
      const list = $$(".tab", container);
      const i = list.findIndex((b) => b.getAttribute("aria-selected") === "true");
      const n = list[(i + (e.key === "ArrowRight" ? 1 : list.length - 1)) % list.length];
      n.focus(); select(n.dataset.tab);
    });
    select(initial || items[0].id);
  }

  const searchField = (id, placeholder) =>
    `<label class="field"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2a8 8 0 0 1 6.32 12.9l5.39 5.4-1.41 1.4-5.4-5.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/></svg><input type="search" id="${id}" placeholder="${esc(F1.t(placeholder))}" aria-label="${esc(F1.t(placeholder))}" /></label>`;

  const select = (id, options, label, value = "") =>
    `<select class="select" id="${id}" aria-label="${esc(F1.t(label))}"><option value="">${esc(F1.t(label))}</option>${options.map((o) => `<option value="${esc(o.v)}" ${o.v === value ? "selected" : ""}>${esc(o.l)}</option>`).join("")}</select>`;

  /* ---------- Estadísticas ---------- */
  const stats = (items) => `<div class="stats">${items.map((s) =>
    `<div class="stat"><b>${s.value == null ? "—" : esc(s.value)}</b><span>${esc(F1.t(s.label))}</span>${s.note ? `<small>${esc(s.note)}</small>` : ""}</div>`).join("")}</div>`;

  /* ---------- Videos (jugadas o rivalidades) ---------- */
  function videoRef(ref) {
    if (!ref) return null;
    if (ref.startsWith("rival:")) {
      const r = F1.data.rivalries.find((x) => x.id === ref.slice(6));
      return r && { ids: r.video, title: r.title, sub: r.tagline };
    }
    const p = F1.data.plays.find((x) => x.id === ref);
    return p && { ids: p.video, title: p.title, sub: `${p.year} · ${p.circuit}` };
  }
  const videoNode = (v) => (v ? F1.video.node(v) : document.createElement("div"));

  /* ---------- Estado de conexión de la API ---------- */
  function statusPill(node) {
    const paint = (s) => {
      const map = { online: ["online", "API conectada"], fresh: ["online", "Datos vigentes (caché)"], cache: ["cache", "Sin conexión · datos en caché"], offline: ["offline", "API no disponible"], idle: ["", "Conectando…"] };
      const [cls, txt] = map[s.state] || map.idle;
      node.className = "status-pill " + cls;
      node.innerHTML = `<i></i>${F1.t(txt)}${s.lastOk ? ` · ${F1.u.fmtTime(s.lastOk)}` : ""}`;
    };
    paint(F1.api.status);
    F1.api.onStatus(paint);
  }

  /** Línea de "datos actualizados" con fecha real de la caché. */
  const freshness = (ts, stale) =>
    `<span class="status-pill ${stale ? "cache" : "online"}"><i></i>${F1.t(stale ? "Copia guardada" : "Actualizado")} ${F1.u.relTime(ts)} · ${F1.u.fmtDateTime(ts)}</span>`;

  F1.ui = { href, drv, flag, flagImg, teamMono, teamLogo, teamLogoApi, social, favBtn, chips, bindChips, tabs, searchField, select, stats, videoRef, videoNode, statusPill, freshness };
  F1.drv = drv;
})();
