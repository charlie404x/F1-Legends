/* =========================================================
   Circuitos. Datos técnicos de la configuración actual (o la
   última usada en F1). Año de debut, nº de GP, ganadores y vuelta
   rápida se calculan con la API Jolpica (id). El trazado
   interactivo usa el GeoJSON de bacinger/f1-circuits (geo).
   map: artículo de Wikipedia (su imagen suele ser el plano).
   photo: archivo de Wikimedia Commons elegido a mano ("file:"), verificado por título.
   ========================================================= */
F1.data.circuits = [
  { key: "monaco", id: "monaco", geo: "mc-1929", name: "Circuit de Monaco", short: "Mónaco", country: "Mónaco", iso: "mc", city: "Montecarlo", length: 3.337, turns: 19, dir: "Horario", map: "Circuit de Monaco", photo: "file:Hamilton - 2016 Monaco GP 02.jpg",
    desc: "Calles estrechas, guardarraíles a centímetros y el túnel. Adelantar es casi imposible: la clasificación lo decide casi todo.",
    moments: ["1984: Senna deslumbra bajo la lluvia con un Toleman", "1988: Senna, líder destacado, choca en Portier", "1992: Senna resiste a Mansell en las últimas vueltas", "1996: Panis gana y solo tres coches cruzan la línea de meta"] },
  { key: "spa", id: "spa", geo: "be-1925", name: "Circuit de Spa-Francorchamps", short: "Spa-Francorchamps", country: "Bélgica", iso: "be", city: "Stavelot", length: 7.004, turns: 19, dir: "Horario", map: "Circuit de Spa-Francorchamps", photo: "file:Circuit de Spa-Francorchamps, April 22, 2018 SkySat.jpg",
    desc: "El circuito favorito de muchos pilotos: Eau Rouge-Raidillon, Pouhon, Blanchimont y un clima que puede ser seco en una curva y lluvioso en otra.",
    moments: ["1991: debut de Michael Schumacher", "1998: primera victoria de Jordan en una carrera caótica", "2000: Häkkinen supera a Schumacher con un doblado de por medio"] },
  { key: "monza", id: "monza", geo: "it-1922", name: "Autodromo Nazionale Monza", short: "Monza", country: "Italia", iso: "it", city: "Monza", length: 5.793, turns: 11, dir: "Horario", map: "Monza Circuit", photo: "file:Fale F1 Monza 2004 77.jpg",
    desc: "El templo de la velocidad. Rectas larguísimas, mínima carga aerodinámica y la pasión de los tifosi invadiendo la recta tras la carrera.",
    moments: ["1967: remontada épica de Jim Clark", "1971: final más ajustado de la historia (0,01 s)", "2008: Vettel gana con Toro Rosso bajo la lluvia", "2019: Leclerc devuelve la victoria a Ferrari en casa"] },
  { key: "suzuka", id: "suzuka", geo: "jp-1962", name: "Suzuka International Racing Course", short: "Suzuka", country: "Japón", iso: "jp", city: "Suzuka", length: 5.807, turns: 18, dir: "Horario (trazado en forma de ocho)", map: "Suzuka International Racing Course", photo: "file:2019 Japanese Grand Prix Max Verstappen (49028922522).jpg",
    desc: "El único trazado en forma de ocho del calendario. Las 'eses', Degner, Spoon y la 130R lo convierten en un examen técnico total.",
    moments: ["1989 y 1990: choques Senna-Prost que decidieron títulos", "2005: Räikkönen gana desde el 17º y Alonso pasa a Schumacher en la 130R"] },
  { key: "silverstone", id: "silverstone", geo: "gb-1948", name: "Silverstone Circuit", short: "Silverstone", country: "Reino Unido", iso: "gb", city: "Silverstone", length: 5.891, turns: 18, dir: "Horario", map: "Silverstone Circuit", photo: "file:Silverstone F1 British Grand Prix 2014 (14427805420).jpg",
    desc: "Antiguo aeródromo y sede de la primera carrera del Mundial en 1950. Maggotts, Becketts y Chapel forman una de las secuencias más rápidas del mundo.",
    moments: ["1950: primera carrera de la historia del Mundial", "1987: Mansell supera a Piquet en Stowe", "2008: exhibición de Hamilton bajo la lluvia"] },
  { key: "interlagos", id: "interlagos", geo: "br-1940", name: "Autódromo José Carlos Pace (Interlagos)", short: "Interlagos", country: "Brasil", iso: "br", city: "São Paulo", length: 4.309, turns: 15, dir: "Antihorario", map: "Interlagos Circuit", photo: "file:Mark Webber and Sebastian Vettel Interlagos 2013.jpg",
    desc: "Antihorario, ondulado y con un clima imprevisible. Escenario de algunos de los finales de campeonato más dramáticos.",
    moments: ["1991: Senna gana con solo la sexta marcha", "2008: Hamilton campeón en la última curva", "2012: Vettel campeón tras girar en la salida", "2016 y 2024: exhibiciones de Verstappen en mojado"] },
  { key: "nurburgring", id: "nurburgring", search: "nurburgring", geo: "de-1927", name: "Nürburgring", short: "Nürburgring", country: "Alemania", iso: "de", city: "Nürburg", length: 5.148, turns: 15, dir: "Horario", map: "Nürburgring", photo: "file:Nürburgring 1968 Beltoise Matra.jpg",
    desc: "El 'Infierno Verde'. El Mundial corrió en la Nordschleife de más de 22 km hasta 1976; después en el moderno GP-Strecke.",
    moments: ["1957: Fangio firma la carrera de su vida", "1976: el accidente de Lauda pone fin a la Nordschleife en F1"] },
  { key: "imola", id: "imola", geo: "it-1953", name: "Autodromo Enzo e Dino Ferrari", short: "Imola", country: "Italia", iso: "it", city: "Imola", length: 4.909, turns: 19, dir: "Antihorario", map: "Imola Circuit", photo: "file:Formula 1, GP San Marino 1989, Imola, Prost e Senna.jpg",
    desc: "Circuito antihorario y técnico que lleva el nombre de Enzo Ferrari y de su hijo Dino. Ligado para siempre al trágico fin de semana de 1994.",
    moments: ["1982: Pironi contraviene la orden de equipo ante Villeneuve", "1994: fallecen Ratzenberger y Senna", "2005 y 2006: duelos Alonso-Schumacher"] },
  { key: "americas", id: "americas", search: "americas|austin|united states grand prix", geo: "us-2012", name: "Circuit of the Americas", short: "COTA", country: "Estados Unidos", iso: "us", city: "Austin", length: 5.513, turns: 20, dir: "Antihorario", map: "Circuit of the Americas", photo: "file:United states grand prix 2013.jpg",
    desc: "Diseño moderno con guiños a curvas clásicas y una subida espectacular hasta la curva 1.",
    moments: ["2012: primer GP en Austin, victoria de Hamilton", "2015: Hamilton se proclama tricampeón"] },
  { key: "marina_bay", id: "marina_bay", search: "singapore", geo: "sg-2008", name: "Marina Bay Street Circuit", short: "Marina Bay", country: "Singapur", iso: "sg", city: "Singapur", length: 4.940, turns: 19, dir: "Antihorario", map: "Marina Bay Street Circuit", photo: "file:Formula One Grand Prix Singapore 2013 - laser show on Marina Bay Sands.jpg",
    desc: "La primera carrera nocturna de la F1 (2008). Calor, humedad y muros: una de las pruebas más exigentes físicamente.",
    moments: ["2008: primera carrera nocturna de la historia"] },
  { key: "yas_marina", id: "yas_marina", search: "abu dhabi|yas", geo: "ae-2009", name: "Yas Marina Circuit", short: "Yas Marina", country: "Emiratos Árabes Unidos", iso: "ae", city: "Abu Dabi", length: 5.281, turns: 16, dir: "Antihorario", map: "Yas Marina Circuit", photo: "file:Abu Dhabi Grand Prix Mexicans support Checo Perez F1.jpg",
    desc: "Habitual escenario de la última carrera del año, con transición del día a la noche.",
    moments: ["2010: Vettel campeón por primera vez", "2021: la última vuelta Verstappen-Hamilton", "2025: Norris campeón por dos puntos"] },
  { key: "albert_park", id: "albert_park", search: "albert park|melbourne|australian grand prix", geo: "au-1953", name: "Albert Park Circuit", short: "Albert Park", country: "Australia", iso: "au", city: "Melbourne", length: 5.278, turns: 14, dir: "Horario", map: "Albert Park Circuit", photo: "file:Williams-Mercedes FW37 (2015) - Front wing (16700524518).jpg", photoNote: "Williams FW37, 2015",
    desc: "Circuito semiurbano alrededor de un lago, habitual apertura del campeonato.",
    moments: ["2009: Brawn GP gana con doblete en su debut"] },
  { key: "villeneuve", id: "villeneuve", search: "montreal|canadian grand prix|villeneuve", geo: "ca-1978", name: "Circuit Gilles-Villeneuve", short: "Montreal", country: "Canadá", iso: "ca", city: "Montreal", length: 4.361, turns: 14, dir: "Horario", map: "Circuit Gilles Villeneuve", photo: "file:Circuit Gilles-Villeneuve, May 29, 2018 SkySat.jpg",
    desc: "En una isla artificial del río San Lorenzo. Frenadas brutales y el famoso 'Muro de los Campeones'.",
    moments: ["1978: Gilles Villeneuve gana la primera carrera en el circuito", "2007: primera victoria de Hamilton", "2011: Button gana la carrera más larga de la historia"] },
  { key: "red_bull_ring", id: "red_bull_ring", search: "austria|spielberg|red bull ring", geo: "at-1969", name: "Red Bull Ring", short: "Red Bull Ring", country: "Austria", iso: "at", city: "Spielberg", length: 4.318, turns: 10, dir: "Horario", map: "Red Bull Ring", photo: "file:FIA F1 Austria 2022 Nr. 55 Sainz (2) (edited).jpg",
    desc: "Corto, rápido y en plena montaña de Estiria. Antiguo Österreichring y A1-Ring.",
    moments: ["2019: Verstappen supera a Leclerc al final", "2020: abre la temporada de la pandemia"] },
];
F1.circuit = { get: (k) => F1.data.circuits.find((c) => c.key === k) };
