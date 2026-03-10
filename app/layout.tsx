import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/tabula-rasa/Header"; // Adjust path if needed
import { ThemeProvider } from "next-themes";
import "swiper/css";
import "swiper/css/effect-fade";
import Footer from "@/components/tabula-rasa/Footer";
import CookieBanner from "@/components/tabula-rasa/CookieBanner";


/* ---------------- GOOGLE FONT ---------------- */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

/* ---------------- LOCAL FONTS ---------------- */
const delaGothic = localFont({
  src: "../public/fonts/DelaGothicOne-Regular.ttf",
  variable: "--font-dela-gothic",
});

const francoisOne = localFont({
  src: "../public/fonts/FrancoisOne-Regular.ttf",
  variable: "--font-francois-one",
});

const arenq = localFont({
  src: "../public/fonts/arenq.otf",
  variable: "--font-arenq",
});

const beckman = localFont({
  src: "../public/fonts/beckman.otf",
  variable: "--font-beckman",
});

const gobold = localFont({
  src: "../public/fonts/gobold.otf",
  variable: "--font-gobold",
});

const mova = localFont({
  src: "../public/fonts/mova.otf",
  variable: "--font-mova",
});

const overcameBold = localFont({
  src: "../public/fonts/overcame-bold.woff",
  variable: "--font-overcame-bold",
});

const overcameOutline = localFont({
  src: "../public/fonts/overcame-outline.woff",
  variable: "--font-overcame-outline",
});

const peckhamPress = localFont({
  src: "../public/fonts/peckhampress.otf",
  variable: "--font-peckham-press",
});

const smirnow = localFont({
  src: "../public/fonts/smirnow.otf",
  variable: "--font-smirnow",
});

/* ---------------- METADATA OPTIMIZADA ---------------- */
export const metadata: Metadata = {
  title: {
    default: "La Mess | Logística Urbana Sostenible en Bicicleta de Carga",
    template: "%s | La Mess",
  },
  description: "Mensajería urgente y logística de última milla en Madrid y Barcelona. Especialistas en entregas directas B2B con bicicletas de carga. Eficiencia eco-friendly.",
  keywords: ["mensajería bicicleta carga", "logística sostenible", "reparto última milla", "cargo bikes Madrid", "mensajería ecológica Barcelona"],
  authors: [{ name: "La Mess" }],
  creator: "La Mess",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.lamess.es",
    siteName: "La Mess",
    title: "La Mess | Logística Urbana con Propósito",
    description: "Entregas directas, cuidadas y sostenibles en Madrid y Barcelona mediante cargo bikes.",
    images: [
      {
        url: "/og-image.jpg", // Asegúrate de subir esta imagen a /public
        width: 1200,
        height: 630,
        alt: "La Mess Cargo Bikes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Mess | Logística Urbana Sostenible",
    description: "Mensajería profesional en bicicleta de carga.",
    images: ["/og-image.jpg"],
  },
};

/* ---------------- ROOT LAYOUT ---------------- */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${montserrat.variable}
          ${delaGothic.variable}
          ${francoisOne.variable}
          ${arenq.variable}
          ${beckman.variable}
          ${gobold.variable}
          ${mova.variable}
          ${overcameBold.variable}
          ${overcameOutline.variable}
          ${peckhamPress.variable}
          ${smirnow.variable}
          antialiased
        `}
      >
        {/* THEME PROVIDER: does not touch <html> class, safe for SSR */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} storageKey="theme">
          {/* HEADER WRAPS NAV + THEME TOGGLE */}
          <Header />
          {/* MAIN CONTENT */}
          <main className="mx-auto px-4 md:px-12">
            {children}
          </main>
          <Footer />

          <CookieBanner/>
        </ThemeProvider> 
      </body>
    </html>
  );
}