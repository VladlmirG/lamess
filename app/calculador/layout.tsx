import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Calcula el Coste de tu Envío | La Mess',
  description: 'Usa nuestra calculadora de envíos para obtener un presupuesto instantáneo en Madrid o Barcelona. Introduce origen y destino y obtén el mejor precio eco.',
  keywords: 'calculadora envíos, presupuesto mensajería online, precio transporte urgente, estimador tarifas reparto',
};

// Asegúrate de que se llame exactamente así y reciba children
export default function CalculadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}