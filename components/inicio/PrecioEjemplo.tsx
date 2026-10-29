"use client";

// 28-oct · El precio del ejemplo de «¿Cómo se pide?» (Còrsega 302 → Pujades 77,
// mañana): la recogida de Barcelona más la zona del 08005, con las tarifas de
// la app. Antes estaba escrito a mano (11,00 €); mientras llegan, sale con las
// de respaldo, que dan lo mismo que antes.

import { useReglasDeLaApp } from "@/lib/reglasNavegador";
import { RESPALDO } from "@/lib/tarifas";
import { zonaDeCp } from "@/lib/precio";

const CP_ENTREGA = "08005";
const respaldo = RESPALDO.reglas.recogidaBarcelona + (zonaDeCp(RESPALDO, CP_ENTREGA, "Barcelona")?.laborable ?? 9);

export default function PrecioEjemplo() {
  const { ejemplo } = useReglasDeLaApp();
  const n = ejemplo ?? respaldo;
  return <>{n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</>;
}
