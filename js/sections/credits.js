/* =========================================================
   Créditos y licencias: se genera a partir del registro
   central de imágenes (js/data/images.js), así nunca queda
   desactualizado.
   ========================================================= */
F1.sections.credits = (function () {
  const { $, esc } = F1.u;
  const t = F1.t;
  const cm = (f) => "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(f.replace(/ /g, "_"));

  function init() {
    const host = $("#credits");
    const teamName = (k) => F1.team.get(k)?.name || ({ minardi: "Minardi", sauber: "Sauber" })[k] || k;
    const logos = Object.entries(F1.img.logos).flatMap(([k, list]) => list.map((L) => ({ k, L })));
    const ports = Object.entries(F1.img.portraits);
    host.innerHTML = `
      <div class="rule-card" style="margin-bottom:22px"><h4>™ ${t("Logotipos y marcas")}</h4>
        <p>${t("Los logotipos de las escuderías son marcas registradas de sus propietarios. F1 Legends es un proyecto de fans sin ánimo de lucro y los muestra únicamente para identificar a cada equipo (uso nominativo e informativo), sin modificarlos más allá de recortar el margen y sin sugerir patrocinio ni afiliación. Los logotipos marcados como «Public domain» en Commons lo son por ser diseños simples de texto; aun así siguen siendo marcas.")}</p>
        <p class="note">${t("Si eres titular de alguna marca y quieres que se retire, basta con borrar el archivo de assets/logos: la web mostrará en su lugar un monograma con los colores del equipo.")}</p></div>
      <h3 class="cred-h">${t("Logotipos")} (${logos.length})</h3>
      <div class="table-wrap"><table class="timing cred-table"><thead><tr><th></th><th>${t("Escudería")}</th><th>${t("Temporadas")}</th><th>${t("Archivo original")}</th><th>${t("Licencia")}</th></tr></thead><tbody>
        ${logos.map(({ k, L }) => `<tr><td><span class="team-logo" style="--lh:34px"><img src="${esc(L.src)}" alt="" loading="lazy"/></span></td><td>${esc(teamName(k))}</td><td>${esc(L.season || "")}${L.from || L.to ? ` <span class="muted small">(${L.from || "…"}–${L.to || t("hoy")})</span>` : ""}</td><td><a class="link" href="${esc(L.page)}" target="_blank" rel="noopener">${esc(L.file)}</a><br/><span class="muted small">${esc(L.source)}</span></td><td>${esc(L.license)}</td></tr>`).join("")}
      </tbody></table></div>
      <h3 class="cred-h">${t("Retratos de pilotos")} (${ports.length})</h3>
      <p class="note">${t("Recortes en formato 4:5 de fotografías de Wikimedia Commons. Los recortes de fotos CC BY-SA se publican con la misma licencia.")}</p>
      <div class="table-wrap"><table class="timing cred-table"><thead><tr><th></th><th>${t("Piloto")}</th><th>${t("Contexto")}</th><th>${t("Autor")}</th><th>${t("Licencia")}</th></tr></thead><tbody>
        ${ports.map(([id, r]) => `<tr><td><img class="cred-thumb" src="${esc(r.src)}" alt="" loading="lazy"/></td><td><a class="link" href="${F1.ui.href.driver(id)}">${esc(F1.drv.name(id))}</a></td><td>${esc(r.desc)}${r.kind === "car" ? ` <span class="tag neutral">${t("con su monoplaza")}</span>` : ""}<br/><a class="small muted" href="${cm(r.file)}" target="_blank" rel="noopener">${esc(r.file)}</a></td><td>${esc(r.author)}</td><td>${esc(r.license)}</td></tr>`).join("")}
      </tbody></table></div>
      <h3 class="cred-h">${t("Resto de fotografías")}</h3>
      <div class="rules-grid">
        <div class="rule-card"><h4>📷 Wikimedia Commons / Wikipedia</h4><p>${t("Las fotos de portada, tarjetas, galerías y fichas se cargan directamente desde Wikimedia Commons. Al ampliar cualquier foto se muestran su autor, licencia y fecha, con enlace a la página original.")}</p></div>
        <div class="rule-card"><h4>📰 ${t("Noticias")}</h4><p>${t("Titulares e imágenes de las noticias pertenecen a cada medio (Motorsport.com, Autosport, BBC Sport, Formula1.com…). Se enlaza siempre al artículo original.")}</p></div>
        <div class="rule-card"><h4>▶ ${t("Videos")}</h4><p>${t("Los videos se reproducen con el reproductor oficial de YouTube y pertenecen a sus canales.")}</p></div>
        <div class="rule-card"><h4>🗺 ${t("Datos")}</h4><p>Jolpica-F1 API · bacinger/f1-circuits (MIT) · Wikipedia (CC BY-SA)</p></div>
      </div>`;
  }
  return { init };
})();
