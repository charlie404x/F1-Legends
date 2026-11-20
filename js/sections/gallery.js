/* Galería premium con filtros por categoría y lightbox con créditos. */
F1.sections.gallery = (function () {
  const { $, esc } = F1.u;
  let current = [];

  function render(cat) {
    const host = $("#galGrid");
    current = F1.data.gallery.filter((g) => cat === "all" || g.cat.includes(cat));
    host.innerHTML = "";
    current.forEach((g, i) => {
      const b = F1.u.el(`<button class="shot reveal" data-lb="${i}" aria-label="Ampliar: ${esc(g.title)}"><span class="shot-cap"><b>${esc(g.title)}</b><small>${esc(g.sub)} · ${esc(g.year)}</small></span></button>`);
      b.prepend(F1.media.el(g.img || "", { w: 500, alt: g.title, q: g.q }));
      host.appendChild(b);
    });
    F1.u.reveal(host);
  }

  /* Archivo por temporadas y temas: galerías vivas desde categorías de Commons */
  const TOPICS = () => [
    ...F1.data.decades.map((d) => ({ id: "d" + d.key, l: d.label, cats: [F1.img.decadeCats[d.key]], subject: d.label })),
    { id: "senna", l: "Ayrton Senna", cats: [F1.img.driverCats.senna], subject: "Ayrton Senna", person: true },
    { id: "schumi", l: "Michael Schumacher", cats: [F1.img.driverCats.michael_schumacher], subject: "Michael Schumacher", person: true },
    { id: "ferrari", l: "Scuderia Ferrari", cats: F1.img.teamCats.ferrari, subject: "Ferrari" },
    { id: "lotus", l: "Team Lotus", cats: F1.img.teamCats.lotus, subject: "Lotus" },
    { id: "monaco", l: "Mónaco", cats: [F1.img.circuitCats.monaco], subject: "Circuit de Monaco" },
    { id: "monza", l: "Monza", cats: [F1.img.circuitCats.monza], subject: "Monza" },
  ];
  function archive() {
    const host = $("#galArchive");
    if (!host) return;
    const topics = TOPICS();
    host.innerHTML = `<div class="toolbar"><div id="galTopics">${F1.ui.chips(topics.map((x) => ({ v: x.id, l: F1.t(x.l) })), { name: F1.t("Archivo"), value: topics[0].id, allLabel: "" })}</div></div><div id="galArchiveBody"></div>`;
    const show = (id) => { const tp = topics.find((x) => x.id === id); F1.gallery.commons($("#galArchiveBody"), { cats: tp.cats, subject: tp.subject, max: 30, person: !!tp.person, terms: tp.person ? [tp.subject.split(" ").pop()] : [] }); };
    F1.ui.bindChips($("#galTopics"), show);
    F1.u.whenVisible(host, () => show(topics[0].id));
  }

  function init() {
    const opts = Object.entries(F1.data.galleryCats).map(([v, l]) => ({ v, l }));
    $("#gallery").innerHTML = `<div class="toolbar"><div id="galChips">${F1.ui.chips(opts, { name: "Categoría", allLabel: "Todas" })}</div></div><div class="masonry" id="galGrid"></div>`;
    F1.ui.bindChips($("#galChips"), render);
    F1.lightbox.bindMedia($("#galGrid"), () => current.map((g) => ({ title: g.title, sub: `${g.sub} · ${g.year}`, wiki: g.img || "", q: g.q })));
    render("all");
    archive();
  }
  return { init };
})();
