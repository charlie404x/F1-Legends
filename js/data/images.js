/* =========================================================
   REGISTRO CENTRAL DE IMÁGENES
   Un único lugar para todas las imágenes fijas de la web:
   logotipos, retratos verificados y categorías de Wikimedia
   Commons que alimentan las galerías.

   Campos de cada recurso (cuando corresponden):
     id · name · cat (categoría) · src/file (archivo) · source (fuente)
     author · license · alt · season (temporada) · desc (descripción)

   - Logotipos: copia local en assets/logos (WebP, fondo transparente
     recortado). Son marcas registradas de sus propietarios y se
     muestran solo para identificar a cada escudería (uso
     informativo, sin ánimo de lucro). Los equipos históricos usan
     el logotipo de su época cuando existe; si no hay ninguno
     adecuado para un año concreto se muestra el monograma.
   - Retratos: archivos concretos de Wikimedia Commons revisados uno
     a uno (persona, uniforme y temporada), recortados a 4:5 y guardados
     en assets/retratos (WebP). Si el archivo local fallara, se carga el
     original de Commons. Los recortes de fotos CC BY-SA se distribuyen
     con la misma licencia. "kind: car" indica que no
     hay retrato libre con el uniforme actual y se usa una foto real
     del piloto con su monoplaza de la temporada.
   - Galerías: categorías de Commons (curadas por la comunidad de
     Wikimedia), lo que garantiza que las fotos corresponden a la
     persona, el coche o el circuito indicado.
   ========================================================= */
