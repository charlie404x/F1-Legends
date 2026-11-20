# F1 Legends — The History of Formula 1

Museo digital e interactivo de la Fórmula 1, hecho solo con HTML, CSS y JavaScript, sin dependencias ni proceso de compilación.

## Cómo ejecutarlo

| Opción | Pasos | Videos insertados |
|---|---|---|
| **Recomendada** | Doble clic en `iniciar-servidor.bat` (necesita Python o Node.js). Abre `http://localhost:8080/paginas/inicio/inicio.html`. | ✅ Sí |
| Rápida | Doble clic en `index.html` (raíz): redirige a la portada dentro de `paginas/`. | ⚠️ YouTube puede bloquearlos en `file://`; aparece un enlace externo. |

Hace falta conexión a internet para los datos, las noticias, los videos y las galerías. Los logotipos y los retratos de pilotos van incluidos en el proyecto.

## Páginas (carpeta `paginas/`)

```
index.html                         Entrada: redirige a paginas/inicio/inicio.html
paginas/
  inicio/inicio.html               Portada, actualidad, noticias, «Explora», décadas
  historia/historia.html           F1 History Archive por décadas + línea de tiempo
  historia/campeones.html          Los 76 títulos de pilotos
  historia/rivalidades.html        Rivalidades legendarias
  historia/jugadas.html            Jugadas históricas con video
  pilotos-y-equipos/pilotos.html   Leyendas y parrilla actual
  pilotos-y-equipos/equipos.html   Escuderías con logotipos
  temporada/temporada.html         Live Championship + parrilla actual (se actualiza sola)
  museo/monoplazas.html            Museo de monoplazas
  museo/circuitos.html             Circuitos con foto real y plano
  museo/galeria.html               Galería + archivo por temas
  aprende/tecnologia.html          F1 Technology + reglamento 2026
  aprende/comparador.html          Comparadores (?a=senna&b=prost)
  aprende/quiz.html · glosario.html
  aprende/creditos.html            Créditos y licencias de logotipos y retratos
  fichas/ficha.html                Fichas: #/piloto/<id>, #/equipo/<key>, #/coche/<key>, #/circuito/<key>, #/gp/<año>/<ronda>, #/rivalidad/<id>, #/jugada/<id>
```

Cada página solo contiene su `<main>`; la cabecera, el pie, el buscador, los favoritos, el lightbox y el botón de idioma los inserta `js/core/layout.js`. Las rutas se calculan desde la raíz del proyecto (`F1.root`, que fija `js/loader.js`), así que funcionan igual con servidor o con doble clic. Para añadir una página: créala en `paginas/<sección>/` copiando otra y añade su ruta en `PAGES` de `js/core/layout.js`.

## Actualización automática

- **Puntos, clasificaciones, último GP, próxima carrera y parrilla**: se vuelven a pedir a la API cada **2 minutos** durante un fin de semana de GP (de 1 h antes de Libres 1 a 4 h después de la carrera) y cada **10 minutos** el resto del tiempo, sin recargar la página. Un indicador muestra cuándo será la próxima actualización.
- **Noticias**: cada 5 minutos en fin de semana de GP y cada 10 el resto, con botón «↻ Actualizar». En español se combinan Marca, Motorsport.com ES, Motorsport.com y BBC Sport; en inglés, Motorsport.com, Autosport, BBC Sport y RaceFans.
- Solo se actualiza con la pestaña visible (al volver a ella se pone al día enseguida), respetando el límite de la API.

## Redes sociales

Las cuentas oficiales (Instagram, X, YouTube, TikTok, Facebook, Twitch y web) de los pilotos y equipos actuales están en `js/data/social.js`, tomadas de Wikidata el 20/11/2026 (solo cuentas vigentes). Aparecen en las fichas de piloto y equipo, en la parrilla actual y en las tarjetas de pilotos y equipos actuales. Para corregir o añadir una cuenta, edita ese archivo.

## Estructura

