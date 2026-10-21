// lib/campanas.ts
//
// 21-oct · INC-0020 · Las campañas de la página /campanas (vídeos de Cristian).
//
// Ahora son VÍDEOS DE PRUEBA (los del inicio). Cuando estén los de Cristian:
// los .mp4 y una imagen de portada (.jpg, unos 540 px de ancho) a
// public/campanas/, y aquí una entrada por vídeo con `prueba: false`.
// La primera de la lista sale grande, arriba.
//
// La página es PRIVADA mientras NEXT_PUBLIC_CAMPANAS_PUBLICAS no sea «1»: solo
// se ve con /campanas?vista=<CAMPANAS_CLAVE> (ver app/campanas/page.tsx).

export interface Campana {
  id: string;
  titulo: string;
  cliente: string;
  ciudad: string;
  /** «0:35». */
  duracion: string;
  video: string;
  poster: string;
  /** Vídeo de prueba (sale marcado). */
  prueba: boolean;
}

export const CAMPANAS: Campana[] = [
  { id: "prueba-1", titulo: "Campaña de prueba 1", cliente: "[Cliente]", ciudad: "Barcelona", duracion: "0:35", video: "/hero/vid11.mp4", poster: "/campanas/prueba-1.jpg", prueba: true },
  { id: "prueba-2", titulo: "Campaña de prueba 2", cliente: "[Cliente]", ciudad: "Barcelona", duracion: "0:29", video: "/hero/vid22.mp4", poster: "/campanas/prueba-2.jpg", prueba: true },
  { id: "prueba-3", titulo: "Campaña de prueba 3", cliente: "[Cliente]", ciudad: "Barcelona", duracion: "0:25", video: "/hero/vid33.mp4", poster: "/campanas/prueba-3.jpg", prueba: true },
  { id: "prueba-4", titulo: "Campaña de prueba 4", cliente: "[Cliente]", ciudad: "Madrid", duracion: "0:24", video: "/hero/vid44.mp4", poster: "/campanas/prueba-4.jpg", prueba: true },
];

/** La página está abierta a todo el mundo (y sale en el menú y en el mapa del sitio). */
export const CAMPANAS_PUBLICAS = process.env.NEXT_PUBLIC_CAMPANAS_PUBLICAS === "1";
