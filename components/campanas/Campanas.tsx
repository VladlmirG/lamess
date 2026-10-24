"use client";

// 23-oct · La página de campañas, rediseñada con las fotos de rotulado (ya no
// lleva vídeos). De arriba abajo:
//   1. Portada: la bici se queda fija al bajar y una línea la va «rotulando»
//      (FAEMA → Oatly → NAP). Las tres fotos están hechas desde el mismo sitio.
//   2. Manifiesto, que se enciende palabra a palabra.
//   3. El rotulado: 9 planos; al elegir otra marca giran uno detrás de otro.
//   4. Publicidad ambulante: el remolque avanza de lado al bajar.
//   5. Formatos (los de Lucas), con inclinación 3D al pasar el ratón.
//   6. Cómo funciona.  7. «Cuéntanos tu campaña» (Brief.tsx).  8. El cierre.
//
// El movimiento lo pone un solo oyente de scroll que escribe variables CSS en
// la raíz (sin volver a pintar React). Con «reducir movimiento», o una ventana
// muy baja, no hay nada fijo ni animado: la portada cambia con sus botones.

import { useEffect, useRef, useState } from "react";
import "./campanas.css";
import Brief from "./Brief";
import { FORMATOS, MARCAS, PLANOS, REMOLQUE, plano, portada, type Marca } from "@/lib/campanas";
import { whatsapp } from "@/lib/enlaces";

/** Lo mismo que decide, en campanas.css, si la portada se queda fija. */
const CON_MOVIMIENTO = "(prefers-reduced-motion: no-preference) and (min-height: 560px)";
const VARIABLES = ["--hp", "--c1", "--c2", "--lx", "--lo", "--mp", "--ap"];
const lim = (x: number) => Math.min(1, Math.max(0, x));
const suave = (x: number) => x * x * (3 - 2 * x);
/** Dónde queda cada marca en el recorrido de la portada (0 a 1). */
const PUNTO_MARCA = [0.02, 0.47, 0.97];

const ICONOS: Record<string, React.ReactNode> = {
  flyers: <><rect x="8" y="3" width="12" height="15" rx="1.5" /><path d="M5 7v12.5A1.5 1.5 0 0 0 6.5 21H16" /><path d="M11 8h6M11 11h6M11 14h3" /></>,
  carteles: <><rect x="3" y="3" width="18" height="12" rx="1.5" /><path d="M8 21l4-6 4 6" /><path d="M7 8h10M7 11h6" /></>,
  entregas: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></>,
  ambulante: <><path d="M3 10.5v3a1 1 0 0 0 1 1h3l8 4.5V5L7 9.5H4a1 1 0 0 0-1 1z" /><path d="M18.5 9a4.5 4.5 0 0 1 0 6" /></>,
  flota: <><circle cx="5.5" cy="16.5" r="3.5" /><circle cx="18.5" cy="16.5" r="3.5" /><path d="M5.5 16.5 9 9h6l3.5 7.5M9 9l3.5 7.5H15M14 5.5h3" /></>,
};

const PALABRAS: { t: string; clara?: boolean; salto?: boolean }[] = [
  { t: "La" }, { t: "gente" }, { t: "ya" }, { t: "no" }, { t: "mira" }, { t: "los" }, { t: "carteles.", salto: true },
  { t: "Mira", clara: true }, { t: "lo", clara: true }, { t: "que", clara: true }, { t: "se", clara: true }, { t: "mueve.", clara: true },
];

const PASOS = [
  { t: "Nos cuentas la idea", p: "Con el formulario de aquí abajo o por WhatsApp: qué quieres anunciar, dónde y cuándo." },
  { t: "La valoramos", p: "Vemos zonas, puntos, vehículos y días, y te pasamos un presupuesto a medida." },
  { t: "Rotulamos", p: "Preparamos las bicis con tu diseño." },
  { t: "A la calle", p: "Tus bicis salen a recorrer la ciudad los días acordados." },
];

function Icono({ children, s }: { children: React.ReactNode; s?: boolean }) {
  return <svg className={`lmk-ico${s ? " lmk-ico-s" : ""}`} viewBox="0 0 24 24" aria-hidden="true">{children}</svg>;
}

