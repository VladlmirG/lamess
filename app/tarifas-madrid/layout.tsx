import { Metadata } from "next";
import { cargarTarifas } from "@/lib/tarifas";
import { filasZonas } from "@/lib/tarifasPagina";

/** «5,50€», «22€» (como estaba escrito). */
const eur = (n: number) => `${n.toLocaleString("es-ES", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}€`;

// 28-oct · El «desde» de la descripción, de las tarifas de la app (antes, escrito
// a mano: «desde 5,50€»). Si la app no contesta, los de respaldo.
export async function generateMetadata(): Promise<Metadata> {
  const t = await cargarTarifas();
  const precios = filasZonas(t, "Madrid").map(f => f.laborable);
  const desde = precios.length ? eur(Math.min(...precios)) : "5,50€";
  return {
    title: 'Tarifas Mensajería Madrid | Precios por Punto y Zona | La Mess',
    description: `Consulta nuestras tarifas de mensajería en Madrid capital. Precios transparentes por zona desde ${desde}, sin suplementos fijos de recogida. Envíos en bicicleta de carga rápidos y sostenibles.`,
    keywords: 'tarifas mensajería Madrid, mensajería económica Madrid centro, precio envío zona 1 Madrid, códigos postales Madrid mensajería, transporte urgente bicicleta Madrid',
  };
}

export default function MadridTarifasLayout({
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