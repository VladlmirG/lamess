// 21-oct · INC-0020 · Campañas (los vídeos de Cristian).
//
// PRIVADA hasta que estén los vídeos: sin NEXT_PUBLIC_CAMPANAS_PUBLICAS=1, la
// página no existe (404) salvo con el enlace /campanas?vista=<CAMPANAS_CLAVE>.
// Sin CAMPANAS_CLAVE puesta, no se ve nunca. No sale en el menú, ni en el mapa
// del sitio, ni en Google (noindex).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import Campanas from "@/components/campanas/Campanas";
import { CAMPANAS_PUBLICAS } from "@/lib/campanas";

export const metadata: Metadata = {
  title: "Campañas en bici",
  description: "Campañas publicitarias en bicicleta de carga por Barcelona y Madrid.",
  ...(CAMPANAS_PUBLICAS ? {} : { robots: { index: false, follow: false } }),
};

function claveCorrecta(vista: unknown): boolean {
  const clave = process.env.CAMPANAS_CLAVE ?? "";
  if (clave.length < 8 || typeof vista !== "string") return false;
  const a = Buffer.from(vista), b = Buffer.from(clave);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function CampanasPage({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  if (!CAMPANAS_PUBLICAS && !claveCorrecta((await searchParams).vista)) notFound();
  return <Campanas privada={!CAMPANAS_PUBLICAS} />;
}
