"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCookieBite, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const CookieBanner = () => {
  // Inicializamos como false para evitar errores de hidratación en Next.js
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sincronizamos con el sistema externo (localStorage) dentro del efecto
    const consent = localStorage.getItem("cookie-consent-lamess");
    if (!consent) {
      // Usamos un pequeño delay o simplemente permitimos el efecto para 
      // cumplir con la intención de sincronización con la API del navegador
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Aceptación del consentimiento explícito según RGPD [cite: 9, 11]
    localStorage.setItem("cookie-consent-lamess", "all");
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Opción de rechazar obligatoria según la Guía AEPD [cite: 12, 16]
    localStorage.setItem("cookie-consent-lamess", "essential");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-9999 p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-5xl mx-auto border border-foreground/40 bg-linear-to-br from-militar-dark/80 to-oliva/40 backdrop-blur-3xl text-hueso p-5 md:p-8 rounded-2xl shadow-[0px_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          
          {/* SECCIÓN INFORMATIVA (Art. 22.2 LSSI) [cite: 4, 66] */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-oliva-light p-2 rounded-full text-militar-dark">
                <FaCookieBite size={20} />
              </div>
              <h3 className="font-gobold tracking-widest text-lg lg:text-xl uppercase">
                Aviso de Cookies
              </h3>
            </div>
            <p className="font-montserrat text-xs lg:text-sm leading-relaxed text-hueso/80">
          LA MESS BCN SL utiliza cookies propias y de terceros para analizar el uso de la web y mejorar nuestros servicios mediante la medición de tu navegación. Solicitamos su consentimiento explícito conforme 
              al Comité Europeo de Protección de Datos.
            </p>
          </div>

          {/* BOTONES EXIGIDOS POR NORMATIVA [cite: 11, 12, 13] */}
          <div className="flex flex-wrap md: justify-center gap-3 w-full lg:w-auto font-semibold">
            <Link 
              href="/politica-cookies"
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-hueso/20 font-montserrat text-[10px] tracking-widest uppercase hover:bg-hueso/10 transition-all"
            >
              <FaInfoCircle /> Más Información 
            </Link>

            <button
              onClick={handleDecline}
              className="px-6 py-3 rounded-xl border border-red-500/50 text-red-400 font-montserrat text-[10px] tracking-widest uppercase hover:bg-red-500/10 transition-all cursor-pointer"
            >
              Rechazar
            </button>

            <button
              onClick={handleAccept}
              className="px-8 py-3 rounded-xl bg-oliva-light text-militar-dark font-montserrat text-[10px] tracking-[0.2em] uppercase hover:bg-oliva-light/80 transition-all shadow-lg cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-hueso/10 flex items-center gap-2 text-[9px] uppercase tracking-tighter text-hueso/60 font-montserrat">
          <FaShieldAlt className="text-oliva-light/40" />
          Cumplimiento RGPD-UE-2016/679 y LSSI-CE 
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;