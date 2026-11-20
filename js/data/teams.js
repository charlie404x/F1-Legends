/* =========================================================
   Escuderías (contenido editorial).
   ids: identificadores de constructor en Jolpica (algunas marcas
   históricas aparecen divididas por motor, p. ej. "lotus-ford").
   Victorias, poles y temporadas se calculan desde la API.
   Títulos de pilotos y constructores se derivan de champions.js.
   No se usan logotipos oficiales (marcas registradas): se muestra
   un monograma con los colores del equipo.
   ========================================================= */
F1.data.teams = [
  { key: "ferrari", name: "Scuderia Ferrari", short: "Ferrari", mono: "SF", ids: ["ferrari"], color: "#E8002D", founded: 1929, debut: 1950, nat: "Italian", base: "Maranello, Italia", img: "Scuderia Ferrari", current: true,
    history: "Fundada por Enzo Ferrari en 1929 como equipo de carreras de Alfa Romeo, es la única escudería que ha disputado todas las temporadas del Mundial desde 1950. Es el equipo más laureado de la historia y un símbolo nacional en Italia. Sus épocas doradas llegaron con Ascari en los cincuenta, Lauda en los setenta y, sobre todo, con Michael Schumacher, Ross Brawn y Jean Todt entre 1999 y 2004.",
    cars: ["ferrari_500", "ferrari_312t", "ferrari_f2002", "ferrari_f2004"], drivers: ["ascari", "fangio", "lauda", "gilles_villeneuve", "michael_schumacher", "raikkonen", "alonso", "vettel", "hamilton"],
    seasons: [{ y: 1952, t: "Ascari gana todas las carreras que disputa en el campeonato." }, { y: 1975, t: "El 312T y Lauda devuelven el título tras 11 años." }, { y: 2002, t: "Schumacher sube al podio en las 17 carreras." }, { y: 2004, t: "15 victorias en 18 carreras con el F2004." }],
    timeline: [{ y: 1929, t: "Enzo Ferrari funda la Scuderia." }, { y: 1950, t: "Debut en el primer Mundial." }, { y: 1951, t: "Primera victoria en el Mundial (González, Silverstone)." }, { y: 1961, t: "Primer título de constructores." }, { y: 1979, t: "Scheckter, último título de pilotos hasta 2000." }, { y: 2000, t: "Comienza la era Schumacher: 5 títulos seguidos." }, { y: 2007, t: "Räikkönen, campeón por un punto." }, { y: 2025, t: "Lewis Hamilton se une al equipo." }] },
  { key: "mclaren", name: "McLaren", short: "McLaren", mono: "McL", ids: ["mclaren", "mclaren-ford", "mclaren-brm", "mclaren-alfa_romeo", "mclaren-seren"], color: "#FF8000", founded: 1963, debut: 1966, nat: "British", base: "Woking, Reino Unido", img: "McLaren", current: true,
    history: "Fundada por el neozelandés Bruce McLaren, que murió en 1970 probando un coche de CanAm. Bajo la dirección de Ron Dennis se convirtió en un gigante: el MP4/1 de 1981 introdujo el chasis de fibra de carbono y el MP4/4 de 1988 ganó 15 de 16 carreras con Senna y Prost. Tras años difíciles, volvió a la cima con los títulos de constructores de 2024 y 2025.",
    cars: ["mclaren_mp4_4", "mclaren_mcl39"], drivers: ["emerson_fittipaldi", "hunt", "lauda", "prost", "senna", "hakkinen", "coulthard", "hamilton", "button", "alonso", "norris"],
    seasons: [{ y: 1988, t: "15 victorias de 16 con el MP4/4." }, { y: 1998, t: "Häkkinen y Coulthard, de nuevo en la cima." }, { y: 2008, t: "Hamilton campeón en la última curva." }, { y: 2025, t: "Doble título: Norris campeón y constructores." }],
    timeline: [{ y: 1963, t: "Bruce McLaren funda el equipo." }, { y: 1968, t: "Primera victoria (Bélgica, Bruce McLaren)." }, { y: 1974, t: "Primer doblete de títulos con Fittipaldi." }, { y: 1981, t: "MP4/1: primer chasis de fibra de carbono." }, { y: 1988, t: "La temporada casi perfecta." }, { y: 2024, t: "Vuelve el título de constructores tras 26 años." }] },
  { key: "mercedes", name: "Mercedes-AMG Petronas", short: "Mercedes", mono: "MB", ids: ["mercedes"], color: "#27F4D2", founded: 1954, debut: 1954, nat: "German", base: "Brackley, Reino Unido", img: "Mercedes-Benz in Formula One", current: true,
    history: "Mercedes participó como equipo oficial en 1954 y 1955 con el revolucionario W196 y Fangio. Volvió como constructor en 2010 tras adquirir Brawn GP y, con la llegada de los motores híbridos en 2014, construyó la era más dominante de la historia: ocho títulos de constructores consecutivos (2014-2021).",
    cars: ["mercedes_w196", "mercedes_w11"], drivers: ["fangio", "moss", "michael_schumacher", "rosberg", "hamilton"],
    seasons: [{ y: 1955, t: "Fangio y Moss dominan con el W196." }, { y: 2016, t: "Duelo interno Hamilton-Rosberg." }, { y: 2020, t: "W11 y el sistema DAS." }],
    timeline: [{ y: 1954, t: "Debut con victoria en Reims (Fangio)." }, { y: 1955, t: "Retirada del automovilismo tras la tragedia de Le Mans." }, { y: 2010, t: "Regreso como constructor con Schumacher y Rosberg." }, { y: 2014, t: "Inicio de 8 títulos de constructores consecutivos." }] },
  { key: "red_bull", name: "Red Bull Racing", short: "Red Bull", mono: "RB", ids: ["red_bull"], color: "#3671C6", founded: 2005, debut: 2005, nat: "Austrian", base: "Milton Keynes, Reino Unido", img: "Red Bull Racing", current: true,
    history: "Nacida en 2005 sobre la estructura de Jaguar (antes Stewart Grand Prix). Con Adrian Newey en el diseño ganó cuatro títulos dobles seguidos con Vettel (2010-2013) y otra era dominante con Max Verstappen, incluida la temporada récord de 2023 con 21 victorias en 22 carreras.",
    cars: ["red_bull_rb9", "red_bull_rb19"], drivers: ["coulthard", "webber", "vettel", "ricciardo", "max_verstappen"],
    seasons: [{ y: 2010, t: "Vettel, campeón más joven de la historia." }, { y: 2013, t: "Nueve victorias seguidas para cerrar el año." }, { y: 2023, t: "21 victorias de 22 con el RB19." }],
    timeline: [{ y: 2005, t: "Debut tras comprar Jaguar." }, { y: 2009, t: "Primera victoria (China, Vettel)." }, { y: 2010, t: "Primer doblete de títulos." }, { y: 2021, t: "Verstappen gana su primer título." }] },
  { key: "williams", name: "Williams Racing", short: "Williams", mono: "W", ids: ["williams"], color: "#64C4FF", founded: 1977, debut: 1977, nat: "British", base: "Grove, Reino Unido", img: "Williams Racing", current: true,
    history: "Fundada por Frank Williams y el ingeniero Patrick Head. Dominó los ochenta y noventa con pilotos como Jones, Piquet, Mansell, Prost, Hill y Villeneuve, y con tecnología como la suspensión activa del FW14B. Es el segundo equipo con más títulos de constructores.",
    cars: ["williams_fw14b"], drivers: ["jones", "keke_rosberg", "piquet", "mansell", "prost", "damon_hill", "villeneuve", "montoya", "button"],
    seasons: [{ y: 1992, t: "Mansell arrasa con el FW14B." }, { y: 1996, t: "Hill campeón, Villeneuve subcampeón." }],
    timeline: [{ y: 1977, t: "Nace Williams Grand Prix Engineering." }, { y: 1979, t: "Primera victoria (Regazzoni, Silverstone)." }, { y: 1980, t: "Primer doblete de títulos." }, { y: 1997, t: "Noveno título de constructores." }] },
  { key: "lotus", name: "Team Lotus", short: "Lotus", mono: "L", ids: ["team_lotus", "lotus-climax", "lotus-ford", "lotus-brm", "lotus-pw", "lotus-borgward", "lotus-maserati"], color: "#1E5631", founded: 1952, debut: 1958, nat: "British", base: "Hethel, Reino Unido", img: "Team Lotus", current: false,
    history: "El laboratorio de ideas de Colin Chapman. Lotus introdujo el monocasco (Lotus 25), el motor como elemento estructural (Lotus 49), los patrocinadores en la carrocería, el diseño en cuña (Lotus 72) y el efecto suelo (Lotus 79). Siete títulos de constructores y leyendas como Clark, Hill, Rindt, Fittipaldi, Andretti y Senna.",
    cars: ["lotus_25", "lotus_49", "lotus_72", "lotus_79"], drivers: ["moss", "clark", "hill", "rindt", "emerson_fittipaldi", "peterson", "mario_andretti", "senna", "mansell"],
    seasons: [{ y: 1963, t: "Clark gana 7 de 10 carreras." }, { y: 1978, t: "El Lotus 79 revoluciona la aerodinámica." }],
    timeline: [{ y: 1958, t: "Debut en el Mundial." }, { y: 1960, t: "Primera victoria (Moss, Mónaco, con equipo privado)." }, { y: 1962, t: "Lotus 25, primer monocasco." }, { y: 1968, t: "Primera librea comercial (Gold Leaf)." }, { y: 1978, t: "Último título, con el efecto suelo." }, { y: 1994, t: "Última temporada de Team Lotus." }] },
  { key: "renault", name: "Renault", short: "Renault", mono: "R", ids: ["renault"], color: "#FFD800", founded: 1977, debut: 1977, nat: "French", base: "Enstone, Reino Unido / Viry-Châtillon, Francia", img: "Renault in Formula One", current: false,
    history: "Renault trajo el motor turbo a la F1 en 1977 y ganó con él en 1979 (Dijon). Como suministrador de motores impulsó a Williams y Benetton y, como equipo propio tras comprar Benetton, ganó los títulos de 2005 y 2006 con Fernando Alonso. Su estructura de Enstone compite hoy como Alpine.",
    cars: ["renault_r25"], drivers: ["prost", "alonso"],
    seasons: [{ y: 2005, t: "Alonso rompe la hegemonía de Ferrari." }, { y: 2006, t: "Segundo doblete consecutivo." }],
    timeline: [{ y: 1977, t: "Debut con el primer motor turbo." }, { y: 1979, t: "Primera victoria turbo (Jabouille, Dijon)." }, { y: 2002, t: "Regreso como equipo propio." }, { y: 2005, t: "Primer título de pilotos y constructores." }, { y: 2021, t: "El equipo pasa a llamarse Alpine." }] },
  { key: "benetton", name: "Benetton Formula", short: "Benetton", mono: "B", ids: ["benetton"], color: "#00A651", founded: 1986, debut: 1986, nat: "British", base: "Enstone, Reino Unido", img: "Benetton Formula", current: false,
    history: "La firma de moda italiana compró Toleman y convirtió el equipo de Enstone en ganador. Con Michael Schumacher y Ross Brawn ganó los títulos de pilotos de 1994 y 1995 y el de constructores de 1995. En 2002 se transformó en Renault.",
    cars: [], drivers: ["berger", "piquet", "michael_schumacher"],
    seasons: [{ y: 1994, t: "Primer título de Schumacher." }, { y: 1995, t: "Doblete de títulos." }],
    timeline: [{ y: 1986, t: "Nace sobre la base de Toleman." }, { y: 1986, t: "Primera victoria (Berger, México)." }, { y: 1995, t: "Campeón de constructores." }, { y: 2001, t: "Última temporada antes de convertirse en Renault." }] },
  { key: "brabham", name: "Brabham", short: "Brabham", mono: "BT", ids: ["brabham", "brabham-climax", "brabham-repco", "brabham-ford", "brabham-alfa_romeo", "brabham-brm"], color: "#0B3D91", founded: 1960, debut: 1962, nat: "British", base: "Chessington, Reino Unido", img: "Brabham", current: false,
    history: "Fundada por Jack Brabham y Ron Tauranac. Brabham es el único piloto campeón con su propio coche (1966). Bajo Bernie Ecclestone y el genial diseñador Gordon Murray, Nelson Piquet ganó los títulos de 1981 y 1983, este último el primero con motor turbo.",
    cars: [], drivers: ["jack_brabham", "hulme", "lauda", "piquet"],
    seasons: [{ y: 1966, t: "Jack Brabham campeón con su propio coche." }, { y: 1983, t: "Primer título con motor turbo." }],
    timeline: [{ y: 1962, t: "Debut." }, { y: 1966, t: "Primer título de pilotos y constructores." }, { y: 1978, t: "BT46B 'coche ventilador', ganó en su única carrera." }, { y: 1992, t: "Última temporada." }] },
  { key: "tyrrell", name: "Tyrrell Racing", short: "Tyrrell", mono: "T", ids: ["tyrrell"], color: "#1C3F94", founded: 1958, debut: 1968, nat: "British", base: "Ockham, Reino Unido", img: "Tyrrell Racing", current: false,
    history: "Ken Tyrrell empezó como entrante con chasis Matra y ganó el título de 1969 con Stewart. Ya como constructor logró los títulos de pilotos de 1971 y 1973 y el de constructores de 1971. Su creación más famosa: el P34 de seis ruedas.",
    cars: ["tyrrell_p34"], drivers: ["stewart", "scheckter", "peterson"],
    seasons: [{ y: 1971, t: "Doblete de títulos con Stewart." }, { y: 1976, t: "El P34 de seis ruedas gana en Suecia." }],
    timeline: [{ y: 1970, t: "Primer chasis propio." }, { y: 1971, t: "Campeón de constructores." }, { y: 1998, t: "Última temporada; base del futuro BAR." }] },
  { key: "jordan", name: "Jordan Grand Prix", short: "Jordan", mono: "J", ids: ["jordan"], color: "#F5D300", founded: 1991, debut: 1991, nat: "Irish", base: "Silverstone, Reino Unido", img: "Jordan Grand Prix", current: false,
    history: "El equipo del irlandés Eddie Jordan, famoso por su espíritu y por descubrir talentos: Michael Schumacher debutó con Jordan en Spa 1991. Ganó cuatro carreras, la primera con doblete en Spa 1998 (Damon Hill y Ralf Schumacher). Su linaje continúa hoy en Aston Martin.",
    cars: [], drivers: ["michael_schumacher", "barrichello", "damon_hill"],
    seasons: [{ y: 1998, t: "Doblete en Spa." }, { y: 1999, t: "Tercero en constructores con Frentzen." }],
    timeline: [{ y: 1991, t: "Debut; Schumacher debuta en Spa." }, { y: 1998, t: "Primera victoria." }, { y: 2005, t: "Última temporada como Jordan (después Midland, Spyker, Force India, Racing Point y Aston Martin)." }] },
  { key: "brawn", name: "Brawn GP", short: "Brawn", mono: "BGP", ids: ["brawn"], color: "#C8F000", founded: 2009, debut: 2009, nat: "British", base: "Brackley, Reino Unido", img: "Brawn GP", current: false,
    history: "La historia más increíble de la F1 moderna. Honda abandonó a finales de 2008; Ross Brawn compró el equipo por una cantidad simbólica y, con el ingenioso doble difusor del BGP 001 y motor Mercedes, ganó los dos títulos en su única temporada. En 2010 se convirtió en Mercedes.",
    cars: ["brawn_bgp001"], drivers: ["button", "barrichello"],
    seasons: [{ y: 2009, t: "Button gana 6 de las 7 primeras carreras." }],
    timeline: [{ y: 2009, t: "Nace en marzo, campeón en noviembre." }, { y: 2010, t: "Comprado por Mercedes." }] },
  { key: "cooper", name: "Cooper Car Company", short: "Cooper", mono: "C", ids: ["cooper", "cooper-climax", "cooper-maserati", "cooper-brm", "cooper-alfa_romeo", "cooper-borgward", "cooper-castellotti", "cooper-ats", "cooper-ferrari", "cooper-ford", "cooper-osca"], color: "#1D5E2F", founded: 1947, debut: 1950, nat: "British", base: "Surbiton, Reino Unido", img: "Cooper Car Company", current: false,
    history: "Cooper cambió el diseño de los monoplazas para siempre al colocar el motor detrás del piloto. Ganó los títulos de 1959 y 1960 con Jack Brabham y, en pocos años, todos los equipos copiaron la idea.",
    cars: [], drivers: ["jack_brabham", "moss"],
    seasons: [{ y: 1959, t: "Primer título de un coche de motor trasero." }],
    timeline: [{ y: 1958, t: "Primera victoria de un motor trasero (Moss, Argentina)." }, { y: 1959, t: "Campeón de constructores." }, { y: 1969, t: "Última temporada." }] },
  { key: "brm", name: "BRM", short: "BRM", mono: "BRM", ids: ["brm", "brm-ford"], color: "#2F4F4F", founded: 1945, debut: 1951, nat: "British", base: "Bourne, Reino Unido", img: "British Racing Motors", current: false,
    history: "British Racing Motors nació como proyecto nacional británico. Tras años de frustración ganó el doblete de 1962 con Graham Hill y fue el primer equipo de Jackie Stewart y Niki Lauda en la F1.",
    cars: [], drivers: ["hill", "stewart", "lauda", "regazzoni"],
    seasons: [{ y: 1962, t: "Graham Hill campeón." }],
    timeline: [{ y: 1951, t: "Debut." }, { y: 1959, t: "Primera victoria (Bonnier, Zandvoort)." }, { y: 1962, t: "Campeón de constructores." }, { y: 1977, t: "Última temporada." }] },
  { key: "matra", name: "Matra", short: "Matra", mono: "MS", ids: ["matra", "matra-ford"], color: "#1B4B9B", founded: 1965, debut: 1967, nat: "French", base: "Vélizy, Francia", img: "Matra", current: false,
    history: "La empresa aeroespacial francesa aportó técnica de aviación a la F1. Con el equipo de Ken Tyrrell y el motor Cosworth DFV, el Matra MS80 llevó a Jackie Stewart al título de 1969.",
    cars: [], drivers: ["stewart"], seasons: [{ y: 1969, t: "Doblete de títulos con Stewart." }],
    timeline: [{ y: 1968, t: "Primera victoria (Stewart, Zandvoort)." }, { y: 1969, t: "Campeón de constructores." }, { y: 1972, t: "Retirada como constructor." }] },
  { key: "vanwall", name: "Vanwall", short: "Vanwall", mono: "V", ids: ["vanwall"], color: "#0F5132", founded: 1954, debut: 1954, nat: "British", base: "Acton, Reino Unido", img: "Vanwall", current: false,
    history: "El equipo del industrial Tony Vandervell fue el primer campeón de constructores de la historia (1958), con Stirling Moss y Tony Brooks.",
    cars: [], drivers: ["moss", "hawthorn"], seasons: [{ y: 1958, t: "Primer campeón de constructores." }],
    timeline: [{ y: 1957, t: "Primera victoria (Moss y Brooks, Aintree)." }, { y: 1958, t: "Campeón de constructores." }] },
  { key: "alfa", name: "Alfa Romeo", short: "Alfa Romeo", mono: "AR", ids: ["alfa"], color: "#900000", founded: 1910, debut: 1950, nat: "Italian", base: "Milán, Italia", img: "Alfa Romeo in Formula One", current: false,
    history: "Dominó las dos primeras temporadas del Mundial con las 'Alfetta' 158 y 159: Farina campeón en 1950 y Fangio en 1951. Volvió en varias etapas posteriores como constructor y como marca asociada a Sauber.",
    cars: [], drivers: ["farina", "fangio", "raikkonen"], seasons: [{ y: 1950, t: "Gana todas las carreras europeas del primer Mundial." }],
    timeline: [{ y: 1950, t: "Primer campeón del mundo (Farina)." }, { y: 1951, t: "Fangio, primer título." }] },
  { key: "maserati", name: "Maserati", short: "Maserati", mono: "M", ids: ["maserati"], color: "#1F3A93", founded: 1914, debut: 1950, nat: "Italian", base: "Módena, Italia", img: "Maserati in motorsport", current: false,
    history: "El Maserati 250F es uno de los monoplazas más bellos de la historia. Con él Fangio ganó el título de 1957, incluida su legendaria victoria en Nürburgring.",
    cars: ["maserati_250f"], drivers: ["fangio", "moss", "ascari"], seasons: [{ y: 1957, t: "Quinto título de Fangio." }],
    timeline: [{ y: 1953, t: "Primera victoria en el Mundial (Fangio, Monza)." }, { y: 1957, t: "Título de pilotos con Fangio." }] },
  /* ----- Equipos actuales adicionales ----- */
  { key: "aston_martin", name: "Aston Martin", short: "Aston Martin", mono: "AM", ids: ["aston_martin"], color: "#229971", founded: 2021, debut: 2021, nat: "British", base: "Silverstone, Reino Unido", img: "Aston Martin in Formula One", current: true,
    history: "El nombre Aston Martin volvió a la F1 en 2021 sobre la estructura de Silverstone que nació como Jordan y pasó por Midland, Spyker, Force India y Racing Point. Fernando Alonso se incorporó en 2023.",
    cars: [], drivers: ["vettel", "alonso"], seasons: [{ y: 2023, t: "Alonso logra 8 podios." }],
    timeline: [{ y: 1991, t: "Origen como Jordan Grand Prix." }, { y: 2021, t: "Debut con el nombre Aston Martin." }] },
  { key: "alpine", name: "Alpine F1 Team", short: "Alpine", mono: "A", ids: ["alpine"], color: "#0093CC", founded: 2021, debut: 2021, nat: "French", base: "Enstone, Reino Unido", img: "Alpine F1 Team", current: true,
    history: "Heredero del equipo de Enstone (Toleman, Benetton, Renault y Lotus F1). Ganó con Esteban Ocon en Hungría 2021.",
    cars: [], drivers: ["alonso"], seasons: [{ y: 2021, t: "Victoria de Ocon en Hungría." }],
    timeline: [{ y: 1981, t: "Origen como Toleman." }, { y: 2021, t: "Debut como Alpine." }] },
  { key: "haas", name: "Haas F1 Team", short: "Haas", mono: "H", ids: ["haas"], color: "#B6BABD", founded: 2014, debut: 2016, nat: "American", base: "Kannapolis, EE. UU.", img: "Haas F1 Team", current: true,
    history: "Equipo estadounidense fundado por Gene Haas. Puntuó en su primera carrera (Australia 2016) con Romain Grosjean.",
    cars: [], drivers: [], seasons: [{ y: 2016, t: "Puntos en su debut." }], timeline: [{ y: 2016, t: "Debut en el Mundial." }] },
  { key: "rb", name: "Racing Bulls", short: "Racing Bulls", mono: "RB", ids: ["rb", "alphatauri", "toro_rosso", "minardi"], color: "#6692FF", founded: 1985, debut: 1985, nat: "Italian", base: "Faenza, Italia", img: "Racing Bulls", current: true,
    history: "El equipo de Faenza empezó como Minardi (1985-2005), fue Toro Rosso (2006-2019), AlphaTauri (2020-2023) y hoy Racing Bulls. Sebastian Vettel le dio una histórica victoria en Monza 2008 y Pierre Gasly otra en Monza 2020.",
    cars: [], drivers: ["vettel", "max_verstappen", "ricciardo"], seasons: [{ y: 2008, t: "Vettel gana en Monza bajo la lluvia." }],
    timeline: [{ y: 1985, t: "Debut como Minardi." }, { y: 2006, t: "Se convierte en Toro Rosso." }, { y: 2008, t: "Primera victoria." }, { y: 2020, t: "AlphaTauri; victoria de Gasly en Monza." }] },
  { key: "audi", name: "Audi F1 Team", short: "Audi", mono: "AU", ids: ["audi", "sauber", "bmw_sauber"], color: "#BB0A30", founded: 1993, debut: 1993, nat: "German", base: "Hinwil, Suiza", img: "Audi in Formula One", current: true,
    history: "Audi debuta en 2026 tras adquirir Sauber, el equipo suizo de Peter Sauber que llegó a la F1 en 1993 y ganó como BMW Sauber en Canadá 2008 (Robert Kubica).",
    cars: [], drivers: ["raikkonen", "vettel", "massa"], seasons: [{ y: 2008, t: "Victoria de BMW Sauber en Canadá." }],
    timeline: [{ y: 1993, t: "Debut de Sauber." }, { y: 2006, t: "Se convierte en BMW Sauber." }, { y: 2026, t: "Debut como Audi." }] },
  { key: "cadillac", name: "Cadillac F1 Team", short: "Cadillac", mono: "CF", ids: ["cadillac"], color: "#C0C0C0", founded: 2025, debut: 2026, nat: "American", base: "Fishers (Indiana), EE. UU. / Silverstone, Reino Unido", img: "Cadillac in Formula One", current: true,
    history: "El undécimo equipo de la parrilla debutó en 2026, respaldado por General Motors.",
    cars: [], drivers: [], seasons: [], timeline: [{ y: 2026, t: "Debut en el Mundial." }] },
];

