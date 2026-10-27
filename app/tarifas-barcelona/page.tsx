// 21-oct · INC-0020 · Las zonas y precios, de la app (al día cada 5 minutos):
// los mismos del calculador y de la app al pedir.
// 27-oct · Y los suplementos y la tarifa por horas, también de la app.

import TarifasBarcelona from "@/components/tabula-rasa/TarifasBarcelona";
import { cargarTarifas } from "@/lib/tarifas";
import { filasZonas, textosPagina } from "@/lib/tarifasPagina";

export const revalidate = 300;

export default async function TarifasBarcelonaPage() {
  const tarifas = await cargarTarifas();
  return (
    <div>
      <TarifasBarcelona zonas={filasZonas(tarifas, "Barcelona")} textos={textosPagina(tarifas.reglas)} />
    </div>
  );
}
