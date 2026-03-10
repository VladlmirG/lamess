"use client";

import React from "react";
import CountUp from "react-countup";
import { FaLeaf, FaBoxOpen, FaRoute } from "react-icons/fa";
import FadeInSection from "./FadeInSection";

const stats = [
  {
    id: 1,
    label: "CO2 Ahorrado",
    value: 25635,
    suffix: "kg",
    icon: <FaLeaf className="text-green-500" />,
    decimals: 0,
  },
  {
    id: 2,
    label: "Entregas Realizadas",
    value: 163547,
    suffix: "",
    icon: <FaBoxOpen className="text-oliva-light" />,
    decimals: 0,
  },
  {
    id: 3,
    label: "Km Recorridos",
    value: 193110.76,
    suffix: " km",
    icon: <FaRoute className="text-hueso" />,
    decimals: 2,
  },
];

export default function StatsCounter() {
  return (
    <FadeInSection>
      <section className="pt-14 pb-8 px-4 sm:px-6 relative bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-gobold text-2xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.2em] uppercase mb-4">
              Impacto <span className="text-oliva-light">2025</span>
            </h2>
            <div className="h-1 w-24 md:w-32 bg-linear-to-r from-transparent via-oliva-light to-transparent mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
            {stats.map((stat) => (
   <div
  key={stat.id}
  className="group relative flex flex-col items-center p-6 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border border-foreground/10 bg-militar-dark/5 transition-all duration-500 hover:border-oliva-light/40 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(164,174,100,0.15)] transform-gpu"
  style={{ 
    willChange: 'transform, box-shadow', // Prepara al navegador para el hover
    backfaceVisibility: 'hidden',
    WebkitFontSmoothing: 'antialiased' // Suavizado extra para fuentes en Mac
  }}
>
                {/* Círculo de Icono */}
                <div className="relative mb-6 lg:mb-8 p-4 lg:p-6 rounded-full bg-militar-dark/80 border border-oliva-light/20 shadow-xl group-hover:scale-110 group-hover:bg-militar-dark transition-all duration-500">
                  <div className="text-3xl lg:text-4xl relative z-10">{stat.icon}</div>
                  <div className="absolute inset-0 rounded-full bg-oliva-light/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Número Animado */}
                {/* CAMBIO: Añadimos 'tabular-nums' para que los números no bailen horizontalmente */}
                <div className="font-gobold text-3xl md:text-2xl lg:text-4xl xl:text-6xl mb-3 lg:mb-4 tracking-tighter flex items-baseline gap-1 whitespace-nowrap text-foreground/80 tabular-nums">
                  <CountUp
                    end={stat.value}
                    duration={3} // Un poco más rápido ayuda a que el glitch se note menos si ocurre
                    separator="."
                    decimal=","
                    decimals={stat.decimals}
                    enableScrollSpy
                    scrollSpyOnce
                    // Propiedades críticas para estabilidad:
                    useEasing={true}
                  />
                  <span className="text-oliva-light text-lg lg:text-2xl xl:text-3xl lowercase">{stat.suffix}</span>
                </div>

                {/* Separador */}
                <div className="w-10 h-px bg-oliva-light/30 mb-4 transition-all duration-500 group-hover:w-20 group-hover:bg-oliva-light"></div>

                {/* Etiqueta */}
                <p className="font-montserrat text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.3em] lg:tracking-[0.5em] opacity-40 group-hover:opacity-80 transition-opacity text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}