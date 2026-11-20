/* Nacionalidades: gentilicio usado por la API Jolpica → [código ISO de bandera, nombre en español].
   Las banderas se muestran como imágenes (flagcdn.com) porque Windows no dibuja emojis de banderas. */
F1.data.nations = {
  British: ["gb", "Reino Unido"], German: ["de", "Alemania"], "East German": ["de", "Alemania Oriental"], Italian: ["it", "Italia"],
  Argentine: ["ar", "Argentina"], Argentinian: ["ar", "Argentina"], Brazilian: ["br", "Brasil"], Finnish: ["fi", "Finlandia"],
  French: ["fr", "Francia"], Austrian: ["at", "Austria"], Australian: ["au", "Australia"], "New Zealander": ["nz", "Nueva Zelanda"],
  American: ["us", "Estados Unidos"], "South African": ["za", "Sudáfrica"], Spanish: ["es", "España"], Canadian: ["ca", "Canadá"],
  Dutch: ["nl", "Países Bajos"], Mexican: ["mx", "México"], Monegasque: ["mc", "Mónaco"], Thai: ["th", "Tailandia"],
  Japanese: ["jp", "Japón"], Danish: ["dk", "Dinamarca"], Chinese: ["cn", "China"], Swedish: ["se", "Suecia"],
  Belgian: ["be", "Bélgica"], Swiss: ["ch", "Suiza"], Polish: ["pl", "Polonia"], Russian: ["ru", "Rusia"],
  Colombian: ["co", "Colombia"], Venezuelan: ["ve", "Venezuela"], Indian: ["in", "India"], Irish: ["ie", "Irlanda"],
  Portuguese: ["pt", "Portugal"], Hungarian: ["hu", "Hungría"], Indonesian: ["id", "Indonesia"], Malaysian: ["my", "Malasia"],
  Czech: ["cz", "Chequia"], Uruguayan: ["uy", "Uruguay"], Chilean: ["cl", "Chile"], Rhodesian: ["zw", "Rodesia"],
  Liechtensteiner: ["li", "Liechtenstein"], Emirati: ["ae", "Emiratos Árabes"], Estonian: ["ee", "Estonia"],
};
F1.nat = (n) => F1.data.nations[n] || ["", n || "—"];
