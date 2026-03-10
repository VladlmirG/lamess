"use client";

import { Bike, Truck, Zap, Clock, MapPin, Leaf, Minus } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function Ventajas() {
  return (
    <section className="w-full pt-5 pb-20 relative overflow-hidden">
      <div className="mx-auto px-4 md:px-12 relative">



        <div className="text-center mb-15">
          <h2 className="font-gobold text-2xl md:text-5xl xl:text-6xl tracking-[0.2em] uppercase mb-4">
           ¿Por qué en <span className="text-oliva-light">bici</span> de carga?
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-oliva-light to-transparent mx-auto opacity-50"></div>
        </div>

        <div className="relative grid xl:grid-cols-2 gap-16">

          {/* VS Divider */}
          <div className="hidden xl:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center justify-center z-20 pointer-events-none">
            <div className="h-[85%] w-px bg-foreground/20 relative">
              <span className="absolute -left-5 top-1/2 -translate-y-1/2 bg-oliva-light text-militar-dark text-sm font-gobold px-3 py-1 rounded-full shadow">
                VS
              </span>
            </div>
          </div>

          {/* Cargo Bike */}
          <FadeInSection delay={0}>
            <div
              className="
                relative rounded-3xl p-10 shadow-2xl
                bg-linear-to-br from-militar via-militar to-militar-dark
                text-hueso
                hover:scale-[1.02] transition-transform duration-500
              "
            >
              <Bike className="absolute right-6 bottom-6 w-40 h-40 text-white/5 pointer-events-none" />

              <div className="flex items-center gap-3 mb-10 relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-oliva-light rounded-full flex items-center justify-center p-2 sm:p-3">
                  <Bike className="w-2/3 sm:w-full h-2/3 sm:h-full text-militar-dark" />
                </div>
                <h3 className="text-lg md:text-2xl font-gobold tracking-wide">
                  Bici de cargo
                </h3>
              </div>

              <ul className="space-y-6 text-sm md:text-lg leading-relaxed relative z-10 font-montserrat tracking-wide">
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 mt-1 text-oliva-light" />
                  Más ágil en ciudad, menos atascos, rutas más estables.
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 mt-1 text-oliva-light" />
                  Más predecible, mejor puntualidad en ventanas horarias.
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 mt-1 text-oliva-light" />
                  Acceso urbano, ideal para centros con restricciones.
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 mt-1 text-oliva-light" />
                  Sostenible, menos emisiones y ruido.
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="w-6 h-6 mt-1 text-oliva-light" />
                  Capacidad real para el día a día B2B.
                </li>
              </ul>
            </div>
          </FadeInSection>

          {/* Van Side */}
          <FadeInSection delay={200}>
            <div
              className="
                relative rounded-3xl p-10 shadow-xl
                bg-hueso/80 text-militar/80
              "
            >
              <Minus className="absolute left-6 bottom-6 w-40 h-40 text-militar/10 pointer-events-none" />

              <div className="flex items-center justify-end gap-3 mb-10">
                <h3 className="text-md md:text-2xl font-gobold tracking-wide text-right">
                  Furgoneta tradicional
                </h3>
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2 sm:p-3 bg-militar/20">
                  <Truck className="w-2/3 sm:w-full h-2/3 sm:h-full text-militar" />
                </div>
              </div>

              <ul className="space-y-6 text-sm md:text-lg leading-relaxed font-montserrat tracking-wide">
                <li className="flex items-start justify-between gap-3 text-right">
                  <span className="flex-1">Mayor exposición a atascos urbanos.</span>
                  <Minus className="w-6 h-6 mt-1 text-oliva shrink-0" />
                </li>
                <li className="flex items-start justify-between gap-3 text-right">
                  <span className="flex-1">Variabilidad en tiempos de entrega.</span>
                  <Minus className="w-6 h-6 mt-1 text-oliva shrink-0" />
                </li>
                <li className="flex items-start justify-between gap-3 text-right">
                  <span className="flex-1">Restricciones en zonas de acceso limitado.</span>
                  <Minus className="w-6 h-6 mt-1 text-oliva shrink-0" />
                </li>
                <li className="flex items-start justify-between gap-3 text-right">
                  <span className="flex-1">Más emisiones y contaminación acústica.</span>
                  <Minus className="w-6 h-6 mt-1 text-oliva shrink-0" />
                </li>
                <li className="flex items-start justify-between gap-3 text-right">
                  <span className="flex-1">Costes operativos superiores en entornos urbanos.</span>
                  <Minus className="w-6 h-6 mt-1 text-oliva shrink-0" />
                </li>
              </ul>
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  );
}
