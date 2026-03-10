"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiTruck, HiSpeakerphone, HiShoppingCart, HiLightBulb, HiAcademicCap, HiCog, HiArchive, HiInbox, } from "react-icons/hi";
import { BsTools } from "react-icons/bs";
import { IconType } from "react-icons";


interface CardItem {
  title: string;
  description: string;
  icon: IconType;
  image: string;
}

const services: CardItem[] = [
  {
    title: "Transporte Directo",
    description:
      "Recogida y entrega sin puntos intermedios. Menos manipulación, más rapidez y más control.",
    icon: HiTruck,
    image: "/misc/foto-1.webp",
  },
  {
    title: "Publicidad",
    description:
      "Publicidad ambulante y presencia de marca durante las entregas: campañas en movimiento, activaciones y rutas.",
    icon: HiSpeakerphone,
    image: "/misc/publicidad.jpg",
  },
  {
    title: "Taller",
    description:
      "Taller especializado en Cargo Bike: puesta a punto, mejoras y reparaciones para uso intensivo.",
    icon: BsTools,
    image: "/misc/taller.jpg",
  },
  {
    title: "Venta",
    description:
      "Asesoramiento y venta de cargo bikes y configuraciones adecuadas según carga, ciudad y rutas.",
    icon: HiShoppingCart,
    image: "/misc/ventas.jpg",
  },
  {
    title: "Asesoramiento",
    description:
      "Consultoría práctica: diseño de operativa, adquisición de flota y herramientas de gestión logística.",
    icon: HiLightBulb,
    image: "/misc/asesoramiento.jpg",
  },
  {
    title: "Formación",
    description:
      "Formaciones a medida: mecánica básica, uso seguro, buenas prácticas de reparto y organización operativa.",
    icon: HiAcademicCap,
    image: "/misc/formacion.jpg",
  },
  {
    title: "Mantenimientos",
    description:
      "Mantenimiento y reparaciones para locales y pequeños negocios (instalaciones, ajustes y soporte).",
    icon: HiCog,
    image: "/misc/mantenimiento.jpg",
  },
  {
    title: "Almacenamiento",
    description:
      "Gestión de stock en nuestro espacio: recepción, organización y preparación para distribución.",
    icon: HiArchive,
    image: "/misc/almacenamiento.jpg",
  },
  {
    title: "Redistribución de paquetería",
    description:
      "Gestión de última milla y redistribución urbana: consolidación, microhubs y rutas eficientes.",
    icon: HiInbox,
    image: "/misc/redist.jpg",
  },
];

export default function ServiciosComponent() {
  const [isDark, setIsDark] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const root = document.documentElement;
    const updateDarkMode = () => setIsDark(root.classList.contains("dark"));
    updateDarkMode();

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background PNG like hero */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image src="/hero/markstest4.png" alt="Background graphic" fill priority
          className={`hidden lg:block object-contain opacity-4 ${isDark ? "invert" : ""}  translate-x-0/4 lg:translate-x-1/4  scale-320 lg:scale-120 rotate-40 transition-all duration-200 ease-in-out`}/>
      </div>

      {/* Top, Bottom, Left, Right Fades */}
      <div className="absolute top-0 left-0 w-full h-80 z-0 pointer-events-none bg-linear-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-100 z-0 pointer-events-none bg-linear-to-t from-background to-transparent" />
      <div className="absolute top-0 left-0 h-full w-64 z-0 pointer-events-none bg-linear-to-r from-background to-transparent" />
      <div className="absolute top-0 right-0 h-full w-64 z-0 pointer-events-none bg-linear-to-l from-background to-transparent" />

      <div className="mx-auto px-4 md:px-12 relative z-10">
        {/* Top title & paragraph */}
        <div className="text-center mb-8 md:mb-12">
         <div className="text-center mb-4">
          <h2 className="font-gobold text-2xl md:text-5xl xl:text-6xl tracking-[0.2em] uppercase mb-4">
            Nuestros <span className="text-oliva-light">servicios</span>
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-oliva-light to-transparent mx-auto opacity-50"></div>
        </div>
          <p className="text-muted-foreground text-sm md:text-lg max-w-3xl mx-auto font-montserrat tracking-wide">
            Logística urbana y soluciones complementarias para marcas y negocios.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div key={index} className="group relative overflow-hidden rounded-2xl p-6 h-80 flex flex-col justify-center hover:shadow-2xl transition-all duration-300">
                {/* Hover Background Image */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}/>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-oliva/80 via-oliva/70 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-opacity duration-500" />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <h3 className="text-lg md:text-xl lg:text-lg xl:text-xl text-foreground text-stroke2 font-gobold tracking-wide mb-3 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-md text-muted-foreground font-montserrat tracking-wide group-hover:text-white/90 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Icon bottom-right */}
                <div className="absolute bottom-4 right-4">
                  <Icon className="w-12 h-12 text-foreground/40 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
