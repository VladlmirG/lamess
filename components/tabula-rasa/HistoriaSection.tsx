"use client";

// import FadeInSection from "./FadeInSection";
import Image from "next/image";
import { FaBicycle, FaHandshake, FaChartLine, FaBriefcase } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function HistoriaSection() {
  const timeline = [
    {
      year: "2013",
      title: "El inicio",
      text: "Fem-ho amb bici arranca con Lucas, con una idea simple: hacer mensajería urbana de forma eficiente y sostenible.",
      icon: <FaBicycle className="text-militar-dark w-6 h-6" />,
    },
      {
    year: "2019",
    title: "Emprendimiento familiar",
    text: "Kike y Juliana arrancan con un emprendimiento familiar, La Moove, en plena época de pandemia.",
    icon: <FaBriefcase className="text-militar-dark w-6 h-6" />,
    },
    {
      year: "2021",
      title: "La unión",
      text: "Se une con La Moove, emprendimiento de Kike, y el fruto de esa unión es La Mess.",
      icon: <FaHandshake className="text-militar-dark w-6 h-6" />,
    },
    {
      year: "Hoy",
      title: "Crecimiento constante",
      text: "Hemos crecido empujados por la mejora de la infraestructura ciclista y la necesidad real de un servicio directo entre empresas (B2B), priorizando puntualidad, cuidado del producto y capacidad de respuesta.",
      icon: <FaChartLine className="text-militar-dark w-6 h-6" />,
    },
  ];

  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (timelineRef.current) {
      setLineHeight(timelineRef.current.offsetHeight);
    }
  }, []);

  return (
    // <FadeInSection>
      <section className="py-4 2xl:py-24 relative">
        <div className="w-full px-2 md:px-6 mx-auto">

          {/* TWO-COLUMN LAYOUT */}
          <div className="flex flex-col xl:flex-row gap-12">

            {/* LEFT CARD */}
            <div className="w-full xl:w-[40%] bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl rounded-3xl shadow-lg p-4 md:p-8 flex flex-col items-center text-center">
              <div className="w-full mb-6">
                <Image
                  src="/misc/foto-5.webp" // replace with actual image
                  alt="Qué hacemos"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full"
                />
              </div>

              <h3 className="text-2xl md:text-5xl xl:text-4xl 2xl:text-5xl font-gobold mb-6 pb-0 xl:pb-6 2xl:pb-0  tracking-[0.2em] uppercase">
                Qué hacemos
              </h3>

              <p className="text-foreground/80 font-montserrat leading-relaxed text-xs md:text-lg">
                Movemos producto entre empresas dentro de la ciudad: recogemos y entregamos sin puntos
                intermedios, reduciendo manipulación y tiempos. Nos especializamos en entregas directas en
                entornos urbanos, con un servicio pensado para el día a día de negocios que no pueden fallar:
                hostelería, obradores, comercios, importadores y marcas con distribución local.
              </p>
            </div>

            {/* RIGHT TIMELINE */}
            <div
              ref={timelineRef}
              className="w-full xl:w-[60%] flex flex-col relative"
            >
              {/* Timeline title */}
              <div className="mb-12 text-center lg:text-left">
                <h3 className="text-2xl md:text-5xl xl:text-4xl 2xl:text-5xl font-gobold mb-6 pl-0 lg:pl-10 tracking-[0.2em] uppercase">
                  Nuestra Historia
                </h3>
              </div>

              {/* Vertical line */}
              <div
                className="absolute left-7 w-0.5 bg-oliva"
                style={{ height: `${lineHeight}px`, top: 0 }}
              ></div>

              <ol className="space-y-16 relative z-10">
                {timeline.map((item, index) => (
                  <li key={index} className="relative pl-16">

                    {/* Icon instead of dot */}
                    <span className="absolute left-2 top-2 flex items-center justify-center w-10 h-10 rounded-full bg-oliva-light border-4 border-oliva-light">
                      {item.icon}
                    </span>

                    {/* Year */}
                    <h3 className="text-2xl md:text-3xl mb-2 font-gobold">{item.year}</h3>

                    {/* Title */}
                    <h4 className="text-lg font-semibold mb-2 font-montserrat">{item.title}</h4>

                    {/* Text */}
                    <p className="text-foreground/80 leading-relaxed font-montserrat text-[9px] md:text-[11px] 2xl:text-base max-w-3xl 2xl:max-w-full">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>
    // </FadeInSection>
  );
}
