// lib/precio.ts
//
// 21-oct · INC-0020 · El precio de un envío, calculado EXACTAMENTE como lo
// calcula la app al pedir (components/deliveries/DeliveryForm.tsx de la app,
// en modo cliente), con las tarifas de Ajustes → Zonas (lib/tarifas.ts):
//
//   · Festivo: domingos, los festivos de la lista de la app (los de Cataluña,
//     también en Madrid, como hace la app) y Viernes Santo y Lunes de Pascua.
//   · Express: si es para hoy, +50 % (en la app, al pedir para hoy).
//   · Barcelona: 2 € de recogida + la zona de cada entrega.
//     Madrid: la zona de la recogida + la de cada entrega.
//   · Lluvia: +30 % sobre recogida + entregas (lo marca el equipo ese día).
//   · Peso: hasta 30 kg incluido; lo que pase, 0,10 € el kilo.
//   · Fuera de las zonas (algún punto): por horas, 1 h de entrada, a 22 €/h
//     (30 en festivo, 35 en express); sin lluvia ni peso.
//   · Esperas: aparte (15 min gratis; después 0,20 € el minuto).
//
// Es el precio que la app guarda al pedir (el que se cobra), con sus mismos
// redondeos. Cualquier cambio aquí: comprobar con las pruebas contra el código
// de la app.
//
// 27-oct · Los importes de arriba (2 €, +50 %, +30 %, 30 kg, 0,10 €, 15 min,
// 0,20 €, 22/30/35 €/h) ya no están escritos aquí: llegan de la app con las
// zonas (`t.reglas`, ver lib/tarifas), con los de siempre de respaldo. La
// cuenta es la misma.
//
// 28-oct · Panel de tarifas de la app: el peso puede ir por tramos (cada envío
// paga lo de su tramo, como `cargoPeso` de la app), y si la app manda una
// tarifa programada (`t.proxima`), un envío de ese día en adelante se calcula
// con ella, como en la app.

import { num, pct, type Ciudad, type Reglas, type Tarifas, type ZonaTarifa } from "@/lib/tarifas";

// ── Festivos (la misma lista que la app) ────────────────────────────────────

const FESTIVOS_CAT = new Set([
  "01-01", "01-06", "04-23", "05-01", "06-24", "08-15", "09-11",
  "09-24", "10-12", "11-01", "12-06", "12-08", "12-25", "12-26",
]);

function pascua(anio: number): string[] {
  const a = anio % 19, b = Math.floor(anio / 100), c = anio % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  const domingo = Date.UTC(anio, mes - 1, dia);
  const md = (t: number) => { const x = new Date(t); return `${String(x.getUTCMonth() + 1).padStart(2, "0")}-${String(x.getUTCDate()).padStart(2, "0")}`; };
  return [md(domingo - 2 * 86400000), md(domingo + 86400000)];
}

/** «2026-10-25» → domingo, festivo de la lista o Semana Santa. */
export function esFestivo(fecha: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fecha);
  if (!m) return false;
  const [anio, mes, dia] = [+m[1], +m[2], +m[3]];
  if (new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay() === 0) return true;
  const md = `${m[2]}-${m[3]}`;
  return FESTIVOS_CAT.has(md) || pascua(anio).includes(md);
}

const MADRID = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" });
/** «2026-10-21»: hoy en Madrid (lo que la app entiende por «hoy»). */
export const hoyEnMadrid = (ahora: number = Date.now()): string => MADRID.format(ahora);
export function sumarDias(fecha: string, dias: number): string {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + dias)).toISOString().slice(0, 10);
}

// ── Zonas (como findZoneByPostalCode / getOutOfZone de la app) ───────────────

const zonasDe = (t: Tarifas, ciudad: string | null | undefined): ZonaTarifa[] => (ciudad ? t.ciudades[ciudad] ?? [] : []);

export function zonaDeCp(t: Tarifas, cp: string | null | undefined, ciudad: string | null | undefined): ZonaTarifa | null {
  if (!cp) return null;
  return zonasDe(t, ciudad).find(z => z.cps.includes(cp)) ?? null;
}
const zonaFuera = (t: Tarifas, ciudad: string): ZonaTarifa | null => zonasDe(t, ciudad).find(z => z.fuera) ?? null;
const precioZona = (z: ZonaTarifa | null, festivo: boolean): number | null => (z ? (festivo ? z.festivo : z.laborable) : null);

