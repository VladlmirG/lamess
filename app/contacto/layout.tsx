import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contacto y Preguntas Frecuentes | La Mess',
  description: '¿Tienes dudas sobre tus envíos? Contacta con nuestro equipo en Barcelona y Madrid. Consulta nuestras FAQ sobre entregas directas B2B, logística sostenible y tarifas.',
  keywords: 'contacto La Mess, teléfono mensajería, FAQ mensajería ecológica, atención al cliente logística, envíos B2B Barcelona',
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Usamos una etiqueta semántica para ayudar al SEO
    <main>
      {children}
    </main>
  );
}