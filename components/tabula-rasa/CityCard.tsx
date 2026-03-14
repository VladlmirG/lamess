import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import FadeInSection from "./FadeInSection";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; 

export default function CityCard() {
  return (
    <FadeInSection>
    <section id="ciudades" className="py-20 scroll-mt-24 md:scroll-mt-28 lg:scroll-mt-32">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
       <div className="text-center">
          <h2 className="font-gobold text-2xl md:text-5xl xl:text-6xl tracking-[0.2em] uppercase mb-4">
            Elige tu <span className="text-oliva-light">ciudad</span>
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-oliva-light to-transparent mx-auto opacity-50"></div>
        </div>
        <p className="text-sm md:text-md text-foreground/70 mt-3 font-montserrat">
          Selecciona tu ciudad para descubrir nuestras tarifas flexibles y servicios de entrega personalizados, adaptados a rutas dentro y fuera de cada área urbana.
        </p>
      </div>

      {/* Expanding Images */}
      <div className="group flex flex-col md:flex-row items-center gap-6 h-auto md:h-100 w-full max-w-5xl mt-12 mx-auto">

        {/* IMAGE 1 */}
        <div className="relative group/card grow w-full md:w-56 h-75 md:h-full transition-all duration-500 md:hover:w-full overflow-hidden rounded-2xl group-hover:[&:not(:hover)_.top-content]:opacity-0">

          <Image
            src="/misc/Madrid.jpg"
            alt="Madrid"
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />

          {/* Persistent Top Content */}
          <div className="top-content absolute top-0 left-0 w-full p-6 z-20 transition-opacity duration-300">

            <h3 className="text-2xl font-bold text-hueso drop-shadow-md font-gobold">
              MADRID
            </h3>

            <div className="flex gap-3 mt-4">

               <Link href="/calculador" >
              <button className="px-4 py-2 text-sm bg-hueso text-militar-dark rounded-full hover:bg-hueso/90 transition font-medium font-montserrat border border-oliva cursor-pointer">
                Calcular envío
              </button>
              </Link>


            {/* <TooltipProvider>
              <Tooltip>
               <TooltipTrigger asChild>
              <button className="px-4 py-2 text-sm bg-hueso text-militar-dark rounded-full hover:bg-hueso/90 transition font-medium font-montserrat border border-oliva">
                Calcular envío
              </button>
               </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-center border border-foreground/40 text-hueso">
                    Este servicio actualmente no está disponible debido a mantenimiento y mejoras.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}

              <Link href="/tarifas-madrid" scroll={true}>
              <button className="px-4 py-2 text-sm bg-militar/60 backdrop-blur text-hueso rounded-full  hover:bg-militar/80 transition font-montserrat cursor-pointer">
                Ver tarifas
              </button>
              </Link>
            </div>

          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white bg-militar-dark/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <p className="text-sm lg:text-xl mt-2 font-montserrat text-right">
              Tarifas por zonas dentro de Madrid capital + tarifa por horas para municipios colindantes.
            </p>
          </div>

        </div>

        {/* IMAGE 2 */}
        <div className="relative group/card grow w-full md:w-56 h-75 md:h-full transition-all duration-500 md:hover:w-full overflow-hidden rounded-2xl group-hover:[&:not(:hover)_.top-content]:opacity-0">

          <Image
            src="/misc/Barcelona.jpg"
            alt="Barcelona"
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />

          {/* Persistent Top Content */}
          <div className="top-content absolute top-0 left-0 w-full p-6 z-20 transition-opacity duration-300">

            <h3 className="text-2xl font-bold text-right text-hueso drop-shadow-lg font-gobold">
              BARCELONA
            </h3>

            <div className="flex gap-3 mt-4 justify-end">
              <Link href="/tarifas-barcelona" scroll={true}>
              <button className="px-4 py-2 text-sm bg-militar/60 backdrop-blur text-hueso rounded-full  hover:bg-militar/70 transition font-montserrat cursor-pointer">
                Ver tarifas
              </button>
              </Link>

             {/* <TooltipProvider>
              <Tooltip>
               <TooltipTrigger asChild>
              <button className="px-4 py-2 text-sm bg-hueso text-militar-dark rounded-full hover:bg-hueso/90 transition font-medium font-montserrat border border-oliva">
                Calcular envío
              </button>
               </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-center border border-foreground/40 text-hueso">
                    Este servicio actualmente no está disponible debido a mantenimiento y mejoras.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider> */}

              <Link href="/calculador" >
              <button className="px-4 py-2 text-sm bg-hueso text-militar-dark rounded-full hover:bg-hueso/90 transition font-medium font-montserrat border border-oliva cursor-pointer">
                Calcular envío
              </button>
              </Link>
            </div>

          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white bg-militar-dark/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <p className="text-sm lg:text-xl mt-2 font-montserrat">
             Entregas directas por zonas + tarifa por horas para rutas con múltiples paradas o fuera de ciudad.
            </p>
          </div>

        </div>

      </div>

       {/* Promo / Info Banner */}
       <div className="mt-4 px-4">
         <Link
           href="/contacto" // 👈 change this to wherever you want it to go
           className="group mx-auto max-w-6xl flex items-center justify-center gap-3 py-3 px-6 rounded-2xl bg-militar/90 backdrop-blur text-hueso font-montserrat text-sm md:text-base tracking-wider transition-all duration-300 hover:bg-oliva hero-shadow">
           <Clock
             size={20}
             className="text-oliva-light shrink-0"
           />

           <span className="text-center leading-relaxed">
             Operamos todos los días. Para ventanas especiales o servicios fuera de horario, consúltanos.
           </span>

           <ArrowRight
             size={20}
             className="transition-transform duration-300 group-hover:translate-x-1 shrink-0"
           />
         </Link>
       </div>


    </section>
    </FadeInSection>
  );
}
