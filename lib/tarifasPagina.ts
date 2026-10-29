// lib/tarifasPagina.ts
//
// 21-oct · INC-0020 · Las tablas de las páginas de Tarifas (Barcelona y
// Madrid), con las zonas y precios de la app (lib/tarifas): los mismos del
// calculador. Sin la zona «Fuera de zona» (fuera de zonas se cobra por horas).

//
// 27-oct · Y los suplementos (recogida, express, lluvia, espera, peso) y la
// tarifa por horas, también de la app (`tarifas.reglas`), escritos como los
// escribía la página: «2€», «+50%», «0,20€/min».
//
// 28-oct · Panel de tarifas de la app: el peso por tramos (`pesoTramos`) y los
// extras que traiga la tarifa (remolque, devolución de envases, entrega no
// realizada). Por kilo y sin extras, la página sale igual que antes.

import type { Ciudad, Reglas, Tarifas } from "@/lib/tarifas";

export interface FilaZona {
  zona: string;
  /** «5,5€» */
  lab: string;
  fes: string;
  codes: string[];
  laborable: number;
  festivo: number;
}

/** «5,5€», «16€» (como escribía la web). */
export const precioCorto = (n: number): string => `${(Math.round(n * 100) / 100).toLocaleString("es-ES", { maximumFractionDigits: 2 })}€`;

/** Los textos de los suplementos y de la tarifa por horas, al estilo de la página. */
export interface TextosPagina {
  /** «2€» (recogida fija de Barcelona) */
  recogida: string;
  /** «+50%» */
  express: string;
  /** «+30%» */
  lluvia: string;
  /** «15 min gratis; si pasa, 0,20€/min» */
  espera: string;
  /** «+0,10€/kg» */
  peso: string;
  /** «(+30kg)» */
  pesoDesde: string;
  /** «22€», «30€», «35€» */
  horaLaborable: string;
  horaFestivo: string;
  horaExpress: string;
  /** La recogida de Barcelona, en número (para el ejemplo). */
  recogidaEur: number;
  /** 28-oct · Por tramos: «30–50kg: +3€», …, «+120kg: +15€». Vacío si va por kilo. */
  pesoTramos: string[];
  /** 28-oct · Los extras de la tarifa, si los trae: «Remolque o mudanza» → «40€/hora». */
  extras: { etiqueta: string; texto: string }[];
}

export function textosPagina(r: Reglas): TextosPagina {
  const n = (x: number) => x.toLocaleString("es-ES", { maximumFractionDigits: 2 });
  const dos = (x: number) => x.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return {
    recogida: precioCorto(r.recogidaBarcelona),
    express: `+${n(r.expressPct)}%`,
    lluvia: `+${n(r.lluviaPct)}%`,
    espera: `${n(r.esperaMinGratis)} min gratis; si pasa, ${dos(r.esperaEurMin)}€/min`,
    peso: r.pesoModo === "tramos" ? "por tramos" : `+${dos(r.pesoEurKg)}€/kg`,
    pesoDesde: r.pesoModo === "tramos" ? `(desde ${n(r.pesoKgIncluidos)}kg)` : `(+${n(r.pesoKgIncluidos)}kg)`,
    horaLaborable: precioCorto(r.horaLaborable),
    horaFestivo: precioCorto(r.horaFestivo),
    horaExpress: precioCorto(r.horaExpress),
    recogidaEur: r.recogidaBarcelona,
    pesoTramos: tramosCortos(r),
    extras: [
      ...(r.horaRemolque != null ? [{ etiqueta: "Remolque o mudanza", texto: `${precioCorto(r.horaRemolque)}/hora` }] : []),
      ...(r.devolucionEnvases != null ? [{ etiqueta: "Devolución de envases", texto: `${precioCorto(r.devolucionEnvases)} por entrega` }] : []),
      ...(r.intentoFallido != null ? [{ etiqueta: "Entrega no realizada", texto: `${precioCorto(r.intentoFallido)} por intento` }] : []),
    ],
  };
}

/** 28-oct · Los tramos al estilo de la página: «30–50kg: +3€», …, «+120kg: +15€». */
function tramosCortos(r: Reglas): string[] {
  if (r.pesoModo !== "tramos") return [];
  const n = (x: number) => x.toLocaleString("es-ES", { maximumFractionDigits: 2 });
  const out: string[] = [];
  let desde = r.pesoKgIncluidos;
  for (const t of r.pesoTramos) {
    if (t.hastaKg != null && t.hastaKg <= r.pesoKgIncluidos) continue;
    out.push(`${t.hastaKg == null ? `+${n(desde)}kg` : `${n(desde)}–${n(t.hastaKg)}kg`}: +${precioCorto(t.eur)}`);
    if (t.hastaKg != null) desde = t.hastaKg;
  }
  return out;
}

export function filasZonas(t: Tarifas, ciudad: Ciudad): FilaZona[] {
  return (t.ciudades[ciudad] ?? [])
    .filter(z => !z.fuera && z.laborable != null && z.cps.length > 0)
    .map(z => {
      const laborable = z.laborable as number;
      const festivo = z.festivo ?? laborable;
      return { zona: z.nombre, lab: precioCorto(laborable), fes: precioCorto(festivo), codes: z.cps, laborable, festivo };
    });
}
