import { Metadata } from "next";
import { cargarTarifas } from "@/lib/tarifas";
import { filasZonas } from "@/lib/tarifasPagina";

/** «5,50€», «22€» (como estaba escrito). */
const eur = (n: number) => `${n.toLocaleString("es-ES", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}€`;

// 28-oct · El «desde» y la hora de la descripción, de las tarifas de la app (antes,
// escritos a mano: «desde 5,50€» y «22€/hora»). Si la app no contesta, los de respaldo.
export async function generateMetadata(): Promise<Metadata> {
  const t = await cargarTarifas();
  const precios = filasZonas(t, "Barcelona").map(f => f.laborable);
  const desde = precios.length ? eur(Math.min(...precios)) : "5,50€";
  return {
    title: 'Tarifas Mensajería Barcelona | Precios por Zonas y Horas | La Mess',
    description: `Consulta nuestros precios transparentes de mensajería en Barcelona. Tarifas por zona desde ${desde} y por horas (${eur(t.reglas.horaLaborable)}/hora) fuera de zonas. Envíos ecológicos, rápidos y sin sorpresas.`,
    keywords: 'tarifas mensajería Barcelona, mensajería por horas Barcelona, precio envío zona 1 Barcelona, códigos postales mensajería Barcelona, envíos urgentes bicicleta Barcelona',
  };
}

export default function BcnTarifasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
    </main>
  );
}