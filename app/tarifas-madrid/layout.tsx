import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tarifas Mensajería Madrid | Precios por Punto y Zona | La Mess',
  description: 'Consulta nuestras tarifas de mensajería en Madrid capital. Precios transparentes por zona desde 5,50€, sin suplementos fijos de recogida. Envíos en bicicleta de carga rápidos y sostenibles.',
  keywords: 'tarifas mensajería Madrid, mensajería económica Madrid centro, precio envío zona 1 Madrid, códigos postales Madrid mensajería, transporte urgente bicicleta Madrid',
};

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