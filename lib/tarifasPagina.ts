// lib/tarifasPagina.ts
//
// 21-oct · INC-0020 · Las tablas de las páginas de Tarifas (Barcelona y
// Madrid), con las zonas y precios de la app (lib/tarifas): los mismos del
// calculador. Sin la zona «Fuera de zona» (fuera de zonas se cobra por horas).

//
// 27-oct · Y los suplementos (recogida, express, lluvia, espera, peso) y la
// tarifa por horas, también de la app (`tarifas.reglas`), escritos como los
// escribía la página: «2€», «+50%», «0,20€/min».

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
}

export function textosPagina(r: Reglas): TextosPagina {
  const n = (x: number) => x.toLocaleString("es-ES", { maximumFractionDigits: 2 });
  const dos = (x: number) => x.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return {
    recogida: precioCorto(r.recogidaBarcelona),
    express: `+${n(r.expressPct)}%`,
    lluvia: `+${n(r.lluviaPct)}%`,
    espera: `${n(r.esperaMinGratis)} min gratis; si pasa, ${dos(r.esperaEurMin)}€/min`,
    peso: `+${dos(r.pesoEurKg)}€/kg`,
    pesoDesde: `(+${n(r.pesoKgIncluidos)}kg)`,
    horaLaborable: precioCorto(r.horaLaborable),
    horaFestivo: precioCorto(r.horaFestivo),
    horaExpress: precioCorto(r.horaExpress),
    recogidaEur: r.recogidaBarcelona,
  };
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
