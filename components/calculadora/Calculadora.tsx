"use client";

// 21-oct · INC-0020 · El calculador de precio de la web.
//
// El precio es el MISMO que da la app al pedir: las zonas y tarifas salen de la
// app (lib/tarifas) y la cuenta es la de la app (lib/precio, probado contra el
// código de la app). Las direcciones y la ruta, con Mapbox, como en la app.
//
// 27-oct · Los suplementos (recogida, express, lluvia, peso, espera) y la
// tarifa por horas también llegan de la app (`tarifas.reglas`).

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import "./calculadora.css";
import BuscadorDireccion, { type ChipDireccion } from "./BuscadorDireccion";
import type { PinMapa } from "./MapaRuta";
import { CO2_G_POR_KM, rutaEnBici, TOKEN_MAPBOX, type Punto, type Ruta } from "@/lib/mapbox";
import { calcularPrecio, ciudadDeCp, esFestivo, hoyEnMadrid, sumarDias, tarifasDelDia, zonaDeCp, textosReglas, type LineaPrecio, type ResultadoPrecio } from "@/lib/precio";
import type { Ciudad, Tarifas } from "@/lib/tarifas";
import { TELEFONO, URL_ENTRAR, URL_REGISTRO, URL_TELEFONO, whatsapp } from "@/lib/enlaces";

const MapaRuta = dynamic(() => import("./MapaRuta"), { ssr: false });

const WHATSAPP = whatsapp("Hola, quiero pedir un envío para hoy.");
const MAX_ENTREGAS = 10;

type Dia = "hoy" | "manana" | "otro";
interface Fila { id: number; punto: Punto | null }

const sinSuscripcion = () => () => {};
const eur = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;
const FECHA = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" });
/** «2026-10-22» → «jueves 22 oct». */
function diaLargo(fecha: string): string {
  const [y, m, d] = fecha.split("-").map(Number);
  return FECHA.format(new Date(Date.UTC(y, m - 1, d))).replace(",", "").replace(".", "");
}
const esDomingo = (fecha: string) => { const [y, m, d] = fecha.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0; };