(function () {
  const WP = "https://en.wikipedia.org/wiki/File:";
  const CM = "https://commons.wikimedia.org/wiki/File:";
  const TM = "Marca registrada · uso informativo";

  /* ---------- Logotipos ---------- */
  // from/to: temporadas en las que corresponde ese logotipo. default: el que se usa sin año.
  const L = (src, file, o = {}) => ({ src: (window.F1_ROOT || "") + "assets/logos/" + src + ".webp", file, page: (o.commons ? CM : WP) + file.replace(/ /g, "_"), source: o.commons ? "Wikimedia Commons" : "Wikipedia (en)", license: o.license || TM, ...o });
  const logos = {
    ferrari: [L("ferrari", "Scuderia Ferrari HP logo 24.svg", { season: "escudo de la Scuderia", default: true })],
    mclaren: [L("mclaren", "McLarenF1Team.png", { from: 2025, season: "2025–2026", default: true })],
    mercedes: [L("mercedes", "Mercedes-AMG Petronas F1 Team logo (2026).svg", { from: 2010, season: "2026", default: true, commons: true }), L("mercedes-star", "Mercedes-Logo.svg", { to: 1955, season: "estrella de Mercedes-Benz", commons: true, license: "CC BY-SA 4.0 · marca registrada" })],
    red_bull: [L("red_bull", "Red Bull Racing Logo 2026.svg", { from: 2022, season: "2026", default: true })],
    williams: [L("williams", "Atlassian Williams F1 Team logo.svg", { from: 2025, season: "2025–2026", default: true, commons: true })],
    lotus: [L("lotus", "TeamLotus.jpg", { from: 1958, to: 1994, season: "Team Lotus (1958–1994)", default: true, commons: true, license: "CC BY-SA 4.0 · marca registrada" })],
    renault: [L("renault-2019", "Renault F1 Team logo 2019.svg", { from: 2016, to: 2020, season: "2019" }), L("renault", "Renault 2009 logo.svg", { from: 2002, to: 2011, season: "rombo de Renault (2007–2021)", default: true, commons: true })],
    benetton: [L("benetton", "Benetton Formula logo.jpg", { from: 1986, to: 2001, season: "1986–2001", default: true })],
    brabham: [L("brabham", "Brabham91.png", { from: 1962, to: 1992, season: "1991", default: true })],
    tyrrell: [L("tyrrell", "Tyrrell.svg", { from: 1968, to: 1998, season: "1970–1998", default: true, commons: true })],
    jordan: [L("jordan", "Jordan Grand Prix logo.png", { from: 1991, to: 2005, season: "1991–2005", default: true })],
    brawn: [L("brawn", "Brawn GP logo.svg", { from: 2009, to: 2009, season: "2009", default: true, commons: true })],
    cooper: [L("cooper", "Cooper car company.png", { to: 1969, season: "1947–1969", default: true, commons: true })],
    brm: [L("brm", "BritishRacingMotorsLogo.png", { to: 1977, season: "1951–1977", default: true })],
    matra: [L("matra", "Matra logo.gif", { to: 1972, season: "Matra", default: true })],
    vanwall: [L("vanwall", "Vanwall logo.jpg", { to: 1960, season: "1954–1960", default: true })],
    alfa: [L("alfa", "Logo AlfaRomeo 1946 1950 noBG.jpg", { season: "insignia 1946–1950", to: 1951, default: true, commons: true, license: "CC BY-SA 4.0 · marca registrada" })],
    maserati: [L("maserati", "Maserati logo 2.svg", { to: 1960, season: "tridente de Maserati", default: true, commons: true })],
    aston_martin: [L("aston_martin", "Aston Martin Aramco 2024 logo.png", { from: 2021, season: "2024–2026", default: true })],
    alpine: [L("alpine", "BWT Alpine F1 Team Logo.png", { from: 2021, season: "2024–2026", default: true, commons: true })],
    haas: [L("haas", "TGR Haas F1 Team Logo (2026).svg", { from: 2016, season: "2026", default: true, commons: true })],
    rb: [L("rb", "VCARB F1 logo.svg", { from: 2024, season: "2024–2026", default: true }), L("minardi", "Minardi F1 Team.svg", { to: 2005, season: "Minardi (1985–2005)", commons: true })],
    audi: [L("audi", "Audif1.com logo17 (cropped).svg", { from: 2026, season: "2026", default: true, commons: true }), L("sauber", "Sauber Motorsport SVG logo (2023).svg", { to: 2025, season: "Sauber" })],
    cadillac: [L("cadillac", "Cadillac Formula 1 Team Logo (2025).svg", { from: 2026, season: "2026", default: true })],
  };

  /* ---------- Retratos verificados de la parrilla actual ---------- */
  // pos/zoom: encuadre del rostro cuando la foto original es más amplia (p. ej. un podio con tres pilotos).
  const R = (window.F1_ROOT || "") + "assets/retratos/";
  const portraits = {
    "antonelli": { src: R + "antonelli.webp", file: "2026-08-23 Motorsport, Formel 1, Großer Preis der Niederlande 2026 STP 3010 (cropped2).jpg", season: "2026", desc: "Mercedes · GP de Países Bajos 2026", kind: "portrait", author: "Steffen Prößdorf", license: "CC BY-SA 4.0" },
    "max_verstappen": { src: R + "max_verstappen.webp", file: "Max Verstappen at the Red Bull Fan Zone – Crown Riverwalk, Melbourne (028A7657).jpg", season: "2026", desc: "Red Bull Racing · Melbourne 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "russell": { src: R + "russell.webp", file: "2026-08-22 Motorsport, Formel 1, Großer Preis der Niederlande 2026 STP 2368.jpg", season: "2026", desc: "Mercedes · GP de Países Bajos 2026", kind: "portrait", author: "Steffen Prößdorf", license: "CC BY-SA 4.0" },
    "hamilton": { src: R + "hamilton.webp", file: "2026 Chinese GP - Qualifying Top 3.jpg", season: "2026", desc: "Ferrari · GP de China 2026 (top 3 de clasificación)", kind: "portrait", author: "Liauzh", license: "CC BY-SA 4.0" },
    "leclerc": { src: R + "leclerc.webp", file: "2026-08-22 Motorsport, Formel 1, Großer Preis der Niederlande 2026 STP 2348.jpg", season: "2026", desc: "Ferrari · GP de Países Bajos 2026", kind: "portrait", author: "Steffen Prößdorf", license: "CC BY-SA 4.0" },
    "norris": { src: R + "norris.webp", file: "2026-08-22 Motorsport, Formel 1, Großer Preis der Niederlande 2026 STP 2354 (cropped).jpg", season: "2026", desc: "McLaren · GP de Países Bajos 2026", kind: "portrait", author: "Steffen Prößdorf", license: "CC BY-SA 4.0" },
    "piastri": { src: R + "piastri.webp", file: "2026 Chinese GP - Oscar Piastri (cropped) (cropped).jpg", season: "2026", desc: "McLaren · GP de China 2026", kind: "portrait", author: "Liauzh", license: "CC BY 4.0" },
    "hadjar": { src: R + "hadjar.webp", file: "Isack Hadjar at the Melbourne Walk during the 2026 Australian Grand Prix (028A8753) (cropped).jpg", season: "2026", desc: "Red Bull Racing · GP de Australia 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "lawson": { src: R + "lawson.webp", file: "Liam Lawson at the Red Bull Fan Zone – Crown Riverwalk, Melbourne (028A7795).jpg", season: "2026", desc: "Racing Bulls · Melbourne 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "gasly": { src: R + "gasly.webp", file: "Pierre Gasly 2026 Italian Grand Prix qualifying - 1.jpg", season: "2026", desc: "Alpine A526 · clasificación del GP de Italia 2026", kind: "car", author: "Eustace Bagge", license: "CC BY 4.0" },
    "arvid_lindblad": { src: R + "arvid_lindblad.webp", file: "Arvid Lindblad at the Red Bull Fan Zone – Crown Riverwalk, Melbourne (028A7869) (cropped).jpg", season: "2026", desc: "Racing Bulls · Melbourne 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "colapinto": { src: R + "colapinto.webp", file: "Franco Colapinto at the Melbourne Walk during the 2026 Australian Grand Prix (028A8698) cropped.jpg", season: "2026", desc: "Alpine · GP de Australia 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "bearman": { src: R + "bearman.webp", file: "2025 Japan GP - Haas - Oliver Bearman - Thursday (cropped).jpg", season: "2025", desc: "Haas · GP de Japón 2025", kind: "portrait", author: "Liauzh", license: "CC BY-SA 4.0" },
    "bortoleto": { src: R + "bortoleto.webp", file: "Gabriel Bortoleto at the Melbourne Walk during the 2026 Australian Grand Prix (028A8581) cropped.jpg", season: "2026", desc: "Audi · GP de Australia 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "hulkenberg": { src: R + "hulkenberg.webp", file: "2026 Chinese GP - Nico Hulkenberg.jpg", season: "2026", desc: "Audi · GP de China 2026", kind: "portrait", author: "Liauzh", license: "CC BY 4.0" },
    "ocon": { src: R + "ocon.webp", file: "FIA F1 Austria 2026 Nr. 31 Ocon (3).jpg", season: "2026", desc: "Haas VF-26 · GP de Austria 2026", kind: "car", author: "Lukas Raich", license: "CC BY-SA 4.0" },
    "alonso": { src: R + "alonso.webp", file: "2026 Chinese GP - Fernando Alonso.jpg", season: "2026", desc: "Aston Martin · GP de China 2026", kind: "portrait", author: "Liauzh", license: "CC BY-SA 4.0" },
    "sainz": { src: R + "sainz.webp", file: "Carlos Sainz Jr. at the Melbourne Walk during the 2026 Australian Grand Prix (028A7953).jpg", season: "2026", desc: "Williams · GP de Australia 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "albon": { src: R + "albon.webp", file: "Alex Albon at the Melbourne Walk during the 2026 Australian Grand Prix (028A8626) (cropped).jpg", season: "2026", desc: "Williams · GP de Australia 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "tsunoda": { src: R + "tsunoda.webp", file: "PitToPitLane SMU Yuki Tsunoda 08102026 (cropped).jpg", season: "2026", desc: "Equipo Red Bull · octubre de 2026", kind: "portrait", author: "Asalover2004", license: "CC BY-SA 4.0" },
    "stroll": { src: R + "stroll.webp", file: "2025 Japan GP - Aston Martin - Lance Stroll - Fanzone Stage (cropped).jpg", season: "2025", desc: "Aston Martin · GP de Japón 2025", kind: "portrait", author: "Liauzh", license: "CC BY-SA 4.0" },
    "bottas": { src: R + "bottas.webp", file: "Valtteri Bottas at the Melbourne Walk during the 2026 Australian Grand Prix (028A8418).jpg", season: "2026", desc: "Cadillac · GP de Australia 2026", kind: "portrait", author: "Yu Chu Chin", license: "CC BY-SA 4.0" },
    "perez": { src: R + "perez.webp", file: "2026-08-21 Motorsport, Formel 1, Großer Preis der Niederlande 2026 STP 2196.jpg", season: "2026", desc: "Cadillac MAC-26 · GP de Países Bajos 2026", kind: "car", author: "Steffen Prößdorf", license: "CC BY-SA 4.0" },
    "senna": { src: R + "senna.webp", file: "Ayrton Senna 1988 Canada cropped.jpg", season: "1988", desc: "McLaren MP4/4 · GP de Canadá 1988", kind: "car", author: "Paul Lannuier", license: "CC BY-SA 2.0" },
    "prost": { src: R + "prost.webp", file: "Alain Prost in 1985 (cropped).jpg", season: "1985", desc: "McLaren · podio de Zandvoort 1985", kind: "portrait", author: "Fotopersbureau de Boer", license: "CC0" },
  };

  /* ---------- Categorías de Wikimedia Commons para las galerías ---------- */
  const driverCats = {
    "farina": "Giuseppe Farina",
    "fangio": "Juan Manuel Fangio",
    "ascari": "Alberto Ascari",
    "hawthorn": "Mike Hawthorn",
    "moss": "Stirling Moss",
    "jack_brabham": "Jack Brabham",
    "phil_hill": "Phil Hill",
    "hill": "Graham Hill",
    "clark": "Jim Clark",
    "surtees": "John Surtees",
    "hulme": "Denny Hulme",
    "stewart": "Jackie Stewart",
    "rindt": "Jochen Rindt",
    "emerson_fittipaldi": "Emerson Fittipaldi",
    "lauda": "Niki Lauda",
    "hunt": "James Hunt",
    "mario_andretti": "Mario Andretti",
    "scheckter": "Jody Scheckter",
    "jones": "Alan Jones (racecar driver)",
    "gilles_villeneuve": "Gilles Villeneuve",
    "piquet": "Nelson Piquet",
    "keke_rosberg": "Keke Rosberg",
    "prost": "Alain Prost",
    "senna": "Ayrton Senna",
    "mansell": "Nigel Mansell",
    "michael_schumacher": "Michael Schumacher",
    "hakkinen": "Mika Häkkinen",
    "damon_hill": "Damon Hill",
    "villeneuve": "Jacques Villeneuve",
    "alonso": "Fernando Alonso",
    "raikkonen": "Kimi Räikkönen",
    "hamilton": "Lewis Hamilton",
    "button": "Jenson Button",
    "vettel": "Sebastian Vettel",
    "rosberg": "Nico Rosberg",
    "max_verstappen": "Max Verstappen (racing driver)",
    "norris": "Lando Norris",
    "peterson": "Ronnie Peterson",
    "ickx": "Jacky Ickx",
    "regazzoni": "Clay Regazzoni",
    "reutemann": "Carlos Reutemann",
    "berger": "Gerhard Berger",
    "coulthard": "David Coulthard",
    "barrichello": "Rubens Barrichello",
    "montoya": "Juan Pablo Montoya",
    "webber": "Mark Webber",
    "massa": "Felipe Massa",
    "ricciardo": "Daniel Ricciardo",
    "antonelli": "Andrea Kimi Antonelli",
    "russell": "George Russell",
    "leclerc": "Charles Leclerc",
    "piastri": "Oscar Piastri",
    "hadjar": "Isack Hadjar",
    "lawson": "Liam Lawson",
    "gasly": "Pierre Gasly",
    "arvid_lindblad": "Arvid Lindblad",
    "colapinto": "Franco Colapinto",
    "bearman": "Oliver Bearman",
    "bortoleto": "Gabriel Bortoleto",
    "hulkenberg": "Nico Hülkenberg",
    "ocon": "Esteban Ocon",
    "sainz": "Carlos Sainz, Jr.",
    "albon": "Alexander Albon",
    "tsunoda": "Yuki Tsunoda",
    "stroll": "Lance Stroll",
    "bottas": "Valtteri Bottas",
    "perez": "Sergio Pérez"
  };
  const teamCats = {
    ferrari: ["Scuderia Ferrari"], mclaren: ["McLaren (racing team)", "McLaren MP4/4", "McLaren MCL39"],
    mercedes: ["Mercedes-Benz W196", "Mercedes-AMG F1 W11 EQ Performance", "Mercedes-AMG F1 W17 E Performance", "Mercedes AMG F1 W09 EQ Power+"],
    red_bull: ["Red Bull Racing"], williams: ["Williams Racing", "Williams FW14"], lotus: ["Team Lotus", "Lotus 25", "Lotus 72"],
    renault: ["Renault F1", "Renault R25"], benetton: ["Benetton Formula"], brabham: ["Brabham Racing Organisation"], tyrrell: ["Tyrrell Racing", "Tyrrell P34"],
    jordan: ["Jordan Grand Prix"], brawn: ["Brawn GP", "Brawn BGP 001"], cooper: ["Cooper Car Company"], brm: ["British Racing Motors"], matra: ["Matra"],
    vanwall: ["Vanwall"], alfa: ["Alfa Romeo in Formula One"], maserati: ["Maserati 250F", "Maserati racing cars"], aston_martin: ["Aston Martin F1"],
    alpine: ["Alpine F1 Team"], haas: ["Haas F1 Team"], rb: ["Racing Bulls"], audi: ["Audi F1 Team"], cadillac: ["Cadillac Formula 1 Team"],
  };
  const carCats = {
    "ferrari_500": "Ferrari 500 F2",
    "mercedes_w196": "Mercedes-Benz W196",
    "maserati_250f": "Maserati 250F",
    "lotus_25": "Lotus 25",
    "lotus_49": "Lotus 49",
    "lotus_72": "Lotus 72",
    "ferrari_312t": "Ferrari 312 T",
    "tyrrell_p34": "Tyrrell P34",
    "lotus_79": "Lotus 79",
    "mclaren_mp4_4": "McLaren MP4/4",
    "williams_fw14b": "Williams FW14",
    "ferrari_f2002": "Ferrari F2002",
    "ferrari_f2004": "Ferrari F2004",
    "renault_r25": "Renault R25",
    "brawn_bgp001": "Brawn BGP 001",
    "red_bull_rb9": "Red Bull RB9",
    "mercedes_w11": "Mercedes-AMG F1 W11 EQ Performance",
    "red_bull_rb19": "Red Bull RB19",
    "mclaren_mcl39": "McLaren MCL39"
  };
  const circuitCats = {
    "monaco": "Circuit de Monaco",
    "spa": "Circuit de Spa-Francorchamps",
    "monza": "Autodromo Nazionale Monza",
    "suzuka": "Suzuka Circuit",
    "silverstone": "Silverstone Circuit",
    "interlagos": "Autódromo de Interlagos",
    "nurburgring": "Nürburgring",
    "imola": "Autodromo Enzo e Dino Ferrari",
    "americas": "Circuit of the Americas",
    "marina_bay": "Marina Bay Street Circuit",
    "yas_marina": "Yas Marina Circuit",
    "albert_park": "Melbourne Grand Prix Circuit",
    "villeneuve": "Circuit Gilles Villeneuve",
    "red_bull_ring": "Red Bull Ring"
  };
  /* Fotos concretas que no deben aparecer en ninguna galería (revisadas a mano) */
  const galleryExclude = ["Priscila Fantin.jpg", "Tirinha Senninha.jpg", "Senninha 1.jpg", "Senninha 2.jpg", "Ayrton Senna Jet Ski.jpg", "Cartão de Sócio de Ayrton Senna.jpg", "Kimi Antonelli Lego Kart (55382810927).jpg", "Charles Leclerc Lego Kart (55384147545).jpg"];

  const decadeCats = { 1950: "Formula One in the 1950s", 1960: "Formula One in the 1960s", 1970: "Formula One in the 1970s", 1980: "Formula One in the 1980s", 1990: "Formula One in the 1990s", 2000: "Formula One in the 2000s", 2010: "Formula One in the 2010s", 2020: "Formula One in the 2020s" };

  /* ---------- Imágenes destacadas de portada y secciones ---------- */
  const featured = {
    hero: [["Red Bull Racing RB19", ""], ["Mercedes-AMG F1 W11 EQ Performance", ""], ["Ferrari F2004", ""]],
  };

  F1.img = {
    logos, portraits, galleryExclude, driverCats, teamCats, carCats, circuitCats, decadeCats, featured,
    /** Logotipo de un equipo, opcionalmente para una temporada concreta. */
    logo(key, year) {
      const list = logos[key];
      if (!list) return null;
      if (year) return list.find((x) => (!x.from || year >= x.from) && (!x.to || year <= x.to)) || null;
      return list.find((x) => x.default) || list[0];
    },
    portrait: (id) => portraits[id] || null,
    driverCat: (id, fallbackTitle) => driverCats[id] || fallbackTitle || null,
  };
})();
