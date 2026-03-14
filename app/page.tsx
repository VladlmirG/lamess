"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import CityCard from "@/components/tabula-rasa/CityCard";
import ComoFunciona from "@/components/tabula-rasa/ComoFunciona";
import Hero2 from "@/components/tabula-rasa/hero2";
import LogosCarousel from "@/components/tabula-rasa/LogosCarousel";
import QueHacemos from "@/components/tabula-rasa/QueHacemos";
import ReviewsCarousel from "@/components/tabula-rasa/ReviewsCarousel";
import Ventajas from "@/components/tabula-rasa/Ventajas";
import StatsCounter from "@/components/tabula-rasa/StatsCounter";
import Sponsors from "@/components/tabula-rasa/Sponsors";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* <Hero/> */}
      <Hero2/>
      <StatsCounter/>
      <CityCard/>
      <QueHacemos/>

       {/* ===== SHARED BACKGROUND BLOCK ===== */}
      <section className="relative overflow-hidden">

        {/* Background PNG */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Image src="/hero/markstest4.png" alt="Background graphic" fill className={`object-contain opacity-5 
              ${isDark ? "invert" : ""}
              translate-x-0/4 
              lg:translate-x-1/4 
              scale-[3.2] 
              lg:scale-120 
              rotate-40 
              transition-all 
              duration-200 
              ease-in-out
            `}
          />
        </div>

        {/* Top Fade */}
        <div className="absolute top-0 left-0 w-full h-80 z-0 pointer-events-none bg-linear-to-b from-background to-transparent" />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-100 z-0 pointer-events-none bg-linear-to-t from-background to-transparent" />

        {/* Left Fade */}
        <div className="absolute top-0 left-0 h-full w-64 z-0 pointer-events-none bg-linear-to-r from-background to-transparent" />

        {/* Right Fade */}
        <div className="absolute top-0 right-0 h-full w-64 z-0 pointer-events-none bg-linear-to-l from-background to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10">
          <ComoFunciona />
          <Ventajas />
        </div>

      </section>
      {/* ===== END SHARED BLOCK ===== */}
      <Sponsors/>
      <ReviewsCarousel/>
      <LogosCarousel/>
    </div>
  );
}
