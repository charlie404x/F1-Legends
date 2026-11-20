/* =========================================================
   English editorial content. Only loaded in English mode.
   Each block overrides the text fields of js/data/*.js by id,
   so the Spanish data files remain the single source of
   structure (ids, years, links, images).
   ========================================================= */
(function () {
  const P = F1.i18n.patchData;
  const byId = (list, key, map, apply) => list.forEach((x) => { const v = map[x[key]]; if (v) apply(x, v); });

  /* ---------- Nationalities ---------- */
  P((D) => {
    const N = { British: "United Kingdom", German: "Germany", "East German": "East Germany", Italian: "Italy", Argentine: "Argentina", Argentinian: "Argentina", Brazilian: "Brazil", Finnish: "Finland", French: "France", Austrian: "Austria", Australian: "Australia", "New Zealander": "New Zealand", American: "United States", "South African": "South Africa", Spanish: "Spain", Canadian: "Canada", Dutch: "Netherlands", Mexican: "Mexico", Monegasque: "Monaco", Thai: "Thailand", Japanese: "Japan", Danish: "Denmark", Chinese: "China", Swedish: "Sweden", Belgian: "Belgium", Swiss: "Switzerland", Polish: "Poland", Russian: "Russia", Colombian: "Colombia", Venezuelan: "Venezuela", Indian: "India", Irish: "Ireland", Portuguese: "Portugal", Hungarian: "Hungary", Indonesian: "Indonesia", Malaysian: "Malaysia", Czech: "Czechia", Uruguayan: "Uruguay", Chilean: "Chile", Rhodesian: "Rhodesia", Liechtensteiner: "Liechtenstein", Emirati: "United Arab Emirates", Estonian: "Estonia" };
    Object.entries(N).forEach(([k, v]) => { if (D.nations[k]) D.nations[k] = [D.nations[k][0], v]; });
  });

  /* ---------- Drivers ---------- */
  P((D) => byId(D.drivers, "id", {
    farina: ["The first world champion in history. He won the very first championship race, at Silverstone on 13 May 1950, and took the title in the Alfa Romeo 158 ahead of his team-mate Fangio. His straight-armed driving style inspired later generations.", ["Winner of the first World Championship race (Silverstone 1950)", "First F1 world champion"]],
    fangio: ["\"El Chueco\" from Balcarce is, for many, the greatest driver of all time. He won five titles with four different teams (Alfa Romeo, Maserati, Mercedes and Ferrari) and holds one of the highest win rates in history. His comeback at the Nürburgring in 1957, aged 46, is still the absolute benchmark.", ["5 titles with 4 different teams", "Nürburgring 1957: broke the lap record again and again to recover 48 seconds", "Oldest champion in history (46 in 1957)"]],
    ascari: ["Two-time champion with Ferrari in 1952 and 1953, when the championship was run to Formula 2 rules. He strung together nine consecutive championship wins, a record that took six decades to beat. He died in 1955 testing a Ferrari sports car at Monza, days after plunging into Monaco harbour in his Lancia.", ["Ferrari's first double champion (1952, 1953)", "9 consecutive championship wins"]],
    hawthorn: ["Britain's first world champion (1958, Ferrari), by a single point over Stirling Moss, who had spoken up for him in front of the stewards in Portugal. He retired at the end of that season and died months later in a road accident.", ["First British world champion (1958)"]],
    moss: ["The greatest driver never to be champion. Runner-up four years in a row (1955-1958) and a winner in very different machines, he preferred racing British cars. His sportsmanship in 1958, defending his rival Hawthorn before the stewards, probably cost him the title.", ["4 consecutive runner-up finishes (1955-1958)", "First World Championship win for a rear-engined car (Argentina 1958, Cooper)"]],
    jack_brabham: ["Triple champion and technical pioneer. He won in 1959 and 1960 with the revolutionary rear-engined Coopers and in 1966 became the only driver to win the world title in a car bearing his own name.", ["Only champion in a car built by his own team (1966)", "A leading figure of the rear-engine revolution"]],
    phil_hill: ["America's first champion, with the Ferrari 156 \"Sharknose\" in 1961. He clinched the title at Monza on a tragic day on which his team-mate and rival Wolfgang von Trips was killed.", ["First US champion (1961)"]],
    hill: ["Two-time champion (1962 with BRM and 1968 with Lotus) and \"Mr Monaco\", with five wins in the Principality. He is the only driver to have achieved motorsport's Triple Crown: Monaco GP, Indianapolis 500 and 24 Hours of Le Mans.", ["The only Triple Crown in history", "5 wins at Monaco", "Father of the 1996 champion, Damon Hill"]],
    clark: ["The Lotus Scot was the benchmark of his generation for his smoothness and natural speed. Champion in 1963 and 1965 (the year he also won the Indianapolis 500). He was killed in a Formula 2 race at Hockenheim in 1968.", ["Champion in 1963 and 1965 with Lotus", "Winner of the 1965 Indianapolis 500", "Monza 1967: recovered a lost lap to take the lead"]],
    surtees: ["The only world champion on two and four wheels: after several 500 cc motorcycle world titles, he won the 1964 F1 championship with Ferrari.", ["The only champion on bikes and in F1"]],
    hulme: ["\"The Bear\" won the 1967 championship with Brabham, beating his own boss, Jack Brabham. He was then a key figure in McLaren's early years.", ["1967 champion, the only New Zealander to win the world title"]],
    stewart: ["Triple champion (1969, 1971, 1973) and F1's great safety campaigner: he fought for barriers, medical services and safer circuits when dying on track was commonplace. He retired in 1973 after the death of his team-mate François Cevert.", ["3 titles (Matra and Tyrrell)", "Pioneer of motorsport safety"]],
    rindt: ["The only posthumous champion in history. He was dominating 1970 with the revolutionary Lotus 72 when he lost his life in practice at Monza; no rival managed to beat his points total.", ["Only posthumous champion (1970)"]],
    emerson_fittipaldi: ["He opened Brazil's path into F1. Champion in 1972 with Lotus, then the youngest ever, and in 1974 with McLaren, the Woking team's first drivers' title. He later won the Indianapolis 500 twice.", ["Youngest champion of his time (1972)", "McLaren's first drivers' title (1974)"]],
    lauda: ["Triple champion (1975 and 1977 with Ferrari, 1984 with McLaren) and a symbol of resilience. After his terrible crash at the Nürburgring in 1976 he was racing again just six weeks later. In 1984 he won the title by half a point over Prost, the narrowest margin in history.", ["Comeback at Monza 1976, 42 days after his crash", "1984 title by half a point"]],
    hunt: ["Charismatic and unpredictable, he won the 1976 title with McLaren by one point over Lauda in a dramatic finale in the Fuji downpour. He later became a celebrated BBC commentator.", ["1976 champion by one point"]],
    mario_andretti: ["One of the most complete drivers in history: F1 champion in 1978 with the ground-effect Lotus 79, winner of the Indianapolis 500 and the Daytona 500.", ["1978 champion with the Lotus 79"]],
    scheckter: ["Champion in 1979 with Ferrari. It was the Scuderia's last drivers' title until Michael Schumacher arrived in 2000. He also won in the six-wheeled Tyrrell P34.", ["1979 champion with Ferrari", "Win in the six-wheeled Tyrrell (Sweden 1976)"]],
    jones: ["1980 champion with Williams, the first drivers' title for Frank Williams and Patrick Head's team.", ["Williams' first champion (1980)"]],
    gilles_villeneuve: ["Pure passion at the wheel. He was never champion, but his spectacular style and his duel with Arnoux at Dijon 1979 made him a Ferrari idol. He was killed in qualifying at Zolder in 1982. His number 27 is legendary.", ["Dijon 1979: the most famous duel in history", "6 wins with Ferrari"]],
    piquet: ["Triple champion (1981 and 1983 with Brabham, 1987 with Williams). A great technical mind, his 1983 title was the first won with a turbo engine.", ["First champion with a turbo engine (1983)"]],
    keke_rosberg: ["Champion in 1982 with Williams with just one win all season, in the most evenly matched year in history. Father of the 2016 champion, Nico Rosberg.", ["1982 champion with a single win"]],
    prost: ["\"The Professor\". Four-time champion (1985, 1986 and 1989 with McLaren; 1993 with Williams), master of strategy and race management. His rivalry with Senna is the most famous in the history of the sport.", ["4 world titles", "Record number of wins for years (51)"]],
    senna: ["Triple champion (1988, 1990, 1991) with McLaren and one of the fastest and most charismatic drivers in history. King of qualifying and of the rain, his laps at Monaco and Donington are legendary. He died at Imola in 1994; his legacy drove a safety revolution.", ["Donington 1993: the 'lap of the gods'", "6 wins at Monaco", "65 poles, a record for 12 years"]],
    mansell: ["\"Il Leone\". After years of coming close, he swept to the 1992 title with the Williams FW14B. The following year he won CART in his debut season. His \"Red 5\" is iconic.", ["1992 champion with the FW14B", "1993 CART champion as a rookie"]],
    michael_schumacher: ["Seven-time champion: 1994 and 1995 with Benetton and five consecutive titles with Ferrari (2000-2004), the Scuderia's most dominant era. He redefined fitness, teamwork and the work ethic of the modern racing driver.", ["7 world titles", "5 consecutive titles with Ferrari", "Hungary 1998: the strategy of qualifying-pace laps"]],
    hakkinen: ["\"The Flying Finn\". Double champion with McLaren (1998, 1999) and the rival Michael Schumacher respected most. His overtake at Spa 2000 is among the best in history.", ["Champion in 1998 and 1999", "Spa 2000: an overtake around a backmarker"]],
    damon_hill: ["1996 champion with Williams. With his father Graham he formed the first father-and-son pair of world champions. He gave Jordan its first win (Spa 1998).", ["First son of a champion to become champion (1996)"]],
    villeneuve: ["Son of Gilles. He arrived in F1 as CART champion and Indianapolis winner, was runner-up in his debut season (1996) and champion in 1997 with Williams after his decisive clash with Schumacher at Jerez.", ["1997 champion", "Runner-up in his debut season"]],
    alonso: ["Double champion with Renault (2005, 2006), he ended the Schumacher-Ferrari streak and was the youngest champion of his time. Regarded as one of the most complete drivers of his generation, he also won the 24 Hours of Le Mans and the World Endurance Championship. Still racing, with the most starts in history.", ["Champion in 2005 and 2006", "Suzuka 2005: around the outside at 130R", "Record number of GP starts"]],
    raikkonen: ["\"Iceman\". 2007 champion with Ferrari after overturning a 17-point deficit in the last two races. He remains the last driver to win the title with Ferrari and one of the fans' favourites.", ["2007 champion by one point", "Suzuka 2005: win from 17th on the grid"]],
    hamilton: ["Seven-time champion (2008 with McLaren and six with Mercedes), he shares the record for titles with Schumacher and holds the records for wins and poles. He has raced for Ferrari since 2025.", ["7 world titles", "Records for wins and poles", "Brazil 2008: champion at the last corner"]],
    button: ["2009 champion with Brawn GP, the fairy-tale team that won the title in its only season. A master of changeable conditions, as he showed in Canada 2011.", ["2009 champion with Brawn GP", "Canada 2011: from last to first"]],
    vettel: ["Four consecutive titles with Red Bull (2010-2013) and the youngest champion in history. He won with Toro Rosso at Monza 2008 in the rain and, after his Ferrari years, became a prominent voice on social and environmental causes.", ["4 consecutive titles", "Youngest champion in history (2010)", "Brazil 2012: champion after spinning on the first lap"]],
    rosberg: ["2016 champion with Mercedes after an intense rivalry with his team-mate Lewis Hamilton. He announced his retirement five days after winning the title. With his father Keke he formed the second father-and-son pair of champions.", ["2016 champion and immediate retirement"]],
    max_verstappen: ["Four consecutive titles with Red Bull (2021-2024) and the youngest ever Grand Prix winner (Spain 2016, aged 18). In 2023 he produced the most dominant season in history with 19 wins.", ["4 consecutive titles", "Youngest GP winner", "Brazil 2016 and Brazil 2024: masterclasses in the rain"]],
    norris: ["2025 champion with McLaren by two points over Max Verstappen, in a finale decided in Abu Dhabi. It was McLaren's first drivers' title since 2008.", ["2025 champion by 2 points"]],
    peterson: ["\"SuperSwede\", one of the fastest drivers of the seventies. Runner-up in 1971 and 1978, Andretti's team-mate in the Lotus 79. He died after a crash at the start at Monza 1978.", ["Runner-up in 1971 and 1978", "Six-wheeled Tyrrell P34"]],
    ickx: ["Runner-up in 1969 and 1970 and one of the great wet-weather drivers. Outside F1 he is an endurance legend, with six wins at the 24 Hours of Le Mans.", ["Runner-up 1969 and 1970", "6 Le Mans wins"]],
    regazzoni: ["Lauda's team-mate at Ferrari and 1974 runner-up. In 1979 he gave Williams its first win, at Silverstone.", ["Williams' first win (Silverstone 1979)"]],
    reutemann: ["\"Lole\", Fangio's great Argentine successor. Runner-up in 1981 by a single point after leading much of the year with Williams.", ["1981 runner-up by one point"]],
    berger: ["Senna's team-mate and close friend at McLaren. He gave Benetton its first win (Mexico 1986) and won for Ferrari in difficult times for the Scuderia.", ["Benetton's first win (Mexico 1986)"]],
    coulthard: ["Häkkinen's team-mate in McLaren's golden era and 2001 runner-up. He scored Red Bull Racing's first ever podium (Monaco 2006).", ["2001 runner-up", "Red Bull Racing's first podium"]],
    barrichello: ["Schumacher's team-mate in Ferrari's golden era and runner-up in 2002 and 2004. For years he was the driver with the most starts in history.", ["Runner-up 2002 and 2004", "Wins with Ferrari and Brawn GP"]],
    montoya: ["Aggressive and spectacular, he came from CART and challenged Schumacher from his very first season. He won at Monaco in 2003 and has two Indianapolis 500 wins.", ["Monaco 2003 win", "2 Indianapolis wins"]],
    webber: ["Vettel's team-mate during Red Bull's years of dominance. He won twice at Monaco (2010 and 2012) and fought for the 2010 title until the final race.", ["2 wins at Monaco"]],
    massa: ["He was world champion for 38 seconds at Brazil 2008, until Hamilton passed Glock at the last corner. His sportsmanship on the Interlagos podium is remembered as one of F1's great moments.", ["2008 runner-up by one point", "11 wins with Ferrari"]],
    ricciardo: ["Famous for his late-braking overtakes and his smile. He won with Red Bull in the Mercedes era and gave McLaren its first win in almost a decade (Monza 2021).", ["Monaco 2018 win", "McLaren's first win since 2012 (Monza 2021)"]],
  }, (d, v) => { d.bio = v[0]; d.highlights = v[1]; }));
  /* ---------- Teams (base, history, memorable seasons, timeline) ---------- */
  P((D) => byId(D.teams, "key", {
    ferrari: ["Maranello, Italy", "Founded by Enzo Ferrari in 1929 as Alfa Romeo's racing team, it is the only team to have contested every World Championship season since 1950. It is the most successful team in history and a national symbol in Italy. Its golden eras came with Ascari in the fifties, Lauda in the seventies and, above all, with Michael Schumacher, Ross Brawn and Jean Todt between 1999 and 2004.",
      ["Ascari wins every championship race he enters.", "The 312T and Lauda bring the title back after 11 years.", "Schumacher finishes on the podium in all 17 races.", "15 wins in 18 races with the F2004."],
      ["Enzo Ferrari founds the Scuderia.", "Debut in the first World Championship.", "First World Championship win (González, Silverstone).", "First constructors' title.", "Scheckter, the last drivers' title until 2000.", "The Schumacher era begins: 5 titles in a row.", "Räikkönen, champion by one point.", "Lewis Hamilton joins the team."]],
    mclaren: ["Woking, United Kingdom", "Founded by New Zealander Bruce McLaren, who was killed in 1970 testing a CanAm car. Under Ron Dennis it became a giant: the 1981 MP4/1 introduced the carbon-fibre chassis and the 1988 MP4/4 won 15 of 16 races with Senna and Prost. After difficult years it returned to the top with the 2024 and 2025 constructors' titles.",
      ["15 wins from 16 with the MP4/4.", "Häkkinen and Coulthard back on top.", "Hamilton champion at the last corner.", "Double title: Norris champion plus constructors'."],
      ["Bruce McLaren founds the team.", "First win (Belgium, Bruce McLaren).", "First title double with Fittipaldi.", "MP4/1: the first carbon-fibre chassis.", "The almost perfect season.", "Constructors' title returns after 26 years."]],
    mercedes: ["Brackley, United Kingdom", "Mercedes raced as a works team in 1954 and 1955 with the revolutionary W196 and Fangio. It returned as a constructor in 2010 after buying Brawn GP and, with the arrival of hybrid engines in 2014, built the most dominant era in history: eight consecutive constructors' titles (2014-2021).",
      ["Fangio and Moss dominate with the W196.", "Hamilton-Rosberg intra-team duel.", "The W11 and its DAS system."],
      ["Debut with victory at Reims (Fangio).", "Withdraws from motorsport after the Le Mans tragedy.", "Return as a constructor with Schumacher and Rosberg.", "Start of 8 consecutive constructors' titles."]],
    red_bull: ["Milton Keynes, United Kingdom", "Born in 2005 from the Jaguar operation (formerly Stewart Grand Prix). With Adrian Newey designing, it won four consecutive doubles with Vettel (2010-2013) and another dominant era with Max Verstappen, including the record 2023 season with 21 wins from 22 races.",
      ["Vettel, the youngest champion in history.", "Nine wins in a row to finish the year.", "21 wins from 22 with the RB19."],
      ["Debut after buying Jaguar.", "First win (China, Vettel).", "First title double.", "Verstappen wins his first title."]],
    williams: ["Grove, United Kingdom", "Founded by Frank Williams and engineer Patrick Head. It dominated the eighties and nineties with drivers such as Jones, Piquet, Mansell, Prost, Hill and Villeneuve, and technology such as the FW14B's active suspension. It is the team with the second most constructors' titles.",
      ["Mansell sweeps all before him with the FW14B.", "Hill champion, Villeneuve runner-up."],
      ["Williams Grand Prix Engineering is born.", "First win (Regazzoni, Silverstone).", "First title double.", "Ninth constructors' title."]],
    lotus: ["Hethel, United Kingdom", "Colin Chapman's ideas laboratory. Lotus introduced the monocoque (Lotus 25), the engine as a stressed member (Lotus 49), sponsors on the bodywork, the wedge shape (Lotus 72) and ground effect (Lotus 79). Seven constructors' titles and legends such as Clark, Hill, Rindt, Fittipaldi, Andretti and Senna.",
      ["Clark wins 7 of 10 races.", "The Lotus 79 revolutionises aerodynamics."],
      ["World Championship debut.", "First win (Moss, Monaco, with a private team).", "Lotus 25, the first monocoque.", "First commercial livery (Gold Leaf).", "Last title, with ground effect.", "Team Lotus' final season."]],
    renault: ["Enstone, United Kingdom / Viry-Châtillon, France", "Renault brought the turbo engine to F1 in 1977 and won with it in 1979 (Dijon). As an engine supplier it powered Williams and Benetton and, as a works team after buying Benetton, won the 2005 and 2006 titles with Fernando Alonso. Its Enstone base races today as Alpine.",
      ["Alonso ends Ferrari's hegemony.", "Second consecutive double."],
      ["Debut with the first turbo engine.", "First turbo win (Jabouille, Dijon).", "Return as a works team.", "First drivers' and constructors' titles.", "The team is renamed Alpine."]],
    benetton: ["Enstone, United Kingdom", "The Italian fashion company bought Toleman and turned the Enstone team into winners. With Michael Schumacher and Ross Brawn it won the 1994 and 1995 drivers' titles and the 1995 constructors' title. In 2002 it became Renault.",
      ["Schumacher's first title.", "Title double."],
      ["Born from the Toleman team.", "First win (Berger, Mexico).", "Constructors' champion.", "Last season before becoming Renault."]],
    brabham: ["Chessington, United Kingdom", "Founded by Jack Brabham and Ron Tauranac. Brabham is the only driver to have been champion in his own car (1966). Under Bernie Ecclestone and brilliant designer Gordon Murray, Nelson Piquet won the 1981 and 1983 titles, the latter the first with a turbo engine.",
      ["Jack Brabham champion in his own car.", "First title with a turbo engine."],
      ["Debut.", "First drivers' and constructors' titles.", "BT46B 'fan car', won its only race.", "Final season."]],
    tyrrell: ["Ockham, United Kingdom", "Ken Tyrrell started as an entrant with Matra chassis and won the 1969 title with Stewart. As a constructor he took the 1971 and 1973 drivers' titles and the 1971 constructors' title. His most famous creation: the six-wheeled P34.",
      ["Title double with Stewart.", "The six-wheeled P34 wins in Sweden."],
      ["First in-house chassis.", "Constructors' champion.", "Final season; the base of the future BAR."]],
    jordan: ["Silverstone, United Kingdom", "Irishman Eddie Jordan's team, famous for its spirit and for discovering talent: Michael Schumacher made his debut with Jordan at Spa 1991. It won four races, the first a one-two at Spa 1998 (Damon Hill and Ralf Schumacher). Its lineage continues today as Aston Martin.",
      ["One-two at Spa.", "Third in the constructors' championship with Frentzen."],
      ["Debut; Schumacher debuts at Spa.", "First win.", "Last season as Jordan (then Midland, Spyker, Force India, Racing Point and Aston Martin)."]],
    brawn: ["Brackley, United Kingdom", "The most incredible story of modern F1. Honda pulled out at the end of 2008; Ross Brawn bought the team for a token sum and, with the BGP 001's ingenious double diffuser and a Mercedes engine, won both titles in its only season. In 2010 it became Mercedes.",
      ["Button wins 6 of the first 7 races."],
      ["Born in March, champion in November.", "Bought by Mercedes."]],
    cooper: ["Surbiton, United Kingdom", "Cooper changed single-seater design forever by putting the engine behind the driver. It won the 1959 and 1960 titles with Jack Brabham and, within a few years, every team had copied the idea.",
      ["First title for a rear-engined car."],
      ["First win for a rear-engined car (Moss, Argentina).", "Constructors' champion.", "Final season."]],
    brm: ["Bourne, United Kingdom", "British Racing Motors was born as a British national project. After years of frustration it won the 1962 double with Graham Hill and was the first F1 team of Jackie Stewart and Niki Lauda.",
      ["Graham Hill champion."],
      ["Debut.", "First win (Bonnier, Zandvoort).", "Constructors' champion.", "Final season."]],
    matra: ["Vélizy, France", "The French aerospace company brought aviation engineering to F1. With Ken Tyrrell's team and the Cosworth DFV engine, the Matra MS80 carried Jackie Stewart to the 1969 title.",
      ["Title double with Stewart."],
      ["First win (Stewart, Zandvoort).", "Constructors' champion.", "Withdraws as a constructor."]],
    vanwall: ["Acton, United Kingdom", "Industrialist Tony Vandervell's team was the first constructors' champion in history (1958), with Stirling Moss and Tony Brooks.",
      ["First constructors' champion."],
      ["First win (Moss and Brooks, Aintree).", "Constructors' champion."]],
    alfa: ["Milan, Italy", "It dominated the first two World Championship seasons with the 158 and 159 'Alfettas': Farina champion in 1950 and Fangio in 1951. It returned in several later spells as a constructor and as a brand partnered with Sauber.",
      ["Wins every European race of the first World Championship."],
      ["First world champion (Farina).", "Fangio's first title."]],
    maserati: ["Modena, Italy", "The Maserati 250F is one of the most beautiful cars in history. In it Fangio won the 1957 title, including his legendary victory at the Nürburgring.",
      ["Fangio's fifth title."],
      ["First World Championship win (Fangio, Monza).", "Drivers' title with Fangio."]],
    aston_martin: ["Silverstone, United Kingdom", "The Aston Martin name returned to F1 in 2021 on the Silverstone operation that began as Jordan and passed through Midland, Spyker, Force India and Racing Point. Fernando Alonso joined in 2023.",
      ["Alonso takes 8 podiums."],
      ["Origin as Jordan Grand Prix.", "Debut under the Aston Martin name."]],
    alpine: ["Enstone, United Kingdom", "Heir to the Enstone team (Toleman, Benetton, Renault and Lotus F1). It won with Esteban Ocon in Hungary 2021.",
      ["Ocon's win in Hungary."], ["Origin as Toleman.", "Debut as Alpine."]],
    haas: ["Kannapolis, USA", "American team founded by Gene Haas. It scored points in its first race (Australia 2016) with Romain Grosjean.",
      ["Points on debut."], ["World Championship debut."]],
    rb: ["Faenza, Italy", "The Faenza team began as Minardi (1985-2005), became Toro Rosso (2006-2019), AlphaTauri (2020-2023) and is now Racing Bulls. Sebastian Vettel gave it a historic win at Monza 2008 and Pierre Gasly another at Monza 2020.",
      ["Vettel wins at Monza in the rain."],
      ["Debut as Minardi.", "Becomes Toro Rosso.", "First win.", "AlphaTauri; Gasly wins at Monza."]],
    audi: ["Hinwil, Switzerland", "Audi debuts in 2026 after taking over Sauber, Peter Sauber's Swiss team that arrived in F1 in 1993 and won as BMW Sauber in Canada 2008 (Robert Kubica).",
      ["BMW Sauber win in Canada."],
      ["Sauber's debut.", "Becomes BMW Sauber.", "Debut as Audi."]],
    cadillac: ["Fishers (Indiana), USA / Silverstone, United Kingdom", "The eleventh team on the grid made its debut in 2026, backed by General Motors.", [], ["World Championship debut."]],
  }, (t, v) => { t.base = v[0]; t.history = v[1]; v[2].forEach((x, i) => t.seasons[i] && (t.seasons[i].t = x)); v[3].forEach((x, i) => t.timeline[i] && (t.timeline[i].t = x)); }));
  /* ---------- Cars: [engine, layout, power, titles, wins, innovations[], story, seasons?] ---------- */
  P((D) => byId(D.cars, "key", {
    ferrari_500: ["Ferrari Tipo 500, 2.0 L inline-4 (naturally aspirated)", "Front engine, rear-wheel drive, tubular chassis", "≈ 185 hp", "Drivers 1952 and 1953 (Ascari)", "Ascari strung together 9 consecutive championship wins", ["Light, reliable four-cylinder engine against rival six- and eight-cylinders", "Designed by Aurelio Lampredi for the F2 rules adopted by the championship"], "When the World Championship adopted Formula 2 rules in 1952, Ferrari had the perfect car. The 500 was so dominant that Ascari won almost everything for two years."],
    mercedes_w196: ["Mercedes M196, 2.5 L straight-8", "Tubular chassis; streamlined 'Typ Monza' and open-wheel versions", "≈ 260–290 hp", "Drivers 1954 (partial) and 1955 (Fangio)", null, ["Direct fuel injection", "Desmodromic valve gear", "Streamlined aerodynamic bodywork"], "Aircraft-industry technology applied to a single-seater. It won on its debut at Reims in 1954 and gave Fangio two titles before Mercedes withdrew after the 1955 Le Mans tragedy."],
    maserati_250f: ["Maserati 2.5 L straight-6", "Front engine, tubular chassis", "≈ 240–270 hp", "Drivers 1957 (Fangio)", null, ["Exceptional balance and handling", "Used by dozens of private teams for years"], "Considered one of the most beautiful single-seaters ever built. In it Fangio drove, at the 1957 Nürburgring, what many consider the greatest race in history."],
    lotus_25: ["Coventry Climax FWMV, 1.5 L V8", "Mid-rear engine, aluminium monocoque chassis", "≈ 195 hp", "Drivers and constructors 1963", "Clark won 7 of the 10 races in 1963", ["First monocoque chassis of modern F1", "Almost fully reclined driving position"], "Colin Chapman replaced the tubular frame with a stiff, light monocoque. Every team would end up copying the concept."],
    lotus_49: ["Ford Cosworth DFV, 3.0 L V8", "Engine as a stressed member of the chassis", "≈ 400 hp", "Drivers and constructors 1968 (G. Hill)", "Won on its debut (Zandvoort 1967, Clark)", ["Stressed (structural) engine", "Debut of the Cosworth DFV, the most successful engine in history", "First wings and commercial livery (1968)"], "The DFV bolted straight to the monocoque changed single-seater architecture. That engine would win 155 races with different teams."],
    lotus_72: ["Ford Cosworth DFV, 3.0 L V8", "Wedge design, side-mounted radiators", "≈ 440 hp", "Drivers 1970 and 1972; constructors 1970, 1972 and 1973", null, ["Wedge shape", "Radiators in the sidepods", "Inboard brakes and torsion-bar suspension"], "One of the longest-lived and most successful cars: it raced for six seasons. Its black and gold silhouette (John Player Special) is iconic."],
    ferrari_312t: ["Ferrari 015, 3.0 L flat-12", "Transverse gearbox ('T')", "≈ 500 hp", "Drivers 1975, 1977 (Lauda) and 1979 (Scheckter)", null, ["Transverse gearbox to centralise mass", "Low, powerful 12-cylinder boxer engine"], "The 312T family took Ferrari back to the top with Niki Lauda and Mauro Forghieri, winning three drivers' and four constructors' titles.", "1975–1980 (312T family)"],
    tyrrell_p34: ["Ford Cosworth DFV, 3.0 L V8", "Six wheels: four 10-inch front wheels", "≈ 470 hp", null, "One-two at the 1976 Swedish GP (Scheckter and Depailler)", ["Four small front wheels to reduce frontal area", "Larger contact patch under braking"], "The strangest car ever to win a Grand Prix. It was quick in 1976, but development of the small front tyres stalled."],
    lotus_79: ["Ford Cosworth DFV, 3.0 L V8", "Wing car: sidepods shaped like inverted wings, with skirts", "≈ 480 hp", "Drivers and constructors 1978 (Andretti)", null, ["Full ground effect with sliding skirts", "Revolutionised aerodynamics: downforce with hardly any drag"], "'Black Beauty'. Chapman turned the whole car into an inverted wing. Andretti and Peterson scored several one-twos in 1978."],
    mclaren_mp4_4: ["Honda RA168E, 1.5 L V6 turbo", "Very low carbon-fibre chassis ('low-line')", "≈ 650–700 hp (race trim)", "Drivers (Senna) and constructors 1988", "15 wins in 16 races", ["Extremely low profile", "Fuel efficiency of the Honda under the 1988 turbo fuel limit"], "Probably the most dominant car in history by win percentage. Only Monza 1988 got away."],
    williams_fw14b: ["Renault RS3C / RS4, 3.5 L V10", "Computer-controlled active suspension", "≈ 750–780 hp", "Drivers (Mansell) and constructors 1992", "10 wins in 16 races", ["Active suspension", "Traction control", "Semi-automatic gearbox"], "The most technologically advanced car of its time, designed by Adrian Newey and Patrick Head. Mansell won the first five races of the year."],
    ferrari_f2002: ["Ferrari Tipo 051, 3.0 L V10", "Carbon-fibre chassis, titanium gearbox", "≈ 835 hp", "Drivers (Schumacher) and constructors 2002", "Ferrari won 15 of the 17 races in 2002", ["Compact titanium gearbox", "Periscope exhausts"], "In it Schumacher finished on the podium in every race of 2002 and clinched the title in France, in July."],
    ferrari_f2004: ["Ferrari Tipo 053, 3.0 L V10", "Evolution of the F2003-GA", "≈ 865–900 hp", "Drivers (Schumacher) and constructors 2004", "15 wins in 18 races", ["Peak of the V10 era", "Several of its lap records stood for over a decade"], "The pinnacle of the Schumacher-Brawn-Byrne-Todt era. Schumacher won 12 of the first 13 races."],
    renault_r25: ["Renault RS25, 3.0 L V10 (72°)", "Wide-angle V10 to lower the centre of gravity", "≈ 900 hp", "Drivers (Alonso) and constructors 2005", "8 wins", ["Mass damper", "Wide-angle V10 engine"], "The car that ended Ferrari's hegemony and made Alonso the youngest champion of his time."],
    brawn_bgp001: ["Mercedes FO 108W, 2.4 L V8", "Double diffuser", "≈ 750 hp", "Drivers (Button) and constructors 2009", "8 wins", ["Double diffuser, a reading of the new 2009 aerodynamic rules"], "Designed as a Honda, rescued at the last minute and champion in its only year of existence."],
    red_bull_rb9: ["Renault RS27, 2.4 L V8 + KERS", "Coanda-effect exhausts", "≈ 750 hp + KERS", "Drivers (Vettel) and constructors 2013", "13 wins (all Vettel's)", ["Using exhaust gases for rear downforce (Coanda effect)"], "Vettel won the last nine races of 2013 and closed the V8 era."],
    mercedes_w11: ["Mercedes-AMG M11 EQ Performance, 1.6 L V6 turbo hybrid", "Power unit with MGU-K and MGU-H", "Not officially published (estimates above 1,000 hp combined)", "Drivers (Hamilton) and constructors 2020", "13 wins in 17 races", ["DAS (Dual Axis Steering): toe adjustment by moving the steering wheel", "Black livery"], "Considered the fastest car of the hybrid era. In it Hamilton equalled Schumacher's seven titles."],
    red_bull_rb19: ["Honda RBPT H001, 1.6 L V6 turbo hybrid", "Ground effect (2022 rules)", "Not officially published", "Drivers (Verstappen) and constructors 2023", "21 wins in 22 races", ["Mastery of the ground-effect concept", "Aerodynamic efficiency and a very powerful DRS"], "The car with the highest win percentage in a season. Verstappen won 19 races, an all-time record."],
    mclaren_mcl39: ["Mercedes-AMG M16, 1.6 L V6 turbo hybrid", "Last car of the 2022–2025 ground-effect generation", "Not officially published", "Drivers (Norris) and constructors 2025", null, ["Highly effective tyre thermal management"], "The car with which McLaren retained the constructors' title and Lando Norris won his first championship."],
  }, (c, v) => { [c.engine, c.layout, c.power, c.titles, c.wins, c.innovations, c.story] = v; if (v[7]) c.seasons = v[7]; }));

  /* ---------- Circuits: [short, country, city, dir, desc, moments[]] ---------- */
  P((D) => byId(D.circuits, "key", {
    monaco: ["Monaco", "Monaco", "Monte Carlo", "Clockwise", "Narrow streets, barriers inches away and the tunnel. Overtaking is almost impossible: qualifying decides nearly everything.", ["1984: Senna dazzles in the rain in a Toleman", "1988: Senna, leading comfortably, crashes at Portier", "1992: Senna holds off Mansell in the closing laps", "1996: Panis wins and only three cars cross the finish line"]],
    spa: ["Spa-Francorchamps", "Belgium", "Stavelot", "Clockwise", "Many drivers' favourite circuit: Eau Rouge-Raidillon, Pouhon, Blanchimont and weather that can be dry at one corner and wet at the next.", ["1991: Michael Schumacher's debut", "1998: Jordan's first win in a chaotic race", "2000: Häkkinen passes Schumacher around a backmarker"]],
    monza: ["Monza", "Italy", "Monza", "Clockwise", "The temple of speed. Endless straights, minimal downforce and the passion of the tifosi flooding the straight after the race.", ["1967: Jim Clark's epic comeback", "1971: the closest finish in history (0.01 s)", "2008: Vettel wins with Toro Rosso in the rain", "2019: Leclerc brings victory back to Ferrari at home"]],
    suzuka: ["Suzuka", "Japan", "Suzuka", "Clockwise (figure-of-eight layout)", "The only figure-of-eight layout on the calendar. The Esses, Degner, Spoon and 130R make it a complete technical exam.", ["1989: the first of two Senna-Prost clashes (1989 and 1990) that decided titles", "2005: Räikkönen wins from 17th and Alonso passes Schumacher at 130R"]],
    silverstone: ["Silverstone", "United Kingdom", "Silverstone", "Clockwise", "A former airfield and host of the first World Championship race in 1950. Maggotts, Becketts and Chapel form one of the fastest sequences in the world.", ["1950: the first race in World Championship history", "1987: Mansell passes Piquet at Stowe", "2008: Hamilton's masterclass in the rain"]],
    interlagos: ["Interlagos", "Brazil", "São Paulo", "Anticlockwise", "Anticlockwise, undulating and with unpredictable weather. The stage for some of the most dramatic championship finales.", ["1991: Senna wins stuck in sixth gear", "2008: Hamilton champion at the last corner", "2012: Vettel champion after spinning at the start", "2016: the first of Verstappen's wet-weather masterclasses (2016 and 2024)"]],
    nurburgring: ["Nürburgring", "Germany", "Nürburg", "Clockwise", "The 'Green Hell'. The World Championship raced on the 22-km-plus Nordschleife until 1976; afterwards on the modern GP-Strecke.", ["1957: Fangio drives the race of his life", "1976: Lauda's crash ends the Nordschleife's F1 era"]],
    imola: ["Imola", "Italy", "Imola", "Anticlockwise", "An anticlockwise, technical circuit named after Enzo Ferrari and his son Dino. Forever linked to the tragic weekend of 1994.", ["1982: Pironi ignores team orders against Villeneuve", "1994: Ratzenberger and Senna are killed", "2005: the Alonso-Schumacher duels (2005 and 2006)"]],
    americas: ["COTA", "United States", "Austin", "Anticlockwise", "A modern design with nods to classic corners and a spectacular climb up to turn 1.", ["2012: first GP in Austin, won by Hamilton", "2015: Hamilton becomes a three-time champion"]],
    marina_bay: ["Marina Bay", "Singapore", "Singapore", "Anticlockwise", "F1's first night race (2008). Heat, humidity and walls: one of the most physically demanding events.", ["2008: the first night race in history"]],
    yas_marina: ["Yas Marina", "United Arab Emirates", "Abu Dhabi", "Anticlockwise", "The usual venue for the last race of the year, with its day-to-night transition.", ["2010: Vettel champion for the first time", "2021: the Verstappen-Hamilton last lap", "2025: Norris champion by two points"]],
    albert_park: ["Albert Park", "Australia", "Melbourne", "Clockwise", "A semi-street circuit around a lake, the usual championship opener.", ["2009: Brawn GP wins with a one-two on its debut"]],
    villeneuve: ["Montreal", "Canada", "Montreal", "Clockwise", "On an artificial island in the St Lawrence River. Brutal braking zones and the famous 'Wall of Champions'.", ["1978: Gilles Villeneuve wins the first race at the circuit", "2007: Hamilton's first win", "2011: Button wins the longest race in history"]],
    red_bull_ring: ["Red Bull Ring", "Austria", "Spielberg", "Clockwise", "Short, fast and deep in the Styrian mountains. Formerly the Österreichring and A1-Ring.", ["2019: Verstappen passes Leclerc late on", "2020: opens the pandemic season"]],
  }, (c, v) => { [c.short, c.country, c.city, c.dir, c.desc, c.moments] = v; }));

  /* ---------- Moments: [title, circuit, context, desc, result] ---------- */
  P((D) => {
    Object.assign(D.playTypes, { adelantamiento: "Overtake", remontada: "Comeback", defensa: "Defence", final: "Epic finale", estrategia: "Strategy", lluvia: "In the rain", ultima: "Last lap", accidente: "Safety / crash" });
    byId(D.plays, "id", {
      "senna-donington-93": ["The lap of the gods", "Donington Park", "European GP. Senna was driving a McLaren with a customer Ford engine, clearly inferior to the Williams-Renaults of Prost and Hill.", "In the rain, Senna starts fifth, drops to sixth at the start and in a single lap passes Schumacher, Wendlinger, Hill and Prost to lead across the line.", "Senna wins, lapping everyone except Hill."],
      "hakkinen-spa-00": ["Häkkinen, Schumacher and the backmarker", "Spa-Francorchamps", "The 2000 title fight. A lap earlier Schumacher had squeezed Häkkinen at more than 300 km/h.", "Climbing towards Les Combes, the two catch backmarker Ricardo Zonta. Schumacher passes him on the left, Zonta stays in the middle and Häkkinen dives to the right: he overtakes both in a single move.", "Häkkinen wins."],
      "alonso-130r-05": ["Alonso around the outside at 130R", "Suzuka", "Alonso was already champion. He started near the back after a wet qualifying session.", "Alonso passes Michael Schumacher around the outside of 130R, a corner taken almost flat out. The same day, Räikkönen won by passing Fisichella on the last lap after starting 17th.", "Räikkönen wins; Alonso third."],
      "hamilton-brasil-08": ["Champion at the last corner", "Interlagos", "Hamilton needed to finish fifth. Massa won the race at home.", "With rain in the final minutes, Vettel passed Hamilton and dropped him to sixth. Massa crossed the line as champion… until Hamilton passed Glock, who was on dry tyres, at the penultimate corner.", "Hamilton champion by one point."],
      "button-canada-11": ["Button: from last to first", "Montreal", "A race stopped for more than two hours by rain: the longest in history.", "Six pit stops, a drive-through and contact with Hamilton and Alonso. He even ran last. On the final lap he pressured Vettel, who made a mistake, and Button took the lead.", "Button wins."],
      "vettel-brasil-12": ["Spins at the start and wins the title", "Interlagos", "Vettel arrived with a 13-point lead over Alonso.", "Hit on the first lap, Vettel spun and dropped to last with a damaged car. He fought back in changing wet conditions to sixth place.", "Vettel triple champion by 3 points."],
      "verstappen-brasil-16": ["Verstappen, master of the rain", "Interlagos", "A race of red flags and constant aquaplaning.", "Aged 19, after a pit stop left him far out of the points, Verstappen charged through the last 15 laps to the podium using lines nobody else dared to try.", "Third; Hamilton wins."],
      "austria-19": ["Wheel to wheel with Leclerc", "Red Bull Ring", "Verstappen dropped to eighth at the start.", "He fought back and, with two laps to go, dived up the inside of Leclerc at turn 3. There was contact and the stewards investigated after the race.", "Verstappen wins, confirmed by the stewards."],
      "abu-dhabi-21": ["The most controversial last lap", "Yas Marina", "Hamilton and Verstappen arrived at the final race level on points.", "Hamilton was in control when a late safety car changed everything. The handling of the lapped cars left a single racing lap: Verstappen, on fresh tyres, passed at turn 5.", "Verstappen champion. The FIA later reviewed its race-direction procedures."],
      "dijon-79": ["Villeneuve vs Arnoux: an eternal duel", "Dijon-Prenois", "While Jabouille gave Renault's turbo engine its first win, another battle raged behind.", "The wildest closing laps ever seen: wheels banging, lock-ups and passes at every corner for second place between Villeneuve's Ferrari and René Arnoux's Renault.", "Villeneuve second, Arnoux third."],
      "brasil-24": ["From 17th to winner in the deluge", "Interlagos", "Handed a five-place penalty for an engine change, he started 17th.", "In extreme conditions, Verstappen passed car after car and went on to win by a huge margin over the two Alpines.", "Verstappen wins, a key step towards his fourth title."],
      "monaco-92": ["Senna holds off Mansell at Monaco", "Monaco", "Mansell had won the first five races of the year with the FW14B.", "An unscheduled stop for Mansell left Senna in the lead. On fresh tyres and several seconds faster, Mansell attacked at every corner in the closing laps, but Senna closed every gap.", "Senna wins by 0.2 seconds."],
      "alonso-hungria-21": ["Alonso's wall", "Hungaroring", "Hamilton was closing in on much fresher tyres and in a superior car.", "For several laps Alonso defended his position against Hamilton, allowing his team-mate Esteban Ocon to escape towards his first win.", "Ocon wins, Alpine's first victory."],
      "schumacher-hungria-98": ["The qualifying-laps strategy", "Hungaroring", "The McLarens were faster and overtaking in Hungary was almost impossible.", "Ross Brawn switched to a three-stop strategy mid-race and asked Schumacher to lap at qualifying pace for a long series of laps to win the position in the pits.", "Schumacher wins."],
      "fangio-nurburgring-57": ["Fangio in the Green Hell", "Nürburgring", "Fangio started on low fuel to make a stop; the Ferraris of Hawthorn and Collins were running non-stop.", "A slow stop left him almost a minute behind. Fangio, aged 46, broke the lap record again and again on the 22-km Nordschleife and passed both Ferraris on the penultimate lap.", "Fangio wins and takes his fifth title."],
      "clark-monza-67": ["Jim Clark's comeback", "Monza", "Clark was leading in the Lotus 49 when he suffered a puncture.", "He lost a whole lap, but carved through the field to retake the lead. On the last lap, the fuel failed to feed the engine properly.", "Third; Surtees wins by inches from Brabham."],
      "grosjean-bahrein-20": ["The Halo that saved Grosjean", "Bahrain", "First lap of the 2020 Bahrain GP.", "Romain Grosjean's Haas pierced a barrier, split in two and caught fire. The Halo protected his head and the survival cell held: he walked out after almost 30 seconds in the flames, with burns to his hands.", "Grosjean survived; the crash became the ultimate proof of the Halo's value."],
    }, (p, v) => { [p.title, p.circuit, p.context, p.desc, p.result] = v; });
  });

  /* ---------- Rivalries: [tagline, story[], decisive texts[]] ---------- */
  P((D) => byId(D.rivalries, "id", {
    "senna-prost": ["The greatest rivalry in history", [
      "In 1988 McLaren paired the two best drivers in the world in the best car, the MP4/4. They won 15 of 16 races and Senna took the title. The partnership broke down in 1989: accusations of favouritism, a broken agreement at Imola and a tension that came to a head at Suzuka.",
      "At Suzuka 1989 Prost shut the door at the chicane and they collided; Senna rejoined, won and was disqualified, handing the title to Prost. A year later, at the same track, Senna rammed Prost (now at Ferrari) at the first corner and sealed the championship. Reconciliation came on the Adelaide podium in 1993, at Prost's last race."],
      ["Suzuka 1988: Senna stalls at the start, fights back and wins his first title.", "Suzuka 1989: collision at the chicane, Senna disqualified, title to Prost.", "Suzuka 1990: collision at turn 1, title to Senna.", "Adelaide 1993: Prost's last race and an embrace on the podium."]],
    "hunt-lauda": ["Two opposite personalities, one title by one point", [
      "Lauda, methodical and calculating, was dominating 1976 with Ferrari. Hunt, charismatic and impulsive, drove the McLaren M23. In August, Lauda suffered a terrible fiery crash at the Nürburgring and was given the last rites.",
      "Just 42 days later he was racing again at Monza. The title was decided at Fuji in a downpour: Lauda withdrew voluntarily, judging the conditions too dangerous, and Hunt, third, was champion by one point. Off track they were friends."],
      ["Nürburgring 1976: Lauda's crash.", "Monza 1976: Lauda's comeback, fourth.", "Fuji 1976: Lauda withdraws, Hunt champion by one point."]],
    "schumacher-hakkinen": ["Absolute respect between two rivals", [
      "Ferrari against McLaren in the V10 era. Häkkinen won the 1998 and 1999 titles (the latter with Schumacher injured for half the season) and Schumacher took 2000, Ferrari's first since 1979.",
      "Schumacher has said on several occasions that the Finn was the rival he respected most. Their great moment: Häkkinen's overtake at Spa 2000."],
      ["Suzuka 1998: Schumacher stalls on the grid and Häkkinen is champion.", "Spa 2000: the pass around Zonta.", "Suzuka 2000: Schumacher wins and is champion with Ferrari."]],
    "alonso-hamilton": ["The double champion against the rookie", [
      "In 2007 McLaren paired double champion Fernando Alonso with a rookie, Lewis Hamilton, who stunned everyone by fighting for the title from the very first race. The internal tension exploded in qualifying in Hungary, when Alonso held Hamilton up in the pits.",
      "They finished level on points (109), one behind Kimi Räikkönen, who won the title at the last race. Alonso returned to Renault the following year."],
      ["Hungary 2007: the pit-lane incident in qualifying.", "Brazil 2007: Räikkönen wins the title by one point over both."]],
    "hamilton-rosberg": ["Childhood friends, rivals at Mercedes", [
      "They had known each other since karting. At Mercedes, with the best car of the hybrid era, their friendship turned into psychological warfare: incidents at Monaco 2014, the touch at Spa 2014 and the double retirement in Barcelona 2016.",
      "Hamilton won the 2014 and 2015 titles. In 2016 Rosberg prevailed by five points and announced his retirement just five days later."],
      ["Spa 2014: contact on the second lap.", "Barcelona 2016: both out on the first lap.", "Abu Dhabi 2016: Rosberg second, champion by five points."]],
    "hamilton-verstappen": ["The 2021 season", [
      "The seven-time champion against the new generation. Throughout 2021 they traded wins and incidents: Silverstone (the clash at Copse), Monza (the Red Bull on top of the Mercedes, with the Halo protecting Hamilton) and Jeddah.",
      "They arrived in Abu Dhabi level on points. The handling of the final safety car left a single lap and Verstappen won his first title. The FIA then reformed race direction."],
      ["Silverstone 2021: contact at Copse.", "Monza 2021: both out; the Halo protects Hamilton.", "Abu Dhabi 2021: the last lap."]],
  }, (r, v) => { r.tagline = v[0]; r.story = v[1]; v[2].forEach((x, i) => r.decisive[i] && (r.decisive[i].text = x)); }));

  /* ---------- Decades: [title, kicker, context[], tech[], rules[], rivalries[], races texts[]] ---------- */
  P((D) => byId(D.decades, "key", {
    1950: ["The pioneers", "Front engines · No seat belts · Unprotected circuits", [
      "On 13 May 1950, at the former Silverstone airfield and in front of King George VI, the first race of the Drivers' World Championship was held. The cars had front engines, narrow tyres and no protection at all: drivers raced in cloth or cork helmets and without seat belts.",
      "The decade belonged to Juan Manuel Fangio, five-time champion with four different teams. Alfa Romeo dominated the early years, Ferrari won with Ascari, Mercedes arrived with aircraft technology and, by the end of the decade, the small rear-engined British Coopers heralded a revolution."],
      ["Supercharged (Alfa 158) and naturally aspirated front engines", "Direct injection and desmodromic valves on the Mercedes W196", "Disc brakes (Vanwall)", "The rear engine arrives (Cooper, 1957-1959)"],
      ["1950: 1.5 L supercharged or 4.5 L naturally aspirated engines", "1952-1953: the championship adopts F2 rules (2.0 L)", "1954: 2.5 L naturally aspirated engines", "1958: the constructors' championship is born; aviation fuel compulsory"],
      ["Fangio against Ascari", "Moss against Hawthorn (1958)"], ["First World Championship race", "Fangio's masterpiece", "Hawthorn, champion by one point"]],
    1960: ["The British revolution", "Rear engines · Monocoque · First wings", [
      "The British teams, the 'garagistes' as Enzo Ferrari disdainfully called them, took power. Cooper, Lotus, BRM and Brabham won with light rear-engined cars. Colin Chapman introduced the monocoque chassis with the Lotus 25 and the engine as a stressed member with the Lotus 49.",
      "Jim Clark was the great star until his death in 1968. In the same era came the first wings and, in 1968, sponsors on the bodywork: the end of national racing colours."],
      ["Monocoque chassis (Lotus 25, 1962)", "Ford Cosworth DFV engine as a stressed member (1967)", "First wings (1968)", "Wider tyres and specific compounds"],
      ["1961: 1.5 L engines", "1966: 3.0 L engines ('the return of power')", "1968: advertising allowed on the cars", "1969: high wings restricted after several accidents"],
      ["Clark against Graham Hill", "Surtees and Ferrari against the British teams"], ["Winning debut for the Lotus 49 and the DFV", "Clark's comeback", "Surtees, champion at the last race"]],
    1970: ["Speed, danger and ground effect", "Cosworth DFV · Safety · Wing cars", [
      "The most colourful decade and also one of the most dangerous. The Cosworth DFV engine let many teams compete with a chance of winning. Jackie Stewart led the fight for safety, and barriers, medical services and circuits were improved.",
      "Ferrari returned to the top with Lauda. 1976 brought the Nürburgring drama and the Fuji finale against Hunt. By the end of the decade the Lotus 79 had discovered ground effect and Renault had introduced the turbo engine, which won for the first time in 1979."],
      ["Wedge design and side radiators (Lotus 72)", "Six wheels (Tyrrell P34)", "Ground effect with skirts (Lotus 79)", "First turbo engine (Renault, 1977)"],
      ["Deformable fuel tanks and fire extinguishers made compulsory", "1976: the Nürburgring Nordschleife leaves the calendar", "1978: Brabham withdraws the BT46B 'fan car' after a single race"],
      ["Hunt against Lauda", "Villeneuve against Arnoux (Dijon 1979)"], ["The closest finish: 0.01 s", "Hunt champion in the deluge", "Villeneuve-Arnoux and the first turbo win"]],
    1980: ["The turbo era", "Over 1,000 hp in qualifying · Carbon fibre", [
      "The FISA-FOCA war over control of the sport marked the start of the decade. Turbo engines reached colossal power in qualifying and in 1981 McLaren introduced the carbon-fibre chassis, which revolutionised safety.",
      "Williams, McLaren and Brabham dominated. The decade ended with the greatest rivalry in history: Senna against Prost inside McLaren. Turbos were banned at the end of 1988."],
      ["Carbon-fibre chassis (McLaren MP4/1, 1981)", "1.5 L turbo engines with enormous qualifying power", "In-race refuelling (1982-1983)", "First semi-automatic gearboxes (Ferrari, 1989)"],
      ["1983: flat floors, end of skirts and ground effect", "1984: in-race refuelling banned", "1987-1988: turbo boost and fuel limits", "1989: 3.5 L naturally aspirated engines only"],
      ["Senna against Prost", "Piquet against Mansell (Williams, 1986-1987)"], ["Senna and Bellof in the rain", "Prost champion after Mansell's tyre blow-out", "The Senna-Prost collision"]],
    1990: ["Electronics, tragedy and rebirth", "Active suspension · Imola 1994 · Safety revolution", [
      "Williams dominated with electronics: active suspension, traction control and semi-automatic gearboxes. Driver aids were banned in 1994, the same year as the tragic Imola weekend in which Roland Ratzenberger and Ayrton Senna were killed.",
      "The FIA drove a safety revolution: tougher crash tests, side head protection, modified circuits. Michael Schumacher became the new benchmark, first with Benetton and then rebuilding Ferrari, while Häkkinen and McLaren dominated the end of the decade."],
      ["Active suspension and traction control (until 1993)", "Refuelling returns (1994)", "3.0 L V10 engines from 1995", "Grooved tyres (1998)"],
      ["1994: electronic driver aids banned", "1995: 3.0 L engines", "1996: side head protection in the cockpit", "1998: narrower cars and grooved tyres"],
      ["Schumacher against Hill", "Schumacher against Villeneuve (Jerez 1997)", "Schumacher against Häkkinen"], ["The lap of the gods", "Senna holds off Mansell", "The Schumacher-Villeneuve collision"]],
    2000: ["The V10 era and the red empire", "19,000 rpm engines · Ferrari · Alonso", [
      "Ferrari, with Schumacher, Brawn, Byrne and Todt, won five consecutive titles (2000-2004) in the era of the screaming V10s. Fernando Alonso and Renault ended the hegemony in 2005 and 2006.",
      "V8s arrived in 2006. Räikkönen won in 2007 by one point, Hamilton in 2008 at the last corner and, in 2009, Brawn GP wrote a fairy tale with the double diffuser after Honda's withdrawal."],
      ["3.0 L V10s above 19,000 rpm", "2.4 L V8s from 2006", "KERS, the first hybrid system (2009)", "Double diffuser (2009)"],
      ["2003: new points system down to 8th place", "2005: one set of tyres for qualifying and the race", "2008: traction control banned; standard ECU", "2009: slick tyres and new aerodynamics"],
      ["Schumacher against Alonso", "Alonso against Hamilton (2007)"], ["Häkkinen and the backmarker", "Räikkönen from 17th", "Hamilton champion at the last corner"]],
    2010: ["Red Bull, the hybrid arrives and Mercedes", "DRS · Pirelli · Power units", [
      "Sebastian Vettel and Red Bull won four consecutive doubles (2010-2013). 2011 brought DRS and high-degradation Pirelli tyres, which multiplied overtaking.",
      "In 2014 the 1.6 L V6 turbo hybrid power units were introduced. Mercedes built the most dominant era in history, with Hamilton and Rosberg fighting in-house and, later, Hamilton against Vettel and Ferrari."],
      ["DRS: movable rear wing (2011)", "V6 turbo hybrid power units with MGU-K and MGU-H (2014)", "Halo compulsory (2018)", "Wider, faster cars (2017)"],
      ["2010: 25-18-15-12-10-8-6-4-2-1 points system; refuelling banned", "2014: permanent driver numbers", "2017: new aerodynamic rules", "2019: extra point for fastest lap"],
      ["Vettel against Alonso", "Hamilton against Rosberg", "Hamilton against Vettel"], ["Button from last to first", "Vettel champion after spinning", "Verstappen in the rain"]],
    2020: ["Ground effect, Verstappen and a new revolution", "Budget cap · Ground effect · 2026 rules", [
      "The 2020 pandemic forced the calendar to be redrawn. 2021 brought the budget cap and an unforgettable season between Hamilton and Verstappen. Ground effect returned in 2022 and Red Bull dominated with Verstappen, who won four consecutive titles (2021-2024).",
      "McLaren returned to the top with the 2024 and 2025 constructors' titles, and Lando Norris was champion in 2025. 2026 brought a new revolution: smaller, lighter cars, active aerodynamics, farewell to DRS, engines with a much bigger electric share and sustainable fuels; Audi and Cadillac also made their debuts."],
      ["Ground effect with Venturi tunnels (2022)", "18-inch wheels (2022)", "2026: active aerodynamics (straight and corner modes) and Overtake Mode", "2026: no MGU-H; almost 50/50 power split between combustion and electricity"],
      ["2021: budget cap", "2021: sprint format", "2025: fastest-lap point removed", "2026: new technical and power-unit rules"],
      ["Hamilton against Verstappen (2021)", "Norris against Verstappen (2024-2025)"], ["The last lap", "Verstappen from 17th", "Norris champion by two points"]],
  }, (d, v) => { [d.title, d.kicker, d.context, d.tech, d.rules, d.rivalries] = v; v[6].forEach((x, i) => d.races[i] && (d.races[i].t = x)); }));

  /* ---------- Timeline (by index, same order as timeline.js) ---------- */
  P((D) => {
    Object.assign(D.timelineCats, { campeonatos: "Championships", pilotos: "Drivers", escuderias: "Teams", tecnologia: "Technology", reglamento: "Rules", seguridad: "Crashes and safety", gp: "Grands Prix" });
    const T = [
      ["The World Championship is born", "Silverstone hosts the first race. Nino Farina wins and will become the first champion."],
      ["The Le Mans tragedy", "The crash at the 24 Hours of Le Mans (outside F1) leads Mercedes to withdraw from motorsport and several countries to suspend racing."],
      ["Fangio at the Nürburgring", "Aged 46, Fangio drives the race of his life and wins his fifth title."],
      ["First constructors' championship", "Vanwall becomes the first constructors' champion."],
      ["The rear engine triumphs", "Jack Brabham wins the title in the rear-engined Cooper. Within a few years every car will copy it."],
      ["The monocoque", "The Lotus 25 introduces the monocoque chassis: stiffer, lighter and safer."],
      ["Brabham, champion in his own car", "Jack Brabham achieves an unrepeatable feat: world champion in a car bearing his name."],
      ["The Cosworth DFV debuts", "The Ford Cosworth DFV engine wins on its debut in the Lotus 49. It will be the most successful engine in history."],
      ["Sponsors arrive", "Lotus unveils commercial colours. The era of national colours ends."],
      ["Rindt, posthumous champion", "Jochen Rindt is killed at Monza but no rival beats his points total."],
      ["Lauda, Hunt and Fuji", "Lauda's crash at the Nürburgring, his comeback 42 days later and Hunt's title by one point."],
      ["The first turbo engine", "Renault debuts with a 1.5 L turbo engine. It will win in 1979 and open the turbo era."],
      ["Ground effect", "The Lotus 79 turns the car into an inverted wing. Mario Andretti is champion."],
      ["Carbon fibre", "The McLaren MP4/1 introduces the carbon-fibre chassis, the foundation of modern safety."],
      ["15 out of 16", "Senna and Prost win 15 of 16 races with the McLaren MP4/4."],
      ["Suzuka 1989", "Senna and Prost collide at the chicane; Prost wins the title."],
      ["The peak of electronics", "The Williams FW14B, with active suspension, carries Mansell to the title."],
      ["The lap of the gods", "Senna passes four rivals on the first lap in the rain at Donington."],
      ["Imola changes F1", "The deaths of Ratzenberger and Senna trigger a safety revolution that has saved countless lives."],
      ["Ferrari wins again", "Schumacher gives Ferrari its first drivers' title since 1979. Four more will follow."],
      ["HANS compulsory", "The HANS device, which protects the head and neck, becomes compulsory."],
      ["Alonso, youngest champion", "Fernando Alonso ends Ferrari's hegemony with Renault."],
      ["Champion at the last corner", "Hamilton wins the title by passing Glock at the penultimate corner of Interlagos."],
      ["The Brawn miracle", "A team born from the ashes of Honda wins both titles with the double diffuser."],
      ["DRS arrives", "The movable rear wing is introduced to make overtaking easier."],
      ["Hybrid era", "1.6 L V6 turbo hybrid power units. Mercedes' dominance begins."],
      ["The Halo", "The head-protection device becomes compulsory."],
      ["Grosjean survives", "The Halo and the survival cell save Romain Grosjean in Bahrain."],
      ["Budget cap and a nail-biting finale", "First year with a spending limit. Verstappen wins the title on the last lap in Abu Dhabi."],
      ["Ground effect returns", "New cars with Venturi tunnels so they can follow another car closely."],
      ["21 out of 22", "Red Bull wins 21 of 22 races; Verstappen sets the record of 19 wins."],
      ["Norris champion", "Lando Norris wins the title by two points over Verstappen and McLaren retains the constructors' crown."],
      ["The 2026 revolution", "Active aerodynamics, farewell to DRS, Overtake Mode, engines almost 50% electric and sustainable fuel. Audi and Cadillac make their debuts."],
    ];
    D.timeline.forEach((e, i) => { if (T[i]) [e.title, e.text] = T[i]; });
  });

  /* ---------- Technology ---------- */
  P((D) => {
    byId(D.tech, "key", {
      aero: ["Aerodynamics", "The air pushes the car into the ground.", "The wings and the floor work like upside-down aircraft wings: they generate downforce that presses the car into the tarmac and lets it take corners at speeds impossible for a normal car. The challenge is to produce lots of downforce with as little drag as possible.", "At high speed an F1 car generates more downforce than its own weight."],
      activeaero: ["DRS and active aerodynamics", "From the movable wing (2011-2025) to the active aero of 2026.", "Between 2011 and 2025, DRS let a driver open a flap in the rear wing in set zones when within one second of the car ahead. From 2026 DRS is gone: front and rear wings are movable for everyone, with a low-drag 'straight mode' in designated zones and a maximum-downforce 'corner mode'. For overtaking there is Overtake Mode, which provides extra electrical energy when within one second of a rival.", "Overtake Mode is not free speed: it uses battery energy that then has to be recovered."],
      floor: ["Ground effect", "The floor 'sucks' the car down onto the tarmac.", "Venturi-tunnel channels under the car accelerate the air and create a low-pressure area that sucks the car towards the ground. Discovered by Lotus in 1977-1978, banned in 1983 and brought back in 2022 to generate downforce without disturbing the air for the following car so much.", "2022 ground effect caused 'porpoising': violent bouncing at high speed."],
      suspension: ["Suspension", "Keeps the aerodynamic platform stable.", "In F1 the suspension is not about comfort but about holding the exact ride height and attitude so the aerodynamics work. Carbon-fibre wishbones and push-rod or pull-rod systems transmit the forces to springs and dampers inside the chassis.", "Electronic active suspension (Williams FW14B) has been banned since 1994."],
      brakes: ["Brakes", "Carbon discs at over 1,000 °C.", "Carbon-carbon brakes take the car from over 300 km/h to 80 km/h in a few dozen metres. On the rear axle, the brake-by-wire system blends conventional braking with energy recovery by the electric motor.", "Under the heaviest braking the driver endures decelerations of around 5 G."],
      tyres: ["Tyres", "The only contact with the ground.", "Pirelli supplies the tyres: dry compounds (hard, medium and soft, chosen from a range for each GP), intermediates for damp tracks and full wets. Each compound offers a different balance between grip and life, the basis of strategy.", "In a dry race, using at least two different compounds is compulsory."],
      ice: ["Combustion engine", "1.6 L V6 turbo.", "Since 2014 F1 has used 1.6-litre V6 turbo engines with direct injection. In 2026 the architecture stays, but with 100% sustainable fuel and less power from the combustion engine, offset by much more electrical power.", "F1 hybrid power units exceed 50% thermal efficiency, an exceptional figure for a combustion engine."],
      hybrid: ["Hybrid systems and ERS", "Recovering energy to use it again.", "The ERS (Energy Recovery System) recovers energy under braking through the MGU-K and stores it in a battery to deliver it back as extra power. Until 2025 there was also the MGU-H, which recovered energy from the turbo's exhaust gases; in 2026 it disappears and the MGU-K becomes much more powerful, with a split close to 50/50 between combustion and electricity.", "In 2026 the car recovers roughly twice as much energy per lap as under the previous rules."],
      gearbox: ["Gearbox", "8 gears in milliseconds.", "Semi-automatic 8-speed sequential gearboxes operated with paddles on the steering wheel. 'Seamless' shifts barely interrupt power delivery. The gearbox is also a structural part of the car: the rear suspension and impact structure are mounted on it.", "Ferrari introduced the paddle-shift semi-automatic gearbox in 1989."],
      telemetry: ["Telemetry", "Hundreds of sensors in real time.", "Hundreds of sensors measure temperatures, pressures, speeds, loads and positions. The data is sent in real time to the pit wall and the factory, where engineers analyse performance and spot problems before they happen.", "Since 2003 teams cannot change the car by telemetry during the race: only the driver can change settings."],
      pitstop: ["Pit stops", "Changing four wheels in about 2 seconds.", "Around 20 coordinated mechanics lift the car, change all four wheels and release it. In-race refuelling has been banned since 2010, so the stop is only for tyres (or to repair the front wing).", "The fastest stops in history are under 2 seconds."],
      strategy: ["Race strategy", "When to stop and on which tyres.", "Strategists simulate thousands of scenarios: tyre degradation, traffic, safety cars, rain… Concepts such as the 'undercut' (stopping before a rival to beat them on fresh tyres) or the 'overcut' decide races.", "A safety car can roughly halve the time lost in a pit stop."],
      halo: ["Safety and the Halo", "A titanium arch that protects the head.", "The Halo, compulsory since 2018, is a titanium arch over the cockpit able to withstand enormous loads. Together with the carbon-fibre survival cell, HANS, modern barriers and medical teams, it has made F1 a far safer sport.", "The Halo was decisive in crashes such as Grosjean's (Bahrain 2020) and Zhou's (Silverstone 2022)."],
      cockpit: ["Steering wheel and cockpit", "A computer in the driver's hands.", "The steering wheel integrates a display, shift paddles and dozens of buttons and rotaries to adjust brake balance, differential, engine and energy modes or talk on the radio. The driver sits almost lying down, with the legs above the hips.", "A modern F1 steering wheel can cost tens of thousands of euros."],
    }, (x, v) => { [x.title, x.short, x.text, x.fact] = v; });
    const E = [["Front engine", "Tubular chassis, narrow tyres, no seat belt."], ["Rear engine and monocoque", "Cooper and Lotus change the architecture."], ["Wings", "Aerodynamics begins to generate downforce."], ["Turbo and ground effect", "Renault and Lotus open two new paths."], ["Carbon fibre", "Lighter and far safer chassis."], ["Electronics", "Semi-automatic gearbox, active suspension."], ["V10 era", "3.0 L engines above 19,000 rpm."], ["KERS", "The first hybrid recovery system."], ["V6 turbo hybrids", "MGU-K + MGU-H, record efficiency."], ["Halo", "Head protection made compulsory."], ["Ground effect", "Venturi tunnels and 18\" wheels."], ["Active aero and 50/50", "No DRS or MGU-H, sustainable fuel."]];
    D.techEvolution.forEach((s, i) => { if (E[i]) [s.t, s.d] = E[i]; });
  });

  /* ---------- Rules ---------- */
  P((D) => {
    const R = D.rules;
    const W = [["Friday", "Practice 1 and 2", "Two 60-minute sessions to set up the car and test tyres."], ["Saturday", "Practice 3", "Last practice session before qualifying."], ["Saturday", "Qualifying", "Q1, Q2 and Q3: the slowest are knocked out in each phase. The fastest in Q3 takes pole."], ["Sunday", "Race", "Around 305 km (less at Monaco). Standing start in grid order."], ["Podium", "Points", "The top ten score. Points count for both drivers and constructors."]];
    R.weekend.forEach((w, i) => { if (W[i]) [w.day, w.t, w.d] = W[i]; });
    R.sprint = "On sprint weekends there is only one practice session. Sprint qualifying takes place on Friday; on Saturday, the sprint race (about 100 km) and GP qualifying; on Sunday, the main race.";
    const F = [["Green", "Track clear; end of the danger zone."], ["Yellow", "Danger: slow down, no overtaking. Double yellow: be prepared to stop."], ["Red", "Session stopped. Cars return slowly to the pit lane."], ["Blue", "A faster car is about to lap you: you must let it by."], ["White", "Slow vehicle on track (for example a recovery truck or a damaged car)."], ["Black", "Disqualification: the driver must enter the pits."], ["Black and white (diagonal)", "Warning for unsporting behaviour or track limits."], ["Black with orange disc", "Mechanical damage: the car must come in for repairs."], ["Yellow and red (stripes)", "Slippery surface: oil, water or debris."], ["Chequered", "End of the session or race."]];
    R.flags.forEach((f, i) => { if (F[i]) [f.name, f.d] = F[i]; });
    const C = [
      ["Safety Car", ["Deployed after an incident that requires intervention on track", "Cars bunch up behind it without overtaking", "Lapped cars may be allowed to unlap themselves"]],
      ["Virtual Safety Car (VSC)", ["Everyone must respect a slower delta time", "Cars do not bunch up: gaps are maintained", "Used for minor incidents"]],
      ["Pit lane", ["Speed limit (usually 80 km/h)", "Exceeding the limit brings a penalty", "Unsafe releases are penalised"]],
      ["Penalties", ["5 or 10 seconds added to the time or served at the stop", "Drive-through: pass through the pit lane without stopping", "10-second stop & go", "Grid places at the next race", "Super licence points: 12 in 12 months means a one-race ban"]],
      ["Track limits", ["The car must keep some part within the white lines", "Repeated offences: a flag warning and then a penalty", "Gaining an advantage off track is penalised"]],
      ["Disqualifications", ["Car outside the rules at technical inspection (weight, floor, fuel)", "Ignoring the black flag", "Seriously dangerous driving"]],
      ["Tyre strategy", ["In the dry: at least two different compounds must be used", "With intermediates or wets the rule no longer applies", "Degradation and temperature decide when to stop"]],
      ["What's new in 2026", ["No DRS: active aerodynamics (straight mode / corner mode)", "Overtake Mode with extra energy within 1 s of a rival", "Power unit without MGU-H, almost 50% electric", "Shorter, narrower and lighter cars", "100% sustainable fuel"]],
    ];
    R.cards.forEach((c, i) => { if (C[i]) [c.t, c.items] = C[i]; });
    ["Soft", "Medium", "Hard", "Intermediate", "Full wet"].forEach((n, i) => { if (R.tyres[i]) R.tyres[i].n = n; });
  });

  /* ---------- Glossary (by index) ---------- */
  P((D) => {
    const G = [
      ["Active aerodynamics", "From 2026, front and rear wings that change position: 'straight mode' (less drag) and 'corner mode' (more downforce)."],
      ["Apex", "The inside point of a corner that the ideal racing line touches."],
      ["Blistering", "Blisters on the tread caused by the tyre overheating."],
      ["Box", "The area of the pit lane where each team carries out its stops. 'Box, box' is the order to come in."],
      ["Brake-by-wire", "Electronic system that splits rear braking between the brakes and energy recovery."],
      ["Blue flag", "Tells a driver they are about to be lapped and must let the faster car by."],
      ["Chicane", "A zigzag sequence of corners to reduce speed."],
      ["Qualifying (Q1, Q2, Q3)", "Knockout session that sets the starting grid."],
      ["Constructors", "The team championship: adds up the points of both drivers."],
      ["Degradation", "Loss of tyre performance with use."],
      ["Diffuser", "Rear part of the floor that expands the air and increases downforce."],
      ["Downforce", "Aerodynamic load: the force pushing the car into the ground."],
      ["Drag", "Aerodynamic resistance to forward motion."],
      ["DRS", "Drag Reduction System (2011-2025): a rear-wing flap that opened to help overtaking. Replaced in 2026."],
      ["Drive-through", "Penalty: driving through the pit lane at the speed limit without stopping."],
      ["Ground effect", "Downforce generated by the floor as it accelerates the air underneath the car."],
      ["ERS", "Energy Recovery System: systems that recover and reuse energy."],
      ["Flat spot", "A flat area on the tyre caused by locking the brakes."],
      ["Graining", "Rubber granules that stick to the tyre surface and reduce grip."],
      ["Halo", "Titanium arch that protects the driver's head. Compulsory since 2018."],
      ["HANS", "Head and neck support device. Compulsory since 2003."],
      ["Intermediates", "Green-marked tyres for damp tracks without standing water."],
      ["MGU-H", "Motor-generator coupled to the turbo (2014-2025). Removed in 2026."],
      ["MGU-K", "Motor-generator coupled to the crankshaft that recovers energy under braking and returns it as power."],
      ["Monocoque", "Single-piece chassis (today carbon fibre) that forms the survival cell."],
      ["Out-lap", "The lap out of the pits."],
      ["Overcut", "Stopping later than a rival and gaining the position by lapping faster in clear air."],
      ["Overtake Mode", "From 2026: extra electrical energy available within one second of the car ahead."],
      ["Parc fermé", "Rules that prevent changes to the car between qualifying and the race."],
      ["Grid", "The starting order of the race."],
      ["Pit lane", "The pit road, with a speed limit."],
      ["Pole position", "First place on the grid, for the fastest qualifier."],
      ["Porpoising", "High-speed bouncing caused by ground effect."],
      ["Slipstream", "Low-drag area behind another car that lets you gain top speed."],
      ["Safety Car", "Safety car that neutralises the race."],
      ["Sector", "Each of the three parts a lap is divided into for timing."],
      ["Slicks", "Treadless tyres for the dry."],
      ["Sprint", "Short race (about 100 km) that awards points to the top eight."],
      ["Stint", "A stretch of the race between two stops."],
      ["Super licence", "FIA licence required to race in F1."],
      ["Telemetry", "Car data sent to the team in real time."],
      ["Undercut", "Stopping before a rival and gaining time on fresh tyres."],
      ["Power unit", "The combustion engine plus the hybrid systems."],
      ["Fastest lap", "The quickest lap of the race. It has not scored points since 2025."],
      ["VSC", "Virtual Safety Car: everyone must lap slower following a delta time."],
    ];
    D.glossary.forEach((g, i) => { if (G[i]) { g[0] = G[i][0]; g[1] = G[i][1]; } });
  });

  /* ---------- Quiz (by index) ---------- */
  P((D) => {
    Object.assign(D.quizCats, { historia: "History", pilotos: "Drivers", equipos: "Teams", circuitos: "Circuits", monoplazas: "Cars", reglamento: "Rules", gp: "Grands Prix" });
    const Q = [
      ["At which circuit was the first F1 World Championship race held?", ["Monza", "Monaco", "Silverstone", "Spa"], "It was at Silverstone, on 13 May 1950. Nino Farina won."],
      ["How many world titles do Michael Schumacher and Lewis Hamilton each have?", ["5", "6", "7", "8"], "Both share the record of seven championships."],
      ["How many points does the winner of a Grand Prix receive?", ["10", "20", "25", "30"], "Since 2010: 25-18-15-12-10-8-6-4-2-1."],
      ["What does the blue flag mean?", ["Rain", "You are about to be lapped", "End of the race", "Safety car"], "It warns the driver that a faster car is about to lap them and they must let it by."],
      ["Which team has raced in every season since 1950?", ["McLaren", "Williams", "Ferrari", "Mercedes"], "Ferrari is the only team present since the first championship."],
      ["Which circuit is shaped like a figure of eight?", ["Suzuka", "Interlagos", "Silverstone", "Montreal"], "Suzuka, in Japan, crosses over itself on a bridge."],
      ["Which titanium device has protected the driver's head since 2018?", ["HANS", "Halo", "DRS", "Monocoque"], "The Halo has been compulsory since 2018."],
      ["Who was world champion in 2025?", ["Max Verstappen", "Oscar Piastri", "Lando Norris", "Charles Leclerc"], "Lando Norris won by two points over Verstappen."],
      ["What colour is the soft dry tyre?", ["Yellow", "White", "Red", "Green"], "Red soft, yellow medium, white hard; green intermediate and blue wet."],
      ["In which city is the GP most famous for its narrow streets held?", ["Monte Carlo", "Baku", "Singapore", "Las Vegas"], "The Monaco GP, in Monte Carlo, has been run since 1950 (with early interruptions)."],
      ["Which country was Ayrton Senna from?", ["Argentina", "Portugal", "Brazil", "Italy"], "Senna, born in São Paulo, won three titles with McLaren."],
      ["What does the chequered flag indicate?", ["Danger", "End of the session", "Disqualification", "Slippery track"], "It marks the end of the session or the race."],
      ["Who was the first F1 world champion?", ["Fangio", "Ascari", "Farina", "Moss"], "Giuseppe 'Nino' Farina, with Alfa Romeo, in 1950."],
      ["How many races did the McLaren MP4/4 win in 1988?", ["12", "13", "15", "16"], "It won 15 of 16; only Monza got away."],
      ["With which team did Jenson Button win the 2009 title?", ["Honda", "Brawn GP", "McLaren", "Williams"], "Brawn GP won both titles in its only season."],
      ["Which driver is the only world champion on both motorcycles and in F1?", ["Mike Hailwood", "John Surtees", "Graham Hill", "Jack Brabham"], "John Surtees was 500 cc champion and F1 champion in 1964."],
      ["What replaces DRS as an overtaking aid in 2026?", ["KERS", "Overtake Mode", "Unlimited push to pass", "Nothing"], "Overtake Mode gives extra electrical energy within one second of a rival."],
      ["Whom did Hamilton pass on the last lap of Brazil 2008 to become champion?", ["Vettel", "Glock", "Räikkönen", "Massa"], "Timo Glock was on dry tyres in the rain."],
      ["At which circuit is the famous Eau Rouge corner?", ["Monza", "Spa-Francorchamps", "Silverstone", "Zandvoort"], "Eau Rouge-Raidillon is the symbol of Spa."],
      ["Which car introduced full ground effect?", ["Lotus 79", "Brabham BT46", "Ferrari 312T", "Tyrrell P34"], "The Lotus 79 (1978), with which Andretti became champion."],
      ["Which driver is the only posthumous champion?", ["Jim Clark", "Jochen Rindt", "Gilles Villeneuve", "Ronnie Peterson"], "Jochen Rindt was killed at Monza in 1970 and nobody beat his points."],
      ["How many consecutive constructors' titles did Mercedes win from 2014?", ["6", "7", "8", "9"], "Eight in a row, from 2014 to 2021."],
      ["Since which season has the fastest lap no longer scored a point?", ["2023", "2024", "2025", "2026"], "The fastest-lap point (2019-2024) was removed in 2025."],
      ["Who is the youngest ever Grand Prix winner?", ["Vettel", "Alonso", "Verstappen", "Norris"], "Max Verstappen won in Spain 2016 aged 18."],
      ["By what margin did Niki Lauda win the 1984 title?", ["Half a point", "One point", "Two points", "Three points"], "He beat Prost by 0.5 points, the narrowest margin in history."],
      ["Which engine made a winning debut in the Lotus 49 at Zandvoort 1967?", ["Coventry Climax", "BRM H16", "Ford Cosworth DFV", "Repco"], "The Cosworth DFV became the most successful engine in history."],
      ["Who is the only driver with the Triple Crown (Monaco, Indy 500 and Le Mans)?", ["Graham Hill", "Fernando Alonso", "Juan Pablo Montoya", "Jim Clark"], "Graham Hill completed it in 1972 by winning Le Mans."],
      ["Which team was the first constructors' champion (1958)?", ["Ferrari", "Cooper", "Vanwall", "BRM"], "Vanwall, with Moss and Brooks."],
      ["Which backmarker was involved in Häkkinen's pass on Schumacher at Spa 2000?", ["Ricardo Zonta", "Pedro Diniz", "Jos Verstappen", "Jean Alesi"], "Ricardo Zonta's BAR ended up between the two."],
      ["What was the approximate length of the Nordschleife used in F1 until 1976?", ["About 7 km", "About 14 km", "About 22 km", "About 30 km"], "More than 22 km, hence the nickname 'Green Hell'."],
      ["Which hybrid component is removed from the 2026 power units?", ["MGU-K", "MGU-H", "Battery", "Turbo"], "The MGU-H disappears; the MGU-K becomes much more powerful."],
      ["What innovation did the Mercedes W11 introduce in 2020?", ["Double diffuser", "DAS (dual-axis steering)", "F-duct", "Active suspension"], "DAS let the driver change the front-wheel toe by moving the steering wheel."],
      ["Which driver won the 1982 title with a single win all season?", ["Didier Pironi", "Keke Rosberg", "John Watson", "Alain Prost"], "Keke Rosberg won only the Swiss GP (at Dijon) and was champion with Williams."],
      ["Which race holds the record as the longest in F1 history?", ["Monaco 1984", "Canada 2011", "Japan 2014", "Belgium 2021"], "Canada 2011, stopped for more than two hours by rain, lasted over four hours."],
      ["Which team is today the heir of Jordan Grand Prix?", ["Alpine", "Aston Martin", "Haas", "Racing Bulls"], "Jordan → Midland → Spyker → Force India → Racing Point → Aston Martin."],
      ["How many wins did Max Verstappen score in 2023, an all-time record for a season?", ["15", "17", "19", "21"], "19 wins from 22 races; Red Bull won 21."],
    ];
    D.quiz.forEach((q, i) => { if (Q[i]) [q.q, q.o, q.e] = Q[i]; });
  });

  /* ---------- Gallery (by index) ---------- */
  P((D) => {
    Object.assign(D.galleryCats, { pilotos: "Drivers", monoplazas: "Cars", equipos: "Teams", circuitos: "Circuits", gp: "Grands Prix", podios: "Podiums", historicos: "Historic moments", retro: "Retro", moderna: "Modern F1" });
    const G = [
      [null, "Five-time champion"], ["Alfa Romeo 158 'Alfetta'", "The first champion's car"], ["1950 British GP", "The first World Championship race"], [null, "Streamlined version"],
      [null, "The uncrowned champion"], [null, "Lotus, 1960s"], [null, "Cosworth DFV as a stressed member"], [null, "Triple champion and safety pioneer"],
      [null, "Chapman's wedge"], [null, "The six-wheeled car"], [null, "Ferrari and McLaren"], [null, "1976 champion"], [null, "Black Beauty"], [null, "Ferrari 312T4"],
      [null, "15 wins from 16"], [null, "Triple champion"], [null, "The Professor"], [null, "Active suspension"], [null, "Seven titles"], [null, "The peak of the V10 era"],
      [null, "Alonso champion"], [null, "The 2009 miracle"], ["Chinese GP podium", "Champagne celebration"], ["Monza podium", "The tifosi flood the straight"],
      [null, "Four-time champion"], [null, "Seven titles"], [null, "Hybrid dominance"], [null, "21 wins from 22"], [null, "Four titles"],
      ["Hamilton at Monaco", "The streets of the Principality"], ["Spa-Francorchamps from space", "Satellite image"], ["Singapore GP", "The night race"],
      ["Fangio's pit stop", "Nürburgring, the race of his life"], ["Ferrari at Monza", "The temple of speed"],
    ];
    D.gallery.forEach((g, i) => { const v = G[i]; if (!v) return; if (v[0]) g.title = v[0]; if (v[1]) g.sub = v[1]; });
  });
})();
