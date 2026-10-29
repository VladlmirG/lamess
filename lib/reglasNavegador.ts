// lib/reglasNavegador.ts
//
// 28-oct · Las reglas de la tarifa para las partes de la web que se pintan en el
// navegador (preguntas frecuentes y «¿Cómo se pide?» del inicio). Se piden una
// sola vez a /api/reglas (las de la app, guardadas 5 minutos) y las comparten.
// Mientras llegan, o si no llegan, las de respaldo (las de siempre).

import { useEffect, useState } from "react";
import { leerReglas, REGLAS_RESPALDO, type Reglas } from "@/lib/tarifas";

export interface DeLaApp {
  reglas: Reglas;
  /** El precio del ejemplo de «¿Cómo se pide?» (recogida en Barcelona + una entrega en 08005), o null. */
  ejemplo: number | null;
}

let pedido: Promise<DeLaApp | null> | null = null;

function pedir(): Promise<DeLaApp | null> {
  if (!pedido) {
    pedido = fetch("/api/reglas")
      .then(r => (r.ok ? r.json() : null))
      .then((c: { reglas?: unknown; ejemplo?: unknown } | null) => (c?.reglas
        ? { reglas: leerReglas(c.reglas), ejemplo: typeof c.ejemplo === "number" && Number.isFinite(c.ejemplo) ? c.ejemplo : null }
        : null))
      .catch(() => { pedido = null; return null; });
  }
  return pedido;
}

/** Las reglas de la app (las de respaldo hasta que llegan). */
export function useReglasDeLaApp(): DeLaApp {
  const [datos, setDatos] = useState<DeLaApp>({ reglas: REGLAS_RESPALDO, ejemplo: null });
  useEffect(() => {
    let vivo = true;
    pedir().then(d => { if (vivo && d) setDatos(d); });
    return () => { vivo = false; };
  }, []);
  return datos;
}
