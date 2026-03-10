"use client";
import React, { useEffect } from "react";
import { FaBalanceScale, FaBuilding, FaUserShield, FaExclamationTriangle, FaCopyright } from "react-icons/fa";

export default function AvisoLegal() {
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
            Aviso <span className="text-oliva-light">Legal</span>
          </h1>
          <p className="font-montserrat text-sm uppercase tracking-widest">
            Última actualización: 06 de marzo de 2026
          </p>
        </header>

        <div className="space-y-12 font-montserrat leading-relaxed">
          
          {/* SECCIÓN 1: DATOS IDENTIFICATIVOS */}
          <section className="border border-foreground/40 bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <FaBuilding className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider text-foreground">Información General</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <p><span className="font-bold uppercase text-xs text-foreground block">Titular:</span> LA MESS BCN SL</p>
                <p><span className="font-bold uppercase text-xs text-foreground block">NIF:</span> B23972292</p>
                <p><span className="font-bold uppercase text-xs text-foreground block">Domicilio Social:</span> Diputació, 469, LOC-1, 08013 Barcelona</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-bold uppercase text-xs text-foreground block">Registro Mercantil:</span> Barcelona, Boletín 217, Ref: 497873, Hoja B-644471</p>
                <p><span className="font-bold uppercase text-xs text-foreground block">Email de contacto:</span> administracion@lamess.es</p>
                <p><span className="font-bold uppercase text-xs text-foreground block">Sitio Web:</span> https://www.lamess.es/</p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: CONDICIONES DE USO */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUserShield className="text-oliva-light" />
                <h2 className="font-gobold text-xl uppercase tracking-wider">Usuarios</h2>
              </div>
              <p className="text-sm">
                El acceso y/o uso de este portal le atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
              </p>
            </div>

            <div className="bg-militar-dark text-hueso p-6 rounded-2xl border border-oliva-light/30 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <FaBalanceScale className="text-oliva-light" />
                <h2 className="font-gobold text-lg uppercase tracking-wider">Responsabilidades</h2>
              </div>
              <p className="text-xs text-justify opacity-80">
                El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el USUARIO será responsable de aportar información veraz y lícita.
              </p>
            </div>
          </section>

          {/* SECCIÓN 3: PROPIEDAD INTELECTUAL */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <FaCopyright className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider">Propiedad Intelectual</h2>
            </div>
            <p className="text-sm">
              LA MESS BCN SL por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.), titularidad de LA MESS BCN SL o bien de sus licenciantes.
            </p>
            <div className="bg-oliva-light/10 border border-oliva-light/30 p-4 rounded-xl text-xs italic">
              Quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de LA MESS BCN SL.
            </div>
          </section>

          {/* SECCIÓN 4: EXCLUSIÓN DE GARANTÍAS */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-oliva-light text-2xl" />
              <h2 className="font-gobold text-xl uppercase tracking-wider">Exclusión de Garantías y Responsabilidad</h2>
            </div>
            <p className="text-sm">
              LA MESS BCN SL no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </section>

          {/* FOOTER LEGAL */}
          <footer className="pt-8 border-t border-oliva-light/60 text-[10px] uppercase tracking-widest opacity-70">
            <p className="mb-2">
              Este Aviso Legal se rige en todos y cada uno de sus extremos por la legislación española vigente.
            </p>
            <p>
              Cláusulas elaboradas bajo la supervisión de <span className="font-bold uppercase">Grup Qualia</span>. 
              Para cualquier consulta legal adicional, contacte con <span className="text-oliva-light">administracion@lamess.es</span>.
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
}