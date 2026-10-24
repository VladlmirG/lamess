"use client";

// 23-oct · «Cuéntanos tu campaña»: tres pasos y, al lado, la ficha tal como
// nos llega. La web no tiene servidor para formularios (Contacto también va por
// correo), así que al final se abre WhatsApp o el correo con todo ya escrito.
// Más adelante, esto mismo podría entrar en la app como una campaña.

import { useEffect, useId, useRef, useState } from "react";
import {
  CAMPANA_VACIA, CIUDADES, FORMATOS, MAX_VEHICULOS, MIN_VEHICULOS,
  faltaEnCampana, filasCampana, mailtoCampana, pideProducto, textoCampana,
  type DatosCampana, type TipoCampana,
} from "@/lib/campanas";
import { whatsapp } from "@/lib/enlaces";

type Texto = "desde" | "hasta" | "flyers" | "puntos" | "entregas" | "horas" | "flota" | "producto" | "zonas" | "nombre" | "empresa" | "email" | "telefono" | "mensaje";
type Envio = "" | "whatsapp" | "correo";

const PASOS = ["La campaña", "Los detalles", "Contacto"];

function IconoWhatsapp() {
  return (
    <svg className="lmk-ico lmk-ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
  );
}

export default function Brief() {
  const id = useId();
  const [d, setD] = useState<DatosCampana>(CAMPANA_VACIA);
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState("");
  const [envio, setEnvio] = useState<Envio>("");
  const titulo = useRef<HTMLElement | null>(null);
  const ponerTitulo = (el: HTMLElement | null) => { titulo.current = el; };
  const primeraVez = useRef(true);

  // Al cambiar de paso, el foco va a su título (para teclado y lector de pantalla).
  useEffect(() => {
    if (primeraVez.current) { primeraVez.current = false; return; }
    titulo.current?.focus({ preventScroll: true });
  }, [paso, envio]);

  const cambiar = (k: Texto) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setD(x => ({ ...x, [k]: v }));
    setError("");
  };
  const tipo = (t: TipoCampana) => () => {
    setD(x => ({ ...x, tipos: x.tipos.includes(t) ? x.tipos.filter(y => y !== t) : [...x.tipos, t] }));
    setError("");
  };
  const siguiente = () => {
    if (paso === 1 && d.tipos.length === 0) { setError("Elige al menos un tipo de campaña."); return; }
    setError("");
    setPaso(p => Math.min(3, p + 1));
  };
  const atras = () => { setError(""); setPaso(p => Math.max(1, p - 1)); };
  const mandar = (por: "whatsapp" | "correo") => {
    const falta = faltaEnCampana(d);
    if (falta) { setError(falta); return; }
    setError("");
    if (por === "whatsapp") window.open(whatsapp(textoCampana(d)), "_blank", "noopener,noreferrer");
    else window.location.href = mailtoCampana(d);
    setEnvio(por);
  };
  const otra = () => { setD(CAMPANA_VACIA); setPaso(1); setError(""); setEnvio(""); };

  const tiene = (t: TipoCampana) => d.tipos.includes(t);
  const estado = (n: number) => (envio || paso > n ? "hecho" : paso === n ? "actual" : "pendiente");
  const filas = filasCampana(d);
  const campo = (k: Texto) => `${id}-${k}`;

  return (
    <div className="lmk-brief-grid">
      <form className="lmk-form" onSubmit={e => e.preventDefault()} noValidate aria-labelledby={`${id}-paso`}>
        <ol className="lmk-steps" aria-label="Pasos">
          {PASOS.map((p, i) => (
            <li key={p} className="lmk-step" data-estado={estado(i + 1)} aria-current={!envio && paso === i + 1 ? "step" : undefined}>
              <i aria-hidden="true" />{i + 1} · {p}
            </li>
          ))}
        </ol>

        {envio ? (
          <div className="lmk-hecho" role="status">
            <span className="lmk-hecho-ico" aria-hidden="true">
              <svg className="lmk-ico" viewBox="0 0 24 24"><path d="M5 12.5 10 17.5 19 7" /></svg>
            </span>
            <p ref={ponerTitulo} tabIndex={-1} id={`${id}-paso`} className="lmk-q">¡Ya casi está!</p>
            <p>
              {envio === "whatsapp"
                ? "Se ha abierto WhatsApp con tu campaña ya escrita: solo te falta darle a enviar. Te contestamos con un presupuesto a medida."
                : "Se ha abierto tu correo con tu campaña ya escrita: solo te falta darle a enviar. Te contestamos con un presupuesto a medida."}
            </p>
            <div className="lmk-botones">
              <button type="button" className="lmk-btn" onClick={() => mandar(envio === "correo" ? "correo" : "whatsapp")}>
                {envio === "correo" ? "Abrir el correo otra vez" : <><IconoWhatsapp />Abrir WhatsApp otra vez</>}
              </button>
              <button type="button" className="lmk-btn lmk-btn2" onClick={otra}>Empezar otra</button>
            </div>
          </div>
        ) : (
          <>
            {paso === 1 && (
              <div className="lmk-filas">
                <fieldset className="lmk-campo">
                  <legend className="lmk-q" ref={ponerTitulo} tabIndex={-1} id={`${id}-paso`}>¿Qué tipo de campaña?</legend>
                  <span className="lmk-et">Puedes elegir varias.</span>
                  <div className="lmk-opc">
                    {FORMATOS.map(f => (
                      <button key={f.id} type="button" aria-pressed={tiene(f.id)} onClick={tipo(f.id)}>{f.titulo}</button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="lmk-campo">
                  <legend className="lmk-et">¿En qué ciudad?</legend>
                  <div className="lmk-opc">
                    {CIUDADES.map(c => (
                      <button key={c} type="button" aria-pressed={d.ciudad === c} onClick={() => setD(x => ({ ...x, ciudad: c }))}>{c}</button>
                    ))}
                  </div>
                </fieldset>
                <div className="lmk-dos">
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("desde")}>Desde <em>(si ya lo sabes)</em></label>
                    <input id={campo("desde")} className="lmk-in" type="date" value={d.desde} onChange={cambiar("desde")} />
                  </div>
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("hasta")}>Hasta</label>
                    <input id={campo("hasta")} className="lmk-in" type="date" value={d.hasta} min={d.desde || undefined} onChange={cambiar("hasta")} />
                  </div>
                </div>
                <div className="lmk-campo">
                  <span className="lmk-et" id={`${id}-veh`}>¿Cuántos vehículos? <em>(bicis o remolques)</em></span>
                  <div className="lmk-num" role="group" aria-labelledby={`${id}-veh`}>
                    <button type="button" aria-label="Uno menos" disabled={d.vehiculos <= MIN_VEHICULOS}
                      onClick={() => setD(x => ({ ...x, vehiculos: Math.max(MIN_VEHICULOS, x.vehiculos - 1) }))}>−</button>
                    <span aria-live="polite">{d.vehiculos}</span>
                    <button type="button" aria-label="Uno más" disabled={d.vehiculos >= MAX_VEHICULOS}
                      onClick={() => setD(x => ({ ...x, vehiculos: Math.min(MAX_VEHICULOS, x.vehiculos + 1) }))}>+</button>
                  </div>
                </div>
              </div>
            )}

            {paso === 2 && (
              <div className="lmk-filas">
                <p className="lmk-q" ref={ponerTitulo} tabIndex={-1} id={`${id}-paso`}>Los detalles</p>
                <div className="lmk-dos">
                  {tiene("flyers") && (
                    <div className="lmk-campo">
                      <label className="lmk-et" htmlFor={campo("flyers")}>¿Cuántos flyers?</label>
                      <input id={campo("flyers")} className="lmk-in" type="number" min={0} inputMode="numeric" placeholder="Por ejemplo, 5000" value={d.flyers} onChange={cambiar("flyers")} />
                    </div>
                  )}
                  {tiene("carteles") && (
                    <div className="lmk-campo">
                      <label className="lmk-et" htmlFor={campo("puntos")}>¿Cuántos puntos? <em>(mínimo)</em></label>
                      <input id={campo("puntos")} className="lmk-in" type="number" min={0} inputMode="numeric" value={d.puntos} onChange={cambiar("puntos")} />
                    </div>
                  )}
                  {tiene("entregas") && (
                    <div className="lmk-campo">
                      <label className="lmk-et" htmlFor={campo("entregas")}>Entregas al mes <em>(más o menos)</em></label>
                      <input id={campo("entregas")} className="lmk-in" type="number" min={0} inputMode="numeric" value={d.entregas} onChange={cambiar("entregas")} />
                    </div>
                  )}
                  {tiene("ambulante") && (
                    <div className="lmk-campo">
                      <label className="lmk-et" htmlFor={campo("horas")}>Horas al día</label>
                      <input id={campo("horas")} className="lmk-in" type="number" min={0} inputMode="numeric" value={d.horas} onChange={cambiar("horas")} />
                    </div>
                  )}
                  {tiene("flota") && (
                    <div className="lmk-campo">
                      <label className="lmk-et" htmlFor={campo("flota")}>¿Cuántas bicis quieres?</label>
                      <input id={campo("flota")} className="lmk-in" type="number" min={0} inputMode="numeric" value={d.flota} onChange={cambiar("flota")} />
                    </div>
                  )}
                </div>
                <div className="lmk-campo">
                  <label className="lmk-et" htmlFor={campo("zonas")}>Zonas o barrios</label>
                  <input id={campo("zonas")} className="lmk-in" type="text" placeholder="Gràcia, el Eixample, la salida del metro de…" value={d.zonas} onChange={cambiar("zonas")} />
                </div>
                {pideProducto(d.tipos) && (
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("producto")}>¿Qué se reparte o se entrega?</label>
                    <input id={campo("producto")} className="lmk-in" type="text" placeholder="Flyers A5, muestras, cajas de producto…" value={d.producto} onChange={cambiar("producto")} />
                  </div>
                )}
                <fieldset className="lmk-campo">
                  <legend className="lmk-et">¿Tienes ya el diseño?</legend>
                  <div className="lmk-opc">
                    {([["si", "Sí, ya lo tengo"], ["no", "Aún no"]] as const).map(([v, t]) => (
                      <button key={v} type="button" aria-pressed={d.diseno === v} onClick={() => setD(x => ({ ...x, diseno: x.diseno === v ? "" : v }))}>{t}</button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {paso === 3 && (
              <div className="lmk-filas">
                <p className="lmk-q" ref={ponerTitulo} tabIndex={-1} id={`${id}-paso`}>¿Con quién hablamos?</p>
                <div className="lmk-dos">
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("nombre")}>Tu nombre *</label>
                    <input id={campo("nombre")} className="lmk-in" type="text" autoComplete="name" required value={d.nombre} onChange={cambiar("nombre")} />
                  </div>
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("empresa")}>Empresa o marca</label>
                    <input id={campo("empresa")} className="lmk-in" type="text" autoComplete="organization" value={d.empresa} onChange={cambiar("empresa")} />
                  </div>
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("email")}>Correo</label>
                    <input id={campo("email")} className="lmk-in" type="email" autoComplete="email" value={d.email} onChange={cambiar("email")} />
                  </div>
                  <div className="lmk-campo">
                    <label className="lmk-et" htmlFor={campo("telefono")}>Teléfono</label>
                    <input id={campo("telefono")} className="lmk-in" type="tel" autoComplete="tel" value={d.telefono} onChange={cambiar("telefono")} />
                  </div>
                </div>
                <div className="lmk-campo">
                  <label className="lmk-et" htmlFor={campo("mensaje")}>¿Algo más? <em>(opcional)</em></label>
                  <textarea id={campo("mensaje")} className="lmk-in" value={d.mensaje} onChange={cambiar("mensaje")} />
                </div>
                <span className="lmk-et">* Con tu nombre nos basta: al enviarla por WhatsApp o por correo ya sabemos cómo contestarte.</span>
              </div>
            )}

            <p className="lmk-error" aria-live="polite">{error}</p>

            <div className="lmk-acc">
              {paso > 1 ? <button type="button" className="lmk-btn lmk-btn2" onClick={atras}>Atrás</button> : <span />}
              {paso < 3 ? (
                <button type="button" className="lmk-btn" onClick={siguiente}>Siguiente</button>
              ) : (
                <div className="lmk-botones">
                  <button type="button" className="lmk-btn lmk-btn2" onClick={() => mandar("correo")}>Por correo</button>
                  <button type="button" className="lmk-btn" onClick={() => mandar("whatsapp")}><IconoWhatsapp />Enviar por WhatsApp</button>
                </div>
              )}
            </div>
          </>
        )}
      </form>

      <aside className="lmk-ficha" aria-label="Resumen de tu campaña">
        <div className="lmk-ficha-cab">
          <div>
            <span className="lmk-ficha-ante">Así nos llega</span>
            <h3>{envio ? "Campaña lista" : "Nueva campaña"}</h3>
          </div>
          <span className="lmk-estado" data-ok={envio ? "1" : "0"}>
            {envio === "whatsapp" ? "En WhatsApp" : envio === "correo" ? "En tu correo" : "Por presupuestar"}
          </span>
        </div>
        <dl>
          {filas.map(f => (
            <div key={f.k} className="lmk-fila"><dt>{f.k}</dt><dd data-vacio={f.vacio ? "1" : "0"}>{f.v}</dd></div>
          ))}
        </dl>
        <p className="lmk-ficha-pie">Te contestamos con un presupuesto a medida, sin compromiso.</p>
      </aside>
    </div>
  );
}
