"use client";

import Image from "next/image";
import { FaLeaf } from "react-icons/fa";

export default function NosotrosMisc2() {
  return (
    <section className="py-0 xl:py-24">
      <div className="w-full px-2 md:px-6 mx-auto flex flex-col xl:flex-row gap-12">

        {/* LEFT CARD */}
        <div className="w-full xl:w-[60%]">
          <div className="flex flex-col md:flex-row bg-linear-to-br from-oliva/20 to-oliva/5 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden">
            
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image
                src="/misc/foto-7.webp" // replace with your image
                alt="Flota de cargo bikes"
                fill
                className="object-cover"
              />
            </div>

            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              <h4 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl mb-4 font-gobold tracking-wide">
                Flota de cargo bikes
              </h4>
              <p className="text-foreground/80 font-montserrat leading-relaxed text-xs xl:text-md 2xl:text-lg">
                Contamos con una flota de bicicletas de carga preparada para el trabajo diario. 
                Este tipo de vehículo suele ser más rápido que una furgoneta en entornos urbanos: 
                evita atascos, accede mejor a zonas restringidas y mantiene rutas más estables. 
                Trabajamos con configuraciones capaces de mover cargas grandes y usamos sistemas 
                de sujeción y cajas específicas (incluidas cajas isotérmicas) para conservar 
                temperatura y asegurar entregas en perfectas condiciones.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT CARD WITH ICON OUTSIDE */}
        <div className="w-full xl:w-[40%] relative flex mt-10 xl:mt-0">

          {/* Floating Icon */}
        <div className="absolute -top-8 -right-2 md:-top-10 md:-right-10 xl:-top-20 xl:-right-6 2xl:-top-10 z-20">
          <div className="neon-pulse w-25 h-25 md:w-36 md:h-36 bg-militar-dark rounded-full flex items-center justify-center shadow-2xl">
            <FaLeaf className="text-oliva-light w-14 h-14 md:w-16 md:h-16 drop-shadow-md" />
          </div>
        </div>


          <div className="bg-linear-to-br from-oliva-light/80 to-oliva-light/45 backdrop-blur-xl rounded-3xl shadow-lg p-8 pt-12 md:pt-16 flex flex-col justify-start w-full">
    
            <h4 className="text-lg lg:text-2xl xl:text-xl 2xl:text-3xl mb-4 font-gobold tracking-wide mt-10 md:mt-5 xl:mt-0">
              Conciencia social y sostenibilidad
            </h4>

            <p className="text-foreground/80 font-montserrat leading-relaxed text-xs xl:text-md 2xl:text-lg">
              Nuestra sostenibilidad no es un “extra”: es el corazón del sistema. 
              Trabajar en bicicleta reduce emisiones y ruido, y a la vez mejora la 
              eficiencia operativa en ciudad. Buscamos soluciones ecológicas sin 
              comprometer el rendimiento: logística urbana real, pensada para empresas 
              que necesitan funcionar cada día.
            </p>

          </div>
        </div>




      </div>
    </section>
  );
}
