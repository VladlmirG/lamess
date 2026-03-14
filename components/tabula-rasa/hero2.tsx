"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeInSection from "./FadeInSection";
import Link from "next/link";

export default function Hero2() {
  const [isDark, setIsDark] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.documentElement;
    const updateDarkMode = () => setIsDark(root.classList.contains("dark"));
    updateDarkMode();
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 3D Tilt Calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    setTilt({ x: rotateX, y: rotateY });
  };

  const videos = [
    { id: 1, src: "/hero/vid11.mp4" },
    { id: 2, src: "/hero/vid22.mp4" },
    { id: 3, src: "/hero/vid33.mp4" },
    { id: 4, src: "/hero/vid44.mp4" },
  ];

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

        {/* Fades */}
        <div className="absolute top-0 left-0 w-full h-80 z-0 pointer-events-none bg-linear-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-100 z-0 pointer-events-none bg-linear-to-t from-background to-transparent" />
        <div className="absolute top-0 left-0 h-full w-64 z-0 pointer-events-none bg-linear-to-r from-background to-transparent" />
        <div className="absolute top-0 right-0 h-full w-64 z-0 pointer-events-none bg-linear-to-l from-background to-transparent" />

        <div className="z-10 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mx-8">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center space-y-12 mt-5 text-center md:text-left">
            <h1 className="text-xl md:text-2xl xl:text-3xl 2xl:text-5xl tracking-wider font-peckhampress">
              Entregas directas entre profesionales en <span className="text-logo text-stroke">bicicleta de carga</span>  
            </h1>
            <p className="text-sm md:text-md lg:text-xs xl:text-xl 2xl:text-2xl text-foreground/70 max-w-2xl mx-auto md:mx-0 tracking-wide font-gobold">
               Recogemos y entregamos sin puntos intermedios. Rápidos, fiables y sostenibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/calculador">
                <button className="px-6 py-3 prime-button font-montserrat font-bold cursor-pointer">
                  Calcular envío
                </button>
              </Link>
              <a href="#ciudades" className="px-6 py-3 second-button font-montserrat font-bold">
                Ver tarifas
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center mt-12 md:mt-0 perspective-[1000px]">
            <div className="grid grid-cols-2 gap-4 lg:gap-10 w-full max-w-212.5`">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-4 lg:gap-10">
                {[0, 1].map((idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-4/5 md:h-60 xl:h-90 2xl:h-115 w-full"
                    onMouseMove={(e) => {
                        if (hoveredIndex === idx) handleMouseMove(e);
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => {
                        setHoveredIndex(null);
                        setTilt({ x: 0, y: 0 });
                    }}
                  >
                    <video
                      src={videos[idx].src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        transform: hoveredIndex === idx 
                          ? `scale(1.15) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
                          : 'scale(1) rotateX(0deg) rotateY(0deg)'
                      }}
                      className={`rounded-xl object-cover h-full w-full hero-shadow transition-transform duration-200 ease-out cursor-pointer z-10
                        ${hoveredIndex === idx ? "z-50 absolute inset-0 shadow-2xl ring-2 ring-white/20" : "opacity-90"}`}
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4 lg:gap-10 mt-12">
                {[2, 3].map((idx) => (
                  <div 
                    key={idx} 
                    className="relative aspect-4/5 md:h-60 xl:h-90 2xl:h-115 w-full"
                    onMouseMove={(e) => {
                        if (hoveredIndex === idx) handleMouseMove(e);
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => {
                        setHoveredIndex(null);
                        setTilt({ x: 0, y: 0 });
                    }}
                  >
                    <video
                      src={videos[idx].src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        transform: hoveredIndex === idx 
                          ? `scale(1.15) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
                          : 'scale(1) rotateX(0deg) rotateY(0deg)'
                      }}
                      className={`rounded-xl object-cover h-full w-full hero-shadow transition-transform duration-200 ease-out cursor-pointer z-10
                        ${hoveredIndex === idx ? "z-50 absolute inset-0 shadow-2xl ring-2 ring-white/20" : "opacity-90"}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}