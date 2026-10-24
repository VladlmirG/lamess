// lib/campanas.ts
//
// 23-oct · La página /campanas, rediseñada con las fotos de rotulado (ya no
// lleva vídeos). Aquí están los datos y las cuentas; lo que se ve está en
// components/campanas/.
//
// Las fotos son la misma bici con tres rotulados de EJEMPLO (FAEMA, Oatly y
// NAP), en public/campanas/rotulado/. Las tres portadas están hechas desde el
// mismo sitio, así que se pueden superponer: por eso la portada «rotula» la
// bici al bajar.
//
// La página es PRIVADA mientras NEXT_PUBLIC_CAMPANAS_PUBLICAS no sea «1»: solo
// se ve con /campanas?vista=<CAMPANAS_CLAVE> (ver app/campanas/page.tsx).

/** La página está abierta a todo el mundo (y sale en el menú y en el mapa del sitio). */
export const CAMPANAS_PUBLICAS = process.env.NEXT_PUBLIC_CAMPANAS_PUBLICAS === "1";

/** El mismo correo que la página de Contacto. */
export const CORREO_CAMPANAS = "administracion@lamess.es";

// ── Los ejemplos de rotulado ─────────────────────────────────────────────────

export type Marca = "faema" | "oatly" | "nap";

export const MARCAS: { id: Marca; nombre: string }[] = [
  { id: "faema", nombre: "FAEMA" },
  { id: "oatly", nombre: "Oatly" },
  { id: "nap", nombre: "NAP" },
];

const CARPETA = "/campanas/rotulado";

/** La bici de lado: las tres en el mismo encuadre. */
export const portada = (m: Marca) => `${CARPETA}/portada-${m}.webp`;
/** Uno de los 9 planos de cada marca (los mismos encuadres en las tres). */
export const plano = (m: Marca, n: number) => `${CARPETA}/${m}-${n}.webp`;
/** La bici con el remolque-valla. */
export const REMOLQUE = `${CARPETA}/remolque.webp`;

/** Los planos, en el orden en que salen (el primero, grande). `n` es su número en la hoja original. */
export const PLANOS: { n: number; nombre: string; alt: string }[] = [
  { n: 5, nombre: "El panel: tu cartel", alt: "el panel de carga" },
  { n: 1, nombre: "De lado", alt: "de lado" },
  { n: 2, nombre: "Tres cuartos", alt: "en tres cuartos" },
  { n: 6, nombre: "El cuadro, con tus colores", alt: "el cuadro con las franjas" },
  { n: 8, nombre: "La caja, numerada", alt: "la caja numerada y el manillar" },
  { n: 4, nombre: "De frente", alt: "de frente" },
  { n: 3, nombre: "Desde atrás", alt: "desde atrás" },
  { n: 7, nombre: "Desde arriba", alt: "desde arriba" },
  { n: 9, nombre: "Las franjas", alt: "la rueda trasera y las franjas" },
];

// ── Los formatos (lo que dijo Lucas) ─────────────────────────────────────────

export type TipoCampana = "flyers" | "carteles" | "entregas" | "ambulante" | "flota";

export const FORMATOS: { id: TipoCampana; titulo: string; texto: string; necesita: string[] }[] = [
  { id: "flyers", titulo: "Reparto de flyers", texto: "Repartimos tus flyers en mano o puerta a puerta, por los barrios que elijas.", necesita: ["Zonas", "Cuántos flyers", "Qué días"] },
  { id: "carteles", titulo: "Carteles", texto: "Colocamos tus carteles en comercios y puntos de paso de la ciudad.", necesita: ["Cuántos puntos", "Dónde", "El cartel"] },
  { id: "entregas", titulo: "En tus entregas", texto: "Si ya repartes con nosotros, tus pedidos llegan en una bici con tu marca.", necesita: ["Cuántas entregas", "Cuántas bicis", "Cuánto tiempo"] },
  { id: "ambulante", titulo: "Solo ambulante", texto: "Bicis o remolque con tu campaña, recorriendo las calles a las horas en que más se ven.", necesita: ["Zonas o ruta", "Horas y días", "Cuántos vehículos"] },
  { id: "flota", titulo: "Bicis para tu flota", texto: "¿Quieres tus propias bicis de carga? Te las preparamos rotuladas con tu marca.", necesita: ["Cuántas", "Para qué uso", "Para cuándo"] },
];

// ── «Cuéntanos tu campaña» ───────────────────────────────────────────────────

export const CIUDADES = ["Barcelona", "Madrid", "Otra ciudad"] as const;
export const MIN_VEHICULOS = 1;
export const MAX_VEHICULOS = 50;

