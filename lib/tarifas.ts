// lib/tarifas.ts
//
// 21-oct · INC-0020 · Las tarifas de la web: las mismas de la app.
//
// Se leen del servidor de la app (app.lamess.es/api/public/tarifas), que las
// saca de Ajustes → Zonas. Si la app no contesta, se usan las de RESPALDO de
// abajo (las que tenía la web), para que el calculador y las páginas de
// Tarifas nunca se queden vacíos.
//
// 27-oct · También las REGLAS (recogida de Barcelona, express, lluvia, peso,
// espera y por horas), que hasta hoy estaban escritas a mano en la web. Llegan
// en la misma respuesta de la app. Si la app no las manda (o alguna no tiene
// sentido), se usa la de RESPALDO: los valores que tenía la web.
//
// 28-oct · Panel de tarifas de la app: el peso puede ir por TRAMOS, y hay
// remolque/mudanza, devolución de envases y entrega no realizada. Y la app manda
// también la SIGUIENTE tarifa programada (`proxima`, con su «vale desde»): el
// calculador la usa para los envíos de ese día en adelante, como la app.

export type Ciudad = "Barcelona" | "Madrid";

export interface Reglas {
  /** Recogida fija en Barcelona, en cada envío (en Madrid la recogida va por su zona). */
  recogidaBarcelona: number;
  /** Express (para hoy): % sobre recogida + entregas. */
  expressPct: number;
  /** Lluvia: % sobre recogida + entregas. */
  lluviaPct: number;
  /** Con varias entregas, express y lluvia sobre recogida + entregas (true) o solo sobre las entregas. */
  recargoRutaSobreTotal: boolean;
  /** Kilos incluidos; cada kilo de más, a pesoEurKg. */
  pesoKgIncluidos: number;
  pesoEurKg: number;
  /** 28-oct · «kilo»: cada kilo de más a pesoEurKg; «tramos»: lo del tramo en que cae (pesoTramos). */
  pesoModo: "kilo" | "tramos";
  /** 28-oct · Los tramos, de menos a más kilos; el último, sin límite (hastaKg null). */
  pesoTramos: TramoPeso[];
  /** Minutos de espera gratis; si se pasa, todos los minutos a esperaEurMin. */
  esperaMinGratis: number;
  esperaEurMin: number;
  /** Por horas (algún punto fuera de las zonas), €/h. */
  horaLaborable: number;
  horaFestivo: number;
  horaExpress: number;
  /** 28-oct · Remolque o mudanza, €/h; null = no hay tarifa aparte. */
  horaRemolque: number | null;
  /** 28-oct · Devolución de envases, € por entrega; null = no se cobra. */
  devolucionEnvases: number | null;
  /** 28-oct · Entrega no realizada, € por intento; null = no hay precio aparte. */
  intentoFallido: number | null;
}

export interface TramoPeso { hastaKg: number | null; eur: number }

export interface ZonaTarifa {
  nombre: string;
  /** Códigos postales de la zona. */
  cps: string[];
  /** Precio de un punto en día laborable (null: la zona no tiene tarifa normal). */
  laborable: number | null;
  /** Domingo o festivo (la normal si no hay festiva). */
  festivo: number | null;
  /** Es la zona «Fuera de zona». */
  fuera: boolean;
}

export interface Tarifas {
  /** Por ciudad, como se llama en las zonas de la app («Barcelona», «Madrid»…). */
  ciudades: Partial<Record<string, ZonaTarifa[]>>;
  /** 27-oct · Recogida, express, lluvia, peso, espera y por horas. */
  reglas: Reglas;
  /** 28-oct · La siguiente tarifa programada en la app (desde `valeDesde`, «AAAA-MM-DD»), si hay. */
  proxima: { valeDesde: string; reglas: Reglas; ciudades: Partial<Record<string, ZonaTarifa[]>> } | null;
  /** «app»: leídas de la app; «respaldo»: las guardadas en la web. */
  origen: "app" | "respaldo";
  actualizado: string | null;
}

/** Dónde está la app. Se puede cambiar con LAMESS_APP_URL (para probar). */
export const URL_APP = (process.env.LAMESS_APP_URL || "https://app.lamess.es").replace(/\/$/, "");

const z = (nombre: string, laborable: number, festivo: number, cps: string[]): ZonaTarifa => ({ nombre, cps, laborable, festivo, fuera: false });