/** La ruta en bici de los puntos, solo mientras siga siendo la de esos puntos. */
function useRuta(puntos: [number, number][]): Ruta | null {
  const clave = puntos.map(p => p.join(",")).join(";");
  const [hecha, setHecha] = useState<{ clave: string; ruta: Ruta | null } | null>(null);
  useEffect(() => {
    if (puntos.length < 2) return;
    const ac = new AbortController();
    rutaEnBici(puntos, ac.signal).then(ruta => { if (!ac.signal.aborted) setHecha({ clave, ruta }); });
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);
  return hecha && hecha.clave === clave ? hecha.ruta : null;
}

export default function Calculadora({ tarifas }: { tarifas: Tarifas }) {
  const conMapbox = TOKEN_MAPBOX !== "";
  const hoy = useSyncExternalStore(sinSuscripcion, () => hoyEnMadrid(), () => null);
  const [recogida, setRecogida] = useState<Punto | null>(null);
  const [entregas, setEntregas] = useState<Fila[]>([{ id: 1, punto: null }]);
  const siguiente = useRef(2);
  const [nueva, setNueva] = useState<number | null>(null);
  const [dia, setDia] = useState<Dia>("manana");
  const [otraFecha, setOtraFecha] = useState("");
  const [kg, setKg] = useState("");
  const [lluvia, setLluvia] = useState(false);
  const [desglose, setDesglose] = useState(false);
  const botonDesglose = useRef<HTMLButtonElement>(null);
  const cerrarHoja = useRef<HTMLButtonElement>(null);

  const manana = hoy ? sumarDias(hoy, 1) : null;
  const fecha = dia === "hoy" ? hoy : dia === "manana" ? manana : otraFecha || null;
  // 28-oct · Los textos, de la tarifa del día elegido (si la app tiene una programada, desde su día).
  const tx = textosReglas(tarifasDelDia(tarifas, fecha ?? "").reglas);

  // La ciudad sale de la recogida (por su código postal, como la app).
  const ciudad: Ciudad | null = ciudadDeCp(recogida?.cp);
  const puestas = entregas.filter(e => e.punto !== null);
  const entreCiudades = ciudad !== null && puestas.some(e => { const c = ciudadDeCp(e.punto?.cp); return c !== null && c !== ciudad; });
  const otraCiudad = recogida?.cp != null && recogida.cp.length === 5 && ciudad === null;
  const faltaCp = puestas.findIndex(e => !e.punto?.cp);

  const precio: ResultadoPrecio | null = useMemo(() => {
    if (!ciudad || !fecha || !recogida?.cp || puestas.length === 0 || entreCiudades || faltaCp >= 0) return null;
    return calcularPrecio(tarifas, {
      ciudad,
      recogida: { cp: recogida.cp, municipio: recogida.municipio },
      entregas: puestas.map(e => ({ cp: e.punto?.cp ?? null, municipio: e.punto?.municipio ?? null })),
      fecha,
      hoy: hoy ?? "",
      kg: parseFloat(kg.replace(",", ".")) || 0,
      lluvia,
    });
  }, [tarifas, ciudad, fecha, hoy, recogida, puestas, entreCiudades, faltaCp, kg, lluvia]);

  // ── Chips de cada dirección ───────────────────────────────────────────────
  const fueraDe = (p: Punto | null): boolean => {
    if (!p?.cp || !ciudad) return false;
    return zonaDeCp(tarifas, p.cp, p.municipio || (recogida?.municipio || ciudad)) === null;
  };
  const lugar = (p: Punto) => (p.municipio && p.municipio !== ciudad ? `${p.cp} ${p.municipio}` : p.cp ?? "");
  function chipDe(p: Punto | null, esRecogida: boolean): ChipDireccion | null {
    if (!p) return null;
    if (!p.cp) return { texto: "falta el C. P.", corto: "falta C. P.", falta: true };
    if (esRecogida && ciudad === null) return { texto: `${p.cp} · fuera de Barcelona y Madrid`, corto: `${p.cp} · fuera`, fuera: true };
    if (!esRecogida && ciudad && ciudadDeCp(p.cp) !== null && ciudadDeCp(p.cp) !== ciudad) return { texto: `${p.cp} · otra ciudad`, corto: "otra ciudad", fuera: true };
    const municipio = esRecogida ? p.municipio || ciudad : p.municipio || recogida?.municipio || ciudad;
    const z = zonaDeCp(tarifas, p.cp, municipio);
    if (!z) return { texto: `${lugar(p)} · fuera de zona`, corto: "fuera de zona", fuera: true };
    if (esRecogida && ciudad === "Barcelona") return { texto: `${p.cp} · recogida ${tx.recogida}`, corto: p.cp };
    return { texto: `${p.cp} · ${z.nombre}`, corto: z.nombre };
  }

  // ── Mapa ──────────────────────────────────────────────────────────────────
  const pines: PinMapa[] = useMemo(() => {
    const ps: PinMapa[] = [];
    if (recogida?.lng != null && recogida.lat != null) ps.push({ lng: recogida.lng, lat: recogida.lat, marca: "R", tipo: fueraDe(recogida) ? "fuera" : "recogida" });
    entregas.forEach((e, i) => {
      const p = e.punto;
      if (p?.lng != null && p.lat != null) ps.push({ lng: p.lng, lat: p.lat, marca: String(i + 1), tipo: fueraDe(p) ? "fuera" : "entrega" });
    });
    return ps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recogida, entregas, ciudad, tarifas]);
  const ruta = useRuta(useMemo(() => pines.map(p => [p.lng, p.lat] as [number, number]), [pines]));

  // ── Entregas ──────────────────────────────────────────────────────────────
  const ponerEntrega = (id: number, punto: Punto | null) => setEntregas(es => es.map(e => (e.id === id ? { ...e, punto } : e)));
  const anadir = () => {
    const id = siguiente.current++;
    setEntregas(es => [...es, { id, punto: null }]);
    setNueva(id);
  };
  const quitar = (id: number) => setEntregas(es => es.filter(e => e.id !== id));

  // ── Hoja del desglose (móvil) ─────────────────────────────────────────────
  useEffect(() => {
    if (!desglose) return;
    cerrarHoja.current?.focus();
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape") setDesglose(false); };
    document.addEventListener("keydown", tecla);
    const boton = botonDesglose.current;
    return () => { document.removeEventListener("keydown", tecla); boton?.focus(); };
  }, [desglose]);

  // ── Textos del precio ─────────────────────────────────────────────────────
  const express = precio?.express ?? (fecha !== null && fecha === hoy);
  const festivo = precio?.festivo ?? (fecha ? esFestivo(fecha) : false);
  const diaChip = express ? "Express · hoy" : festivo ? "Festivo" : "Laborable";
  const tonoDia = express || festivo ? "naranja" : undefined;

  let avisoDia = "";
  if (fecha && express) avisoDia = "Para hoy se pide por WhatsApp o teléfono: la app admite pedidos a partir de mañana.";
  else if (fecha && festivo) avisoDia = esDomingo(fecha) ? "Domingo: se aplica la tarifa de festivo. También los festivos oficiales." : "Festivo: se aplica la tarifa de festivo.";

  const lineas: { texto: string; importe: string; tono?: "naranja" | "azul" }[] = [];
  const notas: string[] = [];
  if (precio) {
    for (const l of precio.lineas as LineaPrecio[]) {
      if (l.tipo === "horas") lineas.push({ texto: l.texto, importe: eur(l.importe) });
      else if (l.tipo === "festivo") lineas.push({ texto: `${l.texto} · festivo`, importe: eur(l.importe), tono: "naranja" });
      else if (l.tipo === "express") lineas.push({ texto: l.texto, importe: `+${eur(l.importe)}`, tono: "naranja" });
      else if (l.tipo === "lluvia") lineas.push({ texto: `Si llueve (${tx.lluvia})`, importe: `+${eur(l.importe)}`, tono: "azul" });
      else if (l.tipo === "peso") lineas.push({ texto: l.texto, importe: `+${eur(l.importe)}` });
      else lineas.push({ texto: l.texto, importe: eur(l.importe) });
    }
    if (precio.modo === "horas") {
      if (precio.express) lineas.push({ texto: `Tarifa express (${tx.horaExpress} €/h)`, importe: "", tono: "naranja" });
      else if (precio.festivo) lineas.push({ texto: `Tarifa de festivo (${tx.horaFestivo} €/h)`, importe: "", tono: "naranja" });
      const quien = precio.fuera.includes("recogida") ? "La recogida está" : precio.fuera.length > 1 ? "Varias entregas están" : "Una entrega está";
      notas.push(`${quien} fuera de nuestras zonas: va por horas. Aquí, la primera hora; si hace falta más, se ajusta al cerrar la entrega.`);
      notas.push("Por horas no hay recargo de lluvia ni de peso.");
    } else if (!lluvia) {
      notas.push(`Si ese día llueve: +${eur(precio.conLluvia)} (lluvia, ${tx.lluvia}).`);
    }
  }
  notas.push(`Esperas: hasta ${tx.minGratis} minutos, gratis; si pasan de ${tx.minGratis}, toda la espera a ${tx.eurMin} el minuto. Van aparte.`);
  // 28-oct · Si el día elegido ya tiene la tarifa nueva que hay programada en la app.
  if (precio?.tarifaDesde) notas.push(`Con la tarifa nueva, que empieza el ${diaLargo(precio.tarifaDesde)}.`);

  const total = precio ? eur(precio.total) : "—";
  const resumen = precio && fecha
    ? `${precio.modo === "horas" ? "por horas" : `recogida + ${puestas.length} ${puestas.length === 1 ? "entrega" : "entregas"}`} · ${express ? "hoy" : diaLargo(fecha)}`
    : "";

  let vacio = "";
  if (otraCiudad) vacio = "Trabajamos en Barcelona y en Madrid (y alrededores). Para otra ciudad, escríbenos y lo vemos.";
  else if (entreCiudades) vacio = "Un envío entre Barcelona y Madrid no sale en el calculador: escríbenos y te damos el precio.";
  else if (faltaCp >= 0) vacio = `Falta el código postal de la ${puestas.length > 1 ? `entrega ${entregas.indexOf(puestas[faltaCp]) + 1}` : "entrega"}.`;
  else if (!recogida) vacio = conMapbox ? "Escribe la dirección de recogida y la de entrega para ver el precio." : "Escribe el código postal de la recogida y el de la entrega para ver el precio.";
  else if (!recogida.cp) vacio = "Falta el código postal de la recogida.";
  else if (puestas.length === 0) vacio = conMapbox ? "Ahora, la dirección de entrega." : "Ahora, el código postal de la entrega.";
  else if (dia === "otro" && !otraFecha) vacio = "Elige el día.";

  const co2 = ruta ? ((ruta.km * CO2_G_POR_KM) / 1000).toFixed(2).replace(".", ",") : null;
  const consultar = otraCiudad || entreCiudades;

  const acciones = (
    <div className="lmc-acciones">
      {consultar ? (
        <>
          <a className="lmc-cta" href="/contacto">Escríbenos</a>
          <small>O llámanos: <a href={URL_TELEFONO} style={{ color: "inherit" }}>{TELEFONO}</a>.</small>
        </>
      ) : express ? (
        <>
          <a className="lmc-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
            Para hoy, pídelo por WhatsApp
          </a>
          <small>Desde la app se pide a partir de mañana. Para hoy, escríbenos o llámanos: <a href={URL_TELEFONO} style={{ color: "inherit" }}>{TELEFONO}</a>.</small>
        </>
      ) : (
        <>
          <a className="lmc-cta" href={URL_REGISTRO}>Crea tu cuenta y pídelo</a>
          <a className="lmc-cta2" href={URL_ENTRAR}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="m10 17 5-5-5-5" /><path d="M15 12H3" /></svg>
            Ya soy cliente · Entrar en la app
          </a>
          <small>En la app verás este precio antes de pedir.</small>
        </>
      )}
    </div>
  );

  const panelPrecio = (enHoja: boolean) => (
    <section className="lmc-precio" aria-labelledby={enHoja ? "lmc-precio-hoja" : "lmc-precio"} aria-live={enHoja ? undefined : "polite"}>
      <div className="lmc-precio-titulo">
        <h2 id={enHoja ? "lmc-precio-hoja" : "lmc-precio"}>Precio</h2>
        {fecha && !consultar && <span className="lmc-dia-chip" data-tono={tonoDia}>{diaChip}</span>}
        {enHoja && (
          <button ref={cerrarHoja} type="button" className="lmc-cerrar" onClick={() => setDesglose(false)} aria-label="Cerrar el desglose">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        )}
      </div>
      {precio ? (
        <>
          <div className="lmc-total">
            <strong>{total}</strong>
            <span>{resumen}</span>
          </div>
          <ul className="lmc-lineas">
            {lineas.map((l, i) => (
              <li key={i} className="lmc-linea" data-tono={l.tono}>
                <span>{l.texto}</span>
                {l.importe && <strong>{l.importe}</strong>}
              </li>
            ))}
          </ul>
          <ul className="lmc-notas">{notas.map((n, i) => <li key={i}>{n}</li>)}</ul>
          {co2 && (
            <div className="lmc-co2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
              <span>Ahorras {co2} kg de CO₂ frente a una furgoneta</span>
            </div>
          )}
        </>
      ) : (
        <p className="lmc-vacio">{vacio}</p>
      )}
      {acciones}
    </section>
  );

  return (
    <div className="lmc">
      <div className="lmc-cabecera">
        <h1 className="lmc-h1"><span>Calculador</span> de precio</h1>
        <span aria-hidden="true" className="lmc-raya" />
        <p className="lmc-intro">El mismo precio que te cobraremos: sale de las tarifas de nuestra app. {conMapbox ? "Escribe las direcciones" : "Escribe los códigos postales"} y elige el día.</p>
        <p className="lmc-horario">Lunes a sábado, de 6:00 a 20:00 · domingos, de 6:00 a 16:00</p>
      </div>

      <div className="lmc-cuerpo">
        <section className="lmc-envio" aria-labelledby="lmc-envio">
          <div className="lmc-fila-titulo">
            <h2 id="lmc-envio" className="lmc-h2">Tu envío</h2>
            <span className="lmc-ciudad">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              {ciudad ? <>{ciudad} <em>· sale de la recogida</em></> : <>Barcelona o Madrid</>}
            </span>
          </div>

          <BuscadorDireccion
            id="lmc-recogida"
            etiqueta="Recogida"
            marca="R"
            tipo="recogida"
            valor={recogida}
            onElegir={setRecogida}
            ciudad={ciudad}
            chip={chipDe(recogida, true)}
          />
          {entregas.map((e, i) => (
            <BuscadorDireccion
              key={e.id}
              id={`lmc-entrega-${e.id}`}
              etiqueta={entregas.length > 1 ? `Entrega ${i + 1}` : "Entrega"}
              marca={String(i + 1)}
              tipo="entrega"
              valor={e.punto}
              onElegir={p => ponerEntrega(e.id, p)}
              ciudad={ciudad}
              chip={chipDe(e.punto, false)}
              onQuitar={entregas.length > 1 ? () => quitar(e.id) : undefined}
              autoFocus={e.id === nueva}
            />
          ))}
          {entregas.length < MAX_ENTREGAS && (
            <button type="button" className="lmc-anadir" onClick={anadir}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
              Añadir otra entrega
            </button>
          )}

          <div className="lmc-separador" />

          <div className="lmc-campo">
            <span id="lmc-cuando" className="lmc-etiqueta">¿Cuándo?</span>
            <div role="group" aria-labelledby="lmc-cuando" className="lmc-dias">
              <button type="button" className="lmc-dia" data-hoy="1" aria-pressed={dia === "hoy"} onClick={() => setDia("hoy")}>
                <strong>Hoy</strong><span>urgente · express {tx.express}</span>
              </button>
              <button type="button" className="lmc-dia" aria-pressed={dia === "manana"} onClick={() => setDia("manana")}>
                <strong>Mañana</strong><span>{manana ? diaLargo(manana) : " "}</span>
              </button>
              <button type="button" className="lmc-dia" aria-pressed={dia === "otro"} onClick={() => setDia("otro")}>
                <strong>Otro día</strong><span>{dia === "otro" && otraFecha ? diaLargo(otraFecha) : "elige la fecha"}</span>
              </button>
            </div>
            {dia === "otro" && (
              <input
                type="date"
                className="lmc-fecha"
                aria-label="Día de la recogida"
                value={otraFecha}
                min={hoy ?? undefined}
                onChange={e => setOtraFecha(e.target.value)}
              />
            )}
            {avisoDia && (
              <p className="lmc-aviso" data-tono={tonoDia}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                {avisoDia}
              </p>
            )}
          </div>

          <div className="lmc-extras">
            <div className="lmc-peso">
              <label htmlFor="lmc-kg" className="lmc-etiqueta">Peso total</label>
              <div className="lmc-peso-caja">
                <input id="lmc-kg" type="number" min="0" step="0.1" inputMode="decimal" placeholder="0" value={kg} onChange={e => setKg(e.target.value)} aria-describedby="lmc-kg-ayuda" />
                <span>kg</span>
              </div>
              <span id="lmc-kg-ayuda" className="lmc-ayuda">{tx.pesoAyuda}</span>
            </div>
            <button type="button" role="switch" aria-checked={lluvia} className="lmc-lluvia" onClick={() => setLluvia(v => !v)}>
              <span aria-hidden="true" className="lmc-interruptor" />
              <span>
                <strong>¿Y si ese día llueve?</strong>
                <small>Lluvia: {tx.lluvia}. Míralo con el precio.</small>
              </span>
            </button>
          </div>

          <p className="lmc-nota-horas">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            <span>Fuera de nuestras zonas se cobra <strong>por horas</strong>: {tx.horaLaborable} €/h, {tx.horaFestivo} €/h en festivo y {tx.horaExpress} €/h en express.</span>
          </p>
        </section>

        <div className="lmc-derecha">
          {conMapbox && (
            <div className="lmc-mapa">
              <MapaRuta pines={pines} linea={ruta?.linea ?? null} ciudad={ciudad} />
              {ruta && (
                <span className="lmc-ruta">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0D182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" /><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" /></svg>
                  {ruta.km.toFixed(1).replace(".", ",")} km en bici · unos {ruta.minutos} min
                </span>
              )}
            </div>
          )}
          {panelPrecio(false)}
          <p className="lmc-al-dia">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
            {tarifas.origen === "app" ? "Zonas y precios al día: los mismos de la app. Si cambian allí, cambian aquí." : "Zonas y precios de nuestras tarifas publicadas."}
          </p>
        </div>
      </div>

      {/* Móvil: el total abajo, siempre a la vista, y el desglose en una hoja. */}
      <div className="lmc-barra">
        <div className="lmc-barra-fila">
          <span className="lmc-barra-total">
            {precio ? <><span>{diaChip}</span><strong>{total}</strong></> : <small>{vacio}</small>}
          </span>
          {precio && (
            <button ref={botonDesglose} type="button" className="lmc-ver" onClick={() => setDesglose(true)} aria-haspopup="dialog">Ver desglose</button>
          )}
        </div>
        {consultar ? <a className="lmc-cta" href="/contacto">Escríbenos</a>
          : express ? <a className="lmc-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Para hoy, pídelo por WhatsApp</a>
          : <a className="lmc-cta" href={URL_REGISTRO}>Crea tu cuenta y pídelo</a>}
      </div>
      {desglose && precio && (
        <>
          <div className="lmc-hoja-fondo" onClick={() => setDesglose(false)} aria-hidden="true" />
          <div className="lmc-hoja" role="dialog" aria-modal="true" aria-labelledby="lmc-precio-hoja">
            {panelPrecio(true)}
          </div>
        </>
      )}
    </div>
  );
}
