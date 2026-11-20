/* =========================================================
   Línea de tiempo interactiva.
   cat: campeonatos | pilotos | escuderias | tecnologia |
        reglamento | seguridad | gp
   video: id de jugada (plays.js) o "rival:<id>"
   ========================================================= */
F1.data.timelineCats = { campeonatos: "Campeonatos", pilotos: "Pilotos", escuderias: "Escuderías", tecnologia: "Tecnología", reglamento: "Reglamentos", seguridad: "Accidentes y seguridad", gp: "Grandes Premios" };

F1.data.timeline = [
  { y: 1950, cat: ["campeonatos", "gp"], title: "Nace el Campeonato del Mundo", text: "Silverstone acoge la primera carrera. Nino Farina gana y será el primer campeón.", drivers: ["farina"], team: "alfa", circuit: "silverstone", img: "1950 British Grand Prix", gp: [1950, "silverstone"] },
  { y: 1955, cat: ["seguridad", "escuderias"], title: "La tragedia de Le Mans", text: "El accidente de las 24 Horas de Le Mans (fuera de la F1) lleva a Mercedes a retirarse del automovilismo y a varios países a suspender carreras.", team: "mercedes", img: "Mercedes-Benz W196" },
  { y: 1957, cat: ["pilotos", "gp"], title: "Fangio en Nürburgring", text: "Con 46 años, Fangio firma la carrera de su vida y gana su quinto título.", drivers: ["fangio"], team: "maserati", circuit: "nurburgring", img: "Juan Manuel Fangio", video: "fangio-nurburgring-57", gp: [1957, "nurburgring"] },
  { y: 1958, cat: ["reglamento", "escuderias"], title: "Primer campeonato de constructores", text: "Vanwall se convierte en el primer campeón de constructores.", team: "vanwall", img: "Vanwall" },
  { y: 1959, cat: ["tecnologia", "campeonatos"], title: "Triunfa el motor trasero", text: "Jack Brabham gana el título con el Cooper de motor trasero. En pocos años todos los coches lo copiarán.", drivers: ["jack_brabham"], team: "cooper", img: "Jack Brabham" },
  { y: 1962, cat: ["tecnologia"], title: "El monocasco", text: "El Lotus 25 introduce el chasis monocasco, más rígido, ligero y seguro.", team: "lotus", img: "Lotus 25" },
  { y: 1966, cat: ["campeonatos", "pilotos"], title: "Brabham, campeón con su propio coche", text: "Jack Brabham logra una hazaña irrepetible: campeón del mundo con un coche que lleva su nombre.", drivers: ["jack_brabham"], team: "brabham", img: "Brabham BT19" },
  { y: 1967, cat: ["tecnologia"], title: "Debuta el Cosworth DFV", text: "El motor Ford Cosworth DFV gana en su debut con el Lotus 49. Será el motor más exitoso de la historia.", drivers: ["clark"], team: "lotus", img: "Ford-Cosworth DFV" },
  { y: 1968, cat: ["reglamento", "escuderias"], title: "Llegan los patrocinadores", text: "Lotus estrena colores comerciales. Termina la era de los colores nacionales.", team: "lotus", img: "Lotus 49" },
  { y: 1970, cat: ["pilotos", "seguridad"], title: "Rindt, campeón póstumo", text: "Jochen Rindt muere en Monza pero ningún rival supera sus puntos.", drivers: ["rindt"], team: "lotus", img: "Jochen Rindt" },
  { y: 1976, cat: ["seguridad", "pilotos", "campeonatos"], title: "Lauda, Hunt y Fuji", text: "Accidente de Lauda en Nürburgring, regreso 42 días después y título de Hunt por un punto.", drivers: ["lauda", "hunt"], team: "mclaren", img: "Niki Lauda", video: "rival:hunt-lauda", gp: [1976, "fuji"] },
  { y: 1977, cat: ["tecnologia"], title: "El primer motor turbo", text: "Renault debuta con un motor turbo de 1.5 L. Ganará en 1979 y abrirá la era turbo.", team: "renault", img: "Renault RS01" },
  { y: 1978, cat: ["tecnologia", "campeonatos"], title: "Efecto suelo", text: "El Lotus 79 convierte el coche en un ala invertida. Mario Andretti, campeón.", drivers: ["mario_andretti"], team: "lotus", img: "Lotus 79" },
  { y: 1981, cat: ["tecnologia", "seguridad"], title: "Fibra de carbono", text: "El McLaren MP4/1 estrena el chasis de fibra de carbono, base de la seguridad moderna.", team: "mclaren", img: "McLaren MP4/1" },
  { y: 1988, cat: ["escuderias", "pilotos"], title: "15 de 16", text: "Senna y Prost ganan 15 de 16 carreras con el McLaren MP4/4.", drivers: ["senna", "prost"], team: "mclaren", img: "McLaren MP4/4" },
  { y: 1989, cat: ["pilotos", "gp"], title: "Suzuka 1989", text: "Senna y Prost chocan en la chicane; Prost gana el título.", drivers: ["senna", "prost"], team: "mclaren", circuit: "suzuka", img: "Alain Prost", video: "rival:senna-prost", gp: [1989, "suzuka"] },
  { y: 1992, cat: ["tecnologia"], title: "La cumbre de la electrónica", text: "El Williams FW14B, con suspensión activa, lleva a Mansell al título.", drivers: ["mansell"], team: "williams", img: "Williams FW14" },
  { y: 1993, cat: ["gp", "pilotos"], title: "La vuelta de los dioses", text: "Senna adelanta a cuatro rivales en la primera vuelta bajo la lluvia de Donington.", drivers: ["senna"], team: "mclaren", circuit: "donington", img: "McLaren MP4/8", video: "senna-donington-93", gp: [1993, "donington"] },
  { y: 1994, cat: ["seguridad"], title: "Imola cambia la F1", text: "Las muertes de Ratzenberger y Senna desencadenan una revolución en seguridad que salvó incontables vidas.", drivers: ["senna"], circuit: "imola", img: "Imola Circuit", gp: [1994, "imola"] },
  { y: 2000, cat: ["campeonatos", "escuderias"], title: "Ferrari vuelve a ganar", text: "Schumacher da a Ferrari su primer título de pilotos desde 1979. Le seguirán cuatro más.", drivers: ["michael_schumacher"], team: "ferrari", img: "Ferrari F1-2000" },
  { y: 2003, cat: ["seguridad"], title: "HANS obligatorio", text: "El dispositivo HANS, que protege cabeza y cuello, se vuelve obligatorio.", img: "HANS device" },
  { y: 2005, cat: ["campeonatos", "pilotos"], title: "Alonso, campeón más joven", text: "Fernando Alonso rompe la hegemonía de Ferrari con Renault.", drivers: ["alonso"], team: "renault", img: "Renault R25", video: "alonso-130r-05" },
  { y: 2008, cat: ["campeonatos", "gp"], title: "Campeón en la última curva", text: "Hamilton gana el título adelantando a Glock en la penúltima curva de Interlagos.", drivers: ["hamilton", "massa"], team: "mclaren", circuit: "interlagos", img: "McLaren MP4-23", video: "hamilton-brasil-08", gp: [2008, "interlagos"] },
  { y: 2009, cat: ["escuderias", "tecnologia"], title: "El milagro Brawn", text: "Un equipo nacido de las cenizas de Honda gana ambos títulos con el doble difusor.", drivers: ["button"], team: "brawn", img: "Brawn BGP 001" },
  { y: 2011, cat: ["reglamento", "tecnologia"], title: "Llega el DRS", text: "El alerón trasero móvil se introduce para facilitar los adelantamientos.", img: "Drag reduction system" },
  { y: 2014, cat: ["tecnologia", "reglamento"], title: "Era híbrida", text: "Unidades de potencia V6 turbo híbridas de 1.6 L. Comienza el dominio de Mercedes.", team: "mercedes", img: "Mercedes F1 W05 Hybrid" },
  { y: 2018, cat: ["seguridad"], title: "El Halo", text: "El dispositivo de protección de la cabeza se vuelve obligatorio.", img: "Halo (safety device)" },
  { y: 2020, cat: ["seguridad"], title: "Grosjean sobrevive", text: "El Halo y la célula de supervivencia salvan a Romain Grosjean en Bahréin.", circuit: "bahrain", img: "Romain Grosjean", video: "grosjean-bahrein-20" },
  { y: 2021, cat: ["campeonatos", "reglamento"], title: "Tope presupuestario y final de infarto", text: "Primer año con límite de gasto. Verstappen gana el título en la última vuelta de Abu Dabi.", drivers: ["max_verstappen", "hamilton"], team: "red_bull", img: "Yas Marina Circuit", video: "abu-dhabi-21", gp: [2021, "yas_marina"] },
  { y: 2022, cat: ["reglamento", "tecnologia"], title: "Vuelve el efecto suelo", text: "Nuevos coches con túneles Venturi para poder seguir de cerca a otro coche.", team: "red_bull", img: "Red Bull RB18" },
  { y: 2023, cat: ["escuderias", "pilotos"], title: "21 de 22", text: "Red Bull gana 21 de 22 carreras; Verstappen logra el récord de 19 victorias.", drivers: ["max_verstappen"], team: "red_bull", img: "Red Bull Racing RB19" },
  { y: 2025, cat: ["campeonatos"], title: "Norris campeón", text: "Lando Norris gana el título por dos puntos sobre Verstappen y McLaren revalida el de constructores.", drivers: ["norris"], team: "mclaren", img: "Lando Norris", gp: [2025, "yas_marina"] },
  { y: 2026, cat: ["reglamento", "tecnologia", "escuderias"], title: "La revolución de 2026", text: "Aerodinámica activa, adiós al DRS, Overtake Mode, motores casi 50% eléctricos y combustible sostenible. Debutan Audi y Cadillac.", team: "audi", img: "2026 Formula One World Championship" },
];
