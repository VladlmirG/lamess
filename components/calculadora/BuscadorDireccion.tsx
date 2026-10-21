"use client";

// 21-oct · INC-0020 · Un campo de dirección del calculador: escribes y salen
// las direcciones de Mapbox (como en la app). Sin Mapbox, se escribe el código
// postal a mano.

import { useEffect, useId, useRef, useState } from "react";
import { buscarDirecciones, TOKEN_MAPBOX, type Punto, type Sugerencia } from "@/lib/mapbox";
import type { Ciudad } from "@/lib/tarifas";

/** `corto`: lo que cabe en el móvil («08008», «Zona 3»). */
export interface ChipDireccion { texto: string; corto: string; fuera?: boolean; falta?: boolean }

interface Props {
  id: string;
  etiqueta: string;
  /** «R» para la recogida; «1», «2»… para las entregas. */
  marca: string;
  tipo: "recogida" | "entrega";
  valor: Punto | null;
  onElegir: (p: Punto | null) => void;
  /** Para dar preferencia a las direcciones de esa ciudad. */
  ciudad: Ciudad | null;
  chip: ChipDireccion | null;
  onQuitar?: () => void;
  autoFocus?: boolean;
}

const soloCp = (v: string) => v.replace(/\D/g, "").slice(0, 5);

export default function BuscadorDireccion({ id, etiqueta, marca, tipo, valor, onElegir, ciudad, chip, onQuitar, autoFocus }: Props) {
  const conMapbox = TOKEN_MAPBOX !== "";
  const lista = useId();
  const [texto, setTexto] = useState(valor?.texto ?? "");
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [activa, setActiva] = useState(-1);
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);
  const peticion = useRef<AbortController | null>(null);

  useEffect(() => () => {
    if (espera.current) clearTimeout(espera.current);
    peticion.current?.abort();
  }, []);

  function escribir(v: string) {
    if (!conMapbox) {
      const cp = soloCp(v);
      setTexto(cp);
      onElegir(cp.length === 5 ? { texto: cp, cp, municipio: null, lng: null, lat: null } : null);
      return;
    }
    setTexto(v);
    if (valor) onElegir(null);
    if (espera.current) clearTimeout(espera.current);
    peticion.current?.abort();
    if (v.trim().length < 3) { setSugerencias([]); setAbierto(false); setBuscado(false); return; }
    espera.current = setTimeout(async () => {
      const ac = new AbortController();
      peticion.current = ac;
      const r = await buscarDirecciones(v, ciudad, ac.signal);
      if (ac.signal.aborted) return;
      setSugerencias(r);
      setActiva(r.length ? 0 : -1);
      setBuscado(true);
      setAbierto(true);
    }, 250);
  }

  function elegir(s: Sugerencia) {
    setTexto(s.calle);
    setAbierto(false);
    setSugerencias([]);
    onElegir(s.punto);
  }

  function tecla(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!abierto || !sugerencias.length) {
      if (e.key === "Escape") setAbierto(false);
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setActiva(a => (a + 1) % sugerencias.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiva(a => (a - 1 + sugerencias.length) % sugerencias.length); }
    else if (e.key === "Enter" && activa >= 0) { e.preventDefault(); elegir(sugerencias[activa]); }
    else if (e.key === "Escape") { e.preventDefault(); setAbierto(false); }
  }

  const verLista = conMapbox && abierto && (sugerencias.length > 0 || buscado);
  const opcion = (i: number) => `${lista}-${i}`;
  // Una dirección elegida sin código postal (pasa con algunas calles sin número): se escribe aquí.
  const faltaCp = conMapbox && valor !== null && !valor.cp;

  return (
    <div className="lmc-campo">
      <div className="lmc-etiqueta-fila">
        <label htmlFor={id} className="lmc-etiqueta">{etiqueta}</label>
        {onQuitar && (
          <button type="button" className="lmc-quitar" onClick={onQuitar} aria-label={`Quitar la ${etiqueta.toLowerCase()}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        )}
      </div>
      <div className="lmc-caja-buscador">
        <div className="lmc-caja" data-fuera={chip?.fuera ? "1" : undefined}>
          {valor || !conMapbox ? (
            <span aria-hidden="true" className="lmc-marca" data-tipo={tipo}>{marca}</span>
          ) : (
            <svg className="lmc-lupa" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          )}
          <input
            id={id}
            className="lmc-input"
            value={texto}
            onChange={e => escribir(e.target.value)}
            onKeyDown={tecla}
            onBlur={() => setAbierto(false)}
            onFocus={() => { if (sugerencias.length) setAbierto(true); }}
            autoFocus={autoFocus}
            autoComplete="off"
            spellCheck={false}
            placeholder={conMapbox ? "Calle y número" : "Código postal"}
            inputMode={conMapbox ? undefined : "numeric"}
            maxLength={conMapbox ? 160 : 5}
            {...(conMapbox ? {
              role: "combobox",
              "aria-autocomplete": "list" as const,
              "aria-expanded": verLista,
              "aria-controls": lista,
              "aria-activedescendant": verLista && activa >= 0 ? opcion(activa) : undefined,
            } : {})}
          />
          {faltaCp && (
            <input
              className="lmc-cp"
              aria-label={`Código postal de la ${etiqueta.toLowerCase()}`}
              placeholder="C. P."
              inputMode="numeric"
              maxLength={5}
              onChange={e => { const cp = soloCp(e.target.value); if (cp.length === 5 && valor) onElegir({ ...valor, cp }); }}
            />
          )}
          {chip && !faltaCp && (
            <span className="lmc-chip" data-fuera={chip.fuera ? "1" : undefined} data-falta={chip.falta ? "1" : undefined}>
              <span className="lmc-chip-largo">{chip.texto}</span>
              <span className="lmc-chip-corto" aria-hidden="true">{chip.corto}</span>
            </span>
          )}
        </div>
        {verLista && (
          <ul id={lista} role="listbox" aria-label="Direcciones sugeridas" className="lmc-sugerencias">
            {sugerencias.map((s, i) => (
              <li
                key={s.id}
                id={opcion(i)}
                role="option"
                aria-selected={i === activa}
                className="lmc-sugerencia"
                onMouseDown={e => e.preventDefault()}
                onMouseEnter={() => setActiva(i)}
                onClick={() => elegir(s)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span><strong>{s.calle}</strong><small>{s.donde}</small></span>
              </li>
            ))}
            {sugerencias.length === 0 && <li role="presentation" className="lmc-sin-resultados">No encontramos esa dirección. Prueba con la calle y el número.</li>}
            <li role="presentation" className="lmc-sugerencias-pie">Sugerencias de Mapbox, como en la app</li>
          </ul>
        )}
      </div>
    </div>
  );
}
