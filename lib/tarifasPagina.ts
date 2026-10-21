// lib/tarifasPagina.ts
//
// 21-oct · INC-0020 · Las tablas de las páginas de Tarifas (Barcelona y
// Madrid), con las zonas y precios de la app (lib/tarifas): los mismos del
// calculador. Sin la zona «Fuera de zona» (fuera de zonas se cobra por horas).

import type { Ciudad, Tarifas } from "@/lib/tarifas";

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

export function filasZonas(t: Tarifas, ciudad: Ciudad): FilaZona[] {
  return (t.ciudades[ciudad] ?? [])
    .filter(z => !z.fuera && z.laborable != null && z.cps.length > 0)
    .map(z => {
      const laborable = z.laborable as number;
      const festivo = z.festivo ?? laborable;
      return { zona: z.nombre, lab: precioCorto(laborable), fes: precioCorto(festivo), codes: z.cps, laborable, festivo };
    });
}
