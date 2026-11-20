/* =========================================================
   Reglamento y funcionamiento (temporada 2026).
   Puntos: el sistema no cambió en 2026 respecto a 2025
   (sin punto por vuelta rápida desde 2025).
   ========================================================= */
F1.data.rules = {
  season: 2026,
  weekend: [
    { day: "Viernes", t: "Libres 1 y 2", d: "Dos sesiones de 60 minutos para poner a punto el coche y probar neumáticos." },
    { day: "Sábado", t: "Libres 3", d: "Última sesión de práctica antes de la clasificación." },
    { day: "Sábado", t: "Clasificación", d: "Q1, Q2 y Q3: los más lentos quedan eliminados en cada fase. El más rápido de Q3 logra la pole." },
    { day: "Domingo", t: "Carrera", d: "Alrededor de 305 km (Mónaco, menos). Salida desde parado según la parrilla." },
    { day: "Podio", t: "Puntos", d: "Puntúan los diez primeros. Los puntos suman para pilotos y constructores." },
  ],
  sprint: "En los fines de semana sprint solo hay una sesión de libres. El viernes se disputa la clasificación sprint; el sábado, la carrera sprint (unos 100 km) y la clasificación del GP; el domingo, la carrera principal.",
  points: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1],
  sprintPoints: [8, 7, 6, 5, 4, 3, 2, 1],
  flags: [
    { name: "Verde", color: "#1fa64a", d: "Pista despejada; fin de la zona de peligro." },
    { name: "Amarilla", color: "#f5d000", d: "Peligro: reducir la velocidad, prohibido adelantar. Doble amarilla: preparados para detenerse." },
    { name: "Roja", color: "#d90000", d: "Sesión detenida. Los coches vuelven lentamente al pit lane." },
    { name: "Azul", color: "#1d6fe0", d: "Un coche más rápido que te va a doblar: debes dejarle pasar." },
    { name: "Blanca", color: "#ffffff", d: "Vehículo lento en pista (por ejemplo, una grúa o un coche dañado)." },
    { name: "Negra", color: "#111111", d: "Descalificación: el piloto debe entrar en boxes." },
    { name: "Blanca y negra (diagonal)", color: "linear-gradient(135deg,#fff 50%,#111 50%)", d: "Advertencia por conducta antideportiva o límites de pista." },
    { name: "Negra con disco naranja", color: "radial-gradient(circle,#ff7a00 30%,#111 31%)", d: "Daño mecánico: el coche debe entrar a reparar." },
    { name: "Amarilla y roja (rayas)", color: "repeating-linear-gradient(90deg,#f5d000 0 8px,#d90000 8px 16px)", d: "Superficie deslizante: aceite, agua o restos." },
    { name: "A cuadros", color: "conic-gradient(#111 25%,#fff 0 50%,#111 0 75%,#fff 0) 0 0/14px 14px", d: "Fin de la sesión o de la carrera." },
  ],
  cards: [
    { ico: "🚗", t: "Safety Car", items: ["Sale ante un incidente que requiere intervención en pista", "Los coches se agrupan detrás sin adelantar", "Los doblados pueden recibir permiso para desdoblarse"] },
    { ico: "🟨", t: "Virtual Safety Car (VSC)", items: ["Todos deben respetar un tiempo delta más lento", "No se agrupan los coches: se mantienen las distancias", "Se usa en incidentes menores"] },
    { ico: "🛣️", t: "Pit lane", items: ["Límite de velocidad (normalmente 80 km/h)", "Exceder el límite conlleva sanción", "Las liberaciones inseguras se sancionan"] },
    { ico: "⚖️", t: "Penalizaciones", items: ["5 o 10 segundos añadidos al tiempo o a cumplir en la parada", "Drive-through: atravesar el pit lane sin parar", "Stop & go de 10 segundos", "Puestos de parrilla en la siguiente carrera", "Puntos en la superlicencia: con 12 en 12 meses, un GP de suspensión"] },
    { ico: "📏", t: "Límites de pista", items: ["El coche debe mantener alguna parte dentro de las líneas blancas", "Varias infracciones: advertencia con bandera y después sanción", "Ganar ventaja fuera de pista se sanciona"] },
    { ico: "🚫", t: "Descalificaciones", items: ["Coche fuera de reglamento en la inspección técnica (peso, fondo, combustible)", "Ignorar la bandera negra", "Conducta gravemente peligrosa"] },
    { ico: "🛞", t: "Estrategia de neumáticos", items: ["En seco: obligatorio usar al menos dos compuestos diferentes", "Con intermedios o lluvia, la regla deja de aplicarse", "La degradación y la temperatura deciden cuándo parar"] },
    { ico: "⚡", t: "Novedades 2026", items: ["Sin DRS: aerodinámica activa (modo recta / modo curva)", "Overtake Mode con energía extra a menos de 1 s del rival", "Unidad de potencia sin MGU-H, casi 50% eléctrica", "Coches más cortos, estrechos y ligeros", "Combustible 100% sostenible"] },
  ],
  tyres: [
    { n: "Blando", c: "#e10600" }, { n: "Medio", c: "#f5d000" }, { n: "Duro", c: "#f4f1ea" }, { n: "Intermedio", c: "#21c07a" }, { n: "Lluvia extrema", c: "#1d6fe0" },
  ],
};
