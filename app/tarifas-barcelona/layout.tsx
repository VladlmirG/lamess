import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tarifas Mensajería Barcelona | Precios por Zonas y Horas | La Mess',
  description: 'Consulta nuestros precios transparentes de mensajería en Barcelona. Tarifas por zona desde 5,50€ y por horas (22€/hora) fuera de zonas. Envíos ecológicos, rápidos y sin sorpresas.',
  keywords: 'tarifas mensajería Barcelona, mensajería por horas Barcelona, precio envío zona 1 Barcelona, códigos postales mensajería Barcelona, envíos urgentes bicicleta Barcelona',
};

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