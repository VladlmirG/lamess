import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tarifas Mensajería Barcelona | Precios por Zonas y Horas | La Mess',
  description: 'Consulta nuestros precios transparentes de mensajería en Barcelona. Tarifas desde 5,50€ por zona o 22€/hora para servicios múltiples. Envíos ecológicos, rápidos y sin sorpresas.',
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