/** Como isCpInSpecificZone: sin CP (o con menos de 4 cifras) aún no se sabe → no cuenta como fuera. */
function enZona(t: Tarifas, cp: string | null | undefined, ciudad: string | null | undefined): boolean {
  if (!cp || cp.trim().length < 4) return true;
  return zonaDeCp(t, cp.trim(), ciudad) !== null;
}

// ── El precio ───────────────────────────────────────────────────────────────

export interface PuntoPrecio {
  /** Código postal (de la dirección elegida). */
  cp: string | null;
  /** Municipio (el «place» de Mapbox, como guarda la app): «Barcelona», «Badalona»… */
  municipio: string | null;
}

export interface EntradaPrecio {
  /** La ciudad del envío (la de la recogida). */
  ciudad: Ciudad;
  recogida: PuntoPrecio;
  entregas: PuntoPrecio[];
  /** Día de la recogida, «AAAA-MM-DD». */
  fecha: string;
  /** Hoy en Madrid, «AAAA-MM-DD» (ver hoyEnMadrid). */
  hoy: string;
  kg: number;
  /** Ver el precio con lluvia. */
  lluvia: boolean;
}

export type TipoLinea = "base" | "festivo" | "express" | "lluvia" | "peso" | "horas";
export interface LineaPrecio { texto: string; importe: number; tipo: TipoLinea }

export interface ResultadoPrecio {
  modo: "paradas" | "horas";
  /** 28-oct · Las reglas con que se ha calculado (las de hoy o las de la tarifa programada). */
  reglas: Reglas;
  /** 28-oct · Si se ha calculado con la tarifa programada: desde qué día vale («AAAA-MM-DD»). */
  tarifaDesde: string | null;
  total: number;
  lineas: LineaPrecio[];
  festivo: boolean;
  express: boolean;
  /** Lo que sumaría la lluvia (0 por horas). */
  conLluvia: number;
  /** Por horas: la tarifa (22, 30 o 35). */
  tarifaHora: number | null;
  /** Los puntos fuera de las zonas: «recogida», «entrega 2»… */
  fuera: string[];
}

const r2 = (n: number) => parseFloat(n.toFixed(2));

/** 28-oct · El tramo de peso en que caen unos kilos (modo tramos), con sus límites. */
export function tramoDe(r: Reglas, kg: number): { desde: number; hasta: number | null; eur: number } | null {
  if (r.pesoModo !== "tramos" || !(kg > r.pesoKgIncluidos)) return null;
  let desde = r.pesoKgIncluidos;
  for (const t of r.pesoTramos) {
    if (t.hastaKg != null && t.hastaKg <= r.pesoKgIncluidos) continue;
    if (t.hastaKg == null || kg <= t.hastaKg) return { desde, hasta: t.hastaKg, eur: t.eur };
    desde = t.hastaKg;
  }
  return null;
}

/** 28-oct · El cargo de peso, como la app: por kilo de más (redondeado como siempre en la web) o lo del tramo. */
export function cargoPeso(r: Reglas, kg: number): number {
  if (!(kg > r.pesoKgIncluidos)) return 0;
  if (r.pesoModo === "tramos") return tramoDe(r, kg)?.eur ?? 0;
  return r2((kg - r.pesoKgIncluidos) * r.pesoEurKg);
}

/** 28-oct · Las tarifas con que se calcula un envío de ese día: la programada, si ya vale ese día; si no, la de hoy. */
export function tarifasDelDia(t: Tarifas, fecha: string): Tarifas {
  if (!t.proxima || !(fecha >= t.proxima.valeDesde)) return t;
  return { ...t, reglas: t.proxima.reglas, ciudades: t.proxima.ciudades, proxima: null };
}

/**
 * El precio que la app GUARDA al pedir (el que se cobra), en modo cliente y sin
 * descuentos de cliente. Es la misma cuenta para una entrega y para varias:
 * recogida + entregas + peso + express + lluvia, cada recargo redondeado.
 */
