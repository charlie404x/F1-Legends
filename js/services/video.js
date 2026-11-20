/* =========================================================
   Reproductor de video integrado (YouTube IFrame Player API).
   - Fachada ligera con miniatura: el iframe solo se crea al pulsar
     (carga diferida, mejor rendimiento).
   - Si un video no permite inserción (errores 101/150/153) o no
     existe (100), prueba el siguiente ID alternativo.
   - Si ninguno funciona, muestra un aviso honesto con un enlace
     externo claramente identificado. Nunca simula reproducción.
   ========================================================= */
(function () {
  const { esc } = F1.u;
  let apiPromise = null;
  const isFile = location.protocol === "file:";

  function loadAPI() {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev && prev(); resolve(window.YT); };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.onerror = () => { apiPromise = null; reject(new Error("No se pudo cargar YouTube")); };
      document.head.appendChild(s);
      setTimeout(() => reject(new Error("Tiempo de espera agotado")), 15000);
    });
    return apiPromise;
  }

  const ERR = {
    2: "Parámetros de video no válidos.",
    5: "El navegador no pudo reproducir este video.",
    100: "El video ya no está disponible o es privado.",
    101: "El propietario no permite reproducirlo fuera de YouTube.",
    150: "El propietario no permite reproducirlo fuera de YouTube.",
    153: "YouTube rechazó la reproducción insertada (falta el origen de la página).",
  };

  /**
   * Monta un reproductor en `host`.
   * @param {HTMLElement} host
   * @param {{ids: string[], title: string, sub?: string}} v
   */
  function mount(host, v) {
    const ids = (v.ids || []).filter(Boolean);
    host.classList.add("player");
    if (!ids.length) {
      host.innerHTML = `<div class="player-fallback"><p>No hay un video verificado para este momento.</p></div>`;
      return;
    }
    const thumb = `https://i.ytimg.com/vi/${ids[0]}/hqdefault.jpg`;
    host.innerHTML = `
      <button class="player-facade" aria-label="Reproducir video: ${esc(v.title)}">
        <img src="${thumb}" alt="" loading="lazy" decoding="async" />
        <span class="play-btn" aria-hidden="true"></span>
        <span class="player-meta"><strong>${esc(v.title)}</strong><small>${esc(v.sub || "Video · YouTube")}</small></span>
      </button>`;
    host.querySelector(".player-facade").addEventListener("click", () => play(host, ids, 0, v), { once: true });
  }

  function fallback(host, ids, v, code) {
    const reason = ERR[code] || "No se pudo cargar el reproductor.";
    const extra = isFile ? " Abre la web mediante un servidor local (ver README) para que YouTube permita la inserción." : "";
    host.innerHTML = `
      <div class="player-fallback">
        <span class="tag">Reproducción insertada no disponible</span>
        <p>${esc(reason + extra)}</p>
        <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/watch?v=${encodeURIComponent(ids[0])}" target="_blank" rel="noopener">Ver en YouTube (sitio externo) ↗</a>
      </div>`;
  }

  async function play(host, ids, i, v) {
    if (i >= ids.length) return fallback(host, ids, v, host._lastErr);
    host.innerHTML = `<div class="yt-host"></div>`;
    let YT;
    try { YT = await loadAPI(); } catch { return fallback(host, ids, v, 5); }
    let ready = false;
    const timer = setTimeout(() => { if (!ready) { host._lastErr = 5; play(host, ids, i + 1, v); } }, 14000);
    // eslint-disable-next-line no-new
    new YT.Player(host.querySelector(".yt-host"), {
      host: "https://www.youtube-nocookie.com",
      videoId: ids[i],
      playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1, origin: isFile ? undefined : location.origin },
      events: {
        onReady: (e) => { ready = true; clearTimeout(timer); try { e.target.playVideo(); } catch {} },
        onError: (e) => { ready = true; clearTimeout(timer); host._lastErr = e.data; play(host, ids, i + 1, v); },
      },
    });
  }

  /** Crea un nodo reproductor listo para insertar. */
  function node(v, cls = "") {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    mount(d, v);
    return d;
  }

  F1.video = { mount, node, isFile };
})();
