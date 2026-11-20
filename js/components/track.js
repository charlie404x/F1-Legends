/* =========================================================
   Trazado interactivo a partir de GeoJSON real
   (bacinger/f1-circuits, licencia MIT).
   - Proyección equirectangular corregida por latitud.
   - Tres sectores resaltables, línea de meta y sentido de giro.
   - Coche animado + deslizador para recorrer la vuelta.
   ========================================================= */
(function () {
  const { esc } = F1.u;
  const GEO_URL = "https://raw.githubusercontent.com/bacinger/f1-circuits/master/f1-circuits.geojson";
  let geoPromise = null;

  function loadGeo() {
    if (!geoPromise) {
      geoPromise = fetch(GEO_URL).then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
        .catch((e) => { geoPromise = null; throw e; });
    }
    return geoPromise;
  }

  function project(coords, W, H, pad) {
    const lat0 = coords.reduce((s, c) => s + c[1], 0) / coords.length;
    const k = Math.cos(lat0 * Math.PI / 180);
    const pts = coords.map(([lon, lat]) => [lon * k, -lat]);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const s = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY));
    const ox = (W - (maxX - minX) * s) / 2, oy = (H - (maxY - minY) * s) / 2;
    return pts.map(([x, y]) => [ox + (x - minX) * s, oy + (y - minY) * s]);
  }

  const SECTORS = [{ n: "Sector 1", c: "#E10600" }, { n: "Sector 2", c: "#2E9BFF" }, { n: "Sector 3", c: "#C9A227" }];

  /**
   * @param {HTMLElement} host
   * @param {{geo: string, length: number, name: string, fallbackTitle?: string}} c
   */
  async function render(host, c) {
    host.innerHTML = `<div class="track-wrap">${F1.u.loading("Cargando trazado…")}</div>`;
    let feature;
    try {
      const geo = await loadGeo();
      feature = geo.features.find((f) => f.properties.id === c.geo);
      if (!feature) throw new Error("Trazado no encontrado");
    } catch (e) {
      host.innerHTML = `<div class="state error">No se pudo cargar el trazado interactivo (${esc(e.message)}). Se muestra el plano de Wikipedia.</div>`;
      if (c.fallbackTitle) host.appendChild(F1.media.el(c.fallbackTitle, { w: 960, contain: true, alt: "Plano de " + c.name }));
      return;
    }
    let coords = feature.geometry.type === "LineString" ? feature.geometry.coordinates : feature.geometry.coordinates[0];
    const W = 1000, H = 620;
    const pts = project(coords, W, H, 40);
    const d = "M" + pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join("L") + "Z";

    host.innerHTML = `
      <div class="track-wrap">
        <svg class="track-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Trazado de ${esc(c.name)}">
          <path class="track-shadow" d="${d}" transform="translate(4,6)"/>
          <path class="track-base" d="${d}"/>
          <path class="track-line" d="${d}"/>
          <g class="sectors"></g>
          <line class="sf-line"/>
          <path class="dir-arrow" fill="var(--red)"/>
          <circle class="car-dot" r="9"/>
        </svg>
        <div class="track-controls">
          <button class="btn btn-primary btn-sm" data-act="play" aria-label="Reproducir vuelta">▶ Vuelta</button>
          <select class="select" data-act="speed" aria-label="Velocidad">
            <option value="24">Lenta</option><option value="12" selected>Normal</option><option value="6">Rápida</option>
          </select>
          <input type="range" min="0" max="1000" value="0" aria-label="Posición en la vuelta" data-act="scrub" />
          <span class="track-readout" aria-live="off">km 0,000 · Sector 1</span>
        </div>
        <div class="track-controls sector-legend">
          ${SECTORS.map((s, i) => `<button data-sector="${i}"><i style="background:${s.c}"></i>${s.n}</button>`).join("")}
          <span class="note">Sentido: ${esc(c.dir || "—")} · Datos geográficos: bacinger/f1-circuits (MIT)</span>
        </div>
      </div>`;

    const svg = host.querySelector("svg");
    const path = svg.querySelector(".track-line");
    const total = path.getTotalLength();
    const g = svg.querySelector(".sectors");

    // Sectores (tercios de la longitud)
    SECTORS.forEach((s, i) => {
      const seg = document.createElementNS("http://www.w3.org/2000/svg", "path");
      seg.setAttribute("d", d);
      seg.setAttribute("class", "track-sector");
      seg.setAttribute("stroke", s.c);
      seg.setAttribute("stroke-dasharray", `0 ${total * i / 3} ${total / 3} ${total}`);
      seg.dataset.sector = i;
      seg.innerHTML = `<title>${s.n}</title>`;
      g.appendChild(seg);
    });

    // Línea de meta y flecha de sentido
    const p0 = path.getPointAtLength(0), p1 = path.getPointAtLength(8);
    const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    const nx = -Math.sin(ang) * 16, ny = Math.cos(ang) * 16;
    const sf = svg.querySelector(".sf-line");
    sf.setAttribute("x1", p0.x + nx); sf.setAttribute("y1", p0.y + ny); sf.setAttribute("x2", p0.x - nx); sf.setAttribute("y2", p0.y - ny);
    const pa = path.getPointAtLength(Math.min(60, total * .04)), pb = path.getPointAtLength(Math.min(70, total * .05));
    const a2 = Math.atan2(pb.y - pa.y, pb.x - pa.x);
    const tri = [[14, 0], [-8, -8], [-8, 8]].map(([x, y]) => [pa.x + x * Math.cos(a2) - y * Math.sin(a2), pa.y + x * Math.sin(a2) + y * Math.cos(a2)]);
    svg.querySelector(".dir-arrow").setAttribute("d", "M" + tri.map((t) => t.join(",")).join("L") + "Z");

    const dot = svg.querySelector(".car-dot");
    const scrub = host.querySelector("[data-act=scrub]");
    const read = host.querySelector(".track-readout");
    const btn = host.querySelector("[data-act=play]");
    const speedSel = host.querySelector("[data-act=speed]");
    let t = 0, playing = false, raf = 0, last = 0;

    const place = (frac) => {
      const p = path.getPointAtLength(frac * total);
      dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y);
      const km = (frac * c.length).toLocaleString("es", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
      const sec = Math.min(2, Math.floor(frac * 3));
      read.textContent = `km ${km} / ${c.length.toLocaleString("es", { minimumFractionDigits: 3 })} · ${SECTORS[sec].n}`;
      scrub.value = Math.round(frac * 1000);
      g.querySelectorAll(".track-sector").forEach((s) => s.classList.toggle("on", playing && +s.dataset.sector === sec));
    };
    const loop = (now) => {
      if (!playing) return;
      const dt = last ? (now - last) / 1000 : 0; last = now;
      t = (t + dt / +speedSel.value) % 1;
      place(t);
      if (!host.isConnected) { playing = false; return; }
      raf = requestAnimationFrame(loop);
    };
    const setPlay = (on) => {
      playing = on; last = 0;
      btn.textContent = on ? "❚❚ Pausa" : "▶ Vuelta";
      btn.setAttribute("aria-label", on ? "Pausar" : "Reproducir vuelta");
      cancelAnimationFrame(raf);
      if (on) raf = requestAnimationFrame(loop); else place(t);
    };
    btn.addEventListener("click", () => setPlay(!playing));
    scrub.addEventListener("input", () => { setPlay(false); t = scrub.value / 1000; place(t); });
    host.querySelectorAll("[data-sector]").forEach((b) => {
      const segs = () => g.querySelectorAll(".track-sector");
      b.addEventListener("mouseenter", () => segs().forEach((s) => s.classList.toggle("on", s.dataset.sector === b.dataset.sector)));
      b.addEventListener("mouseleave", () => segs().forEach((s) => s.classList.remove("on")));
      b.addEventListener("click", () => { setPlay(false); t = (+b.dataset.sector) / 3 + .001; place(t); segs().forEach((s) => s.classList.toggle("on", s.dataset.sector === b.dataset.sector)); });
    });
    place(0);
  }

  F1.track = { render, loadGeo };
})();
