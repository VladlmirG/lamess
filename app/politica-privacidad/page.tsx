"use client";

import React, { useEffect } from "react";
import { FaUserShield, FaFolderOpen, FaChild, FaEnvelopeOpenText, FaUserEdit } from "react-icons/fa";

export default function PoliticaPrivacidad() {
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
            Política de <span className="text-oliva-light">Privacidad</span>
          </h1>
          <p className="font-montserrat text-sm uppercase tracking-widest">
            Última actualización: 06 de marzo de 2026
          </p>
        </header>

        <div className="space-y-12 font-montserrat leading-relaxed">
          
          {/* SECCIÓN 1: RESPONSABLE Y FINALIDAD */}
          <section className="border border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaUserShield className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider">Responsable del Tratamiento</h2>
            </div>
            <p className="text-sm md:text-base mb-4">
              De conformidad con el **RGPD-UE-2016/679** y la **LOPDGDD-3/2018**, le informamos que el responsable del tratamiento de sus datos es <span className="font-bold">LA MESS BCN SL</span>. Tratamos la información de manera lícita, leal y transparente en relación con el interesado, con fines determinados, explícitos y legítimos.
            </p>
          </section>

          {/* SECCIÓN 2: CONSENTIMIENTO Y MENORES */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaFolderOpen className="text-oliva-light" />
                <h2 className="font-gobold text-xl uppercase tracking-wider">Tratamiento de Datos</h2>
              </div>
              <p className="text-sm">
                Al contactar o registrarse en nuestra web, usted cede sus datos personales para la gestión de sus datos como usuario. Sus datos serán introducidos en un fichero automatizado bajo la responsabilidad del administrador de la web de LA MESS BCN SL con la finalidad de facilitar y cumplir los compromisos establecidos entre ambas partes.
              </p>
            </div>

            <div className="bg-militar-dark text-hueso p-6 rounded-2xl border border-oliva-light/30 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <FaChild className="text-oliva-light" />
                <h2 className="font-gobold text-lg uppercase tracking-wider">Protección de Menores</h2>
              </div>
              <p className="text-xs text-justify opacity-80">
                Según el Art. 84 de la LOPD-3/2018, relativo a la protección de los menores en internet, los menores de **16 años** no pueden prestar su consentimiento para que un comercio online recoja sus datos personales. En estos casos, sus representantes legales (padres o tutores) deberán autorizar el tratamiento en su nombre.
              </p>
            </div>
          </section>

          {/* SECCIÓN 3: DERECHOS DEL USUARIO (ARCO) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <FaUserEdit className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider">Sus Derechos</h2>
            </div>
            <p className="text-sm">
              Usted tiene derecho a ejercer sus derechos de acceso, rectificación, oposición, supresión (&quot;derecho al olvido&quot;), limitación y portabilidad sobre sus datos personales.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-oliva-light/5 border border-oliva-light/20 rounded-xl">
                <span className="font-bold text-xs uppercase text-oliva-light block mb-1">Acceso y Rectificación</span>
                <p className="text-xs italic">Permite conocer qué datos personales tiene el administrador y corregir errores o datos incompletos.</p>
              </div>
              <div className="p-4 bg-oliva-light/5 border border-oliva-light/20 rounded-xl">
                <span className="font-bold text-xs uppercase text-oliva-light block mb-1">Supresión y Oposición</span>
                <p className="text-xs italic">Solicite que se supriman los datos inadecuados o excesivos, o consiga que no se lleve a cabo el tratamiento.</p>
              </div>
              <div className="p-4 bg-oliva-light/5 border border-oliva-light/20 rounded-xl">
                <span className="font-bold text-xs uppercase text-oliva-light block mb-1">Portabilidad</span>
                <p className="text-xs italic">Obtenga una copia de los datos personales facilitados para transmitirlos a otros servicios.</p>
              </div>
            </div>
          </section>

{/* SECCIÓN 4: CONTACTO PARA DERECHOS */}
<section className="space-y-4">
  <div className="flex items-center gap-3">
    <FaEnvelopeOpenText className="text-oliva-light text-2xl" />
    <h2 className="font-gobold text-xl uppercase tracking-wider">Ejercicio de Derechos</h2>
  </div>
  <p className="text-sm">
    Para ejercer cualquiera de estos derechos, puede enviar una solicitud acreditando su identidad a la dirección del administrador o al correo electrónico: 
  </p>
  
  {/* CAMBIO DE DIV A ENLACE FUNCIONAL */}
  <a 
    href="mailto:administracion@lamess.es" 
    className="inline-block px-6 py-3 bg-oliva-light/10 border border-oliva-light/30 rounded-full font-bold text-oliva-light hover:bg-oliva-light/20 transition-colors active:scale-95"
  >
    administracion@lamess.es
  </a>
  
  <p className="text-xs opacity-60 mt-2 italic">
    * El administrador contestará en un plazo de 30 días para el derecho de acceso. [cite: 74] También tiene derecho a presentar una reclamación ante la Autoridad de Control pertinente (AEPD, ACPD o AVPD).
  </p>
</section>

          {/* FOOTER LEGAL */}
          <footer className="pt-8 border-t border-oliva-light/60 text-[10px] uppercase tracking-widest opacity-70">
            <p className="mb-2">
              Responsable: LA MESS BCN SL. Domicilio: DIPUTACIO, 469, LOC-1, 08013 BARCELONA.
            </p>
            <p>
              Cláusulas elaboradas por <span className="font-bold uppercase">Grup Qualia</span>.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}