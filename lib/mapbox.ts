// lib/mapbox.ts
//
// 21-oct · INC-0020 · Mapbox en la web, igual que en la app: las sugerencias de
// direcciones (Geocoding v5, España, en castellano, con preferencia por la
// ciudad) y la ruta en bici (Directions v5, perfil «cycling»).
//
// El token es NEXT_PUBLIC_MAPBOX_TOKEN (uno público, limitado a lamess.es). Sin
// él, el calculador funciona igual con el código postal escrito a mano.

import type { Ciudad } from "@/lib/tarifas";

export const TOKEN_MAPBOX = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const CENTRO: Record<Ciudad, [number, number]> = {
  Barcelona: [2.1734, 41.3851],
  Madrid: [-3.7038, 40.4168],
};

/** Una dirección elegida. */
export interface Punto {
  /** «Carrer de Pujades 77». */
  texto: string;
  cp: string | null;
  /** El municipio de Mapbox («place»): «Barcelona», «Badalona»… */
  municipio: string | null;
  lng: number | null;
  lat: number | null;
}

export interface Sugerencia {
  id: string;
  calle: string;
  donde: string;
  punto: Punto;
}

interface Contexto { id?: string; text?: string }
interface Feature { id?: string; text?: string; address?: string; place_name?: string; center?: [number, number]; context?: Contexto[] }

/** Como featureToLocation de la app: calle + número, CP y municipio del contexto. */
export function sugerenciaDe(f: Feature): Sugerencia | null {
  if (!f || typeof f.text !== "string" || !f.id) return null;
  const ctx = Array.isArray(f.context) ? f.context : [];
  const cp = ctx.find(c => c.id?.startsWith("postcode"))?.text ?? null;
  const municipio = ctx.find(c => c.id?.startsWith("place"))?.text ?? null;
  const calle = f.address ? `${f.text} ${f.address}` : f.text;
  return {
    id: f.id,
    calle,
    donde: [cp, municipio].filter(Boolean).join(" ") || (f.place_name ?? ""),
    punto: { texto: calle, cp, municipio, lng: f.center?.[0] ?? null, lat: f.center?.[1] ?? null },
  };
}

/** Sugerencias para lo escrito. Nunca lanza: si algo falla, lista vacía. */
export async function buscarDirecciones(texto: string, ciudad: Ciudad | null, senal?: AbortSignal): Promise<Sugerencia[]> {
  const q = texto.trim();
  if (!TOKEN_MAPBOX || q.length < 3) return [];
  const cerca = ciudad ? CENTRO[ciudad].join(",") : "ip";
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
    `?country=es&language=es&autocomplete=true&types=address,poi&limit=5&proximity=${cerca}` +
    `&access_token=${TOKEN_MAPBOX}`;
  try {
    const r = await fetch(url, { signal: senal });
    if (!r.ok) return [];
    const j = (await r.json()) as { features?: Feature[] };
    return (j.features ?? []).map(sugerenciaDe).filter((s): s is Sugerencia => s !== null);
  } catch {
    return [];
  }
}

export interface Ruta {
  /** [lng, lat] de la línea. */
  linea: [number, number][];
  km: number;
  minutos: number;
}

/** La ruta en bici entre los puntos, en orden. Null si no hay token o falla. */
export async function rutaEnBici(puntos: [number, number][], senal?: AbortSignal): Promise<Ruta | null> {
  if (!TOKEN_MAPBOX || puntos.length < 2 || puntos.length > 25) return null;
  const coords = puntos.map(p => `${p[0]},${p[1]}`).join(";");
  const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${coords}?geometries=geojson&overview=full&language=es&access_token=${TOKEN_MAPBOX}`;
  try {
    const r = await fetch(url, { signal: senal });
    if (!r.ok) return null;
    const j = (await r.json()) as { routes?: { distance?: number; duration?: number; geometry?: { coordinates?: [number, number][] } }[] };
    const ruta = j.routes?.[0];
    if (!ruta?.geometry?.coordinates?.length || typeof ruta.distance !== "number") return null;
    return { linea: ruta.geometry.coordinates, km: ruta.distance / 1000, minutos: Math.max(1, Math.round((ruta.duration ?? 0) / 60)) };
  } catch {
    return null;
  }
}

/** Gramos de CO₂ por km de una furgoneta urbana (el mismo dato que la app: 180 g/km). */
export const CO2_G_POR_KM = 180;