export function calcularPrecio(tarifas: Tarifas, e: EntradaPrecio): ResultadoPrecio {
  const t = tarifasDelDia(tarifas, e.fecha);
  const tarifaDesde = t === tarifas ? null : tarifas.proxima?.valeDesde ?? null;
  const r = t.reglas;
  const ciudad = e.ciudad;
  const festivo = esFestivo(e.fecha);
  const express = e.fecha === e.hoy;
  const kg = Number.isFinite(e.kg) && e.kg > 0 ? e.kg : 0;

  // ¿Algún punto fuera de las zonas? (isOutOfClientZone del modo cliente)
  const ciudadRecogida = e.recogida.municipio || ciudad;
  const fuera: string[] = [];
  if (!enZona(t, e.recogida.cp, ciudadRecogida)) fuera.push("recogida");
  const conCp = e.entregas.map((d, i) => ({ d, i })).filter(({ d }) => d.cp && d.cp.trim().length >= 4);
  for (const { d, i } of conCp) if (!enZona(t, d.cp, d.municipio || ciudadRecogida)) fuera.push(e.entregas.length > 1 ? `entrega ${i + 1}` : "entrega");
  const porHoras = conCp.length > 0 && fuera.length > 0;

  if (porHoras) {
    const tarifa = express ? r.horaExpress : festivo ? r.horaFestivo : r.horaLaborable;
    return {
      modo: "horas", reglas: r, tarifaDesde, total: r2(tarifa * 1), festivo, express, conLluvia: 0, tarifaHora: tarifa, fuera,
      lineas: [{ texto: `Por horas: 1 h × ${tarifa} €/h`, importe: tarifa, tipo: "horas" }],
    };
  }

  const tipoZona: TipoLinea = festivo ? "festivo" : "base";
  const lineas: LineaPrecio[] = [];

  // Recogida (calculatePickupFee): Barcelona, la fija (2 €); Madrid, la zona de la recogida.
  let recogida: number;
  if (ciudad === "Barcelona") {
    recogida = r.recogidaBarcelona;
    lineas.push({ texto: "Recogida fija", importe: recogida, tipo: "base" });
  } else {
    const zr = zonaDeCp(t, e.recogida.cp, ciudad);
    recogida = precioZona(zr, festivo) ?? 0;
    lineas.push({ texto: zr ? `Recogida · ${zr.nombre}` : "Recogida", importe: recogida, tipo: zr ? tipoZona : "base" });
  }

  // Cada entrega (calculateDropoffOnlyPrice): su zona, o «Fuera de zona».
  let paradas = 0;
  e.entregas.forEach((d, i) => {
    const cp = d.cp && d.cp.length >= 5 ? d.cp : "08001";
    const z = zonaDeCp(t, cp, ciudad) ?? zonaFuera(t, ciudad);
    const p = precioZona(z, festivo) || 0;
    paradas += p;
    const n = e.entregas.length > 1 ? `Entrega ${i + 1}` : "Entrega";
    lineas.push({ texto: z ? `${n} · ${z.nombre}` : n, importe: p, tipo: tipoZona });
  });

  // Express y lluvia: sobre recogida + entregas (con varias entregas, según la
  // regla de la app `recargoRutaSobreTotal`; hoy, también sobre la recogida).
  const base = e.entregas.length > 1 && !r.recargoRutaSobreTotal ? paradas : recogida + paradas;
  const fExpress = r.expressPct / 100, fLluvia = r.lluviaPct / 100;
  const peso = cargoPeso(r, kg);
  const extraExpress = express ? r2(base * fExpress) : 0;
  const extraLluvia = e.lluvia ? r2(base * fLluvia) : 0;
  if (express) lineas.push({ texto: `Express, para hoy (+${pct(r.expressPct)})`, importe: extraExpress, tipo: "express" });
  if (e.lluvia) lineas.push({ texto: `Lluvia (+${pct(r.lluviaPct)})`, importe: extraLluvia, tipo: "lluvia" });
  if (peso) {
    const tramo = tramoDe(r, kg);
    lineas.push({
      texto: tramo
        ? `Peso: ${num(kg)} kg (${tramo.hasta == null ? `más de ${num(tramo.desde)} kg` : `tramo ${num(tramo.desde)}–${num(tramo.hasta)} kg`})`
        : `Peso: ${r2(kg - r.pesoKgIncluidos).toLocaleString("es-ES")} kg de más × ${textosReglas(r).eurKg}`,
      importe: peso, tipo: "peso",
    });
  }

  return {
    modo: "paradas", reglas: r, tarifaDesde, total: r2(paradas + recogida + peso + extraExpress + extraLluvia), lineas, festivo, express,
    conLluvia: r2(base * fLluvia), tarifaHora: null, fuera: [],
  };
}

