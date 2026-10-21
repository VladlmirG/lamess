import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Calcula el Coste de tu Envío | La Mess',
  description: 'Calcula el precio de tu envío en bicicleta de carga en Barcelona o Madrid: el mismo que te cobraremos, con las tarifas de nuestra app.',
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