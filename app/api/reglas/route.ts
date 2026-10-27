// app/api/reglas/route.ts
//
// 27-oct · Las reglas de la tarifa (recogida, express, lluvia, peso, espera y
// por horas) para las partes de la web que se pintan en el navegador, como las
// preguntas frecuentes del inicio. Son las de lib/tarifas: las de la app,
// guardadas 5 minutos, o las de respaldo si la app no contesta. Solo lectura.

import { NextResponse } from "next/server";
import { cargarTarifas } from "@/lib/tarifas";

export const revalidate = 300;

export async function GET() {
  const t = await cargarTarifas();
  return NextResponse.json({ reglas: t.reglas, origen: t.origen });
}
