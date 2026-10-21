// lib/enlaces.ts
//
// 21-oct · INC-0020 · Los enlaces a la app y al contacto, en un solo sitio.

/** Entrar en la app (clientes que ya tienen cuenta). */
export const URL_ENTRAR = "https://app.lamess.es/login";
/** Hazte cliente: el alta, que revisa el equipo. */
export const URL_REGISTRO = "https://app.lamess.es/registro";
export const TELEFONO = "930 07 01 13";
export const URL_TELEFONO = "tel:+34930070113";
export const URL_WHATSAPP = "https://wa.me/34930070113";
/** WhatsApp con el mensaje ya escrito. */
export const whatsapp = (texto: string) => `${URL_WHATSAPP}?text=${encodeURIComponent(texto)}`;
