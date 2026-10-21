// 21-oct · INC-0020 · El calculador nuevo: tarifas de la app (al día cada 5
// minutos) y Mapbox. El de antes (components/tabula-rasa/Calculator.tsx, con
// Leaflet) se queda en el proyecto sin usar.

import Calculadora from "@/components/calculadora/Calculadora";
import { cargarTarifas } from "@/lib/tarifas";

export const revalidate = 300;

export default async function CalculadoraPage() {
  const tarifas = await cargarTarifas();
  return <Calculadora tarifas={tarifas} />;
}
