/* =========================================================
   Rivalidades legendarias. Las tablas comparativas (carrera y
   temporadas compartidas) se calculan con la API al abrir cada
   rivalidad; aquí solo va el contenido editorial.
   ========================================================= */
F1.data.rivalries = [
  { id: "senna-prost", a: "senna", b: "prost", title: "Senna vs Prost", tagline: "La rivalidad más grande de la historia", seasons: [1988, 1989, 1990, 1991, 1993],
    video: ["yg_hXycTKAs", "jKe_-Y5v33s"],
    story: [
      "En 1988 McLaren unió a los dos mejores pilotos del mundo en el mejor coche, el MP4/4. Ganaron 15 de 16 carreras y Senna se llevó el título. La convivencia se rompió en 1989: acusaciones de favoritismo, pactos incumplidos en Imola y una tensión que culminó en Suzuka.",
      "En Suzuka 1989 Prost cerró la puerta en la chicane y ambos chocaron; Senna volvió a pista, ganó y fue descalificado, dando el título a Prost. Un año después, en el mismo lugar, Senna embistió a Prost (ya en Ferrari) en la primera curva y se aseguró el campeonato. La reconciliación llegó en el podio de Adelaida 1993, en la última carrera de Prost.",
    ],
    decisive: [
      { year: 1988, gp: [1988, "suzuka"], text: "Suzuka 1988: Senna se cala en la salida, remonta y gana su primer título." },
      { year: 1989, gp: [1989, "suzuka"], text: "Suzuka 1989: choque en la chicane, descalificación de Senna, título para Prost." },
      { year: 1990, gp: [1990, "suzuka"], text: "Suzuka 1990: choque en la curva 1, título para Senna." },
      { year: 1993, gp: [1993, "adelaide"], text: "Adelaida 1993: última carrera de Prost y abrazo en el podio." },
    ] },
  { id: "hunt-lauda", a: "hunt", b: "lauda", title: "Hunt vs Lauda", tagline: "Dos personalidades opuestas, un título por un punto", seasons: [1976, 1977],
    video: ["MIMyRUts1_s", "bO5bstRUTnw"],
    story: [
      "Lauda, metódico y calculador, dominaba 1976 con Ferrari. Hunt, carismático e impulsivo, pilotaba el McLaren M23. En agosto, Lauda sufrió un gravísimo accidente con incendio en Nürburgring y recibió la extremaunción.",
      "Solo 42 días después volvió a correr en Monza. El título se decidió en Fuji bajo un diluvio: Lauda se retiró voluntariamente por considerar las condiciones demasiado peligrosas y Hunt, tercero, fue campeón por un punto. Fuera de la pista eran amigos.",
    ],
    decisive: [
      { year: 1976, gp: [1976, "nurburgring"], text: "Nürburgring 1976: accidente de Lauda." },
      { year: 1976, gp: [1976, "monza"], text: "Monza 1976: regreso de Lauda, cuarto." },
      { year: 1976, gp: [1976, "fuji"], text: "Fuji 1976: Lauda se retira, Hunt campeón por un punto." },
    ] },
  { id: "schumacher-hakkinen", a: "michael_schumacher", b: "hakkinen", title: "Schumacher vs Häkkinen", tagline: "Respeto absoluto entre dos rivales", seasons: [1998, 1999, 2000, 2001],
    video: ["Pd0LMH6yijA", "hyW1aT2utc0"],
    story: [
      "Ferrari contra McLaren en la era de los V10. Häkkinen ganó los títulos de 1998 y 1999 (este último con Schumacher lesionado media temporada) y Schumacher el de 2000, el primero de Ferrari desde 1979.",
      "Schumacher ha dicho en varias ocasiones que el finlandés fue el rival al que más respetó. Su gran momento: el adelantamiento de Häkkinen en Spa 2000.",
    ],
    decisive: [
      { year: 1998, gp: [1998, "suzuka"], text: "Suzuka 1998: Schumacher se cala en la parrilla y Häkkinen es campeón." },
      { year: 2000, gp: [2000, "spa"], text: "Spa 2000: el adelantamiento con Zonta." },
      { year: 2000, gp: [2000, "suzuka"], text: "Suzuka 2000: Schumacher gana y es campeón con Ferrari." },
    ] },
  { id: "alonso-hamilton", a: "alonso", b: "hamilton", title: "Alonso vs Hamilton", tagline: "El bicampeón contra el debutante", seasons: [2007],
    video: ["S4lAn6iMpug"],
    story: [
      "En 2007 McLaren unió al bicampeón Fernando Alonso con un debutante, Lewis Hamilton, que sorprendió a todos peleando por el título desde la primera carrera. La tensión interna explotó en la clasificación de Hungría, cuando Alonso retuvo a Hamilton en boxes.",
      "Ambos terminaron empatados a puntos (109), uno por detrás de Kimi Räikkönen, que ganó el título en la última carrera. Alonso volvió a Renault al año siguiente.",
    ],
    decisive: [
      { year: 2007, gp: [2007, "hungaroring"], text: "Hungría 2007: el incidente en el pit lane durante la clasificación." },
      { year: 2007, gp: [2007, "interlagos"], text: "Brasil 2007: Räikkönen gana el título por un punto sobre ambos." },
    ] },
  { id: "hamilton-rosberg", a: "hamilton", b: "rosberg", title: "Hamilton vs Rosberg", tagline: "Amigos de la infancia, rivales en Mercedes", seasons: [2013, 2014, 2015, 2016],
    video: ["gCzkaX2DL7w"],
    story: [
      "Se conocían desde el karting. En Mercedes, con el mejor coche de la era híbrida, su amistad se convirtió en una guerra psicológica: incidentes en Mónaco 2014, el toque en Spa 2014 y el doble abandono en Barcelona 2016.",
      "Hamilton ganó los títulos de 2014 y 2015. En 2016 Rosberg se impuso por cinco puntos y anunció su retirada solo cinco días después.",
    ],
    decisive: [
      { year: 2014, gp: [2014, "spa"], text: "Spa 2014: contacto en la segunda vuelta." },
      { year: 2016, gp: [2016, "catalunya"], text: "Barcelona 2016: ambos fuera en la primera vuelta." },
      { year: 2016, gp: [2016, "yas_marina"], text: "Abu Dabi 2016: Rosberg segundo, campeón por cinco puntos." },
    ] },
  { id: "hamilton-verstappen", a: "hamilton", b: "max_verstappen", title: "Hamilton vs Verstappen", tagline: "La temporada 2021", seasons: [2021],
    video: ["Qs6yn3S3ZRg"],
    story: [
      "El heptacampeón contra la nueva generación. Durante todo 2021 se repartieron victorias e incidentes: Silverstone (choque en Copse), Monza (el Red Bull sobre el Mercedes, con el Halo protegiendo a Hamilton) y Yeda.",
      "Llegaron empatados a puntos a Abu Dabi. La gestión del coche de seguridad final dejó una única vuelta y Verstappen ganó su primer título. La FIA reformó después la dirección de carrera.",
    ],
    decisive: [
      { year: 2021, gp: [2021, "silverstone"], text: "Silverstone 2021: contacto en Copse." },
      { year: 2021, gp: [2021, "monza"], text: "Monza 2021: ambos fuera; el Halo protege a Hamilton." },
      { year: 2021, gp: [2021, "yas_marina"], text: "Abu Dabi 2021: la última vuelta." },
    ] },
];
