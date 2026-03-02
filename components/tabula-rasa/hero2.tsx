"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeInSection from "./FadeInSection";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // shadcn tooltip

export default function Hero2() {
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
     <FadeInSection>
    <section className="relative w-full flex items-center justify-center py-12 overflow-hidden">

      {/* Background PNG */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/hero/markstest4.png"
          alt="Background graphic"
          fill
          priority
          className={`object-contain opacity-5 ${isDark ? "invert" : ""} -translate-x-0/4 lg:-translate-x-1/4 scale-320 lg:scale-120 -rotate-2 transition-all duration-200 ease-in-out`}
        />
      </div>

      {/* Top, Bottom, Left, Right Fades */}
      <div className="absolute top-0 left-0 w-full h-80 z-0 pointer-events-none bg-linear-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-100 z-0 pointer-events-none bg-linear-to-t from-background to-transparent" />
      <div className="absolute top-0 left-0 h-full w-64 z-0 pointer-events-none bg-linear-to-r from-background to-transparent" />
      <div className="absolute top-0 right-0 h-full w-64 z-0 pointer-events-none bg-linear-to-l from-background to-transparent" />

      {/* Hero content */}
      <div className="z-10 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mx-8">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center space-y-12 mt-5 text-center md:text-left">
          <h1 className="text-xl md:text-2xl xl:text-3xl 2xl:text-5xl tracking-wider font-peckhampress">
            Entregas directas entre profesionales en <span className="text-logo text-stroke">bicicleta de carga</span>  
          </h1>

          <p className="text-sm md:text-md lg:text-xs xl:text-xl 2xl:text-2xl text-foreground/70  max-w-2xl mx-auto md:mx-0 tracking-wide font-gobold">
             Recogemos y entregamos sin puntos intermedios. Rápidos, fiables y sostenibles.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Tooltip button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="px-6 py-3 prime-button font-montserrat font-bold cursor-pointer">
                      Calcular envío
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-center border border-foreground/40 text-hueso">
                    Este servicio actualmente no está disponible debido a mantenimiento y mejoras.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            <a  href="#ciudades" className="px-6 py-3 second-button font-montserrat font-bold">
              Ver tarifas
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative md:flex justify-center">
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-6">
              <Image
                src="/hero/hero1.jpg"
                alt="Team collaboration"
                width={500}
                height={500}
                className="rounded-xl object-cover h-50 md:h-60 xl:h-90 2xl:h-115 w-auto hero-shadow"
              />
              <Image
                src="/hero/hero2.webp"
                alt="Office workspace"
                width={500}
                height={500}
                className="rounded-xl object-cover h-50 md:h-60 xl:h-90 2xl:h-115 w-auto hero-shadow"
              />
            </div>

            <div className="flex flex-col gap-4 lg:gap-6 mt-12">
              <Image
                src="/hero/hero3.webp"
                alt="Meeting presentation"
                width={500}
                height={500}
                className="rounded-xl object-cover h-50 md:h-60 xl:h-90 2xl:h-115 w-auto hero-shadow"
              />
              <Image
                src="/hero/hero4.webp"
                alt="Professional woman working"
                width={500}
                height={500}
                className="rounded-xl object-cover h-50 md:h-60 xl:h-90 2xl:h-115 w-auto hero-shadow"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
    </FadeInSection>
  );
}
