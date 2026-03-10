"use client";

import React, { useEffect } from "react";
import { FaShieldAlt, FaCookie, FaUserLock, FaExternalLinkAlt, FaListUl } from "react-icons/fa";

export default function PoliticaCookies() {
  // Garantizar scroll al inicio
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* CABECERA */}
        <header className="mb-12 border-b border-oliva-light/60 pb-8 text-center lg:text-left">
          <h1 className="font-montserrat text-4xl md:text-6xl tracking-wide uppercase mb-4">
            Política de <span className="text-oliva-light">Cookies</span>
          </h1>
          <p className="font-montserrat text-sm uppercase tracking-widest">
            Última actualización: 06 de junio de 2026
          </p>
        </header>

        <div className="space-y-12 font-montserrat leading-relaxed">
          
          {/* SECCIÓN 1: INTRODUCCIÓN */}
          <section className="border border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaCookie className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider">¿Qué son las Cookies?</h2>
            </div>
            <p className="text-sm md:text-base">
              En <span className="font-bold">LA MESS BCN SL</span> utilizamos tecnologías como las cookies para almacenar y recuperar información cuando navegas por nuestra web. 
              Estos pequeños archivos se guardan en tu dispositivo y nos ayudan a recordar tus preferencias (como el idioma o datos de acceso) para que tu experiencia sea más fluida y personalizada.
            </p>
          </section>

          {/* SECCIÓN 2: TIPOS DE COOKIES */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaListUl className="text-oliva-light" />
                <h2 className="font-gobold text-xl uppercase tracking-wider">¿Para qué las usamos?</h2>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="border-l-2 border-oliva-light pl-4">
                  <span className="font-bold block uppercase text-xs">Cookies Técnicas:</span> 
                  Fundamentales para que la web funcione, gestionar tu sesión y garantizar la seguridad.
                </li>
                <li className="border-l-2 border-oliva-light pl-4">
                  <span className="font-bold block uppercase text-xs">Cookies de Personalización:</span> 
                  Permiten que la web te reconozca, recordando por ejemplo tu región o tipo de navegador.
                </li>
                <li className="border-l-2 border-oliva-light pl-4">
                  <span className="font-bold block uppercase text-xs">Cookies de Análisis (Analytics):</span> 
                  Usamos servicios como <span className="italic">Google Analytics</span> para medir cuánta gente nos visita y mejorar el rendimiento de la web.
                </li>
              </ul>
            </div>

            <div className="bg-militar-dark text-hueso p-6 rounded-2xl border border-oliva-light/30 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-oliva-light" />
                <h2 className="font-gobold text-lg uppercase tracking-wider">Tu Consentimiento</h2>
              </div>
              <p className="text-xs mb-4 opacity-80 text-justify">
                De acuerdo con el <span className="text-oliva-light font-bold">RGPD-UE-2016/679</span> y la <span className="text-oliva-light font-bold">LSSI-CE</span>, necesitamos tu consentimiento explícito para activar la mayoría de estas cookies. 
                Si eres menor de 16 años, este consentimiento debe ser autorizado por tus tutores legales.
              </p>
            </div>
          </section>

          {/* SECCIÓN 3: CONTROL DEL USUARIO */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <FaUserLock className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider">Cómo controlar tus Cookies</h2>
            </div>
            <p className="text-sm">
              Puedes eliminar o bloquear las cookies en cualquier momento desde la configuración de tu navegador. Aquí tienes los accesos directos oficiales incluyendo Brave:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647?hl=en' },
                { name: 'Safari', url: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
                { name: 'Firefox', url: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias' },
                { name: 'Brave', url: 'https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing' }
              ].map((browser) => (
                <a 
                  key={browser.name} 
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-oliva-light/10 border border-oliva-light/30 rounded-full text-xs font-bold uppercase tracking-tighter hover:bg-oliva-light/20 transition-colors active:scale-95"
                >
                  <FaExternalLinkAlt className="text-[10px]" /> {browser.name} 
                </a>
              ))}
            </div>
          </section>

          {/* SECCIÓN 4: INFORMACIÓN ADICIONAL */}
          <footer className="pt-8 border-t border-oliva-light/60 text-[10px] uppercase tracking-widest opacity-70">
            <p className="mb-2">
              Responsable del tratamiento: <span className="font-bold">LA MESS BCN SL</span>.
            </p>
            <p>
              Cláusulas elaboradas por <span className="font-bold uppercase">Grup Qualia</span>. 
              Para más detalles técnicos sobre el uso de datos, puedes consultar <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-oliva-light">www.allaboutcookies.org</a>.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}