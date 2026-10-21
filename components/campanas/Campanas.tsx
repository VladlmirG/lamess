"use client";

// 21-oct · INC-0020 · La página de campañas: los vídeos de Cristian (ahora, de
// prueba). La primera, grande; el resto, en vertical. Al pulsar, el vídeo se
// abre encima.

import { useEffect, useRef, useState } from "react";
import "./campanas.css";
import { CAMPANAS, type Campana } from "@/lib/campanas";
import { whatsapp } from "@/lib/enlaces";

const INCLINACION = 10; // grados, como mucho

function Tarjeta({ c, grande, onVer }: { c: Campana; grande: boolean; onVer: (c: Campana, boton: HTMLButtonElement) => void }) {
  const boton = useRef<HTMLButtonElement>(null);
  const mover = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = e.currentTarget.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const x = Math.min(1, Math.max(0, (e.clientX - b.left) / b.width));
    const y = Math.min(1, Math.max(0, (e.clientY - b.top) / b.height));
    const max = grande ? INCLINACION / 2 : INCLINACION;
    e.currentTarget.dataset.activa = "1";
    boton.current?.style.setProperty("--rx", `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
    boton.current?.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
  };
  const salir = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.dataset.activa = "0";
    boton.current?.style.setProperty("--rx", "0deg");
    boton.current?.style.setProperty("--ry", "0deg");
  };
  return (
    <div className="lmk-marco" data-grande={grande ? "1" : "0"} onPointerMove={mover} onPointerLeave={salir}>
      <button ref={boton} type="button" className="lmk-tarjeta" aria-label={`Ver el vídeo: ${c.titulo}`} onClick={e => onVer(c, e.currentTarget)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.poster} alt="" loading={grande ? "eager" : "lazy"} />
        <span aria-hidden="true" className="lmk-velo" />
        {c.prueba && <span className="lmk-etiqueta">{grande ? "Vídeo de prueba · destacada" : "Vídeo de prueba"}</span>}
        <span aria-hidden="true" className="lmk-play">
          <svg width={grande ? 30 : 22} height={grande ? 30 : 22} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" /></svg>
        </span>
        <span className="lmk-pie">
          <strong>{c.titulo}</strong>
          <span>{c.cliente} · {c.ciudad} · {c.duracion}</span>
        </span>
      </button>
    </div>
  );
}

export default function Campanas({ privada }: { privada: boolean }) {
  const [viendo, setViendo] = useState<Campana | null>(null);
  const origen = useRef<HTMLButtonElement | null>(null);
  const cerrar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!viendo) return;
    cerrar.current?.focus();
    const tecla = (e: KeyboardEvent) => { if (e.key === "Escape") setViendo(null); };
    document.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
      origen.current?.focus();
    };
  }, [viendo]);

  const [destacada, ...resto] = CAMPANAS;
  const ver = (c: Campana, boton: HTMLButtonElement) => { origen.current = boton; setViendo(c); };

  return (
    <div className="lmk">
      {privada && (
        <p role="note" className="lmk-aviso">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" /><circle cx="12" cy="12" r="3" /></svg>
          Vista previa privada: solo se ve con tu enlace. No sale en el menú ni en Google. Vídeos de prueba hasta que estén los de Cristian.
        </p>
      )}

      <div className="lmk-cabecera">
        <span className="lmk-antetitulo">Campañas en bici</span>
        <h1 className="lmk-h1">Tu marca, a pedales por la ciudad</h1>
        <p className="lmk-intro">Bicis de carga con tu campaña, recorriendo Barcelona y Madrid. Mira algunas de las que hemos hecho.</p>
      </div>

      {destacada && <Tarjeta c={destacada} grande onVer={ver} />}
      {resto.length > 0 && (
        <div className="lmk-rejilla">
          {resto.map(c => <Tarjeta key={c.id} c={c} grande={false} onVer={ver} />)}
        </div>
      )}

      <div className="lmk-cta">
        <div>
          <h2>¿Hacemos la tuya?</h2>
          <p>Cuéntanos qué quieres anunciar, dónde y cuántos días.</p>
        </div>
        <div className="lmk-cta-botones">
          <a className="lmk-boton" href={whatsapp("Hola, quiero hacer una campaña en bici con La Mess.")} target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
            Escríbenos por WhatsApp
          </a>
          <a className="lmk-boton2" href="/contacto">Contacto</a>
        </div>
      </div>

      {viendo && (
        <div className="lmk-fondo" onClick={e => { if (e.target === e.currentTarget) setViendo(null); }}>
          <div className="lmk-dialogo" role="dialog" aria-modal="true" aria-labelledby="lmk-viendo">
            <div className="lmk-dialogo-cabecera">
              <strong id="lmk-viendo">{viendo.titulo}</strong>
              <button ref={cerrar} type="button" className="lmk-cerrar" onClick={() => setViendo(null)} aria-label="Cerrar el vídeo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <video key={viendo.id} className="lmk-video" src={viendo.video} poster={viendo.poster} controls autoPlay playsInline preload="auto" />
            <span>{viendo.cliente} · {viendo.ciudad} · {viendo.duracion}</span>
          </div>
        </div>
      )}
    </div>
  );
}
