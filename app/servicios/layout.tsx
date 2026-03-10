import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Servicios de Logística Urbana y Cargo Bikes | La Mess',
  description: 'Soluciones integrales de transporte directo, última milla y redistribución de paquetería. Expertos en venta, taller y asesoramiento de flotas en bicicleta de carga.',
  keywords: 'transporte directo Madrid Barcelona, taller cargo bike, venta bicicletas de carga, última milla urbana, microhubs logística, formación mecánica bicis, almacenamiento stock empresas',
};

export default function ServiciosLayout({
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