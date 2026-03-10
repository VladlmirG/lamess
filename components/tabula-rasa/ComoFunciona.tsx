import { Send, Truck, CheckCircle } from "lucide-react";
import FadeInSection from "./FadeInSection";

export default function ComoFunciona() {
  return (
    <FadeInSection>
    <section className="w-full my-32 relative">
      <div className="mx-auto px-4 md:px-12 max-w-6xl">

        {/* Title */}
        <div className="text-center mb-20 md:mb-30">
          <h2 className="font-gobold text-2xl md:text-5xl xl:text-6xl tracking-[0.2em] uppercase mb-4">
             ¿ <span className="text-oliva-light">Cómo</span> funciona?
          </h2>
          <div className="h-1 w-32 bg-linear-to-r from-transparent via-oliva-light to-transparent mx-auto opacity-50"></div>
        </div>
   

        {/* Connector line (desktop only) */}
        <div className="hidden lg:block absolute left-0 right-0 top-[68%] h-px bg-foreground/20 max-w-4xl mx-auto" />

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-18 xl:gap-12 relative">

          {/* Step 1 */}
          <div className="relative bg-oliva-light/20 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 xl:aspect-square flex flex-col justify-between">
            
            <div>
              <div className="absolute -top-7 xl:-top-14 left-10 bg-militar text-hueso w-16 h-16 xl:w-24 xl:h-24 flex items-center justify-center rounded-full text-2xl xl:text-4xl font-semibold shadow-lg font-gobold">
                1
              </div>
              <p className="text-md lx:text-lg leading-relaxed mt-10 xl:mt-15 font-montserrat text-center">
                Solicitas la recogida por web o mediante contacto directo.
              </p>
            </div>

            <Send className="w-10 h-10 self-end" />

          </div>

          {/* Step 2 */}
          <div className="relative bg-oliva-light/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 xl:aspect-square flex flex-col justify-between">
            
            <div>
              <div className="absolute -top-7 xl:-top-14 left-10 bg-militar text-hueso w-16 h-16 xl:w-24 xl:h-24 flex items-center justify-center rounded-full text-2xl xl:text-4xl font-semibold shadow-lg font-gobold">
                2
              </div>
              <p className="text-md lg:text-lg leading-relaxed mt-10 xl:mt-15 font-montserrat text-center">
                Recogemos en tu franja horaria acordada.
              </p>
            </div>

            <Truck className="w-10 h-10 self-end" />

          </div>

          {/* Step 3 */}
          <div className="relative bg-oliva-light/98 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 xl:aspect-square flex flex-col justify-between">
            
            <div>
              <div className="absolute -top-7 xl:-top-14 left-10 bg-militar text-hueso w-16 h-16 xl:w-24 xl:h-24 flex items-center justify-center rounded-full text-2xl xl:text-4xl font-semibold shadow-lg font-gobold">
                3
              </div>
              <p className="text-md lg:text-lg leading-relaxed text-militar-dark mt-10 xl:mt-15 font-montserrat text-center">
                Entregamos directamente y te confirmamos la finalización.
              </p>
            </div>

            <CheckCircle className="w-10 h-10 text-militar self-end" />

          </div>

        </div>

        {/* <h2 className="text-3xl md:text-5xl font-bold text-center mt-20 font-gobold tracking-wider">
          Así de simple
        </h2> */}
      </div>
    </section>
    </FadeInSection>
  );
}
