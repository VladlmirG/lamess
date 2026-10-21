"use client";

// 21-oct · INC-0020 · El mapa del calculador, con Mapbox (sustituye al de
// Leaflet/OpenStreetMap): la recogida, las entregas y la ruta en bici.

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import "mapbox-gl/dist/mapbox-gl.css";
import { TOKEN_MAPBOX } from "@/lib/mapbox";
import type { Ciudad } from "@/lib/tarifas";

export interface PinMapa { lng: number; lat: number; marca: string; tipo: "recogida" | "entrega" | "fuera" }

interface Props {
  pines: PinMapa[];
  /** La ruta en bici ([lng, lat]), o null. */
  linea: [number, number][] | null;
  ciudad: Ciudad | null;
}

type MapboxGl = typeof import("mapbox-gl").default;
type Mapa = import("mapbox-gl").Map;
type Marcador = import("mapbox-gl").Marker;

const CENTRO: Record<Ciudad, [number, number]> = { Barcelona: [2.1734, 41.3851], Madrid: [-3.7038, 40.4168] };
const ESTILO = { claro: "mapbox://styles/mapbox/light-v11", oscuro: "mapbox://styles/mapbox/dark-v11" };
const FUENTE = "lmc-ruta";

export default function MapaRuta({ pines, linea, ciudad }: Props) {
  const { resolvedTheme } = useTheme();
  const oscuro = resolvedTheme === "dark";
  const caja = useRef<HTMLDivElement>(null);
  const mapa = useRef<Mapa | null>(null);
  const gl = useRef<MapboxGl | null>(null);
  const marcadores = useRef<Marcador[]>([]);
  const datos = useRef<{ pines: PinMapa[]; linea: [number, number][] | null; ciudad: Ciudad | null }>({ pines, linea, ciudad });
  const [listo, setListo] = useState(false);
  const [fallo, setFallo] = useState(false);

  // Pinta la línea de la ruta (y la vuelve a poner si cambia el estilo).
  const pintarLinea = () => {
    const m = mapa.current;
    if (!m || !m.isStyleLoaded()) return;
    const coords = datos.current.linea ?? [];
    const geo = { type: "Feature" as const, properties: {}, geometry: { type: "LineString" as const, coordinates: coords } };
    const fuente = m.getSource(FUENTE) as import("mapbox-gl").GeoJSONSource | undefined;
    if (fuente) fuente.setData(geo);
    else {
      m.addSource(FUENTE, { type: "geojson", data: geo });
      m.addLayer({ id: `${FUENTE}-borde`, type: "line", source: FUENTE, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#F4F1EA", "line-width": 9, "line-opacity": 0.9 } });
      m.addLayer({ id: FUENTE, type: "line", source: FUENTE, layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#45682E", "line-width": 5 } });
    }
  };

  const pintarPines = () => {
    const m = mapa.current, mb = gl.current;
    if (!m || !mb) return;
    marcadores.current.forEach(x => x.remove());
    marcadores.current = datos.current.pines.map(p => {
      const el = document.createElement("span");
      el.className = "lmc-pin";
      el.dataset.tipo = p.tipo;
      el.textContent = p.marca;
      el.setAttribute("aria-hidden", "true");
      return new mb.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(m);
    });
  };

  const encuadrar = () => {
    const m = mapa.current, mb = gl.current;
    if (!m || !mb) return;
    const { pines: ps, linea: l, ciudad: c } = datos.current;
    const puntos: [number, number][] = [...ps.map(p => [p.lng, p.lat] as [number, number]), ...(l ?? [])];
    if (puntos.length === 0) { m.easeTo({ center: CENTRO[c ?? "Barcelona"], zoom: 11.3 }); return; }
    if (puntos.length === 1) { m.easeTo({ center: puntos[0], zoom: 14 }); return; }
    const b = new mb.LngLatBounds(puntos[0], puntos[0]);
    puntos.forEach(p => b.extend(p));
    m.fitBounds(b, { padding: 56, maxZoom: 15, duration: 600 });
  };

  // Crear el mapa (una vez).
  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const mb = (await import("mapbox-gl")).default;
        if (cancelado || !caja.current) return;
        mb.accessToken = TOKEN_MAPBOX;
        gl.current = mb;
        const m = new mb.Map({
          container: caja.current,
          style: document.documentElement.classList.contains("dark") ? ESTILO.oscuro : ESTILO.claro,
          center: CENTRO[datos.current.ciudad ?? "Barcelona"],
          zoom: 11.3,
          cooperativeGestures: true,
          language: "es",
        });
        mapa.current = m;
        m.on("style.load", () => pintarLinea());
        m.on("load", () => { if (!cancelado) setListo(true); });
        m.on("error", e => { if (/access token|401|403/i.test(String(e?.error?.message ?? ""))) setFallo(true); });
      } catch {
        if (!cancelado) setFallo(true);
      }
    })();
    return () => {
      cancelado = true;
      marcadores.current.forEach(x => x.remove());
      marcadores.current = [];
      mapa.current?.remove();
      mapa.current = null;
    };
  }, []);

  // Claro u oscuro, como la web.
  useEffect(() => {
    const m = mapa.current;
    if (!m || !listo) return;
    m.setStyle(oscuro ? ESTILO.oscuro : ESTILO.claro);
  }, [oscuro, listo]);

  // Pines, ruta y encuadre cuando cambian.
  useEffect(() => {
    datos.current = { pines, linea, ciudad };
    if (!listo) return;
    pintarPines();
    pintarLinea();
    encuadrar();
  }, [pines, linea, ciudad, listo]);

  if (fallo) return <div className="lmc-mapa-vacio">El mapa no se ha podido cargar. El precio no cambia.</div>;
  return <div ref={caja} className="lmc-mapa-lienzo" role="img" aria-label="Mapa con la recogida, las entregas y la ruta en bici" />;
}