/* Nombres de equipos sin ficha propia (para mostrar trayectorias). */
F1.data.teamNames = { toleman: "Toleman", minardi: "Minardi", sauber: "Sauber", honda: "Honda", bar: "BAR", jaguar: "Jaguar", march: "March", hesketh: "Hesketh", wolf: "Wolf", stewart: "Stewart", arrows: "Arrows", lancia: "Lancia" };

/* Nombre de los monoplazas de la temporada 2026 por equipo (verificado con fuentes de prensa especializada). */
F1.data.currentCars = { mercedes: "W17", ferrari: "SF-26", red_bull: "RB22", mclaren: "MCL40", williams: "FW48", aston_martin: "AMR26", alpine: "A526", haas: "VF-26", audi: "R26", rb: "VCARB 03", cadillac: "MAC-26" };

F1.team = {
  get: (key) => F1.data.teams.find((t) => t.key === key),
  /** Busca la ficha a partir de un constructorId de la API. */
  fromApi: (cid) => F1.data.teams.find((t) => t.ids.includes(cid) || t.key === cid),
  name: (key) => (F1.team.get(key)?.short) || F1.data.teamNames[key] || key,
  color: (cid) => (F1.team.fromApi(cid)?.color) || "#888",
};

/** Foto representativa del equipo: su monoplaza más icónico o, si no hay ficha, búsqueda en Commons (evita logotipos registrados). */
F1.team.photo = (t) => {
  const car = t.cars && t.cars.length ? F1.car.get(t.cars[t.cars.length - 1]) : null;
  return car ? [car.img, ""] : [t.img, "!" + t.short + " Formula One car||" + t.short.split(" ")[0]];
};
