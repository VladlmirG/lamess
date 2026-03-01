"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import HistoriaSection from "@/components/tabula-rasa/HistoriaSection";
import NosotrosMisc1 from "@/components/tabula-rasa/NosotrosMisc1";
import TeamSection from "@/components/tabula-rasa/TeamSection";
import NosotrosMisc2 from "@/components/tabula-rasa/NosotrosMisc2";
import NosotrosExpansion from "@/components/tabula-rasa/NosotrosExpansion";

export default function Nosotros() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div>
             {/* ===== SHARED BACKGROUND BLOCK ===== */}
            <section className="relative overflow-hidden">
              {/* Background PNG */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <Image src="/hero/markstest4.png" alt="Background graphic" fill className={`object-contain opacity-5 
                    ${isDark ? "invert" : ""} -translate-x-0/4 lg:-translate-x-1/4 scale-320 lg:scale-120 -rotate-10 transition-all 
                    duration-200 ease-in-out`}/>
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
                <TeamSection />
               <HistoriaSection />
              </div>
            </section>
  
             <NosotrosMisc1 />
             <NosotrosMisc2 />
             <NosotrosExpansion />
    
    </div>
  );
}
