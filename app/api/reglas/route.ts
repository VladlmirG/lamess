// app/api/reglas/route.ts
//
// 27-oct · Las reglas de la tarifa (recogida, express, lluvia, peso, espera y
// por horas) para las partes de la web que se pintan en el navegador, como las
// preguntas frecuentes del inicio. Son las de lib/tarifas: las de la app,
// guardadas 5 minutos, o las de respaldo si la app no contesta. Solo lectura.

// 28-oct · Y el precio del ejemplo de «¿Cómo se pide?» (`ejemplo`): la recogida
// de Barcelona más la zona del 08005 en laborable, con las tarifas de hoy.

import { NextResponse } from "next/server";
import { cargarTarifas } from "@/lib/tarifas";
import { zonaDeCp } from "@/lib/precio";

export const revalidate = 300;

export async function GET() {
  const t = await cargarTarifas();
  const zona = zonaDeCp(t, "08005", "Barcelona");
  const ejemplo = zona?.laborable != null ? Math.round((t.reglas.recogidaBarcelona + zona.laborable) * 100) / 100 : null;
  return NextResponse.json({ reglas: t.reglas, origen: t.origen, ejemplo });
}