/** Lo que costaría una espera de esos minutos (como la app: 15 gratis; después, todos a 0,20 €). */
export const cargoEspera = (r: Reglas, min: number): number => (min > r.esperaMinGratis ? Math.round(min * r.esperaEurMin * 100) / 100 : 0);

/** 27-oct · Los textos de las reglas, para las páginas de Tarifas, el calculador y las preguntas. */
export function textosReglas(r: Reglas) {
  const dosDec = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const eur = (n: number) => `${n.toLocaleString("es-ES", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })} €`;
  return {
    /** «2 €» */
    recogida: eur(r.recogidaBarcelona),
    /** «+50 %» */
    express: `+${pct(r.expressPct)}`,
    /** «+30 %» */
    lluvia: `+${pct(r.lluviaPct)}`,
    /** «30» (kg) */
    kg: num(r.pesoKgIncluidos),
    /** «0,10 €» */
    eurKg: `${dosDec(r.pesoEurKg)} €`,
    /** «15» (min) */
    minGratis: num(r.esperaMinGratis),
    /** «0,20 €» */
    eurMin: `${dosDec(r.esperaEurMin)} €`,
    /** «22», «30», «35» (€/h) */
    horaLaborable: num(r.horaLaborable),
    horaFestivo: num(r.horaFestivo),
    horaExpress: num(r.horaExpress),
    /** 28-oct · «30–50 kg: +3 €», …, «más de 120 kg: +15 €» (vacío si va por kilo). */
    tramos: textosTramos(r).map(t => `${t.kg}: +${eur(t.eur)}`),
    /** 28-oct · La ayuda del peso del calculador. Por kilo, la de siempre. */
    pesoAyuda: r.pesoModo === "tramos"
      ? `Hasta ${num(r.pesoKgIncluidos)} kg, incluido. Después, por tramos: ${textosTramos(r).map(t => `${t.kg}, ${eur(t.eur)}`).join("; ")}.`
      : `Hasta ${num(r.pesoKgIncluidos)} kg, incluido. Cada kilo de más: ${dosDec(r.pesoEurKg)} €.`,
    /** 28-oct · Lo del peso en las preguntas frecuentes. Por kilo, lo de siempre. */
    pesoFrase: r.pesoModo === "tramos"
      ? `Hasta ${num(r.pesoKgIncluidos)} kg va incluido; de ahí, por tramos: ${textosTramos(r).map(t => `${t.kg}, +${eur(t.eur)}`).join("; ")}.`
      : `Hasta ${num(r.pesoKgIncluidos)} kg va incluido; cada kilo de más, ${dosDec(r.pesoEurKg)} €.`,
  };
}

/** 28-oct · Los tramos de peso en texto: «30–50 kg», …, «más de 120 kg», con sus euros. */
export function textosTramos(r: Reglas): { kg: string; eur: number }[] {
  if (r.pesoModo !== "tramos") return [];
  const out: { kg: string; eur: number }[] = [];
  let desde = r.pesoKgIncluidos;
  for (const t of r.pesoTramos) {
    if (t.hastaKg != null && t.hastaKg <= r.pesoKgIncluidos) continue;
    out.push({ kg: t.hastaKg == null ? `más de ${num(desde)} kg` : `${num(desde)}–${num(t.hastaKg)} kg`, eur: t.eur });
    if (t.hastaKg != null) desde = t.hastaKg;
  }
  return out;
}

/** La ciudad de un punto por su CP: 08 Barcelona, 28 Madrid (como la app, que manda el CP sobre el nombre). */
export function ciudadDeCp(cp: string | null | undefined): Ciudad | null {
  const c = (cp ?? "").replace(/\D/g, "");
  if (c.startsWith("08")) return "Barcelona";
  if (c.startsWith("28")) return "Madrid";
  return null;
}
