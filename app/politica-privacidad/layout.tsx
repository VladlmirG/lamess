import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Información sobre el tratamiento de datos personales en La Mess conforme al RGPD.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}