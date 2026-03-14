"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "./FadeInSection";

export default function Sponsors() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const updateDarkMode = () => setIsDark(root.classList.contains("dark"));
    updateDarkMode();
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const sponsors = [
    {
      id: 1,
      name: "Brooks",
      logo: "/sponsors/brooks.jpeg",
      url: "https://www.brooksengland.com/",
    },
    {
      id: 2,
      name: "Kryptonitelock",
      logo: "/sponsors/kryptonite.jpg",
      url: "http://kryptonitelock.es/es/locks-landing/product-details-bicycle.html",
    },
    {
      id: 3,
      name: "MET Helmets",
      logo: "/sponsors/met.jpg",
      url: "https://www.met-helmets.com/en/",
    },
    {
      id: 4,
      name: "Oatly",
      logo: "/sponsors/oatly.jpg",
      url: "https://www.oatly.com/",
    },
  ];

  return (
    <FadeInSection>
      <section className="relative w-full py-12 px-8 md:px-20 overflow-hidden">
        
        {/* BACKGROUND GRAPHIC */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Image
            src="/hero/markstest4.png"
            alt="Background graphic"
            fill
            priority
            className={`object-contain opacity-5 ${isDark ? "invert" : ""} -translate-x-0/4 lg:-translate-x-1/4 scale-320 lg:scale-120 -rotate-2 transition-all duration-200 ease-in-out`}
          />
        </div>

        {/* FADES */}
        <div className="absolute top-0 left-0 w-full h-80 z-0 pointer-events-none bg-linear-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-100 z-0 pointer-events-none bg-linear-to-t from-background to-transparent" />
        <div className="absolute top-0 left-0 h-full w-64 z-0 pointer-events-none bg-linear-to-r from-background to-transparent" />
        <div className="absolute top-0 right-0 h-full w-64 z-0 pointer-events-none bg-linear-to-l from-background to-transparent" />

        <div className="z-10 max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
          
          {/* LEFT SIDE: Title */}
          <div className="text-center md:text-left">
            <div>
              <h2 className="font-gobold text-xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-6xl tracking-[0.2em] uppercase mb-4">
                nuestros <span className="text-oliva-light">sponsors</span>
              </h2>
              <div className="h-1 w-32 bg-linear-to-r from-transparent via-oliva-light mx-auto md:mx-0 to-transparent opacity-50"></div>
            </div>
            <p className="mt-8 text-foreground/70 font-montserrat tracking-wide text-sm lg:text-lg">
              Empresas que confían en nuestra logística sostenible
            </p>
          </div>

          {/* RIGHT SIDE: Grid of 4 Logos - Reduced size of the container grid */}
          <div className="flex justify-center md:justify-center w-full">
            <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-2xl">
              {sponsors.map((sponsor) => (
                <Link 
                  key={sponsor.id} 
                  href={sponsor.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-foreground/10 transition-all duration-300 hover:border-logo/50 hover:shadow-xl"
                >
                  <div className="relative w-[75%] h-[75%]">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </FadeInSection>
  );
}