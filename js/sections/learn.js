/* =========================================================
   Contenido educativo: F1 Technology, Reglamento y Glosario.
   ========================================================= */
F1.sections.learn = (function () {
  const { $, $$, esc, norm, debounce } = F1.u;

  /* ---------- Diagrama del monoplaza (SVG propio) ---------- */
  const CAR_SVG = `
    <svg viewBox="0 0 1000 360" role="img" aria-label="Diagrama lateral de un monoplaza de F1 con puntos interactivos">
      <defs>
        <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a3a"/><stop offset="1" stop-color="#161616"/></linearGradient>
        <linearGradient id="redG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff3b2f"/><stop offset="1" stop-color="#a30400"/></linearGradient>
      </defs>
      <rect x="0" y="318" width="1000" height="3" fill="#444"/>
      <!-- Fondo plano y difusor -->
      <path d="M150 300 L900 300 L960 286 L960 296 L905 310 L150 310 Z" fill="#111" stroke="#444"/>
      <!-- Alerón delantero -->
      <path d="M22 286 L160 280 L168 296 L22 300 Z" class="accent"/>
      <path d="M30 272 L120 268 L124 278 L30 282 Z" fill="#222" stroke="#555"/>
      <!-- Morro y chasis -->
      <path d="M60 268 C 140 250, 260 232, 360 214 L 400 176 L 470 170 L 520 196 L 560 150 C 620 130, 720 128, 790 150 L 860 196 L 880 262 L 860 300 L 170 300 L 120 286 Z" fill="url(#bodyG)" stroke="#555" stroke-width="1.5"/>
      <!-- Pontón -->
      <path d="M470 236 C 520 214, 650 210, 760 226 L 820 262 L 820 296 L 470 296 Z" fill="#202020" stroke="#4a4a4a"/>
      <path d="M480 240 L 600 226" stroke="url(#redG)" stroke-width="8" stroke-linecap="round"/>
      <!-- Entrada de aire / airbox -->
      <path d="M500 160 L 548 150 L 556 178 L 506 184 Z" fill="#0d0d0d" stroke="#555"/>
      <!-- Halo -->
      <path d="M392 178 C 420 120, 470 112, 520 150" class="halo"/>
      <line x1="470" y1="116" x2="472" y2="170" stroke="#9a9a9a" stroke-width="5" stroke-linecap="round"/>
      <!-- Casco -->
      <ellipse cx="452" cy="168" rx="26" ry="20" fill="#ffd84d" stroke="#222"/>
      <rect x="436" y="160" width="30" height="8" rx="3" fill="#111"/>
      <!-- Alerón trasero -->
      <path d="M868 70 L 962 62 L 966 92 L 872 100 Z" class="accent"/>
      <path d="M874 108 L 962 102 L 964 122 L 876 128 Z" fill="#222" stroke="#555"/>
      <line x1="930" y1="122" x2="900" y2="250" stroke="#333" stroke-width="10"/>
      <!-- Ruedas -->
      <circle cx="190" cy="262" r="56" class="tyre"/><circle cx="190" cy="262" r="30" fill="#222" stroke="#666"/><circle cx="190" cy="262" r="8" fill="#888"/>
      <circle cx="820" cy="258" r="62" class="tyre"/><circle cx="820" cy="258" r="34" fill="#222" stroke="#666"/><circle cx="820" cy="258" r="9" fill="#888"/>
      <!-- Suspensión -->
      <path d="M190 262 L 300 226 M190 262 L 300 252" stroke="#777" stroke-width="4"/>
      <path d="M820 258 L 740 224 M820 258 L 744 254" stroke="#777" stroke-width="4"/>
      <!-- Número -->
      <text x="640" y="200" font-family="Barlow Condensed, sans-serif" font-style="italic" font-weight="900" font-size="54" fill="#f4f1ea" opacity=".9">26</text>
      <g class="hotspots"></g>
    </svg>`;

  const t = F1.t;
  function tech() {
    const host = $("#tech");
    host.innerHTML = `
      <div class="tech-layout">
        <div class="car-diagram reveal">${CAR_SVG}</div>
        <aside class="tech-panel" aria-live="polite" id="techPanel"></aside>
      </div>
      <div class="tech-topics" id="techTopics">${F1.data.tech.map((t) => `<button class="topic" data-k="${t.key}"><span class="ico" aria-hidden="true">${t.ico}</span><h4>${esc(t.title)}</h4><p>${esc(t.short)}</p></button>`).join("")}</div>
      <h3 style="margin-top:44px;font-size:2rem;text-transform:uppercase">${t("Evolución tecnológica 1950 → hoy")}</h3>
      <div class="tech-photos" id="techPhotos"></div>
      <div class="evo">${F1.data.techEvolution.map((s) => `<div class="evo-step"><b>${esc(s.y)}</b><h4>${esc(s.t)}</h4><p>${esc(s.d)}</p></div>`).join("")}</div>`;
    const g = host.querySelector(".hotspots");
    F1.data.tech.forEach((x) => {
      g.insertAdjacentHTML("beforeend", `<g class="hotspot" data-k="${x.key}" tabindex="0" role="button" aria-label="${esc(x.title)}"><circle class="ring-o" cx="${x.x}" cy="${x.y}" r="14"/><circle class="core" cx="${x.x}" cy="${x.y}" r="5"/><title>${esc(x.title)}</title></g>`);
    });
    techPhotos();
    const pick = (k) => {
      const x = F1.data.tech.find((y) => y.key === k);
      $("#techPanel").innerHTML = `<span class="tele-label red">${x.ico} ${F1.t("Sistema")}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p><p class="fact"><b>${F1.t("Dato")}:</b> ${esc(x.fact)}</p>`;
      $$(".hotspot", host).forEach((h) => h.classList.toggle("on", h.dataset.k === k));
      $$(".topic", host).forEach((h) => h.classList.toggle("on", h.dataset.k === k));
    };
    host.addEventListener("click", (e) => { const h = e.target.closest("[data-k]"); if (h) pick(h.dataset.k); });
    host.addEventListener("mouseover", (e) => { const h = e.target.closest(".hotspot"); if (h) pick(h.dataset.k); });
    host.addEventListener("keydown", (e) => { const h = e.target.closest(".hotspot"); if (h && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pick(h.dataset.k); } });
    pick("aero");
  }

  function rules() {
    const R = F1.data.rules;
    $("#rules").innerHTML = `
      <p class="section-sub" style="margin:-20px 0 26px">${t("Reglas de la temporada {s}. Explicado para quien empieza a seguir la Fórmula 1.", { s: R.season })}</p>
      <div class="weekend">${R.weekend.map((w) => `<div class="wk reveal"><b>${esc(w.day.toUpperCase())}</b><h4>${esc(w.t)}</h4><p>${esc(w.d)}</p></div>`).join("")}</div>
      <div class="rule-card" style="margin-top:16px"><h4>⚡ ${t("Fin de semana sprint")}</h4><p>${esc(R.sprint)}</p></div>
      <div class="rules-grid">
        <div class="rule-card" style="grid-column:1/-1"><h4>🏆 ${t("Sistema de puntuación")}</h4>
          <p>${t("Carrera principal (10 primeros):")}</p>
          <div class="points-table">${R.points.map((p, i) => `<div><b>${p}</b><span>P${i + 1}</span></div>`).join("")}</div>
          <p style="margin-top:12px">${t("Carrera sprint (8 primeros):")}</p>
          <div class="points-table">${R.sprintPoints.map((p, i) => `<div><b>${p}</b><span>P${i + 1}</span></div>`).join("")}</div>
          <p class="note">${t("Desde 2025 la vuelta rápida no otorga punto extra.")}</p></div>
      </div>
      <h3 style="margin-top:36px;font-size:1.8rem;text-transform:uppercase">${t("Banderas")}</h3>
      <div class="flags">${R.flags.map((f) => `<div class="flag-card"><span class="flag-swatch" style="background:${f.color}"></span><div><b>${esc(f.name)}</b><small>${esc(f.d)}</small></div></div>`).join("")}</div>
      <div class="rules-grid">${R.cards.map((c) => `<div class="rule-card reveal"><h4><span aria-hidden="true">${c.ico}</span>${esc(c.t)}</h4><ul>${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
      <div class="rule-card" style="margin-top:16px"><h4>🛞 ${t("Neumáticos Pirelli")}</h4>
        <div class="tyres">${R.tyres.map((t) => `<span class="tyre-chip"><i style="--tc:${t.c}"></i>${esc(t.n)}</span>`).join("")}</div>
        <p class="note">${t("Pirelli elige tres compuestos de seco de su gama para cada GP y los identifica siempre como blando, medio y duro.")}</p></div>`;
  }

  function glossary() {
    const items = F1.data.glossary.slice().sort((a, b) => a[0].localeCompare(b[0], F1.i18n.locale));
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const has = new Set(items.map((i) => norm(i[0])[0].toUpperCase()));
    $("#glossary").innerHTML = `
      <div class="toolbar">${F1.ui.searchField("glSearch", "Buscar término…")}<span class="count-label" id="glCount"></span></div>
      <div class="az" role="group" aria-label="${t("Filtrar por letra")}"><button data-l="" class="on">∗</button>${letters.map((l) => `<button data-l="${l}" ${has.has(l) ? "" : "disabled"}>${l}</button>`).join("")}</div>
      <dl class="gloss" id="glList"></dl>`;
    let q = new URLSearchParams(location.search).get("q") || "", letter = "";
    if (q) $("#glSearch").value = q;
    const render = () => {
      const list = items.filter(([k, d]) => (!letter || norm(k)[0].toUpperCase() === letter) && (!q || norm(k + " " + d).includes(norm(q))));
      $("#glList").innerHTML = list.map(([k, d]) => `<div class="term"><dt>${esc(k)}</dt><dd>${esc(d)}</dd></div>`).join("") || `<p class="empty">${t("Sin resultados.")}</p>`;
      $("#glCount").textContent = t("{n} términos", { n: list.length });
    };
    $("#glSearch").addEventListener("input", debounce((e) => { q = e.target.value; render(); }, 150));
    $(".az").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || b.disabled) return;
      letter = b.dataset.l; $$(".az button").forEach((x) => x.classList.toggle("on", x === b)); render();
    });
    render();
  }

  /* Fotografías reales de la tecnología: monoplazas que marcaron cada salto técnico */
  function techPhotos() {
    const host = $("#techPhotos");
    if (!host) return;
    const picks = [["lotus_25", "Monocasco"], ["lotus_49", "Motor portante"], ["lotus_79", "Efecto suelo"], ["mclaren_mp4_4", "Turbo y fibra de carbono"], ["williams_fw14b", "Suspensión activa"], ["mercedes_w11", "Era híbrida"]];
    host.innerHTML = picks.map(([k, l]) => { const c = F1.car.get(k); return c ? `<a class="tech-photo" href="${F1.ui.href.car(k)}" data-car="${k}"><span><b>${esc(t(l))}</b><small>${esc(c.name)} · ${esc(c.seasons)}</small></span></a>` : ""; }).join("");
    host.querySelectorAll("[data-car]").forEach((a) => a.prepend(F1.media.el(F1.car.get(a.dataset.car).img, { w: 500, alt: F1.car.get(a.dataset.car).name })));
  }

  return { tech, rules, glossary };
})();