```
index.html              Entrada (redirige a paginas/)
paginas/                Todas las páginas, agrupadas por sección
iniciar-servidor.bat    Servidor local (Windows)
assets/logos/           Logotipos de las escuderías (WebP, recortados)
assets/retratos/        Retratos de pilotos (WebP 4:5, recortes de fotos de Commons)
css/
  base.css              Tokens de diseño, temas claro/oscuro, navegación, portada
  components.css        Componentes reutilizables
  sections.css          Estilos por sección, Historical Mode y fichas
  pages.css             Multipágina: cabeceras de página, logotipos, galerías, botón de idioma, ajustes móviles
js/
  loader.js             Carga ordenada de todos los scripts (añade los de inglés solo si hace falta)
  core/utils.js         Espacio de nombres F1 y utilidades
  core/i18n.js          Idioma ES/EN: F1.t(), data-i18n, parches de datos
  core/layout.js        Cabecera, menú, pie y capas comunes; mapa de páginas (F1.page)
  core/store.js         localStorage seguro, caché con caducidad, favoritos
  core/router.js        Rutas de ficha.html
  services/media.js     Imágenes: lotes a la API, normalización de URL, galerías por categorías de Commons
  services/*.js         API Jolpica, estadísticas, video, noticias
  data/images.js        REGISTRO CENTRAL DE IMÁGENES (logotipos, retratos verificados, categorías de Commons)
  data/*.js             Contenido editorial (español)
  i18n/en.js            Diccionario inglés de la interfaz
  i18n/en-data.js       Contenido editorial en inglés (sobrescribe los textos por id)
  components/           Interfaz común, lightbox (con miniaturas), galería (mosaico + carrusel), trazado
  sections/*.js         Una sección por archivo (se inicializa solo si está en la página)
  views/views.js        Fichas completas
  app.js                Arranque
```

## Idioma (ES / EN)

- Botón **ES | EN** en la cabecera. La elección se guarda en el navegador y se aplica a todas las páginas; también se puede forzar con `?lang=en`.
- Toda la interfaz y todo el contenido editorial (biografías, historia de equipos y monoplazas, décadas, línea de tiempo, jugadas, rivalidades, tecnología, reglamento, glosario y quiz) están traducidos. Los resúmenes de Wikipedia se piden en el idioma activo.
- Las noticias se muestran en su idioma original (inglés) y los datos de la API (nombres de Grandes Premios) llegan en inglés.
- Para traducir un texto nuevo: escribe `F1.t("texto")` en el código y añade la entrada en `js/i18n/en.js`.

## Imágenes

Todo se organiza en `js/data/images.js`:

- **Logotipos** (`logos`): 29 archivos locales con fuente, licencia y temporadas (`from`/`to`). Los equipos históricos usan el logotipo de su época (Lotus, Brabham, Tyrrell, Cooper, BRM, Matra, Vanwall, Alfa Romeo 1946-50, Maserati, Benetton, Jordan, Brawn, Minardi, Sauber). Si en un contexto de un año concreto no hay logotipo adecuado (p. ej. el McLaren de 1988), se muestra el monograma en lugar de un logotipo actual. Son marcas registradas: se usan solo para identificar a cada equipo, sin ánimo de lucro.
- **Retratos verificados** (`portraits`): 25 fotos de Commons revisadas una a una (persona, uniforme y temporada), recortadas y guardadas en `assets/retratos/` para que carguen siempre, con autor y licencia (lista completa en *Créditos y licencias*). Se muestran en clasificaciones, parrilla, fichas y tarjetas. `kind: "car"` = no existe retrato libre con el uniforme actual y se usa una foto real del piloto con su coche.
- **Galerías** (`driverCats`, `teamCats`, `carCats`, `circuitCats`, `decadeCats`): categorías de Wikimedia Commons. La web recorre la categoría y sus subcategorías por año, reparte la selección a lo largo de la trayectoria, descarta logotipos, firmas, mapas, cómics, homenajes, etc., limita fotos repetidas o recortes, y ordena por año. Cada foto muestra descripción, año, autor y licencia.
- Rendimiento y robustez: carga diferida, placeholders animados, tamaños estándar de miniatura de Wikimedia (responsive), consultas agrupadas en lotes de hasta 40 títulos, reintentos ante HTTP 429, caché en localStorage y respaldo (miniatura menor → original → placeholder) para que ninguna tarjeta quede rota. Wikimedia no sirve WebP/AVIF para fotos; los logotipos locales sí son WebP.

Para añadir un retrato: añade una entrada en `portraits` con el id de Jolpica del piloto y el nombre exacto del archivo de Commons. Para cambiar una galería: edita la categoría correspondiente.

## APIs y fuentes de datos

