import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Información detallada sobre el uso de cookies en la web de La Mess.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}