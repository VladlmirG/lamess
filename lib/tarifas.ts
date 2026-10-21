// lib/tarifas.ts
//
// 21-oct · INC-0020 · Las tarifas de la web: las mismas de la app.
//
// Se leen del servidor de la app (app.lamess.es/api/public/tarifas), que las
// saca de Ajustes → Zonas. Si la app no contesta, se usan las de RESPALDO de
// abajo (las que tenía la web), para que el calculador y las páginas de
// Tarifas nunca se queden vacíos.

export type Ciudad = "Barcelona" | "Madrid";

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
  /** «app»: leídas de la app; «respaldo»: las guardadas en la web. */
  origen: "app" | "respaldo";
  actualizado: string | null;
}

/** Dónde está la app. Se puede cambiar con LAMESS_APP_URL (para probar). */
export const URL_APP = (process.env.LAMESS_APP_URL || "https://app.lamess.es").replace(/\/$/, "");

const z = (nombre: string, laborable: number, festivo: number, cps: string[]): ZonaTarifa => ({ nombre, cps, laborable, festivo, fuera: false });

/** Las que tenía la web (calculador), por si la app no contesta. */
export const RESPALDO: Tarifas = {
  origen: "respaldo",
  actualizado: null,
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

/** Lo que llega de la app, comprobado. Nada raro pasa: lo que no encaja se descarta. */
export function leerTarifas(cuerpo: unknown): Tarifas | null {
  if (!cuerpo || typeof cuerpo !== "object") return null;
  const c = cuerpo as { ok?: unknown; ciudades?: unknown; actualizado?: unknown };
  if (c.ok !== true || !c.ciudades || typeof c.ciudades !== "object") return null;
  const ciudades: Tarifas["ciudades"] = {};
  for (const [ciudad, lista] of Object.entries(c.ciudades as Record<string, unknown>).slice(0, 50)) {
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
  if (!ciudades.Barcelona && !ciudades.Madrid) return null;
  return { ciudades, origen: "app", actualizado: typeof c.actualizado === "string" ? c.actualizado : null };
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
    // Una ciudad que la app no tenga, de respaldo.
    return { ...t, ciudades: { ...RESPALDO.ciudades, ...t.ciudades } };
  } catch {
    return RESPALDO;
  }
}

/** «5,5 €», «9 €». */
export const euros = (n: number | null | undefined): string =>
  n == null ? "—" : `${(Math.round(n * 100) / 100).toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;
