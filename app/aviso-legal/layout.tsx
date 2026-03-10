import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Aviso Legal', // El template del RootLayout añadirá " | La Mess"
  description: 'Términos y condiciones de uso del sitio web de La Mess.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function AvisoLegalLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}