/** Inclinación 3D de las tarjetas de formatos (solo con ratón y si se permite movimiento). */
function inclinar(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  const b = el.getBoundingClientRect();
  if (!b.width || !b.height) return;
  const x = lim((e.clientX - b.left) / b.width), y = lim((e.clientY - b.top) / b.height);
  el.dataset.activa = "1";
  el.style.setProperty("--rx", `${((0.5 - y) * 10).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${((x - 0.5) * 12).toFixed(2)}deg`);
  el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
  el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
}
function soltar(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.dataset.activa = "0";
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
}

export default function Campanas({ privada }: { privada: boolean }) {
  const raiz = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const man = useRef<HTMLElement>(null);
  const amb = useRef<HTMLElement>(null);
  const [mueve, setMueve] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [marca, setMarca] = useState<Marca>("faema");

  useEffect(() => {
    const r = raiz.current, h = hero.current;
    if (!r || !h) return;
    const mq = window.matchMedia(CON_MOVIMIENTO);
    let raf = 0;
    let idx = -1;
    const medir = () => {
      raf = 0;
      const s = r.style;
      // La cabecera de la web es fija: la portada se queda justo debajo.
      const cab = Math.round(document.querySelector("header")?.getBoundingClientRect().height ?? 88);
      s.setProperty("--lmk-cab", `${cab}px`);
      if (!mq.matches) {
        VARIABLES.forEach(k => s.removeProperty(k));
        setMueve(false);
        idx = -1;
        return;
      }
      setMueve(true);
      const vh = window.innerHeight;
      const b = h.getBoundingClientRect();
      const fijo = Math.max(1, vh - cab);
      const p = lim((cab - b.top) / Math.max(1, b.height - fijo));
      const w1 = suave(lim((p - 0.08) / 0.32));
      const w2 = suave(lim((p - 0.56) / 0.32));
      s.setProperty("--hp", p.toFixed(4));
      s.setProperty("--c1", `${((1 - w1) * 100).toFixed(2)}%`);
      s.setProperty("--c2", `${((1 - w2) * 100).toFixed(2)}%`);
      s.setProperty("--lx", `${((1 - (w2 > 0 ? w2 : w1)) * 100).toFixed(2)}%`);
      s.setProperty("--lo", (w1 > 0.002 && w1 < 0.998) || (w2 > 0.002 && w2 < 0.998) ? "1" : "0");
      const nuevo = w2 >= 0.5 ? 2 : w1 >= 0.5 ? 1 : 0;
      if (nuevo !== idx) { idx = nuevo; setHeroIdx(nuevo); }
      const m = man.current?.getBoundingClientRect();
      if (m) s.setProperty("--mp", lim((vh * 0.92 - m.top) / (vh * 0.62)).toFixed(4));
      const a = amb.current?.getBoundingClientRect();
      if (a) s.setProperty("--ap", lim((vh - a.top) / (vh + a.height)).toFixed(4));
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    mq.addEventListener("change", pedir);
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      mq.removeEventListener("change", pedir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /** Los botones de la portada: con movimiento, bajan hasta esa marca; sin él, la cambian. */
  const irA = (i: number) => {
    const h = hero.current;
    if (!mueve || !h) { setHeroIdx(i); return; }
    const cab = document.querySelector("header")?.getBoundingClientRect().height ?? 88;
    const b = h.getBoundingClientRect();
    const recorrido = Math.max(1, b.height - (window.innerHeight - cab));
    window.scrollTo({ top: window.scrollY + b.top - cab + PUNTO_MARCA[i] * recorrido, behavior: "smooth" });
  };

  return (
    <div className="lmk" ref={raiz} data-mueve={mueve ? "1" : "0"}>
      {privada && (
        <p role="note" className="lmk-aviso">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" /><circle cx="12" cy="12" r="3" /></svg>
          Vista previa privada: solo se ve con tu enlace. No sale en el menú ni en Google.
        </p>
      )}

      {/* 1 · Portada */}
      <section className="lmk-hero lmk-ancho" ref={hero} data-hero={heroIdx} aria-label="Campañas en bici">
        <div className="lmk-pin">
          <div className="lmk-fotos">
            {MARCAS.map((m, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.id} className={`lmk-capa lmk-capa-${i}`} src={portada(m.id)} alt={i === 0 ? `Bici de carga de La Mess rotulada con ${m.nombre}` : `La misma bici rotulada con ${m.nombre}`}
                aria-hidden={heroIdx !== i} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />
            ))}
            <div className="lmk-linea" aria-hidden="true"><span>Rotulando</span></div>
          </div>
          <div className="lmk-hero-txt">
            <span className="lmk-ante">Campañas en bici</span>
            <h1 className="lmk-titulo lmk-hero-h1">Tu marca,<br />a pedales</h1>
          </div>
          <span className="lmk-pista" aria-hidden="true">
            <Icono><path d="M6 9l6 6 6-6" /></Icono>
          </span>
          <div className="lmk-barra">
            <div className="lmk-ejemplos">
              <span className="lmk-ejemplos-t" id="lmk-ejemplos">Ejemplos de rotulado</span>
              <div className="lmk-tabs" role="group" aria-labelledby="lmk-ejemplos">
                {MARCAS.map((m, i) => (
                  <button key={m.id} type="button" className="lmk-tab" aria-pressed={heroIdx === i} onClick={() => irA(i)}>
                    <small>{String(i + 1).padStart(2, "0")}</small><b>{m.nombre}</b>
                  </button>
                ))}
              </div>
            </div>
            <div className="lmk-barra-der">
              <p>Rotulamos nuestras bicis de carga con tu marca y las sacamos a la calle, en Barcelona y Madrid.</p>
              <div className="lmk-botones">
                <a className="lmk-btn" href="#cuentanos">Cuéntanos tu campaña</a>
                <a className="lmk-btn lmk-btn2" href="#formatos">Ver formatos</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Manifiesto */}
      <section className="lmk-man lmk-ancho" ref={man}>
        <div className="lmk-cont">
          <span className="lmk-ante">Publicidad que se mueve</span>
          <h2 className="lmk-frase">
            {PALABRAS.map((w, i) => (
              <span key={i}>
                <span className={`lmk-pal${w.clara ? " lmk-pal-cl" : ""}`} style={{ "--i": i } as React.CSSProperties}>{w.t}</span>
                {w.salto ? <br /> : " "}
              </span>
            ))}
          </h2>
          <div className="lmk-pilares">
            <div className="lmk-pilar lmk-rev"><h3>Se ve</h3><p>Va a la altura de los ojos y entra en calles donde no llega ningún cartel.</p></div>
            <div className="lmk-pilar lmk-rev"><h3>Se para</h3><p>Aparca delante de tu tienda, de tu evento o de donde esté tu público.</p></div>
            <div className="lmk-pilar lmk-rev"><h3>Sorprende</h3><p>Nadie espera un anuncio en una bici. Por eso se mira, se comenta y se fotografía.</p></div>
          </div>
        </div>
      </section>

      {/* 3 · El rotulado */}
      <section className="lmk-rot lmk-ancho">
        <div className="lmk-cont">
          <div className="lmk-rot-cab">
            <div className="lmk-rev">
              <span className="lmk-ante">El rotulado</span>
              <h2 className="lmk-titulo lmk-h2">Toda la bici habla de ti</h2>
              <p className="lmk-lead">Vestimos el panel de carga, el cuadro y las protecciones con tus colores. Y la caja va numerada: cada bici es una pieza de tu campaña.</p>
            </div>
            <div className="lmk-switch" role="group" aria-label="Elige un ejemplo">
              {MARCAS.map(m => (
                <button key={m.id} type="button" className="lmk-sw" aria-pressed={marca === m.id} onClick={() => setMarca(m.id)}>
                  <span className={`lmk-franjas lmk-fr-${m.id}`} aria-hidden="true"><i /><i /><i /></span>{m.nombre}
                </button>
              ))}
            </div>
          </div>
          <div className="lmk-bento">
            {PLANOS.map(pl => (
              <figure key={pl.n} className="lmk-tile">
                {MARCAS.map(m => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={m.id} src={plano(m.id, pl.n)} alt={`Bici rotulada con ${m.nombre}: ${pl.alt}`} data-on={marca === m.id ? "1" : "0"}
                    aria-hidden={marca !== m.id} loading="lazy" decoding="async" />
                ))}
                <figcaption>{pl.nombre}</figcaption>
              </figure>
            ))}
          </div>
          <p className="lmk-nota">Fotos de ejemplo: el mismo modelo de bici con tres rotulados distintos.</p>
        </div>
      </section>

      {/* 4 · Publicidad ambulante */}
      <section className="lmk-amb lmk-ancho" ref={amb}>
        {/* La foto es el fondo de toda la sección: por arriba sigue el mismo verde del estudio (alargada a propósito), así no hay corte. */}
        <div className="lmk-amb-fondo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={REMOLQUE} alt="Bici de carga rotulada con NAP tirando de un remolque con una valla de NAP" loading="lazy" decoding="async" />
        </div>
        <div className="lmk-amb-txt lmk-rev">
          <div>
            <span className="lmk-ante">Publicidad ambulante</span>
            <h2 className="lmk-titulo lmk-h2">Un cartel que va a buscar a la gente</h2>
          </div>
          <p>Con el remolque, tu campaña ocupa una valla entera y se mueve por donde pasa la gente: ferias, mercados, la salida de un concierto. Va donde le digas y se para donde haga falta.</p>
        </div>
        {/* Reserva el sitio de la bici y el remolque (están abajo de la foto de fondo). */}
        <div className="lmk-amb-foto" aria-hidden="true" />
        {/* La letra de los titulares no tiene «·» ni tildes: solo puntos y comas. */}
        <p className="lmk-mov" aria-hidden="true">En movimiento. En movimiento. En movimiento.</p>
      </section>

      {/* 5 · Formatos */}
      <section id="formatos" className="lmk-for lmk-ancho">
        <div className="lmk-cont">
          <div className="lmk-for-cab lmk-rev">
            <span className="lmk-ante">Formatos</span>
            <h2 className="lmk-titulo lmk-h2">Cinco maneras de salir a la calle</h2>
            <p className="lmk-lead">Cada campaña es distinta. La valoramos contigo y te pasamos un presupuesto a medida.</p>
          </div>
          <div className="lmk-tarjetas">
            {FORMATOS.map((f, i) => (
              <article key={f.id} className="lmk-tj lmk-rev" onPointerMove={inclinar} onPointerLeave={soltar}>
                <div className="lmk-tj-top"><span className="lmk-tj-num">{String(i + 1).padStart(2, "0")}</span><Icono>{ICONOS[f.id]}</Icono></div>
                <h3>{f.titulo}</h3>
                <p>{f.texto}</p>
                <div className="lmk-tj-nec">
                  <span>Para el presupuesto</span>
                  <ul className="lmk-chips">{f.necesita.map(n => <li key={n}>{n}</li>)}</ul>
                </div>
              </article>
            ))}
            <article className="lmk-tj lmk-tj-cta lmk-rev" onPointerMove={inclinar} onPointerLeave={soltar}>
              <div className="lmk-tj-top"><span className="lmk-tj-num">¿Otra idea?</span><Icono><path d="M12 5v14M5 12h14" /></Icono></div>
              <h3>Cuéntanosla</h3>
              <p>Si no encaja en ninguna, cuéntanosla igual: la valoramos y te decimos cómo hacerla.</p>
              <a className="lmk-btn lmk-btn-osc" href="#cuentanos">Cuéntanos tu campaña</a>
            </article>
          </div>
        </div>
      </section>

      {/* 6 · Cómo funciona */}
      <section className="lmk-como lmk-ancho">
        <div className="lmk-cont">
          <div className="lmk-rev">
            <span className="lmk-ante">Cómo funciona</span>
            <h2 className="lmk-titulo lmk-h2">De la idea a la calle</h2>
          </div>
          <ol className="lmk-pasos">
            {PASOS.map((p, i) => (
              <li key={p.t} className="lmk-paso lmk-rev">
                <span className="lmk-paso-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.t}</h3>
                <p>{p.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 · Cuéntanos tu campaña */}
      <section id="cuentanos" className="lmk-brief lmk-ancho">
        <div className="lmk-cont">
          <div className="lmk-rev">
            <span className="lmk-ante">Tu campaña</span>
            <h2 className="lmk-titulo lmk-h2">Pide tu presupuesto</h2>
            <p className="lmk-lead">Cuéntanos tu idea en tres pasos y te preparamos un presupuesto a medida, sin compromiso.</p>
          </div>
          <Brief />
        </div>
      </section>

      {/* 8 · Cierre */}
      <section className="lmk-final lmk-ancho">
        <div className="lmk-cont">
          <div className="lmk-cta lmk-rev">
            <div>
              <h2>¿Hacemos la tuya?</h2>
              <p>Cuéntanos qué quieres anunciar, dónde y cuántos días.</p>
            </div>
            <div className="lmk-cta-btns">
              <a className="lmk-btn lmk-btn-osc" href={whatsapp("Hola, quiero hacer una campaña en bici con La Mess.")} target="_blank" rel="noopener noreferrer">
                <Icono s><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></Icono>
                Escríbenos por WhatsApp
              </a>
              <a className="lmk-btn lmk-btn-borde" href="/contacto">Contacto</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
