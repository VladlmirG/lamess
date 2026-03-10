import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sobre La Mess | Logística Urbana con Propósito',
  description: 'Conoce al equipo de La Mess. Somos especialistas en logística urbana en bicicleta de carga para empresas, artesanos y productores. Entregas directas y cuidadas en Madrid y Barcelona.',
  keywords: 'equipo La Mess, logística artesanal, mensajería sostenible B2B, reparto bicicleta de carga, fundadores La Mess, transporte última milla eco',
};

export default function NosotrosLayout({
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