/* =========================================================
   Estadísticas calculadas a partir de la API (nunca inventadas).
   Notas metodológicas que se muestran en la interfaz:
   - "Poles" de carrera = salidas desde la posición 1 de parrilla
     (grid = 1). Puede diferir de las poles oficiales por sanciones.
   - Podios = suma de 1º, 2º y 3º puestos en carreras de GP.
   - Las carreras al sprint no cuentan como victorias de GP.
   ========================================================= */
(function () {
  const { HOUR, DAY } = F1.api.TTL;

  /** Estadísticas de toda la carrera de un piloto. */
  async function driverCareer(id, { active = false } = {}) {
    const ttl = active ? 12 * HOUR : 14 * DAY;
    const t = (p) => F1.api.total(`drivers/${id}/${p}`, { ttl });
    const starts = await t("results.json");
    const wins = await t("results/1.json");
    const p2 = await t("results/2.json");
    const p3 = await t("results/3.json");
    const poles = await t("grid/1/results.json");
    const seasonsR = await F1.api.get(`drivers/${id}/seasons.json?limit=100`, { ttl });
    const teamsR = await F1.api.get(`drivers/${id}/constructors.json?limit=100`, { ttl });
    const seasons = (seasonsR.data.SeasonTable?.Seasons || []).map((s) => +s.season);
    return {
      starts, wins, podiums: wins + p2 + p3, poles,
      seasons: seasons.length, seasonList: seasons, first: seasons[0], last: seasons[seasons.length - 1],
      teams: (teamsR.data.ConstructorTable?.Constructors || []).map((c) => ({ id: c.constructorId, name: c.name })),
      ts: Math.min(seasonsR.ts, teamsR.ts),
    };
  }

  /** Datos del piloto (nombre, nacionalidad, fecha de nacimiento, url Wikipedia). */
  async function driverInfo(id) {
    const r = await F1.api.get(`drivers/${id}.json`, { ttl: 30 * DAY });
    return r.data.DriverTable?.Drivers?.[0] || null;
  }

  /** Estadísticas de una escudería (suma todas sus variantes de ID). */
  async function teamCareer(ids) {
    let wins = 0, poles = 0;
    const seasons = new Set();
    for (const id of ids) {
      wins += await F1.api.total(`constructors/${id}/results/1.json`, { ttl: 7 * DAY });
      poles += await F1.api.total(`constructors/${id}/grid/1/results.json`, { ttl: 7 * DAY });
      const s = await F1.api.get(`constructors/${id}/seasons.json?limit=100`, { ttl: 7 * DAY });
      (s.data.SeasonTable?.Seasons || []).forEach((x) => seasons.add(+x.season));
    }
    const list = Array.from(seasons).sort((a, b) => a - b);
    return { wins, poles, seasons: list.length, first: list[0], last: list[list.length - 1] };
  }

  /** Estadísticas detalladas de una temporada (por piloto). */
  async function season(year = "current") {
    const isCurrent = year === "current";
    const ttl = isCurrent ? HOUR : 30 * DAY;
    const res = await F1.api.allRaces(`${year}/results.json`, "Results", { ttl });
    const qual = await F1.api.allRaces(`${year}/qualifying.json`, "QualifyingResults", { ttl });
    const by = {};
    const ensure = (d) => (by[d.driverId] = by[d.driverId] || { driver: d, wins: 0, podiums: 0, poles: 0, dnf: 0, fastest: 0, results: [] });
    res.races.forEach((race) => race.Results.forEach((r) => {
      const s = ensure(r.Driver);
      const pos = +r.position;
      if (pos === 1) s.wins++;
      if (pos <= 3) s.podiums++;
      if (r.FastestLap?.rank === "1") s.fastest++;
      if (!/^\d+$/.test(r.positionText)) s.dnf++;
      s.results.push({ round: +race.round, race: race.raceName, pos: r.positionText, points: +r.points, status: r.status, constructor: r.Constructor });
    }));
    qual.races.forEach((race) => race.QualifyingResults.forEach((q) => { if (q.position === "1") ensure(q.Driver).poles++; }));
    return { by, races: res.races, ts: Math.min(res.ts, qual.ts), stale: res.stale || qual.stale };
  }

  /** Datos de un circuito: ganadores y vuelta rápida más baja registrada. */
  async function circuit(id) {
    const winners = await F1.api.allRaces(`circuits/${id}/results/1.json`, "Results", { ttl: 7 * DAY });
    let fastest = null;
    try {
      const fl = await F1.api.allRaces(`circuits/${id}/fastest/1/results.json`, "Results", { ttl: 7 * DAY });
      fl.races.forEach((race) => race.Results.forEach((r) => {
        const t = r.FastestLap?.Time?.time;
        const ms = toMs(t);
        if (ms && (!fastest || ms < fastest.ms)) fastest = { ms, time: t, season: race.season, driver: r.Driver, race: race.raceName };
      }));
    } catch {}
    return { races: winners.races, fastest, ts: winners.ts };
  }

  function toMs(t) {
    if (!t) return null;
    const m = t.match(/^(?:(\d+):)?(\d+)\.(\d+)$/);
    if (!m) return null;
    return (+(m[1] || 0)) * 60000 + (+m[2]) * 1000 + +m[3].padEnd(3, "0");
  }

  /** Clasificación final (o actual) de pilotos de una temporada. */
  async function standings(year) {
    const ttl = year === "current" ? HOUR : 60 * DAY;
    const r = await F1.api.get(`${year}/driverstandings.json?limit=100`, { ttl });
    return r.data.StandingsTable?.StandingsLists?.[0]?.DriverStandings || [];
  }

  F1.stats = { driverCareer, driverInfo, teamCareer, season, circuit, standings, toMs };
})();
