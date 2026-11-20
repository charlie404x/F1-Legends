/* =========================================================
   Portada · "Explora F1 Legends": acceso visual a cada página
   del sitio, con una fotografía real representativa.
   ========================================================= */
F1.sections.explore = (function () {
  const { $, esc } = F1.u;
  const t = F1.t;
  const CARDS = [
    { id: "historia", title: "F1 History Archive", sub: "Siete décadas, una identidad visual por época", img: "Lotus 49" },
    { id: "campeones", title: "Campeones del mundo", sub: "Los 76 títulos de pilotos, de Farina a hoy", img: "Juan Manuel Fangio" },
    { id: "pilotos", title: "Pilotos", sub: "Leyendas y parrilla actual con galerías propias", q: "file:Alain Prost in 1985 (cropped).jpg" },
    { id: "equipos", title: "Equipos", sub: "Logotipos, historia y evolución de cada escudería", img: "Ferrari F2004" },
    { id: "campeonato", title: "Live Championship", sub: "Clasificaciones en directo con retratos y logotipos", img: "Red Bull Racing RB19" },
    { id: "monoplazas", title: "Monoplazas", sub: "El museo digital de los coches legendarios", img: "McLaren MP4/4" },
    { id: "circuitos", title: "Circuitos", sub: "Trazados interactivos y fotografías reales", q: "file:Circuit de Spa-Francorchamps, April 22, 2018 SkySat.jpg" },
    { id: "rivalidades", title: "Rivalidades", sub: "Los duelos que definieron eras", q: "file:Ayrton Senna 1988 Canada cropped.jpg" },
    { id: "jugadas", title: "Jugadas históricas", sub: "Adelantamientos, remontadas y carreras bajo la lluvia", q: "file:Fangio pit stop Nurburgring 1957.jpg" },
    { id: "galeria", title: "Galería", sub: "Archivo fotográfico por décadas, pilotos y circuitos", img: "Lotus 79" },
    { id: "tecnologia", title: "F1 Technology", sub: "Cómo funciona un monoplaza y el reglamento 2026", img: "Mercedes-AMG F1 W11 EQ Performance" },
    { id: "quiz", title: "Quiz", sub: "Tres niveles para poner a prueba lo que sabes", img: "Tyrrell P34" },
  ];

  function init() {
    const host = $("#explore");
    host.innerHTML = `<div class="explore-grid">${CARDS.map((c, i) => `
      <a class="explore-card reveal ${i < 2 ? "wide" : ""}" href="${F1.page(c.id)}" style="transition-delay:${Math.min(i, 8) * 40}ms" data-i="${i}">
        <span class="explore-info"><b>${esc(t(c.title))}</b><small>${esc(t(c.sub))}</small><i aria-hidden="true">→</i></span>
      </a>`).join("")}</div>`;
    host.querySelectorAll(".explore-card").forEach((a) => {
      const c = CARDS[+a.dataset.i];
      a.prepend(F1.media.el(c.img || "", { w: 960, alt: "", q: c.q }));
    });
    F1.u.reveal(host);
  }
  return { init };
})();
