/* =========================================================
   Banco de preguntas del quiz.
   lvl: 1 principiante · 2 intermedio · 3 experto
   cat: historia | pilotos | equipos | circuitos | monoplazas | reglamento | gp
   a: índice de la respuesta correcta · e: explicación
   ========================================================= */
F1.data.quizCats = { historia: "Historia", pilotos: "Pilotos", equipos: "Equipos", circuitos: "Circuitos", monoplazas: "Monoplazas", reglamento: "Reglamentos", gp: "Grandes Premios" };

F1.data.quiz = [
  // ----- Principiante -----
  { lvl: 1, cat: "historia", q: "¿En qué circuito se disputó la primera carrera del Mundial de F1?", o: ["Monza", "Mónaco", "Silverstone", "Spa"], a: 2, e: "Fue en Silverstone, el 13 de mayo de 1950. Ganó Nino Farina." },
  { lvl: 1, cat: "pilotos", q: "¿Cuántos títulos mundiales tienen Michael Schumacher y Lewis Hamilton cada uno?", o: ["5", "6", "7", "8"], a: 2, e: "Ambos comparten el récord de siete campeonatos." },
  { lvl: 1, cat: "reglamento", q: "¿Cuántos puntos recibe el ganador de un Gran Premio?", o: ["10", "20", "25", "30"], a: 2, e: "Desde 2010: 25-18-15-12-10-8-6-4-2-1." },
  { lvl: 1, cat: "reglamento", q: "¿Qué significa la bandera azul?", o: ["Lluvia", "Te van a doblar", "Fin de la carrera", "Coche de seguridad"], a: 1, e: "Avisa al piloto de que un coche más rápido va a doblarlo y debe dejarlo pasar." },
  { lvl: 1, cat: "equipos", q: "¿Qué escudería ha disputado todas las temporadas desde 1950?", o: ["McLaren", "Williams", "Ferrari", "Mercedes"], a: 2, e: "Ferrari es la única presente desde el primer campeonato." },
  { lvl: 1, cat: "circuitos", q: "¿Qué circuito tiene forma de ocho?", o: ["Suzuka", "Interlagos", "Silverstone", "Montreal"], a: 0, e: "Suzuka, en Japón, cruza su trazado mediante un puente." },
  { lvl: 1, cat: "monoplazas", q: "¿Qué dispositivo de titanio protege la cabeza del piloto desde 2018?", o: ["HANS", "Halo", "DRS", "Monocasco"], a: 1, e: "El Halo es obligatorio desde 2018." },
  { lvl: 1, cat: "pilotos", q: "¿Quién fue campeón del mundo en 2025?", o: ["Max Verstappen", "Oscar Piastri", "Lando Norris", "Charles Leclerc"], a: 2, e: "Lando Norris ganó por dos puntos sobre Verstappen." },
  { lvl: 1, cat: "reglamento", q: "¿Cuál es el color del neumático blando de seco?", o: ["Amarillo", "Blanco", "Rojo", "Verde"], a: 2, e: "Rojo blando, amarillo medio, blanco duro; verde intermedio y azul lluvia." },
  { lvl: 1, cat: "gp", q: "¿En qué ciudad se celebra el GP más famoso por sus calles estrechas?", o: ["Montecarlo", "Bakú", "Singapur", "Las Vegas"], a: 0, e: "El GP de Mónaco, en Montecarlo, se corre desde 1950 (con interrupciones al inicio)." },
  { lvl: 1, cat: "pilotos", q: "¿De qué país era Ayrton Senna?", o: ["Argentina", "Portugal", "Brasil", "Italia"], a: 2, e: "Senna, nacido en São Paulo, ganó tres títulos con McLaren." },
  { lvl: 1, cat: "reglamento", q: "¿Qué indica la bandera a cuadros?", o: ["Peligro", "Fin de la sesión", "Descalificación", "Pista resbaladiza"], a: 1, e: "Marca el final de la sesión o de la carrera." },
  // ----- Intermedio -----
  { lvl: 2, cat: "historia", q: "¿Quién fue el primer campeón del mundo de F1?", o: ["Fangio", "Ascari", "Farina", "Moss"], a: 2, e: "Giuseppe 'Nino' Farina, con Alfa Romeo, en 1950." },
  { lvl: 2, cat: "monoplazas", q: "¿Cuántas carreras ganó el McLaren MP4/4 en 1988?", o: ["12", "13", "15", "16"], a: 2, e: "Ganó 15 de 16; solo se le escapó Monza." },
  { lvl: 2, cat: "equipos", q: "¿Con qué equipo ganó Jenson Button el título de 2009?", o: ["Honda", "Brawn GP", "McLaren", "Williams"], a: 1, e: "Brawn GP ganó ambos títulos en su única temporada." },
  { lvl: 2, cat: "pilotos", q: "¿Qué piloto es el único campeón del mundo de motos y de F1?", o: ["Mike Hailwood", "John Surtees", "Graham Hill", "Jack Brabham"], a: 1, e: "John Surtees fue campeón de 500 cc y de F1 en 1964." },
  { lvl: 2, cat: "reglamento", q: "¿Qué sustituye al DRS como ayuda para adelantar en 2026?", o: ["KERS", "Overtake Mode", "Push to pass ilimitado", "Nada"], a: 1, e: "El Overtake Mode da energía eléctrica extra a menos de un segundo del rival." },
  { lvl: 2, cat: "gp", q: "¿A quién adelantó Hamilton en la última vuelta de Brasil 2008 para ser campeón?", o: ["Vettel", "Glock", "Räikkönen", "Massa"], a: 1, e: "Timo Glock rodaba con neumáticos de seco bajo la lluvia." },
  { lvl: 2, cat: "circuitos", q: "¿En qué circuito está la famosa curva Eau Rouge?", o: ["Monza", "Spa-Francorchamps", "Silverstone", "Zandvoort"], a: 1, e: "Eau Rouge-Raidillon es el símbolo de Spa." },
  { lvl: 2, cat: "monoplazas", q: "¿Qué coche introdujo el efecto suelo completo?", o: ["Lotus 79", "Brabham BT46", "Ferrari 312T", "Tyrrell P34"], a: 0, e: "El Lotus 79 (1978), con el que Andretti fue campeón." },
  { lvl: 2, cat: "historia", q: "¿Qué piloto es el único campeón póstumo?", o: ["Jim Clark", "Jochen Rindt", "Gilles Villeneuve", "Ronnie Peterson"], a: 1, e: "Jochen Rindt murió en Monza 1970 y nadie superó sus puntos." },
  { lvl: 2, cat: "equipos", q: "¿Cuántos títulos de constructores consecutivos ganó Mercedes desde 2014?", o: ["6", "7", "8", "9"], a: 2, e: "Ocho seguidos, de 2014 a 2021." },
  { lvl: 2, cat: "reglamento", q: "¿Desde qué temporada ya no da punto la vuelta rápida?", o: ["2023", "2024", "2025", "2026"], a: 2, e: "El punto por vuelta rápida (2019-2024) se eliminó en 2025." },
  { lvl: 2, cat: "pilotos", q: "¿Quién es el ganador más joven de un Gran Premio?", o: ["Vettel", "Alonso", "Verstappen", "Norris"], a: 2, e: "Max Verstappen ganó en España 2016 con 18 años." },
  // ----- Experto -----
  { lvl: 3, cat: "historia", q: "¿Por qué margen ganó Niki Lauda el título de 1984?", o: ["Medio punto", "Un punto", "Dos puntos", "Tres puntos"], a: 0, e: "Ganó por 0,5 puntos a Prost, el margen más estrecho de la historia." },
  { lvl: 3, cat: "monoplazas", q: "¿Qué motor debutó con victoria en el Lotus 49 en Zandvoort 1967?", o: ["Coventry Climax", "BRM H16", "Ford Cosworth DFV", "Repco"], a: 2, e: "El Cosworth DFV se convirtió en el motor más exitoso de la historia." },
  { lvl: 3, cat: "pilotos", q: "¿Quién es el único piloto con la Triple Corona (Mónaco, Indy 500 y Le Mans)?", o: ["Graham Hill", "Fernando Alonso", "Juan Pablo Montoya", "Jim Clark"], a: 0, e: "Graham Hill la completó en 1972 al ganar Le Mans." },
  { lvl: 3, cat: "equipos", q: "¿Qué equipo fue el primer campeón de constructores (1958)?", o: ["Ferrari", "Cooper", "Vanwall", "BRM"], a: 2, e: "Vanwall, con Moss y Brooks." },
  { lvl: 3, cat: "gp", q: "¿Qué doblado intervino en el adelantamiento de Häkkinen a Schumacher en Spa 2000?", o: ["Ricardo Zonta", "Pedro Diniz", "Jos Verstappen", "Jean Alesi"], a: 0, e: "El BAR de Ricardo Zonta quedó en medio de ambos." },
  { lvl: 3, cat: "circuitos", q: "¿Cuál era la longitud aproximada de la Nordschleife usada en F1 hasta 1976?", o: ["Unos 7 km", "Unos 14 km", "Unos 22 km", "Unos 30 km"], a: 2, e: "Más de 22 km, de ahí el apodo de 'Infierno Verde'." },
  { lvl: 3, cat: "reglamento", q: "¿Qué componente híbrido se elimina en las unidades de potencia de 2026?", o: ["MGU-K", "MGU-H", "Batería", "Turbo"], a: 1, e: "Desaparece el MGU-H; el MGU-K gana mucha más potencia." },
  { lvl: 3, cat: "monoplazas", q: "¿Qué innovación presentó el Mercedes W11 en 2020?", o: ["Doble difusor", "DAS (dirección de doble eje)", "F-duct", "Suspensión activa"], a: 1, e: "El DAS permitía cambiar la convergencia de las ruedas delanteras moviendo el volante." },
  { lvl: 3, cat: "historia", q: "¿Qué piloto ganó el título de 1982 con una única victoria en la temporada?", o: ["Didier Pironi", "Keke Rosberg", "John Watson", "Alain Prost"], a: 1, e: "Keke Rosberg ganó solo el GP de Suiza (en Dijon) y fue campeón con Williams." },
  { lvl: 3, cat: "gp", q: "¿Qué carrera ostenta el récord de mayor duración de la historia de la F1?", o: ["Mónaco 1984", "Canadá 2011", "Japón 2014", "Bélgica 2021"], a: 1, e: "Canadá 2011, interrumpida más de dos horas por la lluvia, superó las cuatro horas." },
  { lvl: 3, cat: "equipos", q: "¿Qué equipo es hoy el heredero del Jordan Grand Prix?", o: ["Alpine", "Aston Martin", "Haas", "Racing Bulls"], a: 1, e: "Jordan → Midland → Spyker → Force India → Racing Point → Aston Martin." },
  { lvl: 3, cat: "pilotos", q: "¿Cuántas victorias consiguió Max Verstappen en 2023, récord absoluto en una temporada?", o: ["15", "17", "19", "21"], a: 2, e: "19 victorias de 22 carreras; Red Bull ganó 21." },
];