/** Las reglas que tenía la web, por si la app no las manda. */
export const REGLAS_RESPALDO: Reglas = {
  recogidaBarcelona: 2,
  expressPct: 50,
  lluviaPct: 30,
  recargoRutaSobreTotal: true,
  pesoKgIncluidos: 30,
  pesoEurKg: 0.1,
  esperaMinGratis: 15,
  esperaEurMin: 0.2,
  horaLaborable: 22,
  horaFestivo: 30,
  horaExpress: 35,
  pesoModo: "kilo",
  pesoTramos: [],
  horaRemolque: null,
  devolucionEnvases: null,
  intentoFallido: null,
};

/** Las que tenía la web (calculador), por si la app no contesta. */
export const RESPALDO: Tarifas = {
  origen: "respaldo",
  actualizado: null,
  reglas: REGLAS_RESPALDO,
  proxima: null,
  ciudades: {
    Barcelona: [
      z("Zona 1", 5.5, 9, ["08006", "08007", "08008", "08009", "08010", "08011", "08012", "08013", "08021", "08025", "08036", "08037"]),
      z("Zona 2", 7.5, 11, ["08001", "08002", "08003", "08015", "08018", "08026", "08029"]),
      z("Zona 3", 9, 12, ["08004", "08005", "08014", "08016", "08019", "08020", "08027", "08028", "08030", "08041"]),
      z("Zona 4", 10, 13, ["08017", "08022", "08023", "08024", "08031", "08032", "08033", "08034", "08035", "08042"]),
    ],
    Madrid: [
      z("Zona 1", 5.5, 8.5, ["28001", "28004", "28005", "28008", "28012", "28013", "28014", "28015"]),
      z("Zona 2", 7.5, 10.5, ["28002", "28003", "28006", "28007", "28009", "28010", "28011", "28017", "28019", "28045"]),
      z("Zona 3", 10, 13.5, ["28016", "28018", "28020", "28025", "28027", "28028", "28029", "28030", "28039", "28040"]),
      z("Zona 4", 13, 16.5, ["28022", "28031", "28032", "28033", "28034", "28035", "28036", "28037", "28038", "28041"]),
      z("Zona 5", 15, 18.5, ["28043", "28044", "28047", "28048"]),
    ],
  },
};

const numero = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

/** Lo que se acepta de cada regla; fuera de esto, la de respaldo. */
const LIMITES: Record<Exclude<keyof Reglas, "recargoRutaSobreTotal" | "pesoModo" | "pesoTramos" | "horaRemolque" | "devolucionEnvases" | "intentoFallido">, [number, number]> = {
  recogidaBarcelona: [0, 50],
  expressPct: [0, 300],
  lluviaPct: [0, 300],
  pesoKgIncluidos: [0, 1000],
  pesoEurKg: [0, 20],
  esperaMinGratis: [0, 240],
  esperaEurMin: [0, 10],
  horaLaborable: [1, 500],
  horaFestivo: [1, 500],
  horaExpress: [1, 500],
};

/** Las reglas que llegan de la app, una a una: la que falte o no tenga sentido, de respaldo. */
export function leerReglas(v: unknown): Reglas {
  const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  const r: Reglas = { ...REGLAS_RESPALDO };
  for (const k of Object.keys(LIMITES) as (keyof typeof LIMITES)[]) {
    const n = numero(o[k]);
    const [min, max] = LIMITES[k];
    if (n != null && n >= min && n <= max) r[k] = n;
  }
  if (typeof o.recargoRutaSobreTotal === "boolean") r.recargoRutaSobreTotal = o.recargoRutaSobreTotal;
  // 28-oct · Los tramos, solo si tienen sentido (si no, por kilo, como siempre).
  const tramos = leerTramos(o.pesoTramos, r.pesoKgIncluidos);
  if (o.pesoModo === "tramos" && tramos) { r.pesoModo = "tramos"; r.pesoTramos = tramos; }
  const opcional = (v: unknown, max: number): number | null => { const n = numero(v); return n != null && n >= 0 && n <= max ? n : null; };
  r.horaRemolque = opcional(o.horaRemolque, 500);
  r.devolucionEnvases = opcional(o.devolucionEnvases, 500);
  r.intentoFallido = opcional(o.intentoFallido, 500);
  return r;
}

