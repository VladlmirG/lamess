// 21-oct · INC-0020 · Las zonas y precios, de la app (al día cada 5 minutos):
// los mismos del calculador y de la app al pedir.

import TarifasMadrid from "@/components/tabula-rasa/TarifasMadrid";
import { cargarTarifas } from "@/lib/tarifas";
import { filasZonas } from "@/lib/tarifasPagina";

export const revalidate = 300;

export default async function TarifasMadridPage() {
  const tarifas = await cargarTarifas();
  return (
    <div>
      <TarifasMadrid zonas={filasZonas(tarifas, "Madrid")} />
    </div>
  );
}