export interface DatosCampana {
  tipos: TipoCampana[];
  ciudad: string;
  /** «2026-11-03», como lo da <input type="date">, o vacío. */
  desde: string;
  hasta: string;
  vehiculos: number;
  flyers: string;
  puntos: string;
  entregas: string;
  horas: string;
  flota: string;
  producto: string;
  zonas: string;
  /** "si": ya tiene el diseño · "no": aún no · "": sin contestar. */
  diseno: "" | "si" | "no";
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export const CAMPANA_VACIA: DatosCampana = {
  tipos: [], ciudad: "Barcelona", desde: "", hasta: "", vehiculos: 2,
  flyers: "", puntos: "", entregas: "", horas: "", flota: "", producto: "", zonas: "", diseno: "",
  nombre: "", empresa: "", email: "", telefono: "", mensaje: "",
};

/** Si hace falta preguntar qué se reparte o se entrega. */
export const pideProducto = (tipos: TipoCampana[]) => tipos.some(t => t === "flyers" || t === "carteles" || t === "entregas");

/** «3 nov» (sin depender de la zona horaria de quien mira). */
export function fechaCorta(v: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const d = new Date(`${v}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", timeZone: "UTC" }).replace(".", "");
}

export function textoFechas(desde: string, hasta: string): string {
  if (desde && hasta) return `del ${fechaCorta(desde)} al ${fechaCorta(hasta)}`;
  if (desde) return `desde el ${fechaCorta(desde)}`;
  if (hasta) return `hasta el ${fechaCorta(hasta)}`;
  return "";
}

const limpio = (s: string) => s.replace(/\s+/g, " ").trim();

/** Los detalles que dependen del tipo (solo los de los tipos elegidos). */
export function detallesCampana(d: DatosCampana): string[] {
  const t = (x: TipoCampana) => d.tipos.includes(x);
  const out: string[] = [];
  if (t("flyers") && limpio(d.flyers)) out.push(`${limpio(d.flyers)} flyers`);
  if (t("carteles") && limpio(d.puntos)) out.push(`${limpio(d.puntos)} puntos`);
  if (t("entregas") && limpio(d.entregas)) out.push(`${limpio(d.entregas)} entregas al mes`);
  if (t("ambulante") && limpio(d.horas)) out.push(`${limpio(d.horas)} h al día`);
  if (t("flota") && limpio(d.flota)) out.push(`${limpio(d.flota)} bicis propias`);
  if (pideProducto(d.tipos) && limpio(d.producto)) out.push(limpio(d.producto));
  return out;
}

export const nombresTipos = (tipos: TipoCampana[]) => FORMATOS.filter(f => tipos.includes(f.id)).map(f => f.titulo).join(", ");

/** Las filas de la ficha «Así nos llega». */
export function filasCampana(d: DatosCampana): { k: string; v: string; vacio: boolean }[] {
  const tipos = nombresTipos(d.tipos);
  const fechas = textoFechas(d.desde, d.hasta);
  const zonas = limpio(d.zonas);
  const detalles = detallesCampana(d).join(" · ");
  const contacto = [limpio(d.nombre), limpio(d.empresa)].filter(Boolean).join(" · ");
  return [
    { k: "Tipo", v: tipos || "Sin elegir", vacio: !tipos },
    { k: "Ciudad", v: d.ciudad, vacio: false },
    { k: "Fechas", v: fechas || "Por definir", vacio: !fechas },
    { k: "Vehículos", v: String(d.vehiculos), vacio: false },
    { k: "Zonas", v: zonas || "Por definir", vacio: !zonas },
    { k: "Detalles", v: detalles || "—", vacio: !detalles },
    { k: "Diseño", v: d.diseno === "si" ? "Ya lo tiene" : d.diseno === "no" ? "Aún no lo tiene" : "—", vacio: !d.diseno },
    { k: "Contacto", v: contacto || "—", vacio: !contacto },
  ];
}

const CORREO_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Lo que falta para poder mandarla, o null si está lista. */
export function faltaEnCampana(d: DatosCampana): string | null {
  if (d.tipos.length === 0) return "Elige al menos un tipo de campaña.";
  if (!limpio(d.nombre)) return "Escribe tu nombre.";
  if (limpio(d.email) && !CORREO_OK.test(limpio(d.email))) return "Revisa el correo.";
  return null;
}

/** El mensaje que se manda por WhatsApp o por correo. */
export function textoCampana(d: DatosCampana): string {
  const lineas = ["Hola, quiero pedir presupuesto para una campaña en bici.", ""];
  for (const f of filasCampana(d)) {
    if (f.k === "Contacto") continue;
    if (!f.vacio) lineas.push(`· ${f.k}: ${f.v}`);
  }
  const mensaje = d.mensaje.trim();
  if (mensaje) lineas.push("", mensaje);
  lineas.push("");
  const quien = [limpio(d.nombre), limpio(d.empresa)].filter(Boolean).join(" · ");
  if (quien) lineas.push(quien);
  if (limpio(d.email)) lineas.push(limpio(d.email));
  if (limpio(d.telefono)) lineas.push(limpio(d.telefono));
  return lineas.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

/** Asunto del correo. */
export function asuntoCampana(d: DatosCampana): string {
  const quien = limpio(d.empresa) || limpio(d.nombre);
  return `Campaña en bici${quien ? ` · ${quien}` : ""}`;
}

export const mailtoCampana = (d: DatosCampana) =>
  `mailto:${CORREO_CAMPANAS}?subject=${encodeURIComponent(asuntoCampana(d))}&body=${encodeURIComponent(textoCampana(d))}`;