/** 28-oct · Los tramos de peso: de menos a más kilos (por encima de los incluidos), el último sin límite. null si no valen. */
function leerTramos(v: unknown, incluidos: number): TramoPeso[] | null {
  if (!Array.isArray(v) || v.length === 0 || v.length > 20) return null;
  const out: TramoPeso[] = [];
  let antes = incluidos;
  for (let i = 0; i < v.length; i++) {
    const t = v[i] && typeof v[i] === "object" ? (v[i] as Record<string, unknown>) : null;
    const eur = numero(t?.eur);
    if (!t || eur == null || eur < 0 || eur > 1000) return null;
    if (i === v.length - 1) { out.push({ hastaKg: null, eur }); break; }
    const hasta = numero(t.hastaKg);
    if (hasta == null || hasta <= antes || hasta > 10000) return null;
    out.push({ hastaKg: hasta, eur });
    antes = hasta;
  }
  return out;
}

/** Las zonas de cada ciudad que llegan de la app, comprobadas. */
function leerCiudades(v: unknown): Tarifas["ciudades"] {
  const ciudades: Tarifas["ciudades"] = {};
  if (!v || typeof v !== "object") return ciudades;
  for (const [ciudad, lista] of Object.entries(v as Record<string, unknown>).slice(0, 50)) {
    if (!Array.isArray(lista)) continue;
    const zonas = lista.flatMap((x): ZonaTarifa[] => {
      if (!x || typeof x !== "object") return [];
      const o = x as Record<string, unknown>;
      if (typeof o.nombre !== "string" || !Array.isArray(o.cps)) return [];
      return [{
        nombre: o.nombre.slice(0, 80),
        cps: o.cps.filter((s): s is string => typeof s === "string").map(s => s.trim()).filter(Boolean),
        laborable: numero(o.laborable),
        festivo: numero(o.festivo),
        fuera: o.fuera === true,
      }];
    });
    if (zonas.length) ciudades[ciudad] = zonas;
  }
  return ciudades;
}

/** 28-oct · La siguiente tarifa que manda la app, comprobada (null si no hay o no vale). */
function leerProxima(v: unknown): Tarifas["proxima"] {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  if (typeof o.valeDesde !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(o.valeDesde)) return null;
  const ciudades = leerCiudades(o.ciudades);
  if (!ciudades.Barcelona && !ciudades.Madrid) return null;
  return { valeDesde: o.valeDesde, reglas: leerReglas(o.reglas), ciudades };
}

/** Lo que llega de la app, comprobado. Nada raro pasa: lo que no encaja se descarta. */
export function leerTarifas(cuerpo: unknown): Tarifas | null {
  if (!cuerpo || typeof cuerpo !== "object") return null;
  const c = cuerpo as { ok?: unknown; ciudades?: unknown; reglas?: unknown; proxima?: unknown; actualizado?: unknown };
  if (c.ok !== true || !c.ciudades || typeof c.ciudades !== "object") return null;
  const ciudades = leerCiudades(c.ciudades);
  if (!ciudades.Barcelona && !ciudades.Madrid) return null;
  return { ciudades, reglas: leerReglas(c.reglas), proxima: leerProxima(c.proxima), origen: "app", actualizado: typeof c.actualizado === "string" ? c.actualizado : null };
}

/**
 * En el servidor de la web: las tarifas de la app (guardadas 5 minutos), o las
 * de respaldo si la app no contesta en 4 segundos. Nunca lanza.
 */
export async function cargarTarifas(): Promise<Tarifas> {
  try {
    const r = await fetch(`${URL_APP}/api/public/tarifas`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    });
    if (!r.ok) return RESPALDO;
    const t = leerTarifas(await r.json());
    if (!t) return RESPALDO;
    // Una ciudad que la app no tenga, de respaldo (también en la siguiente tarifa).
    const ciudades = { ...RESPALDO.ciudades, ...t.ciudades };
    return { ...t, ciudades, proxima: t.proxima ? { ...t.proxima, ciudades: { ...ciudades, ...t.proxima.ciudades } } : null };
  } catch {
    return RESPALDO;
  }
}

/** «5,5 €», «9 €». */
export const euros = (n: number | null | undefined): string =>
  n == null ? "—" : `${(Math.round(n * 100) / 100).toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;

/** 27-oct · «50 %», «12,5 %». */
export const pct = (n: number): string => `${n.toLocaleString("es-ES", { maximumFractionDigits: 2 })} %`;

/** 27-oct · «30», «12,5». */
export const num = (n: number): string => n.toLocaleString("es-ES", { maximumFractionDigits: 2 });