| Fuente | Uso | Notas |
|---|---|---|
| [Jolpica-F1](https://github.com/jolpica/jolpica-f1) `https://api.jolpi.ca/ergast/f1/` | Clasificaciones, calendario, resultados, clasificación y sprint, estadísticas de pilotos, equipos y circuitos | Sucesora compatible de Ergast. Límite aproximado de **4 peticiones/s y 500 peticiones/hora por IP**. La web espacia las peticiones y guarda caché en `localStorage`. |
| Wikipedia REST `page/summary` | Foto principal y resumen biográfico (en español si existe; si no, en inglés) | CC BY-SA |
| Wikimedia Commons API | Búsqueda de fotos alternativas, autor y licencia de cada imagen | Créditos visibles en el lightbox |
| [bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) | GeoJSON real de los trazados | Licencia MIT |
| rss2json + RSS de Motorsport.com, Autosport y BBC Sport | Noticias con fecha, medio y enlace original | Los RSS originales no permiten CORS; rss2json hace de puente |
| YouTube IFrame Player API | Videos dentro de la página | IDs comprobados con oEmbed (existen y permiten inserción) |

### Caché (TTL)

| Datos | Caducidad |
|---|---|
| Temporada en curso (clasificaciones, último GP, próxima carrera) | 1 hora |
| Calendario | 6 horas |
| Carreras pasadas | 60 días |
| Estadísticas históricas | 7–14 días |
| Imágenes | 14 días |
| Galerías de Commons | 7 días (un resultado incompleto no se guarda) |
| Noticias | 30 minutos |

Si no hay conexión se muestra la última copia guardada, con su fecha y el aviso «Copia guardada». Si no hay ninguna copia, aparece un mensaje de error: nunca se muestran datos inventados.

El botón **↻ Actualizar** del Live Championship fuerza una nueva consulta.

### Criterios de los datos

- **Poles** de carrera: salidas desde la posición 1 de parrilla (`grid = 1`). Puede diferir de las poles oficiales por sanciones; la interfaz lo indica.
- **Vuelta rápida registrada** de un circuito: la más rápida en carrera según Jolpica (datos completos desde 2004). No siempre coincide con el récord oficial de la FIA.
- **Potencias de monoplazas**: cifras aproximadas citadas habitualmente. Lo que no está documentado se muestra como «No documentado».
- **Parrilla actual**: alineaciones del último Gran Premio disputado, así que refleja los cambios a mitad de temporada.
- **Logotipos**: copias locales en `assets/logos/` (ver «Logotipos»).

## Cómo actualizar los datos

- **Temporada, resultados y clasificaciones**: se actualizan solos.
- **Campeón al terminar una temporada**: la web lo detecta y lo añade al archivo marcado como «API». Para dejarlo fijo, añade una línea en `js/data/champions.js` (y el equipo en `constructorChampions`).
- **Nuevo piloto con ficha editorial**: añádelo a `js/data/drivers.js` con su `id` de Jolpica (consúltalo en `https://api.jolpi.ca/ergast/f1/drivers/<id>.json`).
- **Nombres de los coches de la temporada**: `F1.data.currentCars` en `js/data/teams.js`.
- **Videos**: el campo `video` de `js/data/plays.js` o `js/data/rivalries.js` es una lista de IDs de YouTube; se prueban en orden. Para comprobar un ID:
  `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=<ID>` (200 = existe e incrustable).
- **Fotos**: `img` es el título de un artículo de Wikipedia en inglés. `q` admite dos formatos:
  - `file:<archivo>`: un archivo concreto de Commons elegido a mano. Es la opción preferida para las imágenes principales.
  - `!<búsqueda>||<término>`: una búsqueda en Commons que solo acepta archivos cuyo nombre contenga el término.

  Si un artículo no tiene imagen, la búsqueda de respaldo exige la palabra más distintiva del título, para evitar fotos que no correspondan.

## Limitaciones conocidas

- **Retratos de 2026**: 21 de los 25 pilotos de la clasificación tienen foto real con el uniforme de su equipo de 2026 (Verstappen, Hamilton y Bottas se añadieron recortando fotos de 2026 de Melbourne y China). Para Pérez, Ocon y Gasly no existe ninguna foto con licencia libre de 2026 fuera del coche: se buscó en Wikimedia Commons (incluidas las 268 fotos del GP de Países Bajos 2026, Austria, Italia, Singapur y Melbourne) y en Openverse/Flickr (Creative Commons, sin fotos de 2026 indexadas). Se muestran en su monoplaza de 2026 y la ficha lo indica. Bearman y Stroll usan una foto de 2025 con el uniforme de su equipo actual (Haas y Aston Martin). Las fotos oficiales de los equipos y de la F1 tienen derechos reservados y no se pueden reutilizar.
- **Galerías**: las de personas solo admiten fotos de las subcategorías del piloto o cuyo nombre o descripción lo mencionan, más una lista de exclusiones revisadas a mano (`galleryExclude` en `js/data/images.js`). Si apareciera alguna foto poco representativa, basta con añadir su nombre de archivo a esa lista.
- **Logotipos**: son marcas registradas; se usan solo para identificar a cada equipo, sin ánimo de lucro (ver *Créditos y licencias*). Si se borra un archivo de `assets/logos/`, la web muestra el monograma del equipo.
- Algunos videos pueden dejar de estar disponibles o bloquear la inserción; el reproductor prueba alternativas y ofrece un enlace externo.
- El límite horario de Jolpica (500 peticiones/hora) puede agotarse si se abren muchas fichas seguidas con la caché vacía.
- Wikimedia limita las peticiones por IP. Desde un PC doméstico no suele notarse; si aparece algún hueco en una galería, se reintenta en la siguiente visita (los resultados incompletos no se guardan